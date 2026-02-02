import { GridDef } from "@fwk/model/component-def/grid-def";

export const HORAS_MAQUINA_EXCESO_RESETEO_GRID_DEF: GridDef = {
  actionCellClass: '',
  groupActions: true,
  columnsDef: [
    {
        columnDef: 'internalSerialNum',
        columnNameKey: 'horas_maquina_exceso_reseteo_grid_def_column_internalserialnum'
    },
    {
        columnDef: 'maximoMensual',
        columnNameKey: 'horas_maquina_exceso_reseteo_grid_def_column_maximomensual'
    },
    {
        columnDef: 'serviceCallId',
        columnNameKey: 'horas_maquina_exceso_reseteo_grid_def_column_servicecallid'
    },
    {
        columnDef: 'fechaAnteriorString',
        columnNameKey: 'horas_maquina_exceso_reseteo_grid_def_column_fechaanterior'
    },
    {
        columnDef: 'hsMaqAnterior',
        columnNameKey: 'horas_maquina_exceso_reseteo_grid_def_column_hsmaqanterior'
    },
    {
        columnDef: 'fechaActualString',
        columnNameKey: 'horas_maquina_exceso_reseteo_grid_def_column_fechaactual'
    },
    {
        columnDef: 'horasMaquinaActual',
        columnNameKey: 'horas_maquina_exceso_reseteo_grid_def_column_horasmaquinaactual'
    },
    {
        columnDef: 'promedio',
        columnNameKey: 'horas_maquina_exceso_reseteo_grid_def_column_promedio'
    },
    {
        columnDef: 'tipo',
        columnNameKey: 'horas_maquina_exceso_reseteo_grid_def_column_tipo'
    },
    {
        columnDef: 'horasMaquinaExcedidas',
        columnNameKey: 'horas_maquina_exceso_reseteo_grid_def_column_horasMaquinaExcedidas'
    }

],
  sortAllColumns: true,
  deleteAction: false,
  displayedColumns: [
    'tipo',
    'serviceCallId',
    'internalSerialNum',
    'maximoMensual',
    'fechaAnteriorString',
    'hsMaqAnterior',
    'fechaActualString',
    'horasMaquinaActual',
    'horasMaquinaExcedidas'
    // 'promedio',
    
  ],
  actions: [],
};