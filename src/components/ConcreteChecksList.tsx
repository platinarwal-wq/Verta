/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  Building2, 
  FileCheck2, 
  UserCheck, 
  MapPin, 
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { ConcreteVerificationBadge, ConcreteVerificationKey } from '../types';
import { CONCRETE_VERIFICATION_CHECK_DEFINITIONS } from '../data/validationStatusContext';

interface ConcreteChecksListProps {
  checks?: ConcreteVerificationBadge[];
  layout?: 'grid' | 'chips' | 'list';
  maxVisible?: number;
}

export const DEFAULT_CONCRETE_CHECKS: ConcreteVerificationBadge[] = [
  {
    key: 'identidad_verificada',
    label: 'Identidad verificada',
    verified: true,
    authorityOrSource: 'INE & SAT (e.firma)',
    verificationDate: 'Abril 2026'
  },
  {
    key: 'situacion_fiscal_validada',
    label: 'Situación fiscal validada (SAT 32-D)',
    verified: true,
    authorityOrSource: 'Webservice SAT (Positiva)',
    verificationDate: 'Vigente (30 días)'
  },
  {
    key: 'constitucion_legal_comprobada',
    label: 'Constitución legal comprobada',
    verified: true,
    authorityOrSource: 'Registro Público de Comercio',
    verificationDate: 'Folio Mercantil FME-94812'
  },
  {
    key: 'cumplimiento_laboral_acreditado',
    label: 'Cumplimiento laboral acreditado',
    verified: true,
    authorityOrSource: 'IMSS & INFONAVIT / REPSE',
    verificationDate: 'Sin adeudos patronales'
  },
  {
    key: 'referencias_verificadas',
    label: 'Referencias comerciales verificadas',
    verified: true,
    authorityOrSource: '3 Clientes Corporativos',
    verificationDate: 'Satisfactorias'
  },
  {
    key: 'domicilio_confirmado',
    label: 'Localización domiciliaria confirmada',
    verified: true,
    authorityOrSource: 'Cotejo Geográfico',
    verificationDate: 'Confirmado en campo'
  },
  {
    key: 'lista_69b_sin_coincidencias',
    label: 'Lista 69-B DOF sin coincidencias',
    verified: true,
    authorityOrSource: 'Diario Oficial de la Federación',
    verificationDate: 'Monitoreo 24/7 Limpio'
  }
];

export function ConcreteChecksList({
  checks = DEFAULT_CONCRETE_CHECKS,
  layout = 'chips',
  maxVisible
}: ConcreteChecksListProps) {
  const visibleChecks = maxVisible ? checks.slice(0, maxVisible) : checks;

  if (layout === 'chips') {
    return (
      <div className="flex flex-wrap gap-1.5">
        {visibleChecks.map((item, idx) => {
          return (
            <span
              key={idx}
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                item.verified
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              }`}
              title={`${item.label} • Verificado por: ${item.authorityOrSource}`}
            >
              {item.verified ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
              ) : (
                <Clock className="w-3 h-3 text-amber-400 shrink-0" />
              )}
              <span className="font-medium truncate max-w-[200px]">{item.label}</span>
            </span>
          );
        })}
      </div>
    );
  }

  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
        {visibleChecks.map((item, idx) => {
          const def = CONCRETE_VERIFICATION_CHECK_DEFINITIONS[item.key as ConcreteVerificationKey];
          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-start space-x-2.5 ${
                item.verified
                  ? 'bg-verta-dark-blue/60 border-verta-slate-blue/40'
                  : 'bg-amber-500/5 border-amber-500/20'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {item.verified ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="font-bold text-white text-xs truncate">{item.label}</h5>
                  <span className="text-[9px] font-mono text-verta-cyan bg-verta-navy px-1.5 py-0.2 rounded border border-verta-cyan/30">
                    {def?.category || 'Normativo'}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-mono truncate">
                  Fuente: {item.authorityOrSource}
                </p>
                {item.verificationDate && (
                  <p className="text-[10px] text-emerald-400 font-mono">
                    Estatus: {item.verificationDate}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Layout list
  return (
    <div className="space-y-2 text-xs">
      {visibleChecks.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-2.5 rounded-xl bg-verta-navy/50 border border-verta-slate-blue/30"
        >
          <div className="flex items-center space-x-2">
            {item.verified ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span className="font-bold text-white text-xs">{item.label}</span>
          </div>
          <span className="text-[10px] font-mono text-gray-400">
            {item.authorityOrSource}
          </span>
        </div>
      ))}
    </div>
  );
}
