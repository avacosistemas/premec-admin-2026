import { SecurityDef } from "@fwk/model/component-def/security-def";

export const NOVEDADES_CONTADOR_SECURITY_DEF: SecurityDef = {
    readAccess: 'NOVEDADES_CONTADOR_READ',
    updateAccess: 'NOVEDADES_CONTADOR_UPDATE',
    createAccess: 'NOVEDADES_CONTADOR_CREATE',
    deleteAccess: 'NOVEDADES_CONTADOR_DELETE'
};