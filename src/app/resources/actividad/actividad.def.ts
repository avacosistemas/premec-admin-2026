import { ACTIVIDAD_CREATE_FORM_FIELDS_DEF } from './form/actividad.create.fields';
import { ACTIVIDAD_UPDATE_FORM_FIELDS_DEF } from './form/actividad.update.fields';
import { ACTIVIDAD_READ_FORM_FIELDS_DEF } from './form/actividad.read.fields';
import { ACTIVIDAD_FILTER_FORM_FIELDS_DEF } from './form/actividad.filter.fields';
import { ACTIVIDAD_SECURITY_DEF } from './security/actividad.security';
import { ACTIVIDAD_GRID_DEF } from './grid/actividad.grid';
import { ACTIVIDAD_I18N_DEF } from './i18n/actividad.i18n';
import { ACTIVIDAD_NAV_DEF } from './navigation/actividad.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const ACTIVIDAD_DEF: CrudDef = { 
    name: 'ACTIVIDAD',
    i18n: ACTIVIDAD_I18N_DEF,
    grid: ACTIVIDAD_GRID_DEF,
    forms: {
        filter: ACTIVIDAD_FILTER_FORM_FIELDS_DEF,
        create: ACTIVIDAD_CREATE_FORM_FIELDS_DEF,
        update: ACTIVIDAD_UPDATE_FORM_FIELDS_DEF,
        read:  ACTIVIDAD_READ_FORM_FIELDS_DEF
    },
    navigation: ACTIVIDAD_NAV_DEF,
    security: ACTIVIDAD_SECURITY_DEF,
    ws: {
        key: 'ACTIVIDAD_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'actividad'
    },
    dialogConfig: {
        width: '600px'
    },
    filterInMemory: false,
    serverPagination: true,
    cancelInitSearch: false, 
    pagination: {
        page: 0,
        pageSize: 10
    }
};
