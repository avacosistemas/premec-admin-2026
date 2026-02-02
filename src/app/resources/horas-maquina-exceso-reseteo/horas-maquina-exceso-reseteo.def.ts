import { HORAS_MAQUINA_EXCESO_RESETEO_FILTER_FORM_FIELDS_DEF } from './form/horas-maquina-exceso-reseteo.filter.fields';
import { HORAS_MAQUINA_EXCESO_RESETEO_SECURITY_DEF } from './security/horas-maquina-exceso-reseteo.security';
import { HORAS_MAQUINA_EXCESO_RESETEO_GRID_DEF } from './grid/horas-maquina-exceso-reseteo.grid';
import { HORAS_MAQUINA_EXCESO_RESETEO_I18N_DEF } from './i18n/horas-maquina-exceso-reseteo.i18n';
import { HORAS_MAQUINA_EXCESO_RESETEO_NAV_DEF } from './navigation/horas-maquina-exceso-reseteo.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const HORAS_MAQUINA_EXCESO_RESETEO_DEF: CrudDef = { 
    name: 'HORAS_MAQUINA_EXCESO_RESETEO',
    i18n: HORAS_MAQUINA_EXCESO_RESETEO_I18N_DEF,
    grid: HORAS_MAQUINA_EXCESO_RESETEO_GRID_DEF, 
    forms: {
        filter: HORAS_MAQUINA_EXCESO_RESETEO_FILTER_FORM_FIELDS_DEF, 
        
        
        
        
        
        
    },
    navigation: HORAS_MAQUINA_EXCESO_RESETEO_NAV_DEF,
    security: HORAS_MAQUINA_EXCESO_RESETEO_SECURITY_DEF,
    ws: {
        key: 'HORAS_MAQUINA_EXCESO_RESETEO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'horasMaquinaExcesoReseteo'
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
    cancelInitSearch: false
};