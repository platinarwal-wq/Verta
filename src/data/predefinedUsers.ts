/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PredefinedUser {
  id: string;
  username: string;
  name: string;
  email: string;
  passwordHash: string; // "Verta33"
  role: 'empresa' | 'proveedor' | 'admin';
  companyName: string;
  rfc: string;
  position: string;
  description: string;
  avatarColor: string;
  avatarBg: string;
  borderAccent: string;
  badgeText: string;
  defaultEnvironment: 'empresas' | 'proveedores' | 'publico';
}

export const PREDEFINED_USERS: PredefinedUser[] = [
  {
    id: 'usr_hector_vrt',
    username: 'hector',
    name: 'Héctor',
    email: 'hector@verta.mx',
    passwordHash: 'Verta33',
    role: 'empresa',
    companyName: 'Grupo Industrial Norte S.A. de C.V.',
    rfc: 'GIN880412KJ1',
    position: 'Director de Adquisiciones y Cadena de Suministro',
    description: 'Gestión de homologación de contratistas, mitigación de riesgos de subcontratación y gestión de convocatorias PULL.',
    avatarColor: 'text-cyan-300',
    avatarBg: 'bg-cyan-500/20 border-cyan-500/50',
    borderAccent: 'border-cyan-500/40 hover:border-cyan-400 group-hover:shadow-cyan-500/20',
    badgeText: 'Empresa Contratante',
    defaultEnvironment: 'empresas'
  },
  {
    id: 'usr_adrian_vrt',
    username: 'adrian',
    name: 'Adrián',
    email: 'adrian@verta.mx',
    passwordHash: 'Verta33',
    role: 'empresa',
    companyName: 'Corporativo Minero del Centro S.A. de C.V.',
    rfc: 'CMC920918L88',
    position: 'Oficial de Cumplimiento & Auditor de Riesgo',
    description: 'Convalidación de opiniones 32-D SAT, cumplimiento patronal IMSS/INFONAVIT y verificación de constancias REPSE.',
    avatarColor: 'text-blue-300',
    avatarBg: 'bg-blue-500/20 border-blue-500/50',
    borderAccent: 'border-blue-500/40 hover:border-blue-400 group-hover:shadow-blue-500/20',
    badgeText: 'Compliance & Riesgo',
    defaultEnvironment: 'empresas'
  },
  {
    id: 'usr_carmen_vrt',
    username: 'carmen',
    name: 'Carmen',
    email: 'carmen@verta.mx',
    passwordHash: 'Verta33',
    role: 'proveedor',
    companyName: 'Soluciones Tecnológicas Alfa S.A. de C.V.',
    rfc: 'STA1506208K9',
    position: 'Representante Legal y Directora de Calidad',
    description: 'Carga y actualización de evidencias en 5 dimensiones, control de vigencias 30/60/90 días y atención de observaciones.',
    avatarColor: 'text-amber-300',
    avatarBg: 'bg-amber-500/20 border-amber-500/50',
    borderAccent: 'border-amber-500/40 hover:border-amber-400 group-hover:shadow-amber-500/20',
    badgeText: 'Proveedor Homologado',
    defaultEnvironment: 'proveedores'
  },
  {
    id: 'usr_david_vrt',
    username: 'david',
    name: 'David',
    email: 'david@verta.mx',
    passwordHash: 'Verta33',
    role: 'admin',
    companyName: 'VERTA Verification Technologies',
    rfc: 'VER210315TR8',
    position: 'Super Administrador & Auditor Maestro',
    description: 'Acceso omnicanal a todos los ambientes, auditoría forense ante SAT/IMSS/RPC y gobierno del Directorio PULL.',
    avatarColor: 'text-emerald-300',
    avatarBg: 'bg-emerald-500/20 border-emerald-500/50',
    borderAccent: 'border-emerald-500/40 hover:border-emerald-400 group-hover:shadow-emerald-500/20',
    badgeText: 'Super Admin VERTA',
    defaultEnvironment: 'empresas'
  }
];

export const DEFAULT_PASSWORD = 'Verta33';

export function findPredefinedUser(identifier: string): PredefinedUser | undefined {
  const clean = identifier.trim().toLowerCase();
  return PREDEFINED_USERS.find(
    (u) =>
      u.username.toLowerCase() === clean ||
      u.email.toLowerCase() === clean ||
      u.name.toLowerCase().includes(clean) ||
      (clean === 'davidikgd@gmail.com' && u.username === 'david')
  );
}
