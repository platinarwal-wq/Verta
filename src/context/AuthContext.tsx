/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { 
  auth, 
  signInWithGoogle, 
  logOut, 
  syncUserProfile, 
  UserProfile, 
  testFirestoreConnection,
  loginWithCredentials,
  UserSessionData,
  getStoredSession
} from '../firebase';
import { PredefinedUser, PREDEFINED_USERS } from '../data/predefinedUsers';

export interface ActiveUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  role: 'visitante_publico' | 'empresa' | 'proveedor' | 'admin';
  companyName?: string;
  rfc?: string;
  position?: string;
}

interface AuthContextType {
  user: ActiveUser | null;
  firebaseUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  firestoreOnline: boolean;
  loginWithGoogle: (preferredRole?: 'empresa' | 'proveedor') => Promise<void>;
  loginWithUserCredentials: (identifier: string, password: string) => Promise<ActiveUser>;
  quickLoginAsPredefined: (predefined: PredefinedUser) => Promise<ActiveUser>;
  logout: () => Promise<void>;
  updateRole: (role: 'empresa' | 'proveedor') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<ActiveUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [firestoreOnline, setFirestoreOnline] = useState(true);

  // Restore stored session if exists
  useEffect(() => {
    const stored = getStoredSession();
    if (stored) {
      setUser(stored);
      setUserProfile({
        id: stored.uid,
        email: stored.email || '',
        displayName: stored.displayName || 'Usuario',
        role: stored.role,
        companyName: stored.companyName,
        rfc: stored.rfc,
        createdAt: new Date().toISOString()
      });
    }
  }, []);

  // Test Firestore connection on boot
  useEffect(() => {
    testFirestoreConnection()
      .then(() => setFirestoreOnline(true))
      .catch(() => setFirestoreOnline(false));
  }, []);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseUser(currentUser);
      if (currentUser) {
        try {
          const profile = await syncUserProfile(currentUser);
          setUserProfile(profile);
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || profile.displayName,
            photoURL: currentUser.photoURL,
            role: profile.role,
            companyName: profile.companyName,
            rfc: profile.rfc
          });
        } catch (err) {
          console.warn('Could not sync user profile:', err);
        }
      } else {
        // If not in Firebase Auth, check if stored session exists
        const stored = getStoredSession();
        if (!stored) {
          setUser(null);
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (preferredRole?: 'empresa' | 'proveedor') => {
    setLoading(true);
    try {
      const loggedUser = await signInWithGoogle();
      const profile = await syncUserProfile(loggedUser, preferredRole);
      setUserProfile(profile);
      setUser({
        uid: loggedUser.uid,
        email: loggedUser.email,
        displayName: loggedUser.displayName,
        photoURL: loggedUser.photoURL,
        role: profile.role,
        companyName: profile.companyName,
        rfc: profile.rfc
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithUserCredentials = async (identifier: string, password: string): Promise<ActiveUser> => {
    setLoading(true);
    try {
      const res = await loginWithCredentials(identifier, password);
      setUser(res.user);
      setUserProfile(res.profile);
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  const quickLoginAsPredefined = async (predefined: PredefinedUser): Promise<ActiveUser> => {
    return loginWithUserCredentials(predefined.username, predefined.passwordHash);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logOut();
      setUser(null);
      setUserProfile(null);
      setFirebaseUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (role: 'empresa' | 'proveedor') => {
    if (firebaseUser) {
      const profile = await syncUserProfile(firebaseUser, role);
      setUserProfile(profile);
    } else if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      if (userProfile) {
        setUserProfile({ ...userProfile, role });
      }
      localStorage.setItem('verta_active_session', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        userProfile,
        loading,
        firestoreOnline,
        loginWithGoogle,
        loginWithUserCredentials,
        quickLoginAsPredefined,
        logout,
        updateRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
