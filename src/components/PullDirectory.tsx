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
  Building, 
  Mail, 
  Globe, 
  Sparkles, 
  UserCheck, 
  CheckCircle, 
  Info, 
  ExternalLink, 
  X, 
  FileText, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRightLeft, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Lock,
  Layers,
  FileCheck2
} from 'lucide-react';
import { VerifiedCompany, InformationAccessLevel, StandardValidationStatus } from '../types';
import { ENRICHED_COMPANIES, ACCESS_LEVEL_DEFINITIONS } from '../data/accessLevels';
import { AccessLevelBar } from './AccessLevelBar';
import { CompanyProfileModal } from './CompanyProfileModal';
import { CompanyComparatorModal } from './CompanyComparatorModal';
import { ValidationStatusBadge } from './ValidationStatusBadge';
import { ConcreteChecksList } from './ConcreteChecksList';
import { ValidationStatusContextModal } from './ValidationStatusContextModal';
import { METHODOLOGY_SUSPENSION_STATEMENT, STANDARDIZED_VALIDATION_STATUSES } from '../data/validationStatusContext';

interface PullDirectoryProps {
  onSelectCompany?: (company: VerifiedCompany) => void;
  onClose?: () => void;
  initialAccessLevel?: InformationAccessLevel;
  onNavigateToCompaniesPortal?: () => void;
}

