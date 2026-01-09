import { GridDef } from "@fwk/model/component-def/grid-def";

import { ITEM_CHECKLIST_GRUPO_NAV_DEF } from "../../item_checklist_grupo/navigation/item_checklist_grupo.nav";

export const GRUPOS_TIPO_ACTIVIDAD_GRID_DEF: GridDef = {
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'grupos_tipo_actividad_grid_def_column_idgrupo'
    },
    {
      columnDef: 'tipo',
      columnNameKey: 'grupos_tipo_actividad_grid_def_column_tipoactividad'
    },
    {
      columnDef: 'tipoString',
      columnNameKey: 'grupos_tipo_actividad_grid_def_column_tipoactividad'
    },
    {
      columnDef: 'tipoActividadString',
      columnNameKey: 'grupos_tipo_actividad_grid_def_column_tipoactividad'
    },
    {
      columnDef: 'titulo',
      columnNameKey: 'grupos_tipo_actividad_grid_def_column_titulo'
    },
    {
      columnDef: 'tituloTipo',
      columnNameKey: 'grupos_tipo_actividad_grid_def_column_tipoTitulo'
    },
    {
      columnDef: 'orden',
      columnNameKey: 'grupos_tipo_actividad_grid_def_column_orden'
    }
  ],
  sortAllColumns: true,
  displayedColumns: [
    'tipoString',
    'titulo',
    'orden'
  ],
  deleteAction: true,
  actions: [ 
    {
      actionNameKey: 'grupos_tipo_actividad_grid_def_button_action_items',
      icon: 'heroicons_outline:list-bullet',
      actionType: 'redirect',
      redirect: {
        url: ITEM_CHECKLIST_GRUPO_NAV_DEF.url,
        querystring: {
          idGrupo : 'id',
          parentTitle: 'tituloTipo'
        }
      }
    }
  ]
};
