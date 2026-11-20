/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle, 
  Globe, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck2, 
  ArrowRightLeft, 
  Layers, 
  Sparkles, 
  Search, 
  Scale, 
  AlertTriangle, 
  Users, 
  CheckCircle, 
  Clock, 
  FileText, 
  Briefcase, 
  Eye, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { PlatformEnvironment } from './Header';

interface SystemTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateEnvironment?: (env: PlatformEnvironment) => void;
  initialStep?: number;
}

interface TutorialStep {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  summary: string;
  actionLabel?: string;
  actionEnv?: PlatformEnvironment;
  roleTips: {
    empresas: string;
    proveedores: string;
  };
  keyPoints: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

export function SystemTutorialModal({
  isOpen,
  onClose,
  onNavigateEnvironment,
  initialStep = 1
}: SystemTutorialModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStep - 1);
  const [activePerspective, setActivePerspective] = useState<'general' | 'empresa' | 'proveedor'>('general');

  // Handle escape key to close and arrows for navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentStepIndex((prev) => Math.min(prev + 1, tutorialSteps.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Reset to initial step when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(Math.max(0, Math.min(initialStep - 1, tutorialSteps.length - 1)));
    }
  }, [isOpen, initialStep]);

  if (!isOpen) return null;

  const tutorialSteps: TutorialStep[] = [
    {
      id: 1,
      title: '¿Qué es VERTA y qué problema resuelve?',
      subtitle: 'Ecosistema de estructuración y homologación de proveedores con evidencia auditable',
      badge: 'Paso 1: Fundamentos',
      badgeColor: 'bg-verta-cyan/20 text-verta-cyan border-verta-cyan/40',
      icon: <Sparkles className="w-5 h-5 text-verta-cyan" />,
      summary: 'VERTA transforma la verificación de proveedores en México: sustituye la recopilación manual y discrecional de papeles por un sistema de convalidación automática ante fuentes primarias oficiales (SAT, IMSS, Registro Público de Comercio y DOF).',
      roleTips: {
        empresas: 'Blindaje fiscal absoluto ante el Artículo 69-B del CFF (empresas facturadoras de operaciones simuladas) y multas laborales por incumplimientos REPSE.',
        proveedores: 'Expediente digital único que le permite calificar de forma inmediata a licitaciones y contratos corporativos sin reescribir documentación cada mes.'
      },
      keyPoints: [
        {
          title: 'Auditoría en 5 Dimensiones Normativas',
          description: 'Fiscal (SAT), Legal-Societaria (RPC/FME), Laboral (IMSS/REPSE), Operativa-Financiera (Domicilio y Bancaria) y Prevención PLD (Listas 69-B).',
          icon: <Layers className="w-4 h-4 text-verta-cyan" />
        },
        {
          title: 'Cotejo Directo ante Fuentes Primarias',
          description: 'No aceptamos documentos modificados o desactualizados. Cada cédula se valida contra bases de datos públicas gubernamentales.',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        },
        {
          title: 'Trazabilidad y Seguridad Jurídica',
          description: 'Generación de dictámenes con sello de tiempo, bitácora de auditoría y respaldo formal descargable para auditorías externas o del SAT.',
          icon: <FileCheck2 className="w-4 h-4 text-blue-400" />
        }
      ]
    },
    {
      id: 2,
      title: 'Los 3 Ambientes de la Plataforma',
      subtitle: 'Espacios independientes diseñados para cada perfil operativo',
      badge: 'Paso 2: Arquitectura',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      summary: 'La plataforma se divide en 3 ambientes especializados a los que puede acceder y alternar en cualquier momento desde la barra superior de navegación:',
      actionLabel: 'Ver Sitio Público',
      actionEnv: 'publico',
      roleTips: {
        empresas: 'Acceda al Área Empresas para gestionar contrataciones, consultar dictámenes detallados y comparar alternativas.',
        proveedores: 'Acceda al Área Proveedores para consultar qué documentos requieren actualización y responder a observaciones del auditor.'
      },
      keyPoints: [
        {
          title: '1. Sitio Público (Portal General)',
          description: 'Directorio PULL de consulta pública clasificado por sector y estatus, sección de metodología, niveles de información y registro abierto.',
          icon: <Globe className="w-4 h-4 text-verta-cyan" />
        },
        {
          title: '2. Área Privada para Empresas Contratantes',
          description: 'Panel para directores de compras y compliance: matriz de homologación, envío de convocatorias / RFQs y expedientes de proveedores.',
          icon: <Building2 className="w-4 h-4 text-blue-400" />
        },
        {
          title: '3. Área Privada para Proveedores y Consultores',
          description: 'Panel operativo: buzón de carga de constancias, semáforo de vigencias (30/60/90 días), resolución de comentarios y dictamen oficial.',
          icon: <ShieldCheck className="w-4 h-4 text-verta-coral" />
        }
      ]
    },
    {
      id: 3,
      title: 'Metodología & Los 6 Estados de Validación',
      subtitle: 'Rigor técnico: Por qué se suspendió el score numérico abstracto',
      badge: 'Paso 3: Criterios',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      icon: <Scale className="w-5 h-5 text-emerald-400" />,
      summary: 'Un puntaje abstracto (ej. "88 pts") genera falsa seguridad y no especifica qué falta legalmente. VERTA evalúa mediante 6 estados normativos estandarizados sustentados en evidencia documental primaria.',
      roleTips: {
        empresas: 'Cada estado le indica exactamente qué riesgo asume su empresa al contratar y qué cláusula contractual o retención procede.',
        proveedores: 'El sistema le muestra con claridad la acción concreta requerida para pasar de "Información pendiente" a "Validado".'
      },
      keyPoints: [
        {
          title: '1. Validado (Verde)',
          description: 'Expediente completo, 5 dimensiones en regla, opinión 32-D positiva, REPSE vigente y cero coincidencias en listas del SAT.',
          icon: <CheckCircle className="w-4 h-4 text-emerald-400" />
        },
        {
          title: '2. Validado con Observaciones (Ámbar)',
          description: 'Cumple criterios de fondo pero presenta áreas menores subsanables (ej. comprobante con 75 días o póliza próxima a renovar).',
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />
        },
        {
          title: '3. Información Pendiente (Azul)',
          description: 'El proveedor ha iniciado su expediente y está en proceso de entrega o cotejo ante fuentes oficiales.',
          icon: <Clock className="w-4 h-4 text-blue-400" />
        },
        {
          title: '4. Actualización Requerida (Cyan)',
          description: 'El dictamen fue favorable pero alguna cédula mensual (ej. Opinión 32-D o SUA IMSS) ha superado su vigencia de 30 días.',
          icon: <FileText className="w-4 h-4 text-cyan-400" />
        },
        {
          title: '5. No Cumple (Rojo) & 6. Validación Vencida (Gris)',
          description: 'Identificación de adeudos fiscales firmes o inconsistencia legal grave, o expiración anual del dictamen sin renovación.',
          icon: <X className="w-4 h-4 text-rose-400" />
        }
      ]
    },
    {
      id: 4,
      title: 'Directorio PULL, Filtros & Comparador',
      subtitle: 'Localice proveedores homologados y compare evidencias frente a frente',
      badge: 'Paso 4: Exploración',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
      icon: <Search className="w-5 h-5 text-purple-400" />,
      summary: 'El Directorio PULL clasifica a los proveedores por especialidad técnica, entidad federativa y estatus de cumplimiento, permitiendo auditoría inmediata sin llamadas ni correos.',
      actionLabel: 'Ir al Directorio',
      actionEnv: 'publico',
      roleTips: {
        empresas: 'Seleccione hasta 4 proveedores y presione "Comparar" para revisar en tabla comparativa su estatus tributario, REPSE y dictamen legal.',
        proveedores: 'Al mantener su expediente validado, su empresa aparece destacada en los primeros resultados de búsqueda para compradores corporativos.'
      },
      keyPoints: [
        {
          title: 'Filtros por Estado Estandarizado',
          description: 'Filtre instantáneamente proveedores con estatus "Validado", "Validado con observaciones" o en trámite para convocatorias inmediatas.',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />
        },
        {
          title: 'Comparador Multicriterio Directo',
          description: 'Analice fortalezas, coberturas geográficas, capacidad operativa y badges concretos de verificación entre candidatos.',
          icon: <ArrowRightLeft className="w-4 h-4 text-blue-400" />
        },
        {
          title: '4 Niveles de Acceso a Información',
          description: 'Desde datos generales públicos (Nivel 1), pasando por dictamen de compliance (Nivel 2), hasta conexión de negocios con datos de contacto (Nivel 4).',
          icon: <Layers className="w-4 h-4 text-verta-cyan" />
        }
      ]
    },
    {
      id: 5,
      title: 'Expediente Documental y Proceso de Carga',
      subtitle: 'Cómo los proveedores entregan, validan y actualizan sus requisitos',
      badge: 'Paso 5: Operación',
      badgeColor: 'bg-verta-coral/20 text-verta-coral border-verta-coral/40',
      icon: <FileCheck2 className="w-5 h-5 text-verta-coral" />,
      summary: 'El Área de Proveedores proporciona una interfaz amigable e intuitiva para cargar documentos oficiales, visualizar observaciones del auditor y mantener el estatus al día.',
      actionLabel: 'Explorar Área Proveedores',
      actionEnv: 'proveedores',
      roleTips: {
        empresas: 'En el Área Empresas puede solicitar ampliación de requisitos o formular observaciones de cumplimiento con un solo clic.',
        proveedores: 'Arrastre sus archivos PDF. El sistema le notificará si algún documento requiere refrendo 15 días antes de vencer.'
      },
      keyPoints: [
        {
          title: 'Carga Asistida con Drag & Drop',
          description: 'Subida de Opinión 32-D, Constancia de Situación Fiscal, Acta Constitutiva, REPSE, Recibo de Luz/Agua e Identificaciones oficiales.',
          icon: <FileText className="w-4 h-4 text-verta-cyan" />
        },
        {
          title: 'Auditoría en Tiempo Real con Comentarios',
          description: 'Si una cédula presenta observaciones (ej. código QR ilegible o falta de hoja 2), el auditor señala el motivo puntual para rápida corrección.',
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />
        },
        {
          title: 'Generación de Dictamen Descargable',
          description: 'Con el expediente al 100%, se emite el informe de convalidación con folio oficial y fecha de vigencia para compartir con sus clientes.',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        }
      ]
    },
    {
      id: 6,
      title: 'Red de Consultores & Acompañamiento',
      subtitle: 'Asesoría especializada para alcanzar el estatus de convalidación',
      badge: 'Paso 6: Estructuración',
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
      icon: <Briefcase className="w-5 h-5 text-indigo-400" />,
      summary: 'Si una empresa o proveedor presenta adeudos tributarios, litigios societarios o necesita certificar procesos (ISO 9001, 27001, 37001), VERTA integra una red de consultores acreditados.',
      roleTips: {
        empresas: 'Recomiende a sus proveedores estratégicos con observaciones que reciban asistencia técnica para no darlos de baja de su padrón.',
        proveedores: 'Contacte a un especialista legal, fiscal o laboral directamente desde el directorio para subsanar causales de no cumplimiento.'
      },
      keyPoints: [
        {
          title: 'Especialistas Fiscales y de Defensa',
          description: 'Aclaración de créditos fiscales, solicitudes de condonación de multas y desvirtuación de presunciones del Art. 69-B del CFF.',
          icon: <Scale className="w-4 h-4 text-blue-400" />
        },
        {
          title: 'Gestoría Laboral y Cédulas REPSE',
          description: 'Regularización patronal ante IMSS/INFONAVIT, contratos de servicios especializados y renovación cuatrimestral de declaraciones ICSOE/SISUB.',
          icon: <Users className="w-4 h-4 text-emerald-400" />
        },
        {
          title: 'Implementación de Normas ISO & Compliance',
          description: 'Acompañamiento en sistemas de gestión antisoborno (ISO 37001), calidad operativa (ISO 9001) y seguridad de la información (ISO 27001).',
          icon: <ShieldCheck className="w-4 h-4 text-verta-coral" />
        }
      ]
    }
  ];

  const currentStep = tutorialSteps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-verta-dark-blue/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* CARD CONTAINER */}
      <div 
        id="system-tutorial-modal-card"
        className="w-full max-w-4xl bg-verta-dark-blue border border-verta-cyan/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
      >
        
        {/* HEADER */}
        <div className="px-5 sm:px-8 py-4 bg-verta-navy/90 border-b border-verta-slate-blue/50 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-verta-cyan/15 border border-verta-cyan/40 flex items-center justify-center text-verta-cyan shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-mono font-bold text-sm sm:text-base">
                  Tutorial del Sistema VERTA
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-verta-cyan/15 text-verta-cyan text-[10px] font-mono font-bold border border-verta-cyan/30">
                  Guía Paso a Paso
                </span>
              </div>
              <p className="text-xs text-gray-400 font-sans">
                Aprenda cómo operar, convalidar y mitigar riesgos en la plataforma
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-verta-slate-blue/50 transition-colors cursor-pointer"
            title="Cerrar tutorial (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEPPER PROGRESS BAR & STEP CHIPS */}
        <div className="px-5 sm:px-8 pt-4 pb-3 bg-verta-navy/50 border-b border-verta-slate-blue/30 space-y-2.5">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-verta-slate-blue/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-verta-cyan via-blue-500 to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${((currentStepIndex + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>

          {/* Stepper Tabs */}
          <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
            {tutorialSteps.map((s, idx) => {
              const isActive = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap text-[11px] font-semibold ${
                    isActive
                      ? 'bg-verta-cyan text-verta-navy font-bold shadow-md'
                      : isPast
                      ? 'bg-verta-navy/80 text-emerald-400 hover:text-white border border-emerald-500/30'
                      : 'bg-verta-dark-blue/70 text-gray-400 hover:text-gray-200 border border-verta-slate-blue/30'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-verta-navy text-verta-cyan' : isPast ? 'bg-emerald-500/20 text-emerald-400' : 'bg-verta-slate-blue/40 text-gray-400'
                  }`}>
                    {s.id}
                  </span>
                  <span className="hidden md:inline">{s.title.split(' ')[0]} {s.title.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PERSPECTIVE SELECTOR (ROL) */}
        <div className="px-5 sm:px-8 py-2 bg-verta-dark-blue/90 border-b border-verta-slate-blue/20 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2 text-gray-400 font-mono text-[11px]">
            <span>Filtrar enfoque por rol:</span>
          </div>
          <div className="flex items-center space-x-1.5 font-mono text-[11px]">
            <button
              onClick={() => setActivePerspective('general')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activePerspective === 'general'
                  ? 'bg-verta-cyan/20 text-verta-cyan font-bold border border-verta-cyan/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Visión General
            </button>
            <button
              onClick={() => setActivePerspective('empresa')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activePerspective === 'empresa'
                  ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Soy Empresa Compradora
            </button>
            <button
              onClick={() => setActivePerspective('proveedor')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activePerspective === 'proveedor'
                  ? 'bg-verta-coral/20 text-verta-coral font-bold border border-verta-coral/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Soy Proveedor
            </button>
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE CONTENT) */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm font-sans">
          
          {/* STEP HEADER */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${currentStep.badgeColor}`}>
                {currentStep.badge}
              </span>
              <span className="text-gray-400 font-mono text-xs">
                Paso {currentStep.id} de {tutorialSteps.length}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight flex items-center space-x-2">
              <span>{currentStep.title}</span>
            </h3>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
              {currentStep.subtitle}
            </p>
          </div>

          {/* SUMMARY HIGHLIGHT BOX */}
          <div className="p-4 rounded-xl bg-verta-navy/80 border border-verta-slate-blue/60 text-xs sm:text-sm text-gray-200 leading-relaxed space-y-2">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-verta-cyan/15 text-verta-cyan shrink-0 mt-0.5">
                {currentStep.icon}
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-verta-cyan uppercase">
                  Concepto Clave
                </span>
                <p className="text-gray-300">
                  {currentStep.summary}
                </p>
              </div>
            </div>
          </div>

          {/* PERSPECTIVE / ROLE TIP CARD */}
          {activePerspective !== 'general' && (
            <div className={`p-3.5 rounded-xl border text-xs font-sans animate-fade-in ${
              activePerspective === 'empresa'
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-200'
                : 'bg-verta-coral/10 border-verta-coral/30 text-orange-200'
            }`}>
              <div className="flex items-center space-x-2 font-mono font-bold text-[11px] mb-1">
                {activePerspective === 'empresa' ? (
                  <>
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-blue-400 uppercase">Impacto para su Empresa Contratante:</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-verta-coral" />
                    <span className="text-verta-coral uppercase">Recomendación para su Empresa Proveedora:</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed">
                {activePerspective === 'empresa' ? currentStep.roleTips.empresas : currentStep.roleTips.proveedores}
              </p>
            </div>
          )}

          {/* KEY POINTS (3 CARDS GRID) */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
              Componentes & Flujo Operativo:
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentStep.keyPoints.map((pt, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-xl bg-verta-navy/40 border border-verta-slate-blue/40 hover:border-verta-cyan/30 transition-all space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2 text-white font-bold text-xs">
                      <div className="p-1.5 rounded-lg bg-verta-dark-blue border border-verta-slate-blue/50 shrink-0">
                        {pt.icon}
                      </div>
                      <span>{pt.title}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTION BUTTON TO JUMP TO ENVIRONMENT IF APPLICABLE */}
          {currentStep.actionLabel && currentStep.actionEnv && onNavigateEnvironment && (
            <div className="pt-2 border-t border-verta-slate-blue/30 flex items-center justify-between">
              <div className="text-xs text-gray-400 font-mono">
                ¿Desea explorar esta sección de forma práctica?
              </div>
              <button
                onClick={() => {
                  onNavigateEnvironment(currentStep.actionEnv!);
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-verta-cyan/15 hover:bg-verta-cyan/25 text-verta-cyan border border-verta-cyan/40 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <span>{currentStep.actionLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="px-5 sm:px-8 py-4 bg-verta-navy/90 border-t border-verta-slate-blue/50 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentStepIndex === 0}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-verta-dark-blue text-gray-500 border border-verta-slate-blue/20'
                  : 'bg-verta-navy hover:bg-verta-slate-blue/50 text-gray-200 hover:text-white border border-verta-slate-blue/40'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="text-xs font-mono text-gray-400 hidden sm:inline">
              {currentStepIndex + 1} / {tutorialSteps.length}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {currentStepIndex < tutorialSteps.length - 1 ? (
              <button
                onClick={() => setCurrentStepIndex((prev) => Math.min(prev + 1, tutorialSteps.length - 1))}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-verta-cyan to-blue-500 hover:from-verta-cyan/90 hover:to-blue-500/90 text-verta-navy font-black text-xs font-mono flex items-center space-x-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Siguiente Paso</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-verta-emerald hover:bg-emerald-600 text-white font-black text-xs font-mono flex items-center space-x-2 shadow-lg transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finalizar Tutorial</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
