import { PageComponentDef } from '@fwk/model/component-def/page-component-def';
import { AUSENTISMOS_SECURITY_DEF } from './security/ausentismos.security';
import { AUSENTISMOS_NAV_DEF } from './navigation/ausentismos.nav';
import { AUSENTISMOS_I18N_DEF } from './i18n/ausentismos.i18n';
import { AusentismosComponent } from './components/ausentismos.component';

export const AUSENTISMOS_DEF: PageComponentDef = {
    name: 'AUSENTISMOS',
    component: AusentismosComponent,
    i18n: AUSENTISMOS_I18N_DEF,
    navigation: AUSENTISMOS_NAV_DEF,
    security: AUSENTISMOS_SECURITY_DEF,
    backButton: false,
    actions: []
};
