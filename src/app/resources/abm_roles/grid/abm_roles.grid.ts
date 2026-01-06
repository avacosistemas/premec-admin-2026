import { GridDef } from "@fwk/model/component-def/grid-def";

export const ABM_ROLES_GRID_DEF: GridDef = { 
  columnsDef: [
    {
      columnDef: 'id',
      columnNameKey: 'abm_roles_grid_def_column_id'
    },
    {
      columnDef: 'name',
      columnNameKey: 'abm_roles_grid_def_column_name'
    },
    {
      columnDef: 'isSystemRole',
      columnNameKey: 'abm_roles_grid_def_column_issystemrole'
    },
    {
      columnDef: 'systemName',
      columnNameKey: 'abm_roles_grid_def_column_systemname'
    }
  ],
  sortAllColumns: true,
  deleteAction: true,
  displayedColumns: [
    'name',
    'isSystemRole',
    'systemName'
  ]
};
