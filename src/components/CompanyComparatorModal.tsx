/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  X, 
  ArrowRightLeft, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Building2, 
  Lock,
  Download,
  Trash2,
  FileCheck2
} from 'lucide-react';
import { VerifiedCompany, InformationAccessLevel } from '../types';
import { ValidationStatusBadge } from './ValidationStatusBadge';
import { ConcreteChecksList } from './ConcreteChecksList';

interface CompanyComparatorModalProps {
  companies: VerifiedCompany[];
  currentLevel: InformationAccessLevel;
  onRemoveCompany: (id: string) => void;
  onClose: () => void;
  onSelectCompany: (company: VerifiedCompany) => void;
}

export function CompanyComparatorModal({
  companies,
  currentLevel,
  onRemoveCompany,
  onClose,
  onSelectCompany
}: CompanyComparatorModalProps) {
  const canViewDetailedScores = currentLevel === 'empresa_autorizada' || currentLevel === 'verta';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-5xl verta-glass border border-verta-slate-blue/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="px-6 py-4 bg-verta-dark-blue/90 border-b border-verta-slate-blue/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-blue-400 uppercase font-bold tracking-wider">
                HERRAMIENTA EXCLUSIVA PARA EMPRESAS
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans">
                Comparador Multicriterio de Proveedores ({companies.length})
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* COMPARISON BODY */}
        <div className="p-6 overflow-y-auto flex-1 scrollbar space-y-6">
          {companies.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ArrowRightLeft className="w-10 h-10 text-gray-500 mx-auto" />
              <p className="text-sm font-bold text-white">No hay proveedores en el comparador</p>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                Seleccione "Comparar Proveedor" en las tarjetas del directorio o en la ficha del proveedor para visualizarlos lado a lado.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-verta-slate-blue/40">
                    <th className="p-3 font-mono text-[11px] text-gray-400 w-44 bg-verta-navy/40">
                      Criterio de Evaluación
                    </th>
                    {companies.map((comp) => (
                      <th key={comp.id} className="p-3 min-w-[240px] bg-verta-navy/60 align-top">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded-lg ${comp.logoColor} flex items-center justify-center font-bold text-xs shrink-0`}>
                              {comp.logoLetters}
                            </div>
                            <div>
                              <h4 className="font-bold text-white font-sans text-xs leading-tight line-clamp-2">
                                {comp.name}
                              </h4>
                              <span className="text-[10px] font-mono text-gray-400">{comp.rfc}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => onRemoveCompany(comp.id)}
                            className="text-gray-500 hover:text-verta-rose p-1 cursor-pointer shrink-0"
                            title="Quitar del comparador"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-verta-slate-blue/30 text-xs">
                  {/* Validation Status */}
                  <tr>
                    <td className="p-3 font-mono font-bold text-gray-400 bg-verta-navy/20">
                      Estatus de Validación
                      <span className="block text-[10px] text-verta-cyan font-normal font-sans">
                        (Score suspendido)
                      </span>
                    </td>
                    {companies.map((c) => (
                      <td key={c.id} className="p-3">
                        <ValidationStatusBadge
                          status={c.validationStatus}
                          companyName={c.name}
                          size="sm"
                        />
                        <span className="text-[10px] text-gray-400 block font-normal font-sans mt-1">
                          {c.verifiedDocumentsCount} de {c.totalDocumentsCount} evidencias convalidas
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Concrete Verification Badges */}
                  <tr>
                    <td className="p-3 font-mono text-gray-400 bg-verta-navy/20">
                      Evidencias Concretas
                    </td>
                    {companies.map((c) => (
                      <td key={c.id} className="p-3">
                        <ConcreteChecksList checks={c.concreteChecks} layout="chips" maxVisible={3} />
                      </td>
                    ))}
                  </tr>

                  {/* Sector */}
                  <tr>
                    <td className="p-3 font-mono text-gray-400 bg-verta-navy/20">Sector / Giro</td>
                    {companies.map((c) => (
                      <td key={c.id} className="p-3 text-white font-sans font-semibold">
                        {c.sector}
                      </td>
                    ))}
                  </tr>

                  {/* Estatus y Vigencia */}
                  <tr>
                    <td className="p-3 font-mono text-gray-400 bg-verta-navy/20">Estatus & Vigencia</td>
                    {companies.map((c) => (
                      <td key={c.id} className="p-3 text-xs">
                        <span className="inline-flex items-center space-x-1 text-verta-emerald font-bold font-mono text-[11px]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{c.status}</span>
                        </span>
                        <span className="text-[10px] font-mono text-gray-400 block mt-0.5">
                          Hasta: {c.validityDate}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Cobertura Geográfica */}
                  <tr>
                    <td className="p-3 font-mono text-gray-400 bg-verta-navy/20">Cobertura Geográfica</td>
                    {companies.map((c) => (
                      <td key={c.id} className="p-3 text-gray-300 font-sans text-xs">
                        {c.coverage}
                      </td>
                    ))}
                  </tr>

                  {/* Escala laboral */}
                  <tr>
                    <td className="p-3 font-mono text-gray-400 bg-verta-navy/20">Plantilla Laboral</td>
                    {companies.map((c) => (
                      <td key={c.id} className="p-3 text-gray-300 font-mono text-xs">
                        {c.employees}
                      </td>
                    ))}
                  </tr>

                  {/* Servicios Principales */}
                  <tr>
                    <td className="p-3 font-mono text-gray-400 bg-verta-navy/20">Servicios Principales</td>
                    {companies.map((c) => (
                      <td key={c.id} className="p-3 text-xs text-gray-300">
                        <ul className="space-y-1">
                          {c.services.slice(0, 3).map((s, idx) => (
                            <li key={idx} className="flex items-start space-x-1.5">
                              <span className="text-verta-cyan">•</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Qualitative Dimensions (Nivel 3+ Check) */}
                  <tr>
                    <td className="p-3 font-mono text-gray-400 bg-verta-navy/20">
                      Dictamen por 5 Dimensiones
                      {!canViewDetailedScores && (
                        <span className="block text-[9px] text-verta-coral font-bold mt-1">
                          Requiere Empresa Autorizada
                        </span>
                      )}
                    </td>
                    {companies.map((c) => (
                      <td key={c.id} className="p-3">
                        {canViewDetailedScores ? (
                          <div className="space-y-1.5 font-mono text-[11px]">
                            <div className="flex justify-between items-center text-gray-300">
                              <span className="text-gray-400">Fiscal SAT:</span>
                              <span className="text-emerald-400 font-bold flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>32-D Positiva</span>
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-300">
                              <span className="text-gray-400">Legal RPC:</span>
                              <span className="text-emerald-400 font-bold flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>FME y Poderes</span>
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-300">
                              <span className="text-gray-400">Laboral IMSS:</span>
                              <span className="text-emerald-400 font-bold flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>REPSE Conforme</span>
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-300">
                              <span className="text-gray-400">Operativa:</span>
                              <span className="text-emerald-400 font-bold flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Domicilio & CLABE</span>
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-300">
                              <span className="text-gray-400">PLD / DOF:</span>
                              <span className="text-emerald-400 font-bold flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Cero 69-B</span>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-lg bg-verta-navy/80 border border-dashed border-verta-slate-blue/60 text-center space-y-1">
                            <Lock className="w-3.5 h-3.5 text-gray-500 mx-auto" />
                            <span className="text-[10px] text-gray-400 block font-mono">
                              Desglose reservado para nivel Empresa Autorizada
                            </span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="p-3 bg-verta-navy/20 font-mono text-gray-400">Acción Directa</td>
                    {companies.map((c) => (
                      <td key={c.id} className="p-3">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectCompany(c);
                          }}
                          className="w-full py-2 bg-verta-cyan text-verta-navy font-mono font-bold text-xs rounded-xl hover:bg-verta-cyan/90 transition-all cursor-pointer"
                        >
                          Ver Perfil Completo
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-3 bg-verta-navy/90 border-t border-verta-slate-blue/40 flex justify-between items-center text-xs">
          <span className="text-gray-400 font-mono text-[11px]">
            Los datos se sincronizan con las auditorías oficiales del sistema VERTA.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-verta-slate-blue/50 text-gray-300 hover:text-white rounded-xl font-mono text-xs cursor-pointer"
          >
            Cerrar Comparador
          </button>
        </div>
      </div>
    </div>
  );
}
