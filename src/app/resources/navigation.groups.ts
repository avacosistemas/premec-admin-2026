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
        id: 'RECLAMOS',
        title: 'Reclamos',
        type: 'group',
        icon: 'heroicons_outline:hand-raised',
    },
    {
        id: 'menu_rrhh',
        title: 'RRHH',
        type: 'group',
        icon: 'heroicons_outline:calculator',
    },
    {
        id: 'seguridad',
        title: 'Seguridad',
        type: 'group',
        icon: 'heroicons_outline:shield-check',
    },
    {
        id: 'menu_servicios',
        title: 'Servicios',
        type: 'group',
        icon: 'heroicons_outline:wrench-screwdriver',
    }
];
