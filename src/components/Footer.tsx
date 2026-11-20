/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-verta-navy border-t border-verta-slate-blue/40 px-4 lg:px-8 py-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left trademark text */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-xs text-gray-400">
            © {currentYear} <span className="font-bold text-white tracking-widest text-[11px] font-sans">VER<span className="text-verta-coral font-extrabold">TA</span></span>. Todos los derechos reservados.
          </p>
          <p className="text-[10px] text-gray-500 font-mono">
            Plataforma homologada de Verificación de Cumplimiento Mercantil y Fiscal.
          </p>
        </div>

        {/* Right legal and menu items */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400 font-mono font-medium">
          <a href="#terminos" className="hover:text-verta-cyan transition-colors">
            Términos de Servicio
          </a>
          <a href="#privacidad" className="hover:text-verta-cyan transition-colors">
            Política de Privacidad
          </a>
          <a href="#cookies" className="hover:text-verta-cyan transition-colors">
            Seguridad de Datos
          </a>
          <a href="#soporte" className="hover:text-verta-cyan transition-colors">
            Cumplimiento SAT v4.0
          </a>
        </div>
      </div>
    </footer>
  );
}
