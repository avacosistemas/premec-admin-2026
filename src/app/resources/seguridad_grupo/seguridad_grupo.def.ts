import { SEGURIDAD_GRUPO_CREATE_FORM_FIELDS_DEF } from './form/seguridad_grupo.create.fields';
import { SEGURIDAD_GRUPO_UPDATE_FORM_FIELDS_DEF } from './form/seguridad_grupo.update.fields';
import { SEGURIDAD_GRUPO_READ_FORM_FIELDS_DEF } from './form/seguridad_grupo.read.fields';
import { SEGURIDAD_GRUPO_FILTER_FORM_FIELDS_DEF } from './form/seguridad_grupo.filter.fields';
import { SEGURIDAD_GRUPO_SECURITY_DEF } from './security/seguridad_grupo.security';
import { SEGURIDAD_GRUPO_GRID_DEF } from './grid/seguridad_grupo.grid';
import { SEGURIDAD_GRUPO_I18N_DEF } from './i18n/seguridad_grupo.i18n';
import { SEGURIDAD_GRUPO_NAV_DEF } from './navigation/seguridad_grupo.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const SEGURIDAD_GRUPO_DEF: CrudDef = { 
    name: 'SEGURIDAD_GRUPO',
    i18n: SEGURIDAD_GRUPO_I18N_DEF,
    grid: SEGURIDAD_GRUPO_GRID_DEF,
    forms: {
        filter: SEGURIDAD_GRUPO_FILTER_FORM_FIELDS_DEF,
        create: SEGURIDAD_GRUPO_CREATE_FORM_FIELDS_DEF,
        update: SEGURIDAD_GRUPO_UPDATE_FORM_FIELDS_DEF,
        read:  SEGURIDAD_GRUPO_READ_FORM_FIELDS_DEF
    },
    navigation: SEGURIDAD_GRUPO_NAV_DEF,
    security: SEGURIDAD_GRUPO_SECURITY_DEF,
    ws: {
        key: 'SEGURIDAD_GRUPO_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'profiles'
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
