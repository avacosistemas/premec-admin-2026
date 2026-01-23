import { GridDef } from "@fwk/model/component-def/grid-def";

export const GRUPO_EMPLEADO_GRID_DEF: GridDef = {
  actionCellClass: '',
  groupActions: true,
  columnsDef: [
    {
        columnDef: 'nombre',
        columnNameKey: 'grupo_empleado_grid_def_column_nombre'
    }
],
  sortAllColumns: true,
  deleteAction: true,
  displayedColumns: [
    'nombre'
  ],
  actions: [],
};