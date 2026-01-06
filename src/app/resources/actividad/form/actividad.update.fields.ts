import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
import { PREFIX_DOMAIN_API } from "environments/environment";

export const ACTIVIDAD_UPDATE_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'id',
    labelKey: 'ACTIVIDAD_UPDATE_FORM_FIELDS_DEF_FIELD_id',
    label: 'Id',
    type: 'number',
    controlType: 'hidden'
  },
  {
    key: 'nombre',
    labelKey: 'ACTIVIDAD_UPDATE_FORM_FIELDS_DEF_FIELD_nombre',
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
