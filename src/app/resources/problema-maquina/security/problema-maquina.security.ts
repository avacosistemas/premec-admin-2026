import { SecurityDef } from "@fwk/model/component-def/security-def";

export const PROBLEMA_MAQUINA_SECURITY_DEF: SecurityDef = {
  readAccess: 'PROBLEMA_MAQUINA_READ',
  updateAccess: 'PROBLEMA_MAQUINA_UPDATE',
  createAccess: 'PROBLEMA_MAQUINA_CREATE',
  deleteAccess: 'PROBLEMA_MAQUINA_DELETE'
};