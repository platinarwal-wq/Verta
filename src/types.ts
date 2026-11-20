/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DocumentStatus = 'validado' | 'pendiente' | 'corregir' | 'no_entregado';

export type InformationAccessLevel = 
  | 'visitante_publico' 
  | 'empresa_registrada' 
  | 'empresa_autorizada' 
  | 'verta';

export interface AccessLevelDefinition {
  id: InformationAccessLevel;
  name: string;
  badge: string;
  shortDesc: string;
  allowedFeatures: string[];
  restrictedFeatures: string[];
  color: string;
}

export interface UploadedFile {
  name: string;
  size: string;
  uploadedAt: string;
}

export interface VerificationDocument {
  id: string;
  title: string;
  description: string;
  status: DocumentStatus;
  requirement: 'Required' | 'Optional';
  lastUpdated: string | null;
  file: UploadedFile | null;
  comments: string[];
}

export interface ComplianceScoreHistory {
  score: number;
  date: string;
}

export interface ClientFeedback {
  id: string;
  clientName: string;
  avatarUrl?: string;
  feedbackText: string;
  type: 'success' | 'alert' | 'general';
  date: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

export type StandardValidationStatus =
  | 'validado'
  | 'validado_con_observaciones'
  | 'informacion_pendiente'
  | 'actualizacion_requerida'
  | 'no_cumple'
  | 'validacion_vencida';

export interface ValidationStatusContext {
  id: StandardValidationStatus;
  label: string; // 'Validado', 'Validado con observaciones', etc.
  badgeBg: string;
  textColor: string;
  borderColor: string;
  shortDescription: string;
  meaning: string;           // Qué significa
  missingElements: string;   // Qué falta
  riskAssessment: string;    // Qué riesgo representa
  proceedingActions: string; // Qué acciones proceden
}

export type ConcreteVerificationKey =
  | 'identidad_verificada'
  | 'situacion_fiscal_validada'
  | 'constitucion_legal_comprobada'
  | 'cumplimiento_laboral_acreditado'
  | 'referencias_verificadas'
  | 'domicilio_confirmado'
  | 'lista_69b_sin_coincidencias';

export interface ConcreteVerificationBadge {
  key: ConcreteVerificationKey;
  label: string;
  verified: boolean;
  authorityOrSource: string;
  verificationDate?: string;
  documentFolio?: string;
}

export interface VerifiedCompany {
  id: string;
  name: string;
  rfc: string;
  sector: string;
  complianceScore?: number; // SUSPENDIDO: en proceso de auditoría metodológica
  validationStatus: StandardValidationStatus;
  concreteChecks: ConcreteVerificationBadge[];
  verificationDate: string;
  validityDate: string; // Fecha de vigencia de validación
  status?: string; // Compatibilidad
  logoLetters: string;
  logoColor: string; // Tailwind class e.g. 'bg-verta-cyan'
  description: string;
  services: string[]; // Servicios y especialidades
  coverage: string; // Cobertura geográfica
  headquarters: string; // Sede principal
  verifiedDocumentsCount: number;
  totalDocumentsCount: number;
  region: string;
  employees: string;
  contactEmail: string;
  phone?: string;
  website: string;
  legalRepresentative?: string;
  // Detalle para nivel Empresa Autorizada
  dimensionScores?: {
    fiscal: number;
    legal: number;
    laboral: number;
    financiera: number;
    pld: number;
  };
  authorizedEvidences?: {
    id: string;
    name: string;
    type: string;
    authority: string;
    validationHash: string;
    verifiedAt: string;
    status: 'Conforme' | 'Vigente';
    fileSize: string;
  }[];
  // Detalle exclusivo para nivel VERTA (Expediente Integral de Validación)
  vertaAuditDossier?: {
    fme: string; // Folio Mercantil Electrónico
    notaryPublic: string;
    satVerificationTimestamp: string;
    dof69bCheck: string;
    imssSubdelegation: string;
    curpRepresentative: string;
    rawDocumentHashes: { doc: string; sha256: string }[];
    internalAuditorNotes: string[];
    auditorInCharge: string;
    lastAuditConclusion: string;
  };
}

export interface VerifiedConsultant {
  id: string;
  fullName: string;
  curpOrRfc: string;
  specialty: string;
  complianceScore: number;
  verificationDate: string;
  avatarLetters: string;
  avatarColor: string; // Tailwind class e.g. 'bg-verta-coral'
  biography: string;
  verifiedDocumentsCount: number;
  totalDocumentsCount: number;
  location: string;
  experienceYears: number;
  contactEmail: string;
  linkedinOrWebsite: string;
  certifications: string[];
}

export type ValidationLevelId = 'basica' | 'estandar' | 'critica' | 'integral';

export interface ValidationLevelInfo {
  id: ValidationLevelId;
  name: string;
  badge: string;
  targetScope: string;
  recommendedFor: string;
  defaultRequirements: string[];
  estimatedDays: number;
}

export type JourneyTrackingStatus = 
  | 'invitacion_enviada'
  | 'aceptada'
  | 'pago_completado'
  | 'en_proceso'
  | 'observaciones_pendientes'
  | 'validacion_finalizada';

export type InternalCompanyDecision = 
  | 'aprobado'
  | 'requiere_aclaraciones'
  | 'no_continua'
  | 'pendiente';

export interface SupplierContactInfo {
  name: string;
  email: string;
  phone: string;
  position?: string;
}

export interface InternalDecisionRecord {
  decision: InternalCompanyDecision;
  recordedAt?: string;
  recordedBy?: string;
  justification?: string;
  commercialNotes?: string;
  notes?: string;
  commercialConditions?: string;
  contractValidityMonths?: number;
}

export interface SupplierJourneyItem {
  id: string;
  code: string; // e.g. VRT-8921
  providerName: string;
  rfc: string;
  contact: SupplierContactInfo;
  category: string;
  service: string; // Servicio específico requerido
  validationLevel: ValidationLevelId;
  trackingStatus: JourneyTrackingStatus;
  progressPercent: number;
  sentDate: string;
  lastUpdate: string;
  requirements: string[];
  observations?: string[];
  paymentDetails?: {
    status: 'pagado' | 'pendiente';
    amount: string;
    paidAt?: string;
    invoiceFolio?: string;
  };
  vertaTechnicalResult?: {
    status: 'Favorable' | 'Con Observaciones' | 'En Auditoría';
    complianceScore: number;
    sealSha256: string;
    concludedAt: string;
    technicalSummary: string;
  };
  internalDecision: InternalDecisionRecord;
}

export type PackageId = 'paquete_1' | 'paquete_2' | 'paquete_3';

export type PackageFeatureCategory = 'presencia' | 'promocion' | 'diagnostico';

export interface PackageFeatureItem {
  id: string;
  label: string;
  description: string;
  category: PackageFeatureCategory;
  minPackage: PackageId;
  includedIn: {
    paquete_1: boolean;
    paquete_2: boolean;
    paquete_3: boolean;
  };
}

export interface PackageDefinition {
  id: PackageId;
  code: string;
  tierLabel: string;
  name: string;
  subtitle: string;
  description: string;
  accentColor: 'teal' | 'blue' | 'coral';
  highlights: string[];
  includesNote?: string;
}

export interface PackageSelectionState {
  packageId: PackageId;
  selectedServiceIds: string[];
  notes?: string;
  confirmedAt?: string;
}


