/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InformationAccessLevel, AccessLevelDefinition, VerifiedCompany, ConcreteVerificationBadge } from '../types';

const BASE_CONCRETE_CHECKS: ConcreteVerificationBadge[] = [
  {
    key: 'identidad_verificada',
    label: 'Identidad verificada',
    verified: true,
    authorityOrSource: 'INE & SAT e.firma',
    verificationDate: 'Vigente'
  },
  {
    key: 'situacion_fiscal_validada',
    label: 'Situación fiscal validada (SAT 32-D)',
    verified: true,
    authorityOrSource: 'Webservice SAT (Positiva)',
    verificationDate: 'Vigente (30 días)'
  },
  {
    key: 'constitucion_legal_comprobada',
    label: 'Constitución legal comprobada',
    verified: true,
    authorityOrSource: 'Registro Público de Comercio',
    verificationDate: 'Folio Mercantil FME activo'
  },
  {
    key: 'cumplimiento_laboral_acreditado',
    label: 'Cumplimiento laboral acreditado',
    verified: true,
    authorityOrSource: 'IMSS & INFONAVIT / REPSE',
    verificationDate: 'Sin adeudos patronales'
  },
  {
    key: 'referencias_verificadas',
    label: 'Referencias comerciales verificadas',
    verified: true,
    authorityOrSource: '3 Clientes Corporativos',
    verificationDate: 'Confirmadas 100%'
  },
  {
    key: 'domicilio_confirmado',
    label: 'Localización domiciliaria confirmada',
    verified: true,
    authorityOrSource: 'Cotejo Geográfico en Campo',
    verificationDate: 'Instalaciones operativas'
  },
  {
    key: 'lista_69b_sin_coincidencias',
    label: 'Lista 69-B DOF sin coincidencias',
    verified: true,
    authorityOrSource: 'Diario Oficial de la Federación',
    verificationDate: 'Monitoreo 24/7 Limpio'
  }
];

export const ACCESS_LEVEL_DEFINITIONS: Record<InformationAccessLevel, AccessLevelDefinition> = {
  visitante_publico: {
    id: 'visitante_publico',
    name: 'Visitante público',
    badge: 'NIVEL 1: PÚBLICO',
    shortDesc: 'Consulta abierta de datos generales, servicios, cobertura y vigencia.',
    allowedFeatures: [
      'Datos generales de la persona moral (Razón Social, RFC homologado, sector)',
      'Portafolio de servicios y especialidades',
      'Cobertura geográfica y sedes operativas',
      'Estatus general de validación (Sello VERTA)',
      'Vigencia de la acreditación normativo-tributaria'
    ],
    restrictedFeatures: [
      'Guardado de perfiles en favoritos',
      'Comparador de proveedores',
      'Solicitud directa de contacto',
      'Reporte detallado por dimensiones',
      'Evidencias documentales oficiales',
      'Expediente integral de validación VERTA'
    ],
    color: 'border-verta-cyan/40 bg-verta-cyan/10 text-verta-cyan'
  },
  empresa_registrada: {
    id: 'empresa_registrada',
    name: 'Empresa registrada',
    badge: 'NIVEL 2: REGISTRADA',
    shortDesc: 'Interacción corporativa: guardar perfiles, comparar proveedores y solicitar contacto.',
    allowedFeatures: [
      'Todo lo incluido en Visitante Público',
      'Guardar perfiles en lista de favoritos / seguimiento',
      'Herramienta de comparación lado a lado entre proveedores',
      'Solicitar contacto directo y cotizaciones formales',
      'Histórico de búsquedas corporativas'
    ],
    restrictedFeatures: [
      'Reporte detallado de auditoría por dimensiones',
      'Descarga o visualización de evidencias documentales',
      'Expediente integral de validación VERTA'
    ],
    color: 'border-blue-400/40 bg-blue-500/10 text-blue-400'
  },
  empresa_autorizada: {
    id: 'empresa_autorizada',
    name: 'Empresa autorizada',
    badge: 'NIVEL 3: AUTORIZADA',
    shortDesc: 'Acceso a reporte analítico detallado y evidencias documentales permitidas.',
    allowedFeatures: [
      'Todo lo de Empresa Registrada',
      'Reporte analítico detallado en 5 dimensiones (Fiscal, Legal, Laboral, Financiera, PLD)',
      'Evidencias documentales permitidas con sellos de agua (Opinión SAT 32-D, CSF, CFE, REPSE)',
      'Validación de vigencia de 30 días en tiempo real',
      'Descarga de expediente autorizado para auditoría interna'
    ],
    restrictedFeatures: [
      'Expediente integral reservado para el proceso de validación (notas internas, biométricos crudos, FME original y bitácora técnica de auditoría VERTA)'
    ],
    color: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-400'
  },
  verta: {
    id: 'verta',
    name: 'VERTA',
    badge: 'NIVEL 4: AUDITORÍA VERTA',
    shortDesc: 'Expediente integral reservado exclusivamente para el proceso de validación colegiada.',
    allowedFeatures: [
      'Acceso total e irrestricto al Expediente Integral de Validación',
      'Trazabilidad criptográfica SHA-256 de archivos fuente originales',
      'Cruce forense automatizado contra listas negras del DOF Art. 69 y 69-B del CFF',
      'Folio Mercantil Electrónico (FME) y verificación notarial en RPC',
      'Biometría y firma electrónica del representante legal cotejada ante INE',
      'Cédula de trabajo y notas internas de auditores técnicos',
      'Herramientas de dictaminación, emisión de prevenciones y timbrado final'
    ],
    restrictedFeatures: [],
    color: 'border-verta-coral/50 bg-verta-coral/15 text-verta-coral'
  }
};

