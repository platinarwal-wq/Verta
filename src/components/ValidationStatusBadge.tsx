/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  HelpCircle,
  Info
} from 'lucide-react';
import { StandardValidationStatus } from '../types';
import { STANDARDIZED_VALIDATION_STATUSES } from '../data/validationStatusContext';
import { ValidationStatusContextModal } from './ValidationStatusContextModal';

interface ValidationStatusBadgeProps {
  status: StandardValidationStatus | string;
  companyName?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export function ValidationStatusBadge({
  status,
  companyName,
  size = 'md',
  interactive = true
}: ValidationStatusBadgeProps) {
  const [showContextModal, setShowContextModal] = useState(false);

  // Normalize status string if it's legacy
  let normalizedStatus: StandardValidationStatus = 'validado';
  if (status === 'validado' || status === 'Vigente y Validado' || status === 'Validado') {
    normalizedStatus = 'validado';
  } else if (status === 'validado_con_observaciones' || status === 'Observado' || status === 'Validado con observaciones') {
    normalizedStatus = 'validado_con_observaciones';
  } else if (status === 'informacion_pendiente' || status === 'Información pendiente' || status === 'pendiente') {
    normalizedStatus = 'informacion_pendiente';
  } else if (status === 'actualizacion_requerida' || status === 'En Renovación' || status === 'Actualización requerida') {
    normalizedStatus = 'actualizacion_requerida';
  } else if (status === 'no_cumple' || status === 'No cumple criterios obligatorios' || status === 'Rechazado') {
    normalizedStatus = 'no_cumple';
  } else if (status === 'validacion_vencida' || status === 'Vencido' || status === 'Validación vencida') {
    normalizedStatus = 'validacion_vencida';
  }

  const cfg = STANDARDIZED_VALIDATION_STATUSES[normalizedStatus] || STANDARDIZED_VALIDATION_STATUSES.validado;

  const STATUS_ICONS: Record<StandardValidationStatus, React.ReactNode> = {
    validado: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />,
    validado_con_observaciones: <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
    informacion_pendiente: <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />,
    actualizacion_requerida: <RefreshCw className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
    no_cumple: <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />,
    validacion_vencida: <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3.5 py-1.5 text-xs font-bold gap-2'
  };

  return (
    <>
      <span
        onClick={interactive ? () => setShowContextModal(true) : undefined}
        className={`inline-flex items-center rounded-full font-mono font-bold uppercase border transition-all ${
          cfg.badgeBg
        } ${cfg.textColor} ${cfg.borderColor} ${sizeClasses[size]} ${
          interactive ? 'cursor-pointer hover:opacity-90 hover:scale-[1.02] shadow-sm' : ''
        }`}
        title={interactive ? 'Haga clic para ver qué significa, qué falta, riesgos y acciones' : undefined}
      >
        {STATUS_ICONS[normalizedStatus]}
        <span className="truncate">{cfg.label}</span>
        {interactive && (
          <Info className="w-3 h-3 opacity-60 hover:opacity-100 ml-0.5 shrink-0" />
        )}
      </span>

      {interactive && (
        <ValidationStatusContextModal
          status={normalizedStatus}
          companyName={companyName}
          isOpen={showContextModal}
          onClose={() => setShowContextModal(false)}
        />
      )}
    </>
  );
}
