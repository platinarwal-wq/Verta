/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  Zap, 
  Eye, 
  EyeOff, 
  Layers,
  Activity
} from 'lucide-react';

interface LightNode {
  id: number;
  // Normalized coordinates (0 to 1) relative to image
  nx: number;
  ny: number;
  label?: string;
  color: 'cyan' | 'blue' | 'coral' | 'white';
  baseRadius: number;
  phase: number;
  speed: number;
  intensity: number;
}

interface Connection {
  from: number;
  to: number;
  color: string;
}

export function VertaSystemCover() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fullCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation & effect controls
  const [nodesEnabled, setNodesEnabled] = useState(true);
  const [connectionsEnabled, setConnectionsEnabled] = useState(true);
  const [scanBeamEnabled, setScanBeamEnabled] = useState(true);
  const [intensityMode, setIntensityMode] = useState<'normal' | 'high' | 'ultra'>('high');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; r: number; alpha: number }[]>([]);

  // Strategic positions of nodes matching the geometric structure of the VERTA image
  const nodesConfig: LightNode[] = [
    // Center & Apex
    { id: 1, nx: 0.50, ny: 0.48, label: 'NODO CENTRAL', color: 'cyan', baseRadius: 6, phase: 0, speed: 1.8, intensity: 1.2 },
    { id: 2, nx: 0.50, ny: 0.30, label: 'VÉRTICE ALTO', color: 'coral', baseRadius: 5, phase: 1.2, speed: 2.2, intensity: 1.1 },
    { id: 3, nx: 0.50, ny: 0.68, label: 'BASE NÚCLEO', color: 'blue', baseRadius: 5.5, phase: 2.4, speed: 1.6, intensity: 1.0 },

    // Left Wing (Cobalt / Deep Blue)
    { id: 4, nx: 0.38, ny: 0.36, label: 'FLUX AZUL 1', color: 'blue', baseRadius: 4.5, phase: 0.8, speed: 1.9, intensity: 1.0 },
    { id: 5, nx: 0.28, ny: 0.44, label: 'ALA OESTE 1', color: 'cyan', baseRadius: 5, phase: 1.6, speed: 2.1, intensity: 1.1 },
    { id: 6, nx: 0.20, ny: 0.54, label: 'ALA OESTE 2', color: 'blue', baseRadius: 4.5, phase: 2.9, speed: 1.7, intensity: 0.9 },
    { id: 7, nx: 0.32, ny: 0.60, label: 'CONEXIÓN OESTE', color: 'cyan', baseRadius: 4.8, phase: 3.5, speed: 2.0, intensity: 1.0 },
    { id: 8, nx: 0.42, ny: 0.62, label: 'CANAL RETORNO', color: 'blue', baseRadius: 4.2, phase: 4.1, speed: 1.8, intensity: 0.9 },

    // Right Wing (Electric Neon Cyan)
    { id: 9, nx: 0.62, ny: 0.36, label: 'FLUX CYAN 1', color: 'cyan', baseRadius: 5, phase: 0.5, speed: 2.4, intensity: 1.2 },
    { id: 10, nx: 0.72, ny: 0.44, label: 'ALA ESTE 1', color: 'cyan', baseRadius: 5.5, phase: 1.4, speed: 2.2, intensity: 1.3 },
    { id: 11, nx: 0.80, ny: 0.54, label: 'ALA ESTE 2', color: 'coral', baseRadius: 4.5, phase: 2.2, speed: 1.9, intensity: 1.0 },
    { id: 12, nx: 0.68, ny: 0.60, label: 'CONEXIÓN ESTE', color: 'cyan', baseRadius: 4.8, phase: 3.1, speed: 2.3, intensity: 1.1 },
    { id: 13, nx: 0.58, ny: 0.62, label: 'DISTRIBUIDOR', color: 'blue', baseRadius: 4.2, phase: 3.8, speed: 1.7, intensity: 0.9 },

    // Peripheral Satellites
    { id: 14, nx: 0.14, ny: 0.32, label: 'SENSOR RED 1', color: 'cyan', baseRadius: 3.5, phase: 4.4, speed: 2.5, intensity: 0.8 },
    { id: 15, nx: 0.86, ny: 0.32, label: 'SENSOR RED 2', color: 'cyan', baseRadius: 3.5, phase: 5.0, speed: 2.5, intensity: 0.8 },
    { id: 16, nx: 0.50, ny: 0.82, label: 'BALIZA FISCAL', color: 'coral', baseRadius: 5, phase: 1.0, speed: 2.0, intensity: 1.2 },
    { id: 17, nx: 0.22, ny: 0.72, label: 'SUB-ESTACIÓN 1', color: 'blue', baseRadius: 3.8, phase: 2.8, speed: 1.5, intensity: 0.9 },
    { id: 18, nx: 0.78, ny: 0.72, label: 'SUB-ESTACIÓN 2', color: 'cyan', baseRadius: 3.8, phase: 3.6, speed: 1.8, intensity: 0.9 },
  ];

  // Interconnected lines between nodes
  const connections: Connection[] = [
    { from: 1, to: 2, color: 'rgba(6, 182, 212, 0.6)' },
    { from: 1, to: 3, color: 'rgba(37, 99, 235, 0.6)' },
    { from: 1, to: 4, color: 'rgba(37, 99, 235, 0.7)' },
    { from: 1, to: 9, color: 'rgba(6, 182, 212, 0.8)' },
    { from: 4, to: 5, color: 'rgba(6, 182, 212, 0.5)' },
    { from: 5, to: 6, color: 'rgba(37, 99, 235, 0.5)' },
    { from: 6, to: 7, color: 'rgba(6, 182, 212, 0.5)' },
    { from: 7, to: 8, color: 'rgba(37, 99, 235, 0.6)' },
    { from: 8, to: 3, color: 'rgba(6, 182, 212, 0.5)' },
    { from: 9, to: 10, color: 'rgba(6, 182, 212, 0.7)' },
    { from: 10, to: 11, color: 'rgba(249, 115, 22, 0.6)' },
    { from: 11, to: 12, color: 'rgba(6, 182, 212, 0.6)' },
    { from: 12, to: 13, color: 'rgba(37, 99, 235, 0.6)' },
    { from: 13, to: 3, color: 'rgba(6, 182, 212, 0.6)' },
    { from: 5, to: 14, color: 'rgba(6, 182, 212, 0.4)' },
    { from: 10, to: 15, color: 'rgba(6, 182, 212, 0.4)' },
    { from: 3, to: 16, color: 'rgba(249, 115, 22, 0.7)' },
    { from: 7, to: 17, color: 'rgba(37, 99, 235, 0.4)' },
    { from: 12, to: 18, color: 'rgba(6, 182, 212, 0.4)' },
  ];

  // Canvas animation loop
  useEffect(() => {
    const canvas = isFullScreen ? fullCanvasRef.current : canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let scanLineProgress = 0;
    let time = 0;

    // Energy packet pulses traveling across connections
    const packets = connections.map((conn, idx) => ({
      connIndex: idx,
      progress: (idx * 0.15) % 1,
      speed: 0.006 + (idx % 3) * 0.003
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.02;
      scanLineProgress = (scanLineProgress + 0.004) % 1.2;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const multiplier = intensityMode === 'ultra' ? 1.6 : intensityMode === 'high' ? 1.2 : 0.8;

      // 1. Draw connecting lines between nodes
      if (connectionsEnabled && nodesEnabled) {
        connections.forEach((conn) => {
          const fromNode = nodesConfig.find(n => n.id === conn.from);
          const toNode = nodesConfig.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return;

          const x1 = fromNode.nx * width;
          const y1 = fromNode.ny * height;
          const x2 = toNode.nx * width;
          const y2 = toNode.ny * height;

          // Base line
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = conn.color;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Subtle glowing halo around line
          if (intensityMode !== 'normal') {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = conn.color.replace(/[\d\.]+\)$/, '0.15)');
            ctx.lineWidth = 4;
            ctx.stroke();
          }
        });

        // 2. Animate energy packets along lines
        packets.forEach(packet => {
          packet.progress = (packet.progress + packet.speed) % 1;
          const conn = connections[packet.connIndex];
          const fromNode = nodesConfig.find(n => n.id === conn.from);
          const toNode = nodesConfig.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return;

          const x1 = fromNode.nx * width;
          const y1 = fromNode.ny * height;
          const x2 = toNode.nx * width;
          const y2 = toNode.ny * height;

          const px = x1 + (x2 - x1) * packet.progress;
          const py = y1 + (y2 - y1) * packet.progress;

          ctx.save();
          ctx.shadowBlur = 12 * multiplier;
          ctx.shadowColor = '#06b6d4';
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(px, py, 2.2 * multiplier, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // 3. Scan laser beam effect
      if (scanBeamEnabled) {
        const beamX = scanLineProgress * width;
        const grad = ctx.createLinearGradient(beamX - 30, 0, beamX + 30, 0);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        grad.addColorStop(0.5, `rgba(6, 182, 212, ${0.35 * multiplier})`);
        grad.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(beamX - 30, 0, 60, height);

        // Sharp leading line
        ctx.beginPath();
        ctx.moveTo(beamX, 0);
        ctx.lineTo(beamX, height);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * multiplier})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 4. Draw interactive ripples from user clicks
      if (ripples.length > 0) {
        setRipples(prev => 
          prev
            .map(r => ({ ...r, r: r.r + 3, alpha: r.alpha - 0.02 }))
            .filter(r => r.alpha > 0)
        );

        ripples.forEach(rip => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6, 182, 212, ${rip.alpha * multiplier})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        });
      }

      // 5. Draw mouse spotlight if active
      if (mousePos) {
        const mouseGrad = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 140);
        mouseGrad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
        mouseGrad.addColorStop(0.5, 'rgba(37, 99, 235, 0.08)');
        mouseGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGrad;
        ctx.fillRect(mousePos.x - 140, mousePos.y - 140, 280, 280);
      }

      // 6. Draw the illuminated nodes
      if (nodesEnabled) {
        nodesConfig.forEach((node) => {
          const x = node.nx * width;
          const y = node.ny * height;

          // Pulse equation with sine wave
          const pulse = Math.sin(time * node.speed + node.phase);
          const currentRadius = (node.baseRadius + pulse * 1.5) * multiplier;
          const glowSize = (14 + pulse * 8) * multiplier;

          // Check proximity to mouse for interactive excitation
          let proximityBoost = 1;
          if (mousePos) {
            const dx = mousePos.x - x;
            const dy = mousePos.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              proximityBoost = 1 + (1 - dist / 120) * 1.2;
            }
          }

          // Colors
          let colorCore = '#ffffff';
          let colorHalo = 'rgba(6, 182, 212, 0.8)';
          let colorOuter = 'rgba(6, 182, 212, 0.2)';

          if (node.color === 'coral') {
            colorHalo = 'rgba(249, 115, 22, 0.9)';
            colorOuter = 'rgba(249, 115, 22, 0.25)';
          } else if (node.color === 'blue') {
            colorHalo = 'rgba(37, 99, 235, 0.9)';
            colorOuter = 'rgba(37, 99, 235, 0.25)';
          }

          ctx.save();

          // Outer Expanding Corona Ring
          ctx.beginPath();
          ctx.arc(x, y, glowSize * 1.6 * proximityBoost, 0, Math.PI * 2);
          ctx.strokeStyle = colorOuter;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Radial Glow Gradient
          const radGrad = ctx.createRadialGradient(x, y, 0, x, y, glowSize * proximityBoost);
          radGrad.addColorStop(0, colorCore);
          radGrad.addColorStop(0.3, colorHalo);
          radGrad.addColorStop(1, 'transparent');

          ctx.fillStyle = radGrad;
          ctx.beginPath();
          ctx.arc(x, y, glowSize * proximityBoost, 0, Math.PI * 2);
          ctx.fill();

          // Bright Core Point
          ctx.beginPath();
          ctx.arc(x, y, currentRadius * 0.8 * proximityBoost, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 15 * multiplier * proximityBoost;
          ctx.shadowColor = node.color === 'coral' ? '#f97316' : '#06b6d4';
          ctx.fill();

          // Node Label
          if (node.label && intensityMode !== 'normal') {
            ctx.font = 'bold 8px monospace';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#000000';
            ctx.fillText(node.label, x + currentRadius + 5, y + 3);
          }

          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [nodesEnabled, connectionsEnabled, scanBeamEnabled, intensityMode, isFullScreen, mousePos, ripples]);

  // Mouse interaction handlers
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleCanvasMouseLeave = () => {
    setMousePos(null);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples(prev => [...prev.slice(-4), { x, y, r: 8, alpha: 0.9 }]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-4 px-2 sm:px-4">
      {/* CARD CONTAINER FOR SYSTEM COVER */}
      <div 
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden bg-verta-navy/90 border-2 border-verta-cyan/40 shadow-[0_8px_32px_rgba(6,182,212,0.18)] transition-all duration-300 group"
      >
        {/* TOP STATUS BAR OVER COVER */}
        <div className="bg-verta-navy/90 backdrop-blur-md px-4 py-2.5 border-b border-verta-slate-blue/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-verta-cyan animate-ping absolute" />
              <span className="w-2 h-2 rounded-full bg-verta-cyan relative" />
            </div>
            <span className="font-mono font-bold tracking-wider text-verta-cyan uppercase">
              PORTADA DEL SISTEMA VERTA
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-verta-slate-blue/60 text-gray-300 font-mono text-[10px]">
              NODOS ACTIVOS: {nodesConfig.length}
            </span>
          </div>

          {/* Quick Action: Fullscreen */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFullScreen(true)}
              className="p-1.5 bg-verta-slate-blue/40 hover:bg-verta-slate-blue/80 text-gray-300 hover:text-white rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 text-xs px-2.5"
              title="Pantalla Completa"
            >
              <Maximize2 className="w-3.5 h-3.5 text-verta-cyan" />
              <span className="hidden sm:inline">Pantalla Completa</span>
            </button>
          </div>
        </div>

        {/* IMAGE & ANIMATED LIGHT NODES STAGE */}
        <div 
          className="relative w-full aspect-video sm:aspect-[16/9] overflow-hidden bg-black cursor-crosshair select-none"
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={handleCanvasMouseLeave}
          onClick={handleCanvasClick}
        >
          {/* Main system cover image */}
          <img 
            src="/verta.jpg" 
            alt="Portada del Sistema VERTA" 
            className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />

          {/* Darkening ambient contrast overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-verta-navy/80 via-transparent to-verta-navy/40 pointer-events-none" />

          {/* Glowing illuminated nodes canvas */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Corner Cybernetic Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-verta-cyan/70 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-verta-cyan/70 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-verta-cyan/70 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-verta-cyan/70 pointer-events-none" />

          {/* Floating badge over image */}
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none bg-verta-navy/80 backdrop-blur-md border border-verta-cyan/30 px-3 py-1.5 rounded-xl flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-verta-cyan animate-pulse" />
            <span className="text-[11px] font-mono text-gray-200">
              Red Neuronal Fiscal & Mercantil // Nodos de Luz Sincronizados
            </span>
          </div>

          <div className="absolute bottom-4 right-4 z-10 pointer-events-none bg-verta-navy/80 backdrop-blur-md border border-verta-coral/30 px-3 py-1.5 rounded-xl hidden sm:flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-verta-coral" />
            <span className="text-[11px] font-mono text-verta-coral">
              Click sobre la portada para emitir pulso de luz
            </span>
          </div>
        </div>

        {/* BOTTOM INTERACTIVE CONTROLS BAR */}
        <div className="bg-verta-dark-blue/90 px-4 py-3 border-t border-verta-slate-blue/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
            {/* Toggle Nodes */}
            <button
              onClick={() => setNodesEnabled(!nodesEnabled)}
              className={`px-3 py-1.5 rounded-lg border font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
                nodesEnabled 
                  ? 'bg-verta-cyan/15 border-verta-cyan/50 text-verta-cyan' 
                  : 'bg-verta-slate-blue/30 border-verta-slate-blue/40 text-gray-400'
              }`}
            >
              {nodesEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Iluminación Nodos</span>
            </button>

            {/* Toggle Connections */}
            <button
              onClick={() => setConnectionsEnabled(!connectionsEnabled)}
              className={`px-3 py-1.5 rounded-lg border font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
                connectionsEnabled 
                  ? 'bg-verta-cyan/15 border-verta-cyan/50 text-verta-cyan' 
                  : 'bg-verta-slate-blue/30 border-verta-slate-blue/40 text-gray-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Haces de Luz</span>
            </button>

            {/* Toggle Scan Beam */}
            <button
              onClick={() => setScanBeamEnabled(!scanBeamEnabled)}
              className={`px-3 py-1.5 rounded-lg border font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
                scanBeamEnabled 
                  ? 'bg-verta-coral/15 border-verta-coral/50 text-verta-coral' 
                  : 'bg-verta-slate-blue/30 border-verta-slate-blue/40 text-gray-400'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Escaneo Láser</span>
            </button>
          </div>

          {/* Intensity Selector */}
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="text-gray-400 font-mono text-[11px] mr-1 hidden md:inline">Intensidad:</span>
            {(['normal', 'high', 'ultra'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setIntensityMode(mode)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono capitalize transition-all cursor-pointer ${
                  intensityMode === mode
                    ? 'bg-verta-cyan text-verta-navy font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'bg-verta-slate-blue/40 text-gray-400 hover:text-white'
                }`}
              >
                {mode === 'ultra' ? 'Ultra ✨' : mode === 'high' ? 'Alta' : 'Sutil'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FULL SCREEN THEATER MODAL */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          <div className="flex items-center justify-between text-white pb-3 border-b border-verta-slate-blue/40">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-verta-cyan animate-pulse" />
              <div>
                <h3 className="font-bold text-sm sm:text-base font-display tracking-wider">
                  VERTA — PORTADA ILUMINADA DEL SISTEMA
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  Visualización de Nodos de Luz y Canales de Enlace
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsFullScreen(false)}
              className="p-2 bg-verta-slate-blue/50 hover:bg-verta-slate-blue/90 rounded-xl text-white transition-all cursor-pointer"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          <div 
            className="relative flex-1 my-4 flex items-center justify-center overflow-hidden rounded-2xl border border-verta-cyan/30"
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={handleCanvasMouseLeave}
            onClick={handleCanvasClick}
          >
            <img 
              src="/verta.jpg" 
              alt="Portada del Sistema VERTA" 
              className="max-w-full max-h-full object-contain pointer-events-none rounded-xl"
              referrerPolicy="no-referrer"
            />
            <canvas 
              ref={fullCanvasRef} 
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
