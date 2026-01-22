import { SEGURIDAD_GRUPO_USUARIO_NAV_DEF } from "../../seguridad_grupo_usuario/navigation/seguridad_grupo_usuario.nav";
import { GridDef } from "@fwk/model/component-def/grid-def";
import { PREFIX_DOMAIN_API } from "environments/environment";
import { HTTP_METHODS } from "@fwk/model/ws-def";

export const USUARIOS_GRID_DEF: GridDef = {
  columnsDef: [
    {
      columnDef: 'id',
      id: true,
      columnNameKey: 'usuarios_grid_def_column_id'
    },
    {
      columnDef: 'username',
      columnNameKey: 'usuarios_grid_def_column_username'
    },
    {
      columnDef: 'name',
      columnNameKey: 'usuarios_grid_def_column_name'
    },
    {
      columnDef: 'lastname',
      columnNameKey: 'usuarios_grid_def_column_lastname'
    },
    {
      columnDef: 'email',
      columnNameKey: 'usuarios_grid_def_column_email'
    },
    {
      columnDef: 'enabled',
      columnNameKey: 'usuarios_grid_def_column_enabled'
    },
    {
      columnDef: 'usuariosap',
      columnNameKey: 'usuarios_grid_def_column_usuariosap'
    },
    {
      columnDef: 'admin',
      columnNameKey: 'usuarios_grid_def_column_admin'
    },
    {
      columnDef: 'deposito',
      columnNameKey: 'usuarios_grid_def_column_deposito'
    },
    {
      columnDef: 'legajoFichaje',
      columnNameKey: 'usuarios_grid_def_column_legajo'
    }
  ],
  sortAllColumns: true,
  deleteAction: true,
  displayedColumns: [
    'id',
    'username',
    'name',
    'lastname',
    'usuariosap',
    'deposito',
    'legajoFichaje',
    'email',
    'enabled',
    'admin'
  ],
  actions: [
      {
        actionNameKey: 'Permisos',
        actionType: 'redirect',
        redirect: {
          url: SEGURIDAD_GRUPO_USUARIO_NAV_DEF.url,
          querystring: {
            idUsuario : 'id',
            parentTitle: 'username'
          }
        },
        icon: 'heroicons_outline:key'
      },
      {
        actionNameKey: 'usuarios_action_reset_password',
        actionType: 'normal',
        icon: 'heroicons_outline:lock-closed',
        confirm: {
          messageKey: 'usuarios_action_reset_password_confirm'
        },
        ws: {
          key: 'RESET_PASSWORD_USER',
          url: PREFIX_DOMAIN_API + 'password/reset', 
          method: HTTP_METHODS.post
        }
      }
    ]
};
