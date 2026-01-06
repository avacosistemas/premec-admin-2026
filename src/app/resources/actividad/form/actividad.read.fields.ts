import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const ACTIVIDAD_READ_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'id',
    labelKey: 'ACTIVIDAD_READ_FORM_FIELDS_DEF_FIELD_id',
    label: 'Id',
    type: 'number',
    disabled: true,
    controlType: 'number'
  },
  {
    key: 'nombre',
    labelKey: 'ACTIVIDAD_READ_FORM_FIELDS_DEF_FIELD_nombre',
    label: 'Nombre',
    type: 'text',
    disabled: true,
    controlType: 'textbox'
  }
];
