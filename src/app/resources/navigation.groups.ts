import { FuseNavigationItem } from '@fuse/components/navigation';

export interface NavigationGroup extends FuseNavigationItem {
    id: string;
    title: string;
    type: 'group';
    icon?: string;
    children?: FuseNavigationItem[];
}

export const NAVIGATION_GROUPS_MAP: NavigationGroup[] = [
    {
        id: 'estadisticas',
        title: 'Estadísticas',
        type: 'group',
        icon: 'heroicons_outline:chart-pie',
    },
    {
        id: 'gestion-contenido',
        title: 'Gestión de Contenido',
        type: 'group',
        icon: 'heroicons_outline:table-cells',
    },
    {
        id: 'herramientas',
        title: 'Herramientas',
        type: 'group',
        icon: 'heroicons_outline:wrench-screwdriver',
    },
    {
        id: 'matricula',
        title: 'Matrículas',
        type: 'group',
        icon: 'heroicons_outline:users',
    },
    {
        id: 'perfil-profesional',
        title: 'Perfil Profesional',
        type: 'group',
        icon: 'heroicons_outline:identification',
    },
    {
        id: 'revistas-notas',
        title: 'Revistas Notas',
        type: 'group',
        icon: 'heroicons_outline:book-open',
    },
    {
        id: 'seguridad',
        title: 'Seguridad',
        type: 'group',
        icon: 'heroicons_outline:shield-check',
    },
    {
        id: 'sistema',
        title: 'Sistema',
        type: 'group',
        icon: 'heroicons_outline:cog-6-tooth',
    },
    {
        id: 'ventas',
        title: 'Ventas',
        type: 'group',
        icon: 'heroicons_outline:shopping-cart',
    }
];
