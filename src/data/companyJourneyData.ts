/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  SupplierJourneyItem, 
  ValidationLevelInfo, 
  JourneyTrackingStatus, 
  InternalCompanyDecision 
} from '../types';

export const VALIDATION_LEVELS: ValidationLevelInfo[] = [
  {
    id: 'basica',
    name: 'Nivel 1: Validación Básica (Fiscal y Domicilio)',
    badge: 'NIVEL BÁSICO',
    targetScope: 'Verificación fiscal, identidad del representante y localización domiciliaria verificada.',
    recommendedFor: 'Compras de mostrador, suministros puntuales y prestadores sin personal en sitio.',
    defaultRequirements: [
      'Constancia de Situación Fiscal (RFC) vigente',
      'Opinión de Cumplimiento SAT 32-D Positiva (<30 días)',
      'Comprobante de Domicilio Fiscal (<90 días)',
      'Identificación Oficial del Representante Legal'
    ],
    estimatedDays: 1
  },
  {
    id: 'estandar',
    name: 'Nivel 2: Validación Estándar (Legal, Fiscal e IMSS)',
    badge: 'NIVEL ESTÁNDAR',
    targetScope: 'Cotejo notarial en Registro Público de Comercio (RPC), cumplimiento de obligaciones obrero-patronales ante IMSS e INFONAVIT.',
    recommendedFor: 'Proveedores habituales de servicios generales, logística, consultoría y transporte.',
    defaultRequirements: [
      'Constancia de Situación Fiscal (RFC) vigente',
      'Opinión de Cumplimiento SAT 32-D Positiva (<30 días)',
      'Comprobante de Domicilio Fiscal (<90 días)',
      'Identificación Oficial del Representante Legal',
      'Acta Constitutiva y Poderes Notariales inscritos en RPC',
      'Opinión de Cumplimiento IMSS Positiva',
      'Constancia de Situación Fiscal INFONAVIT'
    ],
    estimatedDays: 2
  },
  {
    id: 'critica',
    name: 'Nivel 3: Validación Crítica (Especializados REPSE & PLD 69-B)',
    badge: 'NIVEL CRÍTICO (REPSE)',
    targetScope: 'Mitigación integral de responsabilidad solidaria laboral y fiscal (Art. 15 CFF, Ley Federal del Trabajo y Art. 69-B del CFF).',
    recommendedFor: 'Contratistas de servicios especializados con personal en instalaciones del cliente (seguridad, limpieza, mantenimiento, obra).',
    defaultRequirements: [
      'Constancia de Situación Fiscal (RFC) vigente',
      'Opinión de Cumplimiento SAT 32-D Positiva (<30 días)',
      'Comprobante de Domicilio Fiscal (<90 días)',
      'Acta Constitutiva y Poderes Notariales en RPC',
      'Opinión de Cumplimiento IMSS e INFONAVIT Positivas',
      'Registro Oficial Vigente ante el REPSE (STPS)',
      'Cédula de Cuotas Obrero Patronales y Comprobante SUA Pagado',
      'Cotejo Diario Lista Negra DOF 69-B (Sin presunción EFOS/EDOS)',
      'Póliza de Responsabilidad Civil Vigente'
    ],
    estimatedDays: 3
  },
  {
    id: 'integral',
    name: 'Nivel 4: Validación Integral Corporativa (Tier 1 & Compliance)',
    badge: 'NIVEL TIER 1',
    targetScope: 'Máxima debida diligencia: auditoría legal, solvencia financiera analizada, compliance anticorrupción y validación in situ.',
    recommendedFor: 'Contratos estratégicos de alto volumen, socios corporativos críticos y adquisiciones de gran escala.',
    defaultRequirements: [
      'Todos los requisitos de Nivel Crítico / REPSE',
      'Estados Financieros Dictaminados (Últimos 2 ejercicios)',
      'Declaración Anual de Impuestos e Impuesto Sobre Nómina',
      'Política Corporativa Anticorrupción y Código de Ética',
      'Declaración de No Conflicto de Intereses con Funcionarios',
      'Acta de Verificación Física Domiciliaria In Situ con Georreferencia'
    ],
    estimatedDays: 4
  }
];

