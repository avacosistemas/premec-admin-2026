import { REPORTE_HORAS_MAQUINA_FILTER_FORM_FIELDS_DEF } from './form/reporte_horas_maquina.filter.fields';
import { REPORTE_HORAS_MAQUINA_SECURITY_DEF } from './security/reporte_horas_maquina.security';
import { REPORTE_HORAS_MAQUINA_GRID_DEF } from './grid/reporte_horas_maquina.grid';
import { REPORTE_HORAS_MAQUINA_I18N_DEF } from './i18n/reporte_horas_maquina.i18n';
import { REPORTE_HORAS_MAQUINA_NAV_DEF } from './navigation/reporte_horas_maquina.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const REPORTE_HORAS_MAQUINA_DEF: CrudDef = { 
    name: 'REPORTE_HORAS_MAQUINA',
    i18n: REPORTE_HORAS_MAQUINA_I18N_DEF,
    grid: REPORTE_HORAS_MAQUINA_GRID_DEF,
    forms: {
        filter: REPORTE_HORAS_MAQUINA_FILTER_FORM_FIELDS_DEF,
    },
    navigation: REPORTE_HORAS_MAQUINA_NAV_DEF,
    security: REPORTE_HORAS_MAQUINA_SECURITY_DEF,
    ws: {
        key: 'REPORTE_HORAS_MAQUINA_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'horasMaquinaReporte'
    },
    dialogConfig: {
        width: '400px'
    },
    filterInMemory: true,
    serverPagination: false,
    pagination: {
        page: 0,
        pageSize: 10
    },
    cancelInitSearch: false
};
