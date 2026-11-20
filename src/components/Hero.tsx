/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Clock, PenSquare, Check, X, Award, Percent } from 'lucide-react';
import { VerificationDocument } from '../types';

interface HeroProps {
  documents: VerificationDocument[];
  providerName: string;
  setProviderName: (name: string) => void;
  clientName: string;
  setClientName: (name: string) => void;
}

export function Hero({ documents, providerName, setProviderName, clientName, setClientName }: HeroProps) {
  const [isEditingNames, setIsEditingNames] = useState(false);
  const [tempProvider, setTempProvider] = useState(providerName);
  const [tempClient, setTempClient] = useState(clientName);

  // Calculate dynamic stats
  const totalDocs = documents.length;
  const verifiedDocsCount = documents.filter(doc => doc.status === 'validado').length;
  const pendingDocsCount = documents.filter(doc => doc.status === 'pendiente').length;
  const correctionDocsCount = documents.filter(doc => doc.status === 'corregir').length;

  const progressPercentage = Math.round((verifiedDocsCount / totalDocs) * 100);

  // Overall Status Decider
  let overallStatus: 'verified' | 'in_progress' | 'attention' = 'in_progress';
  let overallStatusText = 'En Proceso';
  let overallStatusColor = 'text-verta-cyan border-verta-cyan/30 bg-verta-cyan/5';
  let overallStatusIcon = <Clock className="w-6 h-6 text-verta-cyan animate-spin-slow" />;

  if (verifiedDocsCount === totalDocs) {
    overallStatus = 'verified';
    overallStatusText = 'Verificado';
    overallStatusColor = 'text-verta-emerald border-verta-emerald/30 bg-verta-emerald/5';
    overallStatusIcon = <ShieldCheck className="w-6 h-6 text-verta-emerald" />;
  } else if (correctionDocsCount > 0) {
    overallStatus = 'attention';
    overallStatusText = 'Atención Requerida';
    overallStatusColor = 'text-verta-coral border-verta-coral/30 bg-verta-coral/5';
    overallStatusIcon = <ShieldAlert className="w-6 h-6 text-verta-coral animate-bounce" />;
  }

  const saveNames = () => {
    if (tempProvider.trim()) setProviderName(tempProvider);
    if (tempClient.trim()) setClientName(tempClient);
    setIsEditingNames(false);
  };

  return (
    <section className="relative px-4 lg:px-8 py-8 lg:py-12 overflow-hidden bg-gradient-to-b from-verta-dark-blue/80 to-verta-navy border-b border-verta-slate-blue/30 metal-texture">
      {/* Background neon light ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-verta-cobalt/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-verta-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: HERO titles and custom name editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-verta-slate-blue/30 border border-verta-slate-blue/60 px-3 py-1 rounded-full text-xs font-mono text-verta-cyan">
            <span>VERTA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-verta-cyan animate-pulse" />
            <span>VALIDACIÓN Y ESTRUCTURACIÓN</span>
          </div>

          {!isEditingNames ? (
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
                Su Panel de Verificación de Proveedor
              </h1>
              <p className="text-lg lg:text-xl font-medium text-verta-cyan/90 max-w-2xl font-mono">
                {providerName}
              </p>
              <p className="text-sm text-gray-400 max-w-2xl">
                Gestione la documentación requerida para trabajar con <span className="text-white font-semibold">{clientName}</span> a través de VERTA para formalizar su relación laboral y de cumplimiento normativo.
              </p>
              <button 
                onClick={() => setIsEditingNames(true)}
                className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-verta-coral font-mono transition-all uppercase tracking-wider py-1 cursor-pointer"
              >
                <PenSquare className="w-3.5 h-3.5" />
                <span>Editar nombres corporativos de demostración</span>
              </button>
            </div>
          ) : (
            <div className="verta-glass border border-verta-cyan/30 p-4 rounded-xl space-y-3 max-w-xl animate-fade-in">
              <h3 className="text-xs font-bold font-mono tracking-wider text-verta-cyan uppercase">Modelar Entidades de la Demo</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-1">Empresa Proveedora</label>
                  <input
                    type="text"
                    value={tempProvider}
                    onChange={(e) => setTempProvider(e.target.value)}
                    className="w-full bg-verta-navy border border-verta-slate-blue hover:border-verta-cyan/50 focus:border-verta-cyan focus:outline-none rounded-lg px-3 py-1.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-mono mb-1">Empresa Cliente</label>
                  <input
                    type="text"
                    value={tempClient}
                    onChange={(e) => setTempClient(e.target.value)}
                    className="w-full bg-verta-navy border border-verta-slate-blue hover:border-verta-cyan/50 focus:border-verta-cyan focus:outline-none rounded-lg px-3 py-1.5 text-sm text-white"
                  />
                </div>
              </div>
              <div className="flex space-x-2 pt-1.5">
                <button
                  onClick={saveNames}
                  className="px-3 py-1 bg-verta-cyan text-verta-navy font-bold rounded-lg text-xs hover:bg-verta-cyan/95 transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </button>
                <button
                  onClick={() => {
                    setTempProvider(providerName);
                    setTempClient(clientName);
                    setIsEditingNames(false);
                  }}
                  className="px-3 py-1 bg-verta-slate-blue/40 text-gray-300 rounded-lg text-xs hover:bg-verta-slate-blue/70 transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancelar</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: GENERAL STATUS PANEL & PROGRESS */}
        <div className="w-full">
          <div className="verta-glass border border-verta-slate-blue/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            {/* Status light dot effect */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-verta-cyan/5 rounded-full blur-2xl pointer-events-none" />

            {/* Overall status display */}
            <div className="flex items-center justify-between border-b border-verta-slate-blue/40 pb-4 mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Estado de Verificación</span>
              <div className={`flex items-center space-x-2 border rounded-full px-3 py-1 text-sm font-semibold ${overallStatusColor}`}>
                {overallStatusIcon}
                <span>{overallStatusText}</span>
              </div>
            </div>

            {/* Dynamic visual progress metrics */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 font-mono">PROGRESO LEGAL</p>
                  <p className="text-2xl font-bold text-white tracking-tight mt-0.5">
                    {verifiedDocsCount} <span className="text-sm font-normal text-gray-500">de {totalDocs} documentos</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-verta-cyan font-mono">{progressPercentage}%</span>
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="w-full bg-verta-navy/60 h-2.5 rounded-full border border-verta-slate-blue/30 overflow-hidden p-0.5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-verta-cobalt via-verta-cyan to-verta-emerald shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all duration-700 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Status details indicators */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-verta-slate-blue/30 text-center font-mono text-[11px] text-gray-400">
                <div className="bg-verta-navy/40 p-2 rounded-lg border border-verta-slate-blue/20">
                  <span className="block text-xs font-bold text-verta-emerald">{verifiedDocsCount}</span>
                  <span>Aprobados</span>
                </div>
                <div className="bg-verta-navy/40 p-2 rounded-lg border border-verta-slate-blue/20">
                  <span className="block text-xs font-bold text-verta-cyan">{pendingDocsCount}</span>
                  <span>En Revisión</span>
                </div>
                <div className="bg-verta-navy/40 p-2 rounded-lg border border-verta-slate-blue/20">
                  <span className={`block text-xs font-bold ${correctionDocsCount > 0 ? 'text-verta-coral' : 'text-gray-400'}`}>
                    {correctionDocsCount}
                  </span>
                  <span>Por Corregir</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
