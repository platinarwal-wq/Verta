/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  Building2, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRightLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  FileText, 
  Download, 
  Eye, 
  AlertCircle, 
  Sparkles, 
  Send, 
  FileCheck, 
  FileCheck2,
  Clock, 
  Scale, 
  Sliders, 
  UserCheck, 
  ShieldAlert,
  Fingerprint,
  FileCode,
  Check
} from 'lucide-react';
import { VerifiedCompany, InformationAccessLevel, StandardValidationStatus } from '../types';
import { ACCESS_LEVEL_DEFINITIONS } from '../data/accessLevels';
import { ValidationStatusBadge } from './ValidationStatusBadge';
import { ConcreteChecksList } from './ConcreteChecksList';
import { ValidationStatusContextModal } from './ValidationStatusContextModal';
import { METHODOLOGY_SUSPENSION_STATEMENT, STANDARDIZED_VALIDATION_STATUSES } from '../data/validationStatusContext';

interface CompanyProfileModalProps {
  company: VerifiedCompany;
  currentLevel: InformationAccessLevel;
  onLevelChange: (level: InformationAccessLevel) => void;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: (companyId: string) => void;
  isInComparator?: boolean;
  onToggleCompare?: (company: VerifiedCompany) => void;
  onOpenComparator?: () => void;
}

