import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const ACTIVIDAD_FILTER_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'nombre',
    labelKey: 'ACTIVIDAD_FILTER_FORM_FIELDS_DEF_FIELD_nombre',
    label: 'Nombre',
    type: 'text',
    controlType: 'textbox'
  },
  {
    key: 'tiposMatriculaSeleccionadasString',
    labelKey: 'ACTIVIDAD_FILTER_FORM_FIELDS_DEF_FIELD_tiposMatriculaSeleccionadasString',
    label: 'Matrícula',
    type: 'text',
    controlType: 'textbox'
  }
];
