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
  Printer,
  TrendingUp,
  Briefcase,
  Users,
  Building2,
  Lock,
  Download,
  AlertCircle,
  Search,
  Check,
  ExternalLink,
  BookOpen,
  Filter,
  BarChart4
} from 'lucide-react';

interface ClientProfile {
  id: string;
  companyName: string;
  rfc: string;
  regimenActual: string;
  antiguedad: number;
  situacionLaboral: string;
  objetivoComercial: string;
  ingresosAnuales: string;
  sociosCount: number;
  crecimientoProyectado: 'alto' | 'moderado' | 'estable';
  riskScore: 'Crítico' | 'Alto' | 'Medio' | 'Bajo';
  progress: number;
  industry: string;
  lastUpdated: string;
  executiveSummary: {
    regimenActual: string;
    antiguedad: string;
    situacionLaboral: string;
    objetivoComercial: string;
    riesgoFiscal: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
    riesgoLaboral: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
    riesgoPatrimonial: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
    necesidadInstitucionalizacion: 'Baja' | 'Media' | 'Alta' | 'Extrema';
    recomendacionPreliminar: string;
    prioridadInmediata: string;
  };
  checklist: {
    id: string;
    category: 'fiscal' | 'financiera' | 'laboral' | 'legal';
    name: string;
    status: 'Pendiente' | 'Cargado' | 'No Aplica';
    fileName?: string;
    loadedAt?: string;
  }[];
  fiscalRisks: {
    area: string;
    risk: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
    desc: string;
  }[];
  legalRecommendation: {
    option: string;
    reason: string;
    advantages: string;
    disadvantages: string;
    preliminaryRecommendation: string;
  };
  laborImplications: {
    riesgo: string;
    implicacion: string;
  }[];
  laborRecommendations: string[];
  proposedStrategy: {
    fase: string;
    actividad: string;
    tiempo: string;
  }[];
  fees: {
    diagnostico: string;
    implementacion: string;
    iguala: string;
  };
}

