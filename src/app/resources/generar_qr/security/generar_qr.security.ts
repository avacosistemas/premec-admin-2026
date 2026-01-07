import { SecurityDef } from "@fwk/model/component-def/security-def";

export const GENERAR_QR_SECURITY_DEF: SecurityDef = {
    readAccess: 'GENERAR_QR_READ',
    updateAccess: 'GENERAR_QR_UPDATE',
    createAccess: 'GENERAR_QR_CREATE',
    deleteAccess: 'GENERAR_QR_DELETE'
};