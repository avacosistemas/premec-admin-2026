import { GridDef } from "@fwk/model/component-def/grid-def";

export const TIPO_PROBLEMA_MAQUINA_GRID_DEF: GridDef = {
  actionCellClass: '',
  groupActions: true,
  columnsDef: [
    {
        columnDef: 'nombre',
        columnNameKey: 'tipo_problema_maquina_grid_def_column_nombre'
    },
    {
        columnDef: 'tipoMaquina',
        columnNameKey: 'tipo_problema_maquina_grid_def_column_tipomaquina'
    }
],
  sortAllColumns: true,
  deleteAction: true,
  displayedColumns: [
    'nombre',
    'tipoMaquina'
  ],
  actions: [],
};