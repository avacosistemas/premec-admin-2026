import { PageComponentDef } from '@fwk/model/component-def/page-component-def';
import { EstadisticasClienteComponent } from './component/estadisticas-cliente.component';
import { ESTADISTICAS_CLIENTE_I18N_DEF } from './i18n/estadisticas-cliente.i18n';
import { ESTADISTICAS_CLIENTE_NAV_DEF } from './navigation/estadisticas-cliente.nav';
import { ESTADISTICAS_CLIENTE_SECURITY_DEF } from './security/estadisticas-cliente.security';

export const ESTADISTICAS_CLIENTE_DEF: PageComponentDef = {
    name: 'ESTADISTICAS_CLIENTE',
    i18n: ESTADISTICAS_CLIENTE_I18N_DEF,
    navigation: ESTADISTICAS_CLIENTE_NAV_DEF,
    security: ESTADISTICAS_CLIENTE_SECURITY_DEF,
    component: EstadisticasClienteComponent,
};
