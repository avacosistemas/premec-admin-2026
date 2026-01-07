import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";

export const SEGURIDAD_GRUPO_FILTER_FORM_FIELDS_DEF: DynamicField<any>[] = [
  // {
  //   key: 'id',
  //   labelKey: 'SEGURIDAD_GRUPO_FILTER_FORM_FIELDS_DEF_FIELD_id',
  //   label: 'Id',
  //   type: 'number',
  //   controlType: 'number'
  // },
  {
    key: 'nombre',
    labelKey: 'SEGURIDAD_GRUPO_FILTER_FORM_FIELDS_DEF_FIELD_nombre',
    label: 'Nombre',
    type: 'string',
    controlType: 'textbox'
  }
];
