import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const PROBLEMA_MAQUINA_UPDATE_FORM_FIELDS_DEF: DynamicField<any>[] = [
    {
        key: 'id',
        labelKey: 'PROBLEMA_MAQUINA_UPDATE_FORM_FIELDS_DEF_FIELD_id',
        controlType: 'hidden',
        disabled: true
    },
    {
        key: 'nombre',
        labelKey: 'PROBLEMA_MAQUINA_UPDATE_FORM_FIELDS_DEF_FIELD_nombre',
        controlType: 'textbox',
        required: true
    },
    {
        key: 'idTipoProblemaMaquina',
        labelKey: 'PROBLEMA_MAQUINA_UPDATE_FORM_FIELDS_DEF_FIELD_idtipoproblema',
        controlType: 'hidden',
        mappingQuerystring: true
    }
];