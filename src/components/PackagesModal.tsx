/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Building2,
  Megaphone,
  Settings,
  Layers,
  Info,
  Image as ImageIcon,
  Maximize2,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { PackageFeatureCategory, PackageId, PackageSelectionState } from '../types';
import {
  PACKAGES_DATA,
  PACKAGE_CATEGORY_META,
  PACKAGE_FEATURES,
  PACKAGES_GRAPHIC_SRC,
  getFeatureIdsForPackage,
  getRequiredPackageForServices,
  getPackageById,
} from '../data/packagesData';

interface PackagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSelection: PackageSelectionState;
  onConfirmSelection: (selection: PackageSelectionState, navigateToProviders?: boolean) => void;
}

const CATEGORY_ICONS: Record<PackageFeatureCategory, React.ReactNode> = {
  presencia: <Building2 className="w-4 h-4 text-verta-cyan shrink-0" />,
  promocion: <Megaphone className="w-4 h-4 text-sky-400 shrink-0" />,
  diagnostico: <Settings className="w-4 h-4 text-verta-coral shrink-0" />,
};

export function PackagesModal({
  isOpen,
  onClose,
  currentSelection,
  onConfirmSelection,
}: PackagesModalProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<PackageId>(currentSelection.packageId);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    currentSelection.selectedServiceIds.length > 0
      ? currentSelection.selectedServiceIds
      : getFeatureIdsForPackage(currentSelection.packageId)
  );
  const [activeView, setActiveView] = useState<'selector' | 'infografia'>('selector');
  const [showImageLightbox, setShowImageLightbox] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [customNote, setCustomNote] = useState(currentSelection.notes || '');

  // Sync local draft when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedPackageId(currentSelection.packageId);
      setSelectedServiceIds(
        currentSelection.selectedServiceIds.length > 0
          ? currentSelection.selectedServiceIds
          : getFeatureIdsForPackage(currentSelection.packageId)
      );
      setCustomNote(currentSelection.notes || '');
      setShowImageLightbox(false);
    }
  }, [isOpen, currentSelection]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showImageLightbox) {
          setShowImageLightbox(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showImageLightbox, onClose]);

  if (!isOpen) return null;

  const activePackage = getPackageById(selectedPackageId);
  const totalFeaturesCount = PACKAGE_FEATURES.length;

  const handleSelectPackage = (pkgId: PackageId) => {
    setSelectedPackageId(pkgId);
    setSelectedServiceIds(getFeatureIdsForPackage(pkgId));
  };

  const handleToggleService = (featureId: string) => {
    setSelectedServiceIds((prev) => {
      const exists = prev.includes(featureId);
      const next = exists ? prev.filter((id) => id !== featureId) : [...prev, featureId];
      // Ensure at least one service or sync recommended package tier
      if (next.length > 0) {
        const requiredPkg = getRequiredPackageForServices(next);
        setSelectedPackageId(requiredPkg);
      }
      return next;
    });
  };

  const handleResetToPackageDefaults = () => {
    setSelectedServiceIds(getFeatureIdsForPackage(selectedPackageId));
  };

  const handleConfirm = (goToProviders = false) => {
    const finalServices =
      selectedServiceIds.length > 0 ? selectedServiceIds : getFeatureIdsForPackage(selectedPackageId);
    const finalPackage =
      selectedServiceIds.length > 0
        ? getRequiredPackageForServices(finalServices)
        : selectedPackageId;

    onConfirmSelection(
      {
        packageId: finalPackage,
        selectedServiceIds: finalServices,
        notes: customNote.trim() || undefined,
        confirmedAt: new Date().toLocaleDateString('es-MX', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      },
      goToProviders
    );
    onClose();
  };

  const getPackageBorderStyles = (pkgId: PackageId, isSelected: boolean) => {
    if (pkgId === 'paquete_1') {
      return isSelected
        ? 'border-teal-400 bg-teal-500/12 shadow-[0_0_24px_rgba(45,212,191,0.16)]'
        : 'border-slate-700/70 bg-verta-navy/60 hover:border-teal-400/50';
    }
    if (pkgId === 'paquete_2') {
      return isSelected
        ? 'border-sky-400 bg-sky-500/12 shadow-[0_0_24px_rgba(56,189,248,0.18)]'
        : 'border-slate-700/70 bg-verta-navy/60 hover:border-sky-400/50';
    }
    return isSelected
      ? 'border-verta-coral bg-verta-coral/12 shadow-[0_0_24px_rgba(255,127,80,0.2)]'
      : 'border-slate-700/70 bg-verta-navy/60 hover:border-verta-coral/50';
  };

  const getPackageAccentText = (pkgId: PackageId) => {
    if (pkgId === 'paquete_1') return 'text-teal-300';
    if (pkgId === 'paquete_2') return 'text-sky-300';
    return 'text-verta-coral';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-verta-navy/88 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="packages-modal-title"
    >
      <div className="w-full max-w-6xl bg-[#070f23] border border-verta-cyan/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh]">
        {/* TOP HEADER */}
        <div className="px-5 sm:px-8 py-4 bg-verta-navy/95 border-b border-verta-slate-blue/50 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs text-verta-cyan font-mono">
              <span>VERTA</span>
              <span aria-hidden="true">·</span>
              <span>Propuesta funcional para desarrollo de membresías</span>
            </div>
            <h2
              id="packages-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-tight"
            >
              Comparativo de Paquetes y Selección de Servicios
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            {/* View Mode Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-verta-dark-blue border border-verta-slate-blue/60 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveView('selector')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeView === 'selector'
                    ? 'bg-verta-cyan text-verta-navy'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Comparativo y Selector</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView('infografia')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeView === 'infografia'
                    ? 'bg-verta-coral text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Imagen Comparativa</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-verta-slate-blue/50 transition-colors cursor-pointer"
              aria-label="Cerrar ventana de paquetes"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-8">
          {/* 1. THREE PACKAGE OVERVIEW CARDS */}
          <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  1. Elige tu nivel de membresía VERTA
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Selecciona un paquete para precargar sus alcances o personaliza servicios puntuales en la tabla comparativa.
                </p>
              </div>
              <span className="text-xs font-mono text-gray-400 tabular-nums">
                3 niveles progresivos · Selección activa: <strong className="text-white">{activePackage.name}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {PACKAGES_DATA.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                const includedCount = getFeatureIdsForPackage(pkg.id).length;

                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => handleSelectPackage(pkg.id)}
                    className={`text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verta-cyan ${getPackageBorderStyles(
                      pkg.id,
                      isSelected
                    )}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-mono font-bold ${getPackageAccentText(pkg.id)}`}>
                          {pkg.tierLabel} · {pkg.subtitle}
                        </span>
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? pkg.id === 'paquete_1'
                                ? 'bg-teal-400 border-teal-400 text-verta-navy'
                                : pkg.id === 'paquete_2'
                                  ? 'bg-sky-400 border-sky-400 text-verta-navy'
                                  : 'bg-verta-coral border-verta-coral text-white'
                              : 'border-slate-500 text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg font-extrabold text-white font-display">{pkg.name}</h4>
                      </div>

                      <p className="text-xs sm:text-[13px] text-gray-200 leading-relaxed font-sans">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-gray-400 tabular-nums">
                        {includedCount} de {totalFeaturesCount} beneficios
                      </span>
                      <span className={`font-bold ${isSelected ? getPackageAccentText(pkg.id) : 'text-gray-300'}`}>
                        {isSelected ? 'Seleccionado' : 'Seleccionar paquete'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. MAIN CONTENT: INTERACTIVE MATRIX OR FULL INFOGRAPHIC + SERVICE PICKER */}
          {activeView === 'selector' ? (
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* LEFT / MAIN: INTERACTIVE COMPARATIVE MATRIX */}
              <div className="xl:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display">
                      2. Matriz interactiva de servicios por paquete
                    </h3>
                    <p className="text-xs text-gray-400">
                      Haz clic en cada servicio para activarlo o desactivarlo; el sistema ajusta automáticamente el paquete correspondiente.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetToPackageDefaults}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-gray-300 hover:text-white bg-verta-navy border border-verta-slate-blue/50 hover:border-verta-cyan/40 transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar del paquete</span>
                  </button>
                </div>

                {/* MATRIX TABLE */}
                <div className="rounded-2xl border border-verta-slate-blue/60 bg-[#08132c] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[620px]">
                      <thead>
                        <tr className="border-b border-verta-slate-blue/50 bg-[#0a1836]">
                          <th className="py-4 px-4 text-xs sm:text-sm font-bold text-white font-display w-[46%]">
                            <div className="flex items-center gap-2">
                              <Layers className="w-4 h-4 text-verta-cyan shrink-0" />
                              <span>Funcionalidad / Beneficio</span>
                            </div>
                          </th>

                          {PACKAGES_DATA.map((pkg) => {
                            const isColSelected = selectedPackageId === pkg.id;
                            const headerBg =
                              pkg.id === 'paquete_1'
                                ? isColSelected
                                  ? 'bg-teal-500/20 text-teal-200 border-b-2 border-teal-400'
                                  : 'bg-teal-950/25 text-gray-200 hover:bg-teal-500/10'
                                : pkg.id === 'paquete_2'
                                  ? isColSelected
                                    ? 'bg-sky-500/20 text-sky-200 border-b-2 border-sky-400'
                                    : 'bg-sky-950/25 text-gray-200 hover:bg-sky-500/10'
                                  : isColSelected
                                    ? 'bg-verta-coral/20 text-orange-200 border-b-2 border-verta-coral'
                                    : 'bg-orange-950/25 text-gray-200 hover:bg-verta-coral/10';

                            return (
                              <th
                                key={pkg.id}
                                className={`py-3 px-2 text-center border-l border-verta-slate-blue/40 transition-colors ${headerBg}`}
                              >
                                <button
                                  type="button"
                                  onClick={() => handleSelectPackage(pkg.id)}
                                  className="w-full flex flex-col items-center gap-0.5 cursor-pointer py-0.5"
                                >
                                  <span className={`text-[11px] font-mono font-semibold ${getPackageAccentText(pkg.id)}`}>
                                    {pkg.tierLabel}
                                  </span>
                                  <span className="text-xs sm:text-sm font-extrabold text-white font-display whitespace-nowrap">
                                    {pkg.code}
                                  </span>
                                </button>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>

                      <tbody>
                        {PACKAGE_CATEGORY_META.map((cat) => {
                          const catFeatures = PACKAGE_FEATURES.filter((f) => f.category === cat.id);
                          return (
                            <React.Fragment key={cat.id}>
                              {/* Category Header Row */}
                              <tr className="bg-[#0d2248]/85 border-y border-verta-cyan/20">
                                <td colSpan={4} className="py-2.5 px-4">
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-verta-cyan">
                                      {CATEGORY_ICONS[cat.id]}
                                      <span>{cat.title}</span>
                                    </div>
                                    <span className="text-[11px] text-gray-400 hidden sm:inline">
                                      {cat.subtitle}
                                    </span>
                                  </div>
                                </td>
                              </tr>

                              {/* Feature Rows */}
                              {catFeatures.map((feature) => {
                                const isChecked = selectedServiceIds.includes(feature.id);
                                return (
                                  <tr
                                    key={feature.id}
                                    onClick={() => handleToggleService(feature.id)}
                                    className={`border-b border-verta-slate-blue/30 transition-colors cursor-pointer ${
                                      isChecked ? 'bg-verta-cyan/[0.06] hover:bg-verta-cyan/[0.1]' : 'hover:bg-white/[0.03]'
                                    }`}
                                  >
                                    <td className="py-3 px-4">
                                      <div className="flex items-start gap-3">
                                        <span
                                          className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                            isChecked
                                              ? 'bg-emerald-400 border-emerald-400 text-verta-navy'
                                              : 'border-slate-500 bg-verta-navy/80 text-transparent'
                                          }`}
                                          aria-hidden="true"
                                        >
                                          <Check className="w-3 h-3 stroke-[3]" />
                                        </span>
                                        <div className="space-y-0.5">
                                          <span className="text-xs sm:text-[13px] font-semibold text-white block leading-snug">
                                            {feature.label}
                                          </span>
                                          <span className="text-[11px] text-gray-400 block leading-snug">
                                            {feature.description}
                                          </span>
                                        </div>
                                      </div>
                                    </td>

                                    {(['paquete_1', 'paquete_2', 'paquete_3'] as PackageId[]).map((pkgId) => {
                                      const included = feature.includedIn[pkgId];
                                      const isColSelected = selectedPackageId === pkgId;
                                      const colTint = isColSelected
                                        ? pkgId === 'paquete_1'
                                          ? 'bg-teal-500/[0.08]'
                                          : pkgId === 'paquete_2'
                                            ? 'bg-sky-500/[0.08]'
                                            : 'bg-verta-coral/[0.08]'
                                        : '';

                                      return (
                                        <td
                                          key={pkgId}
                                          className={`py-3 px-2 text-center border-l border-verta-slate-blue/30 ${colTint}`}
                                        >
                                          {included ? (
                                            <span
                                              className={`inline-flex items-center justify-center w-6 h-6 rounded-full border transition-all ${
                                                isChecked && isColSelected
                                                  ? 'bg-emerald-400/25 border-emerald-300 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.45)]'
                                                  : 'bg-emerald-500/15 border-emerald-400/60 text-emerald-400'
                                              }`}
                                              aria-label="Incluido"
                                            >
                                              <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                                            </span>
                                          ) : (
                                            <span className="text-gray-500 font-mono text-sm select-none" aria-label="No incluido">
                                              —
                                            </span>
                                          )}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CUMULATIVE NOTE MATCHING GRAPHIC */}
                <div className="px-4 py-3 rounded-xl border border-verta-coral/40 bg-verta-coral/[0.06] flex items-center gap-3 text-xs sm:text-sm">
                  <Info className="w-4 h-4 text-verta-coral shrink-0" />
                  <p className="text-gray-200">
                    <strong className="text-verta-coral font-bold">Paquete 2</strong> incluye todo lo del Paquete 1.{' '}
                    <strong className="text-verta-coral font-bold">Paquete 3</strong> incluye todo lo del Paquete 1 y 2.
                  </p>
                </div>
              </div>

              {/* RIGHT SIDEBAR: ATTACHED OFFICIAL GRAPHIC + SELECTION SUMMARY */}
              <div className="xl:col-span-4 space-y-5">
                {/* Official Graphic Preview Card */}
                <div className="rounded-2xl border border-verta-slate-blue/60 bg-verta-navy/70 overflow-hidden">
                  <div className="px-4 py-3 border-b border-verta-slate-blue/40 flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-white">
                      Guía Visual Oficial VERTA
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowImageLightbox(true)}
                      className="text-xs font-mono text-verta-cyan hover:text-white inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Ampliar</span>
                    </button>
                  </div>

                  <div className="p-3 bg-[#050c1d]">
                    {!imageError ? (
                      <button
                        type="button"
                        onClick={() => setShowImageLightbox(true)}
                        className="block w-full rounded-xl overflow-hidden border border-verta-slate-blue/40 hover:border-verta-cyan/60 transition-colors cursor-pointer group relative"
                        title="Haz clic para ver la imagen comparativa en tamaño completo"
                      >
                        <img
                          src={PACKAGES_GRAPHIC_SRC}
                          alt="VERTA Comparativo de Paquetes: Base, Promoción y Premium"
                          referrerPolicy="no-referrer"
                          onError={() => setImageError(true)}
                          className="w-full h-auto object-contain block"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 flex items-center justify-between text-xs text-white opacity-95 group-hover:opacity-100">
                          <span className="font-mono">Comparativo Oficial</span>
                          <span className="font-mono text-verta-cyan inline-flex items-center gap-1">
                            <Maximize2 className="w-3 h-3" />
                            Ver completo
                          </span>
                        </div>
                      </button>
                    ) : (
                      <div className="p-6 rounded-xl border border-verta-slate-blue/40 bg-verta-dark-blue text-center space-y-2">
                        <ImageIcon className="w-8 h-8 text-verta-cyan mx-auto" />
                        <p className="text-xs font-semibold text-white">VERTA | Comparativo de Paquetes</p>
                        <p className="text-[11px] text-gray-400">
                          Utiliza la matriz interactiva a la izquierda para explorar los 3 niveles de membresía.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Selection Summary Card */}
                <div className="rounded-2xl border border-verta-cyan/35 bg-[#091530] p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-verta-slate-blue/40 pb-3">
                    <div>
                      <span className="text-[11px] font-mono text-gray-400 block">Tu selección actual</span>
                      <h4 className="text-base font-extrabold text-white font-display">
                        {activePackage.name}
                      </h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-verta-cyan tabular-nums">
                      {selectedServiceIds.length} / {totalFeaturesCount} servicios
                    </span>
                  </div>

                  {/* List of Selected Services */}
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {selectedServiceIds.length === 0 ? (
                      <p className="text-xs text-gray-400 py-2">
                        Selecciona al menos un paquete o servicio de la matriz para continuar.
                      </p>
                    ) : (
                      PACKAGE_FEATURES.filter((f) => selectedServiceIds.includes(f.id)).map((feat) => (
                        <div
                          key={feat.id}
                          className="flex items-center justify-between gap-2 text-xs text-gray-200 py-1 border-b border-white/5 last:border-b-0"
                        >
                          <span className="truncate">{feat.label}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        </div>
                      ))
                    )}
                  </div>

                  {/* Optional Note for VERTA Team */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="package-selection-note"
                      className="text-xs font-mono text-gray-300 block"
                    >
                      Comentarios o requerimientos específicos (opcional)
                    </label>
                    <textarea
                      id="package-selection-note"
                      rows={2}
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="Ej. Requiero diagnóstico de sitio web y campaña para el próximo mes..."
                      className="w-full rounded-xl bg-verta-navy border border-verta-slate-blue/60 focus:border-verta-cyan focus:outline-none px-3 py-2 text-xs text-white placeholder:text-gray-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            </section>
          ) : (
            /* TAB 2: FULL OFFICIAL INFOGRAPHIC + SIDE-BY-SIDE INTERACTIVE SERVICE SELECTOR */
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 rounded-2xl border border-verta-slate-blue/60 bg-[#050c1d] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-verta-cyan font-bold">
                    Infografía Oficial · VERTA Comparativo de Paquetes
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowImageLightbox(true)}
                    className="px-3 py-1 rounded-lg text-xs font-mono text-white bg-verta-navy border border-verta-slate-blue/60 hover:border-verta-cyan cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-verta-cyan" />
                    <span>Pantalla completa</span>
                  </button>
                </div>

                {!imageError ? (
                  <img
                    src={PACKAGES_GRAPHIC_SRC}
                    alt="VERTA Comparativo de Paquetes: Base, Promoción y Premium"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-auto rounded-xl border border-verta-slate-blue/40"
                  />
                ) : (
                  <div className="p-10 rounded-xl border border-verta-slate-blue/40 bg-verta-dark-blue text-center space-y-2">
                    <ImageIcon className="w-10 h-10 text-verta-cyan mx-auto" />
                    <p className="text-sm font-bold text-white">VERTA | Comparativo de Paquetes</p>
                    <p className="text-xs text-gray-400">
                      Cambia a la pestaña Comparativo y Selector para ver la tabla interactiva.
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 rounded-2xl border border-verta-cyan/35 bg-[#091530] p-5 space-y-5">
                <div className="space-y-1 border-b border-verta-slate-blue/40 pb-3">
                  <h3 className="text-base font-bold text-white font-display">
                    Selecciona tus servicios directamente
                  </h3>
                  <p className="text-xs text-gray-300">
                    Marca los servicios que deseas contratar mientras revisas el comparativo gráfico.
                  </p>
                </div>

                {/* Quick Package Switcher */}
                <div className="grid grid-cols-3 gap-2">
                  {PACKAGES_DATA.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => handleSelectPackage(pkg.id)}
                        className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? pkg.id === 'paquete_1'
                              ? 'bg-teal-500/20 border-teal-400 text-white'
                              : pkg.id === 'paquete_2'
                                ? 'bg-sky-500/20 border-sky-400 text-white'
                                : 'bg-verta-coral/20 border-verta-coral text-white'
                            : 'bg-verta-navy/60 border-verta-slate-blue/50 text-gray-400 hover:text-white'
                        }`}
                      >
                        <span className="block text-[10px] font-mono">{pkg.tierLabel}</span>
                        <span className="block text-xs font-bold font-display">{pkg.code}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Checklist by Category */}
                <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                  {PACKAGE_CATEGORY_META.map((cat) => (
                    <div key={cat.id} className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-verta-cyan">
                        {CATEGORY_ICONS[cat.id]}
                        <span>{cat.title}</span>
                      </div>
                      <div className="space-y-1.5">
                        {PACKAGE_FEATURES.filter((f) => f.category === cat.id).map((feat) => {
                          const isChecked = selectedServiceIds.includes(feat.id);
                          return (
                            <label
                              key={feat.id}
                              className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-colors cursor-pointer ${
                                isChecked
                                  ? 'bg-verta-cyan/10 border-verta-cyan/40 text-white'
                                  : 'bg-verta-navy/50 border-verta-slate-blue/40 text-gray-300 hover:border-verta-slate-blue'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleService(feat.id)}
                                className="mt-0.5 accent-emerald-400 w-4 h-4 cursor-pointer shrink-0"
                              />
                              <span className="text-xs leading-snug">{feat.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* STICKY ACTION FOOTER */}
        <div className="px-5 sm:px-8 py-4 bg-verta-navy/95 border-t border-verta-slate-blue/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono">
            <span className="text-gray-400">
              Paquete seleccionado:{' '}
              <strong className={getPackageAccentText(selectedPackageId)}>{activePackage.name}</strong>
            </span>
            <span className="text-gray-600" aria-hidden="true">·</span>
            <span className="text-gray-300 tabular-nums">
              {selectedServiceIds.length} de {totalFeaturesCount} servicios activos
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-gray-300 hover:text-white bg-verta-dark-blue border border-verta-slate-blue/60 hover:border-verta-slate-blue transition-colors cursor-pointer whitespace-nowrap"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={() => handleConfirm(false)}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-verta-navy bg-verta-cyan hover:bg-verta-cyan/90 transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar Selección</span>
            </button>

            <button
              type="button"
              onClick={() => handleConfirm(true)}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-verta-coral hover:bg-verta-coral-hover transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span>Activar en Área Proveedores</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX */}
      {showImageLightbox && !imageError && (
        <div
          className="fixed inset-0 z-[60] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowImageLightbox(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[94vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-mono text-verta-cyan font-bold">
                VERTA | Comparativo de Paquetes (Vista Completa)
              </span>
              <button
                type="button"
                onClick={() => setShowImageLightbox(false)}
                className="px-3 py-1.5 rounded-lg bg-verta-navy border border-verta-slate-blue text-xs font-mono text-white hover:border-verta-cyan cursor-pointer inline-flex items-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>Cerrar vista</span>
              </button>
            </div>
            <img
              src={PACKAGES_GRAPHIC_SRC}
              alt="VERTA Comparativo de Paquetes en pantalla completa"
              referrerPolicy="no-referrer"
              className="max-h-[85vh] w-auto object-contain rounded-xl border border-verta-cyan/30 shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
