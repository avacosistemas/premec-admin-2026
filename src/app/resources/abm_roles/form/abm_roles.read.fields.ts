import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const ABM_ROLES_READ_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'id',
    labelKey: 'ABM_ROLES_READ_FORM_FIELDS_DEF_FIELD_id',
    label: 'Id',
    type: 'number',
    disabled: true,
    controlType: 'number'
  },
  {
    key: 'Name',
    labelKey: 'ABM_ROLES_READ_FORM_FIELDS_DEF_FIELD_name',
    label: 'Nombre',
    type: 'string',
    disabled: true,
    controlType: 'textbox'
  },
  {
    key: 'IsSystemRole',
    labelKey: 'ABM_ROLES_READ_FORM_FIELDS_DEF_FIELD_issystemrole',
    label: 'System Role',
    type: 'string',
    disabled: true,
    controlType: 'textbox'
  },
  {
    key: 'SystemName',
    labelKey: 'ABM_ROLES_READ_FORM_FIELDS_DEF_FIELD_systemname',
    label: 'System Name',
    type: 'string',
    disabled: true,
    controlType: 'textbox'
  }
];
