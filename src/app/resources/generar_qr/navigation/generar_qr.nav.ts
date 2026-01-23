import { NavigationDef } from "@fwk/model/component-def/navigation-def";

export const GENERAR_QR_NAV_DEF: NavigationDef = {
    id: 'generarQr',
    translateKey: 'generar_qr_nav_def',
    url: '/generar-qr',
    icon: 'heroicons_outline:qr-code',
    group: 'menu_servicios',
    showInMenu: true,
    order: 3
};