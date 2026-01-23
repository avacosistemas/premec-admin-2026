import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
import { PREFIX_DOMAIN_API } from "environments/environment";
export const GRUPO_EMPLEADO_CREATE_FORM_FIELDS_DEF: DynamicField<any>[] = [
    {
        key: 'nombre',
        labelKey: 'GRUPO_EMPLEADO_CREATE_FORM_FIELDS_DEF_FIELD_nombre',
        controlType: 'textbox'
    },
    {
        key: 'usuarios',
        labelKey: 'GRUPO_EMPLEADO_CREATE_FORM_FIELDS_DEF_FIELD_usuarios',
        controlType: 'simple-pick-list',
        required: true,
        options: {
            fromWs: {
                key: 'GRUPO_EMPLEADO_USUARIOS_URL',
                url: PREFIX_DOMAIN_API + 'grupoEmpleado/usuarios'
            },
            elementLabel: 'usuario',
            elementValue: 'id'
        }
    }
];