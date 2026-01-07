import { NavigationDef } from "@fwk/model/component-def/navigation-def";

export const USUARIOS_NAV_DEF: NavigationDef = {
  id: 'seguridad.usuarios',
  translateKey: 'usuarios_nav_def',
  url: '/users',
  icon: 'heroicons_outline:users',
  group: 'seguridad',
  showInMenu: true
};
