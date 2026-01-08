import { SecurityDef } from "@fwk/model/component-def/security-def";

export const RECIBOS_PROCESAMIENTO_SECURITY_DEF: SecurityDef = {
    readAccess: 'RECIBOS_PROCESAMIENTO_READ',
    updateAccess: 'RECIBOS_PROCESAMIENTO_UPDATE',
    createAccess: 'RECIBOS_PROCESAMIENTO_CREATE',
    deleteAccess: 'RECIBOS_PROCESAMIENTO_DELETE'
};