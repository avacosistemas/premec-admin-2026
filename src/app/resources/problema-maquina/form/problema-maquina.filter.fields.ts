import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const PROBLEMA_MAQUINA_FILTER_FORM_FIELDS_DEF: DynamicField<any>[] = [
    {
        key: 'nombre',
        labelKey: 'PROBLEMA_MAQUINA_FILTER_FORM_FIELDS_DEF_FIELD_nombre',
        controlType: 'textbox',
        required: true
    },
    {
        key: 'idTipoProblemaMaquina',
        controlType: 'hidden',
        required: true
    }
];