/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  CheckCircle, 
  X, 
  ShieldCheck, 
  ExternalLink, 
  Building2, 
  Sparkles, 
  Calendar, 
  FileCheck2, 
  MapPin, 
  Activity,
  ArrowRight
} from 'lucide-react';

interface IsoCertifiedCompany {
  id: string;
  name: string;
  rfc: string;
  sector: string;
  region: string;
  isoCertificateId: string;
  isoStandard: 'ISO 9001:2015' | 'ISO 9004:2018';
  registrar: string; // Audit Body (e.g. SGS, Bureau Veritas, TÜV)
  certifiedSince: string;
  nextAuditDate: string;
  status: 'vigente' | 'en_auditoria' | 'renovacion';
  qualityScore: number; // QMS compliance rating
  logoLetters: string;
  logoColor: string;
  scope: string; // Quality management scope
  certUrl: string;
}

const SAMPLE_ISO_COMPANIES: IsoCertifiedCompany[] = [
  {
    id: 'iso_1',
    name: 'Logística Multimodal del Centro S.A. de C.V.',
    rfc: 'LMC-881204-TR9',
    sector: 'Logística & Transporte',
    region: 'Estado de México',
    isoCertificateId: 'MX-9001-2024-84920',
    isoStandard: 'ISO 9001:2015',
    registrar: 'SGS México',
    certifiedSince: '14/08/2018',
    nextAuditDate: '12/11/2026',
    status: 'vigente',
    qualityScore: 98,
    logoLetters: 'LM',
    logoColor: 'bg-gradient-to-br from-verta-cyan to-verta-cobalt text-verta-navy font-bold',
    scope: 'Servicio de cadena de suministro refrigerada, almacenamiento seguro de medicamentos y distribución terrestre internacional.',
    certUrl: 'https://verta.io/certs/mx-sgs-84920'
  },
  {
    id: 'iso_2',
    name: 'Grupo Constructor Metrópoli S.A.',
    rfc: 'GCM-940301-KL2',
    sector: 'Construcción & Infraestructura',
    region: 'Nuevo León',
    isoCertificateId: 'MX-9001-2025-41920',
    isoStandard: 'ISO 9001:2015',
    registrar: 'TÜV Rheinland de México',
    certifiedSince: '05/01/2020',
    nextAuditDate: '02/01/2027',
    status: 'vigente',
    qualityScore: 95,
    logoLetters: 'GC',
    logoColor: 'bg-verta-coral text-white',
    scope: 'Diseño, planeación de obras civiles, construcción estructural, cálculo de cimentación y edificación vertical comercial.',
    certUrl: 'https://verta.io/certs/mx-tuv-41920'
  },
  {
    id: 'iso_3',
    name: 'Comercializadora de Acero de Occidente',
    rfc: 'CAO-101115-ST1',
    sector: 'Manufactura & Metalurgia',
    region: 'Querétaro',
    isoCertificateId: 'MX-9001-2023-77204',
    isoStandard: 'ISO 9001:2015',
    registrar: 'Bureau Veritas México',
    certifiedSince: '21/11/2015',
    nextAuditDate: '18/12/2026',
    status: 'vigente',
    qualityScore: 94,
    logoLetters: 'CA',
    logoColor: 'bg-zinc-700 text-verta-cyan font-bold',
    scope: 'Corte, cizallado, extrusión de perfiles metálicos especiales e importación de placas gruesas de acero al carbón para manufacturas.',
    certUrl: 'https://verta.io/certs/mx-bv-77204'
  },
  {
    id: 'iso_4',
    name: 'Alimentos y Distribución Express S.A.',
    rfc: 'ADE-010515-FG3',
    sector: 'Alimentario & Retail',
    region: 'Jalisco',
    isoCertificateId: 'MX-9001-2024-39120',
    isoStandard: 'ISO 9001:2015',
    registrar: 'SGS México',
    certifiedSince: '18/02/2021',
    nextAuditDate: '14/11/2026',
    status: 'vigente',
    qualityScore: 93,
    logoLetters: 'AD',
    logoColor: 'bg-amber-400 text-verta-navy font-bold',
    scope: 'Empaque de alimentos perecederos procesados al vacío, logística urbana express bajo el régimen de inocuidad alimentaria.',
    certUrl: 'https://verta.io/certs/mx-sgs-39120'
  },
  {
    id: 'iso_5',
    name: 'Soluciones Tecnológicas Alfa S.A. de C.V.',
    rfc: 'VTS-040815-H42',
    sector: 'Tecnología & SaaS',
    region: 'Ciudad de México',
    isoCertificateId: 'MX-9001-2026-11409',
    isoStandard: 'ISO 9001:2015',
    registrar: 'BSI Group México',
    certifiedSince: '20/03/2023',
    nextAuditDate: '10/05/2026', // past due or in audit
    status: 'en_auditoria',
    qualityScore: 91,
    logoLetters: 'ST',
    logoColor: 'bg-indigo-600 text-white',
    scope: 'Desarrollo de ciclos de software seguro (SDLC), administración de base de datos distribuidas y consultoría SaaS empresarial.',
    certUrl: 'https://verta.io/certs/mx-bsi-11409'
  },
  {
    id: 'iso_6',
    name: 'Energías Limpias del Bajío S.A.',
    rfc: 'ELB-180630-NM1',
    sector: 'Energía & Servicios Básicos',
    region: 'Guanajuato',
    isoCertificateId: 'MX-9001-2025-55102',
    isoStandard: 'ISO 9001:2015',
    registrar: 'TÜV Rheinland de México',
    certifiedSince: '09/09/2022',
    nextAuditDate: '24/10/2026',
    status: 'vigente',
    qualityScore: 96,
    logoLetters: 'EL',
    logoColor: 'bg-teal-500 text-verta-navy font-bold',
    scope: 'Instalación de infraestructura para energía sustentable, diseño óptimo de celdas fotovoltaicas de alta eficiencia industrial.',
    certUrl: 'https://verta.io/certs/mx-tuv-55102'
  }
];

