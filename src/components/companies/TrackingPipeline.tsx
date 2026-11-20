/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Send, 
  CreditCard, 
  FileCheck2, 
  Search, 
  Filter, 
  ChevronRight, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  Layers, 
  Scale, 
  ShieldCheck, 
  XCircle, 
  ArrowRight,
  MoreVertical,
  SlidersHorizontal,
  Download,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { 
  SupplierJourneyItem, 
  JourneyTrackingStatus, 
  InternalCompanyDecision, 
  InternalDecisionRecord 
} from '../../types';
import { 
  TRACKING_STATUS_CONFIG, 
  INTERNAL_DECISION_CONFIG, 
  VALIDATION_LEVELS 
} from '../../data/companyJourneyData';

interface TrackingPipelineProps {
  suppliers: SupplierJourneyItem[];
  onOpenDecisionModal: (supplier: SupplierJourneyItem) => void;
  onUpdateStatus: (supplierId: string, newStatus: JourneyTrackingStatus) => void;
  onSelectSupplierDetail?: (supplier: SupplierJourneyItem) => void;
  onNewInvitationClick: () => void;
}

export function TrackingPipeline({
  suppliers,
  onOpenDecisionModal,
  onUpdateStatus,
  onSelectSupplierDetail,
  onNewInvitationClick
}: TrackingPipelineProps) {
  const [viewMode, setViewMode] = useState<'pipeline' | 'tabla'>('pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [decisionFilter, setDecisionFilter] = useState<string>('todos');
  const [selectedSupplierForDrawer, setSelectedSupplierForDrawer] = useState<SupplierJourneyItem | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const STATUS_ORDER: JourneyTrackingStatus[] = [
    'invitacion_enviada',
    'aceptada',
    'pago_completado',
    'en_proceso',
    'observaciones_pendientes',
    'validacion_finalizada'
  ];

  // Filtering
  const filteredSuppliers = suppliers.filter((s) => {
    const matchesSearch = 
      s.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rfc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'todos' || s.trackingStatus === statusFilter;
    const matchesDecision = decisionFilter === 'todos' || s.internalDecision.decision === decisionFilter;

    return matchesSearch && matchesStatus && matchesDecision;
  });

  const handleCopyLink = (code: string) => {
    const link = `https://verta.io/invitacion/${code.toLowerCase()}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(link);
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="space-y-6 text-white font-sans animate-fade-in">
      
      {/* 6-STAGE METRIC SUMMARY FUNNEL */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {STATUS_ORDER.map((statusKey, idx) => {
          const cfg = TRACKING_STATUS_CONFIG[statusKey];
          const count = suppliers.filter((s) => s.trackingStatus === statusKey).length;
          const isSelected = statusFilter === statusKey;

          return (
            <button
              key={statusKey}
              onClick={() => setStatusFilter(isSelected ? 'todos' : statusKey)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                isSelected
                  ? 'bg-verta-cyan/20 border-verta-cyan shadow-lg'
                  : 'bg-verta-navy/50 border-verta-slate-blue/40 hover:bg-verta-navy/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-gray-400">
                  Etapa {idx + 1}
                </span>
                <span className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.textColor}`}>
                  {count}
                </span>
              </div>
              <h4 className="font-bold text-xs text-white leading-tight truncate">
                {cfg.label}
              </h4>
              <p className="text-[10px] text-gray-400 line-clamp-1 font-mono">
                {cfg.shortLabel}
              </p>
            </button>
          );
        })}
      </div>

      {/* TOOLBAR: SEARCH, FILTERS & VIEW SWITCHER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-verta-dark-blue/70 border border-verta-slate-blue/40">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por empresa, RFC, servicio o contacto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-verta-navy border border-verta-slate-blue/60 focus:border-verta-cyan focus:outline-none pl-9 pr-4 py-2 rounded-xl text-xs text-white placeholder-gray-500 font-sans"
          />
        </div>

        {/* Filter dropdowns & view toggle */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-verta-navy border border-verta-slate-blue/60 rounded-xl px-3 py-2 text-gray-300 focus:border-verta-cyan focus:outline-none"
          >
            <option value="todos">Todos los Estados (6 etapas)</option>
            {STATUS_ORDER.map((st) => (
              <option key={st} value={st}>
                {TRACKING_STATUS_CONFIG[st].label}
              </option>
            ))}
          </select>

          {/* Decision filter */}
          <select
            value={decisionFilter}
            onChange={(e) => setDecisionFilter(e.target.value)}
            className="bg-verta-navy border border-verta-slate-blue/60 rounded-xl px-3 py-2 text-gray-300 focus:border-verta-cyan focus:outline-none"
          >
            <option value="todos">Decisión Interna: Todas</option>
            <option value="aprobado">Aprobado</option>
            <option value="requiere_aclaraciones">Requiere aclaraciones</option>
            <option value="no_continua">No continúa</option>
            <option value="pendiente">Pendiente</option>
          </select>

          {/* View switcher */}
          <div className="flex items-center bg-verta-navy p-1 rounded-xl border border-verta-slate-blue/50">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                viewMode === 'pipeline'
                  ? 'bg-verta-cyan text-verta-navy font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Pipeline
            </button>
            <button
              onClick={() => setViewMode('tabla')}
              className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                viewMode === 'tabla'
                  ? 'bg-verta-cyan text-verta-navy font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Tabla
            </button>
          </div>

          <button
            onClick={onNewInvitationClick}
            className="px-3.5 py-2 bg-gradient-to-r from-verta-cyan to-indigo-600 hover:from-verta-cyan/90 hover:to-indigo-500 text-verta-navy font-mono font-bold text-xs rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-md"
          >
            <span>+ Invitar</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: PIPELINE KANBAN COLUMNS (6 EXACT STATES)                           */}
      {/* ========================================================================= */}
      {viewMode === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {STATUS_ORDER.map((colKey, colIdx) => {
            const colCfg = TRACKING_STATUS_CONFIG[colKey];
            const colSuppliers = filteredSuppliers.filter((s) => s.trackingStatus === colKey);

            return (
              <div
                key={colKey}
                className="bg-verta-dark-blue/50 border border-verta-slate-blue/40 rounded-2xl p-3 space-y-3 flex flex-col min-w-[260px] xl:min-w-0"
              >
                {/* COLUMN HEADER */}
                <div className="flex items-center justify-between border-b border-verta-slate-blue/30 pb-2.5">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-verta-cyan" />
                      <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">
                        Paso {colIdx + 1}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs text-white leading-tight">
                      {colCfg.label}
                    </h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold ${colCfg.badgeBg} ${colCfg.textColor} border ${colCfg.borderColor}`}>
                    {colSuppliers.length}
                  </span>
                </div>

                {/* SUPPLIER CARDS IN THIS STAGE */}
                <div className="space-y-3 flex-1">
                  {colSuppliers.length === 0 ? (
                    <div className="p-4 border border-dashed border-verta-slate-blue/40 rounded-xl text-center text-gray-500 font-mono text-[11px] py-8">
                      Sin proveedores en este estado
                    </div>
                  ) : (
                    colSuppliers.map((supplier) => {
                      const decisionCfg = INTERNAL_DECISION_CONFIG[supplier.internalDecision.decision];
                      const levelCfg = VALIDATION_LEVELS.find((l) => l.id === supplier.validationLevel);

                      return (
                        <div
                          key={supplier.id}
                          className="p-3.5 rounded-xl verta-glass border border-verta-slate-blue/50 hover:border-verta-cyan/60 transition-all space-y-2.5 bg-verta-navy/60 shadow-lg text-xs"
                        >
                          {/* Top: Code & Level */}
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-verta-cyan bg-verta-dark-blue px-2 py-0.5 rounded border border-verta-slate-blue/50">
                              {supplier.code}
                            </span>
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-verta-slate-blue/40 text-gray-300">
                              {levelCfg?.badge.split(' ')[1] || 'ESTÁNDAR'}
                            </span>
                          </div>

                          {/* Provider Name */}
                          <div>
                            <h4 
                              onClick={() => setSelectedSupplierForDrawer(supplier)}
                              className="font-bold text-white text-xs leading-snug hover:text-verta-cyan cursor-pointer transition-colors"
                            >
                              {supplier.providerName}
                            </h4>
                            <p className="text-[10px] text-gray-400 font-mono">RFC: {supplier.rfc}</p>
                          </div>

                          {/* Service snippet */}
                          <p className="text-[11px] text-gray-300 font-sans line-clamp-2 bg-verta-dark-blue/40 p-2 rounded-lg border border-verta-slate-blue/30">
                            {supplier.service}
                          </p>

                          {/* Progress bar */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[9px] font-mono text-gray-400">
                              <span>Avance: {supplier.progressPercent}%</span>
                              <span>{supplier.requirements.length} docs</span>
                            </div>
                            <div className="w-full h-1 bg-verta-navy rounded-full overflow-hidden border border-verta-slate-blue/30">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  supplier.progressPercent === 100 ? 'bg-emerald-400' : 'bg-verta-cyan'
                                }`}
                                style={{ width: `${supplier.progressPercent}%` }}
                              />
                            </div>
                          </div>

                          {/* Observaciones banner if applicable */}
                          {supplier.trackingStatus === 'observaciones_pendientes' && supplier.observations && (
                            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-[10px] text-rose-300 space-y-1">
                              <div className="flex items-center space-x-1 font-bold">
                                <AlertCircle className="w-3 h-3 text-rose-400 shrink-0" />
                                <span>Observación técnica:</span>
                              </div>
                              <p className="line-clamp-2 text-[10px]">{supplier.observations[0]}</p>
                            </div>
                          )}

                          {/* Dictamen Técnico badge if finalizada */}
                          {supplier.trackingStatus === 'validacion_finalizada' && supplier.vertaTechnicalResult && (
                            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300 flex items-center justify-between">
                              <span className="flex items-center space-x-1 font-bold">
                                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                <span>Dictamen VERTA</span>
                              </span>
                              <span className="font-mono font-extrabold text-emerald-400">
                                {supplier.vertaTechnicalResult.complianceScore}/100
                              </span>
                            </div>
                          )}

                          {/* INTERNAL DECISION BADGE (SOVEREIGN DECISION OF THE COMPANY) */}
                          <div className="pt-2 border-t border-verta-slate-blue/30 space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="text-gray-400">Decisión Interna:</span>
                              <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${decisionCfg.badgeBg} ${decisionCfg.textColor} border ${decisionCfg.borderColor}`}>
                                {decisionCfg.label}
                              </span>
                            </div>

                            {supplier.internalDecision.recordedBy && (
                              <p className="text-[9px] text-gray-400 font-mono truncate">
                                Por: {supplier.internalDecision.recordedBy}
                              </p>
                            )}
                          </div>

                          {/* ACTIONS */}
                          <div className="pt-2 flex items-center justify-between gap-1">
                            <button
                              onClick={() => onOpenDecisionModal(supplier)}
                              className="px-2.5 py-1.5 bg-verta-navy hover:bg-verta-slate-blue/60 border border-verta-cyan/40 text-verta-cyan hover:text-white rounded-lg text-[10px] font-mono font-bold flex items-center space-x-1 transition-all cursor-pointer"
                              title="Registrar o editar resolución interna"
                            >
                              <Scale className="w-3 h-3" />
                              <span>Decisión Interna</span>
                            </button>

                            <button
                              onClick={() => setSelectedSupplierForDrawer(supplier)}
                              className="p-1.5 hover:bg-verta-slate-blue/40 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                              title="Ver expediente detallado"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>

                          {/* STATUS ADVANCER (Interactive sandbox control) */}
                          <div className="pt-1.5 border-t border-verta-slate-blue/20 flex items-center justify-between text-[9px] font-mono text-gray-400">
                            <span>Mover etapa:</span>
                            <select
                              value={supplier.trackingStatus}
                              onChange={(e) => onUpdateStatus(supplier.id, e.target.value as JourneyTrackingStatus)}
                              className="bg-verta-dark-blue border border-verta-slate-blue/60 rounded px-1.5 py-0.5 text-[9px] text-gray-300 focus:border-verta-cyan"
                            >
                              {STATUS_ORDER.map((st) => (
                                <option key={st} value={st}>
                                  {TRACKING_STATUS_CONFIG[st].shortLabel}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: TABLE LIST VIEW (DETAILED AUDIT)                                   */}
      {/* ========================================================================= */}
      {viewMode === 'tabla' && (
        <div className="verta-glass border border-verta-slate-blue/50 rounded-2xl overflow-hidden bg-verta-dark-blue/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-verta-navy/80 text-gray-400 font-mono text-[11px] border-b border-verta-slate-blue/40 uppercase">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Proveedor & RFC</th>
                  <th className="py-3.5 px-4 font-bold">Contacto Notificado</th>
                  <th className="py-3.5 px-4 font-bold">Servicio & Nivel</th>
                  <th className="py-3.5 px-4 font-bold">Estado de Seguimiento</th>
                  <th className="py-3.5 px-4 font-bold">Decisión Interna</th>
                  <th className="py-3.5 px-4 font-bold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-verta-slate-blue/30 font-sans">
                {filteredSuppliers.map((sup) => {
                  const trackingCfg = TRACKING_STATUS_CONFIG[sup.trackingStatus];
                  const decisionCfg = INTERNAL_DECISION_CONFIG[sup.internalDecision.decision];
                  const levelCfg = VALIDATION_LEVELS.find((l) => l.id === sup.validationLevel);

                  return (
                    <tr key={sup.id} className="hover:bg-verta-slate-blue/15 transition-colors">
                      {/* Name & RFC */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <button
                            onClick={() => setSelectedSupplierForDrawer(sup)}
                            className="font-bold text-white text-sm hover:text-verta-cyan text-left cursor-pointer transition-colors"
                          >
                            {sup.providerName}
                          </button>
                          <div className="flex items-center space-x-2 text-[11px] font-mono text-gray-400">
                            <span className="text-verta-cyan font-bold">{sup.code}</span>
                            <span>&bull;</span>
                            <span>RFC: {sup.rfc}</span>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-4 text-xs font-mono">
                        <div className="space-y-0.5">
                          <p className="text-white font-medium">{sup.contact.name}</p>
                          <p className="text-gray-400 text-[11px]">{sup.contact.email}</p>
                          <p className="text-gray-500 text-[10px]">{sup.contact.phone}</p>
                        </div>
                      </td>

                      {/* Service & Level */}
                      <td className="py-4 px-4">
                        <div className="space-y-1 max-w-xs">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-verta-navy border border-verta-slate-blue/50 text-verta-cyan">
                            {levelCfg?.badge || 'Nivel Estándar'}
                          </span>
                          <p className="text-gray-300 text-xs line-clamp-2">{sup.service}</p>
                        </div>
                      </td>

                      {/* Tracking Status */}
                      <td className="py-4 px-4">
                        <div className="space-y-1.5">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${trackingCfg.badgeBg} ${trackingCfg.textColor} border ${trackingCfg.borderColor}`}>
                            Etapa {trackingCfg.stepNumber}: {trackingCfg.label}
                          </span>
                          <div className="w-28 h-1 bg-verta-navy rounded-full overflow-hidden border border-verta-slate-blue/30">
                            <div
                              className="h-full bg-verta-cyan rounded-full"
                              style={{ width: `${sup.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Internal Decision */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${decisionCfg.badgeBg} ${decisionCfg.textColor} border ${decisionCfg.borderColor}`}>
                            {decisionCfg.label}
                          </span>
                          {sup.internalDecision.recordedAt && (
                            <p className="text-[10px] font-mono text-gray-400">
                              {sup.internalDecision.recordedAt.split(' a las')[0]}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center space-x-2">
                          <button
                            onClick={() => onOpenDecisionModal(sup)}
                            className="px-3 py-1.5 bg-verta-cyan/15 hover:bg-verta-cyan text-verta-cyan hover:text-verta-navy border border-verta-cyan/40 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-1"
                            title="Registrar Decisión Interna"
                          >
                            <Scale className="w-3.5 h-3.5" />
                            <span>Decisión</span>
                          </button>
                          <button
                            onClick={() => setSelectedSupplierForDrawer(sup)}
                            className="p-1.5 hover:bg-verta-slate-blue/40 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                            title="Ver detalle"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DRAWER / INSPECTION MODAL FOR DETAILED SUPPLIER VIEW                       */}
      {/* ========================================================================= */}
      {selectedSupplierForDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-white font-sans">
          <div className="relative w-full max-w-3xl verta-glass border border-verta-cyan/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto bg-gradient-to-b from-verta-dark-blue to-verta-navy">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-verta-slate-blue/40 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-verta-cyan font-bold bg-verta-navy px-2.5 py-0.5 rounded border border-verta-cyan/40">
                    FOLIO {selectedSupplierForDrawer.code}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${TRACKING_STATUS_CONFIG[selectedSupplierForDrawer.trackingStatus].badgeBg} ${TRACKING_STATUS_CONFIG[selectedSupplierForDrawer.trackingStatus].textColor}`}>
                    {TRACKING_STATUS_CONFIG[selectedSupplierForDrawer.trackingStatus].label}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {selectedSupplierForDrawer.providerName}
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  RFC: {selectedSupplierForDrawer.rfc} &bull; Giro: {selectedSupplierForDrawer.category}
                </p>
              </div>

              <button
                onClick={() => setSelectedSupplierForDrawer(null)}
                className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-verta-slate-blue/40 transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* 6-STEP TIMELINE STEPPER */}
            <div className="space-y-2 p-4 bg-verta-navy/50 border border-verta-slate-blue/40 rounded-2xl">
              <span className="text-xs font-mono text-gray-400 uppercase font-bold block">
                Recorrido de Homologación (6 Estados Claros):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-[10px] font-mono">
                {STATUS_ORDER.map((st, i) => {
                  const cfg = TRACKING_STATUS_CONFIG[st];
                  const currentIdx = STATUS_ORDER.indexOf(selectedSupplierForDrawer.trackingStatus);
                  const isDone = i < currentIdx;
                  const isCurrent = i === currentIdx;

                  return (
                    <div
                      key={st}
                      className={`p-2 rounded-xl border transition-all ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : isCurrent
                          ? 'bg-verta-cyan/20 border-verta-cyan text-white font-bold shadow-md'
                          : 'bg-verta-navy/40 border-verta-slate-blue/30 text-gray-500'
                      }`}
                    >
                      <div className="flex justify-center mb-1">
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : isCurrent ? (
                          <Clock className="w-3.5 h-3.5 text-verta-cyan" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-gray-600 flex items-center justify-center text-[8px]">
                            {i + 1}
                          </span>
                        )}
                      </div>
                      <span className="block leading-tight">{cfg.shortLabel}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CONTACT & SERVICE DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-verta-dark-blue/60 border border-verta-slate-blue/40 space-y-2">
                <span className="font-mono text-gray-400 text-[11px] block font-bold">
                  PERSONA DE CONTACTO NOTIFICADA:
                </span>
                <p className="font-bold text-white text-sm">{selectedSupplierForDrawer.contact.name}</p>
                <div className="space-y-1 text-gray-300 font-mono text-[11px]">
                  <p className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-verta-cyan" />
                    <span>{selectedSupplierForDrawer.contact.email}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-verta-cyan" />
                    <span>{selectedSupplierForDrawer.contact.phone}</span>
                  </p>
                  <p className="text-gray-400">{selectedSupplierForDrawer.contact.position}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-verta-dark-blue/60 border border-verta-slate-blue/40 space-y-2">
                <span className="font-mono text-gray-400 text-[11px] block font-bold">
                  SERVICIO ESPECÍFICO A CONTRATAR:
                </span>
                <p className="text-gray-200 leading-relaxed font-sans text-xs">
                  {selectedSupplierForDrawer.service}
                </p>
                <div className="pt-2 border-t border-verta-slate-blue/30 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-gray-400">Nivel de validación:</span>
                  <span className="text-verta-cyan font-bold">
                    {VALIDATION_LEVELS.find(l => l.id === selectedSupplierForDrawer.validationLevel)?.name.split(':')[1] || 'Estándar'}
                  </span>
                </div>
              </div>
            </div>

            {/* INTERNAL DECISION SUMMARY PANEL */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-verta-navy to-verta-slate-blue/30 border border-indigo-400/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-verta-slate-blue/40 pb-2.5">
                <div className="flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-indigo-400" />
                  <span className="font-mono text-xs text-white font-bold uppercase tracking-wider">
                    Resolución Comercial Interna de su Empresa
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${INTERNAL_DECISION_CONFIG[selectedSupplierForDrawer.internalDecision.decision].badgeBg} ${INTERNAL_DECISION_CONFIG[selectedSupplierForDrawer.internalDecision.decision].textColor} border ${INTERNAL_DECISION_CONFIG[selectedSupplierForDrawer.internalDecision.decision].borderColor}`}>
                    {INTERNAL_DECISION_CONFIG[selectedSupplierForDrawer.internalDecision.decision].label}
                  </span>

                  <button
                    onClick={() => {
                      const sup = selectedSupplierForDrawer;
                      setSelectedSupplierForDrawer(null);
                      onOpenDecisionModal(sup);
                    }}
                    className="px-3 py-1 bg-verta-cyan text-verta-navy font-mono font-bold text-xs rounded-xl hover:bg-verta-cyan/90 transition-all cursor-pointer"
                  >
                    Modificar
                  </button>
                </div>
              </div>

              {selectedSupplierForDrawer.internalDecision.justification ? (
                <div className="space-y-1 text-xs font-sans">
                  <span className="text-gray-400 font-mono text-[11px] block">Justificación registrada:</span>
                  <p className="text-gray-200 leading-relaxed bg-verta-dark-blue/60 p-3 rounded-xl border border-verta-slate-blue/30">
                    "{selectedSupplierForDrawer.internalDecision.justification}"
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono pt-1">
                    Evaluador: <strong className="text-white">{selectedSupplierForDrawer.internalDecision.recordedBy}</strong> &bull; Fecha: {selectedSupplierForDrawer.internalDecision.recordedAt}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Aún no se ha asentado una justificación o resolución formal para este proveedor.</span>
                  <button
                    onClick={() => {
                      const sup = selectedSupplierForDrawer;
                      setSelectedSupplierForDrawer(null);
                      onOpenDecisionModal(sup);
                    }}
                    className="text-verta-cyan hover:underline font-mono text-xs cursor-pointer"
                  >
                    Asentar resolución &rarr;
                  </button>
                </div>
              )}
            </div>

            {/* ENLACE PÚBLICO COPIABLE & ACCIONES */}
            <div className="pt-2 border-t border-verta-slate-blue/30 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopyLink(selectedSupplierForDrawer.code)}
                  className="px-3 py-1.5 bg-verta-navy hover:bg-verta-slate-blue/40 border border-verta-slate-blue/60 rounded-xl text-xs font-mono text-gray-300 hover:text-white flex items-center space-x-1.5 cursor-pointer"
                >
                  {copiedCode === selectedSupplierForDrawer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-verta-emerald" />
                      <span className="text-verta-emerald">Enlace copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-verta-cyan" />
                      <span>Copiar enlace de acceso</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => setSelectedSupplierForDrawer(null)}
                className="px-5 py-2 bg-verta-navy hover:bg-verta-slate-blue/50 text-white font-mono text-xs rounded-xl cursor-pointer"
              >
                Cerrar Detalle
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
