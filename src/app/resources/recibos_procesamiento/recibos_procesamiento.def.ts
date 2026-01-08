import { PageComponentDef } from '@fwk/model/component-def/page-component-def';
import { RECIBOS_PROCESAMIENTO_SECURITY_DEF } from './security/recibos_procesamiento.security';
import { RECIBOS_PROCESAMIENTO_NAV_DEF } from './navigation/recibos_procesamiento.nav';
import { RECIBOS_PROCESAMIENTO_I18N_DEF } from './i18n/recibos_procesamiento.i18n';
import { RecibosProcesamientoComponent } from './components/recibos-procesamiento.component';

export const RECIBOS_PROCESAMIENTO_DEF: PageComponentDef = {
    name: 'RECIBOS_PROCESAMIENTO',
    component: RecibosProcesamientoComponent,
    i18n: RECIBOS_PROCESAMIENTO_I18N_DEF,
    navigation: RECIBOS_PROCESAMIENTO_NAV_DEF,
    security: RECIBOS_PROCESAMIENTO_SECURITY_DEF,
    backButton: false,
    actions: [
        {
            actionNameKey: 'recibos_proc_enviar_action',
            actionType: 'recibos_proc_enviar',
            icon: 'heroicons_outline:paper-airplane',
            actionSecurity: RECIBOS_PROCESAMIENTO_SECURITY_DEF.updateAccess,
            hidden: true,
            appearance: 'flat'
        }
    ]
};