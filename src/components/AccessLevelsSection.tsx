/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Globe, 
  Building2, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Eye, 
  FileText, 
  Bookmark, 
  ArrowRightLeft, 
  Mail, 
  ShieldAlert,
  Fingerprint,
  ArrowRight,
  Sparkles,
  Scale
} from 'lucide-react';
import { InformationAccessLevel } from '../types';
import { ACCESS_LEVEL_DEFINITIONS } from '../data/accessLevels';

interface AccessLevelsSectionProps {
  onExploreDirectoryWithLevel?: (level: InformationAccessLevel) => void;
}

export function AccessLevelsSection({ onExploreDirectoryWithLevel }: AccessLevelsSectionProps) {
  const [selectedLevel, setSelectedLevel] = useState<InformationAccessLevel>('visitante_publico');
  const activeDef = ACCESS_LEVEL_DEFINITIONS[selectedLevel];

  const levelsList: {
    id: InformationAccessLevel;
    title: string;
    badge: string;
    icon: React.ReactNode;
    color: string;
    bgHover: string;
    summary: string;
  }[] = [
    {
      id: 'visitante_publico',
      title: '1. Visitante público',
      badge: 'CONSULTA ABIERTA',
      icon: <Globe className="w-5 h-5 text-verta-cyan" />,
      color: 'border-verta-cyan/40',
      bgHover: 'hover:border-verta-cyan/60',
      summary: 'Datos generales, servicios, cobertura, estatus de validación y vigencia.'
    },
    {
      id: 'empresa_registrada',
      title: '2. Empresa registrada',
      badge: 'INTERACCIÓN B2B',
      icon: <Building2 className="w-5 h-5 text-blue-400" />,
      color: 'border-blue-500/40',
      bgHover: 'hover:border-blue-500/60',
      summary: 'Guardar perfiles, comparar proveedores y solicitar contacto.'
    },
    {
      id: 'empresa_autorizada',
      title: '3. Empresa autorizada',
      badge: 'EVIDENCIA COMPLETA',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/40',
      bgHover: 'hover:border-emerald-500/60',
      summary: 'Reporte detallado y evidencias documentales permitidas.'
    },
    {
      id: 'verta',
      title: '4. VERTA',
      badge: 'RESERVADO AUDITORÍA',
      icon: <Lock className="w-5 h-5 text-verta-coral" />,
      color: 'border-verta-coral/50',
      bgHover: 'hover:border-verta-coral/70',
      summary: 'Expediente integral reservado para el proceso de validación.'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-verta-cyan/15 border border-verta-cyan/40 px-3.5 py-1 rounded-full text-xs font-mono text-verta-cyan">
          <Scale className="w-3.5 h-3.5 text-verta-cyan" />
          <span className="font-bold uppercase tracking-wider">GOBERNANZA Y CONFIDENCIALIDAD DE DATOS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white tracking-tight">
          4 Niveles de Acceso a la Información
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Diseñado bajo principios de confidencialidad estricta y secreto corporativo. Cada actor accede únicamente a los datos legitimados para su función comercial o de auditoría.
        </p>
      </div>

      {/* 4 Cards Grid with Click Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {levelsList.map((lvl) => {
          const isSelected = selectedLevel === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`verta-glass p-5 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                isSelected
                  ? `border-2 ${lvl.color} bg-verta-navy/90 shadow-2xl ring-1 ring-white/10`
                  : `border border-verta-slate-blue/40 bg-verta-dark-blue/40 ${lvl.bgHover} hover:bg-verta-navy/50`
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-verta-navy/80 border border-verta-slate-blue/40">
                    {lvl.icon}
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-gray-300">
                    {lvl.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-white font-sans">
                  {lvl.title}
                </h3>
              </div>

              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                {lvl.summary}
              </p>

              <div className="pt-2 border-t border-verta-slate-blue/30 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>{isSelected ? 'Nivel Seleccionado' : 'Click para simular'}</span>
                <span className={`text-xs ${isSelected ? 'text-verta-cyan font-bold' : 'text-gray-500'}`}>
                  {isSelected ? '● ACTIVO' : 'Ver alcance →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Viewer for the Selected Level */}
      <div className="verta-glass border border-verta-cyan/30 rounded-3xl p-6 sm:p-8 bg-verta-navy/60 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-verta-slate-blue/40 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${activeDef.color}`}>
                {activeDef.badge}
              </span>
              <span className="text-xs font-mono text-gray-400">ESPECIFICACIÓN OFICIAL VERTA</span>
            </div>
            <h3 className="text-xl font-extrabold text-white font-sans">
              Alcance de {activeDef.name}
            </h3>
          </div>

          {onExploreDirectoryWithLevel && (
            <button
              onClick={() => onExploreDirectoryWithLevel(selectedLevel)}
              className="px-4 py-2 bg-verta-cyan text-verta-navy font-mono font-bold text-xs rounded-xl hover:bg-verta-cyan/90 transition-all flex items-center space-x-2 cursor-pointer shrink-0"
            >
              <span>Probar en el Directorio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Feature columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Permitted Features */}
          <div className="p-5 rounded-2xl bg-verta-emerald/5 border border-verta-emerald/25 space-y-3">
            <div className="flex items-center space-x-2 text-verta-emerald">
              <CheckCircle2 className="w-4 h-4" />
              <h4 className="font-mono font-bold text-xs uppercase tracking-wider">
                Información y Acciones Habilitadas
              </h4>
            </div>

            <ul className="space-y-2 text-xs text-gray-200">
              {activeDef.allowedFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-verta-emerald font-bold shrink-0">✓</span>
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Restricted Features */}
          <div className="p-5 rounded-2xl bg-verta-coral/5 border border-verta-coral/25 space-y-3">
            <div className="flex items-center space-x-2 text-verta-coral">
              <Lock className="w-4 h-4" />
              <h4 className="font-mono font-bold text-xs uppercase tracking-wider">
                Restricciones y Candados de Seguridad
              </h4>
            </div>

            {activeDef.restrictedFeatures.length > 0 ? (
              <ul className="space-y-2 text-xs text-gray-300">
                {activeDef.restrictedFeatures.map((rest, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-verta-coral font-bold shrink-0">✕</span>
                    <span className="leading-relaxed">{rest}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-3 bg-verta-navy/60 rounded-xl border border-verta-slate-blue/30 text-xs text-gray-300 space-y-1">
                <p className="font-bold text-verta-cyan">Sin restricciones (Nivel de Auditoría Interna)</p>
                <p className="text-[11px] text-gray-400">
                  El equipo auditor colegiado de VERTA cuenta con acceso al expediente integral para efectuar el cotejo forense y emitir los sellos de convalidación.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Practical Example Box */}
        <div className="p-4 rounded-xl bg-verta-dark-blue/80 border border-verta-slate-blue/40 text-xs font-mono text-gray-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-white font-bold block mb-0.5">Caso de Uso Típico:</span>
            <span>
              {selectedLevel === 'visitante_publico' && 'Un comprador busca proveedores de logística en el Bajío y consulta su acreditación antes de registrarse.'}
              {selectedLevel === 'empresa_registrada' && 'Un área de compras corporativa guarda a 3 proveedores de TI, los compara lado a lado y les solicita cotización.'}
              {selectedLevel === 'empresa_autorizada' && 'La empresa contratante evalúa la Opinión SAT 32-D cotejada y la Cédula REPSE para formalizar el contrato.'}
              {selectedLevel === 'verta' && 'El auditor revisa los folios mercantiles en el RPC y cruza las listas 69-B del SAT para timbrar el dictamen definitivo.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
