/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  getDocs, 
  query, 
  where, 
  onSnapshot,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { VerificationDocument, SupplierJourneyItem, VerifiedCompany } from './types';
import { PREDEFINED_USERS, DEFAULT_PASSWORD, findPredefinedUser, PredefinedUser } from './data/predefinedUsers';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Database ID must be passed to getFirestore as specified by platform
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Error Handling Specification
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection Validation Test
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration or network connection.");
    }
  }
}

// User Profile Interface in Firestore
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: 'visitante_publico' | 'empresa' | 'proveedor' | 'admin';
  companyName?: string;
  rfc?: string;
  createdAt: string;
}

// Authentication Helpers
export async function signInWithGoogle(): Promise<FirebaseUser> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Create/update user profile in Firestore
    if (result.user) {
      await syncUserProfile(result.user);
    }
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

export async function logOut(): Promise<void> {
  try {
    await signOut(auth);
    localStorage.removeItem('verta_active_session');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export interface UserSessionData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string | null;
  role: 'visitante_publico' | 'empresa' | 'proveedor' | 'admin';
  companyName?: string;
  rfc?: string;
  position?: string;
}

export async function loginWithCredentials(
  identifier: string, 
  passwordInput: string
): Promise<{ user: UserSessionData; profile: UserProfile }> {
  const predefined = findPredefinedUser(identifier);

  // Check predefined users credentials
  if (predefined) {
    if (passwordInput !== predefined.passwordHash) {
      throw new Error('Contraseña incorrecta. Por favor verifique sus credenciales de acceso.');
    }

    // Try real Firebase Auth Email/Password if available
    let firebaseUid = predefined.id;
    try {
      const cred = await signInWithEmailAndPassword(auth, predefined.email, predefined.passwordHash);
      if (cred.user) {
        firebaseUid = cred.user.uid;
      }
    } catch (fbAuthErr: any) {
      if (fbAuthErr.code === 'auth/user-not-found') {
        try {
          const newCred = await createUserWithEmailAndPassword(auth, predefined.email, predefined.passwordHash);
          if (newCred.user) {
            firebaseUid = newCred.user.uid;
          }
        } catch {
          // Fall back gracefully to predefined ID
        }
      }
      // If auth/operation-not-allowed or any other non-fatal code, we continue seamlessly
    }

    const profile: UserProfile = {
      id: firebaseUid,
      email: predefined.email,
      displayName: predefined.name,
      role: predefined.role,
      companyName: predefined.companyName,
      rfc: predefined.rfc,
      createdAt: new Date().toISOString()
    };

    // Attempt to persist profile to Firestore only if an active Firebase Auth user is present
    if (auth.currentUser) {
      try {
        const userRef = doc(db, 'users', firebaseUid);
        await setDoc(userRef, profile, { merge: true });
      } catch (fsErr) {
        console.warn('Firestore profile sync info:', fsErr);
      }
    }

    const sessionData: UserSessionData = {
      uid: firebaseUid,
      email: predefined.email,
      displayName: predefined.name,
      role: predefined.role,
      companyName: predefined.companyName,
      rfc: predefined.rfc,
      position: predefined.position
    };

    localStorage.setItem('verta_active_session', JSON.stringify(sessionData));
    return { user: sessionData, profile };
  }

  // Not a predefined alias: Try standard Firebase email & password
  try {
    const cred = await signInWithEmailAndPassword(auth, identifier, passwordInput);
    const profile = await syncUserProfile(cred.user);
    const sessionData: UserSessionData = {
      uid: cred.user.uid,
      email: cred.user.email || identifier,
      displayName: cred.user.displayName || identifier.split('@')[0],
      role: profile.role,
      companyName: profile.companyName,
      rfc: profile.rfc
    };
    localStorage.setItem('verta_active_session', JSON.stringify(sessionData));
    return { user: sessionData, profile };
  } catch (error: any) {
    if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      throw new Error('Credenciales incorrectas. Verifique su correo y contraseña.');
    }
    if (error.code === 'auth/user-not-found') {
      throw new Error(`El usuario "${identifier}" no está registrado. Seleccione uno de los 4 perfiles autorizados (Héctor, Adrián, Carmen o David).`);
    }
    if (error.code === 'auth/operation-not-allowed') {
      throw new Error('Autenticación por email no habilitada. Use los perfiles rápidos de Héctor, Adrián, Carmen o David.');
    }
    throw new Error(error.message || 'Error al iniciar sesión');
  }
}

export function getStoredSession(): UserSessionData | null {
  try {
    const raw = localStorage.getItem('verta_active_session');
    if (raw) return JSON.parse(raw);
  } catch {
    return null;
  }
  return null;
}

export async function syncUserProfile(user: FirebaseUser, roleOverride?: 'empresa' | 'proveedor'): Promise<UserProfile> {
  const userRef = doc(db, 'users', user.uid);
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data() as UserProfile;
      if (roleOverride && data.role !== roleOverride) {
        const updated = { ...data, role: roleOverride };
        await updateDoc(userRef, { role: roleOverride });
        return updated;
      }
      return data;
    } else {
      const newProfile: UserProfile = {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Usuario VERTA',
        role: roleOverride || 'empresa',
        createdAt: new Date().toISOString()
      };
      await setDoc(userRef, newProfile);
      return newProfile;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
    throw error;
  }
}

