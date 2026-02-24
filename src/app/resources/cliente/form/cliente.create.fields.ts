import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const CLIENTE_CREATE_FORM_FIELDS_DEF: DynamicField<any>[] = [
    {
        key: 'texto',
        labelKey: 'Al ingresar el CUIT del cliente se obtendrán sus datos de sap, se le creará un usuario para reclamos y se lo notificará con una contraseña generada automáticamente que el cliente deberá cambiar en su primer ingreso.',
        controlType: 'label'
    },
    {
        key: 'username',
        labelKey: 'CLIENTE_CREATE_FORM_FIELDS_DEF_FIELD_username',
        controlType: 'textbox'
    }
];