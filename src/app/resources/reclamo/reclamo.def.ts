import { RECLAMO_READ_FORM_FIELDS_DEF } from './form/reclamo.read.fields';
import { RECLAMO_FILTER_FORM_FIELDS_DEF } from './form/reclamo.filter.fields';
import { RECLAMO_SECURITY_DEF } from './security/reclamo.security';
import { RECLAMO_GRID_DEF } from './grid/reclamo.grid';
import { RECLAMO_I18N_DEF } from './i18n/reclamo.i18n';
import { RECLAMO_NAV_DEF } from './navigation/reclamo.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const RECLAMO_DEF: CrudDef = { 
    name: 'RECLAMO',
    i18n: RECLAMO_I18N_DEF,
    grid: RECLAMO_GRID_DEF, 
    forms: {
        filter: RECLAMO_FILTER_FORM_FIELDS_DEF,
        read: RECLAMO_READ_FORM_FIELDS_DEF
    },
    navigation: RECLAMO_NAV_DEF,
    security: RECLAMO_SECURITY_DEF,
    ws: {
        key: 'RECLAMO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'reclamo'
    },
    dialogConfig: {
        width: '600px'
    },
    
    filterInMemory: false,
    serverPagination: true,
    pagination: {
        page: 1,
        pageSize: 10
    },
    cancelInitSearch: false
};