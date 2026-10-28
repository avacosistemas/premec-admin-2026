import { PageComponentDef } from '@fwk/model/component-def/page-component-def';
import { RECIBOS_I18N_DEF } from './i18n/recibos.i18n';
import { RECIBOS_NAV_DEF } from './navigation/recibos.nav';
import { RECIBOS_SECURITY_DEF } from './security/recibos.security';
import { RecibosPageComponent } from './components/recibos-page.component';

export const RECIBOS_DEF: PageComponentDef = {
    name: 'RECIBOS',
    component: RecibosPageComponent,
    i18n: RECIBOS_I18N_DEF,
    navigation: RECIBOS_NAV_DEF,
    security: RECIBOS_SECURITY_DEF,
    backButton: false,
    hideHeader: true,
    actions: []
};
