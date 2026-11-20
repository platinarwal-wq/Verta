/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  FileCheck2, 
  ArrowRight, 
  Activity, 
  Coins, 
  Layers, 
  Scale, 
  Upload, 
  CheckCircle, 
  ChevronRight, 
  Sparkles,
  RefreshCw,
  Clock,
  Printer,
  TrendingUp,
  Briefcase,
  Users,
  Building2,
  Lock,
  Download,
  AlertCircle
} from 'lucide-react';

interface ClientProfileData {
  companyName: string;
  rfc: string;
  regimenActual: string;
  antiguedad: number;
  situacionLaboral: 'sin_empleados' | 'correctos' | 'no_registrados' | 'subcontratacion_riesgo';
  objetivoComercial: string;
  ingresosAnuales: string;
  sociosCount: number;
  reinversionPlan: 'alta' | 'media' | 'baja';
  crecimientoProyectado: 'alto' | 'moderado' | 'estable';
}

interface DocumentChecklistItem {
  id: string;
  category: 'fiscal' | 'financiera' | 'laboral' | 'legal';
  name: string;
  status: 'Pendiente' | 'Cargado' | 'No Aplica';
  fileName?: string;
  loadedAt?: string;
}

const INITIAL_CHECKLIST: DocumentChecklistItem[] = [
  // Fiscal (Hoja 2)
  { id: 'fisc_1', category: 'fiscal', name: 'Constancia de situación fiscal', status: 'Pendiente' },
  { id: 'fisc_2', category: 'fiscal', name: 'Opinión positiva SAT (Art. 32-D)', status: 'Pendiente' },
  { id: 'fisc_3', category: 'fiscal', name: 'Declaraciones anuales últimos 5 ejercicios', status: 'Pendiente' },
  { id: 'fisc_4', category: 'fiscal', name: 'Declaraciones mensuales del año en curso', status: 'Pendiente' },
  { id: 'fisc_5', category: 'fiscal', name: 'CFDI emitidos y recibidos (XML/PDF)', status: 'Pendiente' },
  { id: 'fisc_6', category: 'fiscal', name: 'Papeles de trabajo fiscales integrados', status: 'Pendiente' },
  { id: 'fisc_7', category: 'fiscal', name: 'Relación de clientes principales', status: 'Pendiente' },
  { id: 'fisc_8', category: 'fiscal', name: 'Relación de proveedores clave', status: 'Pendiente' },
  { id: 'fisc_9', category: 'fiscal', name: 'Requerimientos SAT previos recibidos', status: 'Pendiente' },
  { id: 'fisc_10', category: 'fiscal', name: 'Créditos fiscales o adeudos registrados', status: 'Pendiente' },
  // Financiera (Hoja 2)
  { id: 'fin_1', category: 'financiera', name: 'Estados financieros auditados últimos 3 ejercicios', status: 'Pendiente' },
  { id: 'fin_2', category: 'financiera', name: 'Estado de resultados mensual detallado', status: 'Pendiente' },
  { id: 'fin_3', category: 'financiera', name: 'Estado de Flujo de efectivo actual', status: 'Pendiente' },
  { id: 'fin_4', category: 'financiera', name: 'Catálogo de Inventarios de materia prima/producto', status: 'No Aplica' },
  { id: 'fin_5', category: 'financiera', name: 'Relación analítica de Activos fijos', status: 'Pendiente' },
  { id: 'fin_6', category: 'financiera', name: 'Endeudamiento bancario y pasivos vigentes', status: 'Pendiente' },
  { id: 'fin_7', category: 'financiera', name: 'Reporte del Margen operativo de utilidades', status: 'Pendiente' },
  { id: 'fin_8', category: 'financiera', name: 'Proyección de crecimiento financiero a 5 años', status: 'Pendiente' },
  // Laboral (Hoja 2)
  { id: 'lab_1', category: 'laboral', name: 'Número real de trabajadores activos', status: 'Pendiente' },
  { id: 'lab_2', category: 'laboral', name: 'Número registrado formalmente ante el IMSS', status: 'Pendiente' },
  { id: 'lab_3', category: 'laboral', name: 'Contratos laborales individuales o colectivos', status: 'Pendiente' },
  { id: 'lab_4', category: 'laboral', name: 'Evidencia de nómina bancaria de salarios', status: 'Pendiente' },
  { id: 'lab_5', category: 'laboral', name: 'Auditoría interna: Salarios reales vs registrados', status: 'Pendiente' },
  { id: 'lab_6', category: 'laboral', name: 'Prestaciones otorgadas extralegales', status: 'Pendiente' },
  { id: 'lab_7', category: 'laboral', name: 'Riesgos o historial de demandas laborales activos', status: 'Pendiente' },
  // Legal / Corporativa (Hoja 2)
  { id: 'leg_1', category: 'legal', name: 'Contratos con clientes de gran escala', status: 'Pendiente' },
  { id: 'leg_2', category: 'legal', name: 'Contratos bilaterales con proveedores clave', status: 'Pendiente' },
  { id: 'leg_3', category: 'legal', name: 'Marcas registradas ante el IMPI', status: 'Pendiente' },
  { id: 'leg_4', category: 'legal', name: 'Permisos, licencias corporativas y uso de suelo', status: 'Pendiente' },
  { id: 'leg_5', category: 'legal', name: 'Litigios existentes o controversias vigentes', status: 'Pendiente' },
  { id: 'leg_6', category: 'legal', name: 'Seguros de responsabilidad civil y activos', status: 'Pendiente' },
  { id: 'leg_7', category: 'legal', name: 'Propiedad de activos inmuebles e intelectuales', status: 'Pendiente' },
];

