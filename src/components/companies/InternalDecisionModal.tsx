/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  Scale, 
  UserCheck, 
  FileText, 
  Save, 
  Sparkles,
  Lock,
  Building2,
  Calendar,
  Info
} from 'lucide-react';
import { 
  SupplierJourneyItem, 
  InternalCompanyDecision, 
  InternalDecisionRecord 
} from '../../types';
import { 
  INTERNAL_DECISION_CONFIG, 
  TRACKING_STATUS_CONFIG 
} from '../../data/companyJourneyData';

interface InternalDecisionModalProps {
  supplier: SupplierJourneyItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveDecision: (supplierId: string, decisionData: InternalDecisionRecord) => void;
}

export function InternalDecisionModal({ 
  supplier, 
  isOpen, 
  onClose, 
  onSaveDecision 
}: InternalDecisionModalProps) {
  if (!isOpen || !supplier) return null;

  const currentDecision = supplier.internalDecision?.decision || 'pendiente';
  const [selectedDecision, setSelectedDecision] = useState<InternalCompanyDecision>(currentDecision);
  const [recordedBy, setRecordedBy] = useState(supplier.internalDecision?.recordedBy || 'Ing. Carlos Mendoza (Gerente de Compras)');
  const [justification, setJustification] = useState(supplier.internalDecision?.justification || '');
  const [commercialConditions, setCommercialConditions] = useState(supplier.internalDecision?.commercialConditions || '');
  const [commercialNotes, setCommercialNotes] = useState(supplier.internalDecision?.commercialNotes || '');
  const [validityMonths, setValidityMonths] = useState<number>(supplier.internalDecision?.contractValidityMonths || 12);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const decisionRecord: InternalDecisionRecord = {
      decision: selectedDecision,
      recordedAt: new Date().toLocaleDateString('es-MX', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      }) + ` a las ${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })} hrs`,
      recordedBy: recordedBy.trim() || 'Comité Interno de Adquisiciones',
      justification: justification.trim() || undefined,
      commercialConditions: commercialConditions.trim() || undefined,
      commercialNotes: commercialNotes.trim() || undefined,
      contractValidityMonths: selectedDecision === 'aprobado' ? validityMonths : undefined
    };

    onSaveDecision(supplier.id, decisionRecord);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const currentConfig = INTERNAL_DECISION_CONFIG[selectedDecision];
  const trackingConfig = TRACKING_STATUS_CONFIG[supplier.trackingStatus];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-white font-sans">
      <div className="relative w-full max-w-2xl verta-glass border border-verta-cyan/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto bg-gradient-to-b from-verta-dark-blue via-verta-navy to-verta-dark-blue">
        
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-verta-slate-blue/40 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 px-3 py-0.5 rounded-full text-[10px] font-mono text-indigo-300 font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-indigo-400" />
              <span>MÓDULO DE DECISIÓN INTERNA SOBERANA</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              Resolución Comercial de la Empresa
            </h2>
            <p className="text-xs text-gray-300 font-sans max-w-lg">
              Registre la resolución corporativa respecto a la contratación de este proveedor.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-verta-slate-blue/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CORE LEGAL PRINCIPLE CALLOUT: VERTA DOES NOT DECIDE FOR THE COMPANY */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-verta-navy/90 to-verta-slate-blue/30 border border-verta-cyan/30 flex items-start space-x-3.5">
          <div className="p-2 rounded-xl bg-verta-cyan/15 text-verta-cyan shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-verta-cyan font-mono text-[11px] uppercase tracking-wide">
              Principio Rector de Gobernanza Corporativa:
            </h4>
            <p className="text-gray-300 font-sans leading-relaxed">
              <strong className="text-white">VERTA no decide por su empresa.</strong> Nuestra plataforma emite dictámenes técnicos objetivos e imparciales sobre el cumplimiento fiscal, laboral y legal del expediente. La resolución comercial, adjudicación de contratos o suspensión de relaciones es una <strong className="text-verta-cyan">decisión 100% soberana, privada y discrecional</strong> de su organización.
            </p>
          </div>
        </div>

        {/* SUPPLIER SUMMARY MINI CARD */}
        <div className="p-4 rounded-2xl bg-verta-dark-blue/70 border border-verta-slate-blue/40 space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-verta-cyan" />
              <span className="font-bold text-white text-sm">{supplier.providerName}</span>
            </div>
            <div className="flex items-center space-x-2 font-mono text-[10px]">
              <span className="bg-verta-navy px-2 py-0.5 rounded border border-verta-slate-blue/40 text-gray-300">
                RFC: {supplier.rfc}
              </span>
              <span className={`px-2 py-0.5 rounded font-bold uppercase ${trackingConfig.badgeBg} ${trackingConfig.textColor} border ${trackingConfig.borderColor}`}>
                Estado: {trackingConfig.label}
              </span>
            </div>
          </div>

          <p className="text-gray-400 text-[11px] font-sans">
            <strong className="text-gray-300">Servicio solicitado:</strong> {supplier.service}
          </p>

          {supplier.vertaTechnicalResult && (
            <div className="pt-2 border-t border-verta-slate-blue/30 flex items-center space-x-2 text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>
                Dictamen Técnico VERTA: <strong>{supplier.vertaTechnicalResult.status}</strong> (Score {supplier.vertaTechnicalResult.complianceScore}/100) &bull; Concluido: {supplier.vertaTechnicalResult.concludedAt}
              </span>
            </div>
          )}
        </div>

        {/* DECISION FORM */}
        <form onSubmit={handleSave} className="space-y-5 text-xs">
          
          {/* THE 3 EXPLICIT CHOICES */}
          <div className="space-y-2">
            <label className="block font-mono text-gray-300 font-bold">
              Seleccione la Decisión Interna de su Empresa: <span className="text-verta-coral">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* OPCIÓN 1: APROBADO */}
              <div
                onClick={() => setSelectedDecision('aprobado')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedDecision === 'aprobado'
                    ? 'bg-emerald-500/20 border-emerald-400 shadow-xl text-white'
                    : 'bg-verta-dark-blue/60 border-verta-slate-blue/40 hover:border-emerald-500/40 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    Adjudicación
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">Aprobado</h4>
                <p className="text-[11px] text-gray-400 leading-snug">
                  Se autoriza la contratación y alta en el catálogo interno de proveedores.
                </p>
              </div>

              {/* OPCIÓN 2: REQUIERE ACLARACIONES/ACTUALIZACIÓN */}
              <div
                onClick={() => setSelectedDecision('requiere_aclaraciones')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedDecision === 'requiere_aclaraciones'
                    ? 'bg-amber-500/20 border-amber-400 shadow-xl text-white'
                    : 'bg-verta-dark-blue/60 border-verta-slate-blue/40 hover:border-amber-500/40 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                    En Pausa
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white leading-tight">
                  Requiere aclaraciones/actualización
                </h4>
                <p className="text-[11px] text-gray-400 leading-snug">
                  Se solicitan precisiones comerciales, ajustes de cotización o renovación documental.
                </p>
              </div>

              {/* OPCIÓN 3: NO CONTINÚA */}
              <div
                onClick={() => setSelectedDecision('no_continua')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedDecision === 'no_continua'
                    ? 'bg-rose-500/20 border-rose-400 shadow-xl text-white'
                    : 'bg-verta-dark-blue/60 border-verta-slate-blue/40 hover:border-rose-500/40 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-xl bg-rose-500/20 text-rose-400">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">
                    Descartado
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">No continúa</h4>
                <p className="text-[11px] text-gray-400 leading-snug">
                  La empresa opta por no proceder con la adjudicación a este proveedor.
                </p>
              </div>

            </div>
          </div>

          {/* DYNAMIC GUIDANCE BASED ON SELECTION */}
          <div className={`p-3 rounded-xl border flex items-start space-x-2 text-[11px] ${currentConfig.badgeBg} ${currentConfig.borderColor} ${currentConfig.textColor}`}>
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{currentConfig.guidance}</span>
          </div>

          {/* EVALUATOR & JUSTIFICATION */}
          <div className="space-y-3 p-4 bg-verta-navy/40 border border-verta-slate-blue/40 rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-gray-300 mb-1">
                  Evaluador / Responsable de la Decisión <span className="text-verta-coral">*</span>
                </label>
                <div className="relative">
                  <UserCheck className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Ing. Carlos Mendoza (Gerente de Compras)"
                    value={recordedBy}
                    onChange={(e) => setRecordedBy(e.target.value)}
                    className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl pl-9 pr-3 py-2 text-white text-xs"
                  />
                </div>
              </div>

              {selectedDecision === 'aprobado' && (
                <div>
                  <label className="block font-mono text-gray-300 mb-1">
                    Vigencia de la Autorización Interna
                  </label>
                  <select
                    value={validityMonths}
                    onChange={(e) => setValidityMonths(Number(e.target.value))}
                    className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl px-3 py-2 text-white text-xs"
                  >
                    <option value={6}>6 Meses (Revisión semestral)</option>
                    <option value={12}>12 Meses (Vigencia anual estándar)</option>
                    <option value={24}>24 Meses (Contrato plurianual)</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block font-mono text-gray-300 mb-1">
                Motivo / Justificación Interna Corporativa <span className="text-verta-coral">*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder={
                  selectedDecision === 'aprobado' 
                    ? 'Detalle las razones comerciales que respaldan la contratación (precio, capacidad técnica, tiempos de entrega)...'
                    : selectedDecision === 'requiere_aclaraciones'
                    ? 'Especifique qué aclaraciones comerciales o técnicas se requieren del proveedor antes de continuar...'
                    : 'Explique la razón interna de la desestimación (excedió presupuesto, falta de disponibilidad, etc.)...'
                }
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl p-3 text-white text-xs leading-relaxed"
              />
            </div>

            {selectedDecision === 'aprobado' && (
              <div>
                <label className="block font-mono text-gray-300 mb-1">
                  Condiciones Comerciales de Adjudicación (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Pago a 30 días contra entrega; fianza de cumplimiento del 10% del contrato."
                  value={commercialConditions}
                  onChange={(e) => setCommercialConditions(e.target.value)}
                  className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>
            )}

            {selectedDecision === 'no_continua' && (
              <div>
                <label className="block font-mono text-gray-300 mb-1">
                  Nota para archivo confidencial interno
                </label>
                <input
                  type="text"
                  placeholder="Ej. Proveedor elegible para futuras licitaciones de menor escala."
                  value={commercialNotes}
                  onChange={(e) => setCommercialNotes(e.target.value)}
                  className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="pt-3 border-t border-verta-slate-blue/40 flex items-center justify-between">
            <span className="text-[11px] font-mono text-gray-400">
              {savedSuccess ? '¡Decisión guardada con éxito!' : 'Registrado en la bitácora interna de gobernanza.'}
            </span>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-gray-400 hover:text-white font-mono cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-verta-cyan to-indigo-600 hover:from-verta-cyan/95 hover:to-indigo-500 text-verta-navy font-mono font-extrabold text-xs rounded-xl flex items-center space-x-2 shadow-xl cursor-pointer transition-all"
              >
                <Save className="w-4 h-4 text-verta-navy" />
                <span>Registrar Decisión Interna</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
