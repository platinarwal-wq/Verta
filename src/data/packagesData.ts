/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PackageDefinition, PackageFeatureCategory, PackageFeatureItem, PackageId } from '../types';

export const PACKAGES_GRAPHIC_SRC = '/assets/aistudio/4c9fdd08-23e8-4ad8-ac42-c581f6720e81_5371900c.jpg';

export const PACKAGE_ORDER: Record<PackageId, number> = {
  paquete_1: 1,
  paquete_2: 2,
  paquete_3: 3,
};

export const PACKAGES_DATA: PackageDefinition[] = [
  {
    id: 'paquete_1',
    code: 'Paquete 1',
    tierLabel: 'Base',
    name: 'Paquete 1 · Base',
    subtitle: 'Presencia y Conformación',
    description:
      'El proveedor crea su expediente digital, sube sus documentos, registra sus servicios y publica su perfil. Debe poder actualizar información y visualizar los estados de revisión documental.',
    accentColor: 'teal',
    highlights: [
      'Expediente digital y carga documental',
      'Registro de servicios y perfil publicado',
      'Actualización y seguimiento de estados de revisión',
    ],
  },
  {
    id: 'paquete_2',
    code: 'Paquete 2',
    tierLabel: 'Promoción',
    name: 'Paquete 2 · Medium',
    subtitle: 'Promoción y Visibilidad',
    description:
      'Se habilita una sección de promoción comercial: solicitud de campaña, materiales de marca, seguimiento del contenido publicado en redes de VERTA y participación en la revista.',
    accentColor: 'blue',
    highlights: [
      'Todo lo incluido en el Paquete 1 · Base',
      'Campaña de marketing en redes VERTA y materiales de marca',
      'Seguimiento de contenido y aparición en revista VERTA',
    ],
    includesNote: 'Paquete 2 incluye todo lo del Paquete 1.',
  },
  {
    id: 'paquete_3',
    code: 'Paquete 3',
    tierLabel: 'Premium',
    name: 'Paquete 3 · Premium',
    subtitle: 'Diagnóstico y Servicios Especializados',
    description:
      'El proveedor puede solicitar diagnósticos, consultar sus resultados y dar seguimiento a los servicios personalizados de marketing y apoyo administrativo.',
    accentColor: 'coral',
    highlights: [
      'Todo lo incluido en Paquete 1 y Paquete 2',
      'Diagnóstico de página web y revisión de procesos administrativos',
      'Servicios personalizados de marketing de marca y apoyo administrativo',
    ],
    includesNote: 'Paquete 3 incluye todo lo del Paquete 1 y 2.',
  },
];

export const PACKAGE_CATEGORY_META: {
  id: PackageFeatureCategory;
  title: string;
  subtitle: string;
}[] = [
  {
    id: 'presencia',
    title: 'PRESENCIA Y CONFORMACIÓN',
    subtitle: 'Estructura base del expediente digital y perfil corporativo',
  },
  {
    id: 'promocion',
    title: 'PROMOCIÓN Y VISIBILIDAD',
    subtitle: 'Impulso comercial en ecosistemas editoriales y redes VERTA',
  },
  {
    id: 'diagnostico',
    title: 'DIAGNÓSTICO Y SERVICIOS ESPECIALIZADOS',
    subtitle: 'Evaluación consultiva y acompañamiento operativo a la medida',
  },
];