export const JOURNEY_CATEGORIES = [
  'Servicios Especializados (REPSE)',
  'Tecnologías de la Información & SaaS',
  'Construcción, Obra Civil & Remodelaciones',
  'Logística, Transporte & Almacenamiento',
  'Seguridad Privada, Custodia & Vigilancia',
  'Limpieza Industrial & Facility Management',
  'Mantenimiento Industrial & Electromecánico',
  'Consultoría Legal, Fiscal & Financiera',
  'Suministros Industriales, Insumos & Materias Primas',
  'Recursos Humanos, Capacitación & Nómina'
];

export const TRACKING_STATUS_CONFIG: Record<
  JourneyTrackingStatus,
  {
    stepNumber: number;
    label: string;
    shortLabel: string;
    description: string;
    color: string;
    badgeBg: string;
    textColor: string;
    borderColor: string;
  }
> = {
  invitacion_enviada: {
    stepNumber: 1,
    label: 'Invitación enviada',
    shortLabel: 'Enviada',
    description: 'El enlace de invitación y accesos seguros fueron emitidos al correo del contacto del proveedor.',
    color: 'amber',
    badgeBg: 'bg-amber-500/15',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/30'
  },
  aceptada: {
    stepNumber: 2,
    label: 'Aceptada',
    shortLabel: 'Aceptada',
    description: 'El proveedor ingresó con su código seguro, aceptó los términos y dio inicio a su registro.',
    color: 'blue',
    badgeBg: 'bg-blue-500/15',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/30'
  },
  pago_completado: {
    stepNumber: 3,
    label: 'Pago completado',
    shortLabel: 'Pagado',
    description: 'La cuota de trámite y dictaminación de homologación ha sido cubierta y confirmada.',
    color: 'indigo',
    badgeBg: 'bg-indigo-500/15',
    textColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/30'
  },
  en_proceso: {
    stepNumber: 4,
    label: 'En proceso',
    shortLabel: 'En Proceso',
    description: 'Carga de evidencias en curso y auditoría técnica preliminar por la mesa de control VERTA.',
    color: 'cyan',
    badgeBg: 'bg-verta-cyan/15',
    textColor: 'text-verta-cyan',
    borderColor: 'border-verta-cyan/30'
  },
  observaciones_pendientes: {
    stepNumber: 5,
    label: 'Observaciones pendientes',
    shortLabel: 'Observado',
    description: 'Auditoría identificó requerimientos no conformes o desactualizados que el proveedor debe solventar.',
    color: 'rose',
    badgeBg: 'bg-rose-500/15',
    textColor: 'text-rose-400',
    borderColor: 'border-rose-500/30'
  },
  validacion_finalizada: {
    stepNumber: 6,
    label: 'Validación finalizada',
    shortLabel: 'Finalizada',
    description: 'Mesa de auditoría VERTA concluyó el dictamen técnico objetivo con sellos criptográficos oficiales.',
    color: 'emerald',
    badgeBg: 'bg-emerald-500/15',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30'
  }
};

export const INTERNAL_DECISION_CONFIG: Record<
  InternalCompanyDecision,
  {
    label: string;
    description: string;
    badgeBg: string;
    textColor: string;
    borderColor: string;
    iconType: 'check' | 'alert' | 'x' | 'clock';
    guidance: string;
  }
> = {
  aprobado: {
    label: 'Aprobado',
    description: 'La empresa decide contratar al proveedor y autorizar su alta en el catálogo interno de compras.',
    badgeBg: 'bg-emerald-500/20',
    textColor: 'text-emerald-300',
    borderColor: 'border-emerald-500/50',
    iconType: 'check',
    guidance: 'El proveedor cumple con las expectativas comerciales de su empresa y cuenta con el respaldo documental técnico.'
  },
  requiere_aclaraciones: {
    label: 'Requiere aclaraciones/actualización',
    description: 'La empresa solicita ajustes de propuesta, aclaración de condiciones comerciales o renovación de algún término.',
    badgeBg: 'bg-amber-500/20',
    textColor: 'text-amber-300',
    borderColor: 'border-amber-500/50',
    iconType: 'alert',
    guidance: 'Se mantiene en pausa la adjudicación hasta que el área comercial del proveedor atienda las solicitudes de la empresa.'
  },
  no_continua: {
    label: 'No continúa',
    description: 'La empresa descarta a este proveedor para la presente licitación o requerimiento de compra.',
    badgeBg: 'bg-rose-500/20',
    textColor: 'text-rose-300',
    borderColor: 'border-rose-500/50',
    iconType: 'x',
    guidance: 'Decisión soberana de la empresa contratante. No implica defecto legal en VERTA, sino criterio interno de compras/costos.'
  },
  pendiente: {
    label: 'Pendiente de decisión interna',
    description: 'El comité interno de compras o evaluador aún no ha emitido una resolución comercial sobre el proveedor.',
    badgeBg: 'bg-gray-500/20',
    textColor: 'text-gray-300',
    borderColor: 'border-gray-500/40',
    iconType: 'clock',
    guidance: 'El expediente se encuentra en evaluación interna por el equipo de adquisiciones / cuentas por pagar.'
  }
};

