/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  Lock, 
  User, 
  Key, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Sparkles, 
  Shield, 
  LogIn, 
  Briefcase, 
  FileCheck2,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { PREDEFINED_USERS, PredefinedUser } from '../data/predefinedUsers';
import { useAuth } from '../context/AuthContext';
import { PlatformEnvironment } from './Header';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: PredefinedUser | any, targetEnv: PlatformEnvironment) => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const { loginWithUserCredentials, loginWithGoogle, firestoreOnline } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'quick' | 'credentials'>('quick');
  const [selectedQuickUser, setSelectedQuickUser] = useState<PredefinedUser | null>(null);
  const [quickPassword, setQuickPassword] = useState('');
  const [showQuickPassword, setShowQuickPassword] = useState(false);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successAnimation, setSuccessAnimation] = useState(false);

  if (!isOpen) return null;

  const handleSelectQuickUser = (userItem: PredefinedUser) => {
    setSelectedQuickUser(userItem);
    setQuickPassword('');
    setShowQuickPassword(false);
    setErrorMessage(null);
  };

  const handleQuickPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuickUser) return;
    if (!quickPassword.trim()) {
      setErrorMessage(`Por favor ingrese la contraseña para ${selectedQuickUser.name}.`);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const loggedUser = await loginWithUserCredentials(selectedQuickUser.username, quickPassword);
      setSuccessAnimation(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessAnimation(false);
        onLoginSuccess(loggedUser, selectedQuickUser.defaultEnvironment);
        onClose();
      }, 700);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Contraseña incorrecta. Por favor verifique sus credenciales.');
    }
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage('Por favor ingrese su usuario o correo electrónico.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Por favor ingrese su contraseña.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const loggedUser = await loginWithUserCredentials(identifier.trim(), password);
      setSuccessAnimation(true);
      
      const targetEnv: PlatformEnvironment = 
        loggedUser.role === 'proveedor' ? 'proveedores' : 'empresas';

      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessAnimation(false);
        onLoginSuccess(loggedUser, targetEnv);
        onClose();
      }, 700);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Credenciales inválidas.');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await loginWithGoogle('empresa');
      setSuccessAnimation(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessAnimation(false);
        onLoginSuccess({ displayName: 'Usuario Google' }, 'empresas');
        onClose();
      }, 700);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage('No se pudo completar el acceso con Google.');
    }
  };

  const autofillUser = (u: PredefinedUser) => {
    setIdentifier(u.email);
    setPassword('');
    setActiveTab('credentials');
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#0e172e] via-[#0b132b] to-[#070c1d] rounded-2xl border border-verta-slate-blue/60 shadow-2xl overflow-hidden text-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP ACCENT LINE */}
        <div className="h-1.5 w-full bg-gradient-to-r from-verta-cyan via-verta-cobalt to-indigo-500" />

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-xl hover:bg-verta-slate-blue/30 transition-all cursor-pointer z-20"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="p-6 pb-4 border-b border-verta-slate-blue/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-verta-cobalt to-verta-cyan p-0.5 shadow-lg shadow-verta-cyan/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#0b132b] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-verta-cyan" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-bold font-sans text-white tracking-wide">
                  Acceso Seguro al Ecosistema VERTA
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-verta-cyan/15 text-verta-cyan border border-verta-cyan/30">
                  Zero-Trust
                </span>
              </div>
              <p className="text-xs text-gray-400 font-sans mt-0.5">
                Plataforma Unificada de Homologación, Compliance y Auditoría de Proveedores
              </p>
            </div>
          </div>

          {/* TABS SELECTOR */}
          <div className="flex items-center space-x-2 mt-5 bg-verta-dark-blue/80 p-1 rounded-xl border border-verta-slate-blue/40">
            <button
              onClick={() => { 
                setActiveTab('quick'); 
                setSelectedQuickUser(null);
                setQuickPassword('');
                setErrorMessage(null); 
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'quick'
                  ? 'bg-gradient-to-r from-verta-cobalt/80 to-indigo-600/80 text-white shadow-md border border-cyan-400/30'
                  : 'text-gray-400 hover:text-white hover:bg-verta-slate-blue/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-verta-cyan" />
              <span>4 Perfiles Autorizados</span>
            </button>
            <button
              onClick={() => { 
                setActiveTab('credentials'); 
                setErrorMessage(null); 
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'credentials'
                  ? 'bg-gradient-to-r from-verta-cobalt/80 to-indigo-600/80 text-white shadow-md border border-cyan-400/30'
                  : 'text-gray-400 hover:text-white hover:bg-verta-slate-blue/20'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-verta-cyan" />
              <span>Ingreso con Credenciales</span>
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-verta-rose/15 border border-verta-rose/30 flex items-start space-x-2.5 text-xs text-rose-200 animate-shake">
              <AlertCircle className="w-4 h-4 text-verta-rose shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successAnimation && (
            <div className="mb-4 p-4 rounded-xl bg-verta-emerald/20 border border-verta-emerald/40 flex items-center space-x-3 text-xs text-emerald-200 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-verta-emerald animate-bounce" />
              <div>
                <p className="font-bold text-white text-sm">¡Credenciales verificadas exitosamente!</p>
                <p className="text-gray-300">Cargando ambiente seguro y sincronizando con Firestore...</p>
              </div>
            </div>
          )}

          {/* TAB 1: QUICK PROFILES SELECTOR & PASSWORD PROMPT */}
          {activeTab === 'quick' && (
            <div>
              {!selectedQuickUser ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-mono text-gray-400">
                      Selecciona tu perfil para ingresar con contraseña:
                    </p>
                    <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 flex items-center space-x-1">
                      <Lock className="w-3 h-3" />
                      <span>Acceso Protegido</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PREDEFINED_USERS.map((userItem) => (
                      <div
                        key={userItem.id}
                        onClick={() => !isSubmitting && handleSelectQuickUser(userItem)}
                        className={`group relative p-3.5 rounded-xl border bg-[#0d162e]/90 hover:bg-[#121f3f] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-md ${userItem.borderAccent}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base border shadow-sm ${userItem.avatarBg} ${userItem.avatarColor}`}>
                              {userItem.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                                  {userItem.name}
                                </h3>
                              </div>
                              <p className="text-[11px] font-mono text-gray-400">
                                {userItem.email}
                              </p>
                            </div>
                          </div>
                          
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                            userItem.role === 'admin' 
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50' 
                              : userItem.role === 'proveedor'
                                ? 'bg-amber-950/80 text-amber-300 border-amber-700/50'
                                : 'bg-blue-950/80 text-blue-300 border-blue-700/50'
                          }`}>
                            {userItem.badgeText}
                          </span>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-verta-slate-blue/30 flex items-center justify-between text-[11px] text-gray-300">
                          <div className="flex items-center space-x-1.5 truncate max-w-[190px]" title={userItem.companyName}>
                            <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="truncate">{userItem.companyName}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-cyan-400 font-mono group-hover:translate-x-0.5 transition-transform shrink-0 font-medium">
                            <span>Ingresar clave</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* INFO BOX */}
                  <div className="mt-4 p-3 rounded-xl bg-verta-dark-blue/60 border border-verta-slate-blue/40 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Shield className="w-4 h-4 text-verta-cyan shrink-0" />
                      <span>Cada perfil requiere confirmación de contraseña</span>
                    </div>
                    <button
                      onClick={() => {
                        autofillUser(PREDEFINED_USERS[0]);
                      }}
                      className="text-xs font-mono text-verta-cyan hover:underline cursor-pointer"
                    >
                      Formulario manual →
                    </button>
                  </div>
                </div>
              ) : (
                /* PASSWORD PROMPT FOR SELECTED USER */
                <form onSubmit={handleQuickPasswordSubmit} className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedQuickUser(null);
                        setQuickPassword('');
                        setErrorMessage(null);
                      }}
                      className="flex items-center space-x-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-cyan-950/40 border border-cyan-800/40"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Volver a la lista de perfiles</span>
                    </button>

                    <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/60 flex items-center space-x-1.5">
                      <Lock className="w-3 h-3 text-cyan-400" />
                      <span>Verificación Requerida</span>
                    </span>
                  </div>

                  {/* SELECTED PROFILE CARD */}
                  <div className={`p-4 rounded-xl border bg-[#0d162e] shadow-lg ${selectedQuickUser.borderAccent}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3.5">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border shadow-sm ${selectedQuickUser.avatarBg} ${selectedQuickUser.avatarColor}`}>
                          {selectedQuickUser.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">
                            {selectedQuickUser.name}
                          </h3>
                          <p className="text-xs font-mono text-gray-300">
                            {selectedQuickUser.email}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5 flex items-center space-x-1">
                            <Building2 className="w-3 h-3 text-gray-400 shrink-0" />
                            <span className="truncate max-w-[240px] sm:max-w-none">{selectedQuickUser.companyName}</span>
                          </p>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold border ${
                        selectedQuickUser.role === 'admin' 
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50' 
                          : selectedQuickUser.role === 'proveedor'
                            ? 'bg-amber-950/80 text-amber-300 border-amber-700/50'
                            : 'bg-blue-950/80 text-blue-300 border-blue-700/50'
                      }`}>
                        {selectedQuickUser.badgeText}
                      </span>
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5">
                      Contraseña para {selectedQuickUser.name}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showQuickPassword ? 'text' : 'password'}
                        value={quickPassword}
                        onChange={(e) => setQuickPassword(e.target.value)}
                        placeholder="••••••••"
                        autoFocus
                        className="w-full pl-9 pr-10 py-2.5 bg-verta-dark-blue/90 border border-verta-slate-blue/60 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-verta-cyan transition-colors font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowQuickPassword(!showQuickPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white cursor-pointer"
                        title={showQuickPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                      >
                        {showQuickPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-verta-cobalt via-indigo-600 to-verta-cyan text-white font-mono font-bold text-sm shadow-lg hover:shadow-cyan-500/20 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Verificando Credenciales...</span>
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4" />
                          <span>Iniciar Sesión como {selectedQuickUser.name}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* FAST SWITCHER TO ANOTHER PREDEFINED PROFILE */}
                  <div className="pt-3 border-t border-verta-slate-blue/30 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-gray-400">O cambiar a otro perfil:</span>
                    <div className="flex items-center space-x-1.5">
                      {PREDEFINED_USERS.filter((u) => u.id !== selectedQuickUser.id).map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => {
                            setSelectedQuickUser(u);
                            setQuickPassword('');
                            setErrorMessage(null);
                          }}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-verta-slate-blue/30 hover:bg-verta-slate-blue/60 text-gray-300 border border-verta-slate-blue/50 transition-all cursor-pointer"
                        >
                          {u.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: CREDENTIALS FORM */}
          {activeTab === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5">
                  Usuario o Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="hector, adrian, carmen, david o correo electrónico"
                    className="w-full pl-9 pr-4 py-2.5 bg-verta-dark-blue/90 border border-verta-slate-blue/60 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-verta-cyan transition-colors"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] font-mono text-gray-400">Usuarios:</span>
                  {PREDEFINED_USERS.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        setIdentifier(u.email);
                        setPassword('');
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-verta-slate-blue/30 hover:bg-verta-slate-blue/60 text-gray-300 border border-verta-slate-blue/50 transition-all cursor-pointer"
                    >
                      {u.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-gray-300">
                    Contraseña
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-verta-dark-blue/90 border border-verta-slate-blue/60 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-verta-cyan transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white cursor-pointer"
                    title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-verta-cobalt via-indigo-600 to-verta-cyan text-white font-mono font-bold text-sm shadow-lg hover:shadow-cyan-500/20 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verificando Credenciales...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Iniciar Sesión en VERTA</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* GOOGLE SIGN IN ALTERNATIVE */}
          <div className="mt-5 pt-4 border-t border-verta-slate-blue/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-200 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Acceso con Cuenta Google</span>
            </button>

            <div className="flex items-center space-x-2 text-[11px] font-mono text-gray-400">
              <span className={`w-2 h-2 rounded-full ${firestoreOnline ? 'bg-verta-emerald animate-pulse' : 'bg-verta-rose'}`} />
              <span>Firebase Cloud DB Conectado</span>
            </div>
          </div>
        </div>

        {/* FOOTER BADGE */}
        <div className="bg-[#080d1e] px-6 py-2.5 border-t border-verta-slate-blue/30 flex items-center justify-between text-[10px] font-mono text-gray-400">
          <span>Protocolo Criptográfico TLS 1.3 / SAT / IMSS</span>
          <span className="text-verta-cyan">Ambiente de Producción VERTA 2026</span>
        </div>
      </div>
    </div>
  );
}
