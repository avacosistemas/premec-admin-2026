import { PageComponentDef } from '@fwk/model/component-def/page-component-def';
import { NOVEDADES_CONTADOR_SECURITY_DEF } from './security/novedades_contador.security';
import { NOVEDADES_CONTADOR_NAV_DEF } from './navigation/novedades_contador.nav';
import { NOVEDADES_CONTADOR_I18N_DEF } from './i18n/novedades_contador.i18n';
import { NovedadesContadorComponent } from './components/novedades-contador.component';

export const NOVEDADES_CONTADOR_DEF: PageComponentDef = {
    name: 'NOVEDADES_CONTADOR',
    component: NovedadesContadorComponent,
    i18n: NOVEDADES_CONTADOR_I18N_DEF,
    navigation: NOVEDADES_CONTADOR_NAV_DEF,
    security: NOVEDADES_CONTADOR_SECURITY_DEF,
    backButton: false,
    actions: [
        {
            actionNameKey: 'novedades_contador_guardar',
            actionType: 'custom_save_novedades',
            icon: 'heroicons_outline:check-circle',
            actionSecurity: NOVEDADES_CONTADOR_SECURITY_DEF.updateAccess,
            appearance: 'flat',
            hidden: true
        }
    ]
};