export const INITIAL_SUPPLIER_JOURNEY: SupplierJourneyItem[] = [
  {
    id: 'inv-01',
    code: 'VRT-8921',
    providerName: 'Soluciones Tecnológicas Alfa S.A. de C.V.',
    rfc: 'STA180412XYZ',
    contact: {
      name: 'Lic. Mariana Valdez Garza',
      email: 'contacto@alfa-tecnologia.com.mx',
      phone: '+52 55 4892 1100',
      position: 'Directora de Cuentas Corporativas'
    },
    category: 'Tecnologías de la Información & SaaS',
    service: 'Desarrollo e implementación de arquitectura Cloud y licenciamiento SaaS empresarial',
    validationLevel: 'estandar',
    trackingStatus: 'en_proceso',
    progressPercent: 65,
    sentDate: '12/04/2026',
    lastUpdate: 'Hace 2 horas',
    requirements: [
      'Constancia de Situación Fiscal (RFC)',
      'Opinión SAT 32-D Positiva',
      'Acta Constitutiva y Poderes en RPC',
      'Comprobante de Domicilio Fiscal',
      'Opinión de Cumplimiento IMSS'
    ],
    paymentDetails: {
      status: 'pagado',
      amount: '$3,800 MXN',
      paidAt: '13/04/2026',
      invoiceFolio: 'FAC-VRT-9021'
    },
    internalDecision: {
      decision: 'pendiente',
      notes: 'A la espera del dictamen técnico final de VERTA para firma de contrato de software.'
    }
  },
  {
    id: 'inv-02',
    code: 'VRT-7734',
    providerName: 'Logística & Transportes del Norte S.A. de C.V.',
    rfc: 'LTN150820HJ1',
    contact: {
      name: 'Ing. Roberto Garza Montemayor',
      email: 'licitaciones@logisticanorte.com.mx',
      phone: '+52 81 8320 9944',
      position: 'Gerente General de Operaciones'
    },
    category: 'Logística, Transporte & Almacenamiento',
    service: 'Distribución terrestre de carga refrigerada y fletes interestatales consolidados',
    validationLevel: 'estandar',
    trackingStatus: 'validacion_finalizada',
    progressPercent: 100,
    sentDate: '08/04/2026',
    lastUpdate: 'Ayer',
    requirements: [
      'Constancia de Situación Fiscal (RFC)',
      'Opinión SAT 32-D Positiva',
      'Póliza de Seguros de Carga',
      'Acta Constitutiva y Poderes',
      'Opinión Positiva IMSS'
    ],
    paymentDetails: {
      status: 'pagado',
      amount: '$3,800 MXN',
      paidAt: '09/04/2026',
      invoiceFolio: 'FAC-VRT-8842'
    },
    vertaTechnicalResult: {
      status: 'Favorable',
      complianceScore: 98,
      sealSha256: '9a4b88e10c72f10b2a8d11c099318b76df10a9c8',
      concludedAt: '17/04/2026',
      technicalSummary: 'Opinión 32-D positiva convalidada en webservice SAT. Poder notarial inscrito en RPC. Sin coincidencias en listas 69-B del CFF.'
    },
    internalDecision: {
      decision: 'aprobado',
      recordedAt: '18/04/2026 a las 11:30 hrs',
      recordedBy: 'Ing. Carlos Mendoza (Gerente de Compras)',
      justification: 'Aprobado formalmente para el paquete de rutas noreste. Tarifa competitiva de $18.50/km y dictamen normativo impecable.',
      commercialConditions: 'Términos de pago a 30 días hábiles con confirmación de entrega de remisiones.',
      contractValidityMonths: 12
    }
  },
  {
    id: 'inv-03',
    code: 'VRT-4109',
    providerName: 'Constructora e Inmobiliaria Diamante S.A.',
    rfc: 'CID120305MK9',
    contact: {
      name: 'Arq. Sofía Carvajal Pineda',
      email: 'admin@constructoradiamante.mx',
      phone: '+52 33 3610 8820',
      position: 'Representante de Licitaciones'
    },
    category: 'Construcción, Obra Civil & Remodelaciones',
    service: 'Mantenimiento estructural de naves industriales y cimentación de pisos epóxicos',
    validationLevel: 'critica',
    trackingStatus: 'invitacion_enviada',
    progressPercent: 10,
    sentDate: '18/04/2026',
    lastUpdate: '18/04/2026',
    requirements: [
      'Constancia RFC y Opinión SAT 32-D',
      'Registro Oficial REPSE (STPS)',
      'Opinión de Cumplimiento IMSS e INFONAVIT',
      'Póliza de Responsabilidad Civil Obra',
      'Acta Constitutiva y Poder Notarial'
    ],
    internalDecision: {
      decision: 'pendiente',
      notes: 'Invitación emitida para licitación de nave industrial Guadalajara.'
    }
  },
  {
    id: 'inv-04',
    code: 'VRT-9032',
    providerName: 'Servicios de Seguridad Integral Privada S.A.',
    rfc: 'SSI160911KP4',
    contact: {
      name: 'Capitán Daniel Treviño Lozano',
      email: 'direccion@seguridadintegral.com',
      phone: '+52 55 5722 3300',
      position: 'Director de Seguridad Operativa'
    },
    category: 'Seguridad Privada, Custodia & Vigilancia',
    service: 'Vigilancia armada intramuros y custodia perimetral en centros de distribución',
    validationLevel: 'critica',
    trackingStatus: 'aceptada',
    progressPercent: 30,
    sentDate: '15/04/2026',
    lastUpdate: 'Hace 3 días',
    requirements: [
      'Permiso Federal de la SSPC',
      'Registro REPSE Vigente',
      'Opinión SAT 32-D Positiva',
      'Opinión IMSS Sin Adeudos',
      'Póliza de Fianza y Seguro'
    ],
    internalDecision: {
      decision: 'pendiente',
      notes: 'El proveedor confirmó recepción de la invitación y está ingresando al portal para cargar permisos.'
    }
  },
  {
    id: 'inv-05',
    code: 'VRT-6218',
    providerName: 'Limpieza y Mantenimiento Ecológico S. de R.L.',
    rfc: 'LME200115TA8',
    contact: {
      name: 'Lic. Andrea Solís Fuentes',
      email: 'cuentas@ecolimpieza.mx',
      phone: '+52 55 8901 2244',
      position: 'Coordinadora Administrativa'
    },
    category: 'Limpieza Industrial & Facility Management',
    service: 'Servicio especializado de sanitización industrial y limpieza profunda de oficinas',
    validationLevel: 'critica',
    trackingStatus: 'pago_completado',
    progressPercent: 45,
    sentDate: '10/04/2026',
    lastUpdate: 'Hoy a las 09:15 hrs',
    requirements: [
      'Registro REPSE Vigente STPS',
      'Opinión SAT 32-D',
      'Opinión IMSS Positiva',
      'Acta Constitutiva en RPC',
      'Fichas técnicas de químicos grado FDA'
    ],
    paymentDetails: {
      status: 'pagado',
      amount: '$4,900 MXN',
      paidAt: 'Hoy a las 09:12 hrs',
      invoiceFolio: 'FAC-VRT-9410'
    },
    internalDecision: {
      decision: 'pendiente',
      notes: 'Pago de verificación confirmado. El proveedor está subiendo los contratos de trabajo y SUA.'
    }
  },
  {
    id: 'inv-06',
    code: 'VRT-3390',
    providerName: 'Consultoría Estratégica & Fiscal de Occidente S.C.',
    rfc: 'CEF170603PU2',
    contact: {
      name: 'C.P. Fernando Gómez Farías',
      email: 'fgomez@fiscaloccidente.com',
      phone: '+52 33 3812 7700',
      position: 'Socio Director de Auditoría'
    },
    category: 'Consultoría Legal, Fiscal & Financiera',
    service: 'Auditoría tributaria preventiva, dictamen fiscal y planeación de precios de transferencia',
    validationLevel: 'estandar',
    trackingStatus: 'observaciones_pendientes',
    progressPercent: 70,
    sentDate: '05/04/2026',
    lastUpdate: 'Ayer',
    requirements: [
      'Cédula Profesional de Contadores Dictaminadores',
      'Opinión SAT 32-D Positiva',
      'Constancia RFC',
      'Poder Notarial en RPC',
      'Comprobante de Domicilio'
    ],
    observations: [
      'La Opinión de Cumplimiento SAT 32-D adjunta tiene fecha de hace 45 días (vencida por superar los 30 días naturales de vigencia fiscal).',
      'El comprobante de domicilio del despacho fiscal presenta una dirección distinta a la registrada en la Constancia de Situación Fiscal.'
    ],
    paymentDetails: {
      status: 'pagado',
      amount: '$3,800 MXN',
      paidAt: '06/04/2026',
      invoiceFolio: 'FAC-VRT-8711'
    },
    internalDecision: {
      decision: 'requiere_aclaraciones',
      recordedAt: '17/04/2026 a las 16:20 hrs',
      recordedBy: 'Lic. Laura Benítez (Gerente de Finanzas)',
      justification: 'Se solicita al proveedor subsanar de inmediato la opinión 32-D actualizada y justificar la discrepancia de domicilio fiscal antes de continuar con la adjudicación del contrato.',
      commercialConditions: 'Plazo otorgado de 5 días hábiles para solventar observaciones.'
    }
  },
  {
    id: 'inv-07',
    code: 'VRT-5512',
    providerName: 'Distribuidora Química & Materias Primas del Bajío S.A.',
    rfc: 'DQM140722LQ1',
    contact: {
      name: 'Ing. Guillermo Zavala Ochoa',
      email: 'gzavala@quimicadelbajio.com.mx',
      phone: '+52 477 718 3350',
      position: 'Director Comercial'
    },
    category: 'Suministros Industriales, Insumos & Materias Primas',
    service: 'Suministro a granel de solventes industriales y polímeros de inyección',
    validationLevel: 'integral',
    trackingStatus: 'validacion_finalizada',
    progressPercent: 100,
    sentDate: '01/04/2026',
    lastUpdate: '14/04/2026',
    requirements: [
      'Constancia RFC y Opinión SAT 32-D',
      'Hojas de Seguridad de Materiales MSDS',
      'Dictamen de Estados Financieros',
      'Cotejo Lista 69-B del CFF',
      'Opinión IMSS Positiva'
    ],
    paymentDetails: {
      status: 'pagado',
      amount: '$6,500 MXN',
      paidAt: '02/04/2026',
      invoiceFolio: 'FAC-VRT-8550'
    },
    vertaTechnicalResult: {
      status: 'Favorable',
      complianceScore: 95,
      sealSha256: '7c1d29e84b11f43a0e9821d34e9087c2b5120a11',
      concludedAt: '14/04/2026',
      technicalSummary: 'Expediente técnico convalidado satisfactoriamente. Cumplimiento fiscal y normativo al corriente.'
    },
    internalDecision: {
      decision: 'no_continua',
      recordedAt: '15/04/2026 a las 10:00 hrs',
      recordedBy: 'Comité de Adquisiciones (Voto Unánime)',
      justification: 'Aunque el proveedor cuenta con Dictamen Técnico Favorable emitido por VERTA, el comité interno determinó no continuar debido a que sus costos cotizados superan en un 28% el presupuesto asignado para el ejercicio 2026.',
      commercialNotes: 'VERTA respalda la idoneidad documental, pero la decisión de no contratar corresponde estrictamente a la política de precios y presupuesto de nuestra empresa.'
    }
  }
];
