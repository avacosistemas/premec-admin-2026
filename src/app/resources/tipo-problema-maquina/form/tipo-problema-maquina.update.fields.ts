import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const TIPO_PROBLEMA_MAQUINA_UPDATE_FORM_FIELDS_DEF: DynamicField<any>[] = [
    {
        key: 'id',
        labelKey: 'TIPO_PROBLEMA_MAQUINA_UPDATE_FORM_FIELDS_DEF_FIELD_id',
        controlType: 'hidden',
        disabled: true
    },
    {
        key: 'nombre',
        labelKey: 'TIPO_PROBLEMA_MAQUINA_UPDATE_FORM_FIELDS_DEF_FIELD_nombre',
        controlType: 'textbox'
    },
    {
        key: 'tipoMaquina',
        labelKey: 'TIPO_PROBLEMA_MAQUINA_UPDATE_FORM_FIELDS_DEF_FIELD_tipomaquina',
        controlType: 'textbox'
    }
];