export function PullDirectory({
  onSelectCompany,
  onClose,
  initialAccessLevel = 'visitante_publico',
  onNavigateToCompaniesPortal
}: PullDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<'status' | 'name'>('status');
  const [showMethodologyModal, setShowMethodologyModal] = useState(false);
  
  // 4 Information Access Levels State
  const [currentLevel, setCurrentLevel] = useState<InformationAccessLevel>(initialAccessLevel);
  
  // Selected company for detailed modal
  const [selectedCompany, setSelectedCompany] = useState<VerifiedCompany | null>(null);

  // Level 2+ Features: Saved profiles and comparison
  const [savedCompanyIds, setSavedCompanyIds] = useState<string[]>(['comp_1']);
  const [comparedCompanyIds, setComparedCompanyIds] = useState<string[]>([]);
  const [showComparatorModal, setShowComparatorModal] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const activeDef = ACCESS_LEVEL_DEFINITIONS[currentLevel];
  const canInteract = currentLevel !== 'visitante_publico';
  const canViewDetailedReport = currentLevel === 'empresa_autorizada' || currentLevel === 'verta';
  const isVerta = currentLevel === 'verta';

  // Toggle save profile
  const handleToggleSave = (companyId: string) => {
    if (!canInteract) {
      alert('La función de guardar perfiles requiere el nivel "Empresa Registrada". Por favor active ese nivel en la barra superior.');
      return;
    }
    setSavedCompanyIds((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId]
    );
  };

  // Toggle compare company
  const handleToggleCompare = (company: VerifiedCompany) => {
    if (!canInteract) {
      alert('La función de comparar proveedores requiere el nivel "Empresa Registrada". Por favor active ese nivel en la barra superior.');
      return;
    }
    setComparedCompanyIds((prev) => {
      if (prev.includes(company.id)) {
        return prev.filter((id) => id !== company.id);
      } else {
        if (prev.length >= 4) {
          alert('Puede comparar hasta 4 empresas simultáneamente.');
          return prev;
        }
        return [...prev, company.id];
      }
    });
  };

  const sectors = useMemo(() => {
    const set = new Set<string>();
    ENRICHED_COMPANIES.forEach((c) => set.add(c.sector));
    return ['Todos', ...Array.from(set)];
  }, []);

  const processedCompanies = useMemo(() => {
    let result = ENRICHED_COMPANIES.filter((c) => {
      const matchSearch = 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.rfc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchSector = selectedSector === 'Todos' || c.sector === selectedSector;
      const matchStatus = selectedStatus === 'Todos' || c.validationStatus === selectedStatus;
      const matchSaved = showSavedOnly ? savedCompanyIds.includes(c.id) : true;
      return matchSearch && matchSector && matchStatus && matchSaved;
    });

    if (sortBy === 'status') {
      const priorityOrder: Record<string, number> = {
        validado: 1,
        validado_con_observaciones: 2,
        actualizacion_requerida: 3,
        informacion_pendiente: 4,
        validacion_vencida: 5,
        no_cumple: 6
      };
      result.sort((a, b) => (priorityOrder[a.validationStatus] || 99) - (priorityOrder[b.validationStatus] || 99));
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchTerm, selectedSector, selectedStatus, sortBy, showSavedOnly, savedCompanyIds]);

  const comparedCompanies = useMemo(() => {
    return ENRICHED_COMPANIES.filter((c) => comparedCompanyIds.includes(c.id));
  }, [comparedCompanyIds]);

  const averageCompliance = useMemo(() => {
    const total = ENRICHED_COMPANIES.reduce((acc, c) => acc + c.complianceScore, 0);
    return (total / ENRICHED_COMPANIES.length).toFixed(1);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 4 NIVELES DE ACCESO - CONTROLADOR PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <AccessLevelBar
          currentLevel={currentLevel}
          onLevelChange={setCurrentLevel}
        />
      </div>

      {/* FILTER & SEARCH PANEL */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">

        {/* METHODOLOGICAL RIGOR & SCORE SUSPENSION NOTICE */}
        <div className="p-4 rounded-2xl bg-verta-navy/80 border border-verta-cyan/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-verta-cyan/15 text-verta-cyan shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white font-mono text-xs uppercase">
                  Metodología VERTA: Indicadores Objetivos de Estatus
                </span>
                <span className="px-2 py-0.2 rounded-full bg-verta-coral/20 text-verta-coral text-[10px] font-mono font-bold border border-verta-coral/30">
                  Score Numérico Suspendido
                </span>
              </div>
              <p className="text-gray-300 font-sans text-xs max-w-3xl leading-relaxed">
                Los puntajes abstractos se encuentran pospuestos hasta transparentar y auditar la metodología del Índice de Confianza VERTA. Se evalúa mediante 6 estados normativos con contexto y badges de evidencia comprobable.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowMethodologyModal(true)}
            className="px-4 py-2 bg-verta-cyan/15 hover:bg-verta-cyan/25 border border-verta-cyan/40 text-verta-cyan rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Guía de los 6 Estados & Riesgos</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por razón social, RFC, servicio o estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-verta-dark-blue/90 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 transition-all font-sans"
            />
          </div>

          {/* Sector filter */}
          <div className="md:col-span-2 flex items-center space-x-2">
            <Filter className="w-4 h-4 text-verta-cyan shrink-0" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full bg-verta-dark-blue/90 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan rounded-xl px-3 py-2.5 text-xs text-gray-300 font-medium focus:outline-none cursor-pointer"
            >
              {sectors.map((sector) => (
                <option key={sector} value={sector} className="bg-verta-navy text-white text-xs">
                  Sector: {sector}
                </option>
              ))}
            </select>
          </div>

          {/* Standardized Validation Status Filter */}
          <div className="md:col-span-3 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-verta-dark-blue/90 border border-verta-slate-blue/60 hover:border-verta-cyan/40 focus:border-verta-cyan rounded-xl px-3 py-2.5 text-xs text-gray-300 font-medium focus:outline-none cursor-pointer"
            >
              <option value="Todos" className="bg-verta-navy text-white text-xs">Todos los Estados</option>
              <option value="validado" className="bg-verta-navy text-emerald-400 text-xs">Validado</option>
              <option value="validado_con_observaciones" className="bg-verta-navy text-amber-400 text-xs">Validado con observaciones</option>
              <option value="informacion_pendiente" className="bg-verta-navy text-blue-400 text-xs">Información pendiente</option>
              <option value="actualizacion_requerida" className="bg-verta-navy text-cyan-400 text-xs">Actualización requerida</option>
              <option value="no_cumple" className="bg-verta-navy text-rose-400 text-xs">No cumple criterios obligatorios</option>
              <option value="validacion_vencida" className="bg-verta-navy text-gray-400 text-xs">Validación vencida</option>
            </select>
          </div>

          {/* Sorter */}
          <div className="md:col-span-3 flex items-center space-x-2">
            <button
              onClick={() => setSortBy(prev => prev === 'status' ? 'name' : 'status')}
              className="w-full bg-verta-dark-blue/90 hover:bg-verta-slate-blue/60 border border-verta-slate-blue/60 text-gray-300 rounded-xl px-3 py-2.5 text-xs font-semibold flex items-center justify-between transition-all cursor-pointer font-mono"
            >
              <span>{sortBy === 'status' ? 'Prioridad de Validación' : 'Nombre A-Z'}</span>
              <ArrowUpDown className="w-3 h-3 text-verta-cyan" />
            </button>
          </div>

        </div>

        {/* Level 2 Quick Toggles (Saved & Comparator) */}
        {canInteract && (
          <div className="flex items-center space-x-3 pt-1">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`py-2 px-3.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                showSavedOnly
                  ? 'bg-verta-emerald text-white shadow-md'
                  : 'bg-verta-navy/80 text-gray-300 border border-verta-slate-blue/60 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-blue-400" />
              <span>Guardados ({savedCompanyIds.length})</span>
            </button>

            {comparedCompanyIds.length > 0 && (
              <button
                onClick={() => setShowComparatorModal(true)}
                className="py-2 px-3.5 rounded-xl text-xs font-mono font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center space-x-1.5 transition-all cursor-pointer shadow-md"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Comparar Proveedores ({comparedCompanyIds.length})</span>
              </button>
            )}
          </div>
        )}

        {/* Informational counter & status bar */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-gray-400 border-t border-verta-slate-blue/30 pt-2 px-1">
          <div className="flex items-center space-x-2">
            <span>Mostrando: <strong className="text-white">{processedCompanies.length}</strong> de {ENRICHED_COMPANIES.length} proveedores</span>
            {selectedStatus !== 'Todos' && (
              <span className="text-verta-cyan font-bold">({STANDARDIZED_VALIDATION_STATUSES[selectedStatus as StandardValidationStatus]?.label})</span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-emerald-400 font-bold flex items-center space-x-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verificación con Evidencias Primarias (SAT / IMSS / RPC)</span>
            </span>
          </div>
        </div>
      </div>

      {/* DIRECTORY GRID ACCORDING TO ACTIVE ACCESS LEVEL */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {processedCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedCompanies.map((comp) => {
              const isSaved = savedCompanyIds.includes(comp.id);
              const isInComparator = comparedCompanyIds.includes(comp.id);

              return (
                <div 
                  key={comp.id}
                  className="verta-glass verta-glass-hover rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group border-b-2 border-b-verta-slate-blue/50"
                >
                  {/* Visual neon accent edge */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 transition-transform origin-top duration-300 ${
                    currentLevel === 'visitante_publico' ? 'bg-verta-cyan scale-y-0 group-hover:scale-y-100' :
                    currentLevel === 'empresa_registrada' ? 'bg-blue-500 scale-y-100' :
                    currentLevel === 'empresa_autorizada' ? 'bg-emerald-500 scale-y-100' :
                    'bg-verta-coral scale-y-100'
                  }`} />

                  <div className="space-y-4">
                    {/* Top Identity & RFC & Score */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl ${comp.logoColor} flex items-center justify-center font-bold text-sm tracking-tight shadow-md ring-2 ring-white/5`}>
                          {comp.logoLetters}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-verta-cyan block uppercase tracking-wider font-semibold">
                            {comp.sector}
                          </span>
                          <span className="text-[11px] font-mono text-gray-400 block">
                            {comp.rfc}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <ValidationStatusBadge
                          status={comp.validationStatus}
                          companyName={comp.name}
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Company Name & Description */}
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-base text-white tracking-tight leading-tight group-hover:text-verta-cyan transition-colors">
                        {comp.name}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                        {comp.description}
                      </p>
                    </div>

                    {/* Indicadores de estatus concretos */}
                    <div className="pt-2 border-t border-verta-slate-blue/30 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                        <span className="uppercase font-bold text-gray-300">Evidencias Específicas:</span>
                        <span className="text-emerald-400 font-bold">Verificadas</span>
                      </div>
                      <ConcreteChecksList checks={comp.concreteChecks} layout="chips" maxVisible={3} />
                    </div>

                    {/* Level 1: Datos Generales, Servicios, Cobertura, Estatus y Vigencia */}
                    <div className="space-y-2 pt-2 border-t border-verta-slate-blue/30 text-xs font-sans">
                      {/* Cobertura */}
                      <div className="flex items-start space-x-2 text-gray-300">
                        <MapPin className="w-3.5 h-3.5 text-verta-cyan shrink-0 mt-0.5" />
                        <span className="text-[11px] line-clamp-1">{comp.coverage}</span>
                      </div>

                      {/* Servicios destacados */}
                      <div className="flex items-start space-x-2 text-gray-300">
                        <Briefcase className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-gray-300 line-clamp-1">
                          {comp.services.slice(0, 2).join(' • ')}
                        </span>
                      </div>

                      {/* Estatus y Vigencia */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-1">
                        <span className="text-verta-emerald flex items-center space-x-1 font-bold">
                          <CheckCircle className="w-3 h-3 text-verta-emerald" />
                          <span>{comp.status}</span>
                        </span>
                        <span className="text-gray-400">Vigencia: {comp.validityDate.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Level 3 & 4 Indicators */}
                    {canViewDetailedReport && (
                      <div className="p-2 rounded-lg bg-verta-emerald/10 border border-verta-emerald/30 text-[10px] font-mono text-verta-emerald flex items-center justify-between">
                        <span>🔓 Reporte Detallado & Evidencias</span>
                        <span className="font-bold font-sans">Habilitado</span>
                      </div>
                    )}

                    {isVerta && (
                      <div className="p-2 rounded-lg bg-verta-coral/10 border border-verta-coral/30 text-[10px] font-mono text-verta-coral flex items-center justify-between">
                        <span>🛡️ Expediente Integral Reservado</span>
                        <span className="font-bold">Modo Auditor</span>
                      </div>
                    )}
                  </div>

                  {/* Actions according to Access Level */}
                  <div className="pt-4 mt-3 border-t border-verta-slate-blue/30 space-y-2">
                    
                    {/* Level 2 Quick Action Buttons: Guardar & Comparar */}
                    {canInteract && (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleToggleSave(comp.id)}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-mono font-bold flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                            isSaved
                              ? 'bg-verta-emerald/20 text-verta-emerald border border-verta-emerald/40'
                              : 'bg-verta-slate-blue/30 text-gray-300 hover:text-white border border-verta-slate-blue/50'
                          }`}
                        >
                          {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-verta-emerald" /> : <Bookmark className="w-3.5 h-3.5 text-blue-400" />}
                          <span>{isSaved ? 'Guardado' : 'Guardar'}</span>
                        </button>

                        <button
                          onClick={() => handleToggleCompare(comp)}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-mono font-bold flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                            isInComparator
                              ? 'bg-blue-600 text-white'
                              : 'bg-verta-slate-blue/30 text-gray-300 hover:text-white border border-verta-slate-blue/50'
                          }`}
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5 text-blue-400" />
                          <span>{isInComparator ? 'En Comparador' : 'Comparar'}</span>
                        </button>
                      </div>
                    )}

                    {/* Primary Button: View Profile / Dossier */}
                    <button 
                      onClick={() => setSelectedCompany(comp)}
                      className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md ${
                        currentLevel === 'visitante_publico' ? 'bg-verta-slate-blue/60 hover:bg-verta-slate-blue text-white border border-verta-slate-blue/80 hover:border-verta-cyan/40' :
                        currentLevel === 'empresa_registrada' ? 'bg-blue-600 hover:bg-blue-500 text-white' :
                        currentLevel === 'empresa_autorizada' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' :
                        'bg-verta-coral hover:bg-verta-coral/90 text-white'
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>
                        {currentLevel === 'visitante_publico' ? 'Consultar Ficha Pública' :
                         currentLevel === 'empresa_registrada' ? 'Ver Perfil Corporativo' :
                         currentLevel === 'empresa_autorizada' ? 'Ver Reporte & Evidencias' :
                         'Auditar Expediente VERTA'}
                      </span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="verta-glass border-dashed border-verta-slate-blue/60 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
            <Building className="w-12 h-12 text-verta-coral mx-auto animate-bounce" />
            <div>
              <p className="font-bold text-lg text-white">No se encontraron prestadores</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                No hay empresas autorizadas en nuestro registro que coincidan con la búsqueda "{searchTerm}".
              </p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSector('Todos');
                setShowSavedOnly(false);
              }}
              className="px-4 py-2 bg-verta-slate-blue text-white text-xs font-mono font-semibold rounded-lg hover:border-verta-cyan transition-all cursor-pointer"
            >
              Mostrar todas las empresas
            </button>
          </div>
        )}
      </div>

      {/* DETAILED 4-LEVEL COMPANY PROFILE MODAL */}
      {selectedCompany && (
        <CompanyProfileModal
          company={selectedCompany}
          currentLevel={currentLevel}
          onLevelChange={setCurrentLevel}
          onClose={() => setSelectedCompany(null)}
          isSaved={savedCompanyIds.includes(selectedCompany.id)}
          onToggleSave={handleToggleSave}
          isInComparator={comparedCompanyIds.includes(selectedCompany.id)}
          onToggleCompare={handleToggleCompare}
          onOpenComparator={() => {
            setSelectedCompany(null);
            setShowComparatorModal(true);
          }}
        />
      )}

      {/* COMPARATOR MODAL (Level 2+) */}
      {showComparatorModal && (
        <CompanyComparatorModal
          companies={comparedCompanies}
          currentLevel={currentLevel}
          onRemoveCompany={(id) => setComparedCompanyIds(prev => prev.filter(cId => cId !== id))}
          onClose={() => setShowComparatorModal(false)}
          onSelectCompany={(c) => setSelectedCompany(c)}
        />
      )}

      {/* METHODOLOGY & 6 STANDARDIZED VALIDATION STATES MODAL */}
      <ValidationStatusContextModal
        status="validado"
        isOpen={showMethodologyModal}
        onClose={() => setShowMethodologyModal(false)}
      />

    </div>
  );
}
