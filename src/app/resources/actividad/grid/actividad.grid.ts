import { GridDef } from "@fwk/model/component-def/grid-def";

export const ACTIVIDAD_GRID_DEF: GridDef = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'actividad_grid_def_column_id'
    },
    {
      columnDef: 'nombre',
      columnNameKey: 'actividad_grid_def_column_nombre'
    },
    {
      columnDef: 'tiposMatriculaSeleccionadas',
      columnNameKey: 'actividad_grid_def_column_TiposMatriculaSeleccionadas'
    },
    {
      columnDef: 'tiposMatriculaSeleccionadasString',
      columnNameKey: 'actividad_grid_def_column_TiposMatriculaSeleccionadasString'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'nombre',
    'tiposMatriculaSeleccionadasString'
  ]
};
