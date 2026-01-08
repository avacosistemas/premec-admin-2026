import { FuseNavigationItem } from '@fuse/components/navigation';

export interface NavigationGroup extends FuseNavigationItem {
    id: string;
    title: string;
    type: 'collapsable';
    icon?: string;
    children?: FuseNavigationItem[];
}

export const NAVIGATION_GROUPS_MAP: NavigationGroup[] = [
    {
        id: 'seguridad',
        title: 'Seguridad',
        type: 'collapsable',
        icon: 'heroicons_outline:shield-check',
    },
];