export function ComplianceCorporativo() {
  const [activeSubTab, setActiveSubTab] = useState<'formulario' | 'diagnostico' | 'honorarios'>('formulario');
  
  // Client profile form states
  const [profile, setProfile] = useState<ClientProfileData>({
    companyName: 'Bebidas y Alimentos del Bajío S.A.',
    rfc: 'BAB-960418-L82',
    regimenActual: 'Persona Física con Actividad Empresarial',
    antiguedad: 28,
    situacionLaboral: 'no_registrados',
    objetivoComercial: 'Convertirse en proveedor directo de grandes corporativos (Bimbo, Lala, etc.)',
    ingresosAnuales: 'de_10_a_50_mdp',
    sociosCount: 3,
    reinversionPlan: 'alta',
    crecimientoProyectado: 'alto'
  });

  const [checklist, setChecklist] = useState<DocumentChecklistItem[]>(INITIAL_CHECKLIST);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [customTerm, setCustomTerm] = useState('');
  const [isDiagnosticGenerated, setIsDiagnosticGenerated] = useState(true);

  // Stats
  const checklistStats = useMemo(() => {
    const total = checklist.length;
    const cargado = checklist.filter(d => d.status === 'Cargado').length;
    const pendiente = checklist.filter(d => d.status === 'Pendiente').length;
    const noAplica = checklist.filter(d => d.status === 'No Aplica').length;
    const progress = Math.round((cargado / (total - noAplica)) * 100) || 0;
    return { total, cargado, pendiente, noAplica, progress };
  }, [checklist]);

  // Handle document upload simulator
  const handleUploadClick = (id: string) => {
    const randomNames = [
      'Constancia_SAT_Oficial.pdf', 'Opinion32D_Positiva_Firmada.pdf', 
      'DeclaracionAnual_2025_Acuse.pdf', 'CFDI_Completo_Xml.zip', 
      'ContratoArrendamiento_Constitutivo.pdf', 'ContratoIndividual_Plantilla.pdf',
      'Registro_IMPI_Clase42.pdf', 'BalanzasComprobacion_2025.xlsx'
    ];
    const pickedName = randomNames[Math.floor(Math.random() * randomNames.length)];
    
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'Cargado',
          fileName: pickedName,
          loadedAt: new Date().toLocaleDateString('es-MX')
        };
      }
      return item;
    }));

    setShowNotification(`Documento "${pickedName}" cargado en el expediente correctamente.`);
    setTimeout(() => setShowNotification(null), 3000);
  };

  // Toggle other status types manually (Pendiente -> No Aplica -> Pendiente)
  const handleToggleStatus = (id: string) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Pendiente' ? 'No Aplica' : 'Pendiente';
        return { ...item, status: nextStatus, fileName: undefined, loadedAt: undefined };
      }
      return item;
    }));
  };

  // Reset checklist
  const handleResetChecklist = () => {
    setChecklist(prev => prev.map(item => ({
      ...item,
      status: item.id === 'fin_4' ? 'No Aplica' : 'Pendiente',
      fileName: undefined,
      loadedAt: undefined
    })));
    setShowNotification('Se ha restablecido la lista de información requerida.');
    setTimeout(() => setShowNotification(null), 3000);
  };

  // Dynamic Risk Evaluation based on answers
  const evaluatedRisks = useMemo(() => {
    const isPila = profile.regimenActual.includes('Persona Física');
    const hasUnregisteredLab = profile.situacionLaboral === 'no_registrados' || profile.situacionLaboral === 'subcontratacion_riesgo';
    
    // Risks (Hoja 3)
    const isrLevel = isPila ? 'Alto' : 'Medio';
    const isrDesc = isPila 
      ? 'Posible carga fiscal elevada como Persona Física (tasa de ISR de hasta el 35% sin deducciones corporativas).' 
      : 'Estructura deducible regulada, margen de planeación corporativo estándar.';

    const ivaLevel = checklistStats.progress < 30 ? 'Medio' : 'Bajo';
    const ivaDesc = checklistStats.progress < 30 
      ? 'Riesgo documental por falta de conciliación de CFDIs emitidos y recibidos (materialidad).' 
      : 'Cumplimiento regular sustentado en la integración de archivos XML auditados.';

    const nominaLevel = hasUnregisteredLab ? 'Alto' : 'Bajo';
    const nominaDesc = hasUnregisteredLab 
      ? 'Diferencias entre la operación real (nómina de factor efectivo) y lo reportado al fisco.' 
      : 'Conciliación alineada con las declaraciones informativas de salarios.';

    const imssLevel = profile.situacionLaboral === 'no_registrados' 
      ? 'Crítico' 
      : profile.situacionLaboral === 'subcontratacion_riesgo' ? 'Alto' : 'Bajo';
    const imssDesc = profile.situacionLaboral === 'no_registrados'
      ? 'Trabajadores detectados no registrados o con salarios subdeclarados. Peligro de capital constitutivo.'
      : profile.situacionLaboral === 'subcontratacion_riesgo'
        ? 'Proveedores de outsourcing sin REPSE vigente expone a la empresa a responsabilidad solidaria.'
        : 'Alta de personal en el IMSS coincide con el padrón del centro de trabajo.';

    const patrimonialLevel = isPila ? 'Alto' : 'Bajo';
    const patrimonialDesc = isPila 
      ? 'Carencia de separación patrimonial. Sus bienes personales (casa, cuentas) garantizan contingencias comerciales o fiscales.' 
      : 'Responsabilidad limitada al monto de las acciones suscritas en la Persona Moral.';

    const complianceLevel = profile.objetivoComercial.includes('proveedor') ? 'Alto' : 'Medio';
    const complianceDesc = profile.objetivoComercial.includes('proveedor')
      ? 'Riesgo inminente de rechazo en auditorías de grandes clientes por falta de un gobierno corporativo robusto.'
      : 'Estándares aplicados a operaciones generales sin la presión de supervisión estricta de terceros.';

    return {
      isr: { level: isrLevel, desc: isrDesc },
      iva: { level: ivaLevel, desc: ivaDesc },
      nomina: { level: nominaLevel, desc: nominaDesc },
      imss: { level: imssLevel, desc: imssDesc },
      patrimonial: { level: patrimonialLevel, desc: patrimonialDesc },
      compliance: { level: complianceLevel, desc: complianceDesc },
      contabilidad: { level: 'Medio', desc: 'Sistemas contables básicos con posible debilidad de controles cruzados o manuales.' }
    };
  }, [profile, checklistStats]);

  // Recommended Legal Entity Opinion (Hoja 4)
  const legalEntityRecommendation = useMemo(() => {
    const isGrowthHigh = profile.crecimientoProyectado === 'alto';
    const isSociosHigh = profile.sociosCount > 2;

    if (isGrowthHigh && isSociosHigh) {
      return {
        option: 'SAPI de CV (Sociedad Anónima Promotora de Inversión)',
        reason: 'Altamente recomendable debido a sus planes de alto crecimiento, incorporación de socios y necesidad de esquemas flexibles de gobernanza, entrada de capital externo y atracción de inversiones corporativas.',
        advantages: 'Mayor institucionalización, flexibilidad en derechos corporativos, protección calificada a minorías y facilidad para emitir acciones seriadas especiales.',
        disadvantages: 'Mayor formalidad contable, costos iniciales de constitución y necesidad de órganos consultivos vigilados por comisarios públicos.'
      };
    } else if (isSociosHigh) {
      return {
        option: 'SA de CV (Sociedad Anónima de Capital Variable)',
        reason: 'Es la estructura mercantil más tradicional y aceptada por corporaciones del país. Ideal para simplificar el proceso bajo la óptica de proveedores de grupos como Bimbo o Lala.',
        advantages: 'Estructura robusta, facilidad de cesión de acciones mediante libro de registro oficial, acreditación reputacional inmediata con instituciones bancarias.',
        disadvantages: 'Menor flexibilidad para pactar cláusulas de salida complejas en comparación con la SAPI.'
      };
    } else {
      return {
        option: 'SRL de CV (Sociedad de Responsabilidad Limitada)',
        reason: 'Esquema ideal para operaciones de control cerrado de corte familiar o de pocos socios donde el ingreso de capital es paulatino.',
        advantages: 'Simplicidad administrativa, limitaciones automáticas al ingreso de terceros ajenos a la estructura original, blindaje patrimonial seguro.',
        disadvantages: 'La transmisión de partes sociales requiere aprobación unánime de la asamblea jurídica regulada.'
      };
    }
  }, [profile]);

  // Fees computation based on company scale
  const quotedFees = useMemo(() => {
    let multiplier = 1.0;
    if (profile.ingresosAnuales === 'de_10_a_50_mdp') multiplier = 1.25;
    if (profile.ingresosAnuales === 'mas_de_50_mdp') multiplier = 1.6;

    return {
      diagnostico: {
        min: Math.round(45000 * multiplier),
        max: Math.round(85000 * multiplier),
        time: '2 a 4 semanas'
      },
      implementacion: {
        min: Math.round(120000 * multiplier),
        max: Math.round(350000 * multiplier),
        time: '4 a 8 semanas'
      },
      iguala: {
        min: Math.round(18000 * multiplier),
        max: Math.round(60000 * multiplier),
        time: '3 a 6 semanas (Inicial)'
      }
    };
  }, [profile]);

  return (
    <div className="space-y-10 animate-fade-in text-sans text-white">
      
      {/* COMPLIANCE HERO HEADER */}
      <section className="relative px-4 lg:px-8 py-10 overflow-hidden border-b border-verta-slate-blue/30 metal-texture">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-verta-coral/5 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-verta-cyan/5 rounded-full blur-[110px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-verta-coral/15 to-amber-500/15 border border-verta-coral/30 px-3 py-1 rounded-full text-xs font-mono text-verta-coral">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DIAGNÓSTICO E INTEGRACIÓN DE CLIENTES</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
              Diagnóstico Integral y Compliance Corporativo
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
              Consulte directrices, evalúe el grado de riesgo normativo (SAT, IMSS, Legal) y recopile de manera segura el expediente de cumplimiento. Genere análisis de opinión para la transición a personas morales basados en el formato ejecutivo formal de VERTA.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="verta-glass border-verta-slate-blue/50 p-4 rounded-xl text-center min-w-[140px]">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Expediente Completo</span>
              <span className={`text-2xl font-black font-mono transition-colors ${checklistStats.progress === 100 ? 'text-verta-emerald' : 'text-verta-cyan'}`}>
                {checklistStats.progress}%
              </span>
              <span className="block text-[9px] text-gray-500 font-mono mt-1">
                {checklistStats.cargado} DE {checklistStats.total - checklistStats.noAplica} ARCHIVOS
              </span>
            </div>

            <div className="verta-glass border-verta-slate-blue/50 p-4 rounded-xl text-center min-w-[140px]">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Nivel de Riesgo</span>
              <span className="text-lg font-black text-verta-coral font-mono mt-2 block">
                {profile.regimenActual.includes('Persona Física') ? 'CRÍTICO / ALTO' : 'MODERADO'}
              </span>
              <span className="block text-[9px] text-gray-500 font-mono mt-1">EVALUACIÓN AUTOMÁTICA</span>
            </div>
          </div>
        </div>
      </section>

      {/* INNER NAVIGATION CONTROLS */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap border-b border-verta-slate-blue/40 scrollbar whitespace-nowrap">
          <button
            onClick={() => setActiveSubTab('formulario')}
            className={`py-3.5 px-6 text-sm font-bold border-b-2 tracking-wide transition-all flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'formulario'
                ? 'border-verta-coral text-white bg-verta-coral/5'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-verta-slate-blue/20'
            }`}
          >
            <Layers className="w-4 h-4 text-verta-coral" />
            <span>1. Perfil del Cliente & Expediente de Entrada</span>
          </button>
          
          <button
            onClick={() => {
              setActiveSubTab('diagnostico');
              setIsDiagnosticGenerated(true);
            }}
            className={`py-3.5 px-6 text-sm font-bold border-b-2 tracking-wide transition-all flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'diagnostico'
                ? 'border-verta-cyan text-white bg-verta-cyan/5'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-verta-slate-blue/20'
            }`}
          >
            <Activity className="w-4 h-4 text-verta-cyan animate-pulse" />
            <span>2. Diagnóstico Proyectivo SAT & IMSS</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab('honorarios');
            }}
            className={`py-3.5 px-6 text-sm font-bold border-b-2 tracking-wide transition-all flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'honorarios'
                ? 'border-amber-400 text-white bg-amber-400/5'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-verta-slate-blue/20'
            }`}
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span>3. Propuesta de Honorarios Corporativos</span>
          </button>
        </div>
      </div>

      {/* STATS NOTIFICATION TOAST */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 verta-glass border-l-4 border-verta-emerald p-4 rounded-xl shadow-2xl flex items-center space-x-3 text-sm z-50 animate-slide-in max-w-sm">
          <CheckCircle className="w-5 h-5 text-verta-emerald shrink-0" />
          <span className="text-gray-300 font-sans">{showNotification}</span>
        </div>
      )}

      {/* CONTENT PAGES BASED ON TAB */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        
        {/* SUBTAB 1: CLIENT FORM & CHECKLIST DOCK */}
        {activeSubTab === 'formulario' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COMPONENT COLUMN: QUESTIONNAIRE */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="verta-glass border-verta-slate-blue/40 rounded-2xl p-6 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-verta-coral/5 rounded-full blur-2xl" />
                
                <div className="border-b border-verta-slate-blue/30 pb-4">
                  <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                    <Building2 className="w-4.5 h-4.5 text-verta-coral" />
                    <span>Datos Iniciales del Negocio</span>
                  </h3>
                  <p className="text-xs text-gray-400">Puntualice la situación bajo la cual opera actualmente el cliente.</p>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  
                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-mono block">Razón Social o Nombre Comercial</label>
                    <input
                      type="text"
                      value={profile.companyName}
                      onChange={(e) => setProfile(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 focus:border-verta-coral focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white"
                      placeholder="Ingrese el nombre de la empresa"
                    />
                  </div>

                  {/* RFC */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-mono block">RFC Registrado (Opcional)</label>
                    <input
                      type="text"
                      value={profile.rfc}
                      onChange={(e) => setProfile(prev => ({ ...prev, rfc: e.target.value.toUpperCase() }))}
                      className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 focus:border-verta-coral focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                      placeholder="RFC de 12 o 13 dígitos"
                    />
                  </div>

                  {/* Regime Actual */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-mono block">Régimen Fiscal Actual (SAT)</label>
                    <select
                      value={profile.regimenActual}
                      onChange={(e) => setProfile(prev => ({ ...prev, regimenActual: e.target.value }))}
                      className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 focus:border-verta-coral focus:outline-none rounded-xl px-3 py-2.5 text-xs cursor-pointer select-none"
                    >
                      <option className="bg-verta-navy" value="Persona Física con Actividad Empresarial">Persona Física con Actividad Empresarial (Régimen General)</option>
                      <option className="bg-verta-navy" value="Persona Física con Actividad Profesional">Persona Física con Actividad Profesional (Honorarios)</option>
                      <option className="bg-verta-navy" value="RESICO (Régimen Simplificado de Confianza)">RESICO (Simplificado de Confianza)</option>
                      <option className="bg-verta-navy" value="Régimen de Incorporación Fiscal (RIF)">Régimen de Incorporación Fiscal (RIF)</option>
                      <option className="bg-verta-navy" value="Persona Moral S.A. de C.V.">Persona Moral S.A. de C.V. (Régimen General)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Antigüedad */}
                    <div className="space-y-1.5">
                      <label className="text-gray-400 font-mono block">Antigüedad (Años)</label>
                      <input
                        type="number"
                        min="0"
                        value={profile.antiguedad}
                        onChange={(e) => setProfile(prev => ({ ...prev, antiguedad: parseInt(e.target.value) || 0 }))}
                        className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 focus:border-verta-coral focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                      />
                    </div>

                    {/* Número de Socios */}
                    <div className="space-y-1.5">
                      <label className="text-gray-400 font-mono block">Número de Socios</label>
                      <input
                        type="number"
                        min="1"
                        value={profile.sociosCount}
                        onChange={(e) => setProfile(prev => ({ ...prev, sociosCount: parseInt(e.target.value) || 1 }))}
                        className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 focus:border-verta-coral focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  {/* Situación Laboral */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-mono block">Situación Laboral Detectada</label>
                    <select
                      value={profile.situacionLaboral}
                      onChange={(e) => setProfile(prev => ({ ...prev, situacionLaboral: e.target.value as any }))}
                      className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 focus:border-verta-coral focus:outline-none rounded-xl px-3 py-2.5 text-xs cursor-pointer"
                    >
                      <option className="bg-verta-navy" value="correctos">Todos los trabajadores registrados formalmente con salario base real ante IMSS</option>
                      <option className="bg-verta-navy" value="no_registrados">Existen trabajadores no registrados completamente ante IMSS / Nómina informal</option>
                      <option className="bg-verta-navy" value="subcontratacion_riesgo">Subcontratación de servicios especializados con proveedores sin REPSE</option>
                      <option className="bg-verta-navy" value="sin_empleados">No se tienen trabajadores contratados actualmente</option>
                    </select>
                  </div>

                  {/* Objetivo Comercial */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-mono block">Objetivo Comercial Primario</label>
                    <input
                      type="text"
                      value={profile.objetivoComercial}
                      onChange={(e) => setProfile(prev => ({ ...prev, objetivoComercial: e.target.value }))}
                      className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 focus:border-verta-coral focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white"
                      placeholder="Ej. Convertirse en proveedor de grandes corporativos"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Crecimiento Proyectado */}
                    <div className="space-y-1.5">
                      <label className="text-gray-400 font-mono block">Crecimiento Proyectado</label>
                      <select
                        value={profile.crecimientoProyectado}
                        onChange={(e) => setProfile(prev => ({ ...prev, crecimientoProyectado: e.target.value as any }))}
                        className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 focus:border-verta-coral rounded-xl px-2.5 py-2.5 text-xs cursor-pointer"
                      >
                        <option className="bg-verta-navy" value="alto">Alto (Escalamiento rápido)</option>
                        <option className="bg-verta-navy" value="moderado">Moderado o Estable</option>
                      </select>
                    </div>

                    {/* Ingresos Estimados */}
                    <div className="space-y-1.5">
                      <label className="text-gray-400 font-mono block">Ingresos Anuales (Rango)</label>
                      <select
                        value={profile.ingresosAnuales}
                        onChange={(e) => setProfile(prev => ({ ...prev, ingresosAnuales: e.target.value }))}
                        className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 focus:border-verta-coral rounded-xl px-2.5 py-2.5 text-xs cursor-pointer"
                      >
                        <option className="bg-verta-navy" value="menos_de_10_mdp">Menor a $10 MDP MXN</option>
                        <option className="bg-verta-navy" value="de_10_a_50_mdp">$10 MDP a $50 MDP MXN</option>
                        <option className="bg-verta-navy" value="mas_de_50_mdp">Superior a $50 MDP MXN</option>
                      </select>
                    </div>
                  </div>

                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsDiagnosticGenerated(true);
                      setActiveSubTab('diagnostico');
                      setShowNotification('Diagnóstico integral calculado en base al Formato Excel de Compliance.');
                      setTimeout(() => setShowNotification(null), 3000);
                    }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-verta-coral to-amber-500 font-mono text-xs font-bold text-white rounded-xl hover:shadow-[0_4px_15px_rgba(255,127,80,0.3)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Calcular Diagnóstico Preliminar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Informative alert card */}
              <div className="border border-yellow-500/20 bg-yellow-500/5 p-4 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-gray-300">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white block font-semibold mb-1">Régimen y Blindaje Patrimonial</strong>
                  Al operar como Persona Física con Actividad Empresarial con <strong>{profile.antiguedad} años de antigüedad</strong> y nómina no registrada, el riesgo de embargos directos contra patrimonio familiar es <strong>Extremadamente Alto</strong>.
                </p>
              </div>

            </div>

            {/* RIGHT COMPONENT COLUMN: EXPEDIENTE DIGITAL CHECKLIST (HOJA 2) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="verta-glass border-verta-slate-blue/40 rounded-2xl p-6 space-y-4">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-verta-slate-blue/30 pb-4 gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                      <FileCheck2 className="w-5 h-5 text-verta-cyan" />
                      <span>Hoja 2: Información Adicional Requerida</span>
                    </h3>
                    <p className="text-xs text-gray-400">Marque el estatus de entrega o simule la carga de los soportes.</p>
                  </div>

                  <button
                    onClick={handleResetChecklist}
                    className="px-3 py-1.5 bg-verta-slate-blue/45 hover:bg-verta-slate-blue border border-verta-slate-blue/60 text-gray-300 rounded-lg text-[10px] font-mono cursor-pointer transition-all"
                  >
                    Reestablecer Pendientes
                  </button>
                </div>

                {/* Progress bar info */}
                <div className="bg-verta-navy/55 border border-verta-slate-blue/20 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Progreso de Integración de Expediente:</span>
                    <span className="text-verta-cyan font-bold">{checklistStats.progress}% ({checklistStats.cargado} cargados)</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-verta-cyan to-verta-cobalt h-full rounded-full transition-all duration-500"
                      style={{ width: `${checklistStats.progress}%` }}
                    />
                  </div>
                </div>

                {/* Category selectors list */}
                {['fiscal', 'financiera', 'laboral', 'legal'].map((cat) => {
                  const items = checklist.filter(d => d.category === cat);
                  const catLabels: Record<string, string> = {
                    fiscal: '📂 2.1 Requisitos Fiscales (SAT)',
                    financiera: '💸 2.2 Requisitos Financieros (Estados Fin.)',
                    laboral: '👥 2.3 Requisitos Laborales (IMSS/LFT)',
                    legal: '⚖️ 2.4 Requisitos Legales / Corporativos'
                  };

                  return (
                    <div key={cat} className="space-y-2 pt-2">
                      <h4 className="text-xs font-mono font-bold text-gray-400 border-b border-verta-slate-blue/20 pb-1 uppercase tracking-wider">
                        {catLabels[cat]}
                      </h4>

                      <div className="grid grid-cols-1 gap-2">
                        {items.map((item) => (
                          <div 
                            key={item.id}
                            className="bg-verta-navy/35 border border-verta-slate-blue/20 hover:border-verta-cyan/20 transition-all rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                          >
                            <div className="space-y-1 min-w-0 flex-1">
                              <p className="font-semibold text-white truncate pr-2">{item.name}</p>
                              {item.fileName ? (
                                <span className="text-[10px] font-mono text-verta-emerald block truncate">
                                  📄 {item.fileName} • {item.loadedAt}
                                </span>
                              ) : (
                                <span className="text-[10px] text-gray-500 block font-mono">
                                  {item.status === 'No Aplica' ? 'Excluido para este perfil' : 'Falta integrar'}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                              
                              {/* Status Badge Toggle Button */}
                              <button
                                onClick={() => handleToggleStatus(item.id)}
                                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                  item.status === 'Cargado' 
                                    ? 'bg-verta-emerald/20 text-verta-emerald border border-verta-emerald/30' 
                                    : item.status === 'No Aplica'
                                      ? 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/25'
                                }`}
                              >
                                {item.status}
                              </button>

                              {/* Simulator Upload Button */}
                              {item.status !== 'No Aplica' && (
                                <button
                                  onClick={() => handleUploadClick(item.id)}
                                  className="p-1 px-2.5 bg-verta-slate-blue/40 border border-verta-slate-blue text-gray-300 hover:text-white hover:border-verta-cyan/40 rounded transition-all flex items-center space-x-1 cursor-pointer"
                                  title="Subir archivo simulado"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span className="text-[10px]">Cargar</span>
                                </button>
                              )}

                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        )}

        {/* SUBTAB 2: DYNAMIC CALCULATED DIAGNOSTIC (HOJAS 3 A 6) */}
        {activeSubTab === 'diagnostico' && (
          <div className="space-y-8">
            
            {/* INCOMPLETE WARNING BAR */}
            {checklistStats.progress < 100 && (
              <div className="bg-gradient-to-r from-verta-cyan/10 to-verta-coral/10 border border-verta-cyan/35 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-verta-cyan shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Diagnóstico Basado en Datos Previos</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                      El expediente adicional tiene un estatus de <strong>{checklistStats.progress}%</strong> de avance. El siguiente desglose pondera los coeficientes de riesgo normativos detectados con base en las respuestas del perfil del cliente de la Hoja 1.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSubTab('formulario')}
                  className="px-4 py-2 bg-gradient-to-r from-verta-cyan to-verta-cobalt text-xs font-mono font-bold text-white rounded-xl transition-all hover:scale-103 shrink-0 cursor-pointer"
                >
                  Completar Expediente
                </button>
              </div>
            )}

            {/* BEN DIAGOSTIC DASHBOARDS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT COLUMN: DIAGNÓSTICO FISCAL Y RIESGOS (HOJA 3 & 5) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* PRELIMINAR RISK TABLE (HOJA 3) */}
                <div className="verta-glass border-verta-slate-blue/40 rounded-2xl p-6 space-y-4">
                  <div className="border-b border-verta-slate-blue/30 pb-3.5">
                    <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-verta-coral" />
                      <span>Hoja 3: Diagnóstico Fiscal Preliminar</span>
                    </h3>
                    <p className="text-xs text-gray-400">Análisis del riesgo estructural para la operación de la empresa.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { area: 'Impuesto sobre la Renta (ISR)', risk: evaluatedRisks.isr.level, desc: evaluatedRisks.isr.desc },
                      { area: 'Impuesto al Valor Agregado (IVA)', risk: evaluatedRisks.iva.level, desc: evaluatedRisks.iva.desc },
                      { area: 'Estructura de Nómina', risk: evaluatedRisks.nomina.level, desc: evaluatedRisks.nomina.desc },
                      { area: 'Patrimonio de Socios', risk: evaluatedRisks.patrimonial.level, desc: evaluatedRisks.patrimonial.desc },
                      { area: 'Acreditamiento de Clientes', risk: evaluatedRisks.compliance.level, desc: evaluatedRisks.compliance.desc },
                      { area: 'Seguridad Social / IMSS', risk: evaluatedRisks.imss.level, desc: evaluatedRisks.imss.desc },
                      { area: 'Contabilidad Técnica', risk: evaluatedRisks.contabilidad.level, desc: evaluatedRisks.contabilidad.desc },
                    ].map((row, idx) => (
                      <div 
                        key={idx} 
                        className="p-3.5 rounded-xl bg-verta-navy/40 border border-verta-slate-blue/20 hover:border-verta-slate-blue/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1 flex-1">
                          <p className="font-bold text-white font-sans">{row.area}</p>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{row.desc}</p>
                        </div>

                        <div className="shrink-0 flex items-center self-start md:self-auto gap-2">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider ${
                            row.risk === 'Crítico' 
                              ? 'bg-verta-rose/20 text-verta-rose border border-verta-rose/30 animate-pulse' 
                              : row.risk === 'Alto'
                                ? 'bg-verta-coral/20 text-verta-coral border border-verta-coral/30'
                                : row.risk === 'Medio'
                                  ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                                  : 'bg-verta-emerald/20 text-verta-emerald border border-verta-emerald/30'
                          }`}>
                            {row.risk === 'Crítico' ? '🛑 Crítico' : row.risk === 'Alto' ? '⚠️ Alto' : row.risk === 'Medio' ? '🟡 Medio' : '✔️ Bajo'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-verta-slate-blue/15 p-4 rounded-xl space-y-1.5 text-xs text-gray-300">
                    <span className="font-mono text-white block uppercase tracking-widest text-[10px]">Observaciones del Diagnóstico</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                      <li>La estructura actual probablemente ya no corresponde al tamaño operativo y de ingresos.</li>
                      <li>Existe una exposición fiscal y penal importante en materia laboral, e IMSS.</li>
                      <li>Grandes corporativos nacionales normalmente exigen mayor institucionalización y REPSE.</li>
                    </ul>
                  </div>

                </div>

                {/* AREA LABORAL E IMSS (HOJA 5) */}
                <div className="verta-glass border-verta-slate-blue/40 rounded-2xl p-6 space-y-4">
                  <div className="border-b border-verta-slate-blue/30 pb-3.5">
                    <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                      <Users className="w-5 h-5 text-verta-cyan" />
                      <span>Hoja 5: Área Laboral e IMSS</span>
                    </h3>
                    <p className="text-xs text-gray-400">Riesgos inmediatos detectados bajo la Ley Federal del Trabajo.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="bg-verta-navy/40 border border-verta-slate-blue/20 p-4 rounded-xl space-y-2">
                      <span className="text-[10px] font-mono text-verta-coral uppercase font-bold block">RIESGO ELECTRÓNICO</span>
                      <p className="font-semibold text-white">Diferencias Salariales & IMSS</p>
                      <p className="text-gray-400 text-[11px] leading-relaxed">
                        Existen discrepancias severas en aportaciones de seguridad social. Riesgo inminente de multas del IMSS, capitales constitutivos y auditorías del INFONAVIT.
                      </p>
                    </div>

                    <div className="bg-verta-navy/40 border border-verta-slate-blue/20 p-4 rounded-xl space-y-2">
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block font-sans">IMPLICACIÓN CORPORATIVA</span>
                      <p className="font-semibold text-white">Demandas & Sindicatos</p>
                      <p className="text-gray-400 text-[11px] leading-relaxed">
                        Falta de contratos formalizados y expedientes de personal en orden expone al negocio a demandas laborales directas sin defensa probatoria documental viable.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1 text-xs">
                    <span className="text-gray-400 block font-semibold text-[11px] font-sans">Recomendaciones Inmediatas (Plan Maestro VERTA):</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      {[
                        '1. Diagnóstico laboral integral',
                        '2. Regularización gradual IMSS',
                        '3. Redacción de contratos laborales',
                        '4. Integración de expedientes de personal',
                        '5. Diseño de política salarial deducible',
                        '6. Revisión técnica de PTU',
                        '7. Comisión mixta de seguridad e higiene'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-verta-dark-blue/80 border border-verta-slate-blue/15 text-gray-300">
                          <CheckCircle className="w-3.5 h-3.5 text-verta-emerald shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* RIGHT COLUMN: OPINIÓN SOBRE CAMBIO A PERSONA MORAL Y COMPLIANCE CORPORATIVO (HOJA 4 & 6) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* OPINIÓN CAMBIO A PERSONA MORAL (HOJA 4) */}
                <div className="verta-glass border-verta-slate-blue/40 rounded-2xl p-6 space-y-4">
                  <div className="border-b border-verta-slate-blue/30 pb-3.5">
                    <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                      <Scale className="w-4.5 h-4.5 text-amber-400" />
                      <span>Hoja 4: Opinión - Persona Moral</span>
                    </h3>
                    <p className="text-xs text-gray-400">Puntualización de idoneidad corporativa para contratos comerciales.</p>
                  </div>

                  <div className="border border-amber-400/30 bg-amber-400/5 p-4 rounded-xl space-y-2.5 text-xs text-gray-300">
                    <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span>OPCIÓN PREFERENTE SUGERIDA:</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-white text-base font-sans">{legalEntityRecommendation.option}</p>
                      <p className="text-[11px] text-gray-400 leading-relaxed mt-1">{legalEntityRecommendation.reason}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed font-sans">
                    <div className="bg-emerald-950/20 border border-emerald-500/20 p-3.5 rounded-xl space-y-1">
                      <span className="font-bold text-emerald-400 block font-mono text-[10px]">🟢 VENTAJAS</span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{legalEntityRecommendation.advantages}</p>
                    </div>
                    <div className="bg-rose-950/20 border border-rose-500/20 p-3.5 rounded-xl space-y-1">
                      <span className="font-bold text-verta-rose block font-mono text-[10px]">🔴 DESVENTAJAS</span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{legalEntityRecommendation.disadvantages}</p>
                    </div>
                  </div>

                  <div className="bg-verta-navy/55 border border-verta-slate-blue/20 p-3.5 rounded-xl text-xs space-y-2">
                    <span className="font-mono text-gray-400 block text-[10px]">PARÁMETROS DEFINITORIOS EVALUADOS:</span>
                    <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                      <span className="bg-verta-slate-blue/40 px-2.5 py-1 rounded">Ingresos: Alto Rango</span>
                      <span className="bg-verta-slate-blue/40 px-2.5 py-1 rounded">Socios: {profile.sociosCount} Activos</span>
                      <span className="bg-verta-slate-blue/40 px-2.5 py-1 rounded">Crecimiento: {profile.crecimientoProyectado.toUpperCase()}</span>
                      <span className="bg-verta-slate-blue/40 px-2.5 py-1 rounded">Riesgos Identificados: Sí</span>
                    </div>
                    <p className="text-slate-400 text-[11px] italic font-sans">
                      Se recomienda evaluar seriamente una migración ordenada hacia Persona Moral bajo régimen general de ley.
                    </p>
                  </div>

                </div>

                {/* COMPLIANCE CORPORATIVO REQUISITOS (HOJA 6) */}
                <div className="verta-glass border-verta-slate-blue/40 rounded-2xl p-6 space-y-4">
                  <div className="border-b border-verta-slate-blue/30 pb-3.5">
                    <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                      <Layers className="w-5 h-5 text-verta-cyan" />
                      <span>Hoja 6: Cumplimiento Requerido</span>
                    </h3>
                    <p className="text-xs text-gray-400">Requisitos indispensables para cotizar y concursar en el mercado.</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      { req: 'Opinión positiva SAT (Art. 32-D)', current: 'Falta validar', action: 'Regularización urgente' },
                      { req: 'Opinión positiva del IMSS', current: 'No presentada', action: 'Inscripción y regularización' },
                      { req: 'Soporte CFDI Correctos en Nóminas', current: 'Diferencias', action: 'Auditoría integral' },
                      { req: 'Contratos Laborales Individuales', current: 'Parciales', action: 'Redacción e Instrumentación' },
                      { req: 'Información de Beneficiario Controlador', current: 'Inexistente', action: 'Cumplimiento SAT/CFF' },
                      { req: 'Controles Internos Corporativos', current: 'Nulos', action: 'Establecimiento de políticas' },
                      { req: 'Expediente Único Corporativo', current: 'Desarticulado', action: 'Consolidación digital VERTA' }
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-verta-navy/30 border border-verta-slate-blue/15 hover:border-verta-cyan/15 rounded-xl font-sans text-[11px]">
                        <div className="space-y-0.5">
                          <p className="font-bold text-white leading-tight">{row.req}</p>
                          <span className="text-[10px] text-gray-500 block font-mono">Estatus actual: {row.current}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-verta-cyan font-semibold block font-mono text-[10px]">{row.action}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>

            {/* STRATEGY CARD (HOJA 7) */}
            <div className="verta-glass border-verta-slate-blue/40 rounded-2xl p-6 space-y-4 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-verta-cyan/5 rounded-full blur-3xl" />

              <div className="border-b border-verta-slate-blue/30 pb-3">
                <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-verta-cyan" />
                  <span>Hoja 7: Plan de Estrategia Propuesta</span>
                </h3>
                <p className="text-xs text-gray-400">Ruta crítica recomendada para la mitigación del riesgo contributivo y legal.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-sans">
                {[
                  { phase: 'FASE 1', title: 'Diagnóstico Integral', time: '2 a 4 Semanas', desc: 'Auditoría documental y fiscal total para amarrar la planeación fiscal, laboral y legal.', border: 'border-l-verta-coral' },
                  { phase: 'FASE 2', title: 'Regularización y Migración', time: '4 a 8 Semanas', desc: 'Constitución ordenada de la Persona Moral elegida y liquidación de nóminas informales.', border: 'border-l-verta-cyan' },
                  { phase: 'FASE 3', title: 'Compliance Corporativo', time: '3 a 6 Semanas', desc: 'Integración del gobierno de accionistas, marcas, controles internos y políticas deducibles.', border: 'border-l-amber-400' },
                  { phase: 'FASE 4', title: 'Seguimiento Mensual', time: 'Permanente', desc: 'Acompañamiento, opinión positiva del SAT garantizada y blindaje corporativo constante.', border: 'border-l-emerald-500' },
                ].map((ph, idx) => (
                  <div key={idx} className={`bg-verta-navy/40 border border-verta-slate-blue/20 p-4 rounded-xl border-l-4 ${ph.border} space-y-2`}>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-gray-400 font-bold">{ph.phase}</span>
                      <span className="text-verta-cyan font-bold">{ph.time}</span>
                    </div>
                    <p className="font-bold text-white">{ph.title}</p>
                    <p className="text-gray-400 text-[11px] leading-relaxed">{ph.desc}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* SUBTAB 3: FEES & LEGAL FOUNDATION (HOJA 8, 9, 10 & CONCLUSION) */}
        {activeSubTab === 'honorarios' && (
          <div className="space-y-8 animate-fade-in font-sans">
            
            {/* INVOICE PROPUESTA HEADER */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* DIAGNÓSTICO INTEGRAL FEES BOX */}
              <div className="verta-glass border-verta-slate-blue/50 rounded-2xl p-6 space-y-4 flex flex-col justify-between relative group hover:border-verta-coral/30 transition-all">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-verta-coral font-bold uppercase tracking-widest bg-verta-coral/15 px-2.5 py-0.5 rounded">
                      Fase 1 • Inicial
                    </span>
                    <span className="text-xs font-mono text-gray-500">{quotedFees.diagnostico.time}</span>
                  </div>
                  <h3 className="font-bold text-base text-white">Diagnóstico Integral</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Evaluación total fiscal, laboral y legal cruzada con la firma digital electrónica. Diagnóstico de riesgos in-situ.
                  </p>
                </div>

                <div className="pt-4 border-t border-verta-slate-blue/30 space-y-1">
                  <span className="text-xs text-slate-500 block">Rango de Honorarios Sugerido:</span>
                  <p className="text-xl font-mono font-black text-white">
                    ${quotedFees.diagnostico.min.toLocaleString('es-MX')} a ${quotedFees.diagnostico.max.toLocaleString('es-MX')} MXN
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block">+ IVA Trasladado</span>
                </div>
              </div>

              {/* IMPLEMENTACIÓN INTEGRAL FEES BOX */}
              <div className="verta-glass border-verta-slate-blue/50 rounded-2xl p-6 space-y-4 flex flex-col justify-between relative group hover:border-verta-cyan/30 transition-all">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-verta-cyan font-bold uppercase tracking-widest bg-verta-cyan/15 px-2.5 py-0.5 rounded">
                      Fase 2 & 3 • Transición
                    </span>
                    <span className="text-xs font-mono text-gray-500">{quotedFees.implementacion.time}</span>
                  </div>
                  <h3 className="font-bold text-base text-white">Constitución y Migración</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Estructura e instrumentación de la Persona Moral elegida, liquidación y regularización de la prima de riesgo laboral IMSS.
                  </p>
                </div>

                <div className="pt-4 border-t border-verta-slate-blue/30 space-y-1">
                  <span className="text-xs text-slate-500 block">Rango de Honorarios Sugerido:</span>
                  <p className="text-xl font-mono font-black text-white">
                    ${quotedFees.implementacion.min.toLocaleString('es-MX')} a ${quotedFees.implementacion.max.toLocaleString('es-MX')} MXN
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block">+ IVA Trasladado</span>
                </div>
              </div>

              {/* IGUALA MENSUAL FEES BOX */}
              <div className="verta-glass border-verta-slate-blue/50 rounded-2xl p-6 space-y-4 flex flex-col justify-between relative group hover:border-amber-400/30 transition-all">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-400/15 px-2.5 py-0.5 rounded">
                      Fase 4 • Mensual
                    </span>
                    <span className="text-xs font-mono text-gray-500">{quotedFees.iguala.time}</span>
                  </div>
                  <h3 className="font-bold text-base text-white">Supervisión Estratégica</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Acompañamiento corporativo mensual en materia de compliance, auditoría a CFDI y mantenimiento de opinión SAT positiva.
                  </p>
                </div>

                <div className="pt-4 border-t border-verta-slate-blue/30 space-y-1">
                  <span className="text-xs text-slate-500 block">Iguala Mensual Sugerida:</span>
                  <p className="text-xl font-mono font-black text-white">
                    ${quotedFees.iguala.min.toLocaleString('es-MX')} a ${quotedFees.iguala.max.toLocaleString('es-MX')} MXN
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block">+ IVA Trasladado</span>
                </div>
              </div>

            </div>

            {/* FUNDAMENTO LEGAL & MARCO NORMATIVO (HOJA 9) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              <div className="verta-glass border-verta-slate-blue/40 rounded-2xl p-6 space-y-4">
                <div className="border-b border-verta-slate-blue/30 pb-3">
                  <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                    <Scale className="w-5 h-5 text-verta-coral" />
                    <span>Hoja 9: Fundamento Legal (Sustento del Riesgo)</span>
                  </h3>
                  <p className="text-xs text-gray-400">Leyes mexicanas que rigen y sancionan los incumplimientos evaluados en el reporte.</p>
                </div>

                <div className="space-y-2.5 text-xs">
                  {[
                    { law: 'Ley del Impuesto sobre la Renta (LISR)', refs: 'Título II & Título IV', desc: 'Determina las deducciones autorizadas de personas morales frente a la tasa impositiva de personas físicas.' },
                    { law: 'Código Fiscal de la Federación (CFF)', refs: 'Artículos 27, 28 & 42', desc: 'Procedimientos de fiscalización electrónica de CFDIs, buzón tributario y facultades de comprobación.' },
                    { law: 'Ley del Seguro Social (LSS)', refs: 'Artículo 15', desc: 'Obligaciones de registro patronal, altas del IMSS y determinación de cuotas obrero-patronales reales.' },
                    { law: 'Ley Federal del Trabajo (LFT)', refs: 'Relación Laboral y Obligaciones Patronales', desc: 'Exige contratos formalizados por escrito, asambleas de trabajadores y reparto equitativo de PTU.' },
                    { law: 'LFPIORPI (Ley Antilavado)', refs: 'Beneficiario Controlador y Cumplimiento', desc: 'Requisito de identificar a los beneficiarios finales directos para evitar sanciones administrativas graves.' }
                  ].map((row, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-verta-navy/30 border border-verta-slate-blue/15 space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-white block">{row.law}</span>
                        <span className="bg-verta-slate-blue/40 font-mono text-[9px] text-verta-cyan px-2 py-0.5 rounded font-bold">{row.refs}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 font-sans leading-relaxed pt-0.5">{row.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECOMENDACIONES FINALES DE CIERRE & CONCLUSIÓN (HOJA 10) */}
              <div className="space-y-6">
                
                <div className="verta-glass border-verta-slate-blue/40 rounded-2xl p-6 space-y-4">
                  <div className="border-b border-verta-slate-blue/30 pb-3">
                    <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                      <Briefcase className="w-5 h-5 text-verta-cyan" />
                      <span>Hoja 10: Recomendaciones de la Dirección</span>
                    </h3>
                    <p className="text-xs text-gray-400">Resumen de conclusiones del Diagnóstico Integral.</p>
                  </div>

                  <div className="space-y-3 font-sans text-xs">
                    {[
                      { rec: 'No migrar sin un diagnóstico integral consolidado', comment: 'Debe revisarse y subsanarse minuciosamente la contingencia de nómina existente en primer lugar.' },
                      { rec: 'Regularización laboral inmediata como prioridad crítica', comment: 'No exponer el patrimonio en juicios o multas por trabajadores sin alta de seguridad social del IMSS.' },
                      { rec: 'Implementar el esquema sugerido de Persona Moral', comment: 'Permite limitar la responsabilidad civil frente a contingencias y habilita la firma de grandes contratos.' },
                      { rec: 'Profesionalizar el gobierno de compliance', comment: 'Requisito mandatorio para calificar como proveedor confiable en auditorías de Bimbo o Lala.' }
                    ].map((row, idx) => (
                      <div key={idx} className="bg-verta-dark-blue/80 border border-verta-slate-blue/15 p-3 rounded-xl space-y-0.5">
                        <p className="font-bold text-amber-400 flex items-center space-x-1.5 leading-tight">
                          <span>⚠️ {row.rec}</span>
                        </p>
                        <p className="text-gray-400 text-[11px] leading-relaxed pt-0.5">{row.comment}</p>
                      </div>
                    ))}
                  </div>

                </div>

                {/* CONCLUSIÓN EJECUTIVA VERTA CARD */}
                <div className="border border-verta-emerald/30 bg-verta-emerald/5 rounded-2xl p-5 space-y-3 text-xs text-gray-300">
                  <div className="flex items-center space-x-2 text-verta-emerald">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-bold font-mono">CONCLUSIÓN EJECUTIVA CERTIFICADA</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    El negocio <strong>{profile.companyName}</strong> se encuentra en una etapa madura donde requiere de una <strong>institucionalización integral indispensable</strong> para mitigar riesgos fiscales y laborales graves. El objetivo de la estrategia radica en consolidar una estructura defendible y sólida ante el SAT, IMSS y auditorías corporativas.
                  </p>
                  <div className="text-[10px] font-mono text-gray-500 pt-2 border-t border-verta-emerald/20 flex justify-between items-center">
                    <span>Validador: VERTA compliance Suite v1.4</span>
                    <span>Sello: CERRADO & VALIDADO ✔️</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
