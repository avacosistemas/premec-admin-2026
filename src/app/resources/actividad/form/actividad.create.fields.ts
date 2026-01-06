import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
import { PREFIX_DOMAIN_API } from "environments/environment";

export const ACTIVIDAD_CREATE_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'nombre',
    labelKey: 'actividad_create_form_fields_def_field_nombre',
    label: 'Nombre',
    type: 'text',
    controlType: 'textbox'
  },
  {
    key: 'tiposMatriculaSeleccionadas',
    labelKey: 'Seleccionados',
    controlType: 'simple-pick-list',
    options: {
      compositeKey: ['id'],
      elementLabel: 'nombre',
      titleFrom: 'Tipos de Matrícula',
      titleTo: 'Seleccionados',
      fromWs: {
          key: 'matricula_tipos_ws',
          url: PREFIX_DOMAIN_API + 'MatriculaTipo'
      }
    }
  }
];
