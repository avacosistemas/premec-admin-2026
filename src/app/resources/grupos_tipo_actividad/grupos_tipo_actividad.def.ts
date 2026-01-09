import { GRUPOS_TIPO_ACTIVIDAD_CREATE_FORM_FIELDS_DEF } from './form/grupos_tipo_actividad.create.fields';
import { GRUPOS_TIPO_ACTIVIDAD_UPDATE_FORM_FIELDS_DEF } from './form/grupos_tipo_actividad.update.fields';
import { GRUPOS_TIPO_ACTIVIDAD_READ_FORM_FIELDS_DEF } from './form/grupos_tipo_actividad.read.fields';
import { GRUPOS_TIPO_ACTIVIDAD_FILTER_FORM_FIELDS_DEF } from './form/grupos_tipo_actividad.filter.fields';
import { GRUPOS_TIPO_ACTIVIDAD_SECURITY_DEF } from './security/grupos_tipo_actividad.security';
import { GRUPOS_TIPO_ACTIVIDAD_GRID_DEF } from './grid/grupos_tipo_actividad.grid';
import { GRUPOS_TIPO_ACTIVIDAD_I18N_DEF } from './i18n/grupos_tipo_actividad.i18n';
import { GRUPOS_TIPO_ACTIVIDAD_NAV_DEF } from './navigation/grupos_tipo_actividad.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const GRUPOS_TIPO_ACTIVIDAD_DEF: CrudDef = {
    name: 'GRUPOS_TIPO_ACTIVIDAD',
    i18n: GRUPOS_TIPO_ACTIVIDAD_I18N_DEF,
    grid: GRUPOS_TIPO_ACTIVIDAD_GRID_DEF,
    forms: {
        filter: GRUPOS_TIPO_ACTIVIDAD_FILTER_FORM_FIELDS_DEF,
        create: GRUPOS_TIPO_ACTIVIDAD_CREATE_FORM_FIELDS_DEF,
        update: GRUPOS_TIPO_ACTIVIDAD_UPDATE_FORM_FIELDS_DEF,
        read: GRUPOS_TIPO_ACTIVIDAD_READ_FORM_FIELDS_DEF
    },
    navigation: GRUPOS_TIPO_ACTIVIDAD_NAV_DEF,
    security: GRUPOS_TIPO_ACTIVIDAD_SECURITY_DEF,
    ws: {
        key: 'GRUPOS_TIPO_ACTIVIDAD_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'grupoTipoActividad'
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
