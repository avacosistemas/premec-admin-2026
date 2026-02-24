import { SecurityDef } from "@fwk/model/component-def/security-def";

export const CLIENTE_SECURITY_DEF: SecurityDef = {
  readAccess: 'CLIENTE_READ',
  updateAccess: null,
  createAccess: 'CLIENTE_CREATE',
  deleteAccess: null
};