/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileText, CheckCircle2, AlertCircle, Clock, Upload, HelpCircle, FileCheck2, FileWarning, Eye } from 'lucide-react';
import { VerificationDocument } from '../types';

interface DocumentCardProps {
  key?: React.Key;
  doc: VerificationDocument;
  onUploadClick: (doc: VerificationDocument) => void;
}

export function DocumentCard({ doc, onUploadClick }: DocumentCardProps) {
  // Select appropriate icons per document type
  const getIcon = (id: string) => {
    switch (id) {
      case 'acta_constitutiva':
        return <FileCheck2 className="w-5 h-5 text-verta-cyan" />;
      case 'rfc':
        return <FileText className="w-5 h-5 text-verta-cyan" />;
      case 'sat_opinion':
        return <CheckCircle2 className="w-5 h-5 text-verta-emerald" />;
      case 'domicilio':
        return <FileWarning className="w-5 h-5 text-verta-coral" />;
      case 'id_oficial':
        return <FileText className="w-5 h-5 text-verta-cyan" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  // Status mapping
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'validado':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-verta-emerald/10 border border-verta-emerald/30 text-verta-emerald rounded-full text-xs font-semibold">
            <span>Validado</span>
            <span className="font-sans">✔️</span>
          </span>
        );
      case 'pendiente':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-verta-cyan/15 border border-verta-cyan/30 text-verta-cyan rounded-full text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 animate-spin-slow text-verta-cyan" />
            <span>Revisión Pendiente</span>
          </span>
        );
      case 'corregir':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-verta-coral/10 border border-verta-coral/30 text-verta-coral rounded-full text-xs font-semibold">
            <span>Se necesita resubir</span>
            <span className="font-sans">⚠️</span>
          </span>
        );
      case 'no_entregado':
      default:
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-gray-500/10 border border-gray-500/30 text-gray-400 rounded-full text-xs font-semibold">
            <span>Pendiente de Carga</span>
          </span>
        );
    }
  };

  return (
    <div className="verta-glass verta-glass-hover rounded-2xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden group">
      {/* Decorative vertical cyan laser line on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-verta-cyan to-verta-cobalt scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300 pointer-events-none" />

      <div className="space-y-4">
        {/* Header line icon and status badge */}
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-verta-slate-blue/40 border border-verta-slate-blue/60 flex items-center justify-center">
            {getIcon(doc.id)}
          </div>
          <div>{getStatusBadge(doc.status)}</div>
        </div>

        {/* Title and descriptions */}
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <h4 className="font-bold text-base text-white tracking-tight">{doc.title}</h4>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              doc.requirement === 'Required' 
                ? 'bg-verta-rose/10 text-verta-rose border border-verta-rose/20' 
                : 'bg-gray-500/10 text-gray-400'
            }`}>
              {doc.requirement === 'Required' ? 'Obligatorio' : 'Opcional'}
            </span>
          </div>
          {/* Subtle description showing the legal requirement context */}
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
            {doc.description}
          </p>
        </div>

        {/* Display uploaded file status */}
        {doc.file ? (
          <div className="bg-verta-navy/50 border border-verta-slate-blue/30 p-2.5 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 truncate max-w-[180px]">
              <FileText className="w-4 h-4 text-verta-cyan flex-shrink-0" />
              <div className="truncate">
                <p className="font-medium text-gray-200 truncate">{doc.file.name}</p>
                <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{doc.file.size} • {doc.file.uploadedAt}</span>
              </div>
            </div>
            <span className="text-[10px] text-verta-emerald font-semibold font-mono flex items-center space-x-0.5">
              <span>Cargado</span>
            </span>
          </div>
        ) : (
          <div className="bg-verta-navy/20 border border-dashed border-verta-slate-blue/40 p-3 rounded-xl text-center text-xs text-gray-400">
            Sin archivo adjunto
          </div>
        )}

        {/* Individual Comments/Rejection explanation list */}
        {doc.comments.length > 0 && (
          <div className="border-t border-verta-slate-blue/30 pt-3 mt-2">
            <p className="text-[10px] font-mono font-bold text-verta-coral uppercase tracking-wider mb-1">Notas del Evaluador:</p>
            <div className="space-y-1">
              {doc.comments.map((comment, index) => (
                <div key={index} className="flex items-start space-x-1.5 text-xs text-gray-300 leading-relaxed">
                  <span className="text-verta-coral select-none mt-0.5">•</span>
                  <p className="text-[11px] font-medium italic">{comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Button with premium coral/orange-cyan gradient text style */}
      <div className="pt-5 mt-auto">
        <button
          onClick={() => onUploadClick(doc)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center space-x-2 font-mono hover:scale-[1.01] hover:shadow-[0_4px_12px_rgba(249,115,22,0.15)] cursor-pointer ${
            doc.file 
              ? 'verta-cyan-btn' 
              : 'verta-coral-btn'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>{doc.file ? 'Reemplazar Documento' : 'Subir Documento'}</span>
        </button>
      </div>
    </div>
  );
}