// Verification Documents (Proveedor)
export async function syncDocumentsToFirestore(userId: string, documents: VerificationDocument[]): Promise<void> {
  // Always persist locally for offline reliability and predefined local sessions
  try {
    localStorage.setItem(`verta_docs_${userId}`, JSON.stringify(documents));
  } catch (storageErr) {
    console.warn('Could not save docs to localStorage', storageErr);
  }

  // Only attempt Firestore write if user is authenticated with Firebase Auth
  const currentAuthUser = auth.currentUser;
  if (!currentAuthUser) {
    return;
  }

  const isOwner = currentAuthUser.uid === userId;
  const isAdminUser = currentAuthUser.email === 'davidikgd@gmail.com';
  if (!isOwner && !isAdminUser) {
    return;
  }

  for (const docItem of documents) {
    const docRef = doc(db, 'verification_documents', `${userId}_${docItem.id}`);
    try {
      await setDoc(docRef, {
        id: docItem.id,
        userId: userId,
        title: docItem.title,
        description: docItem.description,
        status: docItem.status,
        requirement: docItem.requirement,
        fileName: docItem.file?.name || null,
        fileSize: docItem.file?.size || null,
        lastUpdated: docItem.lastUpdated || new Date().toISOString(),
        comments: docItem.comments || []
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `verification_documents/${userId}_${docItem.id}`);
    }
  }
}

export async function loadUserDocumentsFromFirestore(userId: string): Promise<VerificationDocument[] | null> {
  // Check local storage first
  let localDocs: VerificationDocument[] | null = null;
  try {
    const raw = localStorage.getItem(`verta_docs_${userId}`);
    if (raw) {
      localDocs = JSON.parse(raw);
    }
  } catch {
    localDocs = null;
  }

  // If not authenticated in Firebase Auth, return cached local documents
  const currentAuthUser = auth.currentUser;
  if (!currentAuthUser) {
    return localDocs;
  }

  const isOwner = currentAuthUser.uid === userId;
  const isAdminUser = currentAuthUser.email === 'davidikgd@gmail.com';
  if (!isOwner && !isAdminUser) {
    return localDocs;
  }

  try {
    const q = query(collection(db, 'verification_documents'), where('userId', '==', userId));
    const snap = await getDocs(q);
    if (snap.empty) return localDocs;
    
    const docs: VerificationDocument[] = [];
    snap.forEach((d) => {
      const data = d.data();
      docs.push({
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
        requirement: data.requirement,
        lastUpdated: data.lastUpdated,
        file: data.fileName ? {
          name: data.fileName,
          size: data.fileSize || '1.0 MB',
          uploadedAt: data.lastUpdated || 'Reciente'
        } : null,
        comments: data.comments || []
      });
    });
    try {
      localStorage.setItem(`verta_docs_${userId}`, JSON.stringify(docs));
    } catch {}
    return docs;
  } catch (error) {
    console.warn('Could not load user documents from Firestore:', error);
    return localDocs;
  }
}

// Supplier Journey (Empresas Contratantes)
export async function syncJourneyItemsToFirestore(companyOwnerId: string, items: SupplierJourneyItem[]): Promise<void> {
  try {
    localStorage.setItem(`verta_journey_${companyOwnerId}`, JSON.stringify(items));
  } catch (storageErr) {
    console.warn('Could not save journey to localStorage', storageErr);
  }

  const currentAuthUser = auth.currentUser;
  if (!currentAuthUser) {
    return;
  }

  const isOwner = currentAuthUser.uid === companyOwnerId;
  const isAdminUser = currentAuthUser.email === 'davidikgd@gmail.com';
  if (!isOwner && !isAdminUser) {
    return;
  }

  for (const item of items) {
    const itemRef = doc(db, 'journey_items', item.id);
    try {
      await setDoc(itemRef, {
        id: item.id,
        companyOwnerId: companyOwnerId,
        code: item.code,
        providerName: item.providerName,
        rfc: item.rfc,
        service: item.service,
        validationLevel: item.validationLevel,
        trackingStatus: item.trackingStatus,
        progressPercent: item.progressPercent,
        lastUpdate: item.lastUpdate,
        sentDate: item.sentDate,
        observations: item.observations || [],
        internalDecision: item.internalDecision
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `journey_items/${item.id}`);
    }
  }
}

// Expert / Consultant Requests
export async function submitExpertRequestToFirestore(requestData: {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyOrProviderName?: string;
  topic: string;
  notes: string;
}): Promise<string> {
  const requestId = `req_${Date.now()}`;
  const reqRef = doc(db, 'expert_requests', requestId);
  try {
    await setDoc(reqRef, {
      id: requestId,
      userId: auth.currentUser?.uid || 'anon',
      contactName: requestData.contactName,
      contactEmail: requestData.contactEmail,
      contactPhone: requestData.contactPhone,
      companyOrProviderName: requestData.companyOrProviderName || '',
      topic: requestData.topic,
      notes: requestData.notes,
      status: 'recibido',
      createdAt: new Date().toISOString()
    });
    return requestId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `expert_requests/${requestId}`);
    throw error;
  }
}
