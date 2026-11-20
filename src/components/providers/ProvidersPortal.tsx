/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  FileCheck2, 
  AlertTriangle, 
  CalendarClock, 
  Eye, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Globe, 
  Sparkles, 
  Building2, 
  FileText, 
  Receipt, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight,
  ExternalLink,
  Sliders,
  Package,
  Megaphone,
  Settings,
  Send,
  BookOpen,
  FileBarChart2
} from 'lucide-react';
import { VerificationDocument, PackageSelectionState } from '../../types';
import { getPackageById, PACKAGE_FEATURES, PACKAGE_ORDER } from '../../data/packagesData';
import { DocumentList } from '../DocumentList';

interface ProvidersPortalProps {
  providerName: string;
  clientName: string;
  documents: VerificationDocument[];
  packageSelection: PackageSelectionState;
  onOpenPackages: () => void;
  onUploadClick: (doc: VerificationDocument) => void;
  onFastCheck: (docId: string, action: 'approve' | 'reject', comment?: string) => void;
  onResetDemo: () => void;
  onNavigateToPublic: () => void;
}

export function ProvidersPortal({
  providerName,
  clientName,
  documents,
  packageSelection,
  onOpenPackages,
  onUploadClick,
  onFastCheck,
  onResetDemo,
  onNavigateToPublic
}: ProvidersPortalProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    'onboarding' | 'checklist' | 'observaciones' | 'vigencias' | 'visibilidad' | 'promocion' | 'diagnosticos'
  >('checklist');
  const activePkg = getPackageById(packageSelection.packageId);
  const hasMediumAccess = PACKAGE_ORDER[packageSelection.packageId] >= 2;
  const hasPremiumAccess = PACKAGE_ORDER[packageSelection.packageId] >= 3;

  // Paquete 2 (Medium) - Promoción Comercial interactive state
  const [campaignGoal, setCampaignGoal] = useState('Generación de prospectos B2B en sector industrial');
  const [magazineTopic, setMagazineTopic] = useState('Caso de éxito en cumplimiento y continuidad operativa');
  const [campaignRequested, setCampaignRequested] = useState(false);

  // Paquete 3 (Premium) - Diagnósticos & Servicios Especializados state
  const [websiteUrl, setWebsiteUrl] = useState('https://alfa-soluciones.com.mx');
  const [webDiagnosticRequested, setWebDiagnosticRequested] = useState(false);
  const [adminDiagnosticRequested, setAdminDiagnosticRequested] = useState(false);
  
  // Onboarding & Payment State
  const [paymentPlan, setPaymentPlan] = useState<'anual' | 'semestral'>('anual');
  const [paymentDone, setPaymentDone] = useState(true);
  const [paymentNotice, setPaymentNotice] = useState<string | null>(null);

  // Visibility Settings State
  const [visibilityMode, setVisibilityMode] = useState<'publico' | 'invitacion' | 'oculto'>('publico');
  const [allowFinancialDownload, setAllowFinancialDownload] = useState(false);
  const [allowArticlesDownload, setAllowArticlesDownload] = useState(true);
  const [badgeCopied, setBadgeCopied] = useState(false);

  // Subsanación State
  const [subsanarNotice, setSubsanarNotice] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSubsanarNotice(msg);
    setTimeout(() => setSubsanarNotice(null), 3500);
  };

  // Documents with observations (status === 'corregir')
  const docsWithObservations = documents.filter(d => d.status === 'corregir');

  // Documents with expiration tracking (vigencias)
  const vigenciasList = [
    {
      docId: 'sat_opinion',
      title: 'Opinión de Cumplimiento SAT (32-D)',
      emision: '18/04/2026',
      vence: '18/05/2026',
      diasRestantes: 12,
      status: 'por_vencer',
      fuente: 'SAT México Webservice'
    },
    {
      docId: 'imss_opinion',
      title: 'Opinión de Seguridad Social IMSS',
      emision: '15/04/2026',
      vence: '15/05/2026',
      diasRestantes: 9,
      status: 'por_vencer',
      fuente: 'IMSS Digital'
    },
    {
      docId: 'domicilio',
      title: 'Comprobante de Domicilio Fiscal (<90d)',
      emision: '20/03/2026',
      vence: '18/06/2026',
      diasRestantes: 54,
      status: 'vigente',
      fuente: 'CFE / Suministro Eléctrico'
    },
    {
      docId: 'acta_constitutiva',
      title: 'Acta Constitutiva y Poderes Notariales',
      emision: '15/01/2020',
      vence: 'Permanente',
      diasRestantes: 999,
      status: 'permanente',
      fuente: 'RPC Registro Mercantil'
    },
    {
      docId: 'rfc',
      title: 'Constancia de Situación Fiscal (RFC)',
      emision: '12/04/2026',
      vence: 'Anual',
      diasRestantes: 180,
      status: 'vigente',
      fuente: 'SAT Cédula Fiscal'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-fade-in text-white font-sans">
      
      {/* GLOBAL TOAST NOTICE */}
      {subsanarNotice && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl verta-glass border border-verta-coral/40 shadow-2xl flex items-center space-x-3 max-w-md animate-slide-in-up">
          <CheckCircle2 className="w-5 h-5 text-verta-coral shrink-0" />
          <span className="text-xs text-white font-mono">{subsanarNotice}</span>
        </div>
      )}

      {/* TOP BANNER: ENVIRONMENT IDENTIFIER */}
      <div className="verta-glass border border-verta-coral/30 rounded-2xl p-6 relative overflow-hidden bg-gradient-to-r from-verta-dark-blue via-verta-navy to-verta-dark-blue">
        <div className="absolute top-0 right-0 w-64 h-64 bg-verta-coral/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 bg-verta-coral/15 border border-verta-coral/30 px-3 py-0.5 rounded-full text-[10px] font-mono text-verta-coral font-bold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ÁREA PRIVADA PARA PROVEEDORES Y CONSULTORES</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {providerName}
            </h1>
            <p className="text-xs text-gray-300 max-w-2xl font-sans leading-relaxed">
              Módulo de acreditación normativa, gestión documental, resolución de observaciones de auditoría y configuración de visibilidad ante clientes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="bg-verta-navy/70 border border-verta-slate-blue/50 px-3 py-1.5 rounded-xl text-xs font-mono text-gray-300 flex items-center space-x-2">
              <span>Membresía: <strong className="text-white font-bold">{activePkg.name}</strong></span>
              <span className="text-gray-500" aria-hidden="true">·</span>
              <span className="text-verta-cyan tabular-nums">{packageSelection.selectedServiceIds.length} servicios</span>
            </div>
            <button
              onClick={onOpenPackages}
              className="px-3.5 py-2 bg-verta-coral/15 hover:bg-verta-coral/25 border border-verta-coral/40 text-verta-coral font-mono font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center space-x-1.5 whitespace-nowrap"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Paquetes</span>
            </button>
            <button
              onClick={onNavigateToPublic}
              className="px-3.5 py-2 bg-verta-navy/60 hover:bg-verta-navy border border-verta-slate-blue/50 text-gray-300 hover:text-white font-mono text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Ir al Sitio Público
            </button>
          </div>
        </div>

        {/* SUB-TABS NAVIGATION */}
        <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-verta-slate-blue/40">
          {[
            { id: 'onboarding', label: '1. Onboarding & Pago', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'checklist', label: '2. Carga Documental', icon: <FileCheck2 className="w-4 h-4" />, count: documents.length },
            { id: 'observaciones', label: '3. Observaciones', icon: <AlertTriangle className="w-4 h-4" />, count: docsWithObservations.length, alert: docsWithObservations.length > 0 },
            { id: 'vigencias', label: '4. Gestión de Vigencias', icon: <CalendarClock className="w-4 h-4" /> },
            { id: 'visibilidad', label: '5. Visibilidad', icon: <Eye className="w-4 h-4" /> },
            { id: 'promocion', label: '6. Promoción Comercial', icon: <Megaphone className="w-4 h-4" />, locked: !hasMediumAccess },
            { id: 'diagnosticos', label: '7. Diagnósticos y Servicios', icon: <Settings className="w-4 h-4" />, locked: !hasPremiumAccess }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-verta-coral text-white shadow-lg font-extrabold'
                  : 'bg-verta-navy/40 text-gray-400 hover:text-white hover:bg-verta-slate-blue/40 border border-verta-slate-blue/30'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.locked && <Lock className="w-3 h-3 opacity-70" />}
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] tabular-nums ${
                  tab.alert ? 'bg-verta-coral text-white font-bold' : 
                  activeSubTab === tab.id ? 'bg-verta-navy text-verta-coral' : 'bg-verta-slate-blue/50 text-gray-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* SUBTAB 1: ONBOARDING & PAGO */}
      {activeSubTab === 'onboarding' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-verta-slate-blue/30 pb-3">
            <h2 className="text-xl font-bold text-white font-display">Onboarding Corporativo y Cuota de Acreditación</h2>
            <p className="text-xs text-gray-400">Verifique sus datos societarios de facturación y el estatus de sus derechos de auditoría anual con emisión formal de CFDI deducible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Corporate Billing Identity */}
            <div className="md:col-span-2 verta-glass border border-verta-slate-blue/50 rounded-2xl p-6 space-y-4 bg-verta-dark-blue/60">
              <span className="text-xs font-mono uppercase text-verta-coral font-bold tracking-wider block">Datos de Identificación del Proveedor</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="space-y-1">
                  <span className="text-gray-400 font-mono block">Razón Social Legal</span>
                  <span className="text-white font-bold">{providerName}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400 font-mono block">Registro Federal (RFC)</span>
                  <span className="text-white font-mono font-bold">VTS-040815-H42</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400 font-mono block">Régimen Fiscal</span>
                  <span className="text-white">601 - General de Ley Personas Morales</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400 font-mono block">Representante Legal</span>
                  <span className="text-white font-bold">Lic. Alejandro Martínez Gómez</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400 font-mono block">Domicilio Fiscal Registrado</span>
                  <span className="text-white">Paseo de la Reforma 4500, Piso 8, Cuauhtémoc, CDMX</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-400 font-mono block">Cliente Auditor Vinculado</span>
                  <span className="text-verta-cyan font-bold">{clientName}</span>
                </div>
              </div>
            </div>

            {/* Payment & CFDI Status */}
            <div className="verta-glass border border-verta-coral/30 rounded-2xl p-6 space-y-4 bg-verta-dark-blue/60 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-verta-coral font-bold tracking-wider">Plan de Acreditación</span>
                  <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
                    PAGADO & TIMBRADO
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-2xl font-black text-white font-display">$8,400 MXN</span>
                  <span className="text-xs text-gray-400 block font-mono">Cuota Anual de Auditoría & Homologación</span>
                </div>

                <div className="pt-2 border-t border-verta-slate-blue/30 space-y-2 text-xs font-mono text-gray-300">
                  <div className="flex justify-between">
                    <span>Periodo:</span>
                    <span className="text-white">Abr 2026 - Abr 2027</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Folio Fiscal UUID:</span>
                    <span className="text-verta-coral">4B92-SAT-CFDI-2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deducibilidad:</span>
                    <span className="text-emerald-400 font-bold">100% ISR / IVA Acred.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => showToast('Descargando factura CFDI en XML y PDF timbrada con el SAT...')}
                className="w-full py-2.5 bg-verta-coral hover:bg-verta-coral/90 text-white font-mono font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer"
              >
                <Receipt className="w-4 h-4" />
                <span>Descargar Factura CFDI</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: CHECKLIST DE CARGA DOCUMENTAL */}
      {activeSubTab === 'checklist' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-verta-slate-blue/30 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-white font-display">Checklist de Carga Documental</h2>
              <p className="text-xs text-gray-400">Cargue y actualice los archivos requeridos para la homologación corporativa formal ante su contratante.</p>
            </div>
            <button
              onClick={onResetDemo}
              className="px-3 py-1.5 text-xs font-mono text-gray-400 hover:text-white bg-verta-navy/50 border border-verta-slate-blue/40 rounded-lg transition-all self-start cursor-pointer"
            >
              Restablecer Sandbox
            </button>
          </div>

          <DocumentList
            documents={documents}
            onUploadClick={onUploadClick}
            onResetDemo={onResetDemo}
          />
        </div>
      )}

      {/* SUBTAB 3: RESOLUCIÓN DE OBSERVACIONES */}
      {activeSubTab === 'observaciones' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-verta-slate-blue/30 pb-3">
            <h2 className="text-xl font-bold text-white font-display">Bandeja de Observaciones y Subsanación</h2>
            <p className="text-xs text-gray-400">Consulte las notas emitidas por el auditor técnico de VERTA y resuba los documentos corregidos para convalidación inmediata.</p>
          </div>

          {docsWithObservations.length === 0 ? (
            <div className="verta-glass border border-emerald-500/30 rounded-2xl p-8 text-center space-y-3 bg-emerald-500/5">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">¡No hay observaciones pendientes!</h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                Todos sus documentos cargados se encuentran aprobados o en proceso regular de auditoría. No se requiere ninguna subsanación en este momento.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {docsWithObservations.map((doc) => (
                <div key={doc.id} className="verta-glass border border-verta-coral/50 rounded-2xl p-6 space-y-4 bg-verta-dark-blue/60">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-verta-slate-blue/40 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="bg-verta-coral/20 text-verta-coral border border-verta-coral/40 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
                          OBSERVACIÓN AUDITOR VERTA
                        </span>
                        <span className="text-xs font-mono text-gray-400">Actualizado: {doc.lastUpdated}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{doc.title}</h4>
                      <p className="text-xs text-gray-300">{doc.description}</p>
                    </div>

                    <button
                      onClick={() => onUploadClick(doc)}
                      className="px-4 py-2.5 bg-verta-coral text-white font-mono font-bold text-xs rounded-xl flex items-center space-x-2 hover:bg-verta-coral/90 transition-all cursor-pointer shrink-0"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Subsanar y Resubir Documento</span>
                    </button>
                  </div>

                  {/* Comments from auditor */}
                  <div className="p-4 bg-verta-navy/80 border border-verta-coral/30 rounded-xl space-y-2">
                    <span className="text-xs font-mono text-verta-coral font-bold flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4" />
                      <span>Motivo del Requerimiento de Corrección:</span>
                    </span>
                    {doc.comments.map((comm, idx) => (
                      <p key={idx} className="text-xs text-gray-200 pl-5 border-l-2 border-verta-coral">
                        "{comm}"
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-1">
                    <span>Archivo cargado actualmente: <strong className="text-white">{doc.file?.name || 'Ninguno'}</strong></span>
                    <button
                      onClick={() => {
                        onFastCheck(doc.id, 'approve');
                        showToast(`"${doc.title}" ha sido validado manualmente en la simulación.`);
                      }}
                      className="text-emerald-400 hover:underline cursor-pointer"
                    >
                      [Simular Aprobación Rápida]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 4: GESTIÓN DE VIGENCIAS */}
      {activeSubTab === 'vigencias' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-verta-slate-blue/30 pb-3">
            <h2 className="text-xl font-bold text-white font-display">Semáforo de Vigencias Normativas</h2>
            <p className="text-xs text-gray-400">Monitoree la caducidad de sus opiniones fiscales y comprobantes. El sistema emite alertas preventivas 10 días antes del vencimiento.</p>
          </div>

          <div className="verta-glass border border-verta-slate-blue/50 rounded-2xl overflow-hidden bg-verta-dark-blue/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300 font-sans">
                <thead className="bg-verta-navy/80 text-gray-400 font-mono text-[11px] border-b border-verta-slate-blue/40 uppercase">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Documento</th>
                    <th className="py-3.5 px-4 font-bold">Fuente Oficial</th>
                    <th className="py-3.5 px-4 font-bold">Fecha Emisión</th>
                    <th className="py-3.5 px-4 font-bold">Caducidad / Vigencia</th>
                    <th className="py-3.5 px-4 font-bold">Estado Semáforo</th>
                    <th className="py-3.5 px-4 font-bold text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-verta-slate-blue/30">
                  {vigenciasList.map((v, i) => (
                    <tr key={i} className="hover:bg-verta-slate-blue/15 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">
                        {v.title}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-400 text-[11px]">
                        {v.fuente}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs">
                        {v.emision}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs">
                        {v.vence}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                          v.status === 'permanente' ? 'bg-verta-cyan/15 text-verta-cyan border border-verta-cyan/30' :
                          v.status === 'vigente' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                          'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            v.status === 'permanente' ? 'bg-verta-cyan' :
                            v.status === 'vigente' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                          }`} />
                          <span>
                            {v.status === 'permanente' ? 'Permanente' :
                             v.status === 'vigente' ? `Vigente (${v.diasRestantes} días)` :
                             `Por Vencer (${v.diasRestantes} días)`}
                          </span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            const found = documents.find(d => d.id === v.docId);
                            if (found) onUploadClick(found);
                            else showToast(`Abriendo módulo de actualización para ${v.title}...`);
                          }}
                          className="px-3 py-1 bg-verta-navy hover:bg-verta-slate-blue/50 border border-verta-slate-blue/50 text-verta-cyan text-[11px] font-mono rounded-lg transition-all cursor-pointer"
                        >
                          Actualizar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: CONFIGURACIÓN DE VISIBILIDAD */}
      {activeSubTab === 'visibilidad' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-verta-slate-blue/30 pb-3">
            <h2 className="text-xl font-bold text-white font-display">Configuración de Visibilidad y Privacidad</h2>
            <p className="text-xs text-gray-400">Defina qué empresas compradoras pueden consultar su expediente y controle el nivel de acceso a sus documentos corporativos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visibility Mode Selector */}
            <div className="verta-glass border border-verta-slate-blue/50 rounded-2xl p-6 space-y-4 bg-verta-dark-blue/60">
              <span className="text-xs font-mono uppercase text-verta-cyan font-bold tracking-wider block">Nivel de Exposición en el Ecosistema</span>
              
              <div className="space-y-3">
                {[
                  {
                    id: 'publico',
                    title: 'Público en Directorio Pull VERTA',
                    desc: 'Cualquier empresa contratante verificada puede consultar su estatus, compliance score y solicitar cotizaciones.',
                    badge: 'Recomendado para nuevas ventas'
                  },
                  {
                    id: 'invitacion',
                    title: 'Solo con Invitación Directa',
                    desc: 'Su expediente solo es visible para las empresas que le hayan extendido un enlace o folio de invitación formal.',
                    badge: 'Para proveedores exclusivos'
                  },
                  {
                    id: 'oculto',
                    title: 'Auditoría Privada Oculta',
                    desc: 'No visible en ningún catálogo. Solo usted y su auditor personal tienen acceso al repositorio.',
                    badge: 'Modo confidencial'
                  }
                ].map((mode) => (
                  <div
                    key={mode.id}
                    onClick={() => {
                      setVisibilityMode(mode.id as any);
                      showToast(`Nivel de visibilidad configurado a: ${mode.title}`);
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                      visibilityMode === mode.id
                        ? 'bg-verta-cyan/15 border-verta-cyan text-white shadow-lg'
                        : 'bg-verta-navy/50 border-verta-slate-blue/40 text-gray-400 hover:bg-verta-navy/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{mode.title}</span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        visibilityMode === mode.id ? 'border-verta-cyan bg-verta-cyan text-verta-navy' : 'border-gray-500'
                      }`}>
                        {visibilityMode === mode.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">{mode.desc}</p>
                    <span className="inline-block text-[10px] font-mono text-verta-cyan opacity-80 pt-1">{mode.badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Granular Download Permissions & Digital Trust Badge */}
            <div className="space-y-6">
              <div className="verta-glass border border-verta-slate-blue/50 rounded-2xl p-6 space-y-4 bg-verta-dark-blue/60">
                <span className="text-xs font-mono uppercase text-verta-coral font-bold tracking-wider block">Permisos Granulares de Descarga</span>
                
                <div className="space-y-3 text-xs font-sans">
                  <div className="flex items-center justify-between p-3 bg-verta-navy/60 rounded-xl border border-verta-slate-blue/30">
                    <div>
                      <p className="font-bold text-white">Descarga de Acta Constitutiva Completa</p>
                      <p className="text-[11px] text-gray-400">Permite a contratantes autorizados descargar el PDF notarial escaneado.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={allowArticlesDownload}
                      onChange={(e) => {
                        setAllowArticlesDownload(e.target.checked);
                        showToast(`Permiso de descarga de Acta: ${e.target.checked ? 'Permitido' : 'Restringido'}`);
                      }}
                      className="w-4 h-4 accent-verta-cyan cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-verta-navy/60 rounded-xl border border-verta-slate-blue/30">
                    <div>
                      <p className="font-bold text-white">Carátula de Cuentas Bancarias</p>
                      <p className="text-[11px] text-gray-400">Requiere autorización previa expresa del proveedor por cada descarga.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={allowFinancialDownload}
                      onChange={(e) => {
                        setAllowFinancialDownload(e.target.checked);
                        showToast(`Permiso bancario: ${e.target.checked ? 'Permitido' : 'Restringido'}`);
                      }}
                      className="w-4 h-4 accent-verta-cyan cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Verified Trust Badge embed */}
              <div className="verta-glass border border-emerald-500/30 rounded-2xl p-6 space-y-3 bg-verta-dark-blue/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">Distintivo Web de Proveedor Verificado</span>
                  <span className="text-[10px] font-mono text-gray-400">HTML Embed</span>
                </div>
                <p className="text-xs text-gray-300">
                  Incruste este distintivo dinámico en el pie de página de su sitio web o en sus cotizaciones para demostrar solvencia y auditoría activa en VERTA.
                </p>

                <div className="p-3 bg-verta-navy border border-verta-slate-blue/50 rounded-xl font-mono text-[11px] text-verta-cyan break-all">
                  {`<a href="https://verta.io/audit/VTS-040815" target="_blank"><img src="https://verta.io/badge/gold-verified.svg" alt="VERTA Verified" /></a>`}
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`<a href="https://verta.io/audit/VTS-040815" target="_blank"><img src="https://verta.io/badge/gold-verified.svg" alt="VERTA Verified" /></a>`);
                    setBadgeCopied(true);
                    showToast('Código de distintivo copiado al portapapeles');
                    setTimeout(() => setBadgeCopied(false), 2500);
                  }}
                  className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  {badgeCopied ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  <span>{badgeCopied ? '¡Código Copiado!' : 'Copiar Código de Distintivo'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 6: PROMOCIÓN COMERCIAL (PAQUETE 2 · MEDIUM) */}
      {activeSubTab === 'promocion' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-verta-slate-blue/30 pb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-white font-display">Promoción Comercial y Visibilidad VERTA</h2>
              <p className="text-xs text-gray-400">
                Sección habilitada desde Paquete 2 · Medium: solicitud de campaña, materiales de marca, seguimiento del contenido publicado en redes de VERTA y participación en la revista.
              </p>
            </div>
            <button
              onClick={onOpenPackages}
              className="px-3.5 py-2 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-300 font-mono font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center space-x-1.5 whitespace-nowrap"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Cambiar Paquete</span>
            </button>
          </div>

          {!hasMediumAccess ? (
            <div className="verta-glass border border-sky-400/40 rounded-2xl p-8 text-center space-y-4 bg-verta-dark-blue/60">
              <Lock className="w-10 h-10 text-sky-400 mx-auto" />
              <div className="space-y-1.5 max-w-xl mx-auto">
                <h3 className="text-lg font-bold text-white font-display">
                  Disponible a partir de Paquete 2 · Medium
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Tu plan actual es <strong className="text-white">{activePkg.name}</strong>. Actualiza a Paquete 2 · Medium o Paquete 3 · Premium para habilitar campañas en redes VERTA, carga de materiales de marca y aparición en la revista VERTA.
                </p>
              </div>
              <button
                onClick={onOpenPackages}
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-verta-navy font-mono font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center space-x-2"
              >
                <Package className="w-4 h-4" />
                <span>Explorar Paquetes y Activar Medium</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Campaign Request & Brand Materials */}
              <div className="verta-glass border border-sky-400/35 rounded-2xl p-6 space-y-4 bg-verta-dark-blue/60">
                <div className="flex items-center justify-between border-b border-verta-slate-blue/40 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-sky-400" />
                    <span>Solicitud de Campaña y Materiales de Marca</span>
                  </h3>
                  <span className="text-xs font-mono text-sky-300">Paquete 2 · Medium</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-gray-300 font-mono block">Objetivo de campaña en redes VERTA</label>
                    <input
                      type="text"
                      value={campaignGoal}
                      onChange={(e) => setCampaignGoal(e.target.value)}
                      className="w-full bg-verta-navy border border-verta-slate-blue/60 focus:border-sky-400 focus:outline-none rounded-xl px-3.5 py-2 text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-300 font-mono block">Tema propuesto para Revista VERTA</label>
                    <input
                      type="text"
                      value={magazineTopic}
                      onChange={(e) => setMagazineTopic(e.target.value)}
                      className="w-full bg-verta-navy border border-verta-slate-blue/60 focus:border-sky-400 focus:outline-none rounded-xl px-3.5 py-2 text-white text-xs"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setCampaignRequested(true);
                      showToast('Solicitud de campaña comercial y participación en Revista VERTA registrada.');
                    }}
                    className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-verta-navy font-mono font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{campaignRequested ? 'Actualizar Solicitud de Campaña' : 'Enviar Solicitud de Campaña'}</span>
                  </button>
                </div>
              </div>

              {/* Publication Tracking */}
              <div className="verta-glass border border-verta-slate-blue/50 rounded-2xl p-6 space-y-4 bg-verta-dark-blue/60">
                <div className="flex items-center justify-between border-b border-verta-slate-blue/40 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-verta-cyan" />
                    <span>Seguimiento de Contenido y Revista VERTA</span>
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">
                    {campaignRequested ? 'En programación' : 'Listo para iniciar'}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-verta-navy/70 border border-verta-slate-blue/40 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-white">Campaña en Redes Sociales VERTA</p>
                      <p className="text-gray-400">LinkedIn, Facebook e Instagram institucional</p>
                    </div>
                    <span className="font-mono text-sky-300 shrink-0">
                      {campaignRequested ? 'Solicitud recibida' : 'Pendiente de brief'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-verta-navy/70 border border-verta-slate-blue/40 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-white">Materiales de Marca (Kit Gráfico)</p>
                      <p className="text-gray-400">Logotipo vectorial, paleta y brochure corporativo</p>
                    </div>
                    <span className="font-mono text-emerald-400 shrink-0">Habilitado</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-verta-navy/70 border border-verta-slate-blue/40 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-white">Participación en Revista VERTA</p>
                      <p className="text-gray-400">Espacio editorial para proveedores homologados</p>
                    </div>
                    <span className="font-mono text-verta-cyan shrink-0">
                      {campaignRequested ? 'Reservado' : 'Disponible'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 7: DIAGNÓSTICOS Y SERVICIOS ESPECIALIZADOS (PAQUETE 3 · PREMIUM) */}
      {activeSubTab === 'diagnosticos' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-verta-slate-blue/30 pb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-white font-display">Diagnósticos y Servicios Especializados</h2>
              <p className="text-xs text-gray-400">
                Sección habilitada en Paquete 3 · Premium: solicitud de diagnósticos, consulta de resultados y seguimiento a servicios personalizados de marketing y apoyo administrativo.
              </p>
            </div>
            <button
              onClick={onOpenPackages}
              className="px-3.5 py-2 bg-verta-coral/15 hover:bg-verta-coral/25 border border-verta-coral/40 text-verta-coral font-mono font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center space-x-1.5 whitespace-nowrap"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Cambiar Paquete</span>
            </button>
          </div>

          {!hasPremiumAccess ? (
            <div className="verta-glass border border-verta-coral/40 rounded-2xl p-8 text-center space-y-4 bg-verta-dark-blue/60">
              <Lock className="w-10 h-10 text-verta-coral mx-auto" />
              <div className="space-y-1.5 max-w-xl mx-auto">
                <h3 className="text-lg font-bold text-white font-display">
                  Exclusivo de Paquete 3 · Premium
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Tu plan actual es <strong className="text-white">{activePkg.name}</strong>. Selecciona Paquete 3 · Premium para acceder a diagnóstico gratuito de página web, revisión de procesos administrativos, servicio de marketing de marca y apoyo administrativo personalizado.
                </p>
              </div>
              <button
                onClick={onOpenPackages}
                className="px-5 py-2.5 bg-verta-coral hover:bg-verta-coral-hover text-white font-mono font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center space-x-2"
              >
                <Package className="w-4 h-4" />
                <span>Activar Paquete 3 · Premium</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Diagnostics Request & Results */}
              <div className="verta-glass border border-verta-coral/40 rounded-2xl p-6 space-y-4 bg-verta-dark-blue/60">
                <div className="flex items-center justify-between border-b border-verta-slate-blue/40 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileBarChart2 className="w-4 h-4 text-verta-coral" />
                    <span>Solicitud y Resultados de Diagnósticos</span>
                  </h3>
                  <span className="text-xs font-mono text-verta-coral">Premium</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-verta-navy/70 border border-verta-slate-blue/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Diagnóstico gratuito de página web</span>
                      <span className="font-mono text-emerald-400">
                        {webDiagnosticRequested ? 'En evaluación' : 'Disponible'}
                      </span>
                    </div>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full bg-verta-dark-blue border border-verta-slate-blue/60 focus:border-verta-coral focus:outline-none rounded-lg px-3 py-1.5 text-white text-xs font-mono"
                    />
                    <button
                      onClick={() => {
                        setWebDiagnosticRequested(true);
                        showToast(`Diagnóstico web solicitado para ${websiteUrl}.`);
                      }}
                      className="px-3.5 py-2 bg-verta-coral hover:bg-verta-coral-hover text-white font-mono font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      {webDiagnosticRequested ? 'Diagnóstico Solicitado' : 'Solicitar Diagnóstico Web'}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-verta-navy/70 border border-verta-slate-blue/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Diagnóstico / revisión de procesos administrativos</span>
                      <span className="font-mono text-verta-cyan">
                        {adminDiagnosticRequested ? 'Sesión agendada' : 'Disponible'}
                      </span>
                    </div>
                    <p className="text-gray-400">
                      Evaluación de controles internos, flujos de facturación, expediente normativo y eficiencia administrativa.
                    </p>
                    <button
                      onClick={() => {
                        setAdminDiagnosticRequested(true);
                        showToast('Revisión de procesos administrativos solicitada al equipo consultor VERTA.');
                      }}
                      className="px-3.5 py-2 bg-verta-cyan/20 hover:bg-verta-cyan/30 border border-verta-cyan/40 text-verta-cyan font-mono font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      {adminDiagnosticRequested ? 'Revisión en Curso' : 'Solicitar Revisión Administrativa'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Personalized Services Tracking */}
              <div className="verta-glass border border-verta-slate-blue/50 rounded-2xl p-6 space-y-4 bg-verta-dark-blue/60">
                <div className="flex items-center justify-between border-b border-verta-slate-blue/40 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Settings className="w-4 h-4 text-verta-cyan" />
                    <span>Seguimiento de Servicios Personalizados</span>
                  </h3>
                  <span className="text-xs font-mono text-gray-400 tabular-nums">
                    {packageSelection.selectedServiceIds.length} activos
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {PACKAGE_FEATURES.filter((f) => f.category === 'diagnostico').map((feat) => {
                    const active = packageSelection.selectedServiceIds.includes(feat.id);
                    return (
                      <div
                        key={feat.id}
                        className="p-3.5 rounded-xl bg-verta-navy/70 border border-verta-slate-blue/40 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-white">{feat.label}</p>
                          <p className="text-gray-400">{feat.description}</p>
                        </div>
                        <span className={`font-mono shrink-0 ${active ? 'text-emerald-400' : 'text-gray-500'}`}>
                          {active ? 'Seleccionado' : 'Opcional'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
