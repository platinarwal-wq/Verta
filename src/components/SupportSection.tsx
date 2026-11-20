/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, MessageSquare, Mail, BookOpen, Send, Check, Sparkles, Clock } from 'lucide-react';
import { ChatMessage } from '../types';

export function SupportSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'support',
      text: '¡Hola! Bienvenido al canal de soporte automatizado de VERTA. ¿Tiene alguna duda sobre el Acta Constitutiva, la Opinión del SAT o la vigencia de sus comprobantes corporativos?',
      timestamp: 'Ahora'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const promptText = inputText.toLowerCase();
    setInputText('');

    // Trigger typing simulation
    setIsTyping(true);

    setTimeout(() => {
      let replyText = 'Entendido. Para su seguridad, todos los archivos son analizados en contenedores aislados de VERTA. ¿Hay algún documento específico que requiera ayuda adicional?';

      if (promptText.includes('sat') || promptText.includes('opinión') || promptText.includes('cumplimiento')) {
        replyText = 'Para el trámite del SAT: Ingrese al Portal Tributario SAT con su e.firma, vaya a "Opinión del Cumplimiento" y descargue el PDF en formato positivo. Asegúrese de que la fecha del reporte coincida con el mes en curso para evitar su rechazo.';
      } else if (promptText.includes('rfc') || promptText.includes('fiscal') || promptText.includes('constancia')) {
        replyText = 'La Constancia de Situación Fiscal (RFC) debe incluir el régimen fiscal correspondiente y debe estar actualizada en los últimos 3 meses. Asegúrese de que la dirección corresponda exactamente con su comprobante de domicilio.';
      } else if (promptText.includes('tiempo') || promptText.includes('revisar') || promptText.includes('duración') || promptText.includes('cuanto')) {
        replyText = 'La validación estándar de VERTA toma de 1 a 4 horas hábiles una vez cargados todos los documentos de la Lista. En nuestra demo interactiva de arriba, la aprobación se simula de manera inmediata tras presionar "Subir Documento".';
      } else if (promptText.includes('comprobante') || promptText.includes('domicilio')) {
        replyText = 'El Comprobante de Domicilio Vigente (luz, agua o estado de cuenta) no debe tener una antigüedad mayor a 90 días naturales. Debe figurar a nombre de la persona moral o el representante legal habilitado.';
      } else if (promptText.includes('acta') || promptText.includes('constitutiva') || promptText.includes('notario')) {
        replyText = 'El Acta Constitutiva debe venir escaneada completa y legible (con hoja de registro público de comercio legible). Solo se requiere en formato PDF.';
      }

      const supportMsg: ChatMessage = {
        id: `s-${Date.now()}`,
        sender: 'support',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, supportMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const faqAccordion = [
    {
      q: '¿Qué vigencia debe tener mi Opinión de Cumplimiento?',
      a: 'Debe ser emitida en los últimos 30 días naturales. El sistema de VERTA detectará automáticamente la vigencia impresa en el código de barra oficial del SAT.'
    },
    {
      q: '¿Puedo subir imágenes de mis documentos en lugar de archivos PDF?',
      a: 'Sí, la plataforma procesa archivos JPG, PNG y PDF con un tamaño máximo de 10 MB. El PDF es altamente recomendado por su fidelidad OCR.'
    },
    {
      q: '¿Qué hago si mi empresa es de reciente creación?',
      a: 'Puede subir su Acta Constitutiva debidamente protocolizada junto con su acuse del Registro Federal de Contribuyentes para su revisión de inicio de operaciones.'
    }
  ];

  return (
    <section className="px-4 lg:px-8 py-8 lg:py-12 bg-gradient-to-t from-verta-navy via-verta-dark-blue/60 to-verta-navy border-t border-verta-slate-blue/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT COLUMN: CONTACT CHANNELS & FAQ */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-verta-coral">Asistencia de Operaciones</span>
            <h2 id="help-title" className="text-2xl font-bold text-white tracking-tight">
              ¿Necesita Ayuda con la Documentación?
            </h2>
            <p className="text-sm text-gray-400">
              Nuestro equipo de soporte técnico y analistas fiscales están listos para orientarle en su proceso de registro empresarial.
            </p>
          </div>

          {/* Contact Methods grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="verta-glass p-4 rounded-xl text-center space-y-2 hover:border-verta-cyan/40 transition-all">
              <BookOpen className="w-5 h-5 text-verta-cyan mx-auto" />
              <p className="font-bold text-sm text-white">Centro de Ayuda</p>
              <span className="text-[11px] text-gray-400 block">Guías de descarga</span>
            </div>
            
            <a 
              href="mailto:soporte@verta.com.mx"
              className="verta-glass p-4 rounded-xl text-center space-y-2 hover:border-verta-cyan/40 transition-all block cursor-pointer"
            >
              <Mail className="w-5 h-5 text-verta-coral mx-auto" />
              <p className="font-bold text-sm text-white">Correo de Contacto</p>
              <span className="text-[11px] text-gray-400 block">soporte@verta.com.mx</span>
            </a>

            <div className="verta-glass p-4 rounded-xl text-center space-y-2 hover:border-verta-cyan/40 transition-all">
              <Clock className="w-5 h-5 text-verta-emerald mx-auto animate-pulse" />
              <p className="font-bold text-sm text-white">Tiempo de Respuesta</p>
              <span className="text-[11px] text-gray-400 block">Inmediato via Chat</span>
            </div>
          </div>

          {/* FAQ Accordion list */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Preguntas Frecuentes</h4>
            <div className="space-y-2">
              {faqAccordion.map((faq, idx) => (
                <details key={idx} className="group verta-glass rounded-xl p-4 border border-verta-slate-blue/40 cursor-pointer">
                  <summary className="flex items-center justify-between text-xs sm:text-sm font-semibold text-white list-none">
                    <span>{faq.q}</span>
                    <span className="text-verta-cyan group-open:rotate-180 transition-transform duration-200">▼</span>
                  </summary>
                  <p className="text-xs text-gray-400 mt-2.5 leading-relaxed pl-1">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE SUPPORT CHATBOX */}
        <div className="verta-glass border border-verta-slate-blue/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[400px]">
          
          {/* Chat header */}
          <div className="bg-verta-dark-blue/80 px-4 py-3 border-b border-verta-slate-blue/40 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-3.5 h-3.5 bg-verta-emerald rounded-full animate-ping absolute" />
              <div className="w-3.5 h-3.5 bg-verta-emerald rounded-full relative" />
              <div>
                <span className="font-semibold text-xs text-white block">SOPORTE EN LÍNEA VERTA</span>
                <span className="text-[10px] text-gray-400 font-mono">Simulador de Asesor Fiscal</span>
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-verta-cyan" />
          </div>

          {/* Chat scroll content */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-verta-navy/45 scrollbar">
            {messages.map((m) => {
              const rootDir = m.sender === 'user' ? 'justify-end' : 'justify-start';
              const bgTheme = m.sender === 'user' ? 'bg-verta-cyan text-verta-navy font-medium' : 'bg-verta-slate-blue/60 text-gray-200 ';
              return (
                <div key={m.id} className={`flex ${rootDir} animate-fade-in`}>
                  <div className={`p-3 max-w-[85%] rounded-2xl text-xs space-y-1 block ${bgTheme} ${
                    m.sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none border border-verta-slate-blue/30'
                  }`}>
                    <p className="leading-relaxed">{m.text}</p>
                    <span className="text-[9px] text-right block opacity-60 font-mono">{m.timestamp}</span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start animate-pulse">
                <div className="p-2.5 bg-verta-slate-blue/40 text-gray-400 border border-verta-slate-blue/20 rounded-2xl rounded-tl-none text-[10px] font-mono flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-verta-cyan animate-bounce" />
                  <span>Soporte VERTA está escribiendo...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat message input form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-verta-slate-blue/40 bg-verta-dark-blue/60 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Pregunte: ¿Cómo obtengo mi opinión SAT?..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-verta-navy/80 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan focus:outline-none rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 transition-all font-sans"
            />
            <button
              type="submit"
              className="p-2 bg-verta-cyan text-verta-navy rounded-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center shrink-0"
            >
              <Send className="w-3.5 h-3.5 font-bold" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
