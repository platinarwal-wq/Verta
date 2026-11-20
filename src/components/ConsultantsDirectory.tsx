/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  ArrowUpDown, 
  Award, 
  Briefcase, 
  Mail, 
  Globe, 
  Sparkles, 
  UserCheck, 
  CheckCircle, 
  Info, 
  ExternalLink, 
  X, 
  Landmark, 
  FileText, 
  CheckCircle2,
  Star,
  Copy,
  Check,
  Send,
  Building2,
  Download,
  MessageSquare
} from 'lucide-react';
import { VerifiedConsultant } from '../types';

interface ConsultantReview {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface FiscalData {
  rfc: string;
  razonSocial: string;
  regimenFiscal: string;
  domicilioFiscal: string;
  codigoPostal: string;
}

// Extend the consultant type with review and fiscal information
interface RichConsultant extends VerifiedConsultant {
  rating: number;
  ratingCount: number;
  fiscalData: FiscalData;
  reviewsList: ConsultantReview[];
}

const INITIAL_CONSULTANTS: RichConsultant[] = [
  {
    id: 'consult_1',
    fullName: 'Mtra. Sofía Rodríguez Garza',
    curpOrRfc: 'ROGS-840912-M12',
    specialty: 'Legal, Compliance & REPSE',
    complianceScore: 99,
    verificationDate: '15/04/2026',
    avatarLetters: 'SR',
    avatarColor: 'bg-gradient-to-br from-verta-cyan to-verta-cobalt text-verta-navy font-bold',
    biography: 'Consultora jurídica corporativa senior con más de 12 años de trayectoria. Especializada en la regularización y auditoría de esquemas de subcontratación especializada, obtención de registros REPSE e implementación de comités de ética internos.',
    verifiedDocumentsCount: 5,
    totalDocumentsCount: 5,
    location: 'Nuevo León',
    experienceYears: 14,
    contactEmail: 'sofia.rodriguez@verta-advisors.mx',
    linkedinOrWebsite: 'https://linkedin.com/in/sofia-rodriguez-garza',
    certifications: ['Certificación Oficial REPSE', 'Maestría en Derecho Corporativo', 'Diplomado en Fiscalización Laboral'],
    rating: 4.9,
    ratingCount: 38,
    fiscalData: {
      rfc: 'ROGS840912M12',
      razonSocial: 'Sofía Rodríguez Garza Consultores S.C.',
      regimenFiscal: '612 - Personas Físicas con Actividades Empresariales y Profesionales',
      domicilioFiscal: 'Calzada San Pedro 405, San Pedro Garza García, Nuevo León',
      codigoPostal: '66220'
    },
    reviewsList: [
      { id: 'rev_1_1', reviewerName: 'Logística Multimodal S.A.', rating: 5, comment: 'Resolvió nuestra inscripción al REPSE en tiempo récord. Totalmente recomendada para auditoría laboral.', date: '12/04/2026' },
      { id: 'rev_1_2', reviewerName: 'Sistemas del Norte S.A. de C.V.', rating: 5, comment: 'Excelente dominio del marco de subcontratación en México. Muy profesional.', date: '02/05/2026' }
    ]
  },
  {
    id: 'consult_2',
    fullName: 'Dr. Alejandro Méndez Trejo',
    curpOrRfc: 'META-781105-HDF',
    specialty: 'Estrategia Fiscal & SAT',
    complianceScore: 97,
    verificationDate: '11/05/2026',
    avatarLetters: 'AM',
    avatarColor: 'bg-verta-coral text-white',
    biography: 'Doctor en Derecho Tributario por la UNAM con consultoría activa para PyMEs y consorcios transnacionales. Experto en auditorías preventivas del SAT, aclaraciones fiscales complejas y devoluciones de IVA.',
    verifiedDocumentsCount: 5,
    totalDocumentsCount: 5,
    location: 'Ciudad de México',
    experienceYears: 18,
    contactEmail: 'amendez@mendezformaltaxes.com',
    linkedinOrWebsite: 'https://mendezformaltaxes.com',
    certifications: ['Doctorado de Excellence', 'Asociado AMCP', 'Certamen Fiscal Nacional'],
    rating: 4.8,
    ratingCount: 29,
    fiscalData: {
      rfc: 'META781105ST8',
      razonSocial: 'Méndez Formal Taxes y Asociados S.C.',
      regimenFiscal: '601 - General de Ley Personas Morales',
      domicilioFiscal: 'Paseo de la Reforma 250, Piso 12, Cuauhtémoc, CDMX',
      codigoPostal: '06600'
    },
    reviewsList: [
      { id: 'rev_2_1', reviewerName: 'Grupo Constructor Metrópoli', rating: 5, comment: 'Su asesoría fiscal nos ahorró millones en multas indebidas. Domina el Código Fiscal como nadie.', date: '18/04/2026' },
      { id: 'rev_2_2', reviewerName: 'Inmobiliaria Alfa CDMX', rating: 4, comment: 'Tuvimos una excelente experiencia aclarando un requerimiento complejo de IVA.', date: '30/04/2026' }
    ]
  },
  {
    id: 'consult_3',
    fullName: 'Ing. Carlos Ortiz Beltrán',
    curpOrRfc: 'ORBC-890223-K82',
    specialty: 'Seguridad en la Información & ISO',
    complianceScore: 95,
    verificationDate: '29/04/2026',
    avatarLetters: 'CO',
    avatarColor: 'bg-zinc-700 text-verta-cyan',
    biography: 'Auditor certificado líder en la norma ISO/IEC 27001 y sistemas de gestión de ciberseguridad. Especialista en blindar flujos documentales digitales y cumplimiento estricto de la ley mexicana de protección de datos personales.',
    verifiedDocumentsCount: 5,
    totalDocumentsCount: 5,
    location: 'Jalisco',
    experienceYears: 10,
    contactEmail: 'carlos.ortiz@cybercompliance.mx',
    linkedinOrWebsite: 'https://cybercompliance.mx',
    certifications: ['Auditor Líder ISO 27001', 'Certified Information Security Manager (CISM)', 'Certified Ethical Hacker'],
    rating: 4.7,
    ratingCount: 22,
    fiscalData: {
      rfc: 'ORBC890223K82',
      razonSocial: 'Soluciones Cybercompliance de Occidente S. de R.L.',
      regimenFiscal: '601 - General de Ley Personas Morales',
      domicilioFiscal: 'Av. López Mateos Norte 95, Minerva, Guadalajara, Jalisco',
      codigoPostal: '44110'
    },
    reviewsList: [
      { id: 'rev_3_1', reviewerName: 'SaaS Innovación S.A.', rating: 5, comment: 'Nos guió con éxito en nuestra certificación ISO 27001. Excelente nivel técnico.', date: '25/04/2026' }
    ]
  },
  {
    id: 'consult_4',
    fullName: 'Lic. Mariana Villarreal Cantú',
    curpOrRfc: 'VICM-920412-TJ7',
    specialty: 'Seguridad Social (IMSS & INFONAVIT)',
    complianceScore: 94,
    verificationDate: '02/05/2026',
    avatarLetters: 'MV',
    avatarColor: 'bg-emerald-600 text-white',
    biography: 'Asesora en derecho de la seguridad social y nóminas. Enfoque preventivo para evitar multas de auditorías del IMSS e INFONAVIT, cálculo correcto de la prima de riesgo de trabajo y aclaración de créditos fiscales contraídos.',
    verifiedDocumentsCount: 5,
    totalDocumentsCount: 5,
    location: 'Coahuila',
    experienceYears: 8,
    contactEmail: 'mariana.villarreal@mv-socialsecurity.mx',
    linkedinOrWebsite: 'https://linkedin.com/in/mariana-villarreal-c',
    certifications: ['Especialista de Previsión Social', 'Asociado Colegio de Contadores', 'Diplomado IMSS Integral'],
    rating: 4.6,
    ratingCount: 17,
    fiscalData: {
      rfc: 'VICM920412TJ7',
      razonSocial: 'Mariana Villarreal Consultores S.C.',
      regimenFiscal: '612 - Personas Físicas con Actividades Empresariales y Profesionales',
      domicilioFiscal: 'Blvd. Venustiano Carranza 3044, Saltillo, Coahuila',
      codigoPostal: '25280'
    },
    reviewsList: [
      { id: 'rev_4_1', reviewerName: 'Maquiladora Saltillo S.A.', rating: 5, comment: 'Cálculo de prima de riesgo impecable. Evito multas absurdas este año.', date: '10/05/2026' }
    ]
  },
  {
    id: 'consult_5',
    fullName: 'C.P. Fernando Ruiz Delgado',
    curpOrRfc: 'RUDF-810619-LS2',
    specialty: 'Auditoría Forense & PLD',
    complianceScore: 98,
    verificationDate: '18/05/2026',
    avatarLetters: 'FR',
    avatarColor: 'bg-indigo-600 text-white',
    biography: 'Auditor forense certificado en Prevención de Lavado de Dinero (PLD) ante la CNBV. Apoya a empresas del sector financiero y actividades vulnerables a cumplir con reportes obligatorios e implementar sistemas anti-fraude operacionales.',
    verifiedDocumentsCount: 5,
    totalDocumentsCount: 5,
    location: 'Queretaro',
    experienceYears: 16,
    contactEmail: 'fruiz@forensiccompliance.com.mx',
    linkedinOrWebsite: 'https://forensiccompliance.com.mx',
    certifications: ['Certificado en PLD por CNBV', 'Certified Fraud Examiner (CFE)', 'C.P. Certificado IMCP'],
    rating: 4.9,
    ratingCount: 31,
    fiscalData: {
      rfc: 'RUDF810619LS2',
      razonSocial: 'Fernando Ruiz Delgado Auditores Independentes',
      regimenFiscal: '612 - Personas Físicas con Actividades Empresariales y Profesionales',
      domicilioFiscal: 'Av. Constituyentes 45, Col. Centro, Querétaro, Qro.',
      codigoPostal: '76000'
    },
    reviewsList: [
      { id: 'rev_5_1', reviewerName: 'Fintech Mexicana S.A.', rating: 5, comment: 'Su auditoría de PLD fue increíblemente minuciosa y aprobó sin observaciones ante la CNBV.', date: '21/04/2026' }
    ]
  }
];

export function ConsultantsDirectory() {
  const [consultants, setConsultants] = useState<RichConsultant[]>(INITIAL_CONSULTANTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todos');
  const [sortBy, setSortBy] = useState<'score' | 'experience' | 'rating'>('score');
  const [selectedConsultant, setSelectedConsultant] = useState<RichConsultant | null>(null);
  const [simulatedProfessionalRegistry, setSimulatedProfessionalRegistry] = useState<string | null>(null);

  // New state variables for rating interactive UI
  const [modalTab, setModalTab] = useState<'expediente' | 'ranking' | 'factura'>('expediente');
  const [userVoteRating, setUserVoteRating] = useState<number>(5);
  const [userComment, setUserComment] = useState<string>('');
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState<string | null>(null);

  // New state variables for Requesting Fiscal Invoicing
  const [billingClientRfc, setBillingClientRfc] = useState('VTS-040815-H42');
  const [billingClientName, setBillingClientName] = useState('Soluciones Tecnológicas Alfa S.A. de C.V.');
  const [billingClientRegimen, setBillingClientRegimen] = useState('601 - General de Ley Personas Morales');
  const [billingClientCp, setBillingClientCp] = useState('03100');
  const [billingClientCfdi, setBillingClientCfdi] = useState('G03 - Gastos en general');
  const [billingAmount, setBillingAmount] = useState('18500');
  const [billingDescription, setBillingDescription] = useState('Servicios de Consultoría Técnica en Cumplimiento de Procesos');
  const [invoiceRequested, setInvoiceRequested] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [invoiceHash, setInvoiceHash] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Extract unique specialties
  const specialties = useMemo(() => {
    const list = new Set<string>();
    consultants.forEach(c => list.add(c.specialty));
    return ['Todos', ...Array.from(list)];
  }, [consultants]);

  // Filter and sort consultants
  const processedConsultants = useMemo(() => {
    let result = [...consultants].filter(c => {
      const matchSearch = c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.curpOrRfc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSpecialty = selectedSpecialty === 'Todos' || c.specialty === selectedSpecialty;
      return matchSearch && matchSpecialty;
    });

    if (sortBy === 'score') {
      result.sort((a, b) => b.complianceScore - a.complianceScore);
    } else if (sortBy === 'experience') {
      result.sort((a, b) => b.experienceYears - a.experienceYears);
    } else {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [consultants, searchTerm, selectedSpecialty, sortBy]);

  // Aggregate stats
  const averageCompliance = useMemo(() => {
    const total = consultants.reduce((acc, c) => acc + c.complianceScore, 0);
    return (total / consultants.length).toFixed(1);
  }, [consultants]);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConsultant) return;

    // Simulate adding review
    const newReview: ConsultantReview = {
      id: `rev_user_${Date.now()}`,
      reviewerName: billingClientName || 'Usuario Evaluador VERTA',
      rating: userVoteRating,
      comment: userComment || 'Excelente consultoría de servicio. Todo bajo la norma de calidad.',
      date: '31/05/2026'
    };

    const updatedReviews = [newReview, ...selectedConsultant.reviewsList];
    const totalRatingSum = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
    const newAveRating = parseFloat((totalRatingSum / updatedReviews.length).toFixed(1));

    // Update in consultants list
    const updatedConsultants = consultants.map(c => {
      if (c.id === selectedConsultant.id) {
        return {
          ...c,
          rating: newAveRating,
          ratingCount: c.ratingCount + 1,
          reviewsList: updatedReviews
        };
      }
      return c;
    });

    setConsultants(updatedConsultants);
    // Update active modal consultant view
    const found = updatedConsultants.find(c => c.id === selectedConsultant.id);
    if (found) setSelectedConsultant(found);

    setReviewSuccessMessage('¡Calificación guardada y sellada con éxito con la e.firma del evaluador!');
    setUserComment('');
    setTimeout(() => setReviewSuccessMessage(null), 3500);
  };

  const handleRequestInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInvoiceLoading(true);
    setTimeout(() => {
      const stamp = `SAT-PAC-VERTA-${Math.floor(Math.random() * 900000 + 100000)}-CFD-${Math.floor(Date.now() / 100000)}`;
      setInvoiceHash(stamp);
      setInvoiceRequested(true);
      setInvoiceLoading(false);
    }, 1500);
  };

  const downloadBillingReceipt = () => {
    if (!selectedConsultant) return;
    const dataStr = `===========================================================
COMPROBANTE DE SOLICITUD DE FACTURA ELECTRÓNICA
===========================================================
EMISOR (CONSULTOR):
Razón Social: ${selectedConsultant.fiscalData.razonSocial}
RFC: ${selectedConsultant.fiscalData.rfc}
Régimen: ${selectedConsultant.fiscalData.regimenFiscal}
Domicilio: ${selectedConsultant.fiscalData.domicilioFiscal}
===========================================================
RECEPTOR (CLIENTE DE SERVICIO):
Razón Social: ${billingClientName}
RFC: ${billingClientRfc}
Régimen: ${billingClientRegimen}
Uso de CFDI: ${billingClientCfdi}
C.P. Fiscal: ${billingClientCp}
===========================================================
CONCEPTOS DE SERVICIO:
Descripción: ${billingDescription}
Monto Base (MXN): $${parseFloat(billingAmount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
Subtotal: $${parseFloat(billingAmount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
IVA (16% Trasladado): $${(parseFloat(billingAmount) * 0.16).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
Total de Facturar: $${(parseFloat(billingAmount) * 1.16).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
===========================================================
SELLO DE CERTIFICACIÓN LOG-VERTA:
Sello HASH: ${invoiceHash}
Fecha de Emisión: 2026-05-31T01:10:00Z
Validado mediante VERTA OS Secure Protocol 1.4-MD
===========================================================`;

    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `Sello-Factura-${selectedConsultant.id}-${Date.now()}.txt`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderStars = (rating: number, size = 14) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.4;
    return (
      <div className="flex items-center space-x-1.5 py-1">
        <div className="flex items-center space-x-0.5">
          {[...Array(5)].map((_, i) => {
            const index = i + 1;
            const isGold = index <= fullStars;
            const isHalf = !isGold && index === fullStars + 1 && hasHalf;
            return (
              <Star 
                key={i} 
                size={size} 
                className={`${isGold ? 'fill-amber-400 text-amber-400' : isHalf ? 'fill-amber-400/50 text-amber-500' : 'text-gray-600'} shrink-0`} 
              />
            );
          })}
        </div>
        <span className="text-white text-xs font-mono font-bold ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-10 animate-fade-in text-sans">
      
      {/* DIRECTORY HERO BANNER */}
      <section className="relative px-4 lg:px-8 py-10 overflow-hidden border-b border-verta-slate-blue/30 metal-texture">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-verta-cyan/5 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-verta-coral/5 rounded-full blur-[110px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 bg-verta-coral/15 border border-verta-coral/30 px-3 py-1 rounded-full text-xs font-mono text-verta-coral">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>DIRECTORIO PÚBLICO "CONSULTORES Y PROFESIONALES"</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
              Consultores y Profesionales Verificados
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
              Consulte y contacte a especialistas acreditados en materia jurídica, tributaria, laboral, ambiental y tecnológica. Evalué el <span className="text-amber-400 font-bold">ranking de estrellas de servicio</span> de peer-to-peer y solicite de forma digital sus <span className="text-verta-cyan font-bold">datos fiscales certificados</span> para proceder a la facturación de servicios de conformidad con el SAT.
            </p>
          </div>

          {/* Core metrics badges */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="verta-glass border-verta-slate-blue/50 p-4 rounded-xl text-center min-w-[140px]">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Acreditados</span>
              <span className="text-3xl font-black text-white font-mono">{consultants.length}</span>
              <span className="block text-[9px] text-verta-cyan font-semibold mt-0.5 font-mono">100% ACTIVO</span>
            </div>
            <div className="verta-glass border-verta-slate-blue/50 p-4 rounded-xl text-center min-w-[140px]">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Compliance Promedio</span>
              <span className="text-3xl font-black text-verta-coral font-mono">{averageCompliance}</span>
              <span className="block text-[9px] text-gray-400 mt-0.5 font-mono">ALTA AUDITORÍA</span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & CONTROL PANEL */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Real-time search */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por consultor, especialidad, RFC, estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan focus:outline-none rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-gray-500 transition-all font-sans"
            />
          </div>

          {/* Specialty class selector */}
          <div className="md:col-span-4 flex items-center space-x-2">
            <Filter className="w-4 h-4 text-verta-coral shrink-0" />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 hover:hover:border-verta-cyan/40 focus:border-verta-cyan rounded-xl px-3 py-2.5 text-xs text-gray-300 font-medium focus:outline-none cursor-pointer"
            >
              {specialties.map(spec => (
                <option key={spec} value={spec} className="bg-verta-navy text-white text-xs">
                  Especialidad: {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Order toggler */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-verta-dark-blue/80 border border-verta-slate-blue/60 hover:hover:border-verta-cyan/40 focus:border-verta-cyan rounded-xl px-3 py-2.5 text-xs text-gray-300 font-medium focus:outline-none cursor-pointer"
            >
              <option value="score" className="bg-verta-navy text-white text-xs">Ordenar por: Prioridad de Validación</option>
              <option value="experience" className="bg-verta-navy text-white text-xs">Ordenar por: Años de Experiencia</option>
              <option value="rating" className="bg-verta-navy text-white text-xs">Ordenar por: Estrellas de Servicio</option>
            </select>
          </div>

        </div>
      </div>

      {/* PUBLIC CONSULTANTS GRID DIRECT */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {processedConsultants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedConsultants.map((consultant) => (
              <div 
                key={consultant.id}
                className="verta-glass verta-glass-hover rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group border-b-2 border-b-verta-slate-blue/50 animate-fade-in"
              >
                {/* Visual hover neon laser border line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-verta-coral to-amber-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
                
                {/* Glow dot in corner */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-verta-coral/10 rounded-full blur-xl group-hover:bg-verta-coral/20 transition-all pointer-events-none" />

                <div className="space-y-4">
                  {/* Top sector, RFC and status badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl ${consultant.avatarColor} flex items-center justify-center font-bold text-sm tracking-tight shadow-md ring-2 ring-white/5`}>
                        {consultant.avatarLetters}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-verta-coral block uppercase tracking-wider font-semibold">{consultant.specialty}</span>
                        <span className="text-[11px] font-mono text-gray-400 block">{consultant.curpOrRfc}</span>
                      </div>
                    </div>
                    {/* Status badge */}
                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Validado</span>
                      </span>
                      <span className="block text-[9px] font-mono text-gray-400 mt-0.5">Cédula & SAT OK</span>
                    </div>
                  </div>

                  {/* Rating indicator */}
                  <div className="bg-yellow-500/5 px-2.5 py-1 rounded-lg border border-yellow-500/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold text-amber-400 uppercase tracking-widest">Servicio</span>
                    <div className="flex items-center">
                      {renderStars(consultant.rating, 13)}
                      <span className="text-[10px] text-gray-400 ml-1">({consultant.ratingCount})</span>
                    </div>
                  </div>

                  {/* Consultant Name & bio */}
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-white tracking-tight leading-tight group-hover:text-verta-coral transition-colors">
                      {consultant.fullName}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {consultant.biography}
                    </p>
                  </div>

                  {/* Metrics and location info */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-gray-400">
                    <div className="bg-verta-navy/40 p-2 rounded-lg border border-verta-slate-blue/20">
                      <span className="text-gray-500 block">Ubicación</span>
                      <span className="text-white font-semibold truncate block">{consultant.location}</span>
                    </div>
                    <div className="bg-verta-navy/40 p-2 rounded-lg border border-verta-slate-blue/20">
                      <span className="text-gray-500 block">Experiencia</span>
                      <span className="text-white font-semibold truncate block">{consultant.experienceYears} años</span>
                    </div>
                  </div>

                  {/* Certifications preview */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-gray-500 block uppercase">Acreditaciones Top</span>
                    <div className="flex flex-wrap gap-1">
                      {consultant.certifications.slice(0, 2).map((cert, i) => (
                        <span key={i} className="bg-verta-slate-blue/40 border border-verta-slate-blue/60 text-[10px] text-gray-300 px-2 py-0.5 rounded-full font-sans truncate max-w-full">
                          🛡️ {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer actions */}
                <div className="pt-5 mt-4 space-y-2">
                  <button 
                    onClick={() => {
                      setSelectedConsultant(consultant);
                      setModalTab('expediente');
                      setInvoiceRequested(false);
                      setInvoiceHash('');
                    }}
                    className="w-full py-2.5 px-4 bg-verta-coral/15 hover:bg-verta-coral/30 text-xs font-bold text-white rounded-xl border border-verta-coral/30 flex items-center justify-center space-x-2 transition-all cursor-pointer hover:border-verta-coral/60"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-verta-coral" />
                    <span>Ver Expediente, Calificación e IVA</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 px-1 pt-1">
                    <span className="flex items-center space-x-1 text-verta-emerald">
                      <CheckCircle className="w-3 h-3 text-verta-emerald inline" />
                      <span>{consultant.verifiedDocumentsCount} de {consultant.totalDocumentsCount} Docs Validados</span>
                    </span>
                    <span className="text-gray-500">Sello Activo</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Search error state */
          <div className="verta-glass border-dashed border-verta-slate-blue/60 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
            <Award className="w-12 h-12 text-verta-coral mx-auto animate-bounce" />
            <div>
              <p className="font-bold text-lg text-white">No se encontraron profesionales</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                No hay consultor registrado en el catálogo que coincida con la búsqueda "{searchTerm}" o especialidad "{selectedSpecialty}".
              </p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('Todos');
              }}
              className="px-4 py-2 bg-verta-slate-blue text-white text-xs font-mono font-semibold rounded-lg hover:border-verta-cyan transition-all cursor-pointer"
            >
              Mostrar todos
            </button>
          </div>
        )}
      </div>

      {/* DETAILED PROFESSIONAL AUDITING MODAL WITH RATING & BILLING TABS */}
      {selectedConsultant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-2xl verta-glass border border-verta-coral/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-verta-slate-blue/40 bg-verta-dark-blue/80">
              <div className="flex items-center space-x-3.5">
                <div className={`w-10 h-10 rounded-xl ${selectedConsultant.avatarColor} flex items-center justify-center font-bold text-sm tracking-tight shadow`}>
                  {selectedConsultant.avatarLetters}
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white font-sans">{selectedConsultant.fullName}</h3>
                  <div className="flex items-center space-x-3 text-xs text-gray-400 font-mono mt-0.5">
                    <span>RFC/CURP: {selectedConsultant.curpOrRfc}</span>
                    <span>•</span>
                    <span className="text-verta-coral font-semibold">{selectedConsultant.specialty}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedConsultant(null);
                  setSimulatedProfessionalRegistry(null);
                }}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-verta-slate-blue/40 rounded-lg transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TAB SELECTOR INSIDE MODAL */}
            <div className="flex border-b border-verta-slate-blue/40 bg-verta-navy/80 px-4">
              <button
                onClick={() => setModalTab('expediente')}
                className={`py-3 px-4 text-xs font-mono font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                  modalTab === 'expediente' 
                    ? 'border-verta-coral text-white bg-verta-coral/5' 
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-verta-slate-blue/20'
                }`}
              >
                💼 Expediente & Cédula
              </button>
              <button
                onClick={() => setModalTab('ranking')}
                className={`py-3 px-4 text-xs font-mono font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer flex items-center space-x-1.5 ${
                  modalTab === 'ranking' 
                    ? 'border-amber-400 text-white bg-amber-400/5' 
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-verta-slate-blue/20'
                }`}
              >
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>Ranking de Servicio ({selectedConsultant.rating.toFixed(1)})</span>
              </button>
              <button
                onClick={() => {
                  setModalTab('factura');
                  setInvoiceRequested(false);
                  setInvoiceHash('');
                }}
                className={`py-3 px-4 text-xs font-mono font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer flex items-center space-x-1.5 ${
                  modalTab === 'factura' 
                    ? 'border-verta-cyan text-white bg-verta-cyan/5' 
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-verta-slate-blue/20'
                }`}
              >
                <FileText size={13} className="text-verta-cyan" />
                <span>Datos Fiscales & Requerir Factura</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar">

              {/* TAB 1: EXPEDIENTE CÉDULA */}
              {modalTab === 'expediente' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Profile summary & background */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-verta-coral uppercase tracking-wider">Historial Profesional</h4>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed bg-verta-navy/50 p-3.5 rounded-xl border border-verta-slate-blue/30 font-sans">
                      {selectedConsultant.biography}
                    </p>
                  </div>

                  {/* Verified certifications badges */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Sello de Certificaciones Validadas</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedConsultant.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-2.5 p-3 rounded-xl bg-verta-coral/10 border border-verta-coral/20 text-xs text-gray-200">
                          <Award className="w-4 h-4 text-verta-coral shrink-0" />
                          <span className="font-sans font-medium">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personal digital compliance documents */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">EXPEDIENTE DIGITAL IMPULSADO</h4>
                    
                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        { title: 'Cédula Profesional Federal', status: 'Registrada y validada ante SEP Dirección General de Profesiones', code: 'Grado de Licenciatura / Maestría' },
                        { title: 'Identificación Oficial Vigente', status: 'Fotografía, CURP y firma e.firma coincidentes', code: 'Sello Biométrico OK' },
                        { title: 'Opinión de Cumplimiento SAT (32-D)', status: 'Situación fiscal limpia de adeudos u obligaciones omisas', code: 'Estatus Positivo' },
                        { title: 'Constancia de Registro RFC', status: 'Registro federal de contribuyentes emitido por SAT', code: 'Sujeto Activo' },
                        { title: 'Comprobante de Domicilio de Oficina', status: 'Validez del domicilio fiscal verificado in-situ', code: 'Localizado' },
                      ].map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-verta-navy/30 border border-verta-slate-blue/20 hover:border-verta-cyan/15 transition-all text-xs">
                          <div className="flex items-start space-x-3">
                            <CheckCircle2 className="w-4 h-4 text-verta-emerald shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-white font-sans">{doc.title}</p>
                              <span className="text-[10px] text-gray-400 block font-mono mt-0.5">{doc.status}</span>
                            </div>
                          </div>
                          <div className="text-right font-mono text-[9px] text-gray-500">
                            <span>{doc.code}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience and details bar */}
                  <div className="bg-verta-slate-blue/15 border border-verta-slate-blue/30 p-4 rounded-xl flex items-center justify-between text-xs font-mono">
                    <div className="space-y-1">
                      <span className="text-gray-400 block">Sede</span>
                      <span className="text-white font-bold font-sans">{selectedConsultant.location}</span>
                    </div>
                    <div className="text-center space-y-1">
                      <span className="text-gray-400 block">Trayectoria</span>
                      <span className="text-white font-bold font-sans">{selectedConsultant.experienceYears} años activos</span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-gray-400 block">Estatus VERTA</span>
                      <span className="text-verta-coral font-bold font-sans flex items-center justify-end space-x-1">
                        <span>Acreditado Elite</span>
                        <span>⭐</span>
                      </span>
                    </div>
                  </div>

                  {/* Consultation simulation */}
                  {simulatedProfessionalRegistry ? (
                    <div className="bg-verta-emerald/10 border border-verta-emerald/30 p-4 rounded-xl space-y-2 text-xs text-gray-300 animate-fade-in font-mono">
                      <div className="flex items-center space-x-2 text-verta-emerald">
                        <CheckCircle className="w-4 h-4 animate-bounce" />
                        <span className="font-bold">CÉDULA PROFESIONAL VALIDADA DIRECTO EN REGISTRO NACIONAL</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        Identificador de Consulta: <span className="text-white">{simulatedProfessionalRegistry}</span><br />
                        Consultado en Registro SEP el: <strong>2026-05-31</strong>.<br />
                        La cédula profesional para <strong>{selectedConsultant.fullName}</strong> se encuentra en estatus: <strong className="text-verta-emerald">VIGENTE Y HABILITADA PARA EL EJERCICIO</strong>.
                      </p>
                    </div>
                  ) : (
                    <div className="text-center pt-2">
                      <button
                        onClick={() => setSimulatedProfessionalRegistry(`SEP-CEDULA-REG-${Math.floor(Math.random() * 8000000 + 1000000)}-SHA256`)}
                        className="px-5 py-2.5 bg-verta-coral text-white font-bold font-mono text-xs rounded-xl hover:scale-102 hover:shadow-[0_0_15px_rgba(255,127,80,0.4)] transition-all cursor-pointer inline-flex items-center space-x-2"
                      >
                        <span>Consultar Registro de Cédulas SEP</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: RANKING DE SERVICIO INTERACTIVO */}
              {modalTab === 'ranking' && (
                <div className="space-y-6 animate-fade-in font-sans">
                  
                  {/* Performance Stars Header card */}
                  <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">Índice General de Calidad de Servicio</span>
                      <h3 className="text-2xl font-extrabold text-white">{selectedConsultant.fullName}</h3>
                      <p className="text-xs text-gray-400">Total de evaluaciones auditadas por firmas contratantes</p>
                    </div>

                    <div className="text-center bg-zinc-900/60 px-4 py-3 rounded-xl border border-verta-slate-blue/40 min-w-[120px]">
                      <span className="text-3xl font-black text-amber-400 font-mono">{selectedConsultant.rating.toFixed(1)}</span>
                      {renderStars(selectedConsultant.rating, 14)}
                      <span className="text-[10px] text-gray-400 font-mono block mt-1">{selectedConsultant.ratingCount} votos de servicio</span>
                    </div>
                  </div>

                  {/* Submit rating form */}
                  <form onSubmit={handleAddReview} className="p-5 border border-verta-slate-blue/50 rounded-2xl bg-verta-navy/40 space-y-4">
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                      <MessageSquare className="w-4 h-4 text-amber-400" />
                      <span>Calificar el servicio de este consultor</span>
                    </h4>

                    {reviewSuccessMessage && (
                      <div className="p-3 bg-verta-emerald/15 border border-verta-emerald/30 text-verta-emerald text-xs rounded-xl font-medium animate-pulse">
                        ⭐ {reviewSuccessMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono text-gray-400 block">Puntaje del 1 al 5 en Calidad de Servicio</label>
                        <div className="flex items-center space-x-2 bg-verta-dark-blue border border-verta-slate-blue/60 focus-within:border-amber-400 transition-all rounded-xl p-2">
                          {[1, 2, 3, 4, 5].map((starVal) => (
                            <button
                              key={starVal}
                              type="button"
                              onClick={() => setUserVoteRating(starVal)}
                              className="p-1 hover:scale-115 transition-transform"
                            >
                              <Star
                                size={22}
                                className={`${
                                  starVal <= userVoteRating 
                                    ? 'fill-amber-400 text-amber-400' 
                                    : 'text-gray-600 hover:text-amber-300'
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-xs font-mono font-bold text-white ml-2">({userVoteRating} Estrellas)</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono text-gray-400 block">Razón Social Evaluadora (Opcional)</label>
                        <input
                          type="text"
                          value={billingClientName}
                          onChange={(e) => setBillingClientName(e.target.value)}
                          placeholder="Mi Empresa S.A."
                          className="w-full bg-verta-dark-blue border border-verta-slate-blue/60 focus:border-amber-400 focus:outline-none rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-gray-400 block">Comentarios sobre la Calidad y Atención</label>
                      <textarea
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        placeholder="Escriba su reseña honesta aquí... (ej. Gran prontitud en la entrega, soporte continuo en regularización REPSE)"
                        className="w-full bg-verta-dark-blue border border-verta-slate-blue/60 focus:border-amber-400 focus:outline-none rounded-xl p-3 text-xs text-white placeholder-gray-600 h-20 resize-none"
                        required
                      />
                    </div>

                    <div className="text-right">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-verta-navy font-black text-xs rounded-xl flex items-center space-x-1.5 cursor-pointer ml-auto transition-all"
                      >
                        <Send size={13} />
                        <span>Sellar y Registrar Voto</span>
                      </button>
                    </div>
                  </form>

                  {/* Feedback peer reviews block */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Reseñas y Comentarios de Empresas Mexicanas</h4>
                    
                    <div className="space-y-2.5">
                      {selectedConsultant.reviewsList.map((rev) => (
                        <div key={rev.id} className="p-4 rounded-xl border border-verta-slate-blue/30 bg-verta-navy/20 space-y-2 text-xs animate-fade-in relative">
                          <div className="absolute right-4 top-4 text-[10px] font-mono text-slate-500">
                            {rev.date}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white block">{rev.reviewerName}</span>
                            <span className="text-gray-500 font-mono">•</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, idx) => (
                                <Star 
                                  key={idx} 
                                  size={11} 
                                  className={`${idx < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-700'}`} 
                                />
                              ))}
                            </div>
                          </div>

                          <p className="text-gray-300 italic leading-relaxed text-[11px] pl-1 border-l-2 border-amber-400/40">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: DATOS FISCALES & FACTURACIÓN */}
              {modalTab === 'factura' && (
                <div className="space-y-6 animate-fade-in font-sans">
                  
                  {/* Warning SAT Facturación verificado */}
                  <div className="flex items-start space-x-3 bg-verta-cyan/10 border border-verta-cyan/20 p-4 rounded-xl text-xs">
                    <Info className="w-5 h-5 text-verta-cyan shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Sello de Facturación SAT Verificado</p>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        Los datos fiscales detallados a continuación han sido convalidados directamente contra la base de datos oficial del SAT mediante firmas SHA-256. Ideal para realizar retenciones correctas del 10% de ISR o IVA según corresponda para prestadores profesionales (Personas Físicas).
                      </p>
                    </div>
                  </div>

                  {/* CONSULTANT'S OFFICIAL FISCAL CARD (CÉDULA FISCAL) */}
                  <div className="border border-verta-slate-blue/60 rounded-2xl overflow-hidden bg-verta-navy/50">
                    <div className="bg-verta-dark-blue px-4 py-2.5 border-b border-verta-slate-blue/50 flex justify-between items-center text-xs">
                      <span className="font-mono font-bold text-gray-300 uppercase tracking-widest flex items-center space-x-1.5">
                        <Building2 size={14} className="text-amber-400" />
                        <span>Cédula de Identificación Fiscal Exclusiva</span>
                      </span>
                      <span className="bg-verta-emerald/15 text-verta-emerald px-2 py-0.5 rounded text-[9px] font-mono font-bold">VERTI-SAT CONFIRMED</span>
                    </div>

                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      
                      {/* Razón Social */}
                      <div className="bg-zinc-900/40 p-3 rounded-xl border border-verta-slate-blue/20 relative group">
                        <span className="text-gray-500 block text-[9px] uppercase font-mono">RAZÓN SOCIAL</span>
                        <span className="text-white font-sans font-extrabold text-sm block mt-0.5 truncate pr-8">{selectedConsultant.fiscalData.razonSocial}</span>
                        <button 
                          onClick={() => copyToClipboard(selectedConsultant.fiscalData.razonSocial, 'razonSocial')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 bg-verta-slate-blue/35 hover:bg-verta-slate-blue text-gray-400 hover:text-white rounded cursor-pointer transition-all"
                        >
                          {copiedField === 'razonSocial' ? <Check size={12} className="text-verta-emerald" /> : <Copy size={12} />}
                        </button>
                      </div>

                      {/* RFC */}
                      <div className="bg-zinc-900/40 p-3 rounded-xl border border-verta-slate-blue/20 relative group">
                        <span className="text-gray-500 block text-[9px] uppercase font-mono">RFC DE EMPRESA/FÍSICA</span>
                        <span className="text-verta-cyan font-mono font-extrabold text-sm block mt-0.5 select-all">{selectedConsultant.fiscalData.rfc}</span>
                        <button 
                          onClick={() => copyToClipboard(selectedConsultant.fiscalData.rfc, 'rfc')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 bg-verta-slate-blue/35 hover:bg-verta-slate-blue text-gray-400 hover:text-white rounded cursor-pointer transition-all"
                        >
                          {copiedField === 'rfc' ? <Check size={12} className="text-verta-emerald" /> : <Copy size={12} />}
                        </button>
                      </div>

                      {/* Régimen Fiscal */}
                      <div className="bg-zinc-900/40 p-3 rounded-xl border border-verta-slate-blue/20 relative group sm:col-span-2">
                        <span className="text-gray-500 block text-[9px] uppercase font-mono">RÉGIMEN FISCAL REGISTRADO</span>
                        <span className="text-white font-sans font-bold text-[11px] block mt-0.5 pr-8">{selectedConsultant.fiscalData.regimenFiscal}</span>
                        <button 
                          onClick={() => copyToClipboard(selectedConsultant.fiscalData.regimenFiscal, 'regimenFiscal')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 bg-verta-slate-blue/35 hover:bg-verta-slate-blue text-gray-400 hover:text-white rounded cursor-pointer transition-all"
                        >
                          {copiedField === 'regimenFiscal' ? <Check size={12} className="text-verta-emerald" /> : <Copy size={12} />}
                        </button>
                      </div>

                      {/* CP */}
                      <div className="bg-zinc-900/40 p-3 rounded-xl border border-verta-slate-blue/20 relative group">
                        <span className="text-gray-500 block text-[9px] uppercase font-mono">CÓDIGO POSTAL FISCAL</span>
                        <span className="text-white font-mono font-bold text-sm block mt-0.5 select-all">{selectedConsultant.fiscalData.codigoPostal}</span>
                        <button 
                          onClick={() => copyToClipboard(selectedConsultant.fiscalData.codigoPostal, 'codigoPostal')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 bg-verta-slate-blue/35 hover:bg-verta-slate-blue text-gray-400 hover:text-white rounded cursor-pointer transition-all"
                        >
                          {copiedField === 'codigoPostal' ? <Check size={12} className="text-verta-emerald" /> : <Copy size={12} />}
                        </button>
                      </div>

                      {/* Domicilio Fiscal */}
                      <div className="bg-zinc-900/40 p-3 rounded-xl border border-verta-slate-blue/20 relative group">
                        <span className="text-gray-500 block text-[9px] uppercase font-mono">DOMICILIO FISCAL COMPLETO</span>
                        <span className="text-white font-sans text-[11px] block mt-0.5 truncate pr-8">{selectedConsultant.fiscalData.domicilioFiscal}</span>
                        <button 
                          onClick={() => copyToClipboard(selectedConsultant.fiscalData.domicilioFiscal, 'domicilioFiscal')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 bg-verta-slate-blue/35 hover:bg-verta-slate-blue text-gray-400 hover:text-white rounded cursor-pointer transition-all"
                        >
                          {copiedField === 'domicilioFiscal' ? <Check size={12} className="text-verta-emerald" /> : <Copy size={12} />}
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* FORM TO REQUEST INVOICE DIRECTLY WITH DIGITIZED DATA */}
                  <div className="p-5 border border-verta-slate-blue/50 rounded-2xl bg-verta-navy/40 space-y-4">
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                      <FileText size={15} className="text-verta-cyan" />
                      <span>Solicitar factura/invoicing de honorarios directamente</span>
                    </h4>

                    {invoiceRequested ? (
                      <div className="bg-verta-emerald/10 border border-verta-emerald/30 p-4 rounded-xl space-y-3 text-xs text-gray-300 animate-fade-in">
                        <div className="flex items-center space-x-2 text-verta-emerald font-bold font-mono">
                          <CheckCircle className="w-4 h-4 animate-bounce" />
                          <span>SOLICITUD DE FACTURACIÓN ENVIADA CON ÉXITO</span>
                        </div>
                        <p className="text-[11px] leading-relaxed font-sans">
                          La solicitud para la generación del CFDI fue registrada de forma segura. El consultor emitirá el comprobante correspondiente al monto estipulado en las próximas 24 horas hábiles.
                        </p>
                        
                        <div className="p-3 bg-zinc-950/60 rounded-xl border border-verta-emerald/25 font-mono text-[10px] space-y-1 select-all">
                          <div>Sello Digital Hash: <strong className="text-white">{invoiceHash}</strong></div>
                          <div>Monto de Operación: <strong>${parseFloat(billingAmount).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN (+ IVA)</strong></div>
                          <div>Emisor Certificador: <strong>{selectedConsultant.fiscalData.razonSocial} (RFC: {selectedConsultant.fiscalData.rfc})</strong></div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[10px] text-zinc-500 font-mono">Cotejo: VERTA-XML-3.3/4.0</span>
                          <button
                            onClick={downloadBillingReceipt}
                            className="bg-verta-emerald hover:bg-emerald-600 text-verta-navy font-black text-xs px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 cursor-pointer hover:scale-101 transition-all"
                          >
                            <Download size={13} />
                            <span>Descargar Comprobante .TXT</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleRequestInvoiceSubmit} className="space-y-4 text-xs font-sans">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          
                          {/* Client Name */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-gray-400 block">Razón Social Legal (Receptor)</label>
                            <input 
                              type="text" 
                              value={billingClientName}
                              onChange={(e) => setBillingClientName(e.target.value)}
                              className="w-full bg-verta-dark-blue border border-verta-slate-blue/60 focus:border-verta-cyan focus:outline-none rounded-xl px-3 py-2 text-xs text-white"
                              required
                            />
                          </div>

                          {/* Client RFC */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-gray-400 block">RFC del Receptor</label>
                            <input 
                              type="text" 
                              value={billingClientRfc}
                              onChange={(e) => setBillingClientRfc(e.target.value)}
                              className="w-full bg-verta-dark-blue border border-verta-slate-blue/60 focus:border-verta-cyan focus:outline-none rounded-xl px-3 py-2 text-xs text-white font-mono"
                              required
                            />
                          </div>

                          {/* Client CP */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-gray-400 block">Código Postal Receptor</label>
                            <input 
                              type="text" 
                              value={billingClientCp}
                              onChange={(e) => setBillingClientCp(e.target.value)}
                              className="w-full bg-verta-dark-blue border border-verta-slate-blue/60 focus:border-verta-cyan focus:outline-none rounded-xl px-3 py-2 text-xs text-white"
                              required
                            />
                          </div>

                          {/* Uso CFDI */}
                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-gray-400 block">Uso del CFDI</label>
                            <select 
                              value={billingClientCfdi}
                              onChange={(e) => setBillingClientCfdi(e.target.value)}
                              className="w-full bg-verta-dark-blue border border-verta-slate-blue/60 focus:border-verta-cyan rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none"
                            >
                              <option value="G03 - Gastos en general">G03 - Gastos en general</option>
                              <option value="D01 - Honorarios médicos, dentales y gastos hospitalarios">D01 - Honorarios médicos</option>
                              <option value="I01 - Construcciones">I01 - Construcciones</option>
                            </select>
                          </div>

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 pt-2">
                          {/* Amount */}
                          <div className="sm:col-span-4 space-y-1">
                            <label className="text-[11px] font-mono text-gray-400 block">Subtotal Base del Servicio (MXN)</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                              <input 
                                type="number" 
                                value={billingAmount}
                                onChange={(e) => setBillingAmount(e.target.value)}
                                className="w-full bg-verta-dark-blue border border-verta-slate-blue/60 focus:border-verta-cyan focus:outline-none rounded-xl pl-7 pr-3 py-2 text-xs text-white"
                                required
                              />
                            </div>
                          </div>

                          {/* Description */}
                          <div className="sm:col-span-8 space-y-1">
                            <label className="text-[11px] font-mono text-gray-400 block">Descripción del Servicio Técnico Amparado</label>
                            <input 
                              type="text" 
                              value={billingDescription}
                              onChange={(e) => setBillingDescription(e.target.value)}
                              className="w-full bg-verta-dark-blue border border-verta-slate-blue/60 focus:border-verta-cyan focus:outline-none rounded-xl px-3 py-2 text-xs text-white"
                              required
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={invoiceLoading}
                          className="w-full py-2.5 px-4 bg-verta-cyan text-verta-navy font-extrabold rounded-xl flex items-center justify-center space-x-2 transition-all hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:scale-[1.01] cursor-pointer disabled:opacity-50"
                        >
                          {invoiceLoading ? (
                            <span>Sellando y certificando con e.g. SAT... Espere un momento</span>
                          ) : (
                            <>
                              <FileText size={14} />
                              <span>Generar Comprobante de Solicitud de Factura</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>

                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-verta-navy/90 border-t border-verta-slate-blue/40 flex justify-between items-center">
              <div className="flex space-x-3 text-xs text-gray-400">
                <a 
                  href={`mailto:${selectedConsultant.contactEmail}`}
                  className="hover:text-verta-coral transition-colors flex items-center space-x-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{selectedConsultant.contactEmail}</span>
                </a>
              </div>
              <button
                onClick={() => {
                  setSelectedConsultant(null);
                  setSimulatedProfessionalRegistry(null);
                }}
                className="px-4 py-2 bg-verta-slate-blue/50 text-gray-300 hover:text-white rounded-xl text-xs font-mono font-semibold hover:bg-verta-slate-blue hover:border hover:border-verta-coral/30 transition-all cursor-pointer"
              >
                Cerrar Expediente
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
