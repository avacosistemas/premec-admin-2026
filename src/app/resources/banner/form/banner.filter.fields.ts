import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const BANNER_FILTER_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'urlImage',
    labelKey: 'BANNER_FILTER_FORM_FIELDS_DEF_FIELD_urlimage',
    label: 'Imagen',
    type: 'string',
    controlType: 'textbox'
  },
  {
    key: 'campaignId',
    labelKey: 'BANNER_FILTER_FORM_FIELDS_DEF_FIELD_campaignId',
    label: 'Boletin',
    type: 'string',
    controlType: 'textbox',
    filterType: 'equals',
    mappingQuerystring: true
  },
  {
    key: 'parentTitle',
    controlType: 'hidden'
  }
];
