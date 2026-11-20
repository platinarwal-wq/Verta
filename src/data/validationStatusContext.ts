/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StandardValidationStatus, ValidationStatusContext, ConcreteVerificationKey } from '../types';

export const METHODOLOGY_SUSPENSION_STATEMENT = {
  title: 'Suspensión Metodológica del Score Numérico',
  subtitle: 'Transición hacia Indicadores Objetivos de Evidencia Comprobable',
  description: 
    'En apego a los principios de rigor, trazabilidad y máxima transparencia, VERTA ha suspendido la emisión de puntajes numéricos abstractos (de 0 a 100). Hasta que no concluya el proceso de consolidación, consulta colegiada y auditoría pública del modelo de ponderación del Índice de Confianza VERTA, el sistema opera exclusivamente mediante badges e indicadores de estatus verificados con fuentes primarias (SAT, IMSS, RPC, DOF y visita domiciliaria).',
  shortNotice: 'Score cuantitativo suspendido temporalmente. Sustituido por verificación objetiva de hechos normativos.'
};

export const STANDARDIZED_VALIDATION_STATUSES: Record<StandardValidationStatus, ValidationStatusContext> = {
  validado: {
    id: 'validado',
    label: 'Validado',
    badgeBg: 'bg-emerald-500/15',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    shortDescription: 'Expediente íntegro con todas las dimensiones normativas acreditadas y vigentes.',
    meaning: 
      'El proveedor ha presentado el 100% de la documentación obligatoria exigida para su nivel de riesgo, la cual fue cotejada satisfactoriamente contra fuentes oficiales (SAT, IMSS, RPC, listas del DOF). No existen anomalías, créditos fiscales firmes ni discrepancias de representación legal.',
    missingElements: 
      'Ninguno. Todos los requisitos normativos, fiscales, corporativos y de seguridad social se encuentran plenamente solventados y vigentes.',
    riskAssessment: 
      'Riesgo Bajo / Controlado. La empresa contratante cuenta con respaldo probatorio ante auditorías fiscales (materialidad del servicio y deducción de CFDI), sin contingencias aparentes de responsabilidad solidaria laboral o contractual.',
    proceedingActions: 
      'Apto para contratación formal, adjudicación de órdenes de compra y pago de contraprestaciones. Se mantiene en monitoreo preventivo automatizado 24/7 de listas 69-B del DOF y renovación periódica de opiniones de cumplimiento.'
  },

  validado_con_observaciones: {
    id: 'validado_con_observaciones',
    label: 'Validado con observaciones',
    badgeBg: 'bg-amber-500/15',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    shortDescription: 'Criterios troncales acreditados, pero existen precisiones técnicas o advertencias preventivas.',
    meaning: 
      'El proveedor cumple con las obligaciones críticas primarias (situación fiscal regular y personalidad jurídica), pero el equipo auditor detectó elementos secundarios que requieren atención preventiva (ej. póliza de seguro cercana a renovación, domicilio secundario no actualizado, o vigencia fiscal próxima a expirar en menos de 10 días).',
    missingElements: 
      'Faltan documentos complementarios no críticos o subsanación de precisiones menores asentadas en el dictamen técnico.',
    riskAssessment: 
      'Riesgo Moderado / Mitigable. No existe impedimento legal inminente para la contratación, pero la empresa contratante debe documentar las salvedades para evitar desajustes operativos o contingencias si la observación no se subsana en el plazo estipulado.',
    proceedingActions: 
      'La empresa contratante puede autorizar la contratación condicionada o solicitar formalmente la solventación de las observaciones en un plazo perentorio (ej. 15 días hábiles). El proveedor recibe la lista puntual de aclaraciones requeridas en su portal.'
  },

  informacion_pendiente: {
    id: 'informacion_pendiente',
    label: 'Información pendiente',
    badgeBg: 'bg-blue-500/15',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    shortDescription: 'Proceso de auditoría en pausa por falta de entrega de requisitos obligatorios.',
    meaning: 
      'El expediente se encuentra en fase de integración o revisión preliminar. El proveedor aún no ha cargado uno o varios documentos mandatorios, o los archivos subidos resultaron ilegibles, incompletos o sin cadena digital original.',
    missingElements: 
      'Requisitos nucleares pendientes de carga (ej. Opinión 32-D del mes corriente, comprobante de domicilio reciente, o poderes notariales legibles).',
    riskAssessment: 
      'Riesgo Indeterminado / No Evaluado. Al no contar con el expediente completo, no es posible dictaminar la salud fiscal ni la legalidad de la operación. Adjudicar contratos en este estado traslada todo el riesgo de incumplimiento a la contratante.',
    proceedingActions: 
      'Requerir al proveedor completar la carga en el portal de proveedores. El área de adquisiciones debe suspender temporalmente la adjudicación hasta la emisión del dictamen técnico definitivo.'
  },

  actualizacion_requerida: {
    id: 'actualizacion_requerida',
    label: 'Actualización requerida',
    badgeBg: 'bg-cyan-500/15',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    shortDescription: 'Documentos previamente válidos han caducado en su ciclo natural de renovación.',
    meaning: 
      'El proveedor estuvo validado anteriormente, pero uno o varios documentos sujetos a periodicidad normativa (ej. Opinión de Cumplimiento SAT con vigencia de 30 días, Opinión IMSS mensual o Póliza de Responsabilidad Civil) han alcanzado su fecha de expiración.',
    missingElements: 
      'Carga de versiones actualizadas de los documentos con vigencia caducada dentro del último ciclo mensual o anual.',
    riskAssessment: 
      'Riesgo Temporal Emergente. Existe riesgo de no deducibilidad fiscal o desprotección contractual si se emiten pagos contra opiniones vencidas que pudieran haber transitado a opinión negativa en el ejercicio fiscal.',
    proceedingActions: 
      'Notificar al proveedor para la carga inmediata de la opinión fiscal o constancia actualizada. El sistema VERTA permite la recertificación express en menos de 24 horas una vez recibidos los archivos vigentes.'
  },

  no_cumple: {
    id: 'no_cumple',
    label: 'No cumple criterios obligatorios',
    badgeBg: 'bg-rose-500/15',
    textColor: 'text-rose-400',
    borderColor: 'border-rose-500/40',
    shortDescription: 'Detección de irregularidades críticas, opinión negativa o impedimento legal grave.',
    meaning: 
      'La auditoría determinó la existencia de causales graves de rechazo: coincidencia en lista definitiva del Artículo 69-B del CFF (operaciones simuladas/EFOS), Opinión de Cumplimiento SAT en sentido Negativo con créditos fiscales no garantizados, Registro REPSE cancelado, o falta de personalidad jurídica del firmante.',
    missingElements: 
      'Falla estructural insubsanable a corto plazo. Requiere resolución legal o fiscal de fondo con las autoridades competentes.',
    riskAssessment: 
      'Riesgo Crítico Muy Alto. Implica riesgo directo de responsabilidad penal tributaria, pérdida total de efectos fiscales (no deducción ni acreditamiento de IVA), y potencial sanción administrativa para la empresa contratante.',
    proceedingActions: 
      'No contratar. Si ya existe relación previa, turnar al área legal y de auditoría interna de la contratante para suspender pagos, rescindir convenios o solicitar acreditamiento de fianza de cumplimiento.'
  },

  validacion_vencida: {
    id: 'validacion_vencida',
    label: 'Validación vencida',
    badgeBg: 'bg-slate-500/15',
    textColor: 'text-gray-300',
    borderColor: 'border-gray-500/40',
    shortDescription: 'El plazo anual o contractual del dictamen ha expirado sin proceso de renovación.',
    meaning: 
      'La vigencia integral del dictamen anual emitido por VERTA ha culminado y el proveedor no concluyó su proceso de recertificación anual antes de la fecha límite.',
    missingElements: 
      'Revalidación anual completa del expediente corporativo, fiscal y de cumplimiento normativo.',
    riskAssessment: 
      'Riesgo Moderado-Alto. El estatus actual del proveedor se desconoce; las condiciones que motivaron la aprobación original pueden haber variado sustancialmente.',
    proceedingActions: 
      'Solicitar al proveedor iniciar el trámite de recertificación anual mediante una nueva solicitud de validación. Congelar ampliaciones contractuales hasta la emisión del nuevo dictamen.'
  }
};

