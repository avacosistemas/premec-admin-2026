import { GridDef } from "@fwk/model/component-def/grid-def";

import { PREFIX_DOMAIN_API } from 'environments/environment';

export const RECIBOS_GRID_DEF: GridDef = {
    columnsDef: [
        {
            columnDef: 'attachmentEntry',
            columnNameKey: 'recibos_grid_column_attachmentEntry',
            id: true
        },
        {
            columnDef: 'year',
            columnNameKey: 'recibos_grid_column_year'
        },
        {
            columnDef: 'month',
            columnNameKey: 'recibos_grid_column_month',
        },
        {
            columnDef: 'monthString',
            columnNameKey: 'recibos_grid_column_monthString'
        },
        {
            columnDef: 'tipo',
            columnNameKey: 'recibos_grid_column_tipo'
        },
    ],

    displayedColumns: [
        'attachmentEntry',
        'year',
        'monthString',
        'tipo',
    ],
    sortAllColumns: true,

    actions: [
        {
            actionNameKey: 'recibos_grid_action_download_receipt',
            actionType: 'file-download',
            icon: 'file_download',

            ws: {
                key: 'DOWNLOAD_RECIBO_WS',
                url: PREFIX_DOMAIN_API + 'descargarRecibo',
                method: 'GET',
                querystring: {
                    attachmentEntry: 'attachmentEntry',
                    year: 'year',
                    month: 'month',
                    monthString: 'monthString',
                    tipo: 'tipo'
                }
            }
        },
    ],
    deleteAction: false
};

