/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Award, CheckCircle, HelpCircle, Star, Sparkles, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';
import { VerificationDocument, ClientFeedback } from '../types';

interface ComplianceScoreProps {
  documents: VerificationDocument[];
}

export function ComplianceScore({ documents }: ComplianceScoreProps) {
  // Let's compute a dynamic Compliance Score based on actual document states!
  // This feels extremely high fidelity.
  const scoreData = useMemo(() => {
    let score = 50; // Base score
    
    documents.forEach(doc => {
      if (doc.status === 'validado') {
        score += 10; // +10 for each approved document
      } else if (doc.status === 'pendiente') {
        score += 5;  // +5 for submission in progress
      } else if (doc.status === 'corregir') {
        score -= 2;  // -2 penalty for corrections requested
      }
    });

    // Ensure score is bounded between 0 and 100
    score = Math.min(100, Math.max(0, score));

    let scoreColor = 'from-verta-coral to-amber-500';
    let bgGlow = 'rgba(249,115,22,0.15)';
    let scoreText = 'Mejorable (Nivel Medio)';
    let scoreDescription = 'Se requiere corregir los documentos señalados con advertencias para restablecer la fiabilidad empresarial completa.';

    if (score >= 90) {
      scoreColor = 'from-verta-emerald to-teal-400';
      bgGlow = 'rgba(16,185,129,0.2)';
      scoreText = 'Excelente (Nivel Premium)';
      scoreDescription = 'Su empresa cuenta con todos los controles fiscales y legales al día. Es un emisor confiable para cualquier contrato.';
    } else if (score >= 70) {
      scoreColor = 'from-verta-cyan to-verta-cobalt';
      bgGlow = 'rgba(6,182,212,0.18)';
      scoreText = 'Confiable (Nivel Bueno)';
      scoreDescription = 'Se encuentra en un rango aceptable. Pendiente de que los validadores autoricen los documentos cargados.';
    }

    return { score, scoreColor, scoreText, scoreDescription, bgGlow };
  }, [documents]);

  // Clients Feedback / Areas of Improvement
  const feedbackItems = useMemo<ClientFeedback[]>(() => {
    const list: ClientFeedback[] = [];
    
    // Check if opinon sat is not validated
    const sat = documents.find(d => d.id === 'sat_opinion');
    const rfc = documents.find(d => d.id === 'rfc');
    const domicilio = documents.find(d => d.id === 'domicilio');

    if (sat && sat.status !== 'validado') {
      list.push({
        id: 'fb_1',
        clientName: 'Evaluación de Cumplimiento SAT',
        feedbackText: sat.status === 'corregir' 
          ? 'Urge actualizar la Opinión de Cumplimiento SAT del mes en curso. La actual versión fue rechazada por temporalidad.'
          : 'Opinión de Cumplimiento SAT pendiente de entrega o validación. Vital para emisión de contratos mercantiles.',
        type: 'alert',
        date: 'Hoy'
      });
    } else {
      list.push({
        id: 'fb_1_ok',
        clientName: 'Evaluación de Cumplimiento SAT',
        feedbackText: 'Opinión positiva del SAT validada correctamente. Vigente y autorizada para el ciclo comercial.',
        type: 'success',
        date: 'Ayer'
      });
    }

    if (rfc && rfc.status === 'validado') {
      list.push({
        id: 'fb_2_ok',
        clientName: 'Cotejo de Identidad Fiscal',
        feedbackText: 'Constancia de RFC coincide plenamente con la razón social registrada. Datos de contacto validados.',
        type: 'success',
        date: 'Hace 2 días'
      });
    }

    if (domicilio && domicilio.status === 'corregir') {
      list.push({
        id: 'fb_3',
        clientName: 'Verificación de Domicilio',
        feedbackText: 'El recibo de CFE presentado tiene antigüedad mayor a 3 meses. Favor de presentar el del último bimestre.',
        type: 'alert',
        date: 'Hoy'
      });
    }

    // Default general item
    list.push({
      id: 'fb_gen',
      clientName: 'Auditoría VERTA Global',
      feedbackText: 'Fiabilidad comercial calculada a través del cruce de bases de datos de la AFIP, SAT y registros públicos corporativos.',
      type: 'general',
      date: 'Hace 3 días'
    });

    return list;
  }, [documents]);

  return (
    <section className="px-4 lg:px-8 py-8 lg:py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* LEFT PANEL: COMPLIANCE SCORE METER (5 Columns) */}
      <div className="lg:col-span-5 verta-glass border border-verta-slate-blue/60 rounded-2xl p-6 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden text-center group">
        {/* Glow behind circle */}
        <div className="absolute inset-0 bg-radial from-verta-cobalt/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="w-full text-left flex items-center justify-between border-b border-verta-slate-blue/30 pb-4 mb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-verta-cyan">Cumplimiento Fiscal</span>
            <h3 className="font-bold text-lg text-white">Mi Puntuación de Fiabilidad</h3>
          </div>
          <Award className="w-6 h-6 text-verta-coral animate-pulse" />
        </div>

        {/* Dynamic SVG Gauge Meter */}
        <div className="relative w-44 h-44 my-4 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Outer Ring Track */}
            <circle
              cx="88"
              cy="88"
              r="76"
              className="stroke-verta-dark-blue fill-none"
              strokeWidth="9"
            />
            {/* Colored Active Gauge */}
            <circle
              cx="88"
              cy="88"
              r="76"
              className="stroke-verta-cyan fill-none transition-all duration-1000 ease-out"
              strokeWidth="9"
              strokeDasharray={2 * Math.PI * 76}
              strokeDashoffset={2 * Math.PI * 76 * (1 - scoreData.score / 100)}
              strokeLinecap="round"
            />
          </svg>
          {/* Central numeric content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-white tracking-widest font-mono">
              {scoreData.score}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-gray-400 mt-1 uppercase">pts compliance</span>
          </div>
        </div>

        {/* Feedback indicators under meter */}
        <div className="space-y-3 w-full mt-4">
          <div className="bg-verta-navy/50 border border-verta-slate-blue/30 px-3.5 py-2.5 rounded-xl font-mono text-xs">
            <span className="text-gray-400">Rango Comercial: </span>
            <span className={`font-bold bg-gradient-to-r ${scoreData.scoreColor} bg-clip-text text-transparent`}>
              {scoreData.scoreText}
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            {scoreData.scoreDescription}
          </p>
        </div>
      </div>

      {/* RIGHT PANEL: AUDITOR FEED & IMPROVEMENTS (7 Columns) */}
      <div className="lg:col-span-7 verta-glass border border-verta-slate-blue/60 rounded-2xl p-6 shadow-2xl relative flex flex-col justify-between">
        
        <div className="space-y-4">
          <div className="border-b border-verta-slate-blue/30 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-verta-cyan">Comentarios Oficiales</span>
            <h3 className="font-bold text-lg text-white">Comentarios de Clientes y Áreas de Mejora</h3>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 scrollbar">
            {feedbackItems.map((item) => {
              const borderTheme = 
                item.type === 'success' ? 'border-verta-emerald/20 bg-verta-emerald/5 text-gray-200' :
                item.type === 'alert' ? 'border-verta-coral/20 bg-verta-coral/5 text-gray-200' :
                'border-verta-slate-blue/20 bg-verta-navy/40 text-gray-400';

              const icon = 
                item.type === 'success' ? <ShieldCheck className="w-4.5 h-4.5 text-verta-emerald shrink-0 mt-0.5" /> :
                item.type === 'alert' ? <AlertTriangle className="w-4.5 h-4.5 text-verta-coral shrink-0 mt-0.5" /> :
                <TrendingUp className="w-4.5 h-4.5 text-verta-cyan shrink-0 mt-0.5" />;

              return (
                <div key={item.id} className={`p-4 rounded-xl border ${borderTheme} flex items-start space-x-3 transition-colors`}>
                  {icon}
                  <div className="space-y-1 w-full">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold text-white tracking-tight">{item.clientName}</p>
                      <span className="text-[10px] font-mono text-gray-500">{item.date}</span>
                    </div>
                    <p className="text-xs leading-relaxed font-sans">{item.feedbackText}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform scoring guide footer */}
        <div className="mt-4 pt-4 border-t border-verta-slate-blue/30 flex items-center justify-between text-xs text-gray-400">
          <span className="font-mono text-[10px]">VERTA SCORE v4.12 • AUTOMÁTICO</span>
          <span className="flex items-center space-x-1 font-semibold text-verta-cyan">
            <span>Saber más sobre scoring</span>
            <span>→</span>
          </span>
        </div>

      </div>

    </section>
  );
}
