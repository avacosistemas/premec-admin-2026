import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const CLIENTE_FILTER_FORM_FIELDS_DEF: DynamicField<any>[] = [
    {
        key: 'nombre',
        labelKey: 'CLIENTE_FILTER_FORM_FIELDS_DEF_FIELD_nombre',
        controlType: 'textbox'
    },
    {
        key: 'username',
        labelKey: 'CLIENTE_FILTER_FORM_FIELDS_DEF_FIELD_username',
        controlType: 'textbox'
    },
    {
        key: 'email',
        labelKey: 'CLIENTE_FILTER_FORM_FIELDS_DEF_FIELD_email',
        controlType: 'email'
    }
];