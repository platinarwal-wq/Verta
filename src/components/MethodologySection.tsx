/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Database, 
  Clock, 
  CalendarClock, 
  Lock, 
  FileCheck2, 
  CheckCircle2, 
  Scale, 
  Building2, 
  FileText, 
  AlertTriangle, 
  Sparkles,
  ChevronRight,
  Fingerprint
} from 'lucide-react';

export function MethodologySection() {
  const [activeDimension, setActiveDimension] = useState<number>(0);

  const dimensions = [
    {
      id: 0,
      name: 'Fiscal & Tributaria',
      short: 'Fiscal',
      tag: 'SAT & Contribuciones',
      icon: <FileText className="w-5 h-5 text-verta-cyan" />,
      color: 'border-verta-cyan/40 bg-verta-cyan/5 text-verta-cyan',
      fuentes: ['SAT (Servicio de Administración Tributaria)', 'Cédula de Identificación Fiscal (RFC)', 'Artículo 32-D del Código Fiscal de la Federación'],
      criterios: [
        'Opinión de cumplimiento positiva sin créditos fiscales firmes exigibles.',
        'Actividad económica declarada en el RFC congruente con los servicios facturados.',
        'Monitoreo continuo de ausencia en listas de presunción o definitivas del Art. 69-B del CFF (EFOS/EDOS).'
      ],
      vigencia: '30 días naturales a partir de su emisión oficial.',
      tiempoRevision: 'Validación automatizada en 5 min; auditoría integral en 1 a 2 horas.'
    },
    {
      id: 1,
      name: 'Legal & Societaria',
      short: 'Legal',
      tag: 'RPC & Fe Pública',
      icon: <Scale className="w-5 h-5 text-verta-coral" />,
      color: 'border-verta-coral/40 bg-verta-coral/5 text-verta-coral',
      fuentes: ['Registro Público de la Propiedad y del Comercio (RPC)', 'Colegios de Notarios y Corredores Públicos', 'Identificaciones Oficiales INE/SRE'],
      criterios: [
        'Inscripción de la escritura constitutiva y reformas estatutarias en el folio mercantil electrónico.',
        'Poderes notariales vigentes con facultades expresas de administración o dominio para el apoderado legal.',
        'Cotejo de identidad biométrica y coincidencia de clave CURP del representante acreditado.'
      ],
      vigencia: 'Permanente mientras no exista asamblea revocatoria o reforma estatutaria (revalidación anual).',
      tiempoRevision: 'Análisis forense notarial en 2 a 4 horas hábiles.'
    },
    {
      id: 2,
      name: 'Laboral & Seguridad Social',
      short: 'Laboral',
      tag: 'IMSS, INFONAVIT & REPSE',
      icon: <Building2 className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-400/40 bg-emerald-400/5 text-emerald-400',
      fuentes: ['IMSS (Opinión de Cumplimiento en Materia de Seguridad Social)', 'INFONAVIT (Constancia de No Adeudo)', 'STPS (Padrón Público de Contratistas REPSE)'],
      criterios: [
        'Estatus positivo en el pago oportuno de cuotas obrero-patronales ante el IMSS.',
        'Constancia de situación fiscal libre de adeudo ante el INFONAVIT.',
        'Registro vigente en el padrón REPSE para prestadores de servicios u obras especializadas (Art. 15 LFT).'
      ],
      vigencia: '30 días naturales para opiniones IMSS/INFONAVIT; renovación trianual para folio REPSE.',
      tiempoRevision: 'Cotejo automatizado vía webservice en < 15 minutos.'
    },
    {
      id: 3,
      name: 'Capacidad Operativa & Financiera',
      short: 'Operativa',
      tag: 'Bancaria & Domicilio',
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      color: 'border-indigo-400/40 bg-indigo-400/5 text-indigo-400',
      fuentes: ['Comprobantes de servicios públicos (CFE, Agua, Telecom)', 'Carátulas de estado de cuenta de instituciones supervisadas por CNBV'],
      criterios: [
        'Verificación de domicilio fiscal activo y localizable físicamente con antigüedad < 90 días.',
        'Titularidad de cuenta bancaria corporativa a nombre exacto de la persona moral o física contribuyente.',
        'Infraestructura técnica, equipos y plantilla operativa demostrable para la ejecución de servicios.'
      ],
      vigencia: '90 días naturales para comprobante domiciliario; validación bancaria única por cuenta activa.',
      tiempoRevision: '1 a 3 horas hábiles de cotejo documental.'
    },
    {
      id: 4,
      name: 'Prevención PLD & Compliance Ético',
      short: 'Compliance',
      tag: 'Listas Negras & UIF',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-400/40 bg-amber-400/5 text-amber-400',
      fuentes: ['Diario Oficial de la Federación (DOF)', 'OFAC (Specially Designated Nationals)', 'Interpol & Listas de Personas Políticamente Expuestas (PEP)'],
      criterios: [
        'Ausencia de socios, directivos y accionistas en listas restrictivas nacionales e internacionales.',
        'Verificación de Beneficiario Controlador conforme a los artículos 32-B Quáter y Quinquies del CFF.',
        'Manual básico de integridad y cumplimiento anticorrupción (Art. 25 de la LGRA).'
      ],
      vigencia: 'Monitoreo diario automatizado contra listas oficiales actualizadas del DOF y fuentes sancionatorias.',
      tiempoRevision: 'Monitoreo continuo 24/7 en tiempo real.'
    }
  ];

  const fuentesOficiales = [
    { name: 'SAT (México)', desc: 'Opinión 32-D, Cédula Fiscal (RFC), e.firma y listas 69-B', badge: 'Fiscal' },
    { name: 'IMSS & INFONAVIT', desc: 'Cumplimiento de seguridad social y cuotas obrero-patronales', badge: 'Seguridad Social' },
    { name: 'RPC (Registro Público)', desc: 'Actas constitutivas, poderes y folios mercantiles de sociedades', badge: 'Societario' },
    { name: 'STPS / REPSE', desc: 'Padrón de prestadores de servicios y obras especializadas', badge: 'Laboral' },
    { name: 'DOF (Diario Oficial)', desc: 'Publicaciones oficiales, reformas normativas y listas definitivas', badge: 'Regulatorio' },
    { name: 'SEP / Cédulas', desc: 'Validación de registro de cédulas profesionales de consultores', badge: 'Técnico' }
  ];

  return (
    <section className="max-w-6xl w-full mx-auto space-y-10 py-6 text-white font-sans">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-verta-cyan/10 border border-verta-cyan/30 px-3.5 py-1 rounded-full text-xs font-mono text-verta-cyan">
          <Database className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">Metodología Técnica VERTA</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
          Datos metodológicos reales y verificables
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Sustituimos cualquier estimación abstracta por criterios objetivos de auditoría con fuentes gubernamentales directas, tiempos estandarizados y protocolos de vigencia formal.
        </p>
      </div>

      {/* METRICAS METODOLÓGICAS REALES (DATOS OBJETIVOS, NO CLAIMS FICTICIOS) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="verta-glass border border-verta-cyan/30 p-4 rounded-2xl text-center space-y-1 bg-verta-dark-blue/50">
          <span className="text-[10px] font-mono text-verta-cyan uppercase font-bold tracking-wider block">Dimensiones Auditadas</span>
          <span className="text-2xl sm:text-3xl font-black text-white font-display">5 Pilares</span>
          <p className="text-[11px] text-gray-400">Fiscal, Legal, Laboral, Operativa y Compliance PLD</p>
        </div>

        <div className="verta-glass border border-indigo-500/30 p-4 rounded-2xl text-center space-y-1 bg-verta-dark-blue/50">
          <span className="text-[10px] font-mono text-indigo-300 uppercase font-bold tracking-wider block">Fuentes Oficiales</span>
          <span className="text-2xl sm:text-3xl font-black text-white font-display">6 Registros</span>
          <p className="text-[11px] text-gray-400">SAT, IMSS, INFONAVIT, RPC, STPS y DOF</p>
        </div>

        <div className="verta-glass border border-verta-coral/30 p-4 rounded-2xl text-center space-y-1 bg-verta-dark-blue/50">
          <span className="text-[10px] font-mono text-verta-coral uppercase font-bold tracking-wider block">Tiempo Promedio</span>
          <span className="text-2xl sm:text-3xl font-black text-white font-display">1 a 4 Horas</span>
          <p className="text-[11px] text-gray-400">Dictamen formal por equipo de auditoría colegiado</p>
        </div>

        <div className="verta-glass border border-emerald-500/30 p-4 rounded-2xl text-center space-y-1 bg-verta-dark-blue/50">
          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider block">Vigencia y Control</span>
          <span className="text-2xl sm:text-3xl font-black text-white font-display">30 / 90 Días</span>
          <p className="text-[11px] text-gray-400">Alertas automáticas de renovación antes del vencimiento</p>
        </div>
      </div>

      {/* DETALLE DE LAS 5 DIMENSIONES */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-verta-slate-blue/30 pb-2">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-verta-cyan" />
            <span>Matriz de las 5 Dimensiones Verificadas</span>
          </h3>
          <span className="text-xs text-gray-400 font-mono">Seleccione una dimensión para consultar sus fuentes y criterios</span>
        </div>

        {/* Dimension Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {dimensions.map((dim, idx) => (
            <button
              key={dim.id}
              onClick={() => setActiveDimension(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
                activeDimension === idx
                  ? `${dim.color} shadow-lg border-opacity-100 font-bold`
                  : 'bg-verta-navy/50 border-verta-slate-blue/40 text-gray-400 hover:text-white hover:bg-verta-navy/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                {dim.icon}
              </div>
              <span className="text-xs font-bold leading-tight block text-white">{dim.short}</span>
              <span className="text-[10px] font-mono opacity-75 truncate">{dim.tag}</span>
            </button>
          ))}
        </div>

        {/* Selected Dimension Detail Card */}
        {dimensions[activeDimension] && (
          <div className="verta-glass border border-verta-slate-blue/60 p-6 rounded-2xl space-y-5 bg-verta-dark-blue/70 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-verta-slate-blue/40 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-verta-navy border border-verta-slate-blue/60 flex items-center justify-center">
                  {dimensions[activeDimension].icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono uppercase text-verta-cyan font-bold">Dimensión 0{activeDimension + 1}</span>
                    <span className="text-gray-500 font-mono text-xs">/</span>
                    <span className="text-xs font-mono text-gray-400">{dimensions[activeDimension].tag}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">{dimensions[activeDimension].name}</h4>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="bg-verta-navy px-3 py-1.5 rounded-lg border border-verta-slate-blue/60 text-gray-300 flex items-center space-x-1.5">
                  <CalendarClock className="w-3.5 h-3.5 text-verta-coral" />
                  <span>Vigencia: {dimensions[activeDimension].vigencia}</span>
                </span>
                <span className="bg-verta-navy px-3 py-1.5 rounded-lg border border-verta-slate-blue/60 text-gray-300 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-verta-cyan" />
                  <span>Tiempo: {dimensions[activeDimension].tiempoRevision}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
              {/* Fuentes Oficiales */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase text-verta-cyan font-bold tracking-wider block flex items-center space-x-1.5">
                  <Database className="w-3.5 h-3.5" />
                  <span>Fuentes Oficiales Convalidadas</span>
                </span>
                <ul className="space-y-2">
                  {dimensions[activeDimension].fuentes.map((f, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-gray-300 bg-verta-navy/50 p-2.5 rounded-xl border border-verta-slate-blue/30">
                      <CheckCircle2 className="w-4 h-4 text-verta-emerald shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Criterios de Acreditación */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase text-verta-coral font-bold tracking-wider block flex items-center space-x-1.5">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Criterios de Acreditación y Validación</span>
                </span>
                <ul className="space-y-2">
                  {dimensions[activeDimension].criterios.map((c, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-gray-300 bg-verta-navy/50 p-2.5 rounded-xl border border-verta-slate-blue/30">
                      <ChevronRight className="w-4 h-4 text-verta-coral shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FUENTES Y ESTÁNDARES TECNOLÓGICOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="verta-glass border border-verta-slate-blue/50 p-5 rounded-2xl space-y-3 bg-verta-dark-blue/40">
          <div className="flex items-center space-x-2 text-verta-cyan font-mono text-xs font-bold uppercase">
            <Lock className="w-4 h-4" />
            <span>Cifrado y Seguridad</span>
          </div>
          <h4 className="font-bold text-sm text-white">Inalterabilidad de Registros</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Cada expediente validado genera un sello digital con algoritmo criptográfico SHA-256 y cifrado simétrico AES-256 en reposo. Todo acceso queda registrado en bitácoras de auditoría inmutables.
          </p>
        </div>

        <div className="verta-glass border border-verta-slate-blue/50 p-5 rounded-2xl space-y-3 bg-verta-dark-blue/40">
          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase">
            <Fingerprint className="w-4 h-4" />
            <span>Firma e.firma Convalidada</span>
          </div>
          <h4 className="font-bold text-sm text-white">Cotejo de Representatividad</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Convalidamos la identidad legal mediante el certificado digital de e.firma emitido por el SAT, garantizando no repudio y equivalencia probatoria funcional según el Código de Comercio.
          </p>
        </div>

        <div className="verta-glass border border-verta-slate-blue/50 p-5 rounded-2xl space-y-3 bg-verta-dark-blue/40">
          <div className="flex items-center space-x-2 text-verta-coral font-mono text-xs font-bold uppercase">
            <AlertTriangle className="w-4 h-4" />
            <span>Prevención Activa de Riesgos</span>
          </div>
          <h4 className="font-bold text-sm text-white">Eliminación de Contingencias</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Protección integral contra no deducibilidad de facturas (Art. 69-B CFF), multas por subcontratación irregular ante la STPS y responsabilidad solidaria patronal ante el IMSS e INFONAVIT.
          </p>
        </div>
      </div>
    </section>
  );
}
