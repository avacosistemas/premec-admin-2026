import { LISTAR_RECIBOS_FILTER_FORM_FIELDS_DEF } from './form/listar-recibos.filter.fields';
import { LISTAR_RECIBOS_SECURITY_DEF } from './security/listar-recibos.security';
import { LISTAR_RECIBOS_GRID_DEF } from './grid/listar-recibos.grid';
import { LISTAR_RECIBOS_I18N_DEF } from './i18n/listar-recibos.i18n';
import { LISTAR_RECIBOS_NAV_DEF } from './navigation/listar-recibos.nav';
import { CrudDef } from '@fwk/model/component-def/crud-def';
import { PREFIX_DOMAIN_API } from 'environments/environment';

export const LISTAR_RECIBOS_DEF: CrudDef = { 
    name: 'LISTAR_RECIBOS',
    i18n: LISTAR_RECIBOS_I18N_DEF,
    grid: LISTAR_RECIBOS_GRID_DEF, 
    forms: {
        filter: LISTAR_RECIBOS_FILTER_FORM_FIELDS_DEF, 
    },
    navigation: LISTAR_RECIBOS_NAV_DEF,
    security: LISTAR_RECIBOS_SECURITY_DEF,
    ws: {
        key: 'LISTAR_RECIBOS_CRUD_URL',
        url: PREFIX_DOMAIN_API + 'listarRecibos'
    },
    bulkDownload: {
        ws: {
            key: 'DOWNLOAD_GRUPO_RECIBOS_WS',
            url: PREFIX_DOMAIN_API + 'descargarGrupoRecibos',
            method: 'POST'
        },
        title: 'Descargar grupo de recibos',
        icon: 'heroicons_outline:arrow-down-tray',
        minSelection: 2
    },
    dialogConfig: {
        width: '600px'
    },
    
    filterInMemory: false,
    serverPagination: true,
    pagination: {
        page: 0,
        pageSize: 10
    },
    cancelInitSearch: true
};
