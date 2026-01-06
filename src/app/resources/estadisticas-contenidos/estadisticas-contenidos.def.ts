import { ESTADISTICAS_CONTENIDOS_SECURITY_DEF } from './security/estadisticas-matriculas.security';
import { ESTADISTICAS_CONTENIDOS_I18N_DEF } from './i18n/estadisticas-contenidos.i18n';
import { ESTADISTICAS_CONTENIDOS_NAV_DEF } from './navigation/estadisticas-contenidos.nav';
import { ESTADISTICAS_CONTENIDOS_LAYOUT_DEF } from './layout/estadisticas-contenidos.layout';
import { CrudDef } from '@fwk/model/component-def/crud-def';

export const ESTADISTICAS_CONTENIDOS_DEF: CrudDef = { 
    name: 'ESTADISTICAS_CONTENIDOS',
    i18n: ESTADISTICAS_CONTENIDOS_I18N_DEF,
    navigation: ESTADISTICAS_CONTENIDOS_NAV_DEF,
    security: ESTADISTICAS_CONTENIDOS_SECURITY_DEF,
    dashboardConfig: ESTADISTICAS_CONTENIDOS_LAYOUT_DEF,
};