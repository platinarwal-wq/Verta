/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  LogOut, 
  User, 
  Menu, 
  X, 
  Globe, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown,
  Sparkles,
  Sliders,
  HelpCircle,
  BookOpen,
  LogIn,
  Database,
  Package
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export type PlatformEnvironment = 'publico' | 'empresas' | 'proveedores';

interface HeaderProps {
  currentEnvironment: PlatformEnvironment;
  setEnvironment: (env: PlatformEnvironment) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  providerName: string;
  clientName: string;
  onOpenTutorial?: () => void;
  onOpenPackages?: () => void;
  onOpenLogin?: () => void;
}

export function Header({ 
  currentEnvironment, 
  setEnvironment, 
  activeTab, 
  setActiveTab, 
  providerName,
  clientName,
  onOpenTutorial,
  onOpenPackages,
  onOpenLogin
}: HeaderProps) {
  const { user, userProfile, loginWithGoogle, logout: authLogout, firestoreOnline } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginGoogle = async (role?: 'empresa' | 'proveedor') => {
    setIsLoggingIn(true);
    try {
      await loginWithGoogle(role || (currentEnvironment === 'proveedores' ? 'proveedor' : 'empresa'));
    } catch (err) {
      console.warn('Google login dismissed or failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    setShowLogoutToast(true);
    try {
      await authLogout();
    } catch (err) {
      console.warn('Auth logout error:', err);
    }
    setTimeout(() => {
      setShowLogoutToast(false);
      setEnvironment('publico');
      setActiveTab('inicio');
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-verta-navy/90 border-b border-verta-slate-blue/40 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <div 
          className="flex items-center space-x-3 pointer-events-auto cursor-pointer select-none" 
          onClick={() => {
            setEnvironment('publico');
            setActiveTab('inicio');
          }}
        >
          {/* Multi-tone Chevron V logo */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M15 15 L45 50 L15 85 L35 85 L65 50 L35 15 Z"
                fill="url(#blue-gradient)"
                className="drop-shadow-[0_2px_10px_rgba(37,99,235,0.4)]"
              />
              <path
                d="M40 15 L70 50 L40 85 L60 85 L90 50 L60 15 Z"
                fill="url(#cyan-gradient)"
                className="drop-shadow-[0_2px_10px_rgba(6,182,212,0.4)]"
              />
              <path
                d="M32 45 L50 65 L40 85 L28 85 L42 62 Z"
                fill="url(#coral-gradient)"
                opacity="0.95"
              />
              <defs>
                <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
                <linearGradient id="coral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl sm:text-2xl tracking-widest text-white font-display leading-none">
              VER<span className="text-verta-coral font-extrabold">TA</span>
            </span>
            <span className="text-[9px] font-mono text-gray-400 tracking-wider hidden sm:block">SISTEMA DE ESTRUCTURACIÓN</span>
          </div>
        </div>

        {/* 3 INDEPENDENT ENVIRONMENTS SELECTOR (DESKTOP) */}
        <div className="hidden md:flex items-center bg-verta-dark-blue/80 border border-verta-slate-blue/50 p-1 rounded-2xl shadow-inner">
          <button
            onClick={() => {
              setEnvironment('publico');
              setActiveTab('inicio');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              currentEnvironment === 'publico'
                ? 'bg-verta-cyan text-verta-navy shadow-md font-extrabold'
                : 'text-gray-400 hover:text-white hover:bg-verta-slate-blue/30'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Sitio Público</span>
          </button>

          <button
            onClick={() => {
              setEnvironment('empresas');
              setActiveTab('empresas');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              currentEnvironment === 'empresas'
                ? 'bg-gradient-to-r from-blue-500 to-verta-cobalt text-white shadow-md font-extrabold'
                : 'text-gray-400 hover:text-white hover:bg-verta-slate-blue/30'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Área Empresas</span>
          </button>

          <button
            onClick={() => {
              setEnvironment('proveedores');
              setActiveTab('proveedores');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2 ${
              currentEnvironment === 'proveedores'
                ? 'bg-verta-coral text-white shadow-md font-extrabold'
                : 'text-gray-400 hover:text-white hover:bg-verta-slate-blue/30'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Área Proveedores</span>
          </button>
        </div>

        {/* RIGHT CONTEXT ACTIONS / PROFILE */}
        <div className="hidden md:flex items-center space-x-3">

          {/* FIREBASE STATUS BADGE */}
          <div 
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-verta-dark-blue/80 border border-verta-slate-blue/40 text-[10px] font-mono text-gray-300"
            title={`Firebase Firestore Conectado (Proyecto: make-468806, Región: us-west1)`}
          >
            <span className={`w-2 h-2 rounded-full ${firestoreOnline ? 'bg-verta-emerald animate-pulse' : 'bg-verta-rose'}`} />
            <span className="font-semibold text-gray-300">Firebase</span>
            <span className="text-gray-400">us-west1</span>
          </div>
          
          {/* PAQUETES BUTTON (DESKTOP) */}
          <button
            id="btn-header-paquetes"
            onClick={onOpenPackages}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-verta-coral/15 hover:bg-verta-coral/25 text-verta-coral border border-verta-coral/40 hover:border-verta-coral shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Ver comparativo de paquetes y seleccionar servicios VERTA"
          >
            <Package className="w-3.5 h-3.5 text-verta-coral shrink-0" />
            <span>Paquetes</span>
          </button>

          {/* TUTORIAL BUTTON (DESKTOP) */}
          <button
            id="btn-header-tutorial"
            onClick={onOpenTutorial}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-verta-cyan/15 hover:bg-verta-cyan/25 text-verta-cyan border border-verta-cyan/40 hover:border-verta-cyan shadow-sm transition-all cursor-pointer group whitespace-nowrap shrink-0"
            title="Tutorial interactivo paso a paso del sistema VERTA"
          >
            <HelpCircle className="w-3.5 h-3.5 text-verta-cyan group-hover:rotate-12 transition-transform shrink-0" />
            <span>Tutorial</span>
          </button>

          {/* AUTHENTICATION OR ENVIRONMENT QUICK SWITCH */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2.5 text-xs font-mono text-gray-300 hover:text-white bg-verta-dark-blue/90 px-3 py-1.5 rounded-xl border border-verta-cyan/40 hover:border-verta-cyan transition-all cursor-pointer shadow-sm"
              >
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'Usuario'} 
                    className="w-5 h-5 rounded-full border border-verta-cyan/50" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-[10px] ${
                    user.role === 'admin' 
                      ? 'bg-emerald-600' 
                      : user.role === 'proveedor' 
                        ? 'bg-amber-600' 
                        : 'bg-verta-cobalt'
                  }`}>
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left font-sans">
                  <div className="text-xs font-semibold text-white max-w-[120px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl verta-glass border border-verta-slate-blue/60 p-2.5 shadow-2xl animate-fade-in bg-verta-dark-blue/98 z-50">
                  <div className="px-3 py-2 border-b border-verta-slate-blue/40">
                    <div className="text-xs font-bold text-white truncate">{user.displayName || 'Usuario VERTA'}</div>
                    <div className="text-[10px] text-gray-400 font-mono truncate">{user.email}</div>
                    {user.companyName && (
                      <div className="text-[10px] text-gray-300 font-sans mt-0.5 truncate flex items-center space-x-1">
                        <span className="text-verta-cyan">Empresa:</span>
                        <span className="truncate">{user.companyName}</span>
                      </div>
                    )}
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold border ${
                        user.role === 'admin'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50'
                          : user.role === 'proveedor'
                            ? 'bg-amber-950/80 text-amber-300 border-amber-600/50'
                            : 'bg-cyan-950/80 text-cyan-300 border-cyan-600/50'
                      }`}>
                        {user.role === 'admin' ? 'Super Admin' : user.role === 'proveedor' ? 'Proveedor Homologado' : 'Empresa Contratante'}
                      </span>
                      {user.rfc && (
                        <span className="text-[9px] font-mono text-gray-400">{user.rfc}</span>
                      )}
                    </div>
                  </div>
                  <div className="p-1 space-y-1">
                    {onOpenLogin && (
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onOpenLogin();
                        }}
                        className="w-full text-left flex items-center space-x-2 px-3 py-2 text-xs text-cyan-300 hover:text-white hover:bg-verta-cyan/15 rounded-lg transition-all cursor-pointer font-mono"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-verta-cyan" />
                        <span>Cambiar Perfil (4 Usuarios)</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setEnvironment('publico');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left flex items-center space-x-2 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-verta-slate-blue/40 rounded-lg transition-all cursor-pointer"
                    >
                      <Globe className="w-4 h-4 text-verta-cyan" />
                      <span>Ir al Sitio Público</span>
                    </button>
                    <button
                      onClick={() => {
                        setEnvironment(currentEnvironment === 'empresas' ? 'proveedores' : 'empresas');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left flex items-center space-x-2 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-verta-slate-blue/40 rounded-lg transition-all cursor-pointer"
                    >
                      <Sliders className="w-4 h-4 text-indigo-400" />
                      <span>Cambiar a {currentEnvironment === 'empresas' ? 'Área Proveedor' : 'Área Empresas'}</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center space-x-2 px-3 py-2 text-xs text-verta-rose hover:bg-verta-rose/10 rounded-lg transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              {/* PRIMARY LOGIN BUTTON FOR THE 4 USERS */}
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-mono font-bold text-white bg-gradient-to-r from-verta-cobalt via-indigo-600 to-verta-cyan hover:brightness-110 rounded-xl shadow-md shadow-verta-cyan/20 border border-cyan-400/40 transition-all cursor-pointer group"
                title="Iniciar sesión: Héctor, Adrián, Carmen y David"
              >
                <LogIn className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-0.5 transition-transform" />
                <span>Iniciar Sesión</span>
                <span className="hidden xl:inline-block px-1.5 py-0.2 rounded text-[9px] bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 font-mono">
                  4 Usuarios
                </span>
              </button>

              {currentEnvironment === 'publico' ? (
                <>
                  <button
                    onClick={() => setEnvironment('empresas')}
                    className="px-2.5 py-1.5 text-xs font-mono text-verta-cyan hover:text-white bg-verta-cyan/10 hover:bg-verta-cyan/20 border border-verta-cyan/30 rounded-xl transition-all cursor-pointer"
                  >
                    Empresas
                  </button>
                  <button
                    onClick={() => setEnvironment('proveedores')}
                    className="px-2.5 py-1.5 text-xs font-mono text-verta-coral hover:text-white bg-verta-coral/10 hover:bg-verta-coral/20 border border-verta-coral/30 rounded-xl transition-all cursor-pointer"
                  >
                    Proveedores
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEnvironment('publico')}
                  className="px-2.5 py-1.5 text-xs font-mono text-gray-300 hover:text-white bg-verta-slate-blue/30 hover:bg-verta-slate-blue/50 rounded-xl transition-all cursor-pointer"
                >
                  Portal Público
                </button>
              )}
            </div>
          )}
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Mobile Quick Paquetes Button */}
          <button
            id="btn-mobile-paquetes-quick"
            onClick={onOpenPackages}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-verta-coral/15 hover:bg-verta-coral/25 text-verta-coral border border-verta-coral/40 transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Ver paquetes y servicios"
          >
            <Package className="w-3.5 h-3.5 text-verta-coral" />
            <span>Paquetes</span>
          </button>

          {/* Mobile Quick Tutorial Button */}
          <button
            id="btn-mobile-tutorial-quick"
            onClick={onOpenTutorial}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-verta-cyan/15 hover:bg-verta-cyan/25 text-verta-cyan border border-verta-cyan/40 transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Tutorial del sistema"
          >
            <HelpCircle className="w-3.5 h-3.5 text-verta-cyan" />
            <span>Tutorial</span>
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white hover:bg-verta-slate-blue/40 rounded-lg transition-all cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-verta-slate-blue/40 space-y-3 animate-slide-down">
          
          {/* Paquetes Banner in Mobile Menu */}
          <button
            id="btn-mobile-paquetes-menu"
            onClick={() => {
              onOpenPackages?.();
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left p-3 rounded-xl font-mono text-xs flex items-center justify-between transition-all cursor-pointer bg-verta-coral/15 hover:bg-verta-coral/25 text-verta-coral border border-verta-coral/40 font-bold"
          >
            <div className="flex items-center space-x-2.5">
              <Package className="w-4 h-4 text-verta-coral shrink-0" />
              <span>Paquetes: Comparativo y Selección de Servicios</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-verta-coral" />
          </button>

          {/* Tutorial Banner in Mobile Menu */}
          <button
            id="btn-mobile-tutorial-menu"
            onClick={() => {
              onOpenTutorial?.();
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left p-3 rounded-xl font-mono text-xs flex items-center justify-between transition-all cursor-pointer bg-verta-cyan/15 hover:bg-verta-cyan/25 text-verta-cyan border border-verta-cyan/40 font-bold"
          >
            <div className="flex items-center space-x-2.5">
              <BookOpen className="w-4 h-4 text-verta-cyan shrink-0" />
              <span>Tutorial: Cómo funciona el sistema</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-verta-cyan" />
          </button>

          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest px-2">
            Ambientes de la Plataforma
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => {
                setEnvironment('publico');
                setActiveTab('inicio');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-mono text-xs flex items-center space-x-2.5 transition-all cursor-pointer ${
                currentEnvironment === 'publico'
                  ? 'bg-verta-cyan text-verta-navy font-bold'
                  : 'bg-verta-navy/60 text-gray-300 hover:text-white border border-verta-slate-blue/30'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>1. Sitio Público (Metodología, Beneficios, Directorio)</span>
            </button>

            <button
              onClick={() => {
                setEnvironment('empresas');
                setActiveTab('empresas');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-mono text-xs flex items-center space-x-2.5 transition-all cursor-pointer ${
                currentEnvironment === 'empresas'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-verta-navy/60 text-gray-300 hover:text-white border border-verta-slate-blue/30'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>2. Área Privada para Empresas (Invitaciones & Dictámenes)</span>
            </button>

            <button
              onClick={() => {
                setEnvironment('proveedores');
                setActiveTab('proveedores');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-mono text-xs flex items-center space-x-2.5 transition-all cursor-pointer ${
                currentEnvironment === 'proveedores'
                  ? 'bg-verta-coral text-white font-bold'
                  : 'bg-verta-navy/60 text-gray-300 hover:text-white border border-verta-slate-blue/30'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>3. Área Privada Proveedores (Carga & Vigencias)</span>
            </button>
          </div>

          {/* Firebase Authentication on Mobile */}
          <div className="pt-2 border-t border-verta-slate-blue/40">
            {user ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-verta-dark-blue/80 border border-verta-slate-blue/40">
                <div className="flex items-center space-x-2 truncate">
                  <div className="w-7 h-7 rounded-full bg-verta-cobalt flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="truncate text-xs">
                    <p className="font-semibold text-white truncate">{user.displayName || user.email}</p>
                    <p className="text-[10px] text-gray-400 font-mono">Firebase Online</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1 text-xs text-verta-rose hover:bg-verta-rose/15 rounded-lg transition-all"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenLogin) onOpenLogin();
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-gradient-to-r from-verta-cobalt via-indigo-600 to-verta-cyan text-white font-mono text-xs font-bold shadow-md cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-cyan-300" />
                  <span>Iniciar Sesión (4 Usuarios: Hector, Adrian, Carmen, David)</span>
                </button>
                <button
                  onClick={() => {
                    handleLoginGoogle();
                    setIsMobileMenuOpen(false);
                  }}
                  disabled={isLoggingIn}
                  className="w-full flex items-center justify-center space-x-2 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-mono text-xs cursor-pointer hover:bg-white/10"
                >
                  <span>Acceso con Google</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LOGOUT TOAST */}
      {showLogoutToast && (
        <div className="fixed top-20 right-4 lg:right-8 verta-glass border-l-4 border-verta-coral p-4 rounded-r-xl shadow-2xl flex items-center space-x-3 animate-slide-in z-50">
          <CheckCircle2 className="w-5 h-5 text-verta-coral" />
          <div>
            <p className="font-semibold text-white text-sm">Sesión finalizada</p>
            <p className="text-xs text-gray-400 font-mono">Regresando al Sitio Público</p>
          </div>
        </div>
      )}
    </header>
  );
}
