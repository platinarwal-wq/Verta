/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Award, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ExternalLink, 
  X, 
  Search, 
  ChevronRight, 
  Scale, 
  TrendingUp, 
  Layers, 
  Download, 
  Check, 
  BookOpen, 
  Zap,
  Briefcase
} from 'lucide-react';
import { PullDirectory } from './PullDirectory';
import { ConsultantsDirectory } from './ConsultantsDirectory';
import { IsoDirectory } from './IsoDirectory';

// Definition of the 2 Corporate Compliance Results
interface ComplianceResultCard {
  id: string;
  companyName: string;
  rfc: string;
  sector: string;
  regimenActual: string;
  antiguedad: string;
  riskScore: 'Crítico' | 'Alto' | 'Medio' | 'Bajo';
  progressScore: number;
  executiveSummary: string;
  situacionLaboral: string;
  objetivoComercial: string;
  recomendacionLegalOption: string;
  recomendacionLegalReason: string;
  prioridadInmediata: string;
  risksMatrix: {
    area: string;
    level: 'Crítico' | 'Alto' | 'Medio' | 'Bajo';
    desc: string;
  }[];
  proposedStrategy: {
    fase: string;
    actividad: string;
    tiempo: string;
  }[];
  fees: {
    diagnostico: string;
    implementacion: string;
    iguala: string;
  };
}