export function IsoDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
  const [selectedCert, setSelectedCert] = useState<IsoCertifiedCompany | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  const filteredCompanies = useMemo(() => {
    return SAMPLE_ISO_COMPANIES.filter(comp => {
      const matchSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          comp.isoCertificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          comp.registrar.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = selectedStatus === 'Todos' || comp.status === selectedStatus;
      return matchSearch && matchStatus;
    });
  }, [searchTerm, selectedStatus]);

  const copyCertId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-10 animate-fade-in text-sans">
      
      {/* ISO HERO HEADER */}
      <section className="relative px-4 lg:px-8 py-10 overflow-hidden border-b border-verta-slate-blue/30 metal-texture">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-verta-cyan/5 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-verta-coral/5 rounded-full blur-[110px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-verta-cyan/15 to-verta-cobalt/15 border border-verta-cyan/30 px-3 py-1 rounded-full text-xs font-mono text-verta-cyan">
              <Award className="w-3.5 h-3.5 animate-pulse" />
              <span>ACREDITADOS ISO 9000</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
              Registro del Sistema de Gestión de Calidad (QMS)
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
              Consulte el estatus y alcance de los prestadores certificados bajo la norma internacional <span className="text-verta-cyan font-bold">ISO 9001:2015</span>. Cada certificación ha sido cotejada con los organismos acreditadores oficiales correspondientes.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="verta-glass border-verta-slate-blue/50 p-4 rounded-xl text-center min-w-[140px]">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Empresas Certificadas</span>
              <span className="text-3xl font-black text-verta-cyan font-mono">
                {SAMPLE_ISO_COMPANIES.length}
              </span>
              <span className="block text-[9px] text-verta-emerald font-semibold mt-0.5 font-mono">100% VALIDADAS</span>
            </div>
            <div className="verta-glass border-verta-slate-blue/50 p-4 rounded-xl text-center min-w-[140px]">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Estándar Primario</span>
              <span className="text-sm font-black text-white font-mono mt-2 block">ISO 9001:2015</span>
              <span className="block text-[9px] text-gray-400 font-mono mt-1">SISTEMA INTEGRAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER CONTROLS */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          
          {/* Search box */}
          <div className="sm:col-span-7 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por Empresa, Número de Certificado o Organismo Acreditador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan focus:outline-none rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-gray-500 transition-all font-sans"
            />
          </div>

          {/* Status box filter */}
          <div className="sm:col-span-5 flex items-center space-x-2">
            <Filter className="w-4 h-4 text-verta-cyan shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 hover:hover:border-verta-cyan/40 focus:border-verta-cyan rounded-xl px-3 py-2.5 text-xs text-gray-300 font-medium focus:outline-none cursor-pointer"
            >
              <option value="Todos" className="bg-verta-navy text-white text-xs">Todos los estatus de certificación</option>
              <option value="vigente" className="bg-verta-navy text-white text-xs">Vigente (Aprobado)</option>
              <option value="en_auditoria" className="bg-verta-navy text-white text-xs">En ciclo de Auditoría/Renovación</option>
            </select>
          </div>

        </div>
      </div>

      {/* DIRECTORY GRIDS */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((comp) => (
              <div 
                key={comp.id}
                className="verta-glass verta-glass-hover rounded-2xl p-6 shadow-xl flex flex-col justify-between relative group border-b-2 border-b-verta-slate-blue/50"
              >
                {/* Brand border strip hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-verta-cyan via-verta-cobalt to-verta-cyan scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
                
                {/* Glow accent */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-verta-cyan/5 rounded-full blur-xl group-hover:bg-verta-cyan/15 transition-all pointer-events-none" />

                <div className="space-y-4">
                  
                  {/* Top card metadata */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl ${comp.logoColor} flex items-center justify-center font-bold text-sm tracking-tight shadow-md ring-2 ring-white/5`}>
                        {comp.logoLetters}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-verta-cyan block uppercase tracking-wider font-semibold">{comp.sector}</span>
                        <span className="text-xs font-bold text-white block truncate max-w-[150px]">{comp.registrar}</span>
                      </div>
                    </div>

                    {/* Standard Version Tag */}
                    <div className="text-right">
                      <span className="bg-verta-cyan/15 border border-verta-cyan/30 text-[9px] font-mono font-bold text-verta-cyan px-2 py-0.5 rounded">
                        {comp.isoStandard}
                      </span>
                    </div>
                  </div>

                  {/* Company Profile Details */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-bold text-base text-white tracking-tight leading-tight group-hover:text-verta-cyan transition-colors">
                      {comp.name}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-3">
                      {comp.scope}
                    </p>
                  </div>

                  {/* Technical values table */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-verta-slate-blue/30 text-[10px] font-mono text-gray-400">
                    <div className="bg-verta-navy/40 p-2 rounded-lg border border-verta-slate-blue/20">
                      <span className="text-gray-500 block">Certificado</span>
                      <span className="text-white font-semibold truncate block select-all">{comp.isoCertificateId}</span>
                    </div>
                    <div className="bg-verta-navy/40 p-2 rounded-lg border border-verta-slate-blue/20">
                      <span className="text-gray-500 block">Siguiente Auditoría</span>
                      <span className="text-white font-semibold truncate block">{comp.nextAuditDate}</span>
                    </div>
                  </div>

                </div>

                {/* Card Actions */}
                <div className="pt-5 mt-4 space-y-2.5">
                  <button 
                    onClick={() => setSelectedCert(comp)}
                    className="w-full py-2.5 px-4 bg-verta-slate-blue/50 hover:bg-verta-slate-blue text-xs font-bold text-white rounded-xl border border-verta-slate-blue/80 flex items-center justify-center space-x-2 transition-all cursor-pointer hover:border-verta-cyan/40"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-verta-cyan" />
                    <span>Validar Sello de Calidad</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] font-mono px-1">
                    <span className="text-gray-500">Registrado desde: {comp.certifiedSince}</span>
                    {comp.status === 'vigente' ? (
                      <span className="text-verta-emerald font-bold flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-verta-emerald animate-ping inline-block" />
                        <span>VIGENTE ✔️</span>
                      </span>
                    ) : (
                      <span className="text-amber-400 font-bold flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span>AUDITORÍA ⏳</span>
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty search error state */
          <div className="verta-glass border-dashed border-verta-slate-blue/60 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
            <Award className="w-12 h-12 text-verta-coral mx-auto animate-bounce" />
            <div>
              <p className="font-bold text-lg text-white">No se encontraron certificados ISO 9000</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                No hay empresas en el sistema con certificación ISO que coincidan con la palabra "{searchTerm}".
              </p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('Todos');
              }}
              className="px-4 py-2 bg-verta-slate-blue text-white text-xs font-mono font-semibold rounded-lg hover:border-verta-cyan transition-all cursor-pointer"
            >
              Reestablecer Filtros
            </button>
          </div>
        )}
      </div>

      {/* HISTORIAL MODAL ACREDITACIÓN */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-2xl verta-glass border border-verta-cyan/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-verta-slate-blue/40 bg-verta-dark-blue/80">
              <div className="flex items-center space-x-3.5">
                <div className={`w-10 h-10 rounded-xl ${selectedCert.logoColor} flex items-center justify-center font-bold text-sm tracking-tight shadow`}>
                  {selectedCert.logoLetters}
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white font-sans">{selectedCert.name}</h3>
                  <div className="flex items-center space-x-3 text-xs text-gray-400 font-mono mt-0.5">
                    <span>RFC: {selectedCert.rfc}</span>
                    <span>•</span>
                    <span className="text-verta-cyan font-semibold">{selectedCert.sector}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCert(null)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-verta-slate-blue/40 rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar">
              
              {/* Scope of Certification */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-verta-cyan uppercase tracking-wider flex items-center space-x-1.5">
                  <Activity className="w-4 h-4" />
                  <span>Alcance Oficial de Certificación Técnica</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed bg-verta-navy/50 p-4 rounded-xl border border-verta-slate-blue/35 font-sans">
                  "{selectedCert.scope}"
                </p>
              </div>

              {/* Registro block details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="verta-glass-hover bg-verta-navy/30 border border-verta-slate-blue/30 p-4 rounded-xl space-y-1 text-xs">
                  <span className="text-gray-500 font-mono block">ORGANISMO REGISTRADOR</span>
                  <p className="font-bold text-white font-sans flex items-center space-x-1.5">
                    <span>{selectedCert.registrar}</span>
                  </p>
                  <p className="text-[10px] text-gray-400 pt-1 leading-relaxed">Entidad de tercera parte debidamente firmada bajo lineamientos corporativos internacionales IAF.</p>
                </div>

                <div className="verta-glass-hover bg-verta-navy/30 border border-verta-slate-blue/30 p-4 rounded-xl space-y-1 text-xs">
                  <span className="text-gray-500 font-mono block font-sans">CLAVE DEL CERTIFICADO</span>
                  <div className="flex items-center justify-between">
                    <p className="font-mono font-bold text-verta-cyan block">{selectedCert.isoCertificateId}</p>
                    <button 
                      onClick={() => copyCertId(selectedCert.isoCertificateId)}
                      className="text-[10px] font-mono text-gray-400 hover:text-white underline cursor-pointer"
                    >
                      {copiedText ? 'Copiado ✓' : 'Copiar'}
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 pt-1 leading-relaxed">Asegura la trazabilidad y procedencia legal en el registro global de acreditatarios.</p>
                </div>
              </div>

              {/* Acreditación Checklists */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">PROCESO CUMPLIDO PARA SELLO ISO 9001</h4>
                
                <div className="grid grid-cols-1 gap-2.5 text-xs">
                  {[
                    { title: 'Auditoría Interna de Calidad', status: 'Cotejada conforme a procedimientos de autocambio', date: 'Julio 2025' },
                    { title: 'Gestión de Riesgos Organizacionales', status: 'Identificación oportuna de incidencias en portal operativo', date: 'Vigente' },
                    { title: 'Validación por Enlace Auditor Externo', status: 'Examen de revisión y evaluación física completada', date: selectedCert.certifiedSince },
                    { title: 'Sello Digital VERTA OS Secure', status: 'Firmas digitales depositadas con sello electrónico block', date: 'En tiempo real' }
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-verta-navy/30 border border-verta-slate-blue/20 hover:border-verta-cyan/15 transition-all">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-verta-emerald shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-white font-sans">{doc.title}</p>
                          <span className="text-[10px] text-gray-400 block font-mono mt-0.5">{doc.status}</span>
                        </div>
                      </div>
                      <div className="text-right font-mono text-[10px] text-slate-500">
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Badge Certificate Box */}
              <div className="border border-verta-emerald/30 bg-verta-emerald/5 rounded-2xl p-5 space-y-3 text-xs text-gray-300">
                <div className="flex items-center space-x-2 text-verta-emerald">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold font-mono">SELLO AUDITABLE ADJUDICADO</span>
                </div>
                <p className="text-[11px] leading-relaxed font-sans">
                  Sello hash de transacciones de bloque emitido por VERTA. La razón social <strong>{selectedCert.name}</strong> demuestra un eficaz Sistema de Gestión de Calidad (SGC) que opera bajo control estadístico y mejora continua.
                </p>
                <div className="text-[10px] font-mono text-gray-500 flex justify-between items-center pt-2 border-t border-verta-emerald/20">
                  <span>Sello HASH: VERTA-ISO-9001-MD5-{selectedCert.isoCertificateId.replace(/-/g, '')}</span>
                  <span>Acreditación Gold 🥇</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-verta-navy/90 border-t border-verta-slate-blue/40 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Cotejo de Vigencia: <strong>2026-05-24</strong></span>
              </span>
              
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 bg-verta-slate-blue/50 text-gray-300 hover:text-white rounded-xl text-xs font-mono font-semibold hover:bg-verta-slate-blue hover:border hover:border-verta-cyan/30 transition-all cursor-pointer"
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
