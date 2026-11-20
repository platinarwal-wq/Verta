/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, PlatformEnvironment } from './components/Header';
import { Footer } from './components/Footer';
import { PublicPortal } from './components/public/PublicPortal';
import { CompaniesPortal } from './components/companies/CompaniesPortal';
import { ProvidersPortal } from './components/providers/ProvidersPortal';
import { UploadModal } from './components/UploadModal';
import { RequestExpert } from './components/RequestExpert';
import { SystemTutorialModal } from './components/SystemTutorialModal';
import { PackagesModal } from './components/PackagesModal';
import { LoginModal } from './components/LoginModal';
import { VerificationDocument, UploadedFile, PackageSelectionState } from './types';
import { getFeatureIdsForPackage, getPackageById } from './data/packagesData';
import { CheckCircle2, ShieldAlert, Sparkles, X, HelpCircle, Package } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { syncDocumentsToFirestore, loadUserDocumentsFromFirestore } from './firebase';

const INITIAL_DOCUMENTS: VerificationDocument[] = [
  {
    id: 'acta_constitutiva',
    title: 'Acta Constitutiva',
    description: 'Testimonio de escritura pública inscrita en el Registro Público del Comercio que contiene los estatutos sociales vigentes de la persona moral.',
    status: 'validado',
    requirement: 'Required',
    lastUpdated: '12/04/2026',
    file: {
      name: 'Acta_Constitutiva_Original_Final.pdf',
      size: '2.4 MB',
      uploadedAt: '12/04/2026 a las 14:15 hrs'
    },
    comments: []
  },
  {
    id: 'rfc',
    title: 'Constancia de Situación Fiscal (RFC)',
    description: 'Cédula de identificación fiscal oficial expedida por el SAT donde constan actividades económicas, obligaciones impositivas y régimen societario vigente.',
    status: 'validado',
    requirement: 'Required',
    lastUpdated: '12/04/2026',
    file: {
      name: 'CSF_SAT_2026_AlfaSoluciones.pdf',
      size: '840 KB',
      uploadedAt: '12/04/2026 a las 14:18 hrs'
    },
    comments: []
  },
  {
    id: 'sat_opinion',
    title: 'Opinión de Cumplimiento SAT (32-D)',
    description: 'Reporte oficial positivo e individual del Servicio de Administración Tributaria que demuestra el cumplimiento oportuno de obligaciones fiscales corrientes.',
    status: 'corregir',
    requirement: 'Required',
    lastUpdated: '18/04/2026',
    file: {
      name: 'SAT_Opinion_Cumplimiento_Marzo.pdf',
      size: '920 KB',
      uploadedAt: '18/04/2026 a las 10:20 hrs'
    },
    comments: ['Observación de Auditoría: El archivo adjunto corresponde al mes anterior. Se requiere la opinión vigente del mes corriente firmada electrónicamente.']
  },
  {
    id: 'domicilio',
    title: 'Comprobante de Domicilio Fiscal (<90d)',
    description: 'Recibo de servicio público reciente (agua, luz, suministro de gas o teléfono fijo) con fecha de emisión no mayor a 90 días naturales.',
    status: 'pendiente',
    requirement: 'Required',
    lastUpdated: '20/05/2026',
    file: {
      name: 'Recibo_CFE_Abril_Vigilante.pdf',
      size: '1.2 MB',
      uploadedAt: '20/05/2026 a las 11:32 hrs'
    },
    comments: []
  },
  {
    id: 'id_oficial',
    title: 'Identificación Oficial del Representante',
    description: 'Identificación oficial vigente con fotografía y firma del representante legal instrumentado de la empresa (Credencial de Elector INE o Pasaporte).',
    status: 'no_entregado',
    requirement: 'Required',
    lastUpdated: null,
    file: null,
    comments: []
  }
];

