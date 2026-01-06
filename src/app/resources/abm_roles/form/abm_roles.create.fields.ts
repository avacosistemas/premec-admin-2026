import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const ABM_ROLES_CREATE_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'name',
    labelKey: 'abm_roles_create_form_fields_def_field_name',
    label: 'Nombre',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'isSystemRole',
    labelKey: 'abm_roles_create_form_fields_def_field_issystemrole',
    label: 'System Role',
    type: 'check',
    controlType: 'checkbox'
  },
  {
    key: 'systemName',
    labelKey: 'abm_roles_create_form_fields_def_field_systemname',
    label: 'System Name',
    type: 'string',
    controlType: 'textbox'
  }
];
