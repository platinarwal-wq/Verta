/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, 
  UserPlus, 
  Clock, 
  FileCheck2, 
  Layers, 
  Bell, 
  Search, 
  Send, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Download, 
  Eye, 
  ShieldCheck, 
  SlidersHorizontal, 
  ExternalLink,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Filter,
  FileText,
  AlertCircle,
  Scale,
  Lock,
  UserCheck
} from 'lucide-react';
import { 
  SupplierJourneyItem, 
  JourneyTrackingStatus, 
  InternalCompanyDecision, 
  InternalDecisionRecord 
} from '../../types';
import { 
  INITIAL_SUPPLIER_JOURNEY, 
  TRACKING_STATUS_CONFIG, 
  INTERNAL_DECISION_CONFIG,
  VALIDATION_LEVELS 
} from '../../data/companyJourneyData';
import { InviteSupplierModal } from './InviteSupplierModal';
import { InternalDecisionModal } from './InternalDecisionModal';
import { TrackingPipeline } from './TrackingPipeline';

interface CompaniesPortalProps {
  clientName: string;
  onNavigateToPublic: () => void;
  onSelectProviderDetails?: (providerId: string) => void;
}

export function CompaniesPortal({ clientName, onNavigateToPublic }: CompaniesPortalProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    'seguimiento' | 'decision' | 'resultados' | 'comparacion' | 'alertas'
  >('seguimiento');
  
  // Journey state
  const [suppliers, setSuppliers] = useState<SupplierJourneyItem[]>(INITIAL_SUPPLIER_JOURNEY);
  
  // Modals state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [decisionModalSupplier, setDecisionModalSupplier] = useState<SupplierJourneyItem | null>(null);

  // Selected Result for detail inspection in Tab 3
  const [selectedResultDoc, setSelectedResultDoc] = useState<SupplierJourneyItem | null>(null);
  
  // Comparison State
  const [compareProvider1, setCompareProvider1] = useState(INITIAL_SUPPLIER_JOURNEY[0]?.id || 'inv-01');
  const [compareProvider2, setCompareProvider2] = useState(INITIAL_SUPPLIER_JOURNEY[1]?.id || 'inv-02');

  // Action toast notifier
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Add new invitation from structured modal
  const handleSendInvitation = (newSupplier: SupplierJourneyItem) => {
    setSuppliers([newSupplier, ...suppliers]);
    showNotice(`¡Invitación ${newSupplier.code} emitida formalmente a ${newSupplier.providerName}!`);
  };

  // Update tracking status
  const handleUpdateStatus = (supplierId: string, newStatus: JourneyTrackingStatus) => {
    setSuppliers((prev) =>
      prev.map((s) => {
        if (s.id === supplierId) {
          let progress = s.progressPercent;
          if (newStatus === 'invitacion_enviada') progress = 10;
          if (newStatus === 'aceptada') progress = 30;
          if (newStatus === 'pago_completado') progress = 45;
          if (newStatus === 'en_proceso') progress = 65;
          if (newStatus === 'observaciones_pendientes') progress = 70;
          if (newStatus === 'validacion_finalizada') progress = 100;

          return {
            ...s,
            trackingStatus: newStatus,
            progressPercent: progress,
            lastUpdate: 'Actualizado hace un momento'
          };
        }
        return s;
      })
    );
    showNotice(`Estatus de seguimiento actualizado a: ${TRACKING_STATUS_CONFIG[newStatus].label}`);
  };

  // Save internal decision
  const handleSaveDecision = (supplierId: string, decisionData: InternalDecisionRecord) => {
    setSuppliers((prev) =>
      prev.map((s) => {
        if (s.id === supplierId) {
          return {
            ...s,
            internalDecision: decisionData,
            lastUpdate: 'Decisión interna registrada hoy'
          };
        }
        return s;
      })
    );
    showNotice(`Decisión interna registrada: ${INTERNAL_DECISION_CONFIG[decisionData.decision].label}`);
  };

  // Counts for tabs
  const pendingDecisionsCount = suppliers.filter(s => s.internalDecision.decision === 'pendiente').length;
  const approvedInternalCount = suppliers.filter(s => s.internalDecision.decision === 'aprobado').length;
  const finalizadosCount = suppliers.filter(s => s.trackingStatus === 'validacion_finalizada').length;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-fade-in text-white font-sans">
      
      {/* ACTION NOTICE TOAST */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl verta-glass border border-verta-cyan/40 shadow-2xl flex items-center space-x-3 max-w-md animate-slide-in-up">
          <CheckCircle2 className="w-5 h-5 text-verta-cyan shrink-0" />
          <span className="text-xs text-white font-mono">{actionNotice}</span>
        </div>
      )}

      {/* TOP BANNER: ENVIRONMENT IDENTIFIER */}
      <div className="verta-glass border border-verta-cyan/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-verta-dark-blue via-verta-navy to-verta-dark-blue">
        <div className="absolute top-0 right-0 w-80 h-80 bg-verta-cyan/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-verta-cyan/15 border border-verta-cyan/30 px-3 py-0.5 rounded-full text-[10px] font-mono text-verta-cyan font-bold tracking-wider uppercase">
              <Building2 className="w-3.5 h-3.5" />
              <span>PORTAL EMPRESARIAL &bull; GESTIÓN INTEGRAL DE PROVEEDORES</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {clientName}
            </h1>
            
            <p className="text-xs text-gray-300 max-w-2xl font-sans leading-relaxed">
              Supervise el <strong>Recorrido de Homologación</strong> de sus contratistas por 6 estados normativos y asiente la <strong>Decisión Interna</strong> de contratación con plena autonomía corporativa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-verta-cyan to-indigo-600 hover:from-verta-cyan/90 hover:to-indigo-500 text-verta-navy font-mono font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg cursor-pointer transition-all"
            >
              <UserPlus className="w-4 h-4 text-verta-navy" />
              <span>Invitar Proveedor</span>
            </button>
            
            <button
              onClick={onNavigateToPublic}
              className="px-3.5 py-2.5 bg-verta-navy/70 hover:bg-verta-navy border border-verta-slate-blue/50 text-gray-300 hover:text-white font-mono text-xs rounded-xl transition-all cursor-pointer"
            >
              Ir al Sitio Público
            </button>
          </div>
        </div>

        {/* 5 SUB-TABS NAVIGATION */}
        <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-verta-slate-blue/40">
          {[
            { 
              id: 'seguimiento', 
              label: '1. Recorrido & Panel de Seguimiento', 
              icon: <Clock className="w-4 h-4" />, 
              badge: `${suppliers.length} activos` 
            },
            { 
              id: 'decision', 
              label: '2. Módulo de Decisión Interna', 
              icon: <Scale className="w-4 h-4" />, 
              badge: `${approvedInternalCount} Aprobados` 
            },
            { 
              id: 'resultados', 
              label: '3. Dictámenes Técnicos Emitidos', 
              icon: <FileCheck2 className="w-4 h-4" />, 
              count: finalizadosCount 
            },
            { 
              id: 'comparacion', 
              label: '4. Comparación de Perfiles', 
              icon: <Layers className="w-4 h-4" /> 
            },
            { 
              id: 'alertas', 
              label: '5. Centro de Alertas', 
              icon: <Bell className="w-4 h-4" />, 
              count: 3 
            }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                activeSubTab === tab.id
                  ? 'bg-verta-cyan text-verta-navy shadow-lg font-extrabold'
                  : 'bg-verta-navy/40 text-gray-400 hover:text-white hover:bg-verta-slate-blue/40 border border-verta-slate-blue/30'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeSubTab === tab.id ? 'bg-verta-navy text-verta-cyan' : 'bg-verta-slate-blue/60 text-gray-300'
                }`}>
                  {tab.badge}
                </span>
              )}
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeSubTab === tab.id ? 'bg-verta-navy text-verta-cyan' : 'bg-verta-slate-blue/60 text-gray-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: RECORRIDO DEL PROVEEDOR & PANEL DE SEGUIMIENTO (6 ESTADOS)       */}
      {/* ========================================================================= */}
      {activeSubTab === 'seguimiento' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-verta-slate-blue/30 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                Recorrido de Homologación de Proveedores
              </h2>
              <p className="text-xs text-gray-400 font-sans">
                Supervise el embudo estructurado en 6 etapas claras: 
                <span className="text-verta-cyan font-mono font-bold"> Invitación enviada &rarr; Aceptada &rarr; Pago completado &rarr; En proceso &rarr; Observaciones pendientes &rarr; Validación finalizada</span>.
              </p>
            </div>

            <button
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-verta-cyan to-indigo-600 hover:from-verta-cyan/95 text-verta-navy font-mono font-extrabold text-xs rounded-xl flex items-center space-x-2 shadow-lg cursor-pointer shrink-0"
            >
              <UserPlus className="w-4 h-4 text-verta-navy" />
              <span>Invitar Proveedor</span>
            </button>
          </div>

          {/* Tracking Pipeline (Kanban & Table) */}
          <TrackingPipeline
            suppliers={suppliers}
            onOpenDecisionModal={(sup) => setDecisionModalSupplier(sup)}
            onUpdateStatus={handleUpdateStatus}
            onNewInvitationClick={() => setShowInviteModal(true)}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: MÓDULO DE DECISIÓN INTERNA SOBERANA DE LA EMPRESA                */}
      {/* ========================================================================= */}
      {activeSubTab === 'decision' && (
        <div className="space-y-6 animate-fade-in">
          {/* PRINCIPLE BANNER */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-verta-dark-blue via-verta-navy to-verta-dark-blue border border-indigo-400/40 space-y-3">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 px-3 py-0.5 rounded-full text-[10px] font-mono text-indigo-300 font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-indigo-400" />
              <span>GOBERNANZA & ADJUDICACIÓN CORPORATIVA</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Módulo de Decisión Interna de Contratación
            </h2>
            
            <p className="text-xs text-gray-300 font-sans max-w-3xl leading-relaxed">
              <strong className="text-white">Principio Fundamental: VERTA no decide por su empresa.</strong> La plataforma analiza y certifica con rigor técnico imparcial la documentación legal, fiscal y laboral. La resolución de <strong className="text-emerald-400">Aprobar</strong>, solicitar <strong className="text-amber-400">Aclaraciones/actualización</strong> o determinar que <strong className="text-rose-400">No continúa</strong> es una decisión 100% interna, confidencial y soberana del comité de compras de su empresa.
            </p>
          </div>

          {/* METRICS OF INTERNAL DECISIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>Aprobados</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">
                {suppliers.filter(s => s.internalDecision.decision === 'aprobado').length}
              </p>
              <p className="text-[10px] text-gray-400">Listos para contratación y pago</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                <span>Requiere aclaraciones</span>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">
                {suppliers.filter(s => s.internalDecision.decision === 'requiere_aclaraciones').length}
              </p>
              <p className="text-[10px] text-gray-400">En pausa comercial preventiva</p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-rose-400">
                <span>No continúa</span>
                <XCircle className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">
                {suppliers.filter(s => s.internalDecision.decision === 'no_continua').length}
              </p>
              <p className="text-[10px] text-gray-400">Descartados por criterio de compras</p>
            </div>

            <div className="p-4 rounded-2xl bg-verta-navy/60 border border-verta-slate-blue/50 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Pendientes</span>
                <Clock className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">
                {suppliers.filter(s => s.internalDecision.decision === 'pendiente').length}
              </p>
              <p className="text-[10px] text-gray-400">En evaluación del comité</p>
            </div>
          </div>

          {/* LIST OF SUPPLIERS WITH THEIR INTERNAL DECISION */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-gray-300 font-bold uppercase tracking-wider">
              Resoluciones Asentadas por Proveedor:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suppliers.map((sup) => {
                const decCfg = INTERNAL_DECISION_CONFIG[sup.internalDecision.decision];
                const trkCfg = TRACKING_STATUS_CONFIG[sup.trackingStatus];

                return (
                  <div
                    key={sup.id}
                    className="p-5 rounded-2xl verta-glass border border-verta-slate-blue/50 space-y-3 bg-verta-dark-blue/60"
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-verta-slate-blue/30 pb-3">
                      <div>
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-400">
                          <span className="text-verta-cyan font-bold">{sup.code}</span>
                          <span>&bull;</span>
                          <span>RFC: {sup.rfc}</span>
                        </div>
                        <h4 className="font-bold text-white text-base leading-tight mt-0.5">
                          {sup.providerName}
                        </h4>
                        <p className="text-xs text-gray-400 font-sans mt-0.5">{sup.service}</p>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase shrink-0 ${decCfg.badgeBg} ${decCfg.textColor} border ${decCfg.borderColor}`}>
                        {decCfg.label}
                      </span>
                    </div>

                    {/* Decision Justification */}
                    <div className="space-y-1 text-xs">
                      <span className="text-gray-400 font-mono text-[10px] uppercase block">
                        Justificación Interna Asentada:
                      </span>
                      <p className="text-gray-200 font-sans text-xs bg-verta-navy/70 p-3 rounded-xl border border-verta-slate-blue/30 leading-relaxed">
                        {sup.internalDecision.justification || 'Sin justificación registrada aún. Haga clic en "Editar Resolución" para asentar la postura oficial de la empresa.'}
                      </p>
                    </div>

                    {/* Evaluator, dates and conditions */}
                    <div className="pt-2 border-t border-verta-slate-blue/30 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                      <span className="text-gray-400">
                        {sup.internalDecision.recordedBy ? (
                          <>Evaluador: <strong className="text-white">{sup.internalDecision.recordedBy}</strong></>
                        ) : (
                          'Pendiente de asignación'
                        )}
                      </span>

                      <button
                        onClick={() => setDecisionModalSupplier(sup)}
                        className="px-3 py-1.5 bg-verta-cyan text-verta-navy font-mono font-bold text-xs rounded-xl hover:bg-verta-cyan/90 transition-all cursor-pointer flex items-center space-x-1"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>Editar Resolución</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: CONSULTA DE RESULTADOS Y DICTÁMENES TÉCNICOS                     */}
      {/* ========================================================================= */}
      {activeSubTab === 'resultados' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-verta-slate-blue/30 pb-3">
            <h2 className="text-xl font-bold text-white font-display">Expedientes Dictaminados y Aprobados</h2>
            <p className="text-xs text-gray-400">Descargue dictámenes de cumplimiento corporativo formal con firmas de auditor y sellos digitales de convalidación.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* List of Approved Dossiers */}
            <div className="lg:col-span-1 space-y-3">
              <span className="text-xs font-mono uppercase text-verta-cyan font-bold tracking-wider block">
                Proveedores en Cartera ({suppliers.length})
              </span>
              {suppliers.map((inv) => (
                <div
                  key={inv.id}
                  onClick={() => setSelectedResultDoc(inv)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    (selectedResultDoc?.id === inv.id || (!selectedResultDoc && inv.id === 'inv-02'))
                      ? 'bg-verta-cyan/15 border-verta-cyan shadow-lg text-white'
                      : 'bg-verta-dark-blue/40 border-verta-slate-blue/40 hover:bg-verta-navy text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-verta-cyan font-bold">{inv.code}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      inv.trackingStatus === 'validacion_finalizada' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {inv.trackingStatus === 'validacion_finalizada' ? 'Dictamen Favorable' : 'Auditoría en Curso'}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm leading-tight text-white">{inv.providerName}</h4>
                  <p className="text-xs text-gray-400 font-mono">RFC: {inv.rfc}</p>
                </div>
              ))}
            </div>

            {/* Dossier Detail Inspection Card */}
            <div className="lg:col-span-2 verta-glass border border-verta-cyan/30 rounded-2xl p-6 space-y-5 bg-verta-dark-blue/70">
              {(() => {
                const target = selectedResultDoc || suppliers.find(i => i.id === 'inv-02') || suppliers[0];
                return (
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-verta-slate-blue/40 pb-4">
                      <div>
                        <div className="inline-flex items-center space-x-2 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 font-bold uppercase mb-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>DICTAMEN TÉCNICO DE CONFORMIDAD NORMATIVA</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">{target.providerName}</h3>
                        <p className="text-xs text-gray-400 font-mono">Folio Oficial: VR-DICT-{target.code} &bull; Emisión: {target.sentDate}</p>
                      </div>

                      <button
                        onClick={() => showNotice(`Generando descarga de Dictamen Corporativo para ${target.providerName}...`)}
                        className="px-4 py-2 bg-verta-cyan text-verta-navy font-mono font-bold text-xs rounded-xl flex items-center space-x-2 hover:bg-verta-cyan/90 transition-all cursor-pointer shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        <span>Descargar Dictamen (PDF)</span>
                      </button>
                    </div>

                    {/* Ficha de Evaluación por Dimensión */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-verta-navy/60 border border-verta-slate-blue/40 rounded-xl space-y-1">
                        <span className="text-[10px] font-mono text-gray-400 block">SITUACIÓN FISCAL (SAT)</span>
                        <span className="font-bold text-emerald-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Opinión 32-D Positiva</span>
                        </span>
                        <p className="text-[10px] text-gray-400">Vigencia convalidada por webservice SAT.</p>
                      </div>

                      <div className="p-3 bg-verta-navy/60 border border-verta-slate-blue/40 rounded-xl space-y-1">
                        <span className="text-[10px] font-mono text-gray-400 block">PODERES & LEGALIDAD</span>
                        <span className="font-bold text-emerald-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Poder Acreditado en RPC</span>
                        </span>
                        <p className="text-[10px] text-gray-400">Inscripción registral debidamente verificada.</p>
                      </div>

                      <div className="p-3 bg-verta-navy/60 border border-verta-slate-blue/40 rounded-xl space-y-1">
                        <span className="text-[10px] font-mono text-gray-400 block">SEGURIDAD SOCIAL (IMSS)</span>
                        <span className="font-bold text-emerald-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Opinión Positiva Sin Adeudos</span>
                        </span>
                        <p className="text-[10px] text-gray-400">Cuotas obrero-patronales al corriente.</p>
                      </div>
                    </div>

                    {/* Sello de Inalterabilidad */}
                    <div className="p-4 bg-verta-navy/80 border border-verta-slate-blue/60 rounded-xl space-y-2 font-mono text-xs">
                      <span className="text-[10px] text-verta-cyan uppercase font-bold flex items-center space-x-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>SELLO DIGITAL DE HOMOLOGACIÓN VERTA OS</span>
                      </span>
                      <p className="text-[11px] text-gray-400 break-all leading-relaxed font-mono">
                        SHA256: 8f4e2b01c3987ae954f210dcb8654a938120e791b40283c92134aa8961720d29 | TIMBRADO CON e.firma SAT
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 4: COMPARACIÓN DE PERFILES                                         */}
      {/* ========================================================================= */}
      {activeSubTab === 'comparacion' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-verta-slate-blue/30 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white font-display">Comparación de Perfiles de Proveedores</h2>
              <p className="text-xs text-gray-400">Compare lado a lado dos empresas para evaluar solvencia fiscal, capacidad técnica y tiempos de respuesta antes de adjudicar.</p>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="text-gray-400">Seleccione proveedores:</span>
              <select
                value={compareProvider1}
                onChange={(e) => setCompareProvider1(e.target.value)}
                className="bg-verta-navy border border-verta-cyan/50 rounded-lg px-2.5 py-1.5 text-white"
              >
                {suppliers.map(i => (
                  <option key={i.id} value={i.id}>{i.providerName}</option>
                ))}
              </select>
              <span className="text-gray-500">vs</span>
              <select
                value={compareProvider2}
                onChange={(e) => setCompareProvider2(e.target.value)}
                className="bg-verta-navy border border-indigo-400/50 rounded-lg px-2.5 py-1.5 text-white"
              >
                {suppliers.map(i => (
                  <option key={i.id} value={i.id}>{i.providerName}</option>
                ))}
              </select>
            </div>
          </div>

          {(() => {
            const p1 = suppliers.find(i => i.id === compareProvider1) || suppliers[0];
            const p2 = suppliers.find(i => i.id === compareProvider2) || suppliers[1] || suppliers[0];

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column Provider 1 */}
                <div className="verta-glass border border-verta-cyan/40 p-6 rounded-2xl space-y-4 bg-verta-dark-blue/60">
                  <div className="border-b border-verta-slate-blue/40 pb-3">
                    <span className="text-[10px] font-mono text-verta-cyan uppercase font-bold">Opción Evaluada A</span>
                    <h3 className="text-lg font-bold text-white">{p1.providerName}</h3>
                    <p className="text-xs text-gray-400 font-mono">RFC: {p1.rfc} &bull; {p1.category}</p>
                  </div>

                  <div className="space-y-3 text-xs font-sans">
                    <div className="flex justify-between py-1.5 border-b border-verta-slate-blue/20">
                      <span className="text-gray-400">Opinión SAT 32-D:</span>
                      <span className="text-emerald-400 font-bold font-mono">Positiva Vigente</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-verta-slate-blue/20">
                      <span className="text-gray-400">Poder Notarial:</span>
                      <span className="text-white font-mono">Inscrito en RPC</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-verta-slate-blue/20">
                      <span className="text-gray-400">Seguridad Social IMSS:</span>
                      <span className="text-emerald-400 font-mono font-bold">Sin Adeudos</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-verta-slate-blue/20">
                      <span className="text-gray-400">Avance de Expediente:</span>
                      <span className="text-verta-cyan font-mono font-bold">{p1.progressPercent}% Validado</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-verta-slate-blue/20">
                      <span className="text-gray-400">Decisión Interna:</span>
                      <span className="text-white font-mono font-bold">
                        {INTERNAL_DECISION_CONFIG[p1.internalDecision.decision].label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column Provider 2 */}
                <div className="verta-glass border border-indigo-400/40 p-6 rounded-2xl space-y-4 bg-verta-dark-blue/60">
                  <div className="border-b border-verta-slate-blue/40 pb-3">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">Opción Evaluada B</span>
                    <h3 className="text-lg font-bold text-white">{p2.providerName}</h3>
                    <p className="text-xs text-gray-400 font-mono">RFC: {p2.rfc} &bull; {p2.category}</p>
                  </div>

                  <div className="space-y-3 text-xs font-sans">
                    <div className="flex justify-between py-1.5 border-b border-verta-slate-blue/20">
                      <span className="text-gray-400">Opinión SAT 32-D:</span>
                      <span className="text-emerald-400 font-bold font-mono">Positiva Vigente</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-verta-slate-blue/20">
                      <span className="text-gray-400">Poder Notarial:</span>
                      <span className="text-white font-mono">Inscrito en RPC</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-verta-slate-blue/20">
                      <span className="text-gray-400">Seguridad Social IMSS:</span>
                      <span className="text-emerald-400 font-mono font-bold">Sin Adeudos</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-verta-slate-blue/20">
                      <span className="text-gray-400">Avance de Expediente:</span>
                      <span className="text-indigo-400 font-mono font-bold">{p2.progressPercent}% Validado</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-verta-slate-blue/20">
                      <span className="text-gray-400">Decisión Interna:</span>
                      <span className="text-white font-mono font-bold">
                        {INTERNAL_DECISION_CONFIG[p2.internalDecision.decision].label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 5: CENTRO DE ALERTAS                                               */}
      {/* ========================================================================= */}
      {activeSubTab === 'alertas' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-verta-slate-blue/30 pb-3">
            <h2 className="text-xl font-bold text-white font-display">Centro de Alertas de Cumplimiento</h2>
            <p className="text-xs text-gray-400">Monitoreo continuo preventivo de vigencias fiscales, listas negras del DOF y observaciones de proveedores activos.</p>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-2xl flex items-start space-x-3.5">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">Vencimiento Próximo de Opinión SAT 32-D (Dentro de 8 días)</h4>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">VIGENCIA 30 DÍAS</span>
                </div>
                <p className="text-xs text-gray-300">
                  La Opinión de Cumplimiento del proveedor <strong className="text-white">Soluciones Tecnológicas Alfa S.A. de C.V.</strong> vencerá en 8 días naturales. El sistema ha programado una solicitud automática de renovación mensual.
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-start space-x-3.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">Monitoreo Lista 69-B del SAT (DOF): Estatus Limpio</h4>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">DIARIO 24/7</span>
                </div>
                <p className="text-xs text-gray-300">
                  Ninguno de sus proveedores con invitación activa aparece en el listado de empresas con presunción definitiva de operaciones simuladas (EFOS).
                </p>
              </div>
            </div>

            <div className="p-4 bg-verta-cyan/10 border border-verta-cyan/30 rounded-2xl flex items-start space-x-3.5">
              <AlertCircle className="w-5 h-5 text-verta-cyan shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">Observación Subsanada Pendiente de Aprobación</h4>
                  <span className="text-[10px] font-mono text-verta-cyan bg-verta-cyan/20 px-2 py-0.5 rounded">REVISIÓN AUDITOR</span>
                </div>
                <p className="text-xs text-gray-300">
                  El proveedor ha resubido la versión vigente de su Comprobante de Domicilio. El auditor técnico finalizará el dictamen en menos de 2 horas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STRUCTURED INVITATION MODAL                                               */}
      {/* ========================================================================= */}
      <InviteSupplierModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSendInvitation={handleSendInvitation}
      />

      {/* ========================================================================= */}
      {/* INTERNAL DECISION MODAL (SOVEREIGN DECISION OF THE COMPANY)                */}
      {/* ========================================================================= */}
      <InternalDecisionModal
        supplier={decisionModalSupplier}
        isOpen={!!decisionModalSupplier}
        onClose={() => setDecisionModalSupplier(null)}
        onSaveDecision={handleSaveDecision}
      />

    </div>
  );
}