const TWO_COMPLIANCE_RESULTS: ComplianceResultCard[] = [
  {
    id: 'res_1',
    companyName: 'Bebidas y Alimentos del Bajío S.A.',
    rfc: 'BAB-960418-L82',
    sector: 'Alimentos & Bebidas',
    regimenActual: 'Persona Física con Actividad Empresarial',
    antiguedad: '28 años',
    riskScore: 'Alto',
    progressScore: 25,
    executiveSummary: 'Operación continua durante 28 años bajo esquema de Persona Física. Presenta vulnerabilidades críticas en la estructuración de nómina impositiva e inconsistencias con registros del IMSS.',
    situacionLaboral: 'Existen trabajadores de planta no registrados completamente ante el IMSS / Pagos semanales en efectivo parciales.',
    objetivoComercial: 'Convertirse en proveedor directo acreditado de corporativos trasnacionales (Bimbo, Lala, Arca Continental).',
    recomendacionLegalOption: 'SAPI de CV (Sociedad Anónima Promotora de Inversión)',
    recomendacionLegalReason: 'Transformación indispensable a Persona Moral para aislar el patrimonio familiar, dar certidumbre a clientes de gran escala y habilitar atracción de capital inversionista.',
    prioridadInmediata: 'Diagnóstico integral fiscal y regularización laboral preventiva previa a visitas de auditoría del SAT / STPS.',
    risksMatrix: [
      { area: 'IMSS', level: 'Crítico', desc: 'Trabajadores activos de embalaje omitidos en reportes. Contingencia inminente de capitales constitutivos.' },
      { area: 'ISR', level: 'Alto', desc: 'Carga fiscal excesiva bajo tarifa progresiva de Persona Física (hasta 35%) sin deducibilidad óptima de pasivos.' },
      { area: 'Patrimonial', level: 'Alto', desc: 'Bienes personales respaldan directamente créditos fiscales del SAT y pasivos laborales.' },
      { area: 'Compliance', level: 'Alto', desc: 'No califica ante comités de compras de grandes retail por falta de gobierno corporativo y REPSE.' }
    ],
    proposedStrategy: [
      { fase: 'Fase 1', actividad: 'Diagnóstico integral fiscal, laboral y legal preventivo', tiempo: '2 a 4 semanas' },
      { fase: 'Fase 2', actividad: 'Regularización laboral y constitución de Persona Moral', tiempo: '4 a 8 semanas' },
      { fase: 'Fase 3', actividad: 'Despliegue de Compliance Corporativo y licitaciones', tiempo: '3 a 6 semanas' }
    ],
    fees: {
      diagnostico: '$45,000 a $85,000 MXN + IVA',
      implementacion: '$120,000 a $350,000 MXN + IVA',
      iguala: '$18,000 a $60,000 MXN + IVA'
    }
  },
  {
    id: 'res_2',
    companyName: 'Manufacturas y Empaques de Querétaro S.A.P.I. de C.V.',
    rfc: 'MEQ-210512-AB3',
    sector: 'Manufactura & Automotriz',
    regimenActual: 'Persona Moral S.A.P.I. de C.V.',
    antiguedad: '5 años',
    riskScore: 'Bajo',
    progressScore: 95,
    executiveSummary: 'Empresa manufacturera con gobierno corporativo maduro, nómina 100% formalizada y auditorías dictaminadas sin observaciones fiscales vigentes.',
    situacionLaboral: 'Cumplimiento absoluto del padrón de personal en el IMSS con salario base de cotización real.',
    objetivoComercial: 'Expandir exportaciones de empaques a EE.UU. e integrarse como proveedor Nivel 1 en armadoras automotrices.',
    recomendacionLegalOption: 'Mantener S.A.P.I. de C.V. y optimizar fideicomisos',
    recomendacionLegalReason: 'Consolidación del esquema promotor de inversión, mantenimiento de libros de asambleas y reforzamiento de manuales RECO de comercio exterior.',
    prioridadInmediata: 'Reforzar auditorías cruzadas a subcontratistas en la cadena de suministro (Controles REPSE secundarios).',
    risksMatrix: [
      { area: 'ISR', level: 'Bajo', desc: 'Sólida deducibilidad de activos industriales e importaciones con depreciación acelerada regulada.' },
      { area: 'IVA', level: 'Bajo', desc: 'Devoluciones de saldos a favor por tasa 0% de exportación gestionadas con trazabilidad estricta.' },
      { area: 'IMSS', level: 'Bajo', desc: '100% del personal en planta adecuadamente cotizado con salario base real.' },
      { area: 'Compliance', level: 'Bajo', desc: 'Manuales de control de calidad maduros y aprobados en auditorías corporativas.' }
    ],
    proposedStrategy: [
      { fase: 'Fase 1', actividad: 'Auditoría preventiva de comercio exterior e IVA tasa 0%', tiempo: '2 a 3 semanas' },
      { fase: 'Fase 2', actividad: 'Formalización de protección de propiedad industrial', tiempo: '3 a 5 semanas' },
      { fase: 'Fase 3', actividad: 'Supervisión continua de comité de gobierno corporativo', tiempo: 'Permanente' }
    ],
    fees: {
      diagnostico: '$65,000 a $95,000 MXN + IVA',
      implementacion: '$150,000 a $400,000 MXN + IVA',
      iguala: '$25,000 a $75,000 MXN + IVA'
    }
  }
];

