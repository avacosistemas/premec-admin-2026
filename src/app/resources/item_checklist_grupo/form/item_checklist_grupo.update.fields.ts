import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";

export const ITEM_CHECKLIST_GRUPO_UPDATE_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'idGrupo',
    labelKey: 'ITEM_CHECKLIST_GRUPO_UPDATE_FORM_FIELDS_DEF_FIELD_idgrupo',
    label: 'Id',
    type: 'number',
    controlType: 'hidden'
  },
  {
    key: 'id',
    labelKey: 'ITEM_CHECKLIST_GRUPO_UPDATE_FORM_FIELDS_DEF_FIELD_id',
    label: 'idItemChecklist',
    type: 'number',
    controlType: 'hidden'
  },
  {
    key: 'nombre',
    labelKey: 'ITEM_CHECKLIST_GRUPO_UPDATE_FORM_FIELDS_DEF_FIELD_nombre',
    label: 'nombre',
    type: 'text',
    controlType: 'textbox'
  },
  {
    key: 'orden',
    labelKey: 'ITEM_CHECKLIST_GRUPO_UPDATE_FORM_FIELDS_DEF_FIELD_orden',
    label: 'Orden',
    type: 'text',
    controlType: 'textbox'
  }
];
