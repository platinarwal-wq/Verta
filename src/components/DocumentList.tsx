/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Filter, ShieldCheck, HelpCircle, RefreshCw, Layers, CheckSquare, RotateCcw } from 'lucide-react';
import { DocumentCard } from './DocumentCard';
import { VerificationDocument, DocumentStatus } from '../types';

interface DocumentListProps {
  documents: VerificationDocument[];
  onUploadClick: (doc: VerificationDocument) => void;
  onResetDemo: () => void;
}

type FilterType = 'todos' | 'validado' | 'pendiente' | 'corregir' | 'no_entregado';

export function DocumentList({ documents, onUploadClick, onResetDemo }: DocumentListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');

  // Filter count utility
  const getFilterCount = (filter: FilterType) => {
    if (filter === 'todos') return documents.length;
    return documents.filter(doc => doc.status === filter).length;
  };

  // Compute filtered documents based on search and filters
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            doc.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = activeFilter === 'todos' || doc.status === activeFilter;
      return matchesSearch && matchesStatus;
    });
  }, [documents, searchTerm, activeFilter]);

  const filterTabs: { id: FilterType; label: string; iconSymbol?: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'validado', label: 'Validados ✔️' },
    { id: 'pendiente', label: 'En Revisión' },
    { id: 'corregir', label: 'Por Corregir ⚠️' },
    { id: 'no_entregado', label: 'No Entregado' },
  ];

  return (
    <div className="space-y-6">
      {/* SECTION HEADER & CONTROL BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-verta-dark-blue/40 border-y border-verta-slate-blue/30 py-4 px-4 lg:px-8">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Lista de Verificación de Documentación Legal
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            Documentación de la Empresa Formal • {filteredDocuments.length} ítems mostrados
          </p>
        </div>

        {/* Action Controls for Demo reset */}
        <div className="flex items-center space-x-2 self-start md:self-auto">
          <button
            onClick={onResetDemo}
            className="px-3 py-1.5 bg-verta-slate-blue/40 hover:bg-verta-slate-blue text-xs text-gray-300 rounded-lg font-mono flex items-center space-x-1.5 border border-verta-slate-blue transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Demo</span>
          </button>
        </div>
      </div>

      {/* FILTER BAR & SEARCH (Based on image_0.png styling) */}
      <div className="px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Search input with ambient cyan rings */}
        <div className="lg:col-span-4 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por tipo de documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-verta-navy/80 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 transition-all shadow-inner"
          />
        </div>

        {/* Tab-styled filters */}
        <div className="lg:col-span-8 flex flex-wrap gap-1.5 items-center">
          {filterTabs.map((tab) => {
            const count = getFilterCount(tab.id);
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-verta-cyan text-verta-navy font-bold shadow-lg shadow-verta-cyan/25'
                    : 'bg-verta-dark-blue/80 text-gray-400 border border-verta-slate-blue/40 hover:text-white hover:border-verta-cyan/30'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
                  isSelected ? 'bg-verta-navy/20 text-verta-navy' : 'bg-verta-navy text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DOCUMENT CARD GRID */}
      <div className="px-4 lg:px-8">
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                onUploadClick={onUploadClick}
              />
            ))}
          </div>
        ) : (
          /* Empty Search or Filter state */
          <div className="verta-glass border border-dashed border-verta-slate-blue/60 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-verta-slate-blue/20 flex items-center justify-center mx-auto text-gray-400">
              <Layers className="w-6 h-6 text-verta-cyan" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-lg text-white">No se encontraron documentos</p>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                No hay resultados que coincidan con la búsqueda "{searchTerm}" o el filtro seleccionado.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('todos');
              }}
              className="px-4 py-2 bg-verta-slate-blue text-white text-xs font-mono font-semibold rounded-lg hover:bg-verta-cyan hover:text-verta-navy transition-all cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
