import { PageComponentDef } from '@fwk/model/component-def/page-component-def';
import { GENERAR_QR_SECURITY_DEF } from './security/generar_qr.security';
import { GENERAR_QR_NAV_DEF } from './navigation/generar_qr.nav';
import { GENERAR_QR_I18N_DEF } from './i18n/generar_qr.i18n';
import { GenerarQrComponent } from './components/generar-qr.component';

export const GENERAR_QR_DEF: PageComponentDef = {
    name: 'GENERAR_QR',
    component: GenerarQrComponent,
    i18n: GENERAR_QR_I18N_DEF,
    navigation: GENERAR_QR_NAV_DEF,
    security: GENERAR_QR_SECURITY_DEF,
    
    backButton: false, 
    actions: [] 
};