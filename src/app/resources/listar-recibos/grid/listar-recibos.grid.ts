import { GridDef } from "@fwk/model/component-def/grid-def";
import { PREFIX_DOMAIN_API } from "environments/environment";

export const LISTAR_RECIBOS_GRID_DEF: GridDef = {
  actionCellClass: '',
  groupActions: false,
  columnsDef: [
    {
        columnDef: 'attachmentEntry',
        columnNameKey: 'listar_recibos_grid_def_column_attachmententry'
    },
    {
        columnDef: 'absEntry',
        columnNameKey: 'listar_recibos_grid_def_column_absentry'
    },
    {
        columnDef: 'year',
        columnNameKey: 'listar_recibos_grid_def_column_year'
    },
    {
        columnDef: 'month',
        columnNameKey: 'listar_recibos_grid_def_column_month'
    },
    {
        columnDef: 'monthString',
        columnNameKey: 'listar_recibos_grid_def_column_monthstring'
    },
    {
        columnDef: 'tipo',
        columnNameKey: 'listar_recibos_grid_def_column_tipo'
    },
    {
        columnDef: 'descripcion',
        columnNameKey: 'listar_recibos_grid_def_column_descripcion'
    },
    {
        columnDef: 'filePath',
        columnNameKey: 'listar_recibos_grid_def_column_filepath'
    },
    {
        columnDef: 'firmado',
        columnNameKey: 'listar_recibos_grid_def_column_firmado'
    },
    {
        columnDef: 'lineNum',
        columnNameKey: 'listar_recibos_grid_def_column_linenum'
    },
    {
        columnDef: 'empleado',
        columnNameKey: 'listar_recibos_grid_def_column_empleado'
    }
],
  sortAllColumns: true,
  deleteAction: false,
  displayedColumns: [
    'empleado',
    'monthString',
    'year',
    'tipo',
    'descripcion',
    'firmado'
  ],
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
      ]
};