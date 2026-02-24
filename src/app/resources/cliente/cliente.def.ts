import { CLIENTE_CREATE_FORM_FIELDS_DEF } from './form/cliente.create.fields';
import { CLIENTE_FILTER_FORM_FIELDS_DEF } from './form/cliente.filter.fields';
import { CLIENTE_SECURITY_DEF } from './security/cliente.security';
import { CLIENTE_GRID_DEF } from './grid/cliente.grid';
import { CLIENTE_I18N_DEF } from './i18n/cliente.i18n';
import { CLIENTE_NAV_DEF } from './navigation/cliente.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const CLIENTE_DEF: CrudDef = { 
    name: 'CLIENTE',
    i18n: CLIENTE_I18N_DEF,
    grid: CLIENTE_GRID_DEF, 
    forms: {
        filter: CLIENTE_FILTER_FORM_FIELDS_DEF, 
        
        create: CLIENTE_CREATE_FORM_FIELDS_DEF,
        
        
        
        
    },
    navigation: CLIENTE_NAV_DEF,
    security: CLIENTE_SECURITY_DEF,
    ws: {
        key: 'CLIENTE_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'cliente'
    },
    dialogConfig: {
        width: '600px'
    },
    
    filterInMemory: true,
    serverPagination: false,
    pagination: {
        page: 0,
        pageSize: 50
    },
    cancelInitSearch: false
};