export function PanelDashboard() {
  const [activeSubTab, setActiveSubTab] = useState<'todo' | 'pull' | 'consultores' | 'iso' | 'compliance'>('todo');
  const [selectedComplianceModal, setSelectedComplianceModal] = useState<ComplianceResultCard | null>(null);

  return (
    <div className="space-y-10 animate-fade-in text-sans">
      
      {/* PANEL HERO BANNER */}
      <section className="relative px-4 lg:px-8 py-10 overflow-hidden border-b border-verta-slate-blue/40 metal-texture">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-verta-cyan/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-verta-coral/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-verta-cyan/20 to-verta-cobalt/20 border border-verta-cyan/40 px-3.5 py-1 rounded-full text-xs font-mono text-verta-cyan font-bold tracking-wider">
                <LayoutDashboard className="w-4 h-4 text-verta-cyan animate-pulse" />
                <span>PANEL DE CONTROL CENTRAL DE SERVICIOS Y CUMPLIMIENTO</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
                Panel Consolidado VERTA OS
              </h1>
              <p className="text-sm text-gray-300 max-w-3xl leading-relaxed">
                Explore en un solo lugar el directorio de prestadores de servicios del <span className="text-verta-cyan font-bold">Directorio Pull</span>, la red de <span className="text-verta-coral font-bold">Consultores Especializados</span>, las empresas acreditadas con <span className="text-amber-400 font-bold">Certificación ISO 9000</span> y los <span className="text-verta-emerald font-bold">Resultados Diagnósticos de Compliance Corporativo</span>.
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div 
                onClick={() => setActiveSubTab('pull')}
                className="verta-glass border-verta-cyan/30 hover:border-verta-cyan p-3.5 rounded-2xl text-center cursor-pointer transition-all hover:scale-103"
              >
                <span className="block text-[10px] font-mono text-gray-400 uppercase font-semibold">Directorio Pull</span>
                <span className="text-2xl font-black text-verta-cyan font-mono">10</span>
                <span className="block text-[9px] text-gray-400 font-mono mt-0.5">Empresas</span>
              </div>
              <div 
                onClick={() => setActiveSubTab('consultores')}
                className="verta-glass border-verta-coral/30 hover:border-verta-coral p-3.5 rounded-2xl text-center cursor-pointer transition-all hover:scale-103"
              >
                <span className="block text-[10px] font-mono text-gray-400 uppercase font-semibold">Consultores</span>
                <span className="text-2xl font-black text-verta-coral font-mono">5</span>
                <span className="block text-[9px] text-gray-400 font-mono mt-0.5">Expertos</span>
              </div>
              <div 
                onClick={() => setActiveSubTab('iso')}
                className="verta-glass border-amber-400/30 hover:border-amber-400 p-3.5 rounded-2xl text-center cursor-pointer transition-all hover:scale-103"
              >
                <span className="block text-[10px] font-mono text-gray-400 uppercase font-semibold">Certificados ISO</span>
                <span className="text-2xl font-black text-amber-400 font-mono">6</span>
                <span className="block text-[9px] text-gray-400 font-mono mt-0.5">ISO 9001:2015</span>
              </div>
              <div 
                onClick={() => setActiveSubTab('compliance')}
                className="verta-glass border-verta-emerald/30 hover:border-verta-emerald p-3.5 rounded-2xl text-center cursor-pointer transition-all hover:scale-103"
              >
                <span className="block text-[10px] font-mono text-gray-400 uppercase font-semibold">Compliance</span>
                <span className="text-2xl font-black text-verta-emerald font-mono">2</span>
                <span className="block text-[9px] text-gray-400 font-mono mt-0.5">Resultados Clave</span>
              </div>
            </div>
          </div>

          {/* INTERNAL PANEL SUB-NAVIGATION TABS */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-verta-slate-blue/30">
            {[
              { id: 'todo', label: '📊 Visión General (Panel Completo)', color: 'border-verta-cyan text-white' },
              { id: 'pull', label: '🏢 Directorio Pull de Proveedores (10)', color: 'border-verta-cyan text-white' },
              { id: 'consultores', label: '👨‍💼 Consultores & Profesionales (5)', color: 'border-verta-coral text-white' },
              { id: 'iso', label: '📜 Certificaciones ISO 9000 (6)', color: 'border-amber-400 text-white' },
              { id: 'compliance', label: '⚖️ 2 Resultados de Compliance Corporativo', color: 'border-verta-emerald text-white' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                  activeSubTab === tab.id
                    ? `bg-verta-slate-blue/80 ${tab.color} shadow-lg shadow-verta-cyan/10 font-black`
                    : 'bg-verta-navy/60 border-verta-slate-blue/40 text-gray-400 hover:text-white hover:bg-verta-slate-blue/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* SUB-SECTION 1: 2 RESULTADOS DE COMPLIANCE CORPORATIVO (MUST BE SHOWN PROMINENTLY) */}
      {(activeSubTab === 'todo' || activeSubTab === 'compliance') && (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-verta-slate-blue/40 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-verta-emerald uppercase tracking-wider">
                <Scale className="w-4 h-4 text-verta-emerald" />
                <span>EXPEDIENTES DESTACADOS DE AUDITORÍA</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-display">
                2 Resultados de Compliance Corporativo
              </h2>
              <p className="text-xs text-gray-400 max-w-xl">
                Diagnósticos ejecutivos e informe de riesgos fiscales, laborales y de estructura jurídica para toma de decisiones corporativas.
              </p>
            </div>
            
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 bg-verta-dark-blue/60 p-2 rounded-xl border border-verta-slate-blue/30">
              <CheckCircle2 className="w-4 h-4 text-verta-emerald" />
              <span>2 de 2 Auditorías Finalizadas con Sello VERTA</span>
            </div>
          </div>

          {/* 2 COMPLIANCE RESULT CARDS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {TWO_COMPLIANCE_RESULTS.map((res) => (
              <div 
                key={res.id} 
                className="verta-glass verta-glass-hover rounded-2xl p-6 border-l-4 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6"
                style={{
                  borderLeftColor: res.riskScore === 'Alto' ? '#FF7F50' : '#10b981'
                }}
              >
                {/* Background glow accent */}
                <div 
                  className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none ${
                    res.riskScore === 'Alto' ? 'bg-verta-coral/10' : 'bg-verta-emerald/10'
                  }`} 
                />

                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-verta-cyan uppercase font-bold tracking-widest">{res.sector}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-[10px] font-mono text-gray-400">{res.rfc}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white mt-1 font-sans leading-snug">{res.companyName}</h3>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">Régimen: {res.regimenActual} ({res.antiguedad})</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                        res.riskScore === 'Alto'
                          ? 'bg-verta-coral/20 border-verta-coral/40 text-verta-coral'
                          : 'bg-verta-emerald/20 border-verta-emerald/40 text-verta-emerald'
                      }`}>
                        Riesgo {res.riskScore}
                      </span>
                      <span className="block text-[10px] text-gray-400 font-mono mt-1">
                        Estatus: {res.progressScore}% Acreditado
                      </span>
                    </div>
                  </div>

                  {/* Resumen Ejecutivo */}
                  <div className="p-4 rounded-xl bg-verta-navy/50 border border-verta-slate-blue/40 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">Resumen Ejecutivo de Auditoría</span>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">{res.executiveSummary}</p>
                  </div>

                  {/* Situación Laboral & Objetivo Comercial */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-verta-dark-blue/60 rounded-xl border border-verta-slate-blue/30 space-y-1">
                      <span className="text-[10px] font-mono text-verta-coral font-bold uppercase block">Situación Laboral / IMSS</span>
                      <p className="text-gray-300 text-[11px] leading-tight font-sans">{res.situacionLaboral}</p>
                    </div>
                    <div className="p-3 bg-verta-dark-blue/60 rounded-xl border border-verta-slate-blue/30 space-y-1">
                      <span className="text-[10px] font-mono text-verta-cyan font-bold uppercase block">Objetivo Comercial</span>
                      <p className="text-gray-300 text-[11px] leading-tight font-sans">{res.objetivoComercial}</p>
                    </div>
                  </div>

                  {/* Matriz de Riesgos Badges */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-bold">Matriz de Evaluación de Riesgo</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {res.risksMatrix.map((m, idx) => (
                        <div key={idx} className="p-2 bg-verta-navy/60 border border-verta-slate-blue/30 rounded-lg text-center">
                          <span className="text-[9px] font-mono text-gray-400 block">{m.area}</span>
                          <span className={`text-xs font-mono font-bold block mt-0.5 ${
                            m.level === 'Crítico' ? 'text-verta-rose animate-pulse' :
                            m.level === 'Alto' ? 'text-verta-coral' : 'text-verta-emerald'
                          }`}>
                            {m.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recomendación Estructural Legal */}
                  <div className="p-3.5 bg-verta-slate-blue/20 rounded-xl border border-verta-cyan/20 space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-verta-cyan">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Recomendación del Consejo Legal: {res.recomendacionLegalOption}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">{res.recomendacionLegalReason}</p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2 border-t border-verta-slate-blue/30 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-gray-400">
                    <span>Honorarios Diagnóstico: <strong>{res.fees.diagnostico}</strong></span>
                  </div>
                  <button
                    onClick={() => setSelectedComplianceModal(res)}
                    className="px-4 py-2 bg-verta-cyan/20 hover:bg-verta-cyan text-verta-cyan hover:text-verta-navy border border-verta-cyan/40 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>Ver Expediente Completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </section>
      )}

      {/* SUB-SECTION 2: DIRECTORIO PULL DE PROVEEDORES */}
      {(activeSubTab === 'todo' || activeSubTab === 'pull') && (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4 pt-4 border-t border-verta-slate-blue/30">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-verta-cyan uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-verta-cyan" />
              <span>CATÁLOGO PÚBLICO "PULL"</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-display">
              Listado de Servicios de Proveedores (Directorio Pull)
            </h2>
            <p className="text-xs text-gray-400 max-w-xl">
              Consulte la documentación y scores de las 10 empresas proveedoras acreditadas en el sistema.
            </p>
          </div>

          <PullDirectory />
        </section>
      )}

      {/* SUB-SECTION 3: CONSULTORES Y PROFESIONALES */}
      {(activeSubTab === 'todo' || activeSubTab === 'consultores') && (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4 pt-8 border-t border-verta-slate-blue/30">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-verta-coral uppercase tracking-wider">
              <Users className="w-4 h-4 text-verta-coral" />
              <span>DIRECTORIO DE ESPECIALISTAS Y ASESORES</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-display">
              Consultores y Profesionales Acreditados
            </h2>
            <p className="text-xs text-gray-400 max-w-xl">
              Especialistas en fiscal, laboral, REPSE, ciberseguridad e ISO listos para servicios y facturación directa.
            </p>
          </div>

          <ConsultantsDirectory />
        </section>
      )}

      {/* SUB-SECTION 4: CERTIFICACIONES ISO 9000 */}
      {(activeSubTab === 'todo' || activeSubTab === 'iso') && (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4 pt-8 border-t border-verta-slate-blue/30">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              <span>ACREDITADOS ISO 9001:2015 / QMS</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-display">
              Certificaciones ISO 9000
            </h2>
            <p className="text-xs text-gray-400 max-w-xl">
              Registro oficial de organismos certificadores (SGS, TÜV, Bureau Veritas) y códigos de certificados globales.
            </p>
          </div>

          <IsoDirectory />
        </section>
      )}

      {/* MODAL EXPEDIENTE RESULTADO COMPLIANCE DETALLADO */}
      {selectedComplianceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div 
            className="w-full max-w-3xl verta-glass border border-verta-cyan/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-verta-slate-blue/40 bg-verta-dark-blue/90">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-verta-cyan uppercase">{selectedComplianceModal.sector}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-xs font-mono text-gray-400">RFC: {selectedComplianceModal.rfc}</span>
                </div>
                <h3 className="font-extrabold text-xl text-white font-sans">{selectedComplianceModal.companyName}</h3>
              </div>
              <button 
                onClick={() => setSelectedComplianceModal(null)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-verta-slate-blue/40 rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar text-xs">
              
              {/* Resumen Ejecutivo Ampliado */}
              <div className="p-4 bg-verta-navy/60 border border-verta-slate-blue/40 rounded-2xl space-y-2">
                <h4 className="text-xs font-mono font-bold text-verta-cyan uppercase tracking-wider">Dictamen Ejecutivo del Consejo de Compliance</h4>
                <p className="text-sm text-gray-200 leading-relaxed">{selectedComplianceModal.executiveSummary}</p>
                <div className="pt-2 flex justify-between text-[11px] font-mono text-gray-400 border-t border-verta-slate-blue/30">
                  <span>Antigüedad: {selectedComplianceModal.antiguedad}</span>
                  <span>Régimen Fiscal Actual: {selectedComplianceModal.regimenActual}</span>
                </div>
              </div>

              {/* Matriz Completa de Riesgos */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">MATRIZ DETALLADA DE RIESGOS DEDUCIBLES & FISCALES</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedComplianceModal.risksMatrix.map((r, i) => (
                    <div key={i} className="p-3 bg-verta-dark-blue/80 border border-verta-slate-blue/30 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{r.area}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          r.level === 'Crítico' ? 'bg-verta-rose/20 text-verta-rose border border-verta-rose/40' :
                          r.level === 'Alto' ? 'bg-verta-coral/20 text-verta-coral border border-verta-coral/40' :
                          'bg-verta-emerald/20 text-verta-emerald border border-verta-emerald/40'
                        }`}>
                          Riesgo {r.level}
                        </span>
                      </div>
                      <p className="text-gray-300 text-[11px] leading-relaxed">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recomendación legal y corporativa */}
              <div className="p-4 bg-verta-slate-blue/20 border border-verta-cyan/30 rounded-2xl space-y-2">
                <h4 className="text-xs font-mono font-bold text-verta-cyan uppercase tracking-wider">Estructura Corporativa Recomendada</h4>
                <p className="font-bold text-white text-sm">{selectedComplianceModal.recomendacionLegalOption}</p>
                <p className="text-gray-300 text-xs leading-relaxed">{selectedComplianceModal.recomendacionLegalReason}</p>
              </div>

              {/* Estrategia por Fases */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">HOJA DE RUTA Y ESTRATEGIA DE REGULARIZACIÓN</h4>
                <div className="space-y-2">
                  {selectedComplianceModal.proposedStrategy.map((st, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-verta-navy/40 border border-verta-slate-blue/20 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <span className="px-2 py-1 bg-verta-cyan/10 border border-verta-cyan/30 text-verta-cyan font-mono font-bold text-[10px] rounded">
                          {st.fase}
                        </span>
                        <span className="font-bold text-white text-xs">{st.actividad}</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">{st.tiempo}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cotización de Honorarios */}
              <div className="p-4 bg-gradient-to-r from-verta-navy to-verta-dark-blue border border-verta-slate-blue/50 rounded-2xl space-y-2">
                <h4 className="text-xs font-mono font-bold text-verta-coral uppercase tracking-wider">Presupuesto Estimado de Implementación</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-2.5 bg-verta-navy/80 rounded-xl border border-verta-slate-blue/30 text-center">
                    <span className="text-[10px] font-mono text-gray-400 block">Diagnóstico Inicial</span>
                    <span className="text-xs font-bold text-white font-mono">{selectedComplianceModal.fees.diagnostico}</span>
                  </div>
                  <div className="p-2.5 bg-verta-navy/80 rounded-xl border border-verta-slate-blue/30 text-center">
                    <span className="text-[10px] font-mono text-gray-400 block">Implementación Legal</span>
                    <span className="text-xs font-bold text-verta-cyan font-mono">{selectedComplianceModal.fees.implementacion}</span>
                  </div>
                  <div className="p-2.5 bg-verta-navy/80 rounded-xl border border-verta-slate-blue/30 text-center">
                    <span className="text-[10px] font-mono text-gray-400 block">Iguala Mensual</span>
                    <span className="text-xs font-bold text-verta-emerald font-mono">{selectedComplianceModal.fees.iguala}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-verta-navy/90 border-t border-verta-slate-blue/40 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-mono">Sello de Diagnóstico VERTA OS v2.4</span>
              <button
                onClick={() => setSelectedComplianceModal(null)}
                className="px-4 py-2 bg-verta-slate-blue/60 text-white rounded-xl font-mono font-bold hover:bg-verta-slate-blue cursor-pointer transition-all"
              >
                Cerrar Expediente
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
