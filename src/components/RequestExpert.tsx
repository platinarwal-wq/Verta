/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Building2, 
  Laptop, 
  Cpu, 
  Search, 
  Share2, 
  FileText, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  HelpCircle, 
  Briefcase,
  Sliders,
  CheckCircle2,
  X
} from 'lucide-react';

import { submitExpertRequestToFirestore } from '../firebase';

interface SelectedServices {
  web: boolean;
  ai: boolean;
  seo: boolean;
  social: boolean;
}

export function RequestExpert() {
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    companyName: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    auditType: 'intermedia' // basica, intermedia, total
  });

  const [services, setServices] = useState<SelectedServices>({
    web: false,
    ai: false,
    seo: false,
    social: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const toggleService = (key: keyof SelectedServices) => {
    setServices(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedServiceNames = Object.entries(services)
      .filter(([_, value]) => value)
      .map(([key]) => {
        if (key === 'web') return 'Plataformas Web';
        if (key === 'ai') return 'Inteligencia Artificial Avanzada';
        if (key === 'seo') return 'Posicionamiento SEO Técnico';
        return 'Gestión de Redes Sociales AI-driven';
      });

    try {
      await submitExpertRequestToFirestore({
        contactName: formData.fullName || 'Contacto Anónimo',
        contactEmail: formData.email,
        contactPhone: formData.phone || '',
        companyOrProviderName: formData.companyName || '',
        topic: `Auditoría (${formData.auditType}) - ${selectedServiceNames.join(', ') || 'General'}`,
        notes: formData.description || 'Sin notas adicionales'
      });
    } catch (err) {
      console.warn('Firestore fallback on expert request submit:', err);
    } finally {
      setIsSubmitting(false);
      setSubmittedData({
        ...formData,
        servicesSelected: selectedServiceNames
      });
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in text-sans mb-12">
      
      {/* HERO SECTION DE SOLICITUD */}
      <section className="relative px-4 lg:px-8 py-10 overflow-hidden border-b border-verta-slate-blue/30 metal-texture">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-verta-cyan/5 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-verta-coral/5 rounded-full blur-[110px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-verta-coral/15 to-verta-cyan/15 border border-verta-cyan/20 px-3 py-1 rounded-full text-xs font-mono text-verta-cyan">
              <Sparkles className="w-3.5 h-3.5 text-verta-coral animate-pulse" />
              <span>ALIANZAS CORPORATIVAS</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
              Solicitar Auditoría & Experto VERTA
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
              ¿Desea transformar la presencia tecnológica de su empresa? Las empresas y consultores de confianza pueden solicitar una <strong className="text-white">auditoría tecnológica homologada</strong> e implementación de soluciones avanzadas diseñadas por ingenieros elite de <span className="text-verta-cyan font-bold">VERTA OS</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center shrink-0">
            <div className="verta-glass border-verta-slate-blue/50 p-4 rounded-xl text-center min-w-[140px]">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Tiempo de Respuesta</span>
              <span className="text-xl font-black text-white font-mono">24 Horas</span>
              <span className="block text-[9px] text-verta-emerald font-semibold mt-0.5 font-mono">MÁXIMA PRIORIDAD</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE INTEGRAL VIEW MODULE */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FORM MODULE: LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          <div className="verta-glass rounded-2xl p-6 sm:p-8 shadow-2xl border border-verta-slate-blue/60 relative">
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-verta-cyan/5 rounded-full blur-xl pointer-events-none" />
            
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2 border-b border-verta-slate-blue/40 pb-3">
              <Sliders className="w-5 h-5 text-verta-cyan" />
              <span>Especificaciones de la Cotización</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              
              {/* CONTACT DETAILS GROUP */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-mono font-bold text-verta-cyan uppercase tracking-wider">1. Datos del Solicitante</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium block">Nombre Completo *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Ej. Ing. Mateo Domínguez"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-verta-navy/60 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white transition-all font-sans"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium block">Cargo / Puesto *</label>
                    <input
                      type="text"
                      name="role"
                      required
                      placeholder="Ej. Director de Tecnología / Consultor Independiente"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full bg-verta-navy/60 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium block">Empresa o Razón Social *</label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      placeholder="Ej. Corporativo Alfa S.A."
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full bg-verta-navy/60 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium block">Sitio Web o LinkedIn corporativo</label>
                    <input
                      type="url"
                      name="website"
                      placeholder="https://ejemplo.com"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full bg-verta-navy/60 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium block">Correo Electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="correo@empresa.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-verta-navy/60 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium block">Teléfono de Enlace *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+52 55 1234 5678"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-verta-navy/60 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan focus:outline-none rounded-xl px-4 py-2.5 text-xs text-white transition-all font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* SERVICES SELECTOR CHIPS GRID */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-[11px] font-mono font-bold text-verta-cyan uppercase tracking-wider">2. Soluciones e Implementaciones Requeridas</h3>
                  <span className="text-[10px] text-gray-500 font-mono">Seleccione al menos uno</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Option 1: Web Platforms */}
                  <div 
                    onClick={() => toggleService('web')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 text-left ${
                      services.web 
                        ? 'bg-verta-cyan/10 border-verta-cyan shadow-[0_0_12px_rgba(0,242,255,0.15)] ring-1 ring-verta-cyan/30' 
                        : 'bg-verta-navy/40 border-verta-slate-blue/50 hover:border-verta-cyan/30'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${services.web ? 'bg-verta-cyan text-verta-navy' : 'bg-verta-slate-blue/40 text-verta-cyan'}`}>
                      <Laptop className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-white font-sans">Plataformas Web Premium</p>
                      <p className="text-[10px] text-gray-400 mt-1 leading-relaxed font-sans">Sistemas de alto rendimiento integrales en React/Node con velocidad crítica.</p>
                    </div>
                  </div>

                  {/* Option 2: AI advanced */}
                  <div 
                    onClick={() => toggleService('ai')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 text-left ${
                      services.ai 
                        ? 'bg-verta-coral/10 border-verta-coral shadow-[0_0_12px_rgba(255,127,80,0.15)] ring-1 ring-verta-coral/30' 
                        : 'bg-verta-navy/40 border-verta-slate-blue/50 hover:border-verta-coral/30'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${services.ai ? 'bg-verta-coral text-white' : 'bg-verta-slate-blue/40 text-verta-coral'}`}>
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-white font-sans">Inteligencia Artificial</p>
                      <p className="text-[10px] text-gray-400 mt-1 leading-relaxed font-sans">Despliegue de asistentes inteligentes, modelos de lenguaje y automatización neural.</p>
                    </div>
                  </div>

                  {/* Option 3: SEO */}
                  <div 
                    onClick={() => toggleService('seo')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 text-left ${
                      services.seo 
                        ? 'bg-verta-cyan/10 border-verta-cyan shadow-[0_0_12px_rgba(0,242,255,0.15)] ring-1 ring-verta-cyan/30' 
                        : 'bg-verta-navy/40 border-verta-slate-blue/50 hover:border-verta-cyan/30'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${services.seo ? 'bg-verta-cyan text-verta-navy' : 'bg-verta-slate-blue/40 text-verta-cyan'}`}>
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-white font-sans">Posicionamiento SEO Técnico</p>
                      <p className="text-[10px] text-gray-400 mt-1 leading-relaxed font-sans">Optimización de rastreabilidad web profunda para alcanzar el top orgánico en buscadores.</p>
                    </div>
                  </div>

                  {/* Option 4: Social Media */}
                  <div 
                    onClick={() => toggleService('social')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 text-left ${
                      services.social 
                        ? 'bg-verta-coral/10 border-verta-coral shadow-[0_0_12px_rgba(255,127,80,0.15)] ring-1 ring-verta-coral/30' 
                        : 'bg-verta-navy/40 border-verta-slate-blue/50 hover:border-verta-coral/30'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${services.social ? 'bg-verta-coral text-white' : 'bg-verta-slate-blue/40 text-verta-coral'}`}>
                      <Share2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-white font-sans">Redes Sociales AI-driven</p>
                      <p className="text-[10px] text-gray-400 mt-1 leading-relaxed font-sans">Estrategia automatizada con analíticas predictivas para viralización orgánica.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* AUDIT SCOPE OPTION GROUP */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-mono font-bold text-verta-cyan uppercase tracking-wider">3. Alcance del Diagnóstico / Auditoría Inmediata</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {[
                    {
                      id: 'basica',
                      title: 'Básica Inicial',
                      desc: 'Checklist esencial de cumplimiento básico.'
                    },
                    {
                      id: 'intermedia',
                      title: 'Intermedia (Recom)',
                      desc: 'Análisis profundo de arquitectura de software y código.'
                    },
                    {
                      id: 'total',
                      title: 'Diagnóstico Total',
                      desc: 'Auditoría integral SAT, legal, cibernética con plan maestro.'
                    }
                  ].map((lvl) => (
                    <div
                      key={lvl.id}
                      onClick={() => setFormData(p => ({ ...p, auditType: lvl.id }))}
                      className={`p-4 rounded-xl border text-center relative cursor-pointer transition-all ${
                        formData.auditType === lvl.id 
                          ? 'border-verta-cyan bg-verta-cyan/10 shadow-[0_0_10px_rgba(0,242,255,0.15)]' 
                          : 'bg-verta-navy/40 border-verta-slate-blue/40 hover:border-verta-cyan/25'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block font-sans">{lvl.title}</span>
                      <span className="text-[10px] text-gray-400 block mt-1.5 font-sans">{lvl.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TEXT AREA DESCRIPTION */}
              <div className="space-y-1.5">
                <h3 className="text-[11px] font-mono font-bold text-verta-cyan uppercase tracking-wider">4. Describa brevemente su requerimiento operativo</h3>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Ej. Planiamos lanzar una nueva plataforma de automatización de nóminas y requerimos el apoyo experto de VERTA para verificar el correcto posicionamiento orgánico (SEO) e implementar un chat inteligente (IA) como interfaz de atención..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-verta-navy/60 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan focus:outline-none rounded-xl px-4 py-3 text-xs text-white transition-all font-sans leading-relaxed"
                />
              </div>

              {/* ACTION SEND BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || (!services.web && !services.ai && !services.seo && !services.social)}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-center space-x-2.5 cursor-pointer ${
                    isSubmitting
                      ? 'bg-verta-slate-blue text-gray-400 border border-verta-slate-blue'
                      : (!services.web && !services.ai && !services.seo && !services.social)
                        ? 'bg-verta-slate-blue/40 text-gray-500 border border-dashed border-verta-slate-blue/60 cursor-not-allowed'
                        : 'bg-verta-coral text-white verta-coral-btn shadow-xl hover:shadow-[0_0_20px_rgba(255,127,80,0.3)]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4.5 h-4.5 border-2 border-slate-500 border-t-white rounded-full animate-spin" />
                      <span>Validando y transmitiendo solicitud...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Enviar Solicitud de Cotización a VERTA</span>
                    </>
                  )}
                </button>
                {(!services.web && !services.ai && !services.seo && !services.social) && (
                  <p className="text-[10px] text-center text-verta-rose/80 font-mono mt-2">🚫 Seleccione al menos un servicio arriba para habilitar el envío corporativo.</p>
                )}
              </div>

            </form>
          </div>
        </div>

        {/* SIDEBAR VALUES: RIGHT COLUMN */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          
          {/* VERTA AUDIT PROCESS CARDS */}
          <div className="verta-glass border-verta-slate-blue/60 rounded-2xl p-6 space-y-5">
            <h4 className="text-xs font-mono font-bold text-verta-cyan uppercase tracking-wider flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-verta-cyan" />
              <span>EL MODELO EXPERTO DE EXCELENCIA VERTA</span>
            </h4>
            
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              Nuestros expertos no se limitan a dar asesorías abstractas; intervenimos técnicamente en su infraestructura para asegurar que obtenga resultados auditables y medibles.
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  title: 'Análisis Perimetral Previo',
                  desc: 'Analizamos el estatus fiscal de su RFC (Sello 32-D positivo) y el performance actual de su dominio web antes de iniciar la auditoría presencial o virtual.'
                },
                {
                  title: 'Ajustes Técnicos Directos',
                  desc: 'Configuración técnica bajo lineamientos de código limpio, indexación estructural SEO técnica (SiteMaps estructurados, Web Vitals idóneos) y despliegue robusto de LLM.'
                },
                {
                  title: 'Acreditación con Sello de Confianza',
                  desc: 'Una vez finalizado el ciclo de consultoría, otorgamos un Reporte de Sello de Oro que incrementa en +15 puntos su Compliance Score público.'
                }
              ].map((f, i) => (
                <div key={i} className="flex space-x-3.5 p-3 rounded-xl bg-verta-navy/40 border border-verta-slate-blue/30 text-xs">
                  <div className="w-6 h-6 rounded-full bg-verta-coral/10 border border-verta-coral/30 flex items-center justify-center font-bold text-verta-coral text-[11px] shrink-0 font-mono">
                    {i+1}
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-white font-sans">{f.title}</p>
                    <p className="text-[11px] text-gray-400 font-sans leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUCESS GUARANTEE ACCORD */}
          <div className="verta-glass border-verta-slate-blue/60 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-mono font-bold text-verta-coral uppercase tracking-wider flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-verta-coral" />
              <span>GARANTÍA DE SEGURIDAD OPERATIVA</span>
            </h4>
            
            <div className="space-y-3 text-xs text-gray-400 leading-relaxed font-sans">
              <p>
                🔒 <strong>Acuerdo de Confidencialidad (NDA):</strong> Toda la información empresarial, planes comerciales y accesos proporcionados se guardan de forma encriptada y están suscritos bajo NDA automáticos de grado ejecutivo.
              </p>
              <p>
                📊 <strong>Planes de Soporte Post-Entrega:</strong> Ofrecemos planes integrales de acompañamiento técnico de 30, 90 y 180 días con alertas y parches proactivos de seguridad tecnológica e Inteligencia Artificial.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* SUCCESS MODAL SIMULATION */}
      {showSuccessModal && submittedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl verta-glass border border-verta-cyan/30 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 text-sans">
            
            <div className="text-center space-y-2.5">
              <div className="w-14 h-14 rounded-full bg-verta-emerald/15 border border-verta-emerald/40 flex items-center justify-center mx-auto text-verta-emerald">
                <CheckCircle className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="font-bold text-xl text-white">¡Solicitud Procesada Exitosamente!</h3>
              <p className="text-xs text-slate-400 font-sans">
                Se ha generado un boleto electrónico de auditoría y se le asignó un Ingeniero Elite de VERTA.
              </p>
            </div>

            {/* Generated Ticket representation */}
            <div className="p-5 rounded-2xl bg-verta-navy border border-verta-slate-blue text-xs space-y-3 font-mono">
              <div className="flex justify-between border-b border-verta-slate-blue/30 pb-2">
                <span className="text-gray-500">TICKET ELECTRÓNICO</span>
                <span className="text-verta-cyan font-bold">#VR-AUD-{Math.floor(Math.random() * 90000 + 10000)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3.5 pt-1.5 text-gray-300">
                <div>
                  <span className="text-[10px] text-gray-500 block">SOLICITANTE</span>
                  <span className="text-white font-sans font-bold block mt-0.5">{submittedData.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">CARGO / PUESTO</span>
                  <span className="text-white font-sans block mt-0.5">{submittedData.role}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">COMPAÑÍA</span>
                  <span className="text-white font-sans font-bold block mt-0.5">{submittedData.companyName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">TELÉFONO</span>
                  <span className="text-white font-sans block mt-0.5">{submittedData.phone}</span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-verta-slate-blue/30 space-y-1">
                <span className="text-[10px] text-gray-500 block">ALCANCE ADJUDICADO</span>
                <span className="text-amber-400 font-sans font-medium block">
                  {submittedData.auditType === 'basica' && 'Básico (Cumplimiento Inicial)'}
                  {submittedData.auditType === 'intermedia' && 'Intermedio (Auditoría de Código y Performance)'}
                  {submittedData.auditType === 'total' && 'Premium Total (SAT, Legal, Ciberseguridad e Inteligencia Artificial)'}
                </span>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[10px] text-gray-500 block">SOLUCIONES ADICIONALES A EVALUAR</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {submittedData.servicesSelected.map((srv: string, i: number) => (
                    <span key={i} className="bg-verta-slate-blue/40 border border-verta-slate-blue/60 text-white text-[9px] px-2 py-0.5 rounded-full font-sans">
                      🛸 {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated verification workflow status bar */}
            <div className="bg-verta-dark-blue border border-verta-slate-blue p-4 rounded-xl text-center space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <span>ESTATUS PIPELINE</span>
                <span className="text-verta-cyan font-bold">TRANSMITIENDO A COORDINACIÓN</span>
              </div>
              
              <div className="w-full bg-verta-slate-blue/50 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-verta-cyan to-verta-coral h-full w-[45%] progress-glow rounded-full" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1">
                Socio VERTA: Un consultor validará su requerimiento en el correo <strong className="text-white">{submittedData.email}</strong> dentro del día hábil corriente para iniciar el levantamiento técnico de cotización formal.
              </p>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setFormData({
                    fullName: '',
                    role: '',
                    companyName: '',
                    email: '',
                    phone: '',
                    website: '',
                    description: '',
                    auditType: 'intermedia'
                  });
                  setServices({
                    web: false,
                    ai: false,
                    seo: false,
                    social: false
                  });
                }}
                className="px-6 py-2.5 bg-verta-cyan text-verta-navy font-bold font-mono text-xs rounded-xl hover:scale-102 hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all cursor-pointer"
              >
                Volver al Formulario
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
