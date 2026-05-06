import { GridDef } from "@fwk/model/component-def/grid-def";

export const PROBLEMA_MAQUINA_GRID_DEF: GridDef = {
  actionCellClass: '',
  groupActions: true,
  columnsDef: [
    {
        columnDef: 'nombre',
        columnNameKey: 'problema_maquina_grid_def_column_nombre'
    }
],
  sortAllColumns: true,
  deleteAction: true,
  displayedColumns: [
    'nombre'
  ],
  actions: [],
};