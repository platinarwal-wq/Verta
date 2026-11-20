/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  FileCheck2, 
  Layers, 
  Lock, 
  LogIn, 
  UserPlus, 
  Briefcase, 
  FileText, 
  Activity, 
  Scale, 
  Database,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  X,
  HelpCircle,
  BookOpen,
  Package
} from 'lucide-react';
import { VertaSystemCover } from '../VertaSystemCover';
import { MethodologySection } from '../MethodologySection';
import { AccessLevelsSection } from '../AccessLevelsSection';
import { PullDirectory } from '../PullDirectory';
import { ConsultantsDirectory } from '../ConsultantsDirectory';
import { IsoDirectory } from '../IsoDirectory';
import { InformationAccessLevel } from '../../types';

interface PublicPortalProps {
  onNavigateToCompanies: () => void;
  onNavigateToProviders: () => void;
  onOpenConsultantContact?: () => void;
  onOpenTutorial?: () => void;
  onOpenPackages?: () => void;
  onOpenLogin?: () => void;
}

export function PublicPortal({
  onNavigateToCompanies,
  onNavigateToProviders,
  onOpenConsultantContact,
  onOpenTutorial,
  onOpenPackages,
  onOpenLogin
}: PublicPortalProps) {
  const [activeDirectoryTab, setActiveDirectoryTab] = useState<'proveedores' | 'consultores' | 'iso'>('proveedores');
  const [directoryAccessLevel, setDirectoryAccessLevel] = useState<InformationAccessLevel>('visitante_publico');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authRole, setAuthRole] = useState<'empresa' | 'proveedor'>('empresa');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAuthModal(false);
    if (authRole === 'empresa') {
      onNavigateToCompanies();
    } else {
      onNavigateToProviders();
    }
  };

  return (
    <div className="relative min-h-screen text-white font-sans space-y-16 pb-16">
      
      {/* 1. PORTADA DEL SISTEMA CON IMAGEN VERTA Y NODOS DE LUZ ANIMADOS */}
      <section className="w-full">
        <VertaSystemCover />
      </section>

      {/* TOP VALUE PROPOSITION BANNER */}
      <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-verta-cyan/15 to-verta-cobalt/15 border border-verta-cyan/40 px-4 py-1.5 rounded-full text-xs font-mono text-verta-cyan">
          <Sparkles className="w-3.5 h-3.5 text-verta-cyan" />
          <span className="font-semibold tracking-wider uppercase">VALIDACIÓN Y ESTRUCTURACIÓN DE INFORMACIÓN CORPORATIVA</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Certeza documental y fiscal para respaldar decisiones de contratación
        </h1>

        <p className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Transformamos la dispersión documental en expedientes corporativos auditados, estructurados y permanentemente convalidados contra fuentes oficiales.
        </p>

        {/* ACCESS DOCK BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onNavigateToCompanies}
            className="px-6 py-3.5 bg-gradient-to-r from-verta-cyan to-verta-cobalt hover:from-verta-cyan/90 hover:to-verta-cobalt/90 text-verta-navy font-mono font-bold text-xs sm:text-sm rounded-xl flex items-center space-x-2 shadow-xl shadow-verta-cyan/20 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <Building2 className="w-4 h-4 text-verta-navy" />
            <span>Entrar como Empresa Contratante</span>
            <ArrowRight className="w-4 h-4 text-verta-navy" />
          </button>

          <button
            onClick={onNavigateToProviders}
            className="px-6 py-3.5 bg-gradient-to-r from-verta-coral to-amber-600 hover:from-verta-coral/90 hover:to-amber-500 text-white font-mono font-bold text-xs sm:text-sm rounded-xl flex items-center space-x-2 shadow-xl shadow-verta-coral/20 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Entrar como Proveedor / Consultor</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenLogin ? onOpenLogin() : setShowAuthModal(true)}
            className="px-5 py-3.5 bg-gradient-to-r from-verta-cobalt/80 to-indigo-600/80 hover:brightness-110 border border-cyan-400/40 text-white font-mono font-bold text-xs sm:text-sm rounded-xl flex items-center space-x-2 cursor-pointer transition-all shadow-lg shadow-verta-cyan/15 group"
          >
            <LogIn className="w-4 h-4 text-verta-cyan group-hover:translate-x-0.5 transition-transform" />
            <span>Acceso con Credenciales</span>
          </button>

          {onOpenPackages && (
            <button
              id="btn-public-portal-paquetes"
              onClick={onOpenPackages}
              className="px-5 py-3.5 bg-verta-coral/15 hover:bg-verta-coral/25 border border-verta-coral/50 text-verta-coral font-mono font-bold text-xs sm:text-sm rounded-xl flex items-center space-x-2 cursor-pointer transition-all shadow-md whitespace-nowrap"
              title="Conocer los paquetes Base, Medium y Premium y seleccionar servicios"
            >
              <Package className="w-4 h-4 text-verta-coral shrink-0" />
              <span>Paquetes</span>
            </button>
          )}

          {onOpenTutorial && (
            <button
              id="btn-public-portal-tutorial"
              onClick={onOpenTutorial}
              className="px-5 py-3.5 bg-verta-cyan/15 hover:bg-verta-cyan/25 border border-verta-cyan/50 text-verta-cyan font-mono font-bold text-xs sm:text-sm rounded-xl flex items-center space-x-2 cursor-pointer transition-all shadow-md group whitespace-nowrap"
              title="Explicación paso a paso de cómo funciona el sistema VERTA"
            >
              <HelpCircle className="w-4 h-4 text-verta-cyan group-hover:rotate-12 transition-transform shrink-0" />
              <span>Tutorial Paso a Paso</span>
            </button>
          )}
        </div>

        {/* 4 PRECONFIGURED USERS FAST ACCESS BAR */}
        {onOpenLogin && (
          <div className="pt-2 max-w-4xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-verta-dark-blue/90 via-[#0d162f]/90 to-verta-dark-blue/90 border border-verta-slate-blue/50 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-gray-300">
                  Perfiles Activos: <strong className="text-white">Héctor</strong> • <strong className="text-white">Adrián</strong> • <strong className="text-white">Carmen</strong> • <strong className="text-white">David</strong>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={onOpenLogin}
                  className="px-3 py-1 bg-verta-cyan/20 hover:bg-verta-cyan/30 text-verta-cyan font-mono font-bold rounded-lg border border-verta-cyan/40 transition-all cursor-pointer flex items-center space-x-1"
                >
                  <span>Abrir Login</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. EXPLICACIÓN DEL MODELO */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-verta-cyan font-bold block">
            Arquitectura del Sistema
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            ¿Cómo funciona el modelo VERTA?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
            Un ciclo estructurado de 4 etapas que erradica la opacidad y agiliza las contrataciones corporativas sin fricción.
          </p>
          {onOpenTutorial && (
            <div className="pt-1">
              <button
                onClick={onOpenTutorial}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-verta-cyan/15 border border-verta-cyan/40 text-verta-cyan text-xs font-mono font-bold hover:bg-verta-cyan/25 transition-all cursor-pointer shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Abrir Tutorial Interactivo Completo</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="verta-glass border border-verta-slate-blue/40 p-5 rounded-2xl space-y-3 bg-verta-dark-blue/40">
            <span className="text-xs font-mono text-verta-cyan font-bold block">PASO 01</span>
            <h3 className="font-bold text-base text-white">Integración Documental</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              El proveedor sube su expediente normativo estructurado (SAT 32-D, CSF, Acta Constitutiva, Poderes e IMSS) en un checklist guiado con validación OCR inmediata.
            </p>
          </div>

          <div className="verta-glass border border-verta-slate-blue/40 p-5 rounded-2xl space-y-3 bg-verta-dark-blue/40">
            <span className="text-xs font-mono text-verta-cyan font-bold block">PASO 02</span>
            <h3 className="font-bold text-base text-white">Cotejo Gubernamental</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              El motor cruza en tiempo real las fuentes directas del SAT, listas del Artículo 69-B del CFF, IMSS e INFONAVIT para verificar autenticidad y vigencia estricta.
            </p>
          </div>

          <div className="verta-glass border border-verta-slate-blue/40 p-5 rounded-2xl space-y-3 bg-verta-dark-blue/40">
            <span className="text-xs font-mono text-verta-cyan font-bold block">PASO 03</span>
            <h3 className="font-bold text-base text-white">Auditoría Colegiada</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Auditores legales y fiscalistas revisan facultades societarias y congruencia operativa, emitiendo un Dictamen de Conformidad Normativa timbrado digitalmente.
            </p>
          </div>

          <div className="verta-glass border border-verta-slate-blue/40 p-5 rounded-2xl space-y-3 bg-verta-dark-blue/40">
            <span className="text-xs font-mono text-verta-cyan font-bold block">PASO 04</span>
            <h3 className="font-bold text-base text-white">Disponibilidad & Alertas</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              El expediente queda habilitado para consulta de contratantes o en el Directorio Pull, con alertas automáticas de caducidad antes de cumplir los 30 días.
            </p>
          </div>
        </div>
      </section>

      {/* 3. BENEFICIOS CLAVE */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-verta-coral font-bold block">
            Propuesta de Valor
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Beneficios para cada participante del ecosistema
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Para Empresas */}
          <div className="verta-glass border border-verta-cyan/40 p-6 sm:p-8 rounded-3xl space-y-5 bg-verta-dark-blue/60">
            <div className="flex items-center space-x-3 border-b border-verta-slate-blue/40 pb-4">
              <div className="w-10 h-10 rounded-xl bg-verta-cyan/15 border border-verta-cyan/40 flex items-center justify-center text-verta-cyan">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-verta-cyan uppercase font-bold">Empresas Contratantes</span>
                <h3 className="text-lg font-bold text-white">Control, Seguridad y Certeza Contractual</h3>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-verta-cyan shrink-0 mt-0.5" />
                <span><strong>Blindaje contra EFOS/EDOS:</strong> Monitoreo diario contra publicaciones del SAT (DOF Art. 69-B) asegurando la deducibilidad de facturas.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-verta-cyan shrink-0 mt-0.5" />
                <span><strong>Cumplimiento REPSE & Laboral:</strong> Verificación de no adeudos obrero-patronales ante IMSS e INFONAVIT para descartar responsabilidad solidaria.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-verta-cyan shrink-0 mt-0.5" />
                <span><strong>Agilidad de Homologación:</strong> Reduzca de semanas a horas el alta y aprobación técnica de proveedores.</span>
              </li>
            </ul>

            <button
              onClick={onNavigateToCompanies}
              className="w-full py-2.5 bg-verta-cyan/20 hover:bg-verta-cyan/30 text-verta-cyan border border-verta-cyan/40 font-mono text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>Acceder al Área de Empresas</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Para Proveedores */}
          <div className="verta-glass border border-verta-coral/40 p-6 sm:p-8 rounded-3xl space-y-5 bg-verta-dark-blue/60">
            <div className="flex items-center space-x-3 border-b border-verta-slate-blue/40 pb-4">
              <div className="w-10 h-10 rounded-xl bg-verta-coral/15 border border-verta-coral/40 flex items-center justify-center text-verta-coral">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-verta-coral uppercase font-bold">Proveedores & Consultores</span>
                <h3 className="text-lg font-bold text-white">Acreditación Formal y Crecimiento Comercial</h3>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-verta-coral shrink-0 mt-0.5" />
                <span><strong>Expediente Único Reutilizable:</strong> Deje de reunir y enviar los mismos documentos por correo a cada cliente nuevo.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-verta-coral shrink-0 mt-0.5" />
                <span><strong>Aceleración de Pagos:</strong> Al cumplir con las políticas de control interno de los contratantes, se eliminan retrasos administrativos de cobranza.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-verta-coral shrink-0 mt-0.5" />
                <span><strong>Presencia en Directorio Pull:</strong> Posicione su empresa ante compradores corporativos que buscan proveedores verificados.</span>
              </li>
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={onNavigateToProviders}
                className="w-full py-2.5 bg-verta-coral/20 hover:bg-verta-coral/30 text-verta-coral border border-verta-coral/40 font-mono text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Área de Proveedores</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              {onOpenPackages && (
                <button
                  onClick={onOpenPackages}
                  className="w-full py-2.5 bg-verta-navy/80 hover:bg-verta-navy text-white border border-verta-coral/40 font-mono text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Package className="w-4 h-4 text-verta-coral" />
                  <span>Ver Paquetes</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. METODOLOGÍA Y DATOS METODOLÓGICOS REALES (NO CLAIMS FICTICIOS) */}
      <section className="w-full px-4">
        <MethodologySection />
      </section>

      {/* 5. ARQUITECTURA DE SEGURIDAD: 4 NIVELES DE ACCESO A LA INFORMACIÓN */}
      <section className="w-full px-4">
        <AccessLevelsSection
          onExploreDirectoryWithLevel={(lvl) => {
            setActiveDirectoryTab('proveedores');
            setDirectoryAccessLevel(lvl);
            const el = document.getElementById('directorio-publico');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      </section>

      {/* 6. BUSCADOR & DIRECTORIO PÚBLICO INTEGRADO */}
      <section id="directorio-publico" className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-verta-cyan font-bold block">
            Acceso Abierto al Ecosistema
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Buscador y Directorios Públicos
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
            Explore el catálogo de empresas con expedientes estructurados, la red de consultores colegiados y los lineamientos de auditoría ISO.
          </p>
        </div>

        {/* Directory Sub-navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-verta-slate-blue/40 pb-3">
          <button
            onClick={() => setActiveDirectoryTab('proveedores')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeDirectoryTab === 'proveedores'
                ? 'bg-verta-cyan text-verta-navy shadow-lg font-extrabold'
                : 'bg-verta-navy/50 text-gray-400 hover:text-white border border-verta-slate-blue/30'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Directorio Pull de Proveedores</span>
          </button>

          <button
            onClick={() => setActiveDirectoryTab('consultores')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeDirectoryTab === 'consultores'
                ? 'bg-indigo-400 text-verta-navy shadow-lg font-extrabold'
                : 'bg-verta-navy/50 text-gray-400 hover:text-white border border-verta-slate-blue/30'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Directorio de Consultores</span>
          </button>

          <button
            onClick={() => setActiveDirectoryTab('iso')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              activeDirectoryTab === 'iso'
                ? 'bg-emerald-400 text-verta-navy shadow-lg font-extrabold'
                : 'bg-verta-navy/50 text-gray-400 hover:text-white border border-verta-slate-blue/30'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Auditoría Certificada ISO 9000</span>
          </button>
        </div>

        {/* Directory View Container */}
        <div className="pt-2">
          {activeDirectoryTab === 'proveedores' && (
            <PullDirectory
              initialAccessLevel={directoryAccessLevel}
              onSelectCompany={(company) => {
                // When selecting a company from public directory, offer to view in corporate portal
                onNavigateToCompanies();
              }}
              onClose={() => {}}
            />
          )}

          {activeDirectoryTab === 'consultores' && (
            <ConsultantsDirectory
              onSelectConsultant={() => {
                if (onOpenConsultantContact) onOpenConsultantContact();
              }}
              onClose={() => {}}
            />
          )}

          {activeDirectoryTab === 'iso' && (
            <IsoDirectory
              onClose={() => {}}
            />
          )}
        </div>
      </section>

      {/* 6. MODAL DE REGISTRO / INICIO DE SESIÓN */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md verta-glass border border-verta-cyan/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-verta-slate-blue/40 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-verta-cyan uppercase font-bold">PORTAL UNIFICADO VERTA</span>
                <h3 className="text-xl font-bold text-white font-display">Inicio de Sesión y Registro</h3>
                <p className="text-xs text-gray-400">Seleccione el ambiente al que desea acceder</p>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="p-1 text-gray-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-verta-navy rounded-xl border border-verta-slate-blue/50">
              <button
                type="button"
                onClick={() => setAuthRole('empresa')}
                className={`py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  authRole === 'empresa' ? 'bg-verta-cyan text-verta-navy shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Empresa</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthRole('proveedor')}
                className={`py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  authRole === 'proveedor' ? 'bg-verta-coral text-white shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Proveedor</span>
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-gray-300 font-mono">Correo Corporativo</label>
                <input
                  type="email"
                  required
                  defaultValue={authRole === 'empresa' ? 'compras@metropoli.mx' : 'contacto@alfa-tecnologia.com.mx'}
                  className="w-full bg-verta-navy border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl px-3.5 py-2 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-mono">Contraseña de Acceso</label>
                <input
                  type="password"
                  required
                  defaultValue="••••••••••••"
                  className="w-full bg-verta-navy border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl px-3.5 py-2 text-white text-xs"
                />
              </div>

              <div className="p-3 bg-verta-navy/50 rounded-xl border border-verta-slate-blue/30 text-[11px] text-gray-400 font-mono">
                {authRole === 'empresa'
                  ? 'Accederá al Área Privada de Empresas con gestión de invitaciones, seguimiento y consulta de expedientes.'
                  : 'Accederá al Área Privada de Proveedores con onboarding, checklist de carga y gestión de vigencias.'}
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-mono font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                  authRole === 'empresa'
                    ? 'bg-verta-cyan text-verta-navy hover:bg-verta-cyan/90'
                    : 'bg-verta-coral text-white hover:bg-verta-coral/90'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Ingresar al Área {authRole === 'empresa' ? 'de Empresas' : 'de Proveedores'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
