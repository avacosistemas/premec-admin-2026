import { TIPO_PROBLEMA_MAQUINA_CREATE_FORM_FIELDS_DEF } from './form/tipo-problema-maquina.create.fields';
import { TIPO_PROBLEMA_MAQUINA_UPDATE_FORM_FIELDS_DEF } from './form/tipo-problema-maquina.update.fields';
import { TIPO_PROBLEMA_MAQUINA_FILTER_FORM_FIELDS_DEF } from './form/tipo-problema-maquina.filter.fields';
import { TIPO_PROBLEMA_MAQUINA_SECURITY_DEF } from './security/tipo-problema-maquina.security';
import { TIPO_PROBLEMA_MAQUINA_GRID_DEF } from './grid/tipo-problema-maquina.grid';
import { TIPO_PROBLEMA_MAQUINA_I18N_DEF } from './i18n/tipo-problema-maquina.i18n';
import { TIPO_PROBLEMA_MAQUINA_NAV_DEF } from './navigation/tipo-problema-maquina.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const TIPO_PROBLEMA_MAQUINA_DEF: CrudDef = { 
    name: 'TIPO_PROBLEMA_MAQUINA',
    i18n: TIPO_PROBLEMA_MAQUINA_I18N_DEF,
    grid: TIPO_PROBLEMA_MAQUINA_GRID_DEF, 
    forms: {
        filter: TIPO_PROBLEMA_MAQUINA_FILTER_FORM_FIELDS_DEF, 
        
        create: TIPO_PROBLEMA_MAQUINA_CREATE_FORM_FIELDS_DEF,
        
        update: TIPO_PROBLEMA_MAQUINA_UPDATE_FORM_FIELDS_DEF,
        
        
    },
    navigation: TIPO_PROBLEMA_MAQUINA_NAV_DEF,
    security: TIPO_PROBLEMA_MAQUINA_SECURITY_DEF,
    ws: {
        key: 'TIPO_PROBLEMA_MAQUINA_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'tipoProblemaMaquina'
    },
    dialogConfig: {
        width: '600px'
    },
    
    filterInMemory: true,
    serverPagination: false,
    pagination: {
        page: 0,
        pageSize: 10
    },
    cancelInitSearch: false
};