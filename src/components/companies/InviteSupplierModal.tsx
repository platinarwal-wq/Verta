/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Send, 
  Building2, 
  Mail, 
  Phone, 
  User, 
  Briefcase, 
  ShieldCheck, 
  Check, 
  Info,
  Calendar,
  Layers,
  Sparkles,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { 
  SupplierJourneyItem, 
  ValidationLevelId 
} from '../../types';
import { 
  VALIDATION_LEVELS, 
  JOURNEY_CATEGORIES 
} from '../../data/companyJourneyData';

interface InviteSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvitation: (newInvitation: SupplierJourneyItem) => void;
}

export function InviteSupplierModal({ isOpen, onClose, onSendInvitation }: InviteSupplierModalProps) {
  // Form fields
  const [providerName, setProviderName] = useState('');
  const [rfc, setRfc] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactPosition, setContactPosition] = useState('');
  const [category, setCategory] = useState(JOURNEY_CATEGORIES[0]);
  const [service, setService] = useState('');
  const [validationLevel, setValidationLevel] = useState<ValidationLevelId>('estandar');
  
  // Custom requirements list initialized by selected validation level
  const [customRequirements, setCustomRequirements] = useState<string[]>(
    VALIDATION_LEVELS.find(l => l.id === 'estandar')?.defaultRequirements || []
  );

  const [paymentMode, setPaymentMode] = useState<'proveedor' | 'empresa'>('proveedor');
  const [previewTab, setPreviewTab] = useState<'formulario' | 'resumen'>('formulario');

  if (!isOpen) return null;

  // When validation level changes, update default requirements
  const handleLevelChange = (newLevel: ValidationLevelId) => {
    setValidationLevel(newLevel);
    const target = VALIDATION_LEVELS.find(l => l.id === newLevel);
    if (target) {
      setCustomRequirements([...target.defaultRequirements]);
    }
  };

  const toggleRequirement = (req: string) => {
    if (customRequirements.includes(req)) {
      setCustomRequirements(customRequirements.filter(r => r !== req));
    } else {
      setCustomRequirements([...customRequirements, req]);
    }
  };

  const handleAddNewRequirement = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = (e.target as HTMLInputElement).value.trim();
      if (val && !customRequirements.includes(val)) {
        setCustomRequirements([...customRequirements, val]);
        (e.target as HTMLInputElement).value = '';
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!providerName.trim() || !contactEmail.trim() || !service.trim()) {
      return;
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newCode = `VRT-${randomDigits}`;

    const newInvitation: SupplierJourneyItem = {
      id: `inv-${Date.now()}`,
      code: newCode,
      providerName: providerName.trim(),
      rfc: rfc.trim() ? rfc.trim().toUpperCase() : 'PENDIENTE-REGISTRO',
      contact: {
        name: contactName.trim() || 'Contacto Comercial',
        email: contactEmail.trim(),
        phone: contactPhone.trim() || 'No especificado',
        position: contactPosition.trim() || 'Representante'
      },
      category,
      service: service.trim(),
      validationLevel,
      trackingStatus: 'invitacion_enviada',
      progressPercent: 5,
      sentDate: new Date().toLocaleDateString('es-MX'),
      lastUpdate: 'Recién emitida',
      requirements: customRequirements.length > 0 
        ? customRequirements 
        : (VALIDATION_LEVELS.find(l => l.id === validationLevel)?.defaultRequirements || []),
      internalDecision: {
        decision: 'pendiente',
        notes: 'Invitación emitida. Pendiente de resolución comercial tras dictamen técnico.'
      }
    };

    onSendInvitation(newInvitation);
    onClose();
  };

  const currentLevelObj = VALIDATION_LEVELS.find(l => l.id === validationLevel) || VALIDATION_LEVELS[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-white font-sans">
      <div className="relative w-full max-w-3xl verta-glass border border-verta-cyan/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto bg-gradient-to-b from-verta-dark-blue to-verta-navy">
        
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-verta-slate-blue/40 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-verta-cyan/15 border border-verta-cyan/30 px-3 py-0.5 rounded-full text-[10px] font-mono text-verta-cyan font-bold uppercase tracking-wider">
              <UserPlus className="w-3.5 h-3.5" />
              <span>RECORRIDO DE LA EMPRESA &bull; INVITACIÓN FORMAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              Invitar a Proveedor para Homologación
            </h2>
            <p className="text-xs text-gray-300 font-sans max-w-xl">
              Especifique los datos de contacto, categoría, alcance del servicio y nivel de validación técnica requerido para activar el flujo de acreditación.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-verta-slate-blue/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TABS SWITCHER (FORMULARIO VS VISTA PREVIA) */}
        <div className="flex items-center space-x-2 border-b border-verta-slate-blue/30 pb-2">
          <button
            type="button"
            onClick={() => setPreviewTab('formulario')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
              previewTab === 'formulario'
                ? 'bg-verta-cyan text-verta-navy'
                : 'text-gray-400 hover:text-white hover:bg-verta-slate-blue/30'
            }`}
          >
            1. Formulario Estructurado
          </button>
          <button
            type="button"
            onClick={() => setPreviewTab('resumen')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
              previewTab === 'resumen'
                ? 'bg-verta-cyan text-verta-navy'
                : 'text-gray-400 hover:text-white hover:bg-verta-slate-blue/30'
            }`}
          >
            2. Vista Previa de la Invitación
          </button>
        </div>

        {previewTab === 'formulario' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* SECCIÓN 1: DATOS DE LA EMPRESA PROVEEDORA */}
            <div className="space-y-3 p-4 bg-verta-navy/50 border border-verta-slate-blue/40 rounded-2xl">
              <div className="flex items-center space-x-2 text-xs font-mono text-verta-cyan font-bold">
                <Building2 className="w-4 h-4" />
                <span>1. IDENTIFICACIÓN DEL PROVEEDOR</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-mono text-gray-300 mb-1">
                    Nombre o Razón Social del Proveedor <span className="text-verta-coral">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Soluciones Integrales de Mantenimiento S.A. de C.V."
                    value={providerName}
                    onChange={(e) => setProviderName(e.target.value)}
                    className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl px-3.5 py-2 text-white font-sans text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono text-gray-300 mb-1">
                    RFC de la Empresa (Si se conoce)
                  </label>
                  <input
                    type="text"
                    placeholder="SIM190412AB1"
                    value={rfc}
                    onChange={(e) => setRfc(e.target.value.toUpperCase())}
                    className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl px-3.5 py-2 text-white font-mono uppercase text-xs"
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN 2: CONTACTO DEL PROVEEDOR */}
            <div className="space-y-3 p-4 bg-verta-navy/50 border border-verta-slate-blue/40 rounded-2xl">
              <div className="flex items-center space-x-2 text-xs font-mono text-verta-cyan font-bold">
                <User className="w-4 h-4" />
                <span>2. DATOS DE CONTACTO DIRECTO</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-mono text-gray-300 mb-1">
                    Nombre del Contacto / Representante <span className="text-verta-coral">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Lic. Fernando Hernández Díaz"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl px-3.5 py-2 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono text-gray-300 mb-1">
                    Correo Electrónico Corporativo <span className="text-verta-coral">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="contacto@proveedor.com.mx"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl pl-9 pr-3.5 py-2 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-gray-300 mb-1">
                    Teléfono Móvil o WhatsApp de Contacto
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+52 55 1234 5678"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl pl-9 pr-3.5 py-2 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-gray-300 mb-1">
                    Cargo o Área de la Persona de Contacto
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ej. Gerente de Licitaciones / Director Comercial"
                      value={contactPosition}
                      onChange={(e) => setContactPosition(e.target.value)}
                      className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl pl-9 pr-3.5 py-2 text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN 3: CATEGORÍA Y SERVICIO ESPECÍFICO */}
            <div className="space-y-3 p-4 bg-verta-navy/50 border border-verta-slate-blue/40 rounded-2xl">
              <div className="flex items-center space-x-2 text-xs font-mono text-verta-cyan font-bold">
                <Layers className="w-4 h-4" />
                <span>3. CATEGORÍA Y SERVICIO ESPECÍFICO REQUERIDO</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-mono text-gray-300 mb-1">
                    Categoría Industrial o Comercial <span className="text-verta-coral">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl px-3.5 py-2 text-white text-xs"
                  >
                    {JOURNEY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-gray-300 mb-1">
                    Servicio Específico Requerido / Alcance a Contratar <span className="text-verta-coral">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Describa el servicio exacto. Ej: Suministro de personal técnico de mantenimiento electromecánico para líneas de producción 1 y 2 con turnos rotativos."
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-verta-dark-blue border border-verta-slate-blue focus:border-verta-cyan focus:outline-none rounded-xl px-3.5 py-2 text-white text-xs leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN 4: NIVEL DE VALIDACIÓN REQUERIDO */}
            <div className="space-y-3 p-4 bg-verta-navy/50 border border-verta-slate-blue/40 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-verta-cyan font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>4. NIVEL DE VALIDACIÓN TÉCNICA REQUERIDO</span>
                </div>
                <span className="text-[11px] font-mono text-gray-400">
                  Seleccione el estándar aplicable al riesgo
                </span>
              </div>

              {/* LEVEL SELECTOR CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {VALIDATION_LEVELS.map((lvl) => {
                  const isSelected = validationLevel === lvl.id;
                  return (
                    <div
                      key={lvl.id}
                      onClick={() => handleLevelChange(lvl.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? 'bg-verta-cyan/15 border-verta-cyan shadow-lg text-white'
                          : 'bg-verta-dark-blue/60 border-verta-slate-blue/40 hover:border-verta-slate-blue text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-verta-cyan text-verta-navy' : 'bg-verta-navy text-gray-400 border border-verta-slate-blue/40'
                        }`}>
                          {lvl.badge}
                        </span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-verta-cyan border-verta-cyan text-verta-navy' : 'border-gray-500'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <h4 className="font-bold text-xs text-white leading-tight">{lvl.name}</h4>
                      <p className="text-[11px] text-gray-400 leading-snug">{lvl.targetScope}</p>
                      
                      <div className="pt-1.5 border-t border-verta-slate-blue/30 text-[10px] text-gray-400 font-mono">
                        <span className="text-verta-cyan font-semibold">Idóneo para:</span> {lvl.recommendedFor}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* REQUIREMENTS CUSTOMIZER */}
              <div className="mt-4 pt-3 border-t border-verta-slate-blue/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-gray-300 font-bold">
                    Requisitos Documentales Configurados para este Proveedor:
                  </label>
                  <span className="text-[10px] font-mono text-verta-cyan">
                    {customRequirements.length} requisitos seleccionados
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentLevelObj.defaultRequirements.map((req, idx) => {
                    const isChecked = customRequirements.includes(req);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => toggleRequirement(req)}
                        className={`text-left p-2 rounded-lg border text-[11px] font-mono flex items-center space-x-2 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-verta-cyan/15 border-verta-cyan/60 text-white font-medium'
                            : 'bg-verta-navy/30 border-verta-slate-blue/40 text-gray-400 hover:text-white'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-verta-cyan border-verta-cyan text-verta-navy' : 'border-gray-500'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span className="truncate">{req}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Input to add ad-hoc custom requirement */}
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="+ Presione Enter para agregar un requisito adicional específico (Ej. Póliza ambiental)..."
                    onKeyDown={handleAddNewRequirement}
                    className="w-full bg-verta-dark-blue border border-verta-slate-blue/70 focus:border-verta-cyan focus:outline-none rounded-xl px-3 py-2 text-[11px] text-white font-mono placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN 5: MODALIDAD DE CUOTA / COBERTURA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-verta-navy/40 border border-verta-slate-blue/40 rounded-2xl text-xs font-mono">
              <div className="space-y-0.5">
                <span className="text-gray-300 font-bold">Cuota de Trámite de Homologación:</span>
                <p className="text-[11px] text-gray-400 font-sans">
                  ¿Quién cubrirá el costo del peritaje y emisión de dictamen de VERTA?
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setPaymentMode('proveedor')}
                  className={`px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    paymentMode === 'proveedor'
                      ? 'bg-verta-cyan/20 border-verta-cyan text-verta-cyan font-bold'
                      : 'border-verta-slate-blue/50 text-gray-400 hover:text-white'
                  }`}
                >
                  Cubierto por el Proveedor
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode('empresa')}
                  className={`px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    paymentMode === 'empresa'
                      ? 'bg-verta-cyan/20 border-verta-cyan text-verta-cyan font-bold'
                      : 'border-verta-slate-blue/50 text-gray-400 hover:text-white'
                  }`}
                >
                  Patrocinado por Nuestra Empresa
                </button>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="pt-3 border-t border-verta-slate-blue/40 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPreviewTab('resumen')}
                className="text-xs font-mono text-verta-cyan hover:text-white flex items-center space-x-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ver resumen antes de enviar</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs text-gray-400 hover:text-white font-mono cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-verta-cyan to-indigo-600 hover:from-verta-cyan/95 hover:to-indigo-500 text-verta-navy font-mono font-extrabold text-xs rounded-xl flex items-center space-x-2 shadow-xl cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4 text-verta-navy" />
                  <span>Emitir Invitación Formal</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* TAB 2: VISTA PREVIA RESUMEN */
          <div className="space-y-5 animate-fade-in text-xs">
            <div className="p-5 bg-verta-navy/80 border border-verta-cyan/30 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-verta-slate-blue/40 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-verta-cyan uppercase font-bold tracking-wider">
                    RESUMEN DE LA REQUISICIÓN DE HOMOLOGACIÓN
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {providerName || 'Nombre de Proveedor No Especificado'}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">RFC: {rfc || 'Pendiente de registrar'}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-verta-cyan/15 border border-verta-cyan/30 text-verta-cyan font-mono text-[10px] font-bold uppercase">
                  {currentLevelObj.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-gray-400 font-mono text-[11px] block">Contacto Notificado:</span>
                  <p className="text-white font-bold">{contactName || 'No indicado'}</p>
                  <p className="text-gray-300 font-mono">{contactEmail || 'correo@proveedor.com'}</p>
                  <p className="text-gray-400 font-mono">{contactPhone || 'Sin teléfono'}</p>
                  <p className="text-verta-cyan text-[11px]">{contactPosition || 'Cargo no especificado'}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 font-mono text-[11px] block">Detalles del Servicio:</span>
                  <p className="text-verta-cyan font-bold">{category}</p>
                  <p className="text-gray-200 leading-relaxed font-sans">{service || 'Sin descripción detallada del servicio aún.'}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-verta-slate-blue/30 space-y-2">
                <span className="text-gray-400 font-mono text-[11px] block">
                  Requisitos a Exigir ({customRequirements.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {customRequirements.map((r, i) => (
                    <span key={i} className="inline-flex items-center space-x-1 text-[10px] font-mono bg-verta-dark-blue border border-verta-slate-blue/50 px-2 py-1 rounded-lg text-gray-300">
                      <Check className="w-3 h-3 text-verta-emerald" />
                      <span>{r}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start space-x-2.5 text-[11px] text-gray-300">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Al emitir esta invitación, el proveedor recibirá un correo con su enlace y código único cifrado para dar comienzo al Recorrido de Homologación VERTA.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setPreviewTab('formulario')}
                className="px-4 py-2 bg-verta-navy hover:bg-verta-slate-blue/40 border border-verta-slate-blue/50 text-gray-300 rounded-xl font-mono text-xs cursor-pointer"
              >
                &larr; Volver al formulario para editar
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-gradient-to-r from-verta-cyan to-indigo-600 hover:from-verta-cyan/95 hover:to-indigo-500 text-verta-navy font-mono font-extrabold text-xs rounded-xl flex items-center space-x-2 shadow-xl cursor-pointer"
              >
                <Send className="w-4 h-4 text-verta-navy" />
                <span>Confirmar y Emitir Invitación</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
