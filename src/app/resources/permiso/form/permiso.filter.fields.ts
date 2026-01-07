import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";

export const PERMISO_FILTER_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'codigo',
    labelKey: 'PERMISO_FILTER_FORM_FIELDS_DEF_FIELD_codigo',
    label: 'Codigo',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'nombre',
    labelKey: 'PERMISO_FILTER_FORM_FIELDS_DEF_FIELD_nombre',
    label: 'Nombre',
    type: 'string',
    controlType: 'textbox'
  }
];
