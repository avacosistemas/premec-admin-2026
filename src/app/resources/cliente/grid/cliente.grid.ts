import { GridDef } from "@fwk/model/component-def/grid-def";

export const CLIENTE_GRID_DEF: GridDef = {
  actionCellClass: '',
  groupActions: false,
  columnsDef: [
    {
        columnDef: 'nombre',
        columnNameKey: 'cliente_grid_def_column_nombre'
    },
    {
        columnDef: 'username',
        columnNameKey: 'cliente_grid_def_column_username'
    },
    {
        columnDef: 'requiereCambioPassword',
        columnNameKey: 'cliente_grid_def_column_requierecambiopassword'
    },
    {
        columnDef: 'bloqueado',
        columnNameKey: 'cliente_grid_def_column_bloqueado'
    },
    {
        columnDef: 'intentosFallidosLogin',
        columnNameKey: 'cliente_grid_def_column_intentosfallidoslogin'
    },
    {
        columnDef: 'email',
        columnNameKey: 'cliente_grid_def_column_email'
    }
],
  sortAllColumns: true,
  deleteAction: false,
  displayedColumns: [
    'nombre',
    'username',
    'requiereCambioPassword',
    'bloqueado',
    'intentosFallidosLogin',
    'email'
  ],
  actions: [],
};