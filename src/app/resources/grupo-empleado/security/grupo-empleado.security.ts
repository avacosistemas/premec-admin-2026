import { SecurityDef } from "@fwk/model/component-def/security-def";

export const GRUPO_EMPLEADO_SECURITY_DEF: SecurityDef = {
  readAccess: 'GRUPO_EMPLEADO_READ',
  updateAccess: 'GRUPO_EMPLEADO_UPDATE',
  createAccess: 'GRUPO_EMPLEADO_CREATE',
  deleteAccess: null
};