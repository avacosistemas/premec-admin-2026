import { SecurityDef } from "@fwk/model/component-def/security-def";

export const RECIBOS_SECURITY_DEF: SecurityDef = {
  readAccess: 'RECIBOS_SECURITY_READ',
  updateAccess: 'RECIBOS_SECURITY_UPDATE',
  createAccess: 'RECIBOS_SECURITY_CREATE',
  deleteAccess: 'RECIBOS_SECURITY_DELETE'
};
