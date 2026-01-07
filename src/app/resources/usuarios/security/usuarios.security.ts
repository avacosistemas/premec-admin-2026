import { SecurityDef } from "@fwk/model/component-def/security-def";

export const USUARIOS_SECURITY_DEF: SecurityDef = {
  readAccess: 'USUARIOS_READ',
  updateAccess: 'USUARIOS_UPDATE',
  createAccess: 'USUARIOS_CREATE',
  deleteAccess: 'USUARIOS_DELETE'
};