export function CompanyProfileModal({
  company,
  currentLevel,
  onLevelChange,
  onClose,
  isSaved = false,
  onToggleSave,
  isInComparator = false,
  onToggleCompare,
  onOpenComparator
}: CompanyProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'servicios' | 'reporte' | 'evidencias' | 'expediente_verta'>('general');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactService, setContactService] = useState(company.services[0] || 'Servicios Generales');
  const [contactSent, setContactSent] = useState(false);
  const [simulatedAuditAction, setSimulatedAuditAction] = useState<string | null>(null);
  const [showStatusContextModal, setShowStatusContextModal] = useState(false);

  const activeDef = ACCESS_LEVEL_DEFINITIONS[currentLevel];

  // Access check flags
  const canInteract = currentLevel !== 'visitante_publico';
  const canViewDetailedReport = currentLevel === 'empresa_autorizada' || currentLevel === 'verta';
  const canViewEvidences = currentLevel === 'empresa_autorizada' || currentLevel === 'verta';
  const isVertaInternal = currentLevel === 'verta';

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setShowContactForm(false);
      setContactMessage('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-4xl verta-glass border border-verta-slate-blue/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER WITH LEVEL SELECTOR DOCK */}
        <div className="bg-verta-dark-blue/90 border-b border-verta-slate-blue/40 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3.5">
              <div className={`w-12 h-12 rounded-2xl ${company.logoColor} flex items-center justify-center font-bold text-lg tracking-tight shadow-md ring-2 ring-white/10 shrink-0`}>
                {company.logoLetters}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-verta-cyan uppercase font-bold tracking-wider">
                    {company.sector}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-[11px] font-mono text-gray-400">
                    RFC: {company.rfc}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white font-sans leading-tight">
                  {company.name}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-3 self-end sm:self-auto">
              {/* Quick Level Pill Switcher inside Modal */}
              <div className="flex items-center bg-verta-navy/90 border border-verta-slate-blue/50 p-1 rounded-xl text-xs font-mono">
                <span className="text-gray-400 text-[10px] px-2 hidden md:inline">Nivel activo:</span>
                {(['visitante_publico', 'empresa_registrada', 'empresa_autorizada', 'verta'] as InformationAccessLevel[]).map((lvl) => {
                  const isSelected = currentLevel === lvl;
                  const labelMap: Record<InformationAccessLevel, string> = {
                    visitante_publico: 'Público',
                    empresa_registrada: 'Registrada',
                    empresa_autorizada: 'Autorizada',
                    verta: 'VERTA'
                  };
                  return (
                    <button
                      key={lvl}
                      onClick={() => onLevelChange(lvl)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        isSelected
                          ? lvl === 'visitante_publico' ? 'bg-verta-cyan text-verta-navy' :
                            lvl === 'empresa_registrada' ? 'bg-blue-500 text-white' :
                            lvl === 'empresa_autorizada' ? 'bg-emerald-500 text-white' :
                            'bg-verta-coral text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      title={ACCESS_LEVEL_DEFINITIONS[lvl].shortDesc}
                    >
                      {labelMap[lvl]}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-verta-slate-blue/40 rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ACTIVE LEVEL BANNER STRIP */}
          <div className="mt-3 pt-2.5 border-t border-verta-slate-blue/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${activeDef.color}`}>
                {activeDef.badge}
              </span>
              <span className="text-gray-300 text-[11px] font-sans">
                {activeDef.shortDesc}
              </span>
            </div>

            {/* Verification & Validity status */}
            <div className="flex items-center space-x-3 text-[11px]">
              <span className="flex items-center space-x-1 text-verta-emerald">
                <CheckCircle2 className="w-3.5 h-3.5 text-verta-emerald inline" />
                <span className="font-bold">{company.status}</span>
              </span>
              <span className="text-gray-400">Vigencia: <strong className="text-white font-mono">{company.validityDate}</strong></span>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS WITH ACCESS LEVEL LOCKS */}
        <div className="flex border-b border-verta-slate-blue/40 bg-verta-navy/40 px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 px-4 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'general'
                ? 'border-verta-cyan text-verta-cyan bg-verta-cyan/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>1. Datos Generales & Cobertura</span>
          </button>

          <button
            onClick={() => setActiveTab('servicios')}
            className={`py-3 px-4 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'servicios'
                ? 'border-verta-cyan text-verta-cyan bg-verta-cyan/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>2. Portafolio de Servicios</span>
          </button>

          <button
            onClick={() => setActiveTab('reporte')}
            className={`py-3 px-4 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'reporte'
                ? 'border-verta-cyan text-verta-cyan bg-verta-cyan/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {canViewDetailedReport ? (
              <FileCheck className="w-3.5 h-3.5 text-verta-emerald" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-gray-500" />
            )}
            <span>3. Reporte Detallado</span>
            {!canViewDetailedReport && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-verta-slate-blue/50 text-gray-400">Nivel 3+</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('evidencias')}
            className={`py-3 px-4 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'evidencias'
                ? 'border-verta-cyan text-verta-cyan bg-verta-cyan/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {canViewEvidences ? (
              <FileText className="w-3.5 h-3.5 text-verta-emerald" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-gray-500" />
            )}
            <span>4. Evidencias Documentales</span>
            {!canViewEvidences && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-verta-slate-blue/50 text-gray-400">Nivel 3+</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('expediente_verta')}
            className={`py-3 px-4 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'expediente_verta'
                ? 'border-verta-coral text-verta-coral bg-verta-coral/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {isVertaInternal ? (
              <ShieldCheck className="w-3.5 h-3.5 text-verta-coral" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-gray-500" />
            )}
            <span>5. Expediente Integral VERTA</span>
            {!isVertaInternal && (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-verta-coral/20 text-verta-coral border border-verta-coral/30">Nivel 4</span>
            )}
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar">
          
          {/* TAB 1: DATOS GENERALES & COBERTURA (Visible for all levels) */}
          {activeTab === 'general' && (
            <div className="space-y-6 animate-fade-in">
              {/* Corporate Identity & Validation Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <h3 className="text-xs font-mono font-bold text-verta-cyan uppercase tracking-wider">
                    Datos Generales de la Persona Moral
                  </h3>
                  <div className="verta-glass border-verta-slate-blue/40 p-4 rounded-2xl space-y-3 bg-verta-navy/40">
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                      {company.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono border-t border-verta-slate-blue/30 text-gray-300">
                      <div>
                        <span className="text-gray-500 block text-[10px]">Razón Social Completa:</span>
                        <span className="font-bold text-white font-sans">{company.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[10px]">RFC Homologado:</span>
                        <span className="font-bold text-verta-cyan">{company.rfc}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[10px]">Representante Legal Acreditado:</span>
                        <span className="font-bold text-white font-sans">{company.legalRepresentative || 'Apoderado General Notariado'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[10px]">Escala y Plantilla Laboral:</span>
                        <span className="font-bold text-white">{company.employees}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Seal Card */}
                <div className="verta-glass border-verta-cyan/30 p-4 rounded-2xl space-y-3 bg-verta-cyan/5 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-verta-cyan">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="font-bold font-mono text-xs uppercase">Estatus de Validación</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-verta-navy text-gray-400 border border-verta-slate-blue/40">
                        Score Suspendido
                      </span>
                    </div>

                    <div>
                      <ValidationStatusBadge
                        status={company.validationStatus}
                        companyName={company.name}
                        size="md"
                      />
                    </div>

                    <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                      Estatus estandarizado con base en cotejo directo ante fuentes oficiales (SAT, IMSS, RPC y DOF).
                    </p>

                    <button
                      onClick={() => setShowStatusContextModal(true)}
                      className="w-full py-1.5 px-2 bg-verta-cyan/15 hover:bg-verta-cyan/25 text-verta-cyan rounded-lg text-[11px] font-mono font-bold flex items-center justify-center space-x-1.5 transition-all border border-verta-cyan/30 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Ver Significado, Faltantes, Riesgo & Acciones</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-verta-cyan/20 space-y-1 text-[10px] font-mono text-gray-400">
                    <div className="flex justify-between">
                      <span>Acreditado el:</span>
                      <strong className="text-white">{company.verificationDate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Vigencia hasta:</span>
                      <strong className="text-verta-emerald">{company.validityDate}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geographic Coverage */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-verta-cyan" />
                  <span>Cobertura Geográfica y Sedes Operativas</span>
                </h3>

                <div className="verta-glass border-verta-slate-blue/40 p-4 rounded-2xl space-y-3 bg-verta-navy/40 text-xs">
                  <div className="flex items-start space-x-3">
                    <div className="w-7 h-7 rounded-lg bg-verta-cyan/15 flex items-center justify-center text-verta-cyan shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-gray-400 uppercase">Alcance Territorial</span>
                      <p className="font-semibold text-white font-sans text-sm">{company.coverage}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-verta-slate-blue/30 text-xs font-mono">
                    <div>
                      <span className="text-gray-500 block text-[10px]">Sede Matriz y Domicilio Fiscal:</span>
                      <span className="text-gray-300 font-sans">{company.headquarters}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px]">Estado / Región Base:</span>
                      <span className="text-white font-bold">{company.region}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* LEVEL 2 ACTIONS BAR: GUARDAR, COMPARAR, CONTACTAR */}
              <div className="p-4 rounded-2xl border border-verta-slate-blue/50 bg-verta-dark-blue/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      Acciones para Empresas Registradas
                    </span>
                  </div>
                  {!canInteract && (
                    <span className="text-[10px] font-mono text-verta-coral bg-verta-coral/10 border border-verta-coral/30 px-2 py-0.5 rounded">
                      Requiere Nivel 2: Empresa Registrada
                    </span>
                  )}
                </div>

                {canInteract ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {onToggleSave && (
                      <button
                        onClick={() => onToggleSave(company.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-verta-emerald text-white shadow-md'
                            : 'bg-verta-slate-blue/40 text-gray-300 hover:text-white hover:bg-verta-slate-blue/70 border border-verta-slate-blue/60'
                        }`}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4 text-blue-400" />}
                        <span>{isSaved ? 'Perfil Guardado en Favoritos' : 'Guardar Perfil'}</span>
                      </button>
                    )}

                    {onToggleCompare && (
                      <button
                        onClick={() => onToggleCompare(company)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                          isInComparator
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-verta-slate-blue/40 text-gray-300 hover:text-white hover:bg-verta-slate-blue/70 border border-verta-slate-blue/60'
                        }`}
                      >
                        <ArrowRightLeft className="w-4 h-4 text-blue-400" />
                        <span>{isInComparator ? 'En Comparador (Quitar)' : 'Comparar Proveedor'}</span>
                      </button>
                    )}

                    {isInComparator && onOpenComparator && (
                      <button
                        onClick={onOpenComparator}
                        className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-verta-cyan/20 text-verta-cyan border border-verta-cyan/40 hover:bg-verta-cyan/30 flex items-center space-x-1.5 cursor-pointer"
                      >
                        <span>Abrir Comparador &rarr;</span>
                      </button>
                    )}

                    <button
                      onClick={() => setShowContactForm(true)}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-blue-500 to-verta-cobalt text-white hover:from-blue-600 hover:to-verta-cobalt/90 shadow-md flex items-center space-x-2 cursor-pointer ml-auto"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Solicitar Contacto Directo</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-verta-navy/60 rounded-xl border border-dashed border-verta-slate-blue/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <p className="text-gray-400 font-sans">
                      Como <strong>Visitante público</strong>, visualiza los datos generales. Para <strong>guardar perfiles, comparar proveedores y solicitar contacto directo</strong>, active el nivel de <strong>Empresa registrada</strong>.
                    </p>
                    <button
                      onClick={() => onLevelChange('empresa_registrada')}
                      className="px-3.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-mono font-bold text-xs rounded-lg transition-all cursor-pointer shrink-0"
                    >
                      Activar Empresa Registrada
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PORTAFOLIO DE SERVICIOS */}
          {activeTab === 'servicios' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <span className="text-xs font-mono font-bold text-verta-cyan uppercase tracking-wider block">
                  Capacidades y Especialidades Técnicas
                </span>
                <h3 className="text-base font-bold text-white font-sans">
                  Servicios Acreditados y Portafolio Oficial
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {company.services.map((srv, idx) => (
                  <div key={idx} className="p-4 rounded-xl verta-glass border border-verta-slate-blue/40 hover:border-verta-cyan/30 transition-all flex items-start space-x-3 bg-verta-navy/40">
                    <div className="w-6 h-6 rounded-md bg-verta-cyan/15 text-verta-cyan font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white font-sans">{srv}</p>
                      <span className="text-[10px] font-mono text-verta-emerald block mt-1">
                        ✓ Verificado en Objeto Social & Facturación
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Solicitar cotización de un servicio específico */}
              {canInteract && (
                <div className="p-4 rounded-xl bg-verta-navy/60 border border-verta-slate-blue/40 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <p className="font-bold text-white">¿Interesado en contratar alguno de estos servicios?</p>
                    <p className="text-gray-400 font-sans">Envíe una requisición oficial mediante el canal cifrado de VERTA.</p>
                  </div>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="px-4 py-2 bg-verta-cyan text-verta-navy font-mono font-bold text-xs rounded-xl hover:bg-verta-cyan/90 transition-all cursor-pointer"
                  >
                    Cotizar Servicio
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REPORTE DETALLADO (Nivel 3: Empresa Autorizada & Nivel 4: VERTA) */}
          {activeTab === 'reporte' && (
            <div className="space-y-6 animate-fade-in">
              {!canViewDetailedReport ? (
                /* Restricción para Visitante Público y Empresa Registrada */
                <div className="verta-glass border border-dashed border-verta-coral/40 p-8 rounded-3xl text-center space-y-4 max-w-xl mx-auto my-6">
                  <div className="w-14 h-14 rounded-2xl bg-verta-coral/15 border border-verta-coral/40 flex items-center justify-center text-verta-coral mx-auto">
                    <Lock className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white font-sans">
                      Reporte Detallado Restringido (Nivel 3 Requerido)
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      El informe analítico con desglose punto a punto de las 5 dimensiones normativas (Fiscal, Legal, Laboral, Financiera y PLD) está reservado para <strong>Empresas Autorizadas</strong> con legitimación o relación contractual activa.
                    </p>
                  </div>

                  <div className="p-3 bg-verta-navy/60 rounded-xl border border-verta-slate-blue/40 text-[11px] font-mono text-gray-400 text-left space-y-1">
                    <span className="text-white font-bold block">Cómo desbloquear este reporte:</span>
                    <span>1. Estar registrado como Empresa Contratante.</span><br />
                    <span>2. Solicitar autorización de acceso al proveedor o emitir una invitación formal.</span>
                  </div>

                  <button
                    onClick={() => onLevelChange('empresa_autorizada')}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-mono font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg"
                  >
                    Simular Acceso como "Empresa Autorizada"
                  </button>
                </div>
              ) : (
                /* Contenido Desbloqueado para Empresa Autorizada y VERTA */
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-verta-slate-blue/40 pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-verta-emerald uppercase tracking-wider flex items-center space-x-1.5">
                        <FileCheck className="w-4 h-4 text-verta-emerald" />
                        <span>DICTAMEN ANALÍTICO FORMAL - ACCESO AUTORIZADO</span>
                      </span>
                      <h3 className="text-base font-bold text-white font-sans">
                        Reporte de Evaluación por 5 Dimensiones Normativas
                      </h3>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono text-gray-400">Identificador de Dictamen:</span>
                      <span className="font-mono text-xs font-bold text-white bg-verta-navy px-2.5 py-1 rounded border border-verta-slate-blue/40">
                        VRT-REP-2026-0981
                      </span>
                    </div>
                  </div>

                  {/* 5 Dimensions Qualitative Verification Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {[
                      { 
                        title: '1. Fiscal-Tributaria', 
                        statusText: 'Situación fiscal validada',
                        statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
                        authority: 'SAT (Art. 32-D & CSF)',
                        desc: 'Opinión positiva sin omisiones, CFDI de ingresos vigentes y declaraciones provisionales pagadas.' 
                      },
                      { 
                        title: '2. Legal-Societaria', 
                        statusText: 'Constitución comprobada',
                        statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
                        authority: 'RPC & Fe Pública',
                        desc: 'Estatutos sociales al corriente, poderes de pleitos y cobranzas inscritos en el FME.' 
                      },
                      { 
                        title: '3. Laboral & IMSS', 
                        statusText: 'Cumplimiento patronal',
                        statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
                        authority: 'IMSS, INFONAVIT & REPSE',
                        desc: 'Cédula REPSE refrendada, prima de riesgo actualizada y sin créditos patronales firmes.' 
                      },
                      { 
                        title: '4. Capacidad Financiera', 
                        statusText: 'Operación comprobada',
                        statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
                        authority: 'Comprobante Domicilio & Bancaria',
                        desc: 'Inmueble fiscal visitado con CFDI <90d y titularidad bancaria con cuenta CLABE validada.' 
                      },
                      { 
                        title: '5. Prevención PLD', 
                        statusText: 'Cero coincidencias 69-B',
                        statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
                        authority: 'DOF Art. 69-B & Listas',
                        desc: 'Auditoría negativa en listas definitivas de factureros EFOS/EDOS del SAT y beneficiario controlador.' 
                      }
                    ].map((dim, idx) => (
                      <div key={idx} className="verta-glass border-verta-slate-blue/40 p-4 rounded-xl space-y-2 bg-verta-navy/40 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-gray-400 block">{dim.authority}</span>
                          <h4 className="font-bold text-white text-xs font-sans mt-0.5">{dim.title}</h4>
                        </div>
                        <div className="my-2">
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-mono font-bold border ${dim.statusColor}`}>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{dim.statusText}</span>
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-300 font-sans leading-relaxed">
                          {dim.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Concrete Checks Matrix */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-2">
                        <FileCheck2 className="w-4 h-4 text-emerald-400" />
                        <span>Badges de Verificación Objetiva Comprobada (Sin Scores Abstractos)</span>
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {company.concreteChecks.filter(c => c.verified).length} de {company.concreteChecks.length} Convalidados
                      </span>
                    </div>
                    <ConcreteChecksList checks={company.concreteChecks} layout="grid" />
                  </div>

                  {/* Summary evaluation box */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-verta-emerald font-bold font-mono text-xs uppercase">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Dictamen Favorable de Acreditación Integral</span>
                      </div>
                      <p className="text-gray-300">
                        La empresa <strong>{company.name}</strong> cumple satisfactoriamente con la matriz de requerimientos normativos corporativos sin presentar focos de riesgo fiscal o laboral.
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Descargando Dictamen_Conformidad_${company.rfc}.pdf con sello criptográfico SHA-256.`)}
                      className="px-4 py-2 bg-verta-navy hover:bg-verta-slate-blue/60 text-white font-mono text-xs font-bold rounded-xl border border-verta-slate-blue flex items-center space-x-2 shrink-0 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-verta-cyan" />
                      <span>Descargar Reporte PDF</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: EVIDENCIAS DOCUMENTALES PERMITIDAS (Nivel 3: Empresa Autorizada & Nivel 4: VERTA) */}
          {activeTab === 'evidencias' && (
            <div className="space-y-6 animate-fade-in">
              {!canViewEvidences ? (
                /* Candado para niveles inferiores */
                <div className="verta-glass border border-dashed border-verta-coral/40 p-8 rounded-3xl text-center space-y-4 max-w-xl mx-auto my-6">
                  <div className="w-14 h-14 rounded-2xl bg-verta-coral/15 border border-verta-coral/40 flex items-center justify-center text-verta-coral mx-auto">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white font-sans">
                      Evidencias Documentales Protegidas por Secreto Corporativo
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      Los archivos oficiales (SAT 32-D, CSF, REPSE y comprobantes) contienen datos fiscales y bancarios sensibles. Solo son accesibles para <strong>Empresas Autorizadas</strong> que cuenten con permiso formal o invitación de proveeduría.
                    </p>
                  </div>

                  <button
                    onClick={() => onLevelChange('empresa_autorizada')}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-mono font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg"
                  >
                    Activar Nivel "Empresa Autorizada" para ver Evidencias
                  </button>
                </div>
              ) : (
                /* Evidencias permitidas para Empresa Autorizada y VERTA */
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-verta-slate-blue/40 pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-verta-emerald uppercase tracking-wider flex items-center space-x-1.5">
                        <FileText className="w-4 h-4 text-verta-emerald" />
                        <span>EXPEDIENTE DOCUMENTAL AUTORIZADO</span>
                      </span>
                      <h3 className="text-base font-bold text-white font-sans">
                        Evidencias Legales y Fiscales con Marca de Agua de Seguridad
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 bg-verta-navy px-3 py-1 rounded-full border border-verta-slate-blue/40">
                      MARCA DE AGUA: USO EXCLUSIVO CONTRATANTE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {company.authorizedEvidences && company.authorizedEvidences.length > 0 ? (
                      company.authorizedEvidences.map((ev) => (
                        <div key={ev.id} className="p-4 rounded-xl verta-glass border border-verta-slate-blue/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-verta-navy/40 hover:border-verta-cyan/30 transition-all text-xs">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-verta-cyan/15 border border-verta-cyan/30 text-verta-cyan flex items-center justify-center shrink-0 mt-0.5">
                              <FileCheck2 className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-bold text-white font-sans text-xs sm:text-sm">{ev.name}</p>
                              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-gray-400">
                                <span className="text-verta-cyan">{ev.authority}</span>
                                <span>&bull;</span>
                                <span>{ev.type}</span>
                                <span>&bull;</span>
                                <span>Tam: {ev.fileSize}</span>
                              </div>
                              <span className="text-[9px] font-mono text-gray-500 block">
                                Sello Digital de Inalterabilidad: {ev.validationHash}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                            <button
                              onClick={() => alert(`Visualizando documento verificado "${ev.name}" con marca de agua digital VERTA y sello de tiempo.`)}
                              className="px-3 py-1.5 bg-verta-navy hover:bg-verta-slate-blue/60 text-gray-300 hover:text-white rounded-lg border border-verta-slate-blue/60 font-mono text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-verta-cyan" />
                              <span>Visualizar</span>
                            </button>
                            <button
                              onClick={() => alert(`Descargando copia certificada de "${ev.name}" autorizada para auditoría interna.`)}
                              className="px-3 py-1.5 bg-verta-cyan/15 hover:bg-verta-cyan/25 text-verta-cyan rounded-lg border border-verta-cyan/40 font-mono text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Descargar</span>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">No hay evidencias registradas en este perfil.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EXPEDIENTE INTEGRAL VERTA (Nivel 4: VERTA Exclusivo) */}
          {activeTab === 'expediente_verta' && (
            <div className="space-y-6 animate-fade-in">
              {!isVertaInternal ? (
                /* Bloqueo estricto para niveles no-VERTA */
                <div className="verta-glass border border-dashed border-verta-coral/50 p-8 rounded-3xl text-center space-y-4 max-w-xl mx-auto my-6">
                  <div className="w-14 h-14 rounded-2xl bg-verta-coral/15 border border-verta-coral/40 flex items-center justify-center text-verta-coral mx-auto">
                    <Lock className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white font-sans">
                      Expediente Integral Reservado Exclusivamente para el Proceso de Validación
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      Este módulo contiene la <strong>bitácora de trabajo de auditoría forense</strong>, hashes SHA-256 de archivos brutos, folios notariales sin ofuscar, biométricos del representante legal y notas colegiadas confidenciales entre auditores de VERTA.
                    </p>
                  </div>

                  <div className="p-3 bg-verta-navy/60 rounded-xl border border-verta-slate-blue/40 text-[11px] font-mono text-gray-400 text-left space-y-1">
                    <span className="text-verta-coral font-bold block">🔒 CLÁUSULA DE CONFIDENCIALIDAD:</span>
                    <span>El expediente integral de validación no se comparte con empresas contratantes ni terceros para resguardar la privacidad estricta del proveedor y la imparcialidad del dictamen técnico.</span>
                  </div>

                  <button
                    onClick={() => onLevelChange('verta')}
                    className="px-5 py-2.5 bg-verta-coral hover:bg-verta-coral/90 text-white font-mono font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg"
                  >
                    Activar Nivel "VERTA (Mesa de Validación)"
                  </button>
                </div>
              ) : (
                /* Consola Interna de Auditoría VERTA */
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-verta-slate-blue/40 pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-verta-coral uppercase tracking-wider flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-verta-coral" />
                        <span>MESA DE AUDITORÍA & VALIDACIÓN TÉCNICA VERTA</span>
                      </span>
                      <h3 className="text-base font-bold text-white font-sans">
                        Expediente Forense Reservado de Validación Colegiada
                      </h3>
                    </div>

                    <span className="text-xs font-mono text-verta-coral bg-verta-coral/15 border border-verta-coral/40 px-3 py-1 rounded-full font-bold">
                      MODO AUDITOR ACTIVO
                    </span>
                  </div>

                  {company.vertaAuditDossier && (
                    <div className="space-y-5">
                      {/* Registro Notarial & Conexión Gubernamental */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                        <div className="p-4 rounded-xl bg-verta-navy/80 border border-verta-slate-blue/40 space-y-2">
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">
                            Registro Público del Comercio (RPC) & Fe Pública
                          </span>
                          <div>
                            <span className="text-gray-500 block">Folio Mercantil Electrónico:</span>
                            <span className="text-verta-cyan font-bold">{company.vertaAuditDossier.fme}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Notario y Distrito:</span>
                            <span className="text-white font-sans">{company.vertaAuditDossier.notaryPublic}</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-verta-navy/80 border border-verta-slate-blue/40 space-y-2">
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">
                            Cruce Automatizado SAT & Listas Negras CFF 69-B
                          </span>
                          <div>
                            <span className="text-gray-500 block">Conexión WebService SAT:</span>
                            <span className="text-gray-300">{company.vertaAuditDossier.satVerificationTimestamp}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Estatus DOF 69-B:</span>
                            <span className="text-verta-emerald font-bold">{company.vertaAuditDossier.dof69bCheck}</span>
                          </div>
                        </div>
                      </div>

                      {/* Hashes Criptográficos de Archivos Originales */}
                      <div className="p-4 rounded-xl bg-verta-dark-blue/80 border border-verta-slate-blue/50 space-y-3">
                        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-gray-300">
                          <Fingerprint className="w-4 h-4 text-verta-cyan" />
                          <span>TRAZABILIDAD CRIPTOGRÁFICA DE ARCHIVOS BRUTOS (SHA-256)</span>
                        </div>

                        <div className="space-y-2 text-[11px] font-mono">
                          {company.vertaAuditDossier.rawDocumentHashes.map((item, idx) => (
                            <div key={idx} className="p-2.5 rounded-lg bg-verta-navy/50 border border-verta-slate-blue/30 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <span className="text-white font-sans">{item.doc}</span>
                              <span className="text-verta-cyan text-[10px] break-all">{item.sha256}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cédula de Notas Confidenciales del Auditor */}
                      <div className="p-4 rounded-xl bg-verta-coral/5 border border-verta-coral/25 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-verta-coral uppercase text-xs">
                            Bitácora de Observaciones y Conclusiones del Auditor
                          </span>
                          <span className="text-[11px] font-mono text-gray-400">
                            Auditor Asignado: <strong className="text-white">{company.vertaAuditDossier.auditorInCharge}</strong>
                          </span>
                        </div>

                        <ul className="space-y-1.5 text-gray-300 font-sans text-xs">
                          {company.vertaAuditDossier.internalAuditorNotes.map((note, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-verta-coral shrink-0">•</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-2 border-t border-verta-coral/20 font-mono text-xs">
                          <span className="text-gray-400">Dictamen Final Registrado: </span>
                          <strong className="text-verta-emerald">{company.vertaAuditDossier.lastAuditConclusion}</strong>
                        </div>
                      </div>

                      {/* Herramientas de Validación y Acción de Auditor */}
                      <div className="p-4 rounded-xl bg-verta-navy/90 border border-verta-slate-blue/50 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs font-mono text-gray-300">
                          <span>Acciones de Mesa de Validación:</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSimulatedAuditAction('Se emitió Dictamen de Conformidad y se timbró con e.firma')}
                            className="px-3 py-1.5 bg-verta-emerald text-white font-mono font-bold text-xs rounded-lg hover:bg-verta-emerald/90 transition-all cursor-pointer flex items-center space-x-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Aprobar y Timbrar Dictamen</span>
                          </button>
                          <button
                            onClick={() => setSimulatedAuditAction('Se generó Cédula de Prevención para subsanación en 5 días hábiles')}
                            className="px-3 py-1.5 bg-verta-coral/20 text-verta-coral hover:bg-verta-coral/30 border border-verta-coral/40 font-mono font-bold text-xs rounded-lg transition-all cursor-pointer"
                          >
                            <span>Emitir Prevención</span>
                          </button>
                        </div>
                      </div>

                      {simulatedAuditAction && (
                        <div className="p-3 bg-verta-cyan/15 border border-verta-cyan/40 rounded-xl text-xs font-mono text-verta-cyan flex items-center space-x-2 animate-fade-in">
                          <Sparkles className="w-4 h-4 shrink-0" />
                          <span>{simulatedAuditAction}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* MODAL FORMULARIO DE CONTACTO (Nivel 2+) */}
          {showContactForm && (
            <div className="p-5 rounded-2xl bg-verta-dark-blue border border-blue-500/40 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-verta-slate-blue/40 pb-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <h4 className="text-sm font-bold text-white font-sans">
                    Solicitar Contacto Oficial a {company.name}
                  </h4>
                </div>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-white text-xs font-mono cursor-pointer"
                >
                  Cancelar
                </button>
              </div>

              {contactSent ? (
                <div className="p-4 bg-verta-emerald/15 border border-verta-emerald/40 rounded-xl text-xs font-mono text-verta-emerald flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="font-bold">¡Solicitud de Contacto Transmitida!</p>
                    <p className="text-[11px] text-gray-300 font-sans">
                      El representante de <strong>{company.name}</strong> ha recibido su requerimiento vía el canal seguro de VERTA.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendContact} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-gray-300 font-mono">Servicio de Interés</label>
                    <select
                      value={contactService}
                      onChange={(e) => setContactService(e.target.value)}
                      className="w-full bg-verta-navy border border-verta-slate-blue/60 rounded-xl px-3 py-2 text-white text-xs focus:border-verta-cyan focus:outline-none"
                    >
                      {company.services.map((s, i) => (
                        <option key={i} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 font-mono">Mensaje o Requerimiento Formal</label>
                    <textarea
                      required
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describa brevemente el alcance del proyecto, fechas tentativas y requerimientos específicos..."
                      className="w-full bg-verta-navy border border-verta-slate-blue/60 rounded-xl p-3 text-white text-xs focus:border-verta-cyan focus:outline-none font-sans"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="px-3 py-1.5 bg-verta-slate-blue/40 text-gray-300 rounded-lg text-xs font-mono hover:text-white cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-mono font-bold text-xs rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Enviar Solicitud</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-3.5 bg-verta-navy/95 border-t border-verta-slate-blue/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3 text-gray-400 font-mono text-[11px]">
            <span>Nivel actual: <strong className="text-white">{activeDef.name}</strong></span>
            <span>&bull;</span>
            <span className="text-gray-500">ID: {company.id}</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-verta-slate-blue/50 text-gray-300 hover:text-white rounded-xl font-mono text-xs font-semibold hover:bg-verta-slate-blue transition-all cursor-pointer self-end sm:self-auto"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>

      {/* DETAILED VALIDATION STATUS CONTEXT MODAL */}
      <ValidationStatusContextModal
        status={company.validationStatus}
        companyName={company.name}
        isOpen={showStatusContextModal}
        onClose={() => setShowStatusContextModal(false)}
      />
    </div>
  );
}
