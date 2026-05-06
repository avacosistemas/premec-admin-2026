import { GridDef } from "@fwk/model/component-def/grid-def";
import { PROBLEMA_MAQUINA_NAV_DEF } from "app/resources/problema-maquina/navigation/problema-maquina.nav";

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
   actions: [ 
      {
        actionNameKey: 'tipo_problema_grid_def_button_action_problemas',
        icon: 'heroicons_outline:list-bullet',
        actionType: 'redirect',
        redirect: {
          url: PROBLEMA_MAQUINA_NAV_DEF.url,
          querystring: {
            idTipoProblemaMaquina : 'id',
            parentTitle: 'nombre'
          }
        }
      }
    ]
};