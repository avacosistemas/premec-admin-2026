import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const ABM_ROLES_UPDATE_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'id',
    labelKey: 'ABM_ROLES_UPDATE_FORM_FIELDS_DEF_FIELD_id',
    label: 'Id',
    type: 'number',
    controlType: 'hidden'
  },
  {
    key: 'name',
    labelKey: 'ABM_ROLES_UPDATE_FORM_FIELDS_DEF_FIELD_name',
    label: 'Nombre',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'isSystemRole',
    labelKey: 'ABM_ROLES_UPDATE_FORM_FIELDS_DEF_FIELD_issystemrole',
    label: 'System Role',
    type: 'checkbox',
    controlType: 'checkbox'
  },
  {
    key: 'systemName',
    labelKey: 'ABM_ROLES_UPDATE_FORM_FIELDS_DEF_FIELD_systemname',
    label: 'System Name',
    type: 'string',
    controlType: 'textbox'
  }
];
