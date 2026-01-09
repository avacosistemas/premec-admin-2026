import { PageComponentDef } from '@fwk/model/component-def/page-component-def';
import { INDICADORES_MENSUALES_GENERAL_SECURITY_DEF } from './security/indicadores_mensuales_general.security';
import { INDICADORES_MENSUALES_GENERAL_NAV_DEF } from './navigation/indicadores_mensuales_general.nav';
import { INDICADORES_MENSUALES_GENERAL_I18N_DEF } from './i18n/indicadores_mensuales_general.i18n';
import { IndicadoresMensualesGeneralComponent } from './components/indicadores-mensuales-general.component';

export const INDICADORES_MENSUALES_GENERAL_DEF: PageComponentDef = {
    name: 'INDICADORES_MENSUALES_GENERAL',
    component: IndicadoresMensualesGeneralComponent,
    i18n: INDICADORES_MENSUALES_GENERAL_I18N_DEF,
    navigation: INDICADORES_MENSUALES_GENERAL_NAV_DEF,
    security: INDICADORES_MENSUALES_GENERAL_SECURITY_DEF,
    backButton: false,
    actions: []
};