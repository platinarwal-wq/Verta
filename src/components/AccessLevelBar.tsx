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
  HelpCircle, 
  Eye, 
  FileText, 
  Scale, 
  Bookmark, 
  ArrowRightLeft, 
  Mail, 
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { InformationAccessLevel } from '../types';
import { ACCESS_LEVEL_DEFINITIONS } from '../data/accessLevels';

interface AccessLevelBarProps {
  currentLevel: InformationAccessLevel;
  onLevelChange: (level: InformationAccessLevel) => void;
  compact?: boolean;
}

export function AccessLevelBar({ currentLevel, onLevelChange, compact = false }: AccessLevelBarProps) {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const activeDef = ACCESS_LEVEL_DEFINITIONS[currentLevel];

  const levels: { id: InformationAccessLevel; label: string; icon: React.ReactNode; short: string; color: string }[] = [
    {
      id: 'visitante_publico',
      label: '1. Visitante público',
      icon: <Globe className="w-3.5 h-3.5" />,
      short: 'Datos generales, servicios, cobertura, estatus de validación y vigencia',
      color: currentLevel === 'visitante_publico' ? 'bg-verta-cyan text-verta-navy font-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-verta-slate-blue/30'
    },
    {
      id: 'empresa_registrada',
      label: '2. Empresa registrada',
      icon: <Building2 className="w-3.5 h-3.5" />,
      short: 'Guardar perfiles, comparar proveedores y solicitar contacto',
      color: currentLevel === 'empresa_registrada' ? 'bg-blue-500 text-white font-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-verta-slate-blue/30'
    },
    {
      id: 'empresa_autorizada',
      label: '3. Empresa autorizada',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      short: 'Reporte detallado y evidencias documentales permitidas',
      color: currentLevel === 'empresa_autorizada' ? 'bg-emerald-500 text-white font-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-verta-slate-blue/30'
    },
    {
      id: 'verta',
      label: '4. VERTA',
      icon: <Lock className="w-3.5 h-3.5" />,
      short: 'Expediente integral reservado para el proceso de validación',
      color: currentLevel === 'verta' ? 'bg-verta-coral text-white font-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-verta-slate-blue/30'
    }
  ];

  if (compact) {
    return (
      <div className="flex items-center space-x-2 bg-verta-navy/80 border border-verta-slate-blue/40 p-1 rounded-xl text-xs font-mono">
        <span className="text-gray-400 text-[10px] pl-2 hidden sm:inline">Nivel de Acceso:</span>
        <div className="flex space-x-1">
          {levels.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => onLevelChange(lvl.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentLevel === lvl.id
                  ? lvl.color
                  : 'text-gray-400 hover:text-white'
              }`}
              title={lvl.short}
            >
              {lvl.icon}
              <span className="hidden md:inline">{lvl.label.split('.')[1]}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="verta-glass border border-verta-slate-blue/60 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Title & Explainer trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-verta-slate-blue/40 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-verta-cyan/15 border border-verta-cyan/40 flex items-center justify-center text-verta-cyan">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase tracking-widest text-verta-cyan font-bold">
                Control de Información y Privacidad
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-white/10 text-gray-300 font-semibold">
                4 NIVELES DE ACCESO
              </span>
            </div>
            <h3 className="text-base font-bold text-white font-sans">
              Seleccione el Nivel de Acceso a la Información
            </h3>
          </div>
        </div>

        <button
          onClick={() => setShowInfoModal(true)}
          className="inline-flex items-center space-x-1.5 text-xs text-verta-cyan hover:text-white transition-colors font-mono cursor-pointer self-start sm:self-auto"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Ver Matriz de Permisos</span>
        </button>
      </div>

      {/* 4 Interactive Level Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {levels.map((lvl) => {
          const isSelected = currentLevel === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => onLevelChange(lvl.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'border-verta-cyan/60 bg-verta-navy/90 shadow-lg ring-1 ring-verta-cyan/30'
                  : 'border-verta-slate-blue/40 bg-verta-dark-blue/40 hover:border-verta-slate-blue hover:bg-verta-navy/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-verta-cyan text-verta-navy' : 'bg-verta-slate-blue/30 text-gray-400'}`}>
                    {lvl.icon}
                  </span>
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {lvl.label}
                  </span>
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-verta-cyan animate-pulse" />
                )}
              </div>
              <p className="text-[11px] text-gray-400 font-sans leading-relaxed line-clamp-2">
                {lvl.short}
              </p>
            </button>
          );
        })}
      </div>

      {/* Dynamic Active Level Explanation Strip */}
      <div className="p-3.5 rounded-xl bg-verta-navy/60 border border-verta-slate-blue/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center space-x-3">
          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="text-gray-400 font-mono">Modo Activo:</span>
            <span className="font-mono font-bold text-white px-2 py-0.5 rounded bg-white/10">
              {activeDef.name}
            </span>
          </div>
          <span className="text-gray-300 hidden md:inline">&bull;</span>
          <p className="text-gray-300 font-sans">
            {activeDef.shortDesc}
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-[10px] font-mono text-gray-400">Permisos:</span>
          <span className="text-[10px] font-mono text-verta-emerald font-bold bg-verta-emerald/10 border border-verta-emerald/30 px-2 py-0.5 rounded">
            {activeDef.allowedFeatures.length} Habilitados
          </span>
          {activeDef.restrictedFeatures.length > 0 && (
            <span className="text-[10px] font-mono text-verta-coral font-bold bg-verta-coral/10 border border-verta-coral/30 px-2 py-0.5 rounded">
              {activeDef.restrictedFeatures.length} Reservados
            </span>
          )}
        </div>
      </div>

      {/* MODAL MATRIZ DE PERMISOS DETALLADA */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-3xl verta-glass border border-verta-cyan/40 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-verta-slate-blue/40 pb-3">
              <div>
                <span className="text-[10px] font-mono text-verta-cyan uppercase font-bold tracking-wider">
                  ESPECIFICACIÓN DE SEGURIDAD Y PRIVACIDAD VERTA
                </span>
                <h3 className="text-xl font-extrabold text-white font-display">
                  Matriz de 4 Niveles de Acceso a la Información
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  Protegemos el secreto comercial y la confidencialidad corporativa limitando la exposición documental a partes con legitimación comprobada.
                </p>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {Object.values(ACCESS_LEVEL_DEFINITIONS).map((def, idx) => (
                <div key={def.id} className="p-4 rounded-xl bg-verta-navy/80 border border-verta-slate-blue/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-6 h-6 rounded-full bg-verta-cyan/20 border border-verta-cyan/40 text-verta-cyan text-xs font-mono font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white font-sans">{def.name}</h4>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${def.color}`}>
                        {def.badge}
                      </span>
                    </div>
                    {currentLevel === def.id ? (
                      <span className="text-xs font-mono text-verta-cyan font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Nivel Seleccionado</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          onLevelChange(def.id);
                          setShowInfoModal(false);
                        }}
                        className="text-xs font-mono text-gray-400 hover:text-white px-2.5 py-1 rounded bg-verta-slate-blue/30 hover:bg-verta-slate-blue/60 transition-all cursor-pointer"
                      >
                        Activar este nivel
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-gray-300 font-sans">
                    {def.shortDesc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-sans">
                    <div className="space-y-1.5 bg-verta-emerald/5 border border-verta-emerald/20 p-3 rounded-lg">
                      <span className="text-[11px] font-mono text-verta-emerald font-bold block uppercase">
                        ✓ Información y Funciones Permitidas
                      </span>
                      <ul className="space-y-1 text-gray-300 text-[11px]">
                        {def.allowedFeatures.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-1.5">
                            <span className="text-verta-emerald shrink-0">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1.5 bg-verta-coral/5 border border-verta-coral/20 p-3 rounded-lg">
                      <span className="text-[11px] font-mono text-verta-coral font-bold block uppercase">
                        ✕ Restricciones y Candados de Seguridad
                      </span>
                      {def.restrictedFeatures.length > 0 ? (
                        <ul className="space-y-1 text-gray-300 text-[11px]">
                          {def.restrictedFeatures.map((rest, rIdx) => (
                            <li key={rIdx} className="flex items-start space-x-1.5">
                              <span className="text-verta-coral shrink-0">•</span>
                              <span>{rest}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[11px] text-gray-400 italic">
                          Acceso total e irrestricto sin limitaciones (Equipo Auditor Interno).
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-5 py-2.5 bg-verta-cyan text-verta-navy font-mono font-bold text-xs rounded-xl hover:bg-verta-cyan/90 transition-all cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