export const PACKAGE_FEATURES: PackageFeatureItem[] = [
  // PRESENCIA Y CONFORMACIÓN (Paquete 1, 2, 3)
  {
    id: 'alta_perfil',
    label: 'Alta y perfil de empresa',
    description: 'Creación y publicación del perfil corporativo verificado en el ecosistema VERTA.',
    category: 'presencia',
    minPackage: 'paquete_1',
    includedIn: { paquete_1: true, paquete_2: true, paquete_3: true },
  },
  {
    id: 'doc_legal_fiscal',
    label: 'Documentación legal y fiscal básica',
    description: 'Carga, actualización y visualización de estados de revisión documental.',
    category: 'presencia',
    minPackage: 'paquete_1',
    includedIn: { paquete_1: true, paquete_2: true, paquete_3: true },
  },
  {
    id: 'repse',
    label: 'REPSE (si aplica)',
    description: 'Registro y acreditación de servicios especializados ante la STPS.',
    category: 'presencia',
    minPackage: 'paquete_1',
    includedIn: { paquete_1: true, paquete_2: true, paquete_3: true },
  },
  {
    id: 'certificaciones',
    label: 'Certificaciones (hasta 3)',
    description: 'Respaldo visible de hasta tres certificaciones técnicas o de calidad vigentes.',
    category: 'presencia',
    minPackage: 'paquete_1',
    includedIn: { paquete_1: true, paquete_2: true, paquete_3: true },
  },
  {
    id: 'brochure_servicios',
    label: 'Brochure de servicios',
    description: 'Registro de catálogo comercial y presentación descargable de servicios.',
    category: 'presencia',
    minPackage: 'paquete_1',
    includedIn: { paquete_1: true, paquete_2: true, paquete_3: true },
  },
  {
    id: 'ubicacion_contacto',
    label: 'Ubicación, contacto y redes sociales',
    description: 'Datos de cobertura geográfica, canales de contacto directo y enlaces oficiales.',
    category: 'presencia',
    minPackage: 'paquete_1',
    includedIn: { paquete_1: true, paquete_2: true, paquete_3: true },
  },

  // PROMOCIÓN Y VISIBILIDAD (Paquete 2, 3)
  {
    id: 'campana_redes',
    label: 'Campaña de marketing en redes VERTA',
    description: 'Solicitud de campaña, carga de materiales de marca y seguimiento de publicaciones.',
    category: 'promocion',
    minPackage: 'paquete_2',
    includedIn: { paquete_1: false, paquete_2: true, paquete_3: true },
  },
  {
    id: 'revista_verta',
    label: 'Aparición en revista VERTA',
    description: 'Participación editorial destacada en la publicación institucional de VERTA.',
    category: 'promocion',
    minPackage: 'paquete_2',
    includedIn: { paquete_1: false, paquete_2: true, paquete_3: true },
  },

  // DIAGNÓSTICO Y SERVICIOS ESPECIALIZADOS (Paquete 3)
  {
    id: 'diagnostico_web',
    label: 'Diagnóstico gratuito de página web',
    description: 'Evaluación técnica de presencia digital, UX y posicionamiento con entrega de resultados.',
    category: 'diagnostico',
    minPackage: 'paquete_3',
    includedIn: { paquete_1: false, paquete_2: false, paquete_3: true },
  },
  {
    id: 'diagnostico_procesos',
    label: 'Diagnóstico / revisión de procesos administrativos',
    description: 'Revisión estructurada de controles internos, flujos documentales y áreas de mejora.',
    category: 'diagnostico',
    minPackage: 'paquete_3',
    includedIn: { paquete_1: false, paquete_2: false, paquete_3: true },
  },
  {
    id: 'marketing_marca',
    label: 'Servicio de marketing de marca',
    description: 'Acompañamiento personalizado en posicionamiento, identidad comercial y estrategia de marca.',
    category: 'diagnostico',
    minPackage: 'paquete_3',
    includedIn: { paquete_1: false, paquete_2: false, paquete_3: true },
  },
  {
    id: 'apoyo_administrativo',
    label: 'Servicio de apoyo administrativo de la empresa',
    description: 'Soporte operativo y seguimiento administrativo personalizado para la organización.',
    category: 'diagnostico',
    minPackage: 'paquete_3',
    includedIn: { paquete_1: false, paquete_2: false, paquete_3: true },
  },
];

export function getFeatureIdsForPackage(packageId: PackageId): string[] {
  return PACKAGE_FEATURES.filter((feature) => feature.includedIn[packageId]).map((f) => f.id);
}

export function getRequiredPackageForServices(selectedServiceIds: string[]): PackageId {
  let highest: PackageId = 'paquete_1';
  for (const id of selectedServiceIds) {
    const feat = PACKAGE_FEATURES.find((f) => f.id === id);
    if (feat && PACKAGE_ORDER[feat.minPackage] > PACKAGE_ORDER[highest]) {
      highest = feat.minPackage;
    }
  }
  return highest;
}

export function getPackageById(packageId: PackageId): PackageDefinition {
  return PACKAGES_DATA.find((p) => p.id === packageId) || PACKAGES_DATA[0];
}
