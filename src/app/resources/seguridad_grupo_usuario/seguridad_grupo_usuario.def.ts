import { SEGURIDAD_GRUPO_USUARIO_CREATE_FORM_FIELDS_DEF } from './form/seguridad_grupo_usuario.create.fields';
import { SEGURIDAD_GRUPO_USUARIO_FILTER_FORM_FIELDS_DEF } from './form/seguridad_grupo_usuario.filter.fields';
import { SEGURIDAD_GRUPO_USUARIO_SECURITY_DEF } from './security/seguridad_grupo_usuario.security';
import { SEGURIDAD_GRUPO_USUARIO_GRID_DEF } from './grid/seguridad_grupo_usuario.grid';
import { SEGURIDAD_GRUPO_USUARIO_I18N_DEF } from './i18n/seguridad_grupo_usuario.i18n';
import { SEGURIDAD_GRUPO_USUARIO_NAV_DEF } from './navigation/seguridad_grupo_usuario.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const SEGURIDAD_GRUPO_USUARIO_DEF: CrudDef = { 
    name: 'SEGURIDAD_GRUPO_USUARIO',
    i18n: SEGURIDAD_GRUPO_USUARIO_I18N_DEF,
    grid: SEGURIDAD_GRUPO_USUARIO_GRID_DEF,
    formsDef: {
        create: {
            showSubmitContinue: true,
            fields: SEGURIDAD_GRUPO_USUARIO_CREATE_FORM_FIELDS_DEF
        }
    },
    forms: {
        filter: SEGURIDAD_GRUPO_USUARIO_FILTER_FORM_FIELDS_DEF,
    },
    navigation: SEGURIDAD_GRUPO_USUARIO_NAV_DEF,
    security: SEGURIDAD_GRUPO_USUARIO_SECURITY_DEF,
    ws: {
        key: 'SEGURIDAD_GRUPO_USUARIO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'acceso'
    },
    dialogConfig: {
        width: '600px'
    },
    filterInMemory: false,
    backButton: true,
    serverPagination: false,
    pagination: {
        page: 0,
        pageSize: 10
    },
    cancelInitSearch: false
};
