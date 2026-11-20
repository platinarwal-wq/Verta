/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  FileCheck2, 
  TrendingUp, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Fingerprint, 
  ExternalLink,
  ShieldAlert,
  ChevronRight,
  Check,
  Search,
  BookOpen,
  X,
  Bell
} from 'lucide-react';
import { VerificationDocument, DocumentStatus } from '../types';

interface DashboardSummaryProps {
  documents: VerificationDocument[];
  onUploadClick?: (doc: VerificationDocument) => void;
  onFastCheck?: (docId: string, action: 'approve' | 'reject', comment?: string) => void;
  activeProviderName: string;
}

interface ProviderData {
  id: string;
  name: string;
  rfc: string;
  sector: string;
  region: string;
  employees: string;
  complianceScore: number;
  docs: {
    id: string;
    title: string;
    status: DocumentStatus;
    lastUpdated: string | null;
    expirationDays: number | null;
    ocrConfidence: number;
    requirement: 'Required' | 'Optional';
  }[];
}

// Simulated data for other providers so the user can genuinely "analizar a cada proveedor"
const OTHER_PROVIDERS: ProviderData[] = [
  {
    id: 'prov_logistica',
    name: 'Logística Multimodal del Centro S.A. de C.V.',
    rfc: 'LMC-881204-TR9',
    sector: 'Logística & Transporte',
    region: 'Estado de México',
    employees: '250+ empleados',
    complianceScore: 98,
    docs: [
      { id: 'acta_constitutiva', title: 'Acta Constitutiva', status: 'validado', lastUpdated: '10/05/2026', expirationDays: null, ocrConfidence: 99, requirement: 'Required' },
      { id: 'rfc', title: 'Constancia de Situación Fiscal (RFC)', status: 'validado', lastUpdated: '10/05/2026', ocrConfidence: 97, expirationDays: null, requirement: 'Required' },
      { id: 'sat_opinion', title: 'Opinión de Cumplimiento SAT', status: 'validado', lastUpdated: '12/05/2026', ocrConfidence: 94, expirationDays: 12, requirement: 'Required' }, // Expiring soon!
      { id: 'domicilio', title: 'Comprobante de Domicilio', status: 'validado', lastUpdated: '08/05/2026', ocrConfidence: 92, expirationDays: 48, requirement: 'Required' },
      { id: 'id_oficial', title: 'Identificación Oficial', status: 'validado', lastUpdated: '10/05/2026', ocrConfidence: 96, expirationDays: null, requirement: 'Required' }
    ]
  },
  {
    id: 'prov_constructor',
    name: 'Grupo Constructor Metrópoli S.A.',
    rfc: 'GCM-940301-KL2',
    sector: 'Construcción & Infraestructura',
    region: 'Nuevo León',
    employees: '250+ empleados',
    complianceScore: 94,
    docs: [
      { id: 'acta_constitutiva', title: 'Acta Constitutiva', status: 'validado', lastUpdated: '28/04/2026', ocrConfidence: 98, expirationDays: null, requirement: 'Required' },
      { id: 'rfc', title: 'Constancia de Situación Fiscal (RFC)', status: 'validado', lastUpdated: '28/04/2026', ocrConfidence: 95, expirationDays: null, requirement: 'Required' },
      { id: 'sat_opinion', title: 'Opinión de Cumplimiento SAT', status: 'validado', lastUpdated: '30/04/2026', ocrConfidence: 91, expirationDays: 8, requirement: 'Required' }, // Expiring very soon!
      { id: 'domicilio', title: 'Comprobante de Domicilio', status: 'validado', lastUpdated: '29/04/2026', ocrConfidence: 89, expirationDays: 32, requirement: 'Required' },
      { id: 'id_oficial', title: 'Identificación Oficial', status: 'pendiente', lastUpdated: '14/05/2026', ocrConfidence: 88, expirationDays: null, requirement: 'Required' }
    ]
  },
  {
    id: 'prov_alimentos',
    name: 'Alimentos y Distribución Express S.A.',
    rfc: 'ADE-010515-FG3',
    sector: 'Alimentario & Retail',
    region: 'Jalisco',
    employees: '100-250 empleados',
    complianceScore: 78,
    docs: [
      { id: 'acta_constitutiva', title: 'Acta Constitutiva', status: 'validado', lastUpdated: '02/05/2026', ocrConfidence: 96, expirationDays: null, requirement: 'Required' },
      { id: 'rfc', title: 'Constancia de Situación Fiscal (RFC)', status: 'validado', lastUpdated: '02/05/2026', ocrConfidence: 94, expirationDays: null, requirement: 'Required' },
      { id: 'sat_opinion', title: 'Opinión de Cumplimiento SAT', status: 'corregir', lastUpdated: '05/05/2026', ocrConfidence: 45, expirationDays: null, requirement: 'Required' }, // Rejected/needs correction
      { id: 'domicilio', title: 'Comprobante de Domicilio', status: 'pendiente', lastUpdated: '20/05/2026', ocrConfidence: 82, expirationDays: null, requirement: 'Required' },
      { id: 'id_oficial', title: 'Identificación Oficial', status: 'no_entregado', lastUpdated: null, ocrConfidence: 0, expirationDays: null, requirement: 'Required' }
    ]
  },
  {
    id: 'prov_acero',
    name: 'Comercializadora de Acero de Occidente',
    rfc: 'CAO-101115-ST1',
    sector: 'Manufactura & Metalurgia',
    region: 'Querétaro',
    employees: '50-100 empleados',
    complianceScore: 60,
    docs: [
      { id: 'acta_constitutiva', title: 'Acta Constitutiva', status: 'validado', lastUpdated: '15/05/2026', ocrConfidence: 97, expirationDays: null, requirement: 'Required' },
      { id: 'rfc', title: 'Constancia de Situación Fiscal (RFC)', status: 'corregir', lastUpdated: '16/05/2026', ocrConfidence: 50, expirationDays: null, requirement: 'Required' },
      { id: 'sat_opinion', title: 'Opinión de Cumplimiento SAT', status: 'no_entregado', lastUpdated: null, ocrConfidence: 0, expirationDays: null, requirement: 'Required' },
      { id: 'domicilio', title: 'Comprobante de Domicilio', status: 'no_entregado', lastUpdated: null, ocrConfidence: 0, expirationDays: null, requirement: 'Required' },
      { id: 'id_oficial', title: 'Identificación Oficial', status: 'no_entregado', lastUpdated: null, ocrConfidence: 0, expirationDays: null, requirement: 'Required' }
    ]
  }
];

