import { NavigationDef } from "@fwk/model/component-def/navigation-def";

export const CLIENTE_NAV_DEF: NavigationDef = {
    id: 'RECLAMOS.cliente',
    translateKey: 'cliente_nav_def',
    url: '/cliente',
    icon: 'heroicons_outline:user-circle',
    group: 'RECLAMOS',
    order: 1,
    showInMenu: true
};