const CONSTANT_CLIENTS: ClientProfile[] = [
  {
    id: 'c1',
    companyName: 'Bebidas y Alimentos del Bajío S.A.',
    rfc: 'BAB-960418-L82',
    regimenActual: 'Persona Física con Actividad Empresarial',
    antiguedad: 28,
    situacionLaboral: 'Existen trabajadores no registrados completamente ante IMSS / Nómina informal',
    objetivoComercial: 'Convertirse en proveedor directo de grandes corporativos (Bimbo, Lala, etc.)',
    ingresosAnuales: '$10 MDP a $50 MDP MXN',
    sociosCount: 3,
    crecimientoProyectado: 'alto',
    riskScore: 'Alto',
    progress: 25,
    industry: 'Alimentos y Bebidas',
    lastUpdated: '30/05/2026',
    executiveSummary: {
      regimenActual: 'Persona Física con Actividad Empresarial',
      antiguedad: '28 años',
      situacionLaboral: 'Existen trabajadores no registrados completamente ante IMSS',
      objetivoComercial: 'Convertirse en proveedor de corporativos (Bimbo, Lala, etc.)',
      riesgoFiscal: 'Alto',
      riesgoLaboral: 'Alto',
      riesgoPatrimonial: 'Alto',
      necesidadInstitucionalizacion: 'Alta',
      recomendacionPreliminar: 'Evaluar migración urgente a Persona Moral',
      prioridadInmediata: 'Diagnóstico integral fiscal, laboral y legal preventivo'
    },
    checklist: [
      { id: 'f_1', category: 'fiscal', name: 'Constancia de situación fiscal', status: 'Cargado', fileName: 'CSF_Bajio_Oficial.pdf', loadedAt: '12/05/2026' },
      { id: 'f_2', category: 'fiscal', name: 'Opinión positiva SAT (Art. 32-D)', status: 'Pendiente' },
      { id: 'f_3', category: 'fiscal', name: 'Declaraciones anuales últimos 5 ejercicios', status: 'Cargado', fileName: 'DeclAnual_Conjunta_Bajio.pdf', loadedAt: '20/05/2026' },
      { id: 'f_4', category: 'fiscal', name: 'Declaraciones mensuales del año en curso', status: 'Pendiente' },
      { id: 'f_5', category: 'fiscal', name: 'CFDI emitidos y recibidos (XML/PDF)', status: 'Pendiente' },
      { id: 'f_6', category: 'fiscal', name: 'Papeles de trabajo fiscales integrados', status: 'Pendiente' },
      { id: 'f_7', category: 'fiscal', name: 'Relación de clientes principales', status: 'Pendiente' },
      { id: 'f_8', category: 'fiscal', name: 'Relación de proveedores clave', status: 'Pendiente' },
      { id: 'f_9', category: 'fiscal', name: 'Requerimientos SAT previos recibidos', status: 'Pendiente' },
      { id: 'f_10', category: 'fiscal', name: 'Créditos fiscales o adeudos registrados', status: 'Pendiente' },
      { id: 'fn_1', category: 'financiera', name: 'Estados financieros auditados', status: 'Pendiente' },
      { id: 'fn_2', category: 'financiera', name: 'Estado de resultados mensual', status: 'Pendiente' },
      { id: 'fn_3', category: 'financiera', name: 'Estado de Flujo de efectivo actual', status: 'Pendiente' },
      { id: 'fn_4', category: 'financiera', name: 'Catálogo de Inventarios', status: 'No Aplica' },
      { id: 'fn_5', category: 'financiera', name: 'Relación analítica de Activos fijos', status: 'Cargado', fileName: 'ActivosFijos_MaquinariaEnvase.xlsx', loadedAt: '25/05/2026' },
      { id: 'fn_6', category: 'financiera', name: 'Endeudamiento bancario y pasivos', status: 'Pendiente' },
      { id: 'fn_7', category: 'financiera', name: 'Reporte del Margen operativo', status: 'Pendiente' },
      { id: 'fn_8', category: 'financiera', name: 'Proyección de crecimiento financiero', status: 'Pendiente' },
      { id: 'l_1', category: 'laboral', name: 'Número real de trabajadores activos', status: 'Pendiente' },
      { id: 'l_2', category: 'laboral', name: 'Número registrado formalmente ante el IMSS', status: 'Pendiente' },
      { id: 'l_3', category: 'laboral', name: 'Contratos laborales individuales o colectivos', status: 'Pendiente' },
      { id: 'l_4', category: 'laboral', name: 'Evidencia de nómina bancaria de salarios', status: 'Pendiente' },
      { id: 'l_5', category: 'laboral', name: 'Salarios reales vs registrados', status: 'Pendiente' },
      { id: 'l_6', category: 'laboral', name: 'Prestaciones otorgadas extralegales', status: 'Pendiente' },
      { id: 'l_7', category: 'laboral', name: 'Riesgos o historial de demandas laborales', status: 'Pendiente' },
      { id: 'lg_1', category: 'legal', name: 'Contratos con clientes de gran escala', status: 'Pendiente' },
      { id: 'lg_2', category: 'legal', name: 'Contratos bilaterales con proveedores clave', status: 'Pendiente' },
      { id: 'lg_3', category: 'legal', name: 'Marcas registradas ante el IMPI', status: 'Pendiente' },
      { id: 'lg_4', category: 'legal', name: 'Permisos, licencias corporativas', status: 'Cargado', fileName: 'LicenciaFuncionamiento_Estatal_2026.pdf', loadedAt: '12/05/2026' },
      { id: 'lg_5', category: 'legal', name: 'Litigios existentes o controversias', status: 'Pendiente' },
      { id: 'lg_6', category: 'legal', name: 'Seguros de responsabilidad civil', status: 'Pendiente' },
      { id: 'lg_7', category: 'legal', name: 'Propiedad de activos inmuebles', status: 'Pendiente' }
    ],
    fiscalRisks: [
      { area: 'ISR', risk: 'Alto', desc: 'Posible carga fiscal elevada como PF bajo tarifa progresiva de hasta 35% sin amortización flexible de pasivos de capital.' },
      { area: 'IVA', risk: 'Medio', desc: 'Riesgo documental por inconsistencias de materialidad y correlación mensual de ingresos depositados.' },
      { area: 'Nómina', risk: 'Alto', desc: 'Asimetrías críticas detectadas entre la operación física de la embotelladora y las retenciones declaradas.' },
      { area: 'IMSS', risk: 'Crítico', desc: 'Trabajadores de planta activos en líneas de embalaje omitidos en reportes del IMSS. Contingencia inminente de capital constitutivo.' },
      { area: 'Patrimonial', risk: 'Alto', desc: 'No existe separación patrimonial. Bienes raíces personales respaldan pasivos laborales o resoluciones de crédito SAT.' },
      { area: 'Compliance', risk: 'Alto', desc: 'El departamento de compras de corporativos de retail exige gobierno formal y REPSE para firmar contratas.' },
      { area: 'Contabilidad', risk: 'Medio', desc: 'Sistemas contables locales básicos con riesgo por retrasos de cierres mensuales y pólizas cruzadas.' }
    ],
    legalRecommendation: {
      option: 'SAPI de CV (Sociedad Anónima Promotora de Inversión)',
      preliminaryRecommendation: 'Se recomienda evaluar seriamente una migración ordenada hacia Persona Moral bajo régimen general.',
      reason: 'Estructura idónea por las proyecciones de alto crecimiento de la línea comercial, la necesidad de amalgamar futuros socios capitalistas e institucionalizar procesos ante firmas de gran escala (Bimbo, Lala).',
      advantages: 'Establecimiento de estatutos y pactos de socios blindados, separación del patrimonio familiar, flexibilidad para financiamientos de capital de riesgo y emisión de series especiales de acciones.',
      disadvantages: 'Mayor índice de formalidad regulatoria, aranceles de notaria por constitución y mantenimiento de libros contables bajo directivas auditadas.'
    },
    laborImplications: [
      { riesgo: 'Trabajadores no registrados', implicacion: 'Créditos y requerimientos coactivos del IMSS con sanciones pecuniarias.' },
      { riesgo: 'Diferencias salariales', implicacion: 'Actualizaciones de cuotas omitidas, recargos elevados y multas fiscales.' },
      { riesgo: 'Falta de contratos formalizados', implicacion: 'Indefensión en juicios y demandas individuales (la carga probatoria recae enteramente en el patrón).' },
      { riesgo: 'Falta de expedientes de personal', implicacion: 'Vulnerabilidad y riesgo probatorio nulo ante visitas de la Secretaría del Trabajo.' },
      { riesgo: 'Nómina informal', implicacion: 'Discrepancia fiscal para el emisor y asalto penal por considerarse simulación comercial.' }
    ],
    laborRecommendations: [
      '1. Diagnóstico laboral integral de contratos y puestos',
      '2. Regularización gradual y programada en el IMSS',
      '3. Instrumentación de contratos laborales individuales robustos',
      '4. Integración unificada de expedientes de personal',
      '5. Confección de una política formal de salarios',
      '6. Revisión técnica y cálculo de PTU',
      '7. Implementación de lineamientos de seguridad e higiene industrial'
    ],
    proposedStrategy: [
      { fase: 'Fase 1', actividad: 'Diagnóstico integral fiscal, laboral y corporativo', tiempo: '2 a 4 semanas' },
      { fase: 'Fase 2', actividad: 'Regularización laboral y migración jurídica a Persona Moral', tiempo: '4 a 8 semanas' },
      { fase: 'Fase 3', actividad: 'Despliegue de Compliance Corporativo y Gobierno', tiempo: '3 a 6 semanas' },
      { fase: 'Fase 4', actividad: 'Supervisión técnica y auditoría fiscal continua', tiempo: 'Permanente' }
    ],
    fees: {
      diagnostico: '$45,000 a $85,000 MXN + IVA',
      implementacion: '$120,000 a $350,000 MXN + IVA',
      iguala: '$18,000 a $60,000 MXN + IVA'
    }
  },
  {
    id: 'c2',
    companyName: 'Manufacturas y Empaques de Querétaro S.A.P.I de C.V.',
    rfc: 'MEQ-210512-AB3',
    regimenActual: 'Persona Moral S.A. de C.V.',
    antiguedad: 5,
    situacionLaboral: 'Todos los trabajadores registrados formalmente con salario base real ante IMSS',
    objetivoComercial: 'Expandir exportación de empaques polímeros a EE.UU. e integrarse a cadenas automotrices globales.',
    ingresosAnuales: 'Superior a $50 MDP MXN',
    sociosCount: 4,
    crecimientoProyectado: 'alto',
    riskScore: 'Bajo',
    progress: 95,
    industry: 'Sector Manufacturero',
    lastUpdated: '28/05/2026',
    executiveSummary: {
      regimenActual: 'Persona Moral - Sociedad Anónima (Régimen General)',
      antiguedad: '5 años',
      situacionLaboral: 'Cumplimiento absoluto del padrón de personal en IMSS con salario real.',
      objetivoComercial: 'Establecer contratos de exportación e integrarse como proveedor transnacional directo.',
      riesgoFiscal: 'Bajo',
      riesgoLaboral: 'Bajo',
      riesgoPatrimonial: 'Bajo',
      necesidadInstitucionalizacion: 'Media',
      recomendacionPreliminar: 'Mantener estructura corporativa de SAPI, optimizar estímulos y fideicomisos tributarios.',
      prioridadInmediata: 'Reforzar manuales de comercio exterior (RECO) y auditorías preventivas cruzadas.'
    },
    checklist: [
      { id: 'f_1', category: 'fiscal', name: 'Constancia de situación fiscal', status: 'Cargado', fileName: 'CSF_Quereto_PM.pdf', loadedAt: '10/04/2026' },
      { id: 'f_2', category: 'fiscal', name: 'Opinión positiva SAT (Art. 32-D)', status: 'Cargado', fileName: 'Opinion_32D_MEQ_Mayo.pdf', loadedAt: '05/05/2026' },
      { id: 'f_3', category: 'fiscal', name: 'Declaraciones anuales últimos 5 ejercicios', status: 'Cargado', fileName: 'Anuales_Quereto_21_25.zip', loadedAt: '12/04/2026' },
      { id: 'f_4', category: 'fiscal', name: 'Declaraciones mensuales del año en curso', status: 'Cargado', fileName: 'Mensuales_Quereto_2026.pdf', loadedAt: '18/05/2026' },
      { id: 'f_5', category: 'fiscal', name: 'CFDI emitidos y recibidos (XML/PDF)', status: 'Cargado', fileName: 'BalanzaCFDI_Integradora.zip', loadedAt: '18/05/2026' },
      { id: 'f_6', category: 'fiscal', name: 'Papeles de trabajo fiscales integrados', status: 'Cargado', fileName: 'PapelesFisc_2025.xlsx', loadedAt: '19/04/2026' },
      { id: 'f_7', category: 'fiscal', name: 'Relación de clientes principales', status: 'Cargado', fileName: 'DirectorioClientes_Exportacion.xlsx', loadedAt: '20/04/2026' },
      { id: 'f_8', category: 'fiscal', name: 'Relación de proveedores clave', status: 'Cargado', fileName: 'SuministroProveedores_MEQ.xlsx', loadedAt: '22/04/2026' },
      { id: 'f_9', category: 'fiscal', name: 'Requerimientos SAT previos recibidos', status: 'Cargado', fileName: 'AcuseRecibo_SAT_Notificaciones.pdf', loadedAt: '25/04/2026' },
      { id: 'f_10', category: 'fiscal', name: 'Créditos fiscales o adeudos registrados', status: 'Cargado', fileName: 'CertificacionesNoAdeudo_SAT.pdf', loadedAt: '11/05/2026' },
      { id: 'fn_1', category: 'financiera', name: 'Estados financieros auditados', status: 'Cargado', fileName: 'AuditoriaContable_2025_MEQ.pdf', loadedAt: '20/04/2026' },
      { id: 'fn_2', category: 'financiera', name: 'Estado de resultados mensual', status: 'Cargado', fileName: 'EdoResultados_Q1_2026.xlsx', loadedAt: '10/05/2026' },
      { id: 'fn_3', category: 'financiera', name: 'Estado de Flujo de efectivo actual', status: 'Cargado', fileName: 'Flujos_Efectivo_Actual.pdf', loadedAt: '15/05/25' },
      { id: 'fn_4', category: 'financiera', name: 'Catálogo de Inventarios', status: 'Cargado', fileName: 'CatalogoInv_Polimeros_Resinas.xlsx', loadedAt: '12/04/2026' },
      { id: 'fn_5', category: 'financiera', name: 'Relación analítica de Activos fijos', status: 'Cargado', fileName: 'ActivosCalculados_Quereto.xlsx', loadedAt: '15/04/2026' },
      { id: 'fn_6', category: 'financiera', name: 'Endeudamiento bancario y pasivos', status: 'Cargado', fileName: 'PasivosFinancieros_Banorte.pdf', loadedAt: '16/04/2026' },
      { id: 'fn_7', category: 'financiera', name: 'Reporte del Margen operativo', status: 'Cargado', fileName: 'MargenesLineasProduc.xlsx', loadedAt: '19/04/2026' },
      { id: 'fn_8', category: 'financiera', name: 'Proyección de crecimiento financiero', status: 'Cargado', fileName: 'ModelosFinancieros_2026_2031.pdf', loadedAt: '20/04/2026' },
      { id: 'l_1', category: 'laboral', name: 'Número real de trabajadores activos', status: 'Cargado', fileName: 'PadrónCompleto_MEQ.xlsx', loadedAt: '20/04/2026' },
      { id: 'l_2', category: 'laboral', name: 'Número registrado formalmente ante el IMSS', status: 'Cargado', fileName: 'AcuseIDSE_PlantillaGral.pdf', loadedAt: '21/04/2026' },
      { id: 'l_3', category: 'laboral', name: 'Contratos laborales individuales o colectivos', status: 'Cargado', fileName: 'ContratoColectivoST_MEQ.pdf', loadedAt: '22/04/2026' },
      { id: 'l_4', category: 'laboral', name: 'Evidencia de nómina bancaria de salarios', status: 'Cargado', fileName: 'NominaBancaria_Timbrados.zip', loadedAt: '15/05/2026' },
      { id: 'l_5', category: 'laboral', name: 'Salarios reales vs registrados', status: 'Cargado', fileName: 'ConciliacionIDSE_Contabilidad.xlsx', loadedAt: '18/05/2026' },
      { id: 'l_6', category: 'laboral', name: 'Prestaciones otorgadas extralegales', status: 'Cargado', fileName: 'ClausulasPrestacionSuperior.pdf', loadedAt: '12/05/2026' },
      { id: 'l_7', category: 'laboral', name: 'Riesgos o historial de demandas laborales', status: 'Cargado', fileName: 'ConstanciaCeroLitigios_STPS.pdf', loadedAt: '10/05/2026' }
    ],
    fiscalRisks: [
      { area: 'ISR', risk: 'Bajo', desc: 'Sólida deducibilidad de activos industriales e importación. Deducciones amortizadas conforme a directivas vigentes.' },
      { area: 'IVA', risk: 'Bajo', desc: 'Devoluciones de saldos a favor por tasa 0% de exportación gestionadas exitosamente con trazabilidad mensual.' },
      { area: 'Nómina', risk: 'Bajo', desc: 'Sistema ERP sincronizado que mitiga discrepancias en timbrado de asimilados o salarios informales.' },
      { area: 'IMSS', risk: 'Bajo', desc: 'Todo el personal en planta industrial está debidamente afiliado al IMSS con su salario base de cotización real.' },
      { area: 'Patrimonial', risk: 'Bajo', desc: 'Estructura mercantil robusta que desliga los activos de los accionistas ante eventualidades de terceros.' },
      { area: 'Compliance', risk: 'Bajo', desc: 'Manuales de control de calidad exigentes, en vías de auditoría para certificaciones internacionales.' },
      { area: 'Contabilidad', risk: 'Bajo', desc: 'Gobierno contable maduro con auditorías anuales dictaminadas por terceros certificados.' }
    ],
    legalRecommendation: {
      option: 'Mantener S.A.P.I. de C.V.',
      preliminaryRecommendation: 'Se recomienda asegurar la vigencia de estatutos de protección de minorías y preparar asambleas anuales.',
      reason: 'El modelo promotor es óptimo para la consolidación comercial global y posterior atracción de capital privado norteamericano.',
      advantages: 'Estándar global de gobierno corporativo, flexibilidad de asambleas, exclusividad en contratos estructurados y resguardo del Know-How mediante fideicomisos.',
      disadvantages: 'Gastos de auditoría de terceros y formalidad operativa que consume tiempo del directivo general.'
    },
    laborImplications: [
      { riesgo: 'Alineación Total LFT', implicacion: 'Tasa cero de demandas activas y consolidación del clima laboral preventivo.' },
      { riesgo: 'Auditoría REPSE Secundaria', implicacion: 'Protección indirecta al auditar subcontratistas automotrices antes de la entrada a planta.' }
    ],
    laborRecommendations: [
      '1. Auditoría de control periódico a subcontratistas en cadena de suministro (REPSE)',
      '2. Simulacros técnicos de visitas STPS de seguridad y salud',
      '3. Robustecimiento de planes de capacitación y adiestramiento (Comisiones Mixtas)'
    ],
    proposedStrategy: [
      { fase: 'Fase 1', actividad: 'Auditoría preventiva de comercio exterior e IVA tasa 0%', tiempo: '2 a 3 semanas' },
      { fase: 'Fase 2', actividad: 'Formalización de protección de propiedad industrial en patentes', tiempo: '3 a 5 semanas' },
      { fase: 'Fase 3', actividad: 'Supervisión de comités de gobierno corporativo y junta directiva', tiempo: 'Permanente' }
    ],
    fees: {
      diagnostico: '$65,000 a $95,000 MXN + IVA',
      implementacion: '$150,000 a $400,000 MXN + IVA',
      iguala: '$25,000 a $75,000 MXN + IVA'
    }
  },
  {
    id: 'c3',
    companyName: 'Logística y Transportes Continental S. de R.L. de C.V.',
    rfc: 'LTC-140830-KM7',
    regimenActual: 'Persona Moral S.A. de C.V.',
    antiguedad: 12,
    situacionLaboral: 'Subcontratación de servicios especializados con proveedores sin REPSE',
    objetivoComercial: 'Firma de contratos de distribución de largo plazo con fábricas automotores internacionales.',
    ingresosAnuales: '$10 MDP a $50 MDP MXN',
    sociosCount: 2,
    crecimientoProyectado: 'alto',
    riskScore: 'Crítico',
    progress: 55,
    industry: 'Logística y Transporte',
    lastUpdated: '29/05/2026',
    executiveSummary: {
      regimenActual: 'Persona Moral - Sociedad de Responsabilidad Limitada',
      antiguedad: '12 años',
      situacionLaboral: 'Subconcontratación de maniobras terrestres con contratistas que omitieron registro REPSE.',
      objetivoComercial: 'Obtener distribución dedicada automotriz con cumplimiento regulatorio de alta exigencia.',
      riesgoFiscal: 'Medio',
      riesgoLaboral: 'Crítico',
      riesgoPatrimonial: 'Bajo',
      necesidadInstitucionalizacion: 'Alta',
      recomendacionPreliminar: 'Regularizar cadena de maniobras, migrar a S.A. de C.V. para robustecer la captación de crédito en unidades de arrastre.',
      prioridadInmediata: 'Cese de pagos a proveedores de logística sin REPSE vigente; auditoría expresa.'
    },
    checklist: [
      { id: 'f_1', category: 'fiscal', name: 'Constancia de situación fiscal', status: 'Cargado', fileName: 'CSF_Continental_Transporte.pdf', loadedAt: '11/05/2026' },
      { id: 'f_2', category: 'fiscal', name: 'Opinión positiva SAT (Art. 32-D)', status: 'Cargado', fileName: 'OpinionSAT_LTC_Mayo.pdf', loadedAt: '12/05/2026' },
      { id: 'f_3', category: 'fiscal', name: 'Declaraciones anuales últimos 5 ejercicios', status: 'Cargado', fileName: 'Anuales_Continental_21_25.pdf', loadedAt: '15/05/2026' },
      { id: 'f_4', category: 'fiscal', name: 'Declaraciones mensuales del año en curso', status: 'Pendiente' },
      { id: 'f_5', category: 'fiscal', name: 'CFDI emitidos y recibidos (XML/PDF)', status: 'Pendiente' },
      { id: 'l_1', category: 'laboral', name: 'Número real de trabajadores activos', status: 'Cargado', fileName: 'Choferes_Mecanicos_Padrón.xlsx', loadedAt: '18/05/2026' },
      { id: 'l_2', category: 'laboral', name: 'Número registrado formalmente ante el IMSS', status: 'Pendiente' },
      { id: 'l_3', category: 'laboral', name: 'Contratos laborales individuales o colectivos', status: 'Cargado', fileName: 'ContratosIndividuales_ChoferFlota.pdf', loadedAt: '20/05/2026' },
      { id: 'l_4', category: 'laboral', name: 'Evidencia de nómina bancaria de salarios', status: 'Pendiente' },
      { id: 'lg_1', category: 'legal', name: 'Contratos con clientes de gran escala', status: 'Cargado', fileName: 'Contrato_Suministro_Toyota_Logistics.pdf', loadedAt: '12/05/2026' },
      { id: 'lg_2', category: 'legal', name: 'Contratos bilaterales con proveedores clave', status: 'Pendiente' },
      { id: 'lg_3', category: 'legal', name: 'Marcas registradas ante el IMPI', status: 'Pendiente' },
      { id: 'lg_4', category: 'legal', name: 'Permisos, licencias corporativas', status: 'Cargado', fileName: 'Permiso_SCT_CargasGenerales.pdf', loadedAt: '14/05/2026' }
    ],
    fiscalRisks: [
      { area: 'ISR', risk: 'Medio', desc: 'Deducibilidad de facturas de combustible e insumos pesados bajo observación por irregularidades de trazabilidad fiscal.' },
      { area: 'IVA', risk: 'Alto', desc: 'Riesgo de no acreditamiento de IVA pagado a contratistas de manioabras que carezcan de registro REPSE.' },
      { area: 'Nómina', risk: 'Medio', desc: 'La nómina directa de los choferes está timbrada, pero hay asimetría de retenciones de viáticos.' },
      { area: 'IMSS', risk: 'Crítico', desc: 'Falta de registro unificado e incapacidad para solventar riesgo solidario de estibadores provistos por subcontratistas.' },
      { area: 'Patrimonial', risk: 'Bajo', desc: 'Adecuadamente blindada mediante S. de R.L., pero expuesta a afectación de flujos operativos líquidos por demandas laborales.' },
      { area: 'Compliance', risk: 'Alto', desc: 'No pasa auditorías de corporaciones trasnacionales debido a la informalidad técnica de subcontratación de transporte.' },
      { area: 'Contabilidad', risk: 'Medio', desc: 'Retraso crítico en conciliaciones de libros debido a la dispersión de fletes de arrastre.' }
    ],
    legalRecommendation: {
      option: 'Migrar a S.A. de C.V. (Sociedad Anónima de Capital Variable)',
      preliminaryRecommendation: 'Reestructuración inmediata de la proveeduría de servicios especializados e inicio de asamblea extraordinaria de conversión mercantil.',
      reason: 'El modelo SA de CV abre las puertas a líneas sólidas de arrendamiento de equipo de transporte (Leasing) y brinda la reputación requerida ante consejos de administración de armadoras mundiales.',
      advantages: 'Mayor acceso a apalancamientos bancarios, facilidad de transmisión corporativa para nuevos socios flotilleros, blindaje comercial para licitaciones federales.',
      disadvantages: 'Necesidad de nombramiento de comisario de vigilancia y mayores aranceles notariales en asambleas ordinarias.'
    },
    laborImplications: [
      { riesgo: 'Contratista sin REPSE', implicacion: 'No deducibilidad fiscal automática del servicio de acarreo e impago de IVA.' },
      { riesgo: 'Siniestralidad en maniobras', implicacion: 'Responsabilidad solidaria patronal directa con capitales del IMSS astronómicos ante lesiones.' }
    ],
    laborRecommendations: [
      '1. Implementación de una mesa de control REPSE de proveedores',
      '2. Regularización del timbrado de viáticos para choferes federales',
      '3. Migración de plantilla crítica de estiba a esquema de asimilados o nómina directa formalizada'
    ],
    proposedStrategy: [
      { fase: 'Fase 1', actividad: 'Auditoría urgente de REPSE a toda la cadena de proveedores', tiempo: '1 a 2 semanas' },
      { fase: 'Fase 2', actividad: 'Protocolo de asamblea extraordinaria para conversión a S.A. de C.V.', tiempo: '4 a 6 semanas' },
      { fase: 'Fase 3', actividad: 'Elaboración de manuales de cumplimiento Carta Porte fiscal', tiempo: '3 a 5 semanas' }
    ],
    fees: {
      diagnostico: '$55,000 a $90,000 MXN + IVA',
      implementacion: '$140,000 a $380,000 MXN + IVA',
      iguala: '$22,000 a $65,000 MXN + IVA'
    }
  },
  {
    id: 'c4',
    companyName: 'Comercializadora de Granos del Pacífico S.P.R. de R.L.',
    rfc: 'CGP-081123-9T1',
    regimenActual: 'Persona Física con Actividad Empresarial',
    antiguedad: 18,
    situacionLaboral: 'Existen trabajadores no registrados completamente ante IMSS / Nómina informal',
    objetivoComercial: 'Acceder a financiamiento agrícola preferente garantizado por programas FIRA.',
    ingresosAnuales: '$10 MDP a $50 MDP MXN',
    sociosCount: 5,
    crecimientoProyectado: 'moderado',
    riskScore: 'Alto',
    progress: 30,
    industry: 'Sector Agrícola y Primario',
    lastUpdated: '25/05/2026',
    executiveSummary: {
      regimenActual: 'Persona Física con Actividad Empresarial AGAPES',
      antiguedad: '18 años',
      situacionLaboral: 'Jornaleros del campo pagados con cheques o efectivo semanal sin afiliación IMSS.',
      objetivoComercial: 'Obtener créditos de avío y refaccionarios para ampliación de distritos de riego.',
      riesgoFiscal: 'Alto',
      riesgoLaboral: 'Alto',
      riesgoPatrimonial: 'Alto',
      necesidadInstitucionalizacion: 'Extrema',
      recomendacionPreliminar: 'Crear una Sociedad de Producción Rural de Responsabilidad Limitada (S.P.R de R.L.) para captar fondos formales y limitar contingencias.',
      prioridadInmediata: 'Cese de pagos en efectivo no bancarizados; bancarización de nómina agrícola mínima.'
    },
    checklist: [
      { id: 'f_1', category: 'fiscal', name: 'Constancia de situación fiscal', status: 'Cargado', fileName: 'CSF_Granos_Pacifica.pdf', loadedAt: '12/05/2026' },
      { id: 'f_2', category: 'fiscal', name: 'Opinión positiva SAT (Art. 32-D)', status: 'Pendiente' },
      { id: 'fn_1', category: 'financiera', name: 'Estados financieros auditados', status: 'Pendiente' },
      { id: 'fn_5', category: 'financiera', name: 'Relación analítica de Activos fijos', status: 'Cargado', fileName: 'Tractores_ActivosSuelo.pdf', loadedAt: '20/05/2026' },
      { id: 'l_1', category: 'laboral', name: 'Número real de trabajadores activos', status: 'Pendiente' },
      { id: 'lg_1', category: 'legal', name: 'Contratos con clientes de gran escala', status: 'Cargado', fileName: 'Acuerdo_Comercial_GranoSinaloa.pdf', loadedAt: '12/05/2026' }
    ],
    fiscalRisks: [
      { area: 'ISR', risk: 'Alto', desc: 'Riesgo inminente por depósitos que exceden límites de exención fiscal de Persona Física del sector primario.' },
      { area: 'IVA', risk: 'Medio', desc: 'Falta de correlación técnica del IVA acreditable por adquisición de maquinaria pesada e infraestructura hidráulica.' },
      { area: 'Nómina', risk: 'Alto', desc: 'Falta total de timbrado en jornales agrícolas ejidales, provocando no deducibilidad del gasto productivo primario.' },
      { area: 'IMSS', risk: 'Alto', desc: 'Riesgo de inspecciones coactivas por accidentes en jornaleras de recolección sin póliza colectiva de campo.' },
      { area: 'Patrimonial', risk: 'Alto', desc: 'Terrenos cultivables, tractores y residencia garantizan directamente determinaciones fiscales del SAT sobre la PF.' },
      { area: 'Compliance', risk: 'Alto', desc: 'Garantías de financiamientos FIRA rechazadas por la informalidad e inexistencia de registros societarios.' },
      { area: 'Contabilidad', risk: 'Medio', desc: 'Prácticas empíricas de contabilidad fiscal sin balances de flujo.' }
    ],
    legalRecommendation: {
      option: 'S.P.R. de R.L. (Sociedad de Producción Rural de Responsabilidad Limitada)',
      preliminaryRecommendation: 'Migración urgente para blindaje ejidal corporativo y usufructo de estímulos fiscales del sector primario.',
      reason: 'Estructura óptima para agrupar productores, delimitar legalmente la propiedad ejidal frente a herencias y formalizar la nómina agrícola de forma escalonada.',
      advantages: 'Amplias exenciones fiscales colectivas conforme a la Ley del ISR, separación patrimonial de predios, facilidad de dispersión ejidal y elegibilidad preferencial para créditos del sector primario.',
      disadvantages: 'Rigidez en estatutos de herencia y requerimiento de libros de registro agrario certificados.'
    },
    laborImplications: [
      { riesgo: 'Jornales en efectivo', implicacion: 'Informalidad legal absoluta, no deducibilidad e imposibilidad de acreditar los principales costos.' },
      { riesgo: 'Riesgo Ejidal', implicacion: 'Disputas territoriales y embargos que comprometen maquinaria de alto costo.' }
    ],
    laborRecommendations: [
      '1. Instrumentación de contratos ejidales reglamentarios colectivos',
      '2. Implementación de dispersión bancaria para jornaleros fijos',
      '3. Cobertura del Seguro Social mediante el régimen agrícola de campo simplificado'
    ],
    proposedStrategy: [
      { fase: 'Fase 1', actividad: 'Constitución formal agraria de la SPR de RL de ejido', tiempo: '3 a 4 semanas' },
      { fase: 'Fase 2', actividad: 'Censo de jornaleros e integración bajo un esquema simplificado IMSS', tiempo: '4 a 6 semanas' },
      { fase: 'Fase 3', actividad: 'Auditoría técnico-financiera para validación de créditos agrícolas', tiempo: '3 a 5 semanas' }
    ],
    fees: {
      diagnostico: '$50,000 a $80,000 MXN + IVA',
      implementacion: '$130,000 a $320,000 MXN + IVA',
      iguala: '$20,000 a $55,000 MXN + IVA'
    }
  },
  {
    id: 'c5',
    companyName: 'TecnoServicios Innovación Digital S.A. de C.V.',
    rfc: 'TID-240210-992',
    regimenActual: 'Persona Moral S.A. de C.V.',
    antiguedad: 2,
    situacionLaboral: 'Subcontratación de servicios especializados con proveedores sin REPSE', // Asimilados/mixto
    objetivoComercial: 'Firmar alianzas B2B con entidades financieras reguladas por la CNBV.',
    ingresosAnuales: '$10 MDP a $50 MDP MXN',
    sociosCount: 3,
    crecimientoProyectado: 'alto',
    riskScore: 'Medio',
    progress: 72,
    industry: 'Tecnología y Software',
    lastUpdated: '31/05/2026',
    executiveSummary: {
      regimenActual: 'Persona Moral - Sociedad Anónima de Capital Variable',
      antiguedad: '2 años',
      situacionLaboral: 'Nómina mixta y retenciones mediante esquemas asimilados a salarios en un 70% del personal de ingeniería.',
      objetivoComercial: 'Pass filtros rigurosos de prevención (KYC) para alianzas financieras regulatorias de software.',
      riesgoFiscal: 'Alto',
      riesgoLaboral: 'Alto',
      riesgoPatrimonial: 'Bajo',
      necesidadInstitucionalizacion: 'Media',
      recomendacionPreliminar: 'Migrar asimilados críticos a nómina integrada nominal directa; robustecer gobierno de SAPI.',
      prioridadInmediata: 'Cese programado de retenciones dudosas asimiladas de ingenieros de planta.'
    },
    checklist: [
      { id: 'f_1', category: 'fiscal', name: 'Constancia de situación fiscal', status: 'Cargado', fileName: 'CSF_TecnoServicios.pdf', loadedAt: '15/05/2026' },
      { id: 'f_2', category: 'fiscal', name: 'Opinión positiva SAT (Art. 32-D)', status: 'Cargado', fileName: 'OpinionSAT_TID_Mayo.pdf', loadedAt: '16/05/2026' },
      { id: 'f_3', category: 'fiscal', name: 'Declaraciones anuales últimos 5 ejercicios', status: 'Cargado', fileName: 'DeclAnual_2025_TID.pdf', loadedAt: '18/05/2026' },
      { id: 'fn_1', category: 'financiera', name: 'Estados financieros auditados', status: 'Cargado', fileName: 'Edo_Posicion_TID_2025.pdf', loadedAt: '12/05/2026' },
      { id: 'fn_2', category: 'financiera', name: 'Estado de resultados mensual', status: 'Pendiente' },
      { id: 'l_1', category: 'laboral', name: 'Número real de trabajadores activos', status: 'Cargado', fileName: 'PadrónIngenierosDev.xlsx', loadedAt: '20/05/2026' },
      { id: 'l_3', category: 'laboral', name: 'Contratos laborales individuales o colectivos', status: 'Pendiente' },
      { id: 'lg_1', category: 'legal', name: 'Contratos con clientes de gran escala', status: 'Cargado', fileName: 'Contrato_SoftwareVigilancia_Fintech.pdf', loadedAt: '11/05/2026' },
      { id: 'lg_3', category: 'legal', name: 'Marcas registradas ante el IMPI', status: 'Cargado', fileName: 'IMPI_RegistroMarca_VERTA_Code.pdf', loadedAt: '11/05/2026' }
    ],
    fiscalRisks: [
      { area: 'ISR', risk: 'Alto', desc: 'Riesgo de recalificación por asimilados con presencia diaria obligatoria calificados como relaciones veladas por el SAT.' },
      { area: 'IVA', risk: 'Bajo', desc: 'Operaciones tecnológicas mayormente tasadas al 16% con trazabilidad de transferencias adecuada.' },
      { area: 'Nómina', risk: 'Alto', desc: 'Falta de timbrado ordinario del salario total, reportando únicamente mínimos y compensaciones asimiladas.' },
      { area: 'IMSS', risk: 'Alto', desc: 'Trabajadores con alta base salarial real subreportados ante el IMSS; riesgo inminente de demandas por prestaciones.' },
      { area: 'Patrimonial', risk: 'Bajo', desc: 'Constitución idónea de Persona Moral que aisla el activo personal e intelectual de fundadores.' },
      { area: 'Compliance', risk: 'Alto', desc: 'Contraloría de bancos aliados audita la veracidad laboral del personal tecnológico para evitar responsabilidad solidaria laboral.' },
      { area: 'Contabilidad', risk: 'Bajo', desc: 'Sistemas automatizados en nube con controles de flujo estables.' }
    ],
    legalRecommendation: {
      option: 'Conservar SA de CV o migrar a SAPI con pacto especial de accionistas (Vesting)',
      preliminaryRecommendation: 'Estabilizar el esquema nominal previo a rondas de inversión técnica Serie A.',
      reason: 'Preservar SA de CV pero implementando contratos serios de retención de capital intelectual y planes bursátiles de Stock Options o reglamentos de Vesting.',
      advantages: 'Atracción directa de Venture Capital, validas estatutos mercantiles ante la CNBV, blindaje de marcas intangibles y patentes.',
      disadvantages: 'Aumento salarial inmediato que impacta el margen de EBITDA en un 15%.'
    },
    laborImplications: [
      { riesgo: 'Simulación por Mixto/Asimilados', implicacion: 'Multración civil de asimilados que ejercen funciones críticas de ingeniería y riesgo de descapitalización.' },
      { riesgo: 'Propiedad de código', implicacion: 'Disputas sobre la propiedad del código de base del software en ausencia de contratos firmados.' }
    ],
    laborRecommendations: [
      '1. Implementación de contratos de cesión de propiedad intelectual (Código base)',
      '2. Reclutamiento gradual al esquema nominal 100% integrado',
      '3. Diseñar planes estructurados de incentivos no salariales (Equity Plan)'
    ],
    proposedStrategy: [
      { fase: 'Fase 1', actividad: 'Auditoría fiscal de deducción de asimilados a salarios', tiempo: '2 semanas' },
      { fase: 'Fase 2', actividad: 'Redacción de contratos de confidencialidad NDA y propiedad intelectual', tiempo: '3 semanas' },
      { fase: 'Fase 3', actividad: 'Migración parcial de ingenieros senior al esquema nominal integral', tiempo: '4 semanas' }
    ],
    fees: {
      diagnostico: '$40,000 a $70,000 MXN + IVA',
      implementacion: '$110,000 a $280,000 MXN + IVA',
      iguala: '$15,000 a $45,000 MXN + IVA'
    }
  }
];

