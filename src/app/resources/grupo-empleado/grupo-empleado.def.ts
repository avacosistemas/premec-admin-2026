import { GRUPO_EMPLEADO_CREATE_FORM_FIELDS_DEF } from './form/grupo-empleado.create.fields';
import { GRUPO_EMPLEADO_UPDATE_FORM_FIELDS_DEF } from './form/grupo-empleado.update.fields';
import { GRUPO_EMPLEADO_FILTER_FORM_FIELDS_DEF } from './form/grupo-empleado.filter.fields';
import { GRUPO_EMPLEADO_SECURITY_DEF } from './security/grupo-empleado.security';
import { GRUPO_EMPLEADO_GRID_DEF } from './grid/grupo-empleado.grid';
import { GRUPO_EMPLEADO_I18N_DEF } from './i18n/grupo-empleado.i18n';
import { GRUPO_EMPLEADO_NAV_DEF } from './navigation/grupo-empleado.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const GRUPO_EMPLEADO_DEF: CrudDef = { 
    name: 'GRUPO_EMPLEADO',
    i18n: GRUPO_EMPLEADO_I18N_DEF,
    grid: GRUPO_EMPLEADO_GRID_DEF, 
    forms: {
        filter: GRUPO_EMPLEADO_FILTER_FORM_FIELDS_DEF, 
        
        create: GRUPO_EMPLEADO_CREATE_FORM_FIELDS_DEF,
        
        update: GRUPO_EMPLEADO_UPDATE_FORM_FIELDS_DEF,
        
        
    },
    navigation: GRUPO_EMPLEADO_NAV_DEF,
    security: GRUPO_EMPLEADO_SECURITY_DEF,
    ws: {
        key: 'GRUPO_EMPLEADO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'grupoEmpleado'
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