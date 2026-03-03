import { PROBLEMA_MAQUINA_CREATE_FORM_FIELDS_DEF } from './form/problema-maquina.create.fields';
import { PROBLEMA_MAQUINA_UPDATE_FORM_FIELDS_DEF } from './form/problema-maquina.update.fields';
import { PROBLEMA_MAQUINA_FILTER_FORM_FIELDS_DEF } from './form/problema-maquina.filter.fields';
import { PROBLEMA_MAQUINA_SECURITY_DEF } from './security/problema-maquina.security';
import { PROBLEMA_MAQUINA_GRID_DEF } from './grid/problema-maquina.grid';
import { PROBLEMA_MAQUINA_I18N_DEF } from './i18n/problema-maquina.i18n';
import { PROBLEMA_MAQUINA_NAV_DEF } from './navigation/problema-maquina.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const PROBLEMA_MAQUINA_DEF: CrudDef = { 
    name: 'PROBLEMA_MAQUINA',
    i18n: PROBLEMA_MAQUINA_I18N_DEF,
    grid: PROBLEMA_MAQUINA_GRID_DEF, 
    forms: {
        filter: PROBLEMA_MAQUINA_FILTER_FORM_FIELDS_DEF, 
        
        create: PROBLEMA_MAQUINA_CREATE_FORM_FIELDS_DEF,
        
        update: PROBLEMA_MAQUINA_UPDATE_FORM_FIELDS_DEF,
        
        
    },
    navigation: PROBLEMA_MAQUINA_NAV_DEF,
    security: PROBLEMA_MAQUINA_SECURITY_DEF,
    ws: {
        key: 'PROBLEMA_MAQUINA_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'problemaMaquina'
    },
    dialogConfig: {
        width: '600px'
    },
    
    filterInMemory: false,
    serverPagination: false,
    pagination: {
        page: 0,
        pageSize: 10
    },
    cancelInitSearch: false,
    backButton: true,
};