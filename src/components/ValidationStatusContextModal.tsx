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
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  HelpCircle, 
  ArrowRight,
  Info,
  Scale,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { StandardValidationStatus, ValidationStatusContext } from '../types';
import { 
  STANDARDIZED_VALIDATION_STATUSES, 
  METHODOLOGY_SUSPENSION_STATEMENT 
} from '../data/validationStatusContext';

interface ValidationStatusContextModalProps {
  status: StandardValidationStatus;
  companyName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ValidationStatusContextModal({
  status,
  companyName,
  isOpen,
  onClose
}: ValidationStatusContextModalProps) {
  const [activeStatusKey, setActiveStatusKey] = useState<StandardValidationStatus>(status);

  if (!isOpen) return null;

  const currentContext: ValidationStatusContext = STANDARDIZED_VALIDATION_STATUSES[activeStatusKey] || STANDARDIZED_VALIDATION_STATUSES.validado;

  const STATUS_ICONS: Record<StandardValidationStatus, React.ReactNode> = {
    validado: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    validado_con_observaciones: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    informacion_pendiente: <Clock className="w-5 h-5 text-blue-400" />,
    actualizacion_requerida: <RefreshCw className="w-5 h-5 text-cyan-400" />,
    no_cumple: <XCircle className="w-5 h-5 text-rose-400" />,
    validacion_vencida: <Clock className="w-5 h-5 text-gray-400" />
  };

  const ALL_STATUS_KEYS: StandardValidationStatus[] = [
    'validado',
    'validado_con_observaciones',
    'informacion_pendiente',
    'actualizacion_requerida',
    'no_cumple',
    'validacion_vencida'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in text-white font-sans">
      <div className="relative w-full max-w-3xl verta-glass border border-verta-cyan/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto bg-gradient-to-b from-verta-dark-blue via-verta-navy to-verta-dark-blue">
        
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-verta-slate-blue/40 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-verta-cyan/15 border border-verta-cyan/30 px-3 py-0.5 rounded-full text-[10px] font-mono text-verta-cyan font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ESTÁNDAR NORMATIVO DE VALIDACIÓN VERTA</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              Contexto Oficial del Estado de Validación
            </h2>
            {companyName && (
              <p className="text-xs text-gray-300 font-sans">
                Proveedor en consulta: <strong className="text-white">{companyName}</strong>
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-verta-slate-blue/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* METHODOLOGICAL TRANSPARENCY BANNER (SCORE SUSPENSION DISCLOSURE) */}
        <div className="p-4 rounded-2xl bg-verta-navy/70 border border-verta-slate-blue/50 flex items-start space-x-3 text-xs">
          <div className="p-2 rounded-xl bg-verta-cyan/15 text-verta-cyan shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-verta-cyan font-mono text-[11px] uppercase tracking-wide">
              {METHODOLOGY_SUSPENSION_STATEMENT.title}
            </h4>
            <p className="text-gray-300 font-sans leading-relaxed text-[11px]">
              {METHODOLOGY_SUSPENSION_STATEMENT.description}
            </p>
          </div>
        </div>

        {/* SELECTOR FOR THE 6 STANDARDIZED STATES */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-gray-400 font-bold uppercase block">
            Estados Estandarizados del Sistema (Haga clic para explorar):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {ALL_STATUS_KEYS.map((key) => {
              const item = STANDARDIZED_VALIDATION_STATUSES[key];
              const isSelected = activeStatusKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveStatusKey(key)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                    isSelected
                      ? `${item.badgeBg} ${item.borderColor} shadow-lg ring-1 ring-verta-cyan/50`
                      : 'bg-verta-dark-blue/60 border-verta-slate-blue/40 hover:bg-verta-navy text-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    {STATUS_ICONS[key]}
                    <span className={`text-[11px] font-bold truncate ${isSelected ? item.textColor : 'text-gray-300'}`}>
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CURRENT STATUS ACTIVE CARD WITH 4 MANDATORY DIMENSIONS */}
        <div className="p-5 sm:p-6 rounded-3xl bg-verta-dark-blue/80 border border-verta-cyan/30 space-y-5">
          
          {/* Status Title Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-verta-slate-blue/40 pb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-2xl ${currentContext.badgeBg} border ${currentContext.borderColor}`}>
                {STATUS_ICONS[currentContext.id]}
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block">
                  ESTADO SELECCIONADO:
                </span>
                <h3 className={`text-xl font-extrabold ${currentContext.textColor} font-display`}>
                  {currentContext.label}
                </h3>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${currentContext.badgeBg} ${currentContext.textColor} border ${currentContext.borderColor}`}>
              {currentContext.shortDescription}
            </span>
          </div>

          {/* THE 4 MANDATORY DIMENSIONS REQUESTED BY USER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            {/* 1. QUÉ SIGNIFICA */}
            <div className="p-4 rounded-2xl bg-verta-navy/60 border border-verta-slate-blue/40 space-y-2">
              <div className="flex items-center space-x-2 text-verta-cyan font-mono font-bold text-xs uppercase tracking-wide">
                <Info className="w-4 h-4 text-verta-cyan shrink-0" />
                <span>1. ¿Qué significa este estatus?</span>
              </div>
              <p className="text-gray-200 font-sans leading-relaxed text-xs">
                {currentContext.meaning}
              </p>
            </div>

            {/* 2. QUÉ FALTA */}
            <div className="p-4 rounded-2xl bg-verta-navy/60 border border-verta-slate-blue/40 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold text-xs uppercase tracking-wide">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>2. ¿Qué falta por solventar?</span>
              </div>
              <p className="text-gray-200 font-sans leading-relaxed text-xs">
                {currentContext.missingElements}
              </p>
            </div>

            {/* 3. QUÉ RIESGO REPRESENTA */}
            <div className="p-4 rounded-2xl bg-verta-navy/60 border border-verta-slate-blue/40 space-y-2">
              <div className="flex items-center space-x-2 text-rose-400 font-mono font-bold text-xs uppercase tracking-wide">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>3. ¿Qué riesgo representa para la empresa?</span>
              </div>
              <p className="text-gray-200 font-sans leading-relaxed text-xs">
                {currentContext.riskAssessment}
              </p>
            </div>

            {/* 4. QUÉ ACCIONES PROCEDEN */}
            <div className="p-4 rounded-2xl bg-verta-navy/60 border border-verta-slate-blue/40 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wide">
                <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>4. ¿Qué acciones proceden?</span>
              </div>
              <p className="text-gray-200 font-sans leading-relaxed text-xs">
                {currentContext.proceedingActions}
              </p>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-2 border-t border-verta-slate-blue/40 flex items-center justify-between">
          <span className="text-[11px] font-mono text-gray-400">
            Marco Metodológico VERTA v4.2 &bull; Validación basada en Evidencia Objetiva
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-verta-cyan text-verta-navy font-mono font-bold text-xs rounded-xl hover:bg-verta-cyan/90 transition-all cursor-pointer"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}