export const CONCRETE_VERIFICATION_CHECK_DEFINITIONS: Record<ConcreteVerificationKey, {
  label: string;
  category: 'Fiscal' | 'Legal' | 'Laboral' | 'Operativo' | 'Cumplimiento';
  authority: string;
  checkMethod: string;
  description: string;
}> = {
  identidad_verificada: {
    label: 'Identidad y Domicilio Verificados',
    category: 'Legal',
    authority: 'INE / SAT / Geolocalización',
    checkMethod: 'Cotejo biométrico y comprobante domiciliario con georreferenciación',
    description: 'Acreditación fehaciente de la existencia material del domicilio fiscal y personalidad del representante legal.'
  },
  situacion_fiscal_validada: {
    label: 'Situación Fiscal Validada (SAT 32-D)',
    category: 'Fiscal',
    authority: 'Servicio de Administración Tributaria (SAT)',
    checkMethod: 'Consulta directa vía webservice del SAT y verificación de e.firma',
    description: 'Opinión de cumplimiento positiva sin créditos fiscales firmes ni adeudos al corriente de presentación de declaraciones.'
  },
  constitucion_legal_comprobada: {
    label: 'Constitución Legal y Poderes Comprobados',
    category: 'Legal',
    authority: 'Registro Público de Comercio (RPC / SIGER)',
    checkMethod: 'Inspección de folio mercantil electrónico y poderes notariales vigentes',
    description: 'Personalidad jurídica debidamente constituida con facultades vigentes para actos de administración o dominio.'
  },
  cumplimiento_laboral_acreditado: {
    label: 'Cumplimiento Laboral y Seguridad Social (IMSS/REPSE)',
    category: 'Laboral',
    authority: 'IMSS / INFONAVIT / STPS (REPSE)',
    checkMethod: 'Opinión IMSS sin adeudos y registro activo en padrón público REPSE',
    description: 'Cumplimiento de cuotas obrero-patronales y registro especializado vigente para servicios subcontratados.'
  },
  referencias_verificadas: {
    label: 'Referencias Comerciales Verificadas',
    category: 'Operativo',
    authority: 'Empresas Clientes Previas',
    checkMethod: 'Confirmación directa de materialidad, calidad de entrega y contratos concluidos',
    description: 'Historial validado de solvencia operativa y apego a tiempos de entrega pactados.'
  },
  domicilio_confirmado: {
    label: 'Localización Material Confirmada',
    category: 'Operativo',
    authority: 'Auditoría en Campo / Registro Catastral',
    checkMethod: 'Verificación física de infraestructura, oficinas o plantas productivas',
    description: 'Constatación presencial de capacidad instalada e infraestructura real.'
  },
  lista_69b_sin_coincidencias: {
    label: 'Sin Coincidencias en Lista 69-B del CFF (No EFOS)',
    category: 'Cumplimiento',
    authority: 'Diario Oficial de la Federación (DOF)',
    checkMethod: 'Monitoreo diario automatizado contra listados definitivos de operaciones simuladas',
    description: 'Garantía de que el proveedor nunca ha emitido facturas de operaciones inexistentes o simuladas.'
  }
};
