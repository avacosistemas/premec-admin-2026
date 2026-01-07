import { ITEM_CHECKLIST_GRUPO_CREATE_FORM_FIELDS_DEF } from './form/item_checklist_grupo.create.fields';
import { ITEM_CHECKLIST_GRUPO_UPDATE_FORM_FIELDS_DEF } from './form/item_checklist_grupo.update.fields';
import { ITEM_CHECKLIST_GRUPO_READ_FORM_FIELDS_DEF } from './form/item_checklist_grupo.read.fields';
import { ITEM_CHECKLIST_GRUPO_FILTER_FORM_FIELDS_DEF } from './form/item_checklist_grupo.filter.fields';
import { ITEM_CHECKLIST_GRUPO_SECURITY_DEF } from './security/item_checklist_grupo.security';
import { ITEM_CHECKLIST_GRUPO_GRID_DEF } from './grid/item_checklist_grupo.grid';
import { ITEM_CHECKLIST_GRUPO_I18N_DEF } from './i18n/item_checklist_grupo.i18n';
import { ITEM_CHECKLIST_GRUPO_NAV_DEF } from './navigation/item_checklist_grupo.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const ITEM_CHECKLIST_GRUPO_DEF: CrudDef = { 
    name: 'ITEM_CHECKLIST_GRUPO',
    i18n: ITEM_CHECKLIST_GRUPO_I18N_DEF,
    grid: ITEM_CHECKLIST_GRUPO_GRID_DEF,
    forms: {
        filter: ITEM_CHECKLIST_GRUPO_FILTER_FORM_FIELDS_DEF,
        create: ITEM_CHECKLIST_GRUPO_CREATE_FORM_FIELDS_DEF,
        update: ITEM_CHECKLIST_GRUPO_UPDATE_FORM_FIELDS_DEF,
        read:  ITEM_CHECKLIST_GRUPO_READ_FORM_FIELDS_DEF
    },
    navigation: ITEM_CHECKLIST_GRUPO_NAV_DEF,
    security: ITEM_CHECKLIST_GRUPO_SECURITY_DEF,
    ws: {
        key: 'ITEM_CHECKLIST_GRUPO_CRUD_URL',
        url:  PREFIX_DOMAIN_API + 'itemChecklistGrupo'
    },
    dialogConfig: {
        width: '400px'
    },
    filterInMemory: false,
    backButton: true,
    serverPagination: true,
    pagination: {
        page: 0,
        pageSize: 10
    },
    cancelInitSearch: false
};
