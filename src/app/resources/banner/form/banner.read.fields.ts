import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const BANNER_READ_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'id',
    labelKey: 'BANNER_READ_FORM_FIELDS_DEF_FIELD_id',
    label: 'ID',
    type: 'string',
    disabled: true,
    controlType: 'textbox'
  },
  {
    key: 'campaignId',
    labelKey: 'BANNER_READ_FORM_FIELDS_DEF_FIELD_campaignid',
    label: 'ID Publicidad',
    type: 'string',
    disabled: true,
    controlType: 'textbox'
  },
  {
    key: 'urlImage',
    labelKey: 'BANNER_READ_FORM_FIELDS_DEF_FIELD_urlimage',
    label: 'Imagen',
    type: 'string',
    disabled: true,
    controlType: 'textbox'
  },
  {
    key: 'urlLink',
    labelKey: 'BANNER_READ_FORM_FIELDS_DEF_FIELD_urllink',
    label: 'Link',
    type: 'string',
    disabled: true,
    controlType: 'textbox'
  },
  {
    key: 'alternativeText',
    labelKey: 'BANNER_READ_FORM_FIELDS_DEF_FIELD_alternativetext',
    label: 'Texto Alternativo',
    type: 'string',
    disabled: true,
    controlType: 'textbox'
  },
  {
    key: 'displayOrder',
    labelKey: 'BANNER_READ_FORM_FIELDS_DEF_FIELD_displayorder',
    label: 'Orden',
    type: 'number',
    disabled: true,
    controlType: 'number'
  },
  {
    key: 'isMainPage',
    labelKey: 'BANNER_READ_FORM_FIELDS_DEF_FIELD_ismainpage',
    label: 'Mostrar en Home',
    type: 'boolean',
    disabled: true,
    controlType: 'checkbox'
  },
  {
    key: 'isNewsletter',
    labelKey: 'BANNER_READ_FORM_FIELDS_DEF_FIELD_isnewsletter',
    label: 'Mostrar en Newsletter',
    type: 'boolean',
    disabled: true,
    controlType: 'checkbox'
  },
  {
    key: 'isSection',
    labelKey: 'BANNER_READ_FORM_FIELDS_DEF_FIELD_issection',
    label: 'Mostrar en Sección',
    type: 'boolean',
    disabled: true,
    controlType: 'checkbox'
  }
];
