import { GridDef } from "@fwk/model/component-def/grid-def";

export const RECLAMO_GRID_DEF: GridDef = {
  actionCellClass: '',
  groupActions: false,
  columnsDef: [
    {
        columnDef: 'customerCode',
        columnNameKey: 'reclamo_grid_def_column_customercode'
    },
    {
        columnDef: 'serviceCallID',
        columnNameKey: 'reclamo_grid_def_column_servicecallid'
    },
    {
        columnDef: 'asunto',
        columnNameKey: 'reclamo_grid_def_column_asunto'
    },
    {
        columnDef: 'estadoReclamo',
        columnNameKey: 'reclamo_grid_def_column_estadoreclamo'
    },
    {
        columnDef: 'fechaCreacion',
        columnNameKey: 'reclamo_grid_def_column_fechacreacion'
    },
    {
        columnDef: 'fechaInicioActividad',
        columnNameKey: 'reclamo_grid_def_column_fechainicioactividad'
    },
    {
        columnDef: 'fechaFinActividad',
        columnNameKey: 'reclamo_grid_def_column_fechafinactividad'
    },
    {
        columnDef: 'internalSN',
        columnNameKey: 'reclamo_grid_def_column_internalsn'
    },
    {
        columnDef: 'itemCode',
        columnNameKey: 'reclamo_grid_def_column_itemcode'
    },
    {
        columnDef: 'itemName',
        columnNameKey: 'reclamo_grid_def_column_itemname'
    },
    {
        columnDef: 'motivoRechazo',
        columnNameKey: 'reclamo_grid_def_column_motivorechazo'
    }
],
  sortAllColumns: true,
  deleteAction: false,
  displayedColumns: [
    'serviceCallID',
    'customerCode',
    // 'asunto',
    'estadoReclamo',
    'fechaCreacion',
    'fechaInicioActividad',
    'fechaFinActividad',
    'internalSN',
    'itemCode',
    'itemName',
    'motivoRechazo'
  ],
  actions: [],
};