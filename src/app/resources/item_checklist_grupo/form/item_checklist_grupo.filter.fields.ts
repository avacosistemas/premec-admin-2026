import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";

export const ITEM_CHECKLIST_GRUPO_FILTER_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'idGrupo',
    labelKey: 'ITEM_CHECKLIST_GRUPO_FILTER_FORM_FIELDS_DEF_FIELD_idgrupo',
    label: 'Id',
    type: 'number',
    controlType: 'hidden'
  },
  {
    key: 'parentTitle',
    controlType: 'hidden'
  },
];