export function DashboardSummary({ documents, onUploadClick, onFastCheck, activeProviderName }: DashboardSummaryProps) {
  const [selectedProviderId, setSelectedProviderId] = useState<string>('prov_active');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dismissedNotifications, setDismissedNotifications] = useState<string[]>([]);
  const [showNotificationsHub, setShowNotificationsHub] = useState<boolean>(true);

  // Re-map active provider documents dynamically so we have the same fields
  const activeProviderMappedDocs = documents.map(doc => {
    // Generate simulated OCR score based on status to make it visually exciting and consistent
    let ocrConfidence = 0;
    if (doc.status === 'validado') ocrConfidence = doc.id === 'acta_constitutiva' ? 98 : doc.id === 'rfc' ? 97 : 94;
    else if (doc.status === 'pendiente') ocrConfidence = 88;
    else if (doc.status === 'corregir') ocrConfidence = 52;

    // Simulate expiration days for Opinión de Cumplimiento SAT and Comprobante de Domicilio if they are validated
    let expirationDays: number | null = null;
    if (doc.status === 'validado') {
      if (doc.id === 'sat_opinion') expirationDays = 14; // Soon!
      else if (doc.id === 'domicilio') expirationDays = 72;
    }

    return {
      id: doc.id,
      title: doc.title,
      status: doc.status,
      lastUpdated: doc.lastUpdated,
      expirationDays,
      ocrConfidence,
      requirement: doc.requirement
    };
  });

  // Calculate live compliance score for Active Provider
  const activeValidatedCount = documents.filter(d => d.status === 'validado').length;
  const activeTotalCount = documents.length;
  const activeCompliancePercent = Math.round((activeValidatedCount / activeTotalCount) * 100);

  // Active Provider structural data
  const activeProviderData: ProviderData = {
    id: 'prov_active',
    name: activeProviderName,
    rfc: 'VTS-040815-H42',
    sector: 'Tecnología & SaaS',
    region: 'Ciudad de México',
    employees: '50-250 empleados',
    complianceScore: activeCompliancePercent,
    docs: activeProviderMappedDocs
  };

  // Combine Active and simulated providers for selector
  const allProviders = [activeProviderData, ...OTHER_PROVIDERS];

  // List of all expiring documents across ALL providers in the next 15 days
  const expiringDocumentsAllProviders = allProviders.flatMap(prov => {
    return prov.docs
      .filter(d => d.status === 'validado' && d.expirationDays !== null && d.expirationDays <= 15)
      .map(d => ({
        keyId: `${prov.id}-${d.id}`,
        providerId: prov.id,
        providerName: prov.name,
        rfc: prov.rfc,
        id: d.id,
        title: d.title,
        status: d.status,
        lastUpdated: d.lastUpdated,
        expirationDays: d.expirationDays,
        ocrConfidence: d.ocrConfidence,
        requirement: d.requirement
      }));
  });

  const activeAlerts = expiringDocumentsAllProviders.filter(alert => !dismissedNotifications.includes(alert.keyId));

  // Filter providers based on search query
  const filteredProviders = allProviders.filter(prov => 
    prov.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prov.rfc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prov.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Selected provider details
  const provider = allProviders.find(p => p.id === selectedProviderId) || activeProviderData;

  // Compute metrics for the selected provider
  const docsList = provider.docs;
  const totalDocs = docsList.length;
  const validatedDocs = docsList.filter(d => d.status === 'validado').length;
  const pendingDocs = docsList.filter(d => d.status === 'pendiente').length;
  const rejectedDocs = docsList.filter(d => d.status === 'corregir').length;
  const notDeliveredDocs = docsList.filter(d => d.status === 'no_entregado').length;

  const verificationPercent = Math.round((validatedDocs / totalDocs) * 100);

  // Widget 2 calculation: Last validated document
  // Sort documents by status === 'validado', prioritizing having a lastUpdated value
  const validatedList = docsList.filter(d => d.status === 'validado');
  const lastValidatedDoc = validatedList.length > 0 
    ? validatedList[validatedList.length - 1] 
    : null;

  // Widget 3 calculation: Expirations
  // Find any validated document with expirationDays <= 30
  const expiringSoonDocs = docsList.filter(d => d.status === 'validado' && d.expirationDays !== null && d.expirationDays <= 30);
  const criticalExpiration = expiringSoonDocs.length > 0 
    ? expiringSoonDocs[0] 
    : docsList.find(d => d.expirationDays !== null && d.expirationDays <= 30) || null;

  // SVG Progress circle calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (verificationPercent / 100) * circumference;

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 space-y-10 animate-fade-in text-white font-sans">
      
      {/* TITLE CONTAINER */}
      <div className="border-b border-verta-slate-blue/40 pb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-verta-cyan flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Métrica Analítica de Contratistas</span>
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight mt-1 font-display">
            Análisis de Proveedores & Compliance
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Audite el nivel de riesgo, avance de validación OCR y vigencia legal de cada proveedor en tiempo real.
          </p>
        </div>

        {/* SEARCH BAR FOR PROVIDERS */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por nombre, RFC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-verta-navy/60 border border-verta-slate-blue/60 rounded-xl py-2 pl-9 pr-4 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-verta-cyan/80 focus:ring-1 focus:ring-verta-cyan/30"
          />
        </div>
      </div>

      {/* SISTEMA DE NOTIFICACIONES DE VENCIMIENTO (Próximos 15 días) */}
      {activeAlerts.length > 0 && (
        <div className="animate-fade-in relative">
          <div className="verta-glass border border-verta-coral/40 rounded-3xl p-5 bg-gradient-to-r from-verta-coral/10 via-verta-navy/65 to-verta-dark-blue/70 relative overflow-hidden">
            {/* Pulsing glow background */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-verta-coral/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-verta-slate-blue/30 pb-3">
              <div className="flex items-center space-x-3 text-left">
                <div className="relative">
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-verta-coral opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-verta-coral"></span>
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-verta-coral/20 border border-verta-coral/40 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-verta-coral animate-bounce" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Centro de Alertas de Compliance
                    <span className="bg-verta-coral/20 text-verta-coral border border-verta-coral/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                      {activeAlerts.length} {activeAlerts.length === 1 ? 'ALERTA CRÍTICA' : 'ALERTAS CRÍTICAS'}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Se detectaron documentos clave que vencerán en los próximos 15 días. Requiere acción inmediata.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => setShowNotificationsHub(!showNotificationsHub)}
                  className="px-3 py-1.5 bg-verta-slate-blue/20 hover:bg-verta-slate-blue/40 border border-verta-slate-blue/40 rounded-xl text-xs font-mono text-gray-300 transition-all cursor-pointer"
                >
                  {showNotificationsHub ? 'Minimizar' : 'Expandir'}
                </button>
                <button
                  onClick={() => {
                    setDismissedNotifications([...dismissedNotifications, ...activeAlerts.map(a => a.keyId)]);
                  }}
                  className="px-3 py-1.5 bg-verta-coral/20 hover:bg-verta-coral/45 border border-verta-coral/30 rounded-xl text-xs font-mono text-verta-coral font-bold transition-all cursor-pointer"
                >
                  Silenciar Todas
                </button>
              </div>
            </div>

            {showNotificationsHub && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 animate-slide-down">
                {activeAlerts.map((alert) => {
                  const isCurrentProvider = alert.providerId === selectedProviderId;
                  
                  return (
                    <div 
                      key={alert.keyId}
                      className={`p-4 rounded-2xl border transition-all relative group flex flex-col justify-between space-y-3 text-left ${
                        isCurrentProvider 
                          ? 'bg-verta-coral/15 border-verta-coral shadow-[0_4px_15px_rgba(249,115,22,0.15)]'
                          : 'bg-verta-navy/60 border-verta-slate-blue/50 hover:border-verta-coral/40'
                      }`}
                    >
                      <button
                        onClick={() => setDismissedNotifications([...dismissedNotifications, alert.keyId])}
                        className="absolute top-2.5 right-2.5 text-gray-500 hover:text-white transition-colors cursor-pointer"
                        title="Descartar alerta"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="space-y-2 pr-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            alert.expirationDays !== null && alert.expirationDays <= 10 
                              ? 'bg-verta-coral/20 text-verta-coral border border-verta-coral/30' 
                              : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                          }`}>
                            ⚠️ VENCE EN {alert.expirationDays} DÍAS
                          </span>
                          
                          {isCurrentProvider && (
                            <span className="bg-verta-cyan/20 text-verta-cyan border border-verta-cyan/30 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                              Seleccionado
                            </span>
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-white line-clamp-1" title={alert.title}>
                            {alert.title}
                          </h4>
                          <span className="text-[10px] text-gray-400 block truncate" title={alert.providerName}>
                            🏢 {alert.providerName}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[9px] font-mono text-gray-500">
                          RFC: {alert.rfc}
                        </span>
                        
                        <div className="flex items-center space-x-1.5">
                          {!isCurrentProvider ? (
                            <button
                              onClick={() => setSelectedProviderId(alert.providerId)}
                              className="px-2.5 py-1 bg-verta-cyan hover:bg-verta-cyan/85 text-[10px] font-mono font-bold text-white rounded-lg transition-all cursor-pointer flex items-center space-x-1"
                            >
                              <span>Analizar</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          ) : (
                            onUploadClick && (
                              <button
                                onClick={() => {
                                  const realDoc = documents.find(d => d.id === alert.id);
                                  if (realDoc) onUploadClick(realDoc);
                                }}
                                className="px-2.5 py-1 bg-verta-coral hover:bg-verta-coral/85 text-[10px] font-mono font-bold text-white rounded-lg transition-all cursor-pointer flex items-center space-x-1 shadow-[0_0_10px_rgba(249,115,22,0.3)] animate-pulse"
                              >
                                <span>Actualizar</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* HORIZONTAL PROVIDER SELECTOR */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
          Seleccione un Proveedor para Analizar
        </h3>
        
        <div className="flex gap-4 overflow-x-auto pb-3 snap-x scrollbar-thin scrollbar-thumb-verta-slate-blue/55">
          {filteredProviders.map((prov) => {
            const isSelected = prov.id === selectedProviderId;
            const provVerified = prov.docs.filter(d => d.status === 'validado').length;
            const provTotal = prov.docs.length;
            const provPercent = Math.round((provVerified / provTotal) * 100);

            // Determine border and accent based on percentage
            let statusColor = 'border-verta-coral';
            let bgGlow = 'bg-verta-coral/5';
            if (provPercent >= 80) {
              statusColor = 'border-verta-emerald';
              bgGlow = 'bg-verta-emerald/5';
            } else if (provPercent >= 40) {
              statusColor = 'border-verta-cyan';
              bgGlow = 'bg-verta-cyan/5';
            }

            return (
              <div
                key={prov.id}
                onClick={() => setSelectedProviderId(prov.id)}
                className={`flex-shrink-0 w-72 p-4 rounded-2xl border transition-all duration-300 cursor-pointer snap-start relative overflow-hidden ${
                  isSelected 
                    ? `bg-verta-dark-blue/80 border-verta-cyan shadow-[0_5px_20px_rgba(6,182,212,0.25)] scale-[1.02]`
                    : `bg-verta-navy/40 border-verta-slate-blue/40 hover:bg-verta-navy/75 hover:border-verta-slate-blue/80`
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-400 bg-verta-slate-blue/30 border border-verta-slate-blue/50 px-2 py-0.5 rounded-full">
                      {prov.id === 'prov_active' ? '🔑 Principal (Tus datos)' : 'Empresa Externa'}
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${provPercent >= 80 ? 'text-verta-emerald' : provPercent >= 40 ? 'text-verta-cyan' : 'text-verta-coral'}`}>
                      {provPercent}% Compliance
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-white truncate max-w-[240px]" title={prov.name}>
                      {prov.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-mono block">RFC: {prov.rfc}</span>
                  </div>

                  {/* Tiny indicator bar */}
                  <div className="w-full bg-verta-navy h-1.5 rounded-full overflow-hidden border border-verta-slate-blue/20">
                    <div 
                      className={`h-full rounded-full ${provPercent >= 80 ? 'bg-verta-emerald' : provPercent >= 40 ? 'bg-verta-cyan' : 'bg-verta-coral'}`} 
                      style={{ width: `${provPercent}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                    <span>{prov.sector}</span>
                    <span>{provVerified}/{provTotal} Docs</span>
                  </div>
                </div>

                {/* Subtle highlight gradient when selected */}
                {isSelected && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-verta-cyan via-verta-cobalt to-verta-coral" />
                )}
              </div>
            );
          })}

          {filteredProviders.length === 0 && (
            <div className="w-full text-center py-6 text-xs font-mono text-gray-400 bg-verta-navy/20 border border-dashed border-verta-slate-blue/40 rounded-2xl">
              No se encontraron proveedores que coincidan con la búsqueda.
            </div>
          )}
        </div>
      </div>

      {/* PROVIDER METADATA SHEET (Selected Provider Overview) */}
      <div className="verta-glass border border-verta-slate-blue/50 rounded-3xl p-6 relative overflow-hidden bg-gradient-to-br from-verta-dark-blue/80 to-verta-navy/50">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-tr from-verta-cyan/5 via-verta-cobalt/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-verta-slate-blue/30 pb-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-verta-cyan/15 text-verta-cyan border border-verta-cyan/35 text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full uppercase">
                {provider.sector}
              </span>
              <span className="bg-verta-slate-blue/30 text-gray-300 border border-verta-slate-blue/40 text-[9px] font-mono px-2 py-0.5 rounded-full">
                📍 {provider.region}
              </span>
              <span className="bg-verta-slate-blue/30 text-gray-300 border border-verta-slate-blue/40 text-[9px] font-mono px-2 py-0.5 rounded-full">
                👥 {provider.employees}
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
              {provider.name}
            </h3>
            <span className="text-xs text-gray-400 font-mono block">
              Registro Federal de Contribuyentes: <strong className="text-white font-bold">{provider.rfc}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-3.5 bg-verta-navy/60 border border-verta-slate-blue/60 p-3.5 rounded-2xl shrink-0">
            <div className="text-right">
              <span className="text-[9px] text-gray-400 font-mono block uppercase tracking-wider">Score de Compliance</span>
              <span className="text-xl font-mono font-black text-white leading-none mt-1 block">
                {provider.complianceScore} pts
              </span>
            </div>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs ${
              provider.complianceScore >= 80 
                ? 'bg-verta-emerald/25 border border-verta-emerald text-verta-emerald shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                : provider.complianceScore >= 50 
                ? 'bg-verta-cyan/25 border border-verta-cyan text-verta-cyan' 
                : 'bg-verta-coral/25 border border-verta-coral text-verta-coral animate-pulse'
            }`}>
              {provider.complianceScore >= 80 ? 'Gold' : provider.complianceScore >= 50 ? 'Silver' : 'Risk'}
            </div>
          </div>
        </div>

        {/* METRICS WIDGETS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          
          {/* WIDGET 1: CIRCULAR PROGRESS LEVEL */}
          <div className="verta-glass bg-verta-navy/50 border border-verta-slate-blue/45 p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 relative group">
            <span className="absolute top-3 left-4 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">
              Nivel de Verificación
            </span>

            {/* HIGH POLISH SVG CIRCULAR PROGRESS BAR */}
            <div className="relative w-36 h-36 flex items-center justify-center mt-3">
              {/* Radial gradient background blur */}
              <div className="absolute inset-6 bg-gradient-to-tr from-verta-cyan/10 to-verta-cobalt/10 rounded-full blur-md" />
              
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Track Circle */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-verta-navy"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-verta-slate-blue/20"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Glowing Active Progress Stroke */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  stroke="url(#progress-gradient)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Text inside circle */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white font-mono leading-none tracking-tighter">
                  {verificationPercent}%
                </span>
                <span className="text-[10px] text-gray-400 font-mono mt-1 font-semibold">
                  Aprobado
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-gray-400 pt-1">
              <span>{validatedDocs} de {totalDocs} requisitos completados</span>
            </div>
          </div>

          {/* WIDGET 2: LAST VALIDATED DOCUMENT */}
          <div className="verta-glass bg-verta-navy/50 border border-verta-slate-blue/45 p-5 rounded-2xl flex flex-col justify-between relative group">
            <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-4">
              Último Requisito Validado
            </span>

            {lastValidatedDoc ? (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-verta-emerald/15 border border-verta-emerald/30 flex items-center justify-center shrink-0 mt-1">
                    <FileCheck2 className="w-5 h-5 text-verta-emerald" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block leading-snug line-clamp-2">
                      {lastValidatedDoc.title}
                    </span>
                    <span className="text-[10px] text-verta-cyan font-mono block">
                      Acreditación Formal
                    </span>
                  </div>
                </div>

                <div className="bg-verta-navy/70 border border-verta-slate-blue/20 p-2.5 rounded-xl space-y-1.5 font-mono text-[10px] text-gray-400">
                  <div className="flex justify-between">
                    <span>Fecha de Validación</span>
                    <span className="text-white font-bold">{lastValidatedDoc.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Integridad OCR</span>
                    <span className="text-verta-emerald font-bold">{lastValidatedDoc.ocrConfidence}% Confianza</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auditado por</span>
                    <span className="text-white font-semibold">VERTA AI Engine</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 text-[10px] text-verta-emerald bg-verta-emerald/10 border border-verta-emerald/20 px-2.5 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-sans leading-none font-medium">Sello Verde de Validación Otorgado</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-verta-slate-blue/20 border border-verta-slate-blue/40 flex items-center justify-center mx-auto">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-400 leading-normal font-sans">No hay documentos validados para este proveedor aún.</p>
              </div>
            )}
          </div>

          {/* WIDGET 3: EXPIRATION ALERT */}
          <div className="verta-glass bg-verta-navy/50 border border-verta-slate-blue/45 p-5 rounded-2xl flex flex-col justify-between relative group">
            <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block mb-4">
              Vigilancia de Vencimiento
            </span>

            {criticalExpiration && criticalExpiration.expirationDays !== null ? (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-1 animate-pulse ${
                    criticalExpiration.expirationDays <= 15 
                      ? 'bg-verta-coral/15 border border-verta-coral/40 text-verta-coral' 
                      : 'bg-amber-400/10 border border-amber-400/30 text-amber-400'
                  }`}>
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block leading-snug line-clamp-2">
                      {criticalExpiration.title}
                    </span>
                    <span className={`text-[10px] font-mono font-bold block ${
                      criticalExpiration.expirationDays <= 15 ? 'text-verta-coral' : 'text-amber-400'
                    }`}>
                      Vence próximamente
                    </span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl space-y-1 ${
                  criticalExpiration.expirationDays <= 15 
                    ? 'bg-verta-coral/10 border border-verta-coral/20 text-verta-coral' 
                    : 'bg-amber-400/5 border border-amber-400/15 text-amber-400'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="font-sans">Plazo de actualización:</span>
                    <span className="font-mono text-sm uppercase tracking-tight">
                      {criticalExpiration.expirationDays} días
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-sans mt-1">
                    La normativa fiscal SAT exige re-validar este requisito cada 30 días para conservar la acreditación comercial del contrato.
                  </p>
                </div>

                {provider.id === 'prov_active' && onUploadClick ? (
                  <button
                    onClick={() => {
                      // Trigger active provider upload click simulation
                      const realDoc = documents.find(d => d.id === criticalExpiration.id);
                      if (realDoc) onUploadClick(realDoc);
                    }}
                    className="w-full py-2 bg-verta-coral hover:bg-verta-coral/85 text-white text-[10px] font-mono font-bold rounded-xl verta-coral-btn cursor-pointer inline-flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>ACTUALIZAR REQUISITO AHORA</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="text-[10px] font-mono text-gray-400 bg-verta-navy/50 p-2 rounded-lg border border-verta-slate-blue/20 text-center">
                    ⚠️ Alerta de renovación notificada al proveedor.
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* No critical expirations */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-verta-emerald/10 border border-verta-emerald/30 flex items-center justify-center text-verta-emerald">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Estatus de Alertas Limpio</span>
                    <span className="text-[10px] text-verta-emerald font-mono block">Todo en orden</span>
                  </div>
                </div>
                
                <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                  No se detectaron alertas de vencimiento críticas en las próximas semanas. Todos los documentos validados cuentan con vigencia legal prolongada.
                </p>

                <div className="border-t border-verta-slate-blue/20 pt-3 text-[10px] font-mono text-gray-500">
                  <span>Monitoreo automatizado continuo activo.</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* DETAILED DOCUMENTS AUDIT COMPONENT */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-verta-slate-blue/30 pb-3 gap-2">
          <h3 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
            <Layers className="w-4 h-4 text-verta-cyan" />
            <span>Desglose de Expediente de Cumplimiento</span>
          </h3>
          <span className="text-[10px] font-mono text-gray-500">
            Mostrando {totalDocs} requisitos auditables
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {docsList.map((doc) => {
            // Determine styling based on status
            let statusLabel = '';
            let statusColor = '';
            let iconBox = null;

            switch (doc.status) {
              case 'validado':
                statusLabel = 'Validado por IA';
                statusColor = 'text-verta-emerald bg-verta-emerald/10 border-verta-emerald/25';
                iconBox = <Check className="w-4.5 h-4.5 text-verta-emerald" />;
                break;
              case 'pendiente':
                statusLabel = 'En Revisión (OCR)';
                statusColor = 'text-verta-cyan bg-verta-cyan/10 border-verta-cyan/25 animate-pulse';
                iconBox = <Clock className="w-4.5 h-4.5 text-verta-cyan" />;
                break;
              case 'corregir':
                statusLabel = 'Requiere Corrección';
                statusColor = 'text-verta-coral bg-verta-coral/10 border-verta-coral/25';
                iconBox = <AlertTriangle className="w-4.5 h-4.5 text-verta-coral" />;
                break;
              case 'no_entregado':
                statusLabel = 'No Entregado';
                statusColor = 'text-gray-400 bg-verta-slate-blue/20 border-verta-slate-blue/30';
                iconBox = <ShieldAlert className="w-4.5 h-4.5 text-gray-400" />;
                break;
            }

            return (
              <div 
                key={doc.id}
                className="p-5 rounded-2xl bg-verta-navy/35 border border-verta-slate-blue/50 flex flex-col justify-between space-y-4 relative overflow-hidden group hover:border-verta-slate-blue/80 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold border px-2 py-0.5 rounded-full ${statusColor}`}>
                      {statusLabel}
                    </span>
                    <span className="text-[9px] font-mono text-gray-400">
                      {doc.requirement}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-sm text-white leading-tight font-sans">
                      {doc.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                      {doc.id === 'acta_constitutiva' ? 'Contrato social inscrito en el RPC.' :
                       doc.id === 'rfc' ? 'Constancia oficial del SAT.' :
                       doc.id === 'sat_opinion' ? 'Opinión 32-D positiva corriente.' :
                       doc.id === 'domicilio' ? 'Comprobante de domicilio fiscal.' :
                       'Identificación oficial del representante.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-verta-slate-blue/20">
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-400">
                    <div>
                      <span className="block text-gray-500 text-[9px] uppercase">OCR Match Score</span>
                      <span className="font-bold text-white mt-0.5 block">
                        {doc.ocrConfidence > 0 ? `${doc.ocrConfidence}% Confianza` : 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-[9px] uppercase">Último Cambio</span>
                      <span className="font-bold text-white mt-0.5 block truncate">
                        {doc.lastUpdated || 'No registrado'}
                      </span>
                    </div>
                  </div>

                  {/* SANDBOX PRE-CHECK REVIEWS PANEL (ONLY available for principal active provider!) */}
                  {provider.id === 'prov_active' && doc.status === 'pendiente' && onFastCheck && (
                    <div className="bg-verta-navy border border-verta-slate-blue/60 rounded-xl p-2.5 space-y-2 mt-1 animate-fade-in">
                      <span className="block text-[9px] text-verta-cyan font-mono font-semibold uppercase tracking-wider text-center">Acciones de Contraloría (Sandbox)</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onFastCheck(doc.id, 'approve')}
                          className="py-1.5 bg-gradient-to-r from-verta-emerald/80 to-emerald-500/80 hover:from-verta-emerald hover:to-emerald-500 text-white font-mono text-[9px] font-bold rounded-lg cursor-pointer flex items-center justify-center space-x-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Aprobar</span>
                        </button>
                        <button
                          onClick={() => onFastCheck(doc.id, 'reject')}
                          className="py-1.5 bg-gradient-to-r from-verta-coral/80 to-red-500/80 hover:from-verta-coral hover:to-red-500 text-white font-mono text-[9px] font-bold rounded-lg cursor-pointer flex items-center justify-center space-x-1"
                        >
                          <X className="w-3 h-3" />
                          <span>Rechazar</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ACTIONS BAR FOR ACTIVE PROVIDER DOCUMENTS CARGADOS */}
                  {provider.id === 'prov_active' && doc.status !== 'pendiente' && onUploadClick && (
                    <button
                      onClick={() => {
                        const realDoc = documents.find(d => d.id === doc.id);
                        if (realDoc) onUploadClick(realDoc);
                      }}
                      className="w-full py-1.5 bg-verta-slate-blue/30 hover:bg-verta-slate-blue/60 border border-verta-slate-blue/50 rounded-xl text-center text-[10px] font-mono text-gray-300 font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <span>{doc.status === 'no_entregado' ? 'Subir Requisito' : 'Actualizar Archivo'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* COMPLIANCE STANDARDS INFOCARD */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-verta-cobalt/20 to-verta-cyan/10 border border-verta-slate-blue/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-verta-cyan/10 border border-verta-cyan/30 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-verta-cyan" />
          </div>
          <div className="space-y-1 text-left">
            <h4 className="text-sm font-bold text-white">Lineamientos de Validación Corporativa</h4>
            <p className="text-xs text-gray-400">Todos los documentos se cotejan automáticamente contra los padrones del SAT e IMSS.</p>
          </div>
        </div>
        
        <div className="text-right text-xs shrink-0 font-mono text-gray-400">
          Certificación de Cifrado: <strong className="text-white">AES-256 SSL ✔️</strong>
        </div>
      </div>

    </div>
  );
}