export function ComplianceResults() {
  const [selectedClientId, setSelectedClientId] = useState<string>('c1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTabSheet, setActiveTabSheet] = useState<number>(0);
  const [riskFilter, setRiskFilter] = useState<string>('todos');

  // Search and Filter clients
  const filteredClients = useMemo(() => {
    return CONSTANT_CLIENTS.filter(client => {
      const matchesSearch = client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            client.rfc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            client.industry.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRisk = riskFilter === 'todos' || client.riskScore.toLowerCase() === riskFilter.toLowerCase();
      
      return matchesSearch && matchesRisk;
    });
  }, [searchQuery, riskFilter]);

  // Active client data
  const client = useMemo(() => {
    return CONSTANT_CLIENTS.find(c => c.id === selectedClientId) || CONSTANT_CLIENTS[0];
  }, [selectedClientId]);

  // Statistics across directory
  const directoryStats = useMemo(() => {
    const total = CONSTANT_CLIENTS.length;
    const avgProgress = Math.round(CONSTANT_CLIENTS.reduce((acc, c) => acc + c.progress, 0) / total);
    const criticalCount = CONSTANT_CLIENTS.filter(c => c.riskScore === 'Crítico').length;
    const highCount = CONSTANT_CLIENTS.filter(c => c.riskScore === 'Alto').length;
    const mediumCount = CONSTANT_CLIENTS.filter(c => c.riskScore === 'Medio').length;
    const lowCount = CONSTANT_CLIENTS.filter(c => c.riskScore === 'Bajo').length;

    return { total, avgProgress, criticalCount, highCount, mediumCount, lowCount };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in text-sans text-white">
      
      {/* HEADER SECTION */}
      <section className="relative px-4 lg:px-8 py-10 overflow-hidden border-b border-verta-slate-blue/30 metal-texture">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-verta-cyan/5 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[110px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-verta-cyan/15 to-verta-cobalt/15 border border-verta-cyan/30 px-3 py-1 rounded-full text-xs font-mono text-verta-cyan animate-pulse">
              <BarChart4 className="w-3.5 h-3.5" />
              <span>REGISTROS HISTÓRICOS Y DIAGNÓSTICOS</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
              Expedientes & Compliance Results
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
              Consulte la bitácora ejecutiva de diagnósticos. Explore los 5 casos de estudio documentados con sus matrices de riesgo SAT, IMSS y recomendaciones jurídicas formuladas por el consejo VERTA.
            </p>
          </div>

          {/* Quick stats panel */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="verta-glass border-verta-slate-blue/50 p-3.5 rounded-xl text-center min-w-[120px]">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Clientes</span>
              <span className="text-2xl font-black font-mono text-white">
                {directoryStats.total}
              </span>
              <span className="block text-[9px] text-gray-500 font-mono mt-0.5">REGISTRADOS</span>
            </div>
            <div className="verta-glass border-verta-slate-blue/50 p-3.5 rounded-xl text-center min-w-[120px]">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Progreso Promedio</span>
              <span className="text-2xl font-black font-mono text-verta-cyan">
                {directoryStats.avgProgress}%
              </span>
              <span className="block text-[9px] text-gray-500 font-mono mt-0.5">COMPILACIÓN EXPEDIENTE</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: LIST OF CLIENTS & DIRECTORY SEARCH */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* SEARCH & FILTERS DOCK */}
          <div className="verta-glass border-verta-slate-blue/40 rounded-2xl p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-verta-slate-blue/20 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <Filter className="w-4 h-4 text-verta-cyan" />
                <span>Búsqueda y Filtros</span>
              </h3>
              <span className="text-[10px] font-mono text-gray-400 bg-verta-slate-blue/20 px-2 py-0.5 rounded-full">
                {filteredClients.length} de {directoryStats.total}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por cliente o RFC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 focus:border-verta-cyan focus:outline-none rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 font-sans"
              />
            </div>

            {/* Risk Category Filters */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Nivel de Riesgo</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'todos', name: 'Todos' },
                  { id: 'critico', name: '🔴 Crítico' },
                  { id: 'alto', name: '⚠️ Alto' },
                  { id: 'medio', name: '🟡 Medio' },
                  { id: 'bajo', name: '✔️ Bajo' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setRiskFilter(item.id)}
                    className={`px-2.5 py-1 text-[10px] font-mono rounded-lg transition-all cursor-pointer border ${
                      riskFilter === item.id 
                        ? 'bg-verta-cyan/20 border-verta-cyan text-white shadow-sm'
                        : 'bg-verta-navy/40 border-verta-slate-blue/30 text-gray-400 hover:text-white hover:bg-verta-slate-blue/20'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* CLIENT LISTING */}
          <div className="space-y-3">
            {filteredClients.length === 0 ? (
              <div className="p-8 text-center verta-glass border-verta-slate-blue/40 rounded-2xl text-gray-500 font-sans space-y-2">
                <AlertCircle className="w-8 h-8 text-warn mx-auto text-amber-500" />
                <p className="text-sm">No se encontraron clientes.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setRiskFilter('todos'); }}
                  className="text-xs text-verta-cyan underline cursor-pointer"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              filteredClients.map(c => {
                const isSelected = c.id === selectedClientId;
                const riskColors = {
                  'Crítico': 'text-verta-rose border-verta-rose/30 bg-verta-rose/10',
                  'Alto': 'text-verta-coral border-verta-coral/30 bg-verta-coral/10',
                  'Medio': 'text-amber-400 border-amber-400/30 bg-amber-400/10',
                  'Bajo': 'text-verta-emerald border-verta-emerald/30 bg-verta-emerald/10'
                };

                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedClientId(c.id);
                      setActiveTabSheet(0); // Reset sheet tab to Executive Summary
                    }}
                    className={`p-4 border rounded-2xl transition-all cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden group ${
                      isSelected
                        ? 'bg-verta-cyan/5 border-verta-cyan shadow-[0_4px_20px_rgba(6,182,212,0.1)]'
                        : 'bg-verta-navy/40 border-verta-slate-blue/40 hover:border-verta-slate-blue hover:bg-verta-navy/60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-gray-500 block truncate uppercase tracking-widest">{c.industry}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border shrink-0 ${riskColors[c.riskScore]}`}>
                          {c.riskScore}
                        </span>
                      </div>
                      
                      <h4 className="font-bold text-sm text-white group-hover:text-verta-cyan transition-colors pr-2 truncate">
                        {c.companyName}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-mono font-semibold">{c.rfc}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-verta-slate-blue/20 pt-2 text-[10px] font-mono text-gray-400">
                      <span>Expediente:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-verta-cyan h-full rounded-full" style={{ width: `${c.progress}%` }} />
                        </div>
                        <span className="text-white font-bold">{c.progress}%</span>
                      </div>
                    </div>

                    {/* Active hover accent */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-verta-cyan to-verta-cobalt" />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* COMPLIANCE BLUEPRINT EXCISE MANUAL */}
          <div className="verta-glass border-verta-slate-blue/40 rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-xs font-mono text-white flex items-center space-x-2 border-b border-verta-slate-blue/20 pb-2">
              <BookOpen className="w-4.5 h-4.5 text-verta-coral" />
              <span>Instrucciones de Diagnóstico</span>
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed leading-relaxed">
              Los diagnósticos se basan en el <strong>Manual Integral de Compliance de VERTA</strong>. Consisten en la evaluación técnica de matrices de riesgo fiscal y penal estructuradas de acuerdo con la LFT, el CFF, y las directrices del SAT e IMSS.
            </p>
            <div className="text-[10.5px] text-verta-cyan font-semibold flex items-center space-x-1">
              <span>Sujeto a normas de auditoría local</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE 6-SHEET EXECUTIVE EXCEL DIGEST */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* CONTROL WRAPPER HEADER */}
          <div className="verta-glass border-verta-slate-blue/40 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Expediente de Cumplimiento Seleccionado</span>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold text-white font-display">
                  {client.companyName}
                </h2>
                <span className="px-2 py-0.5 bg-verta-slate-blue/30 border border-verta-slate-blue text-[9px] font-mono rounded text-gray-300">
                  ID: {client.id.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Giro o Sector: <strong className="text-white font-semibold font-sans">{client.industry}</strong> • Última auditoría de cierre: <strong className="text-white font-semibold font-mono">{client.lastUpdated}</strong>
              </p>
            </div>

            <div className="flex space-x-2 shrink-0">
              <button
                onClick={handlePrint}
                className="p-2 bg-verta-slate-blue/45 border border-verta-slate-blue text-xs text-gray-300 hover:text-white rounded-xl flex items-center space-x-1.5 transition-all hover:scale-103 cursor-pointer"
                title="Imprimir diagnóstico de formato Excel corporativo"
              >
                <Printer className="w-4 h-4 text-gray-400" />
                <span className="font-mono">Imprimir</span>
              </button>
            </div>
          </div>

          {/* TAB EXCEL WORKBOOK SHEETS (HOJA 1 TO HOJA 6) */}
          <div className="bg-zinc-950 border border-verta-slate-blue/40 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* WORKBOOK TABS CHIPS REGISTER */}
            <div className="bg-verta-navy border-b border-verta-slate-blue/40 flex overflow-x-auto scrollbar">
              {[
                { sheet: 'HOJA 1', label: 'Resumen Ejecutivo' },
                { sheet: 'HOJA 2', label: 'Información Requerida' },
                { sheet: 'HOJA 3', label: 'Diagnóstico Fiscal' },
                { sheet: 'HOJA 4', label: 'Persona Moral' },
                { sheet: 'HOJA 5', label: 'Área Laboral e IMSS' },
                { sheet: 'HOJA 6', label: 'Honorarios' }
              ].map((sheetObj, idx) => {
                const isActive = activeTabSheet === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTabSheet(idx)}
                    className={`py-3.5 px-4.5 text-xs font-mono font-bold tracking-wide border-r border-verta-slate-blue/30 transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 scroll-mx-4 ${
                      isActive 
                        ? 'bg-zinc-950 text-verta-cyan border-t-2 border-t-verta-cyan font-extrabold shadow-inner'
                        : 'text-gray-400 hover:text-white hover:bg-verta-slate-blue/20'
                    }`}
                  >
                    <span className="opacity-60">{sheetObj.sheet}:</span>
                    <span className="font-sans font-semibold">{sheetObj.label}</span>
                  </button>
                );
              })}
            </div>

            {/* SHEET CONTENT AREA PANEL */}
            <div className="p-6 bg-zinc-950 min-h-[480px]">
              
              {/* SHEET 1: EXECUTIVE SUMMARY */}
              {activeTabSheet === 0 && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h3 className="text-sm font-mono font-bold text-verta-cyan uppercase">HOJA 1 — RESUMEN EJECUTIVO</h3>
                    <p className="text-[11px] text-gray-500 font-sans mt-0.5">Visión global de riesgo y recomendaciones inmediatas del cliente.</p>
                  </div>

                  {/* Excel Style Data Grid */}
                  <div className="border border-zinc-800 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-12 bg-zinc-900/60 p-2.5 text-[10px] font-mono font-extrabold border-b border-zinc-800 text-gray-400">
                      <div className="col-span-5 uppercase">Concepto de Diagnóstico</div>
                      <div className="col-span-7 uppercase">Observación / Estado actual</div>
                    </div>

                    <div className="divide-y divide-zinc-900 text-xs">
                      {[
                        { concept: 'Régimen actual', obs: client.executiveSummary.regimenActual },
                        { concept: 'Antigüedad del negocio', obs: client.executiveSummary.antiguedad },
                        { concept: 'Situación laboral detectada', obs: client.executiveSummary.situacionLaboral, accent: true },
                        { concept: 'Objetivo comercial', obs: client.executiveSummary.objetivoComercial },
                        { concept: 'Riesgo fiscal', obs: client.executiveSummary.riesgoFiscal, badge: true },
                        { concept: 'Riesgo laboral', obs: client.executiveSummary.riesgoLaboral, badge: true },
                        { concept: 'Riesgo patrimonial', obs: client.executiveSummary.riesgoPatrimonial, badge: true },
                        { concept: 'Necesidad de institucionalización', obs: client.executiveSummary.necesidadInstitucionalizacion, badge: true },
                        { concept: 'Recomendación preliminar', obs: client.executiveSummary.recomendacionPreliminar, strong: true },
                        { concept: 'Prioridad inmediata', obs: client.executiveSummary.prioridadInmediata, highlight: true },
                      ].map((row, rIdx) => {
                        return (
                          <div key={rIdx} className="grid grid-cols-12 p-3 items-center hover:bg-zinc-900/30 transition-colors">
                            <div className="col-span-5 font-mono text-[11px] text-gray-400">{row.concept}</div>
                            <div className="col-span-7 font-sans">
                              {row.badge ? (
                                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider inline-block ${
                                  row.obs === 'Alto' || row.obs === 'Crítico' || row.obs === 'Extrema'
                                    ? 'bg-verta-rose/10 text-verta-rose border border-verta-rose/20'
                                    : row.obs === 'Medio' || row.obs === 'Media'
                                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                                      : 'bg-verta-emerald/10 text-verta-emerald border border-verta-emerald/20'
                                }`}>
                                  {row.obs}
                                </span>
                              ) : row.highlight ? (
                                <span className="text-verta-cyan font-mono font-bold text-[11px] bg-verta-cyan/5 px-2 py-1 rounded border border-verta-cyan/20">
                                  {row.obs}
                                </span>
                              ) : (
                                <span className={`${row.accent ? 'text-verta-coral font-semibold' : row.strong ? 'text-white font-extrabold text-sm' : 'text-gray-200'}`}>
                                  {row.obs}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footnote style legal alert card */}
                  <div className="bg-verta-navy/40 border border-verta-slate-blue/35 p-4 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-gray-300">
                    <AlertTriangle className="w-4.5 h-4.5 text-verta-coral shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono font-bold text-white block uppercase tracking-widest text-[10px] mb-1">Nota del Auditor General</span>
                      <p className="text-gray-400">
                        Los coeficientes se recalculan asumiendo la escala comercial de ingresos anuales de <strong>{client.ingresosAnuales}</strong> con una base de <strong>{client.sociosCount} socios capitalistas</strong> registrados en actas preliminares.
                      </p>
                    </div>
                  </div>

                </div>
              )}

              {/* SHEET 2: REQUIRED ADDITIONAL INFO */}
              {activeTabSheet === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h3 className="text-sm font-mono font-bold text-verta-cyan uppercase">HOJA 2 — INFORMACIÓN ADICIONAL REQUERIDA</h3>
                    <p className="text-[11px] text-gray-500 font-sans mt-0.5">Control de los soportes y documentos en el expediente virtual.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['fiscal', 'financiera', 'laboral', 'legal'].map(cat => {
                      const items = client.checklist.filter(item => item.category === cat);
                      const catTitles: Record<string, string> = {
                        fiscal: '📂 2.1 Fiscal (SAT)',
                        financiera: '💸 2.2 Financiera',
                        laboral: '👥 2.3 Laboral e IMSS',
                        legal: '⚖️ 2.4 Legal / Corporativa'
                      };

                      return (
                        <div key={cat} className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/20 space-y-3">
                          <h4 className="text-[11px] font-mono font-black text-gray-400 border-b border-zinc-800 pb-1.5 uppercase">
                            {catTitles[cat]}
                          </h4>

                          <div className="space-y-2 text-xs">
                            {items.length === 0 ? (
                              <p className="text-gray-500 font-mono text-[10px] italic">No requiere soportes adicionales en esta categoría.</p>
                            ) : (
                              items.map(item => (
                                <div key={item.id} className="flex justify-between items-start gap-3 bg-zinc-950 p-2 border border-zinc-900 rounded-lg">
                                  <div className="space-y-0.5 min-w-0 flex-1">
                                    <p className="font-semibold text-gray-200 truncate">{item.name}</p>
                                    {item.fileName ? (
                                      <span className="text-[9.5px] font-mono text-verta-emerald block truncate pr-1">
                                        📁 {item.fileName} ({item.loadedAt})
                                      </span>
                                    ) : (
                                      <span className="text-[9.5px] text-gray-500 block font-mono">Falta integración</span>
                                    )}
                                  </div>

                                  <span className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-bold border shrink-0 ${
                                    item.status === 'Cargado'
                                      ? 'bg-verta-emerald/10 text-verta-emerald border-verta-emerald/20'
                                      : item.status === 'No Aplica'
                                        ? 'bg-zinc-800 text-zinc-500 border-zinc-700'
                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                  }`}>
                                    {item.status}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {/* SHEET 3: FISCAL DIAGNOSTIC MODULE */}
              {activeTabSheet === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h3 className="text-sm font-mono font-bold text-verta-cyan uppercase">HOJA 3 — DIAGNÓSTICO FISCAL PRELIMINAR</h3>
                    <p className="text-[11px] text-gray-500 font-sans mt-0.5">Matriz detallada de riesgos y debilidades normativas halladas.</p>
                  </div>

                  <div className="space-y-3">
                    {client.fiscalRisks.map((row, idx) => {
                      return (
                        <div key={idx} className="p-3.5 bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                          <div className="space-y-1 flex-1">
                            <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">Área: {row.area}</span>
                            <p className="text-gray-300 font-sans text-[11.5px] leading-relaxed">{row.desc}</p>
                          </div>

                          <div className="shrink-0 flex items-center md:self-auto self-start">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider ${
                              row.risk === 'Crítico' 
                                ? 'bg-verta-rose/10 text-verta-rose border border-verta-rose/20' 
                                : row.risk === 'Alto'
                                  ? 'bg-verta-coral/10 text-verta-coral border border-verta-coral/20'
                                  : row.risk === 'Medio'
                                    ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                                    : 'bg-verta-emerald/10 text-verta-emerald border border-verta-emerald/20'
                            }`}>
                              {row.risk === 'Crítico' ? '🛑 Crítico' : row.risk === 'Alto' ? '⚠️ Alto' : row.risk === 'Medio' ? '🟡 Medio' : '✔️ Bajo'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Observations Section */}
                  <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-2 text-xs">
                    <span className="font-mono text-white block uppercase tracking-widest text-[10px]">Observaciones Generales de la Hoja</span>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 text-[11px]">
                      <li>La inconsistencia de controles internos duplica la probabilidad de requerimientos automáticos mensuales por discrepancias.</li>
                      <li>La falta de digitalización e indexación XML expone a la empresa a tiempos prolongados de solvencia tributaria ante requerimientos.</li>
                    </ul>
                  </div>

                </div>
              )}

              {/* SHEET 4: CHANGE TO PM OPINION */}
              {activeTabSheet === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h3 className="text-sm font-mono font-bold text-verta-cyan uppercase">HOJA 4 — OPINIÓN SOBRE CAMBIO A PERSONA MORAL</h3>
                    <p className="text-[11px] text-gray-500 font-sans mt-0.5">Puntualización jurídica para migración societaria fiscal.</p>
                  </div>

                  <div className="bg-gradient-to-r from-verta-cyan/10 to-verta-cobalt/10 border border-verta-cyan/35 p-5 rounded-2xl space-y-3">
                    <div className="flex items-center space-x-2 text-verta-cyan font-mono font-bold text-xs uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-verta-cyan" />
                      <span>Recomendación Societaria Idónea</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-white text-base font-display">{client.legalRecommendation.option}</p>
                      <p className="text-xs text-slate-350 leading-relaxed mt-1">{client.legalRecommendation.reason}</p>
                    </div>
                  </div>

                  <p className="text-xs italic text-gray-400">
                    "{client.legalRecommendation.preliminaryRecommendation}"
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="bg-emerald-950/10 border border-emerald-500/20 p-4 rounded-xl space-y-1.5">
                      <span className="font-bold text-verta-emerald block font-mono text-[10px] tracking-widest uppercase">🟢 Ventajas Corporativas</span>
                      <p className="text-slate-300 text-[11.5px] leading-relaxed">{client.legalRecommendation.advantages}</p>
                    </div>
                    <div className="bg-rose-950/10 border border-rose-500/20 p-4 rounded-xl space-y-1.5">
                      <span className="font-bold text-verta-rose block font-mono text-[10px] tracking-widest uppercase">🔴 Desventajas Regulatorias</span>
                      <p className="text-slate-300 text-[11.5px] leading-relaxed">{client.legalRecommendation.disadvantages}</p>
                    </div>
                  </div>

                </div>
              )}

              {/* SHEET 5: LABORAL AND IMSS (HOJA 5) */}
              {activeTabSheet === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h3 className="text-sm font-mono font-bold text-verta-cyan uppercase">HOJA 5 — ÁREA LABORAL E IMSS</h3>
                    <p className="text-[11px] text-gray-500 font-sans mt-0.5">Evaluación técnica bajo el marco de la Ley Federal del Trabajo.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {client.laborImplications.map((row, idx) => (
                      <div key={idx} className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl space-y-2 text-xs">
                        <span className="text-[10px] font-mono text-verta-coral uppercase font-bold block">{row.riesgo}</span>
                        <p className="text-gray-300 text-[11px] leading-relaxed">{row.implicacion}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-2 text-xs">
                    <span className="text-gray-400 font-bold block text-[11px] font-mono uppercase tracking-widest">Recomendaciones del Auditor Laboral:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      {client.laborRecommendations.map((rec, rIdx) => (
                        <div key={rIdx} className="flex items-center space-x-2 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-gray-300 text-[11px]">
                          <CheckCircle className="w-3.5 h-3.5 text-verta-emerald shrink-0" />
                          <span className="truncate">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* SHEET 6: FEES AND PROPOSED STRATEGY */}
              {activeTabSheet === 5 && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h3 className="text-sm font-mono font-bold text-verta-cyan uppercase">HOJA 6 — ESTRATEGIA PROPUESTA & HONORARIOS</h3>
                    <p className="text-[11px] text-gray-500 font-sans mt-0.5">Propuesta económica formalizada para el despliegue del compliance.</p>
                  </div>

                  {/* Fees Grid cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <div className="p-5 border border-zinc-800 bg-zinc-900/10 rounded-xl space-y-3">
                      <span className="text-[9.5px] font-mono text-verta-cyan block uppercase tracking-widest font-bold">FASE 1: DIAGNÓSTICO</span>
                      <p className="font-extrabold text-white text-base">Fase de Diagnóstico Integral</p>
                      <p className="text-xs text-gray-400">Auditoría profunda de soportes fiscales, laborales y legal corporativo.</p>
                      <div className="pt-2 border-t border-zinc-900">
                        <span className="block text-[10px] font-mono text-gray-400">HONORARIOS PROPUESTOS:</span>
                        <span className="text-lg font-black text-verta-cyan font-mono block mt-1">{client.fees.diagnostico}</span>
                      </div>
                    </div>

                    <div className="p-5 border border-zinc-800 bg-zinc-900/10 rounded-xl space-y-3">
                      <span className="text-[9.5px] font-mono text-verta-coral block uppercase tracking-widest font-bold">FASE 2: CONSTITUCIÓN</span>
                      <p className="font-extrabold text-white text-base">Implementación Integral</p>
                      <p className="text-xs text-gray-400">Escrituración de persona moral, convenios y asamblea corporativa formal.</p>
                      <div className="pt-2 border-t border-zinc-900">
                        <span className="block text-[10px] font-mono text-gray-400">HONORARIOS PROPUESTOS:</span>
                        <span className="text-lg font-black text-verta-coral font-mono block mt-1">{client.fees.implementacion}</span>
                      </div>
                    </div>

                    <div className="p-5 border border-zinc-800 bg-zinc-900/10 rounded-xl space-y-3">
                      <span className="text-[9.5px] font-mono text-amber-400 block uppercase tracking-widest font-bold">MENSUAL: IGUALA</span>
                      <p className="font-extrabold text-white text-base">Supervisión Mensual</p>
                      <p className="text-xs text-gray-400">Auditoría cruzada periódica permanente, solvencia de multas y defensa legal.</p>
                      <div className="pt-2 border-t border-zinc-900">
                        <span className="block text-[10px] font-mono text-gray-400">HONORARIOS PROPUESTOS:</span>
                        <span className="text-lg font-black text-amber-400 font-mono block mt-1">{client.fees.iguala}</span>
                      </div>
                    </div>

                  </div>

                  {/* Legal Foundations Footer */}
                  <div className="border border-zinc-850 p-4.5 rounded-xl bg-zinc-950 space-y-3">
                    <span className="text-[10px] font-mono text-gray-400 tracking-widest block uppercase font-bold">⚖️ FUNDAMENTACIÓN LEGAL JURÍDICA:</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[11px] text-gray-400 font-mono">
                      <div className="flex justify-between p-2 border border-zinc-900 rounded bg-zinc-900/20">
                        <span className="text-white">Ley del ISR</span>
                        <span className="text-amber-500 font-bold">Título II y Título IV</span>
                      </div>
                      <div className="flex justify-between p-2 border border-zinc-900 rounded bg-zinc-900/20">
                        <span className="text-white">Código Fiscal de la Federación</span>
                        <span className="text-amber-500 font-bold">Artículos 27, 28 y 42</span>
                      </div>
                      <div className="flex justify-between p-2 border border-zinc-900 rounded bg-zinc-900/20">
                        <span className="text-white">Ley del Seguro Social</span>
                        <span className="text-amber-500 font-bold">Artículo 15 (Sujeción IMSS)</span>
                      </div>
                      <div className="flex justify-between p-2 border border-zinc-900 rounded bg-zinc-900/20">
                        <span className="text-white">Ley Federal del Trabajo</span>
                        <span className="text-amber-500 font-bold">Relación Laboral / Ob. Patronales</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
