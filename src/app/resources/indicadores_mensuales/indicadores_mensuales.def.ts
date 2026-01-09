import { PageComponentDef } from '@fwk/model/component-def/page-component-def';
import { INDICADORES_MENSUALES_SECURITY_DEF } from './security/indicadores_mensuales.security';
import { INDICADORES_MENSUALES_NAV_DEF } from './navigation/indicadores_mensuales.nav';
import { INDICADORES_MENSUALES_I18N_DEF } from './i18n/indicadores_mensuales.i18n';
import { IndicadoresMensualesComponent } from './components/indicadores-mensuales.component';

export const INDICADORES_MENSUALES_DEF: PageComponentDef = {
    name: 'INDICADORES_MENSUALES',
    component: IndicadoresMensualesComponent,
    i18n: INDICADORES_MENSUALES_I18N_DEF,
    navigation: INDICADORES_MENSUALES_NAV_DEF,
    security: INDICADORES_MENSUALES_SECURITY_DEF,
    backButton: false,
    actions: []
};