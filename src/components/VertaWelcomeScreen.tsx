/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Layers, 
  Scale, 
  CheckCircle,
  Sparkles,
  TrendingUp,
  Briefcase,
  Users,
  Building2,
  Lock,
  AlertCircle,
  BookOpen,
  Settings,
  FileCheck2,
  BadgePercent,
  Search,
  UserPlus,
  Send,
  Copy,
  Check,
  Key,
  X,
  Mail,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { PullDirectory } from './PullDirectory';
import { VertaSystemCover } from './VertaSystemCover';

interface VertaWelcomeScreenProps {
  setActiveTab: (tab: string) => void;
  providerName: string;
  clientName: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label?: string;
  glowColor?: string;
}

export function VertaWelcomeScreen({ setActiveTab, providerName, clientName }: VertaWelcomeScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [activeItemHovered, setActiveItemHovered] = useState<string | null>(null);

  // Modals and Entry Paths states
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showValidateModal, setShowValidateModal] = useState(false);
  const [validateModalTab, setValidateModalTab] = useState<'start' | 'accept'>('start');

  // Form states for inviting a provider
  const [inviteProviderName, setInviteProviderName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRfc, setInviteRfc] = useState('');
  const [inviteServiceType, setInviteServiceType] = useState('Servicios Especializados / REPSE');
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([
    'Opinión SAT 32-D Positiva',
    'Constancia de Situación Fiscal (RFC)',
    'Acta Constitutiva y Poderes Notariales',
    'Opinión de Cumplimiento IMSS'
  ]);
  const [invitationCode, setInvitationCode] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form states for validation
  const [valCompanyName, setValCompanyName] = useState(providerName || '');
  const [valRfc, setValRfc] = useState('');
  const [valSector, setValSector] = useState('Tecnología & Consultoría');
  const [valInviteCode, setValInviteCode] = useState('');
  const [validationSuccessMessage, setValidationSuccessMessage] = useState<string | null>(null);

  const handleSendInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteProviderName.trim()) return;
    const generated = `VRT-${Math.floor(1000 + Math.random() * 9000)}`;
    setInvitationCode(generated);
  };

  const handleCopyLink = () => {
    if (!invitationCode) return;
    const link = `https://verta.io/invitacion/${invitationCode.toLowerCase()}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(link);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleStartValidationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationSuccessMessage('¡Expediente Inicial Creado con Éxito!');
    setTimeout(() => {
      setShowValidateModal(false);
      setValidationSuccessMessage(null);
      setActiveTab('perfil');
    }, 1200);
  };

  const handleAcceptInvitationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valInviteCode.trim()) return;
    setValidationSuccessMessage(`¡Invitación ${valInviteCode.toUpperCase()} Verificada! Redirigiendo a expediente...`);
    setTimeout(() => {
      setShowValidateModal(false);
      setValidationSuccessMessage(null);
      setActiveTab('perfil');
    }, 1200);
  };

  const toggleRequirement = (req: string) => {
    if (selectedRequirements.includes(req)) {
      setSelectedRequirements(selectedRequirements.filter(r => r !== req));
    } else {
      setSelectedRequirements([...selectedRequirements, req]);
    }
  };

  // Nodes animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const MAX_PARTICLES = 70;
    const CONNECT_DIST = 130;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || window.innerWidth;
      canvas.height = rect?.height || window.innerHeight || 500;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Labels for specialized regulatory points
    const complianceLabels = [
      'SAT 32-D', 'RFC Corp', 'IMSS Nom', 'Acta Const', 'ISO 9001',
      'e.firma', 'REPSE', 'Patrimonio', 'Verta-OCR', 'KyC Cert'
    ];

    // Seed particles
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const radius = Math.random() * 2 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      
      // very slow, high-tech crawling velocities
      const vx = (Math.random() - 0.5) * 0.35;
      const vy = (Math.random() - 0.5) * 0.35;

      // Assign custom labels to a subset of particles
      let label: string | undefined = undefined;
      let glowColor: string | undefined = undefined;
      if (i < complianceLabels.length) {
        label = complianceLabels[i];
        glowColor = i % 2 === 0 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(249, 115, 22, 0.4)';
      }

      particles.push({ x, y, vx, vy, radius, label, glowColor });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create matrix glow grid lines in the background
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw active connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.14;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect cursor to nodes nearby
        if (mousePosition.x !== -1000) {
          const dx = p1.x - mousePosition.x;
          const dy = p1.y - mousePosition.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.22;
            ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mousePosition.x, mousePosition.y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce back from boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw node dot
        ctx.fillStyle = p.label ? 'rgba(6, 182, 212, 0.8)' : 'rgba(226, 232, 240, 0.4)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.label ? p.radius + 1.2 : p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Custom glow radial around specialized labels
        if (p.label && p.glowColor) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#06b6d4';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(6, 182, 212, 0.1)';
          ctx.fill();
          ctx.shadowBlur = 0; // reset shadow

          // Render label text next to particle
          ctx.font = 'bold 9px monospace';
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.fillText(p.label, p.x + 8, p.y + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mousePosition]);

  const welcomeButtons = [
    {
      id: 'pull',
      title: 'Directorio Pull de Proveedores',
      desc: 'Verifique los expedientes aprobados para integrarse como proveedor directo confiable.',
      details: 'Mapeo certificado de contratantes',
      icon: <Building2 className="w-5 h-5 text-verta-cyan" />,
      color: 'hover:border-verta-cyan/60 group-hover:bg-verta-cyan/5',
      badge: '10 Empresas'
    },
    {
      id: 'consultores',
      title: 'Directorio de Consultores VERTA',
      desc: 'Acceda a la red certificada de especialistas jurídicos y despachos fiscales de soporte.',
      details: 'Asesoría y acompañamiento profesional',
      icon: <Users className="w-5 h-5 text-indigo-400" />,
      color: 'hover:border-indigo-400/60 group-hover:bg-indigo-400/5',
      badge: '5 Expertos'
    },
    {
      id: 'iso9000',
      title: 'Auditoría Certificada ISO 9000',
      desc: 'Consulte lineamientos, guías y estatus de cumplimiento de empresas bajo regímenes ISO.',
      details: 'Consistencia de procesos y calidad',
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      color: 'hover:border-emerald-400/60 group-hover:bg-emerald-400/5',
      badge: '6 Certificados'
    },
    {
      id: 'experto',
      title: 'Solicita un Experto / Asesoría',
      desc: 'Atención personalizada con abogados fiscalistas y auditores para estructuración corporativa.',
      details: 'Canal directo de asesoría',
      icon: <Briefcase className="w-5 h-5 text-verta-coral" />,
      color: 'hover:border-verta-coral/60 group-hover:bg-verta-coral/5',
      badge: 'Soporte Directo'
    }
  ];

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center py-6 px-4 lg:px-8 space-y-12 select-none overflow-hidden text-white font-sans">
      
      {/* FULL RESPONSIVE INTEGRATED NODES BACKGROUND CANVAS */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-85">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Decorative center ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-verta-cyan/5 via-verta-cobalt/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* PORTADA DEL SISTEMA CON IMAGEN VERTA Y NODOS DE LUZ ANIMADOS */}
      <div className="w-full z-10">
        <VertaSystemCover />
      </div>

      {/* TOP VALUE PROPOSITION BADGE */}
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-verta-cyan/15 to-verta-cobalt/15 border border-verta-cyan/40 px-4 py-1.5 rounded-full text-xs font-mono text-verta-cyan z-10">
        <Sparkles className="w-3.5 h-3.5 text-verta-cyan" />
        <span className="font-semibold tracking-wider">VALIDACIÓN Y ESTRUCTURACIÓN DE INFORMACIÓN CORPORATIVA</span>
      </div>

      {/* MAIN LOGO & VALUE PROPOSITION SECTION */}
      <div className="max-w-4xl w-full text-center space-y-6 z-10 relative">
        
        {/* BIG RESPONSIVE GLOWING LOGO */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-36 h-36 flex items-center justify-center animate-spin-slow">
            {/* Pulsing ring lines */}
            <div className="absolute inset-0 border border-verta-cyan/20 rounded-full animate-ping opacity-25" />
            <div className="absolute -inset-2 border border-verta-coral/10 rounded-full animate-ping opacity-15 duration-1000" />
            
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Left Wing */}
              <path
                d="M15 15 L45 50 L15 85 L35 85 L65 50 L35 15 Z"
                fill="url(#big-blue-gradient)"
                className="drop-shadow-[0_4px_15px_rgba(30,58,138,0.7)]"
              />
              {/* Right Wing */}
              <path
                d="M40 15 L70 50 L40 85 L60 85 L90 50 L60 15 Z"
                fill="url(#big-cyan-gradient)"
                className="drop-shadow-[0_4px_15px_rgba(6,182,212,0.7)] animate-pulse"
              />
              {/* Coral Peak Accent */}
              <path
                d="M32 45 L50 65 L40 85 L28 85 L42 62 Z"
                fill="url(#big-coral-gradient)"
                opacity="0.95"
              />
              <defs>
                <linearGradient id="big-blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="big-cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <linearGradient id="big-coral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl lg:text-7xl font-black tracking-[0.25em] text-white leading-none font-display">
              VER<span className="text-verta-coral font-extrabold relative">TA<span className="absolute -bottom-1 left-0 w-full h-1 bg-verta-coral" /></span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-medium text-verta-cyan max-w-3xl mx-auto leading-snug">
              Validación y estructuración de información para generar confianza y respaldar decisiones de contratación
            </p>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto font-sans leading-relaxed">
              Transformamos la dispersión documental y fiscal en expedientes estructurados, auditados y verificados para que empresas y proveedores formalicen relaciones comerciales seguras y con certeza total.
            </p>
          </div>
        </div>

        {/* DEMO CONTEXT INDICATORS */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-2 text-[11px] font-mono text-gray-400 border-y border-verta-slate-blue/30 max-w-xl mx-auto">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-verta-emerald inline-block" />
            <span>Proveedor Demo: <strong className="text-white">{providerName}</strong></span>
          </span>
          <span className="text-gray-600">|</span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-verta-cyan inline-block animate-pulse" />
            <span>Contratante: <strong className="text-white">{clientName}</strong></span>
          </span>
        </div>
      </div>

      {/* TRES VÍAS DE ENTRADA DESDE EL INICIO */}
      <section className="max-w-6xl w-full z-10 space-y-4">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-verta-cyan font-bold block">
            Rutas de Acceso Inmediato
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-white">
            Tres vías de entrada para comenzar
          </h2>
          <p className="text-xs text-gray-400 max-w-xl mx-auto">
            Selecciona la vía adecuada según tus objetivos de contratación o validación corporativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* VÍA 1: Buscar un proveedor validado */}
          <div className="verta-glass border border-verta-cyan/40 hover:border-verta-cyan p-6 rounded-2xl flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(6,182,212,0.18)] bg-verta-dark-blue/70 group relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-verta-navy border border-verta-cyan/50 flex items-center justify-center text-verta-cyan group-hover:scale-105 transition-transform">
                  <Search className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-verta-cyan bg-verta-cyan/10 border border-verta-cyan/30 px-2.5 py-1 rounded-full font-semibold">
                  Para Contratantes
                </span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white group-hover:text-verta-cyan transition-colors">
                  Buscar un proveedor validado
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Explora empresas con situación fiscal, legal y técnica previamente estructurada y verificada para contratar con total certeza y sin riesgos.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-verta-slate-blue/30">
              <button
                onClick={() => {
                  const el = document.getElementById('directorio-pull-home');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveTab('pull');
                  }
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-verta-cyan to-verta-cobalt hover:from-verta-cyan/95 hover:to-verta-cobalt/95 text-white font-mono font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-lg group/btn cursor-pointer transition-all"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Buscar en VERTA</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-gray-400 text-center font-mono">
                10 proveedores auditados y vigentes hoy
              </p>
            </div>
          </div>

          {/* VÍA 2: Invitar a un proveedor */}
          <div className="verta-glass border border-indigo-500/40 hover:border-indigo-400 p-6 rounded-2xl flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(99,102,241,0.18)] bg-verta-dark-blue/70 group relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-verta-navy border border-indigo-500/50 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                  <UserPlus className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 rounded-full font-semibold">
                  Para Empresas
                </span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  Invitar a un proveedor
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  ¿Vas a contratar a un nuevo proveedor? Solicítale estructurar su expediente normativo antes de formalizar contrato o procesar pagos.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-verta-slate-blue/30">
              <button
                onClick={() => setShowInviteModal(true)}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-verta-cobalt hover:from-indigo-500 hover:to-verta-cobalt text-white font-mono font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-lg group/btn cursor-pointer transition-all"
              >
                <UserPlus className="w-4 h-4 text-indigo-200" />
                <span>Invitar a un proveedor</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-indigo-300/90 text-center font-mono">
                Crea tu cuenta e invita a tu primer proveedor sin costo
              </p>
            </div>
          </div>

          {/* VÍA 3: Iniciar una validación voluntaria */}
          <div className="verta-glass border border-verta-coral/40 hover:border-verta-coral p-6 rounded-2xl flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(249,115,22,0.18)] bg-verta-dark-blue/70 group relative overflow-hidden">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-verta-navy border border-verta-coral/50 flex items-center justify-center text-verta-coral group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-verta-coral bg-verta-coral/10 border border-verta-coral/30 px-2.5 py-1 rounded-full font-semibold">
                  Para Proveedores
                </span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white group-hover:text-verta-coral transition-colors">
                  Iniciar una validación voluntaria
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Estructura y acredita tu información legal, fiscal y técnica para certificar tu solvencia ante clientes y calificar para nuevas contrataciones.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-verta-slate-blue/30">
              <button
                onClick={() => {
                  setValidateModalTab('start');
                  setShowValidateModal(true);
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-verta-coral to-rose-600 hover:from-verta-coral/95 hover:to-rose-600/95 text-white font-mono font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-lg group/btn cursor-pointer transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Validar mi empresa</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center justify-center pt-0.5">
                <button
                  onClick={() => {
                    setValidateModalTab('accept');
                    setShowValidateModal(true);
                  }}
                  className="text-[10px] font-mono text-gray-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer text-center"
                >
                  ¿Recibiste código? Acepta tu invitación
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LLAMADAS A LA ACCIÓN SEGMENTADAS POR ROL */}
      <section className="max-w-6xl w-full z-10">
        <div className="bg-gradient-to-r from-verta-dark-blue/90 via-verta-navy/90 to-verta-dark-blue/90 border border-verta-slate-blue/50 rounded-2xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-verta-slate-blue/40 pb-3 mb-5 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-verta-cyan font-bold block">
                Acceso Segmentado por Perfil
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Llamadas a la acción segmentadas por rol
              </h3>
            </div>
            <span className="inline-flex items-center space-x-1.5 text-xs text-gray-400 font-mono">
              <CheckCircle2 className="w-4 h-4 text-verta-emerald" />
              <span>Cero costos para invitar a tu primer proveedor</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rol Empresas */}
            <div className="bg-verta-navy/60 border border-verta-slate-blue/40 p-5 rounded-xl space-y-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-verta-cyan" />
                  <h4 className="font-bold text-sm text-white font-display">Para Empresas & Contratantes</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Elimina contingencias con el SAT e IMSS asegurando que tus contratistas cumplan con cada requerimiento antes de pagar facturas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="flex-1 px-4 py-2.5 bg-verta-cyan text-verta-navy font-mono font-bold text-xs rounded-lg hover:bg-verta-cyan/90 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <UserPlus className="w-3.5 h-3.5 text-verta-navy" />
                  <span>Invita a un proveedor</span>
                </button>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="flex-1 px-3 py-2.5 bg-verta-slate-blue/30 hover:bg-verta-slate-blue/50 border border-verta-cyan/30 text-verta-cyan font-mono text-[11px] font-semibold rounded-lg transition-all text-center cursor-pointer"
                >
                  Crea tu cuenta e invita a tu primer proveedor sin costo
                </button>
              </div>
            </div>

            {/* Rol Proveedores */}
            <div className="bg-verta-navy/60 border border-verta-slate-blue/40 p-5 rounded-xl space-y-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-verta-coral" />
                  <h4 className="font-bold text-sm text-white font-display">Para Proveedores de Servicios</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Demuestra tu formalidad y mantén tu expediente estructurado y validado listo para licitaciones, contratos o pagos inmediatos.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    setValidateModalTab('accept');
                    setShowValidateModal(true);
                  }}
                  className="flex-1 px-4 py-2.5 bg-verta-coral text-white font-mono font-bold text-xs rounded-lg hover:bg-verta-coral/90 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <Key className="w-3.5 h-3.5 text-white" />
                  <span>Acepta tu invitación</span>
                </button>
                <button
                  onClick={() => {
                    setValidateModalTab('start');
                    setShowValidateModal(true);
                  }}
                  className="flex-1 px-3 py-2.5 bg-verta-slate-blue/30 hover:bg-verta-slate-blue/50 border border-verta-coral/30 text-verta-coral font-mono text-[11px] font-semibold rounded-lg transition-all text-center cursor-pointer"
                >
                  Inicia tu validación
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ULTRA-MODERN BENTO NAVIGATION GRID */}
      <section className="max-w-6xl w-full space-y-6 z-10">
        <div className="text-center md:text-left space-y-1.5 border-b border-verta-slate-blue/30 pb-3">
          <h2 className="text-lg font-bold font-display text-white flex items-center justify-center md:justify-start space-x-2">
            <Layers className="w-5 h-5 text-verta-cyan" />
            <span>Módulos Incorporados en el Ecosistema VERTA</span>
          </h2>
          <p className="text-xs text-gray-400">Seleccione un módulo interactivo para navegar directamente a su panel de gestión administrativa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {welcomeButtons.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              onMouseEnter={() => setActiveItemHovered(item.id)}
              onMouseLeave={() => setActiveItemHovered(null)}
              className={`p-5 rounded-2xl verta-glass border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-5 relative group overflow-hidden ${
                activeItemHovered === item.id 
                  ? 'border-verta-cyan shadow-[0_8px_30px_rgba(6,182,212,0.15)] bg-verta-dark-blue/80 translate-y-[-4px]'
                  : 'bg-verta-navy/50 border-verta-slate-blue/50 hover:border-verta-slate-blue/90 hover:bg-verta-navy/80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-verta-navy border border-verta-slate-blue/70 flex items-center justify-center transition-all ${
                    activeItemHovered === item.id ? 'bg-verta-cyan/10 border-verta-cyan scale-110' : ''
                  }`}>
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-mono text-gray-400 bg-verta-slate-blue/35 border border-verta-slate-blue/60 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-white group-hover:text-verta-cyan transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="border-t border-verta-slate-blue/20 pt-3 flex items-center justify-between text-[10px] font-mono text-gray-400">
                <span className="text-gray-500 font-medium truncate max-w-[180px]">{item.details}</span>
                <span className="text-verta-cyan font-bold inline-flex items-center group-hover:text-verta-coral transition-colors">
                  <span>Acceder</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              {/* Accent subtle bottom border glowing */}
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all bg-gradient-to-r from-transparent via-verta-cyan to-transparent opacity-0 group-hover:opacity-100 duration-500`} />
            </div>
          ))}
        </div>
      </section>

      {/* DIRECTORIO PULL DE PROVEEDORES DEBAJO DE LOS MÓDULOS */}
      <section id="directorio-pull-home" className="max-w-6xl w-full pt-8 border-t border-verta-slate-blue/40 space-y-6 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-verta-slate-blue/30 pb-3">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-verta-cyan/15 to-verta-cobalt/15 border border-verta-cyan/40 px-3 py-1 rounded-full text-xs font-mono text-verta-cyan font-bold tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-verta-cyan" />
              <span>CATÁLOGO PÚBLICO "PULL" DE PROVEEDORES</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-display">
              Directorio Pull de Proveedores Acreditados
            </h2>
            <p className="text-xs text-gray-400">
              Consulte y filtre los expedientes verificados, puntaje de cumplimiento y documentos aprobados de las 10 empresas.
            </p>
          </div>
        </div>

        <PullDirectory />
      </section>

      {/* QUICK SYSTEM METRICS DOCK (GLASSY) */}
      <div className="max-w-4xl w-full bg-verta-dark-blue/40 border border-verta-slate-blue/40 p-4 rounded-2xl flex flex-wrap items-center justify-around gap-4 text-center z-10 backdrop-blur-md">
        <div className="px-3">
          <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-wider">Cumplimiento Fiscal</span>
          <span className="text-sm font-black text-white font-mono flex items-center justify-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-verta-emerald inline-block mr-1" />
            <span>SAT ACTIVO (100%)</span>
          </span>
        </div>
        <div className="hidden sm:block text-gray-700 font-mono">/</div>
        <div className="px-3">
          <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-wider">Encriptación de Expedientes</span>
          <span className="text-sm font-black text-white font-mono">AES-256 MILITAR</span>
        </div>
        <div className="hidden sm:block text-gray-700 font-mono">/</div>
        <div className="px-3">
          <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-wider">Estructuración de Datos</span>
          <span className="text-sm font-black text-verta-cyan font-mono">VALIDACIÓN DIGITAL ESTRUCTURADA</span>
        </div>
        <div className="hidden sm:block text-gray-700 font-mono">/</div>
        <div className="px-3">
          <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-wider">Respaldo Jurídico</span>
          <span className="text-sm font-black text-verta-coral font-mono">AUDITORES Y ASESORES VERTA</span>
        </div>
      </div>

      {/* MODAL 1: INVITAR A UN PROVEEDOR */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl verta-glass border border-verta-cyan/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-verta-slate-blue/40 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-indigo-300 font-semibold">
                  <UserPlus className="w-3 h-3" />
                  <span>EMPRESAS & CONTRATANTES</span>
                </div>
                <h3 className="text-xl font-extrabold text-white font-display">
                  Invitar a un proveedor
                </h3>
                <p className="text-xs text-indigo-200/90 font-mono">
                  Crea tu cuenta e invita a tu primer proveedor sin costo
                </p>
              </div>
              <button
                onClick={() => {
                  setShowInviteModal(false);
                  setInvitationCode(null);
                }}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-verta-slate-blue/40 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!invitationCode ? (
              <form onSubmit={handleSendInvitation} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">
                      Empresa Contratante Solicitante
                    </label>
                    <input
                      type="text"
                      disabled
                      value={clientName}
                      className="w-full bg-verta-navy/50 border border-verta-slate-blue/50 rounded-xl px-3.5 py-2 text-xs text-gray-300 cursor-not-allowed font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1">
                        Nombre o Razón Social del Proveedor *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Logística Continental S.A."
                        value={inviteProviderName}
                        onChange={(e) => setInviteProviderName(e.target.value)}
                        className="w-full bg-verta-navy border border-verta-slate-blue hover:border-verta-cyan/50 focus:border-verta-cyan focus:outline-none rounded-xl px-3.5 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1">
                        Correo de Contacto del Proveedor *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="contacto@proveedor.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="w-full bg-verta-navy border border-verta-slate-blue hover:border-verta-cyan/50 focus:border-verta-cyan focus:outline-none rounded-xl px-3.5 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">
                        RFC del Proveedor (Opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="LCO180412ABC"
                        value={inviteRfc}
                        onChange={(e) => setInviteRfc(e.target.value.toUpperCase())}
                        className="w-full bg-verta-navy border border-verta-slate-blue hover:border-verta-cyan/50 focus:border-verta-cyan focus:outline-none rounded-xl px-3.5 py-2 text-xs text-white uppercase font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1">
                        Giro / Tipo de Contratación
                      </label>
                      <select
                        value={inviteServiceType}
                        onChange={(e) => setInviteServiceType(e.target.value)}
                        className="w-full bg-verta-navy border border-verta-slate-blue hover:border-verta-cyan/50 focus:border-verta-cyan focus:outline-none rounded-xl px-3.5 py-2 text-xs text-white"
                      >
                        <option value="Servicios Especializados / REPSE">Servicios Especializados / REPSE</option>
                        <option value="Mantenimiento & Construcción">Mantenimiento & Construcción</option>
                        <option value="Tecnología e Infraestructura">Tecnología e Infraestructura</option>
                        <option value="Suministros Corporativos">Suministros Corporativos</option>
                        <option value="Transporte & Logística">Transporte & Logística</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-2">
                      Documentos y validaciones requeridas:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Opinión SAT 32-D Positiva',
                        'Constancia de Situación Fiscal (RFC)',
                        'Acta Constitutiva y Poderes Notariales',
                        'Opinión de Cumplimiento IMSS',
                        'Carátula de Estado de Cuenta Bancario',
                        'Registro REPSE Federal'
                      ].map((item) => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => toggleRequirement(item)}
                          className={`text-left p-2.5 rounded-lg border text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer ${
                            selectedRequirements.includes(item)
                              ? 'bg-verta-cyan/15 border-verta-cyan text-white font-semibold'
                              : 'bg-verta-navy/40 border-verta-slate-blue/50 text-gray-400 hover:text-white'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                            selectedRequirements.includes(item) ? 'bg-verta-cyan border-verta-cyan text-verta-navy' : 'border-gray-500'
                          }`}>
                            {selectedRequirements.includes(item) && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                          <span className="truncate">{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-verta-slate-blue/30 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2.5 text-xs text-gray-400 hover:text-white font-mono cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-verta-cyan to-indigo-600 hover:from-verta-cyan/95 hover:to-indigo-500 text-white font-mono font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Invitación Sin Costo</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-5 text-center py-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-verta-emerald/20 border border-verta-emerald/40 flex items-center justify-center mx-auto text-verta-emerald">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">¡Invitación Emitida con Éxito!</h4>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">
                    Se ha generado la invitación formal para <strong className="text-white">{inviteProviderName}</strong>. Podrá acceder sin costo para estructurar su expediente.
                  </p>
                </div>

                <div className="bg-verta-navy border border-verta-slate-blue/70 p-3 rounded-xl flex items-center justify-between max-w-md mx-auto">
                  <span className="text-xs font-mono text-verta-cyan truncate mr-2">
                    https://verta.io/invitacion/{invitationCode.toLowerCase()}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 bg-verta-cyan text-verta-navy font-mono font-bold text-xs rounded-lg flex items-center space-x-1 shrink-0 cursor-pointer hover:bg-verta-cyan/90 transition-all"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Enlace</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-3 pt-2">
                  <button
                    onClick={() => {
                      setInvitationCode(null);
                      setInviteProviderName('');
                      setInviteEmail('');
                      setInviteRfc('');
                    }}
                    className="px-4 py-2 text-xs font-mono text-gray-300 hover:text-white bg-verta-slate-blue/30 border border-verta-slate-blue rounded-lg transition-all cursor-pointer"
                  >
                    Invitar a otro proveedor
                  </button>
                  <button
                    onClick={() => {
                      setShowInviteModal(false);
                      setInvitationCode(null);
                    }}
                    className="px-5 py-2 text-xs font-mono font-bold text-white bg-verta-cobalt hover:bg-verta-cobalt/80 rounded-lg transition-all cursor-pointer"
                  >
                    Finalizar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: VALIDACIÓN VOLUNTARIA / ACEPTAR INVITACIÓN (PROVEEDORES) */}
      {showValidateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl verta-glass border border-verta-coral/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header & Tabs */}
            <div className="flex items-start justify-between border-b border-verta-slate-blue/40 pb-4">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 bg-verta-coral/10 border border-verta-coral/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-verta-coral font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>PARA PROVEEDORES DE SERVICIOS</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setValidateModalTab('start')}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                      validateModalTab === 'start'
                        ? 'bg-verta-coral text-white shadow-md'
                        : 'text-gray-400 hover:text-white bg-verta-slate-blue/30'
                    }`}
                  >
                    Inicia tu validación
                  </button>
                  <button
                    onClick={() => setValidateModalTab('accept')}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                      validateModalTab === 'accept'
                        ? 'bg-verta-coral text-white shadow-md'
                        : 'text-gray-400 hover:text-white bg-verta-slate-blue/30'
                    }`}
                  >
                    Acepta tu invitación
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowValidateModal(false);
                  setValidationSuccessMessage(null);
                }}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-verta-slate-blue/40 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {validationSuccessMessage ? (
              <div className="text-center py-6 space-y-3 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-verta-emerald/20 border border-verta-emerald/40 flex items-center justify-center mx-auto text-verta-emerald">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">{validationSuccessMessage}</h4>
                <p className="text-xs text-gray-300 font-mono">Abriendo entorno de estructuración y carga documental...</p>
              </div>
            ) : validateModalTab === 'start' ? (
              /* Sub-tab 1: Inicia tu validación voluntaria */
              <form onSubmit={handleStartValidationSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Validar mi empresa</h4>
                  <p className="text-xs text-gray-400">
                    Acredita tu solvencia y formalidad ante clientes actuales y futuros estructurando tu expediente corporativo.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1">
                      Nombre Comercial o Razón Social *
                    </label>
                    <input
                      type="text"
                      required
                      value={valCompanyName}
                      onChange={(e) => setValCompanyName(e.target.value)}
                      placeholder="Ej. Soluciones Tecnológicas Alfa S.A. de C.V."
                      className="w-full bg-verta-navy border border-verta-slate-blue hover:border-verta-coral/50 focus:border-verta-coral focus:outline-none rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1">
                        RFC de la Empresa *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="STA180412XYZ"
                        value={valRfc}
                        onChange={(e) => setValRfc(e.target.value.toUpperCase())}
                        className="w-full bg-verta-navy border border-verta-slate-blue hover:border-verta-coral/50 focus:border-verta-coral focus:outline-none rounded-xl px-3.5 py-2 text-xs text-white uppercase font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1">
                        Sector Principal
                      </label>
                      <select
                        value={valSector}
                        onChange={(e) => setValSector(e.target.value)}
                        className="w-full bg-verta-navy border border-verta-slate-blue hover:border-verta-coral/50 focus:border-verta-coral focus:outline-none rounded-xl px-3.5 py-2 text-xs text-white"
                      >
                        <option value="Tecnología & Consultoría">Tecnología & Consultoría</option>
                        <option value="Construcción & Obras Civiles">Construcción & Obras Civiles</option>
                        <option value="Logística & Cadenas de Suministro">Logística & Cadenas de Suministro</option>
                        <option value="Servicios de Seguridad Privada">Servicios de Seguridad Privada</option>
                        <option value="Mantenimiento Industrial">Mantenimiento Industrial</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-verta-navy/50 border border-verta-slate-blue/50 p-3.5 rounded-xl space-y-1">
                    <span className="text-[11px] font-mono text-verta-coral font-bold flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Validación estructurada en 3 pasos:</span>
                    </span>
                    <p className="text-[11px] text-gray-400">
                      1. Carga de constancia RFC y opinión SAT 32-D &bull; 2. Cotejo de representatividad legal &bull; 3. Emisión de dictamen para contratantes.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-verta-slate-blue/30 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowValidateModal(false)}
                    className="px-4 py-2 text-xs text-gray-400 hover:text-white font-mono cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-verta-coral to-rose-600 hover:from-verta-coral/95 hover:to-rose-600 text-white font-mono font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Comenzar Validación de mi Empresa</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Sub-tab 2: Acepta tu invitación */
              <form onSubmit={handleAcceptInvitationSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Acepta tu invitación</h4>
                  <p className="text-xs text-gray-400">
                    Ingresa el código o identificador que tu cliente o contratante te envió para vincular tu expediente directamente a su proceso de contratación.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1">
                      Código de Invitación Recibido *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. VRT-4821"
                      value={valInviteCode}
                      onChange={(e) => setValInviteCode(e.target.value.toUpperCase())}
                      className="w-full bg-verta-navy border border-verta-coral/60 focus:border-verta-coral focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-white uppercase font-mono tracking-wider font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1">
                      Correo Institucional del Proveedor *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="representante@tuempresa.com"
                      className="w-full bg-verta-navy border border-verta-slate-blue hover:border-verta-coral/50 focus:border-verta-coral focus:outline-none rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-verta-slate-blue/30 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowValidateModal(false)}
                    className="px-4 py-2 text-xs text-gray-400 hover:text-white font-mono cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-verta-coral hover:bg-verta-coral/90 text-white font-mono font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <Key className="w-4 h-4" />
                    <span>Aceptar Invitación y Abrir Expediente</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