export const ENRICHED_COMPANIES: VerifiedCompany[] = [
  {
    id: 'comp_1',
    name: 'Soluciones Tecnológicas Alfa S.A. de C.V.',
    rfc: 'STA-180412-H42',
    sector: 'Tecnología & SaaS',
    complianceScore: 94,
    validationStatus: 'validado',
    concreteChecks: BASE_CONCRETE_CHECKS,
    verificationDate: '12/04/2026',
    validityDate: '12/07/2026 (Vigente)',
    status: 'Vigente y Validado',
    logoLetters: 'ST',
    logoColor: 'bg-verta-cyan text-verta-navy',
    description: 'Proveedor de consultoría informática, desarrollo de software a medida, ciberseguridad corporativa e integración de infraestructura cloud de alta disponibilidad.',
    services: [
      'Desarrollo de Software Empresarial y APIs seguras',
      'Migración e infraestructura Cloud (AWS, Azure, GCP)',
      'Auditoría de Ciberseguridad & Pentesting normativo',
      'Soporte gestionado 24/7 y Mesa de Ayuda Nivel 3',
      'Consultoría en Arquitectura de Datos e Inteligencia de Negocios'
    ],
    coverage: 'Nacional (Sede Central en CDMX con cobertura operativa en Monterrey, Guadalajara, Querétaro y Puebla)',
    headquarters: 'Insurgentes Sur 1602, Crédito Constructor, Benito Juárez, CDMX',
    verifiedDocumentsCount: 5,
    totalDocumentsCount: 5,
    region: 'Ciudad de México',
    employees: '50-250 empleados',
    contactEmail: 'contacto@alfa-tecnologia.com.mx',
    phone: '+52 (55) 5600-4421',
    website: 'https://alfa-tecnologia.com.mx',
    legalRepresentative: 'Lic. Roberto Valenzuela Garza',
    dimensionScores: {
      fiscal: 98,
      legal: 95,
      laboral: 92,
      financiera: 91,
      pld: 100
    },
    authorizedEvidences: [
      {
        id: 'ev-01',
        name: 'Opinión de Cumplimiento de Obligaciones Fiscales SAT (Art. 32-D)',
        type: 'Constancia Tributaria',
        authority: 'Servicio de Administración Tributaria (SAT)',
        validationHash: 'SHA256: d84e8a1f73...9b32c1e8',
        verifiedAt: '2026-05-18T10:30:00Z',
        status: 'Conforme',
        fileSize: '420 KB'
      },
      {
        id: 'ev-02',
        name: 'Constancia de Situación Fiscal con Cédula de Identificación Fiscal',
        type: 'Cédula de Identificación',
        authority: 'SAT - Registro Federal de Contribuyentes',
        validationHash: 'SHA256: 4fc901ab38...184ef92a',
        verifiedAt: '2026-05-18T10:31:00Z',
        status: 'Vigente',
        fileSize: '890 KB'
      },
      {
        id: 'ev-03',
        name: 'Comprobante de Domicilio Fiscal (<90d con CFDI de Servicio)',
        type: 'Comprobante Domiciliario',
        authority: 'CFE Suministrador de Servicios Básicos',
        validationHash: 'SHA256: 81bca03f99...22ea05b4',
        verifiedAt: '2026-05-18T10:32:00Z',
        status: 'Conforme',
        fileSize: '1.2 MB'
      },
      {
        id: 'ev-04',
        name: 'Opinión de Cumplimiento de Obligaciones en Seguridad Social (IMSS)',
        type: 'Laboral & Seguridad Social',
        authority: 'Instituto Mexicano del Seguro Social',
        validationHash: 'SHA256: b33190eac1...5f0a71dc',
        verifiedAt: '2026-05-18T10:33:00Z',
        status: 'Conforme',
        fileSize: '650 KB'
      },
      {
        id: 'ev-05',
        name: 'Carátula de Estado de Cuenta Bancario con Titularidad Convalidada',
        type: 'Solvencia Financiera',
        authority: 'BBVA México S.A. (Cuenta CLABE verificada)',
        validationHash: 'SHA256: fa118c774d...3902eb99',
        verifiedAt: '2026-05-18T10:34:00Z',
        status: 'Conforme',
        fileSize: '740 KB'
      }
    ],
    vertaAuditDossier: {
      fme: 'FME-RPC-CDMX-2018-091823',
      notaryPublic: 'Notaría Pública No. 142 de la CDMX (Lic. Manuel Morales Peñaloza)',
      satVerificationTimestamp: '2026-05-18 10:30:14 UTC - Conexión WebService SAT WS32D V2.1',
      dof69bCheck: 'Limpio - Sin coincidencias (Listas Definitivos, Desvirtuados y Presuntos DOF)',
      imssSubdelegation: 'Subdelegación 3 San Jerónimo - Patrón Activo Sin Créditos Firmes',
      curpRepresentative: 'VAGR790412HDFRR02 (Validada en RENAPO)',
      rawDocumentHashes: [
        { doc: 'Escritura_Publica_48120_Constitutiva.pdf', sha256: '9f83a48e71823490b1c8f12a3d0012e5847291aebc238491820491829384bcda' },
        { doc: 'Poder_Notarial_Representante_Legal.pdf', sha256: '38192a83749b1029c8e718293049182039481029384710293847102938471029' },
        { doc: 'INE_Anverso_Reverso_Representante.pdf', sha256: 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0' },
        { doc: 'Estados_Financieros_Dictaminados_2025.pdf', sha256: '5a4b3c2d1e0f9876543210fedcba9876543210fedcba9876543210fedcba9876' }
      ],
      internalAuditorNotes: [
        'Auditoría Primaria 2026-04-12: Verificación de poderes de representación para pleitos, cobranzas y actos de administración sin limitación cuantitativa.',
        'Cruce SAT 2026-05-18: Cumplimiento mensual de declaraciones provisionales de ISR e IVA verificado.',
        'Inspección Georreferenciada: Domicilio fiscal coincide con oficinas corporativas de 420m² ocupadas por personal de ingeniería.',
        'Conclusión de Auditoría Colegiada: Aprobación formal sin reservas. Emisión de Cédula de Conformidad Dictamen VERTA-2026-00918.'
      ],
      auditorInCharge: 'Mtro. Fernando Arreola Treviño (Auditor Certificado VERTA ID #A-104)',
      lastAuditConclusion: 'DICTA DE CONFORMIDAD PLENA - APTO PARA CONTRATACIÓN CORPORATIVA DE ALTA EXIGENCIA'
    }
  },
  {
    id: 'comp_2',
    name: 'Logística Multimodal del Centro S.A. de C.V.',
    rfc: 'LMC-881204-TR9',
    sector: 'Logística & Transporte',
    complianceScore: 98,
    validationStatus: 'validado',
    concreteChecks: BASE_CONCRETE_CHECKS,
    verificationDate: '10/05/2026',
    validityDate: '10/08/2026 (Vigente)',
    status: 'Vigente y Validado',
    logoLetters: 'LM',
    logoColor: 'bg-verta-cobalt text-white',
    description: 'Servicios de transportación terrestre nacionalizada, gestión aduanal integral, bodegas con cadena de frío y monitoreo satelital en tiempo real.',
    services: [
      'Transporte de Carga Consolidada y Dedicada (Caja Seca y Refrigerada)',
      'Almacenaje Estratégico y Centros de Distribución (3PL/4PL)',
      'Agenciamiento Aduanal en Laredo, Manzanillo y Veracruz',
      'Custodia Satelital GPS y Protocolos C-TPAT / OEA'
    ],
    coverage: 'Nacional e Internacional (Corredor T-MEC, Centro, Bajío, Norte y Pacífico)',
    headquarters: 'Parque Industrial San Martín Obispo, Cuautitlán Izcalli, Estado de México',
    verifiedDocumentsCount: 5,
    totalDocumentsCount: 5,
    region: 'Estado de México',
    employees: '250+ empleados',
    contactEmail: 'operaciones@logistica-centro.com',
    phone: '+52 (55) 5871-9900',
    website: 'https://logistica-centro.com',
    legalRepresentative: 'Ing. Salvador Cárdenas Pineda',
    dimensionScores: {
      fiscal: 99,
      legal: 97,
      laboral: 98,
      financiera: 96,
      pld: 100
    },
    authorizedEvidences: [
      {
        id: 'ev-06',
        name: 'Opinión de Cumplimiento SAT 32-D Positiva',
        type: 'Fiscal',
        authority: 'SAT',
        validationHash: 'SHA256: 771ba029e1...4401bbfa',
        verifiedAt: '2026-05-10T14:10:00Z',
        status: 'Conforme',
        fileSize: '410 KB'
      },
      {
        id: 'ev-07',
        name: 'Póliza de Seguro de Transporte de Carga y Responsabilidad Civil',
        type: 'Seguros',
        authority: 'AXA Seguros México',
        validationHash: 'SHA256: 1204918abc...99112233',
        verifiedAt: '2026-05-10T14:15:00Z',
        status: 'Vigente',
        fileSize: '3.4 MB'
      },
      {
        id: 'ev-08',
        name: 'Cédula de Cumplimiento INFONAVIT Sin Adeudos Patronales',
        type: 'Laboral',
        authority: 'INFONAVIT',
        validationHash: 'SHA256: 98bc1029de...33445566',
        verifiedAt: '2026-05-10T14:20:00Z',
        status: 'Conforme',
        fileSize: '520 KB'
      }
    ],
    vertaAuditDossier: {
      fme: 'FME-RPC-EDOMEX-1988-004128',
      notaryPublic: 'Notaría Pública No. 28 del Estado de México (Lic. Patricia Ortiz Díaz)',
      satVerificationTimestamp: '2026-05-10 14:10:22 UTC - SAT WS Oficial',
      dof69bCheck: 'Limpio - Sin coincidencias',
      imssSubdelegation: 'Subdelegación Tlalnepantla - Registro Patronal Vigente con 318 trabajadores',
      curpRepresentative: 'CAPS621204HMCXR01',
      rawDocumentHashes: [
        { doc: 'Testimonio_Notarial_Constitucion_LMC.pdf', sha256: '11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff' },
        { doc: 'Licencias_SCT_Transporte_Federal.pdf', sha256: 'aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899' }
      ],
      internalAuditorNotes: [
        'Validación de parque vehicular: 64 tractocamiones con placas de Servicio Público Federal vigentes.',
        'Inspección de bodegas de refrigeración: Calibración de temperatura según NOM-059-SSA1-2015.',
        'Dictamen Final: Proveedor Nivel Platino con solvencia comprobada.'
      ],
      auditorInCharge: 'Lic. Andrés Montaño Garza (Auditor Senior VERTA ID #A-022)',
      lastAuditConclusion: 'HOMOLOGADO CON DISTINCIÓN EXCELENCIA EN CADENA DE SUMINISTRO'
    }
  },
  {
    id: 'comp_3',
    name: 'Grupo Constructor Metrópoli S.A.',
    rfc: 'GCM-940301-KL2',
    sector: 'Construcción & Infraestructura',
    complianceScore: 94,
    validationStatus: 'validado_con_observaciones',
    concreteChecks: [
      ...BASE_CONCRETE_CHECKS.slice(0, 4),
      {
        key: 'referencias_verificadas',
        label: 'Referencias comerciales verificadas',
        verified: false,
        authorityOrSource: 'En proceso de confirmación de 3er cliente',
        verificationDate: 'Observación preventiva menor'
      },
      ...BASE_CONCRETE_CHECKS.slice(5)
    ],
    verificationDate: '28/04/2026',
    validityDate: '28/07/2026 (Vigente)',
    status: 'Vigente y Validado',
    logoLetters: 'GC',
    logoColor: 'bg-verta-coral text-white',
    description: 'Desarrollo de obra civil pesada, naves industriales para el sector manufacturero y proyectos de infraestructura comercial y corporativa vertical.',
    services: [
      'Ingeniería, Procura y Construcción (EPC) de Naves Industriales',
      'Desarrollo de Pisos Industriales de Alta Resistencia',
      'Edificación de Oficinas Corporativas y Centros de Negocios',
      'Supervisión y Auditoría Estructural de Obras'
    ],
    coverage: 'Norte y Noreste de México (Nuevo León, Coahuila, Tamaulipas, San Luis Potosí)',
    headquarters: 'Av. Lázaro Cárdenas 2400, Valle Oriente, San Pedro Garza García, N.L.',
    verifiedDocumentsCount: 5,
    totalDocumentsCount: 5,
    region: 'Nuevo León',
    employees: '250+ empleados',
    contactEmail: 'licitaciones@grupometropoli.mx',
    phone: '+52 (81) 8368-2000',
    website: 'https://grupometropoli.mx',
    legalRepresentative: 'Arq. Marcelo Elizondo Chapa',
    dimensionScores: {
      fiscal: 95,
      legal: 94,
      laboral: 93,
      financiera: 95,
      pld: 99
    },
    authorizedEvidences: [
      {
        id: 'ev-09',
        name: 'Registro en el Padrón Público de Contratistas REPSE STPS',
        type: 'Especializado',
        authority: 'Secretaría del Trabajo y Previsión Social (STPS)',
        validationHash: 'SHA256: 4401bbfa99...771ba029',
        verifiedAt: '2026-04-28T09:12:00Z',
        status: 'Conforme',
        fileSize: '580 KB'
      },
      {
        id: 'ev-10',
        name: 'Opinión SAT 32-D Positiva Vigente',
        type: 'Fiscal',
        authority: 'SAT',
        validationHash: 'SHA256: 881204tr99...940301kl',
        verifiedAt: '2026-04-28T09:15:00Z',
        status: 'Conforme',
        fileSize: '415 KB'
      }
    ],
    vertaAuditDossier: {
      fme: 'FME-RPC-NL-1994-012984',
      notaryPublic: 'Notaría Pública No. 35 de Monterrey (Lic. Hernán Garza Sada)',
      satVerificationTimestamp: '2026-04-28 09:15:00 UTC',
      dof69bCheck: 'Limpio - Sin coincidencias',
      imssSubdelegation: 'Subdelegación Noreste Monterrey - Cuotas al corriente sin omisiones',
      curpRepresentative: 'EICM710301HNLZZ04',
      rawDocumentHashes: [
        { doc: 'Constitutiva_Aumento_Capital_Metropoli.pdf', sha256: '99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa' }
      ],
      internalAuditorNotes: [
        'Registro REPSE vigente número AR14209/2021 debidamente refrendado.',
        'Capacidad técnica y maquinaria propia con valor en balance auditado superior a $120M MXN.'
      ],
      auditorInCharge: 'C.P. Claudia Trejo Villarreal (Auditor Fiscal VERTA ID #A-078)',
      lastAuditConclusion: 'EXPEDIENTE AUDITADO Y APTO PARA CONTRATOS DE OBRA MAYOR'
    }
  },
  {
    id: 'comp_4',
    name: 'Alimentos y Distribución Express S.A.',
    rfc: 'ADE-010515-FG3',
    sector: 'Alimentario & Retail',
    complianceScore: 91,
    validationStatus: 'actualizacion_requerida',
    concreteChecks: [
      BASE_CONCRETE_CHECKS[0],
      {
        key: 'situacion_fiscal_validada',
        label: 'Situación fiscal validada (SAT 32-D)',
        verified: false,
        authorityOrSource: 'SAT Webservice',
        verificationDate: 'Opinión vence en 3 días (Renovación mensual)'
      },
      ...BASE_CONCRETE_CHECKS.slice(2)
    ],
    verificationDate: '02/05/2026',
    validityDate: '02/08/2026 (Vigente)',
    status: 'Vigente y Validado',
    logoLetters: 'AD',
    logoColor: 'bg-gradient-to-br from-amber-400 to-verta-coral text-white',
    description: 'Distribución mayorista de insumos alimenticios, perecederos refrigerados y abarrotes para hotelería, comedores industriales y cadenas de restaurantes.',
    services: [
      'Abasto a Comedores Industriales y Hospitalarios',
      'Distribución de Perecederos con Cadena de Frío Controlada',
      'Empaquetado y Etiquetado bajo NOM-051',
      'Certificación HACCP y Buenas Prácticas de Manufactura'
    ],
    coverage: 'Occidente y Bajío (Jalisco, Colima, Nayarit, Michoacán, Guanajuato)',
    headquarters: 'Mercado de Abastos de Guadalajara, Bodegas 12-14, Guadalajara, Jalisco',
    verifiedDocumentsCount: 5,
    totalDocumentsCount: 5,
    region: 'Jalisco',
    employees: '100-250 empleados',
    contactEmail: 'compras@alimentos-express.mx',
    phone: '+52 (33) 3671-4000',
    website: 'https://alimentos-express.mx',
    legalRepresentative: 'Lic. Guillermo Orozco Beltrán',
    dimensionScores: {
      fiscal: 92,
      legal: 90,
      laboral: 89,
      financiera: 91,
      pld: 99
    },
    authorizedEvidences: [
      {
        id: 'ev-11',
        name: 'Opinión de Cumplimiento SAT 32-D Positiva',
        type: 'Fiscal',
        authority: 'SAT',
        validationHash: 'SHA256: 010515fg33...98989898',
        verifiedAt: '2026-05-02T11:00:00Z',
        status: 'Conforme',
        fileSize: '410 KB'
      },
      {
        id: 'ev-12',
        name: 'Licencia Sanitaria y Aviso de Funcionamiento COFEPRIS',
        type: 'Sanitario',
        authority: 'COFEPRIS Jalisco',
        validationHash: 'SHA256: cofepris123...45678901',
        verifiedAt: '2026-05-02T11:05:00Z',
        status: 'Vigente',
        fileSize: '1.1 MB'
      }
    ],
    vertaAuditDossier: {
      fme: 'FME-RPC-JAL-2001-008912',
      notaryPublic: 'Notaría Pública No. 12 de Guadalajara (Lic. Álvaro Ruiz Sandoval)',
      satVerificationTimestamp: '2026-05-02 11:00:12 UTC',
      dof69bCheck: 'Limpio - Sin incidencias fiscales',
      imssSubdelegation: 'Subdelegación Juárez Guadalajara',
      curpRepresentative: 'OOBG680515HJCRR09',
      rawDocumentHashes: [
        { doc: 'Acta_Constitutiva_ADE_2001.pdf', sha256: 'abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789' }
      ],
      internalAuditorNotes: [
        'Validación de permisos sanitarios y registro de marca ante IMPI.',
        'Instalaciones frigoríficas inspeccionadas con registro de temperatura continuo.'
      ],
      auditorInCharge: 'Mtra. Sofía Del Paso Gómez (Auditor Calidad VERTA ID #A-119)',
      lastAuditConclusion: 'EXPEDIENTE CONVALIDADO PARA PROVEEDURÍA ALIMENTARIA'
    }
  },
  {
    id: 'comp_5',
    name: 'Comercializadora de Acero de Occidente',
    rfc: 'CAO-101115-ST1',
    sector: 'Manufactura & Metalurgia',
    complianceScore: 89,
    validationStatus: 'informacion_pendiente',
    concreteChecks: [
      BASE_CONCRETE_CHECKS[0],
      BASE_CONCRETE_CHECKS[1],
      BASE_CONCRETE_CHECKS[2],
      {
        key: 'cumplimiento_laboral_acreditado',
        label: 'Cumplimiento laboral acreditado',
        verified: false,
        authorityOrSource: 'IMSS / STPS',
        verificationDate: 'Pendiente carga de SUA del último bimestre'
      },
      ...BASE_CONCRETE_CHECKS.slice(4)
    ],
    verificationDate: '15/05/2026',
    validityDate: '15/08/2026 (Vigente)',
    status: 'Vigente y Validado',
    logoLetters: 'CA',
    logoColor: 'bg-zinc-600 text-white',
    description: 'Transformación y maquinado de estructuras de acero inoxidable, vigas IPR, tubería industrial y perfiles para la industria automotriz y aeroespacial.',
    services: [
      'Corte y Doblez de Acero por Plasma y Láser CNC',
      'Maquinado de Piezas de Precisión en Acero Inoxidable',
      'Suministro de Perfiles Estructurales y Placa Comercial',
      'Certificados de Calidad de Molino (MTR) y Trazabilidad'
    ],
    coverage: 'Bajío y Centro (Querétaro, Guanajuato, Aguascalientes, San Luis Potosí, Estado de México)',
    headquarters: 'Parque Industrial El Marqués, Querétaro, Qro.',
    verifiedDocumentsCount: 5,
    totalDocumentsCount: 5,
    region: 'Querétaro',
    employees: '50-100 empleados',
    contactEmail: 'ventas@acerooccidente.com.mx',
    phone: '+52 (442) 238-7100',
    website: 'https://acerooccidente.com.mx',
    legalRepresentative: 'Ing. Rodrigo Anaya Morales',
    dimensionScores: {
      fiscal: 90,
      legal: 91,
      laboral: 87,
      financiera: 88,
      pld: 98
    },
    authorizedEvidences: [
      {
        id: 'ev-13',
        name: 'Opinión SAT 32-D Positiva Vigente',
        type: 'Fiscal',
        authority: 'SAT',
        validationHash: 'SHA256: cao101115st...44332211',
        verifiedAt: '2026-05-15T16:20:00Z',
        status: 'Conforme',
        fileSize: '408 KB'
      }
    ],
    vertaAuditDossier: {
      fme: 'FME-RPC-QRO-2010-004412',
      notaryPublic: 'Notaría Pública No. 9 de Querétaro (Lic. Gonzalo Vega)',
      satVerificationTimestamp: '2026-05-15 16:20:00 UTC',
      dof69bCheck: 'Limpio - Sin publicaciones de listas 69-B',
      imssSubdelegation: 'Subdelegación Querétaro',
      curpRepresentative: 'AAMR751115HQNRR03',
      rawDocumentHashes: [
        { doc: 'Constitutiva_Acero_Occidente.pdf', sha256: 'fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210' }
      ],
      internalAuditorNotes: [
        'Inspección de bodegas de almacenamiento de placa y certificados de laminación.',
        'Registro de cumplimiento laboral y contratos colectivos depositados.'
      ],
      auditorInCharge: 'Ing. Héctor Domínguez Ruiz (Auditor Técnico VERTA ID #A-056)',
      lastAuditConclusion: 'EXPEDIENTE CONFORME Y VIGENTE'
    }
  },
  {
    id: 'comp_6',
    name: 'Suministros Médicos de la Frontera',
    rfc: 'SMF-150220-JK5',
    sector: 'Salud & Farmacéutico',
    complianceScore: 96,
    validationStatus: 'validacion_vencida',
    concreteChecks: [
      BASE_CONCRETE_CHECKS[0],
      {
        key: 'situacion_fiscal_validada',
        label: 'Situación fiscal validada (SAT 32-D)',
        verified: false,
        authorityOrSource: 'SAT',
        verificationDate: 'Dictamen anual expirado'
      },
      ...BASE_CONCRETE_CHECKS.slice(2)
    ],
    verificationDate: '19/05/2026',
    validityDate: '19/08/2026 (Vigente)',
    status: 'Vigente y Validado',
    logoLetters: 'SM',
    logoColor: 'bg-emerald-600 text-white',
    description: 'Importación y distribución de consumibles clínicos, instrumental quirúrgico de alta especialidad y equipamiento biomédico para hospitales y centros de salud.',
    services: [
      'Distribución de Material Quirúrgico y Quirófano',
      'Mantenimiento Preventivo y Correctivo de Equipos Médicos',
      'Importación con Registro Sanitario COFEPRIS',
      'Licitaciones Públicas y Abastecimiento de Emergencia'
    ],
    coverage: 'Norte (Chihuahua, Sonora, Coahuila, Baja California)',
    headquarters: 'Av. Paseo Triunfo de la República 3980, Ciudad Juárez, Chihuahua',
    verifiedDocumentsCount: 5,
    totalDocumentsCount: 5,
    region: 'Chihuahua',
    employees: '10-50 empleados',
    contactEmail: 'licitaciones@medicosfrontera.com',
    phone: '+52 (656) 617-8890',
    website: 'https://medicosfrontera.com',
    legalRepresentative: 'Dra. Carmen Alicia Terrazas',
    dimensionScores: {
      fiscal: 97,
      legal: 96,
      laboral: 95,
      financiera: 96,
      pld: 100
    },
    authorizedEvidences: [
      {
        id: 'ev-14',
        name: 'Opinión SAT 32-D Positiva Vigente',
        type: 'Fiscal',
        authority: 'SAT',
        validationHash: 'SHA256: smf150220jk...77889900',
        verifiedAt: '2026-05-19T12:00:00Z',
        status: 'Conforme',
        fileSize: '412 KB'
      },
      {
        id: 'ev-15',
        name: 'Aviso de Responsable Sanitario y Registros COFEPRIS Dispositivos Médicos',
        type: 'Sanitario',
        authority: 'COFEPRIS',
        validationHash: 'SHA256: cofepris9988...11223344',
        verifiedAt: '2026-05-19T12:05:00Z',
        status: 'Conforme',
        fileSize: '2.1 MB'
      }
    ],
    vertaAuditDossier: {
      fme: 'FME-RPC-CHIH-2015-001928',
      notaryPublic: 'Notaría Pública No. 18 de Ciudad Juárez',
      satVerificationTimestamp: '2026-05-19 12:00:00 UTC',
      dof69bCheck: 'Limpio - Sin observaciones',
      imssSubdelegation: 'Subdelegación Juárez Poniente',
      curpRepresentative: 'TECA650220MCHRR08',
      rawDocumentHashes: [
        { doc: 'Acta_Constitutiva_SMF.pdf', sha256: '9900aabbccddeeff00112233445566778899aabbccddeeff0011223344556677' }
      ],
      internalAuditorNotes: [
        'Cédula profesional de Responsable Sanitario verificada ante Dirección General de Profesiones.',
        'Almacén con climatización validada según farmacopea.'
      ],
      auditorInCharge: 'Mtro. Fernando Arreola Treviño (Auditor VERTA ID #A-104)',
      lastAuditConclusion: 'EXPEDIENTE CONVALIDADO PARA SUMINISTRO HOSPITALARIO'
    }
  }
];
