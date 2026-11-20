/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import { VerificationDocument, UploadedFile } from '../types';

interface UploadModalProps {
  document: VerificationDocument | null;
  onClose: () => void;
  onUploadSuccess: (docId: string, file: UploadedFile) => void;
  onFastCheck: (docId: string, action: 'approve' | 'reject', comment?: string) => void;
}

export function UploadModal({ document, onClose, onUploadSuccess, onFastCheck }: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mockPreviewText, setMockPreviewText] = useState('');
  const [tempFileUploaded, setTempFileUploaded] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!document) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    // Generate a simple text-based mock preview for files (e.g. Constancia de situación fiscal)
    setMockPreviewText(`-- COMPLIANCE PREVIEW --\nDOCUMENTO: ${document.title}\nID EMISION: VERTA-MOCK-${Math.floor(Math.random() * 100000)}\nFECHA DE REPOSITORIO: 2026-05-24\nEMISOR OFICIAL: DEPARTAMENTO DE ARCHIVO FEDERAL\nTAMAÑO DEL ARCHIVO: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
  };

  const selectRandomFile = () => {
    // Allows easy selection of a simulated mock document
    const mockFileNames: Record<string, string> = {
      'acta_constitutiva': 'Acta_Constitutiva_Alfa_Soluciones_2026.pdf',
      'rfc': 'Constancia_Situacion_Fiscal_SAT_Alfa_2026.pdf',
      'sat_opinion': 'SAT_Opinion_Cumplimiento_Positiva.pdf',
      'domicilio': 'Comprobante_Domicilio_CFE_Abril2026.pdf',
      'id_oficial': 'Identificacion_Vigente_Representante_Legal.pdf'
    };
    const mockName = mockFileNames[document.id] || `${document.title.replace(/\s+/g, '_')}_Formalizado.pdf`;
    const mockSizes = ['1.2 MB', '850 KB', '2.1 MB', '1.6 MB', '3.4 MB'];
    const mockSize = mockSizes[Math.floor(Math.random() * mockSizes.length)];

    const simulatedUploaded: UploadedFile = {
      name: mockName,
      size: mockSize,
      uploadedAt: new Date().toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setTempFileUploaded(simulatedUploaded);
    setMockPreviewText(`-- SIMULACION DE DOCUMENTO OFICIAL EN REGLA --\nPROPIEDAD DE: SOLUCIONES DE MUESTRA S.A. DE C.V.\nEMISOR: AUTORIDADES FISCALES SAT DE MÉXICO\nTÍTULO: ${document.title}\nMÉTODO VALIDADO: VERTA BIOMETRICS CHECK`);
  };

  const handleUploadSubmit = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        
        // Finalize upload
        const resolvedFile: UploadedFile = tempFileUploaded || {
          name: selectedFile?.name || `${document.title.replace(/\s+/g, '_')}_Verta.pdf`,
          size: selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : '1.4 MB',
          uploadedAt: new Date().toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        onUploadSuccess(document.id, resolvedFile);
        setIsUploading(false);
        setSelectedFile(null);
        setTempFileUploaded(null);
        
        // Simular validación automática por un aprobador de VERTA después de unos segundos
        triggerDemoReviewer(document.id);
      }
    }, 150);
  };

  const triggerDemoReviewer = (docId: string) => {
    // Provide automated background check simulator to surprise and delight the user
    setTimeout(() => {
      onFastCheck(
        docId, 
        'approve', 
        `Validado exitosamente. Los logotipos institucionales y las firmas digitales de ${document.title} coinciden completamente con el registro mercantil.`
      );
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl verta-glass border border-verta-cyan/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-verta-slate-blue/40 bg-verta-dark-blue/80">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-verta-cyan/15 flex items-center justify-center">
              <Upload className="w-4.5 h-4.5 text-verta-cyan" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white font-sans">{document.title}</h3>
              <p className="text-xs text-gray-400 font-mono">Requisito: {document.requirement}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-verta-slate-blue/40 rounded-lg transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Instructions banner */}
          <div className="bg-verta-slate-blue/15 border border-verta-slate-blue/40 p-3.5 rounded-xl text-xs text-gray-300 space-y-1">
            <span className="font-semibold text-verta-cyan font-mono block">Instrucciones de Documentación</span>
            <p className="leading-relaxed">{document.description}</p>
          </div>

          {!selectedFile && !tempFileUploaded && !isUploading ? (
            /* Upload dropzone area */
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                dragActive 
                  ? 'border-verta-cyan bg-verta-cyan/10 ring-4 ring-verta-cyan/15' 
                  : 'border-verta-slate-blue/60 bg-verta-navy/50 hover:border-verta-cyan/60 hover:bg-verta-dark-blue/40'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileInput} 
                className="hidden" 
                accept=".pdf,.png,.jpg,.jpeg"
              />
              <div className="w-14 h-14 rounded-full bg-verta-dark-blue border border-verta-slate-blue/60 flex items-center justify-center text-gray-400">
                <Upload className="w-7 h-7 text-verta-cyan animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-gray-200">Arrastre y suelte su archivo aquí</p>
                <p className="text-xs text-gray-400 mt-1">O haga clic para navegar por sus archivos locales</p>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2 text-[10px] font-mono text-gray-500">
                <span className="bg-verta-slate-blue/20 px-2 py-0.5 rounded border border-verta-slate-blue/40">PDF recomendado</span>
                <span className="bg-verta-slate-blue/20 px-2 py-0.5 rounded border border-verta-slate-blue/40">Máximo 10MB</span>
                <span className="bg-verta-slate-blue/20 px-2 py-0.5 rounded border border-verta-slate-blue/40">Certificado digital</span>
              </div>

              {/* Simulation Quick Trigger Bar */}
              <div className="mt-4 pt-4 border-t border-verta-slate-blue/30 w-full">
                <p className="text-xs text-gray-400 font-mono mb-2">¿Sin archivos legales reales al alcance?</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectRandomFile();
                  }}
                  className="px-4 py-2 bg-verta-slate-blue/50 hover:bg-verta-slate-blue hover:text-white text-verta-cyan font-mono border border-verta-cyan/30 rounded-xl text-xs transition-all flex items-center space-x-2 mx-auto cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Simular Carga de Documento Oficial</span>
                </button>
              </div>
            </div>
          ) : isUploading ? (
            /* Upload Progress state */
            <div className="space-y-4 py-8 text-center">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-verta-slate-blue/30" />
                <div className="absolute inset-0 rounded-full border-4 border-verta-cyan border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-white text-sm">
                  {uploadProgress}%
                </div>
              </div>
              <div>
                <p className="font-bold text-white">Transfiriendo archivo con tecnología VERTA S-Pipe...</p>
                <p className="text-xs text-gray-400 font-mono mt-1">Encriptación simétrica AES-256 completada</p>
              </div>
              <div className="w-full max-w-xs mx-auto bg-verta-navy rounded-full h-1 p-0.5 overflow-hidden">
                <div className="bg-verta-cyan h-full rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          ) : (
            /* Document Preview & Confirmation state */
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-verta-navy/80 p-4 rounded-xl border border-verta-cyan/20">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-verta-cyan" />
                  <div>
                    <p className="font-semibold text-white truncate max-w-[280px]">
                      {tempFileUploaded ? tempFileUploaded.name : selectedFile?.name}
                    </p>
                    <p className="text-xs text-gray-400 font-mono">
                      {tempFileUploaded ? tempFileUploaded.size : `${((selectedFile?.size || 0) / 1024 / 1024).toFixed(2)} MB`} • Encriptado
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setTempFileUploaded(null);
                  }}
                  className="px-3 py-1.5 bg-verta-rose/10 hover:bg-verta-rose/20 text-verta-rose rounded-lg text-xs transition-all cursor-pointer font-bold font-mono"
                >
                  Cambiar
                </button>
              </div>

              {/* Mock PDF text preview */}
              <div className="bg-verta-navy border border-verta-slate-blue/40 rounded-xl p-4 font-mono text-[11px] text-gray-400 space-y-1 block max-h-[140px] overflow-y-auto whitespace-pre-line leading-relaxed scrollbar">
                {mockPreviewText}
              </div>

              {/* Warnings and alerts */}
              <div className="bg-verta-coral/10 border border-verta-coral/30 p-3 rounded-lg flex items-start space-x-2 text-xs text-verta-coral">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Simulación didáctica:</strong> Enviar este archivo simulará una revisión de la plataforma SaaS VERTA. Un visualizador de compliance revisará automáticamente el documento en ~4 segundos posteriores al envío.
                </p>
              </div>
            </div>
          )}

          {/* Quick Sandbox Controls for Review demo */}
          <div className="pt-4 border-t border-verta-slate-blue/30">
            <h4 className="text-xs font-bold font-mono tracking-wider text-gray-400 uppercase mb-3">CONSOLA DE SANDBOX: VALIDAR EN TIEMPO REAL</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  onFastCheck(
                    document.id, 
                    'approve', 
                    `Sello del SAT verificado. Cumple perfectamente con los requerimientos corporativos del cliente.`
                  );
                  onClose();
                }}
                className="py-2.5 px-3 bg-verta-emerald/10 hover:bg-verta-emerald/20 text-verta-emerald border border-verta-emerald/40 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Validación Directa (Aprovar)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onFastCheck(
                    document.id, 
                    'reject', 
                    'Error: El documento correspondiente es del ciclo fiscal anterior. Se necesita resubir la versión vigente firmada.'
                  );
                  onClose();
                }}
                className="py-2.5 px-3 bg-verta-rose/10 hover:bg-verta-rose/20 text-verta-rose border border-verta-rose/40 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Rechazo Expreso (Por Corregir)</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 bg-verta-navy/90 border-t border-verta-slate-blue/40 flex justify-end space-x-3 items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-transparent text-gray-400 hover:text-white rounded-xl text-sm transition-all font-mono cursor-pointer"
          >
            Regresar
          </button>
          
          {(selectedFile || tempFileUploaded) && !isUploading && (
            <button
              onClick={handleUploadSubmit}
              className="px-5 py-2 rounded-xl text-sm font-bold text-white verta-coral-btn font-mono cursor-pointer flex items-center space-x-2"
            >
              <span>Subir Documento</span>
              <Upload className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
