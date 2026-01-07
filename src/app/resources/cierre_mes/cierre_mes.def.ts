import { PageComponentDef } from '@fwk/model/component-def/page-component-def';
import { CIERRE_MES_SECURITY_DEF } from './security/cierre_mes.security';
import { CIERRE_MES_NAV_DEF } from './navigation/cierre_mes.nav';
import { CIERRE_MES_I18N_DEF } from './i18n/cierre_mes.i18n';
import { CierreMesComponent } from './components/cierre-mes.component';

export const CIERRE_MES_DEF: PageComponentDef = {
    name: 'CIERRE_MES',
    component: CierreMesComponent,
    i18n: CIERRE_MES_I18N_DEF,
    navigation: CIERRE_MES_NAV_DEF,
    security: CIERRE_MES_SECURITY_DEF,
    backButton: false,
     actions: [
        {
            actionNameKey: 'cierre_mes_guardar',
            actionType: 'custom_save_cierres',
            icon: 'heroicons_outline:check-circle',
            actionSecurity: CIERRE_MES_SECURITY_DEF.updateAccess,
            hidden: true
        }
    ]
};