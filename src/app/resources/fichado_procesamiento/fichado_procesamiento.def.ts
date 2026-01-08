import { PageComponentDef } from '@fwk/model/component-def/page-component-def';
import { FICHADO_PROCESAMIENTO_SECURITY_DEF } from './security/fichado_procesamiento.security';
import { FICHADO_PROCESAMIENTO_NAV_DEF } from './navigation/fichado_procesamiento.nav';
import { FICHADO_PROCESAMIENTO_I18N_DEF } from './i18n/fichado_procesamiento.i18n';
import { FichadoProcesamientoComponent } from './components/fichado-procesamiento.component';

export const FICHADO_PROCESAMIENTO_DEF: PageComponentDef = {
    name: 'FICHADO_PROCESAMIENTO',
    component: FichadoProcesamientoComponent,
    i18n: FICHADO_PROCESAMIENTO_I18N_DEF,
    navigation: FICHADO_PROCESAMIENTO_NAV_DEF,
    security: FICHADO_PROCESAMIENTO_SECURITY_DEF,
    backButton: false,
    actions: [
        {
            actionNameKey: 'FICHADO_PROCESAMIENTO_RESULTADOS_SECTION_SEND_BUTTON',
            actionType: 'custom_send_sap',
            icon: 'heroicons_outline:paper-airplane',
            actionSecurity: FICHADO_PROCESAMIENTO_SECURITY_DEF.updateAccess,
            appearance: 'flat',
            hidden: true
        }
    ]
};