function AppContent() {
  const { user, userProfile } = useAuth();

  // Three Independent Environments: 'publico' | 'empresas' | 'proveedores'
  const [currentEnvironment, setCurrentEnvironment] = useState<PlatformEnvironment>('publico');
  const [activeTab, setActiveTab] = useState<string>('inicio');

  // Shared state across the demonstration
  const [providerName, setProviderName] = useState('Soluciones Tecnológicas Alfa S.A. de C.V.');
  const [clientName, setClientName] = useState('Grupo Constructor Metrópoli S.A.');
  const [documents, setDocuments] = useState<VerificationDocument[]>(INITIAL_DOCUMENTS);
  const [activeUploadDoc, setActiveUploadDoc] = useState<VerificationDocument | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; sub?: string; type: 'success' | 'alert' | 'info' } | null>(null);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [showPackagesModal, setShowPackagesModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [packageSelection, setPackageSelection] = useState<PackageSelectionState>({
    packageId: 'paquete_1',
    selectedServiceIds: getFeatureIdsForPackage('paquete_1'),
  });

  // Trigger notification utility
  const showToast = (text: string, sub?: string, type: 'success' | 'alert' | 'info' = 'success') => {
    setToastMessage({ text, sub, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLoginSuccess = (loggedInUser: any, targetEnv: PlatformEnvironment) => {
    setCurrentEnvironment(targetEnv);
    if (loggedInUser.companyName) {
      if (loggedInUser.role === 'proveedor') {
        setProviderName(loggedInUser.companyName);
      } else {
        setClientName(loggedInUser.companyName);
      }
    }
    showToast(
      `¡Bienvenido, ${loggedInUser.displayName || loggedInUser.name || 'Usuario'}!`,
      `Sesión activa como ${loggedInUser.role === 'admin' ? 'Super Administrador' : loggedInUser.role === 'proveedor' ? 'Proveedor Homologado' : 'Empresa Contratante'}.`,
      'success'
    );
  };

  // Load documents when user signs in (only for provider or admin)
  useEffect(() => {
    if (user) {
      if (user.role === 'proveedor' || user.role === 'admin') {
        loadUserDocumentsFromFirestore(user.uid).then((cloudDocs) => {
          if (cloudDocs && cloudDocs.length > 0) {
            setDocuments(cloudDocs);
          } else {
            // Initialize user's docs locally / in Firestore if permitted
            syncDocumentsToFirestore(user.uid, INITIAL_DOCUMENTS).catch(console.warn);
          }
        });
        if (user.companyName) {
          setProviderName(user.companyName);
        } else if (user.displayName) {
          setProviderName(user.displayName);
        }
      } else if (user.role === 'empresa') {
        if (user.companyName) {
          setClientName(user.companyName);
        }
      }
    }
  }, [user]);

  const resetAllDemo = () => {
    setDocuments(JSON.parse(JSON.stringify(INITIAL_DOCUMENTS)));
    setProviderName('Soluciones Tecnológicas Alfa S.A. de C.V.');
    setClientName('Grupo Constructor Metrópoli S.A.');
    showToast('Sandbox Restablecido', 'Fueron recuperados los estados originales de la documentación', 'info');
    if (user) {
      syncDocumentsToFirestore(user.uid, INITIAL_DOCUMENTS).catch(console.warn);
    }
  };

  // Handle document uploaded
  const handleUploadSuccess = (docId: string, file: UploadedFile) => {
    setDocuments((prevDocs) => {
      const updated = prevDocs.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            file,
            status: 'pendiente' as const,
            lastUpdated: 'Recién subido',
            comments: []
          };
        }
        return doc;
      });

      if (user) {
        syncDocumentsToFirestore(user.uid, updated).catch(console.warn);
      }
      return updated;
    });
    showToast('Documento Recibido', `${file.name} ha sido enviado y respaldado en Firebase.`, 'success');
  };

  // Fast check simulation for auditor feedback
  const handleFastCheck = (docId: string, action: 'approve' | 'reject', comment?: string) => {
    setDocuments((prevDocs) => {
      const updated = prevDocs.map((doc) => {
        if (doc.id === docId) {
          if (action === 'approve') {
            return {
              ...doc,
              status: 'validado' as const,
              lastUpdated: 'Validado hoy',
              comments: []
            };
          } else {
            return {
              ...doc,
              status: 'corregir' as const,
              lastUpdated: 'Observado hoy',
              comments: comment ? [comment] : ['El documento presenta inconsistencias con la fuente oficial.']
            };
          }
        }
        return doc;
      });

      if (user) {
        syncDocumentsToFirestore(user.uid, updated).catch(console.warn);
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-verta-dark-blue text-white selection:bg-verta-cyan/30 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* HEADER WITH 3 INDEPENDENT ENVIRONMENTS SELECTOR */}
      <Header
        currentEnvironment={currentEnvironment}
        setEnvironment={setCurrentEnvironment}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        providerName={providerName}
        clientName={clientName}
        onOpenTutorial={() => setShowTutorialModal(true)}
        onOpenPackages={() => setShowPackagesModal(true)}
        onOpenLogin={() => setShowLoginModal(true)}
      />

      {/* AMBIENTE ACTIVO NOTIFICATION BANNER */}
      <div className="bg-verta-navy/60 border-b border-verta-slate-blue/30 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Ambiente activo:</span>
            <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
              currentEnvironment === 'publico' ? 'bg-verta-cyan/20 text-verta-cyan border border-verta-cyan/40' :
              currentEnvironment === 'empresas' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' :
              'bg-verta-coral/20 text-verta-coral border border-verta-coral/40'
            }`}>
              {currentEnvironment === 'publico' ? '1. Sitio Público (Portal General)' :
               currentEnvironment === 'empresas' ? '2. Área Privada para Empresas Contratantes' :
               '3. Área Privada para Proveedores y Consultores'}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-gray-400">
            <span>Cambiar de ambiente:</span>
            <button
              onClick={() => setCurrentEnvironment('publico')}
              className={`hover:text-white cursor-pointer transition-colors ${currentEnvironment === 'publico' ? 'text-verta-cyan font-bold underline' : ''}`}
            >
              Sitio Público
            </button>
            <span>&bull;</span>
            <button
              onClick={() => setCurrentEnvironment('empresas')}
              className={`hover:text-white cursor-pointer transition-colors ${currentEnvironment === 'empresas' ? 'text-blue-400 font-bold underline' : ''}`}
            >
              Área Empresas
            </button>
            <span>&bull;</span>
            <button
              onClick={() => setCurrentEnvironment('proveedores')}
              className={`hover:text-white cursor-pointer transition-colors ${currentEnvironment === 'proveedores' ? 'text-verta-coral font-bold underline' : ''}`}
            >
              Área Proveedores
            </button>

            {/* QUICK PAQUETES BUTTON IN BANNER */}
            <button
              id="btn-quick-paquetes"
              onClick={() => setShowPackagesModal(true)}
              className="ml-2 px-2.5 py-0.5 rounded-lg bg-verta-coral/15 hover:bg-verta-coral/25 text-verta-coral border border-verta-coral/40 hover:border-verta-coral text-[11px] font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm whitespace-nowrap"
              title="Abrir comparativo de paquetes y selección de servicios"
            >
              <Package className="w-3 h-3 text-verta-coral" />
              <span>Paquetes</span>
            </button>

            {/* QUICK TUTORIAL BUTTON IN BANNER */}
            <button
              id="btn-quick-tutorial"
              onClick={() => setShowTutorialModal(true)}
              className="px-2.5 py-0.5 rounded-lg bg-verta-cyan/15 hover:bg-verta-cyan/25 text-verta-cyan border border-verta-cyan/40 hover:border-verta-cyan text-[11px] font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm whitespace-nowrap"
              title="Abrir tutorial interactivo del sistema VERTA"
            >
              <HelpCircle className="w-3 h-3 text-verta-cyan" />
              <span>Tutorial</span>
            </button>
          </div>
        </div>
      </div>

      {/* TOAST SYSTEM NOTIFIER */}
      {toastMessage && (
        <div className="fixed top-24 right-4 lg:right-8 verta-glass border border-verta-cyan/40 p-4 rounded-2xl shadow-2xl flex items-start space-x-3 animate-slide-in z-50 max-w-sm">
          {toastMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-verta-emerald shrink-0 mt-0.5" />}
          {toastMessage.type === 'alert' && <ShieldAlert className="w-5 h-5 text-verta-coral shrink-0 mt-0.5" />}
          {toastMessage.type === 'info' && <Sparkles className="w-5 h-5 text-verta-cyan shrink-0 mt-0.5" />}
          <div className="space-y-0.5 text-xs">
            <p className="font-bold text-white font-mono">{toastMessage.text}</p>
            {toastMessage.sub && <p className="text-gray-300 font-sans">{toastMessage.sub}</p>}
          </div>
        </div>
      )}

      {/* MAIN VIEW SWITCHER BASED ON THE THREE INDEPENDENT ENVIRONMENTS */}
      <main className="flex-1 w-full">
        {/* AMBIENTE 1: SITIO PÚBLICO */}
        {currentEnvironment === 'publico' && (
          <PublicPortal
            onNavigateToCompanies={() => {
              setCurrentEnvironment('empresas');
              showToast('Bienvenido al Área Privada de Empresas', 'Panel de homologación y seguimiento de contratantes.', 'info');
            }}
            onNavigateToProviders={() => {
              setCurrentEnvironment('proveedores');
              showToast('Bienvenido al Área Privada de Proveedores', 'Gestione su expediente documental y resuelva observaciones.', 'info');
            }}
            onOpenConsultantContact={() => setShowExpertModal(true)}
            onOpenTutorial={() => setShowTutorialModal(true)}
            onOpenPackages={() => setShowPackagesModal(true)}
            onOpenLogin={() => setShowLoginModal(true)}
          />
        )}

        {/* AMBIENTE 2: ÁREA PRIVADA PARA EMPRESAS */}
        {currentEnvironment === 'empresas' && (
          <CompaniesPortal
            clientName={clientName}
            onNavigateToPublic={() => setCurrentEnvironment('publico')}
          />
        )}

        {/* AMBIENTE 3: ÁREA PRIVADA PARA PROVEEDORES Y CONSULTORES */}
        {currentEnvironment === 'proveedores' && (
          <ProvidersPortal
            providerName={providerName}
            clientName={clientName}
            documents={documents}
            packageSelection={packageSelection}
            onOpenPackages={() => setShowPackagesModal(true)}
            onUploadClick={setActiveUploadDoc}
            onFastCheck={handleFastCheck}
            onResetDemo={resetAllDemo}
            onNavigateToPublic={() => setCurrentEnvironment('publico')}
          />
        )}
      </main>

      {/* UPLOAD & REVIEW SIMULATOR MODAL */}
      {activeUploadDoc && (
        <UploadModal 
          document={activeUploadDoc}
          onClose={() => setActiveUploadDoc(null)}
          onUploadSuccess={handleUploadSuccess}
          onFastCheck={handleFastCheck}
        />
      )}

      {/* REQUEST EXPERT MODAL */}
      {showExpertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl verta-glass border border-verta-coral/40 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end">
              <button
                onClick={() => setShowExpertModal(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <RequestExpert />
          </div>
        </div>
      )}

      {/* SYSTEM TUTORIAL STEP-BY-STEP MODAL */}
      <SystemTutorialModal
        isOpen={showTutorialModal}
        onClose={() => setShowTutorialModal(false)}
        onNavigateEnvironment={(env) => setCurrentEnvironment(env)}
      />

      {/* PACKAGES & SERVICES SELECTOR MODAL */}
      <PackagesModal
        isOpen={showPackagesModal}
        onClose={() => setShowPackagesModal(false)}
        currentSelection={packageSelection}
        onConfirmSelection={(selection, navigateToProviders) => {
          setPackageSelection(selection);
          const pkg = getPackageById(selection.packageId);
          if (navigateToProviders) {
            setCurrentEnvironment('proveedores');
          }
          showToast(
            `${pkg.name} seleccionado`,
            `${selection.selectedServiceIds.length} servicios configurados correctamente en tu membresía VERTA.`,
            'success'
          );
        }}
      />

      {/* MODERN LOGIN MODAL WITH HECTOR, ADRIAN, CARMEN, DAVID */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

