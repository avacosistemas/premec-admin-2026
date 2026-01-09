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
        {
            columnDef: 'descripcion',
            columnNameKey: 'recibos_grid_column_descripcion'
        },
        {
            columnDef: 'filePath',
            columnNameKey: 'recibos_grid_column_filepath'
        },
    ],

    displayedColumns: [
        'attachmentEntry',
        'year',
        'monthString',
        'tipo',
        'descripcion',
    ],
    sortAllColumns: true,

    actions: [
        {
            actionNameKey: 'recibos_grid_action_download_receipt',
            actionType: 'file_download',
            icon: 'heroicons_outline:arrow-down-tray',
            ws: {
                key: 'DOWNLOAD_RECIBO_WS',
                url: PREFIX_DOMAIN_API + 'descargarRecibo',
                method: 'GET',
                querystring: {
                    attachmentEntry: 'attachmentEntry',
                    year: 'year',
                    month: 'month',
                    monthString: 'monthString',
                    tipo: 'tipo',
                    descripcion: 'descripcion',
                    filePath: 'filePath'
                }
            }
        },
    ],
    deleteAction: false
};

