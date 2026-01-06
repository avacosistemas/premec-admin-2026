import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const BANNER_CREATE_FORM_FIELDS_DEF: DynamicField<any>[] = [
  {
    key: 'campaignId',
    labelKey: 'banner_create_form_fields_def_field_campaignid',
    label: 'ID Publicidad',
    type: 'string',
    controlType: 'hidden',
    mappingQuerystring : true
  },
  {
    key: 'urlImage',
    labelKey: 'banner_create_form_fields_def_field_urlimage',
    label: 'Imagen',
    controlType: 'url_input',
    required: true,
    minLength: 3,
    maxLength: 200,
    options: {
      resourceType: 'Images',
      requiredMessage: 'La URL del link es obligatoria.',
      invalidValueMessage: 'Por favor, introduce una URL de link válida.'
    },
    showPreview: true
  },
  {
    key: 'urlLink',
    labelKey: 'banner_create_form_fields_def_field_urllink',
    label: 'Link',
    controlType: 'url_input',
    required: true,
    minLength: 3,
    maxLength: 200,
    options: {
      resourceType: 'Images',
      requiredMessage: 'La URL del link es obligatoria.',
      invalidValueMessage: 'Por favor, introduce una URL de link válida.'
    },
    icon: 'link',
    showPreview: true
  },
  {
    key: 'alternativeText',
    labelKey: 'banner_create_form_fields_def_field_alternativetext',
    label: 'Texto Alternativo',
    type: 'string',
    controlType: 'textbox',
    maxLength: 500,
    colSpan: 3
  },
  {
    key: 'displayOrder',
    labelKey: 'banner_create_form_fields_def_field_displayorder',
    label: 'Orden',
    type: 'number',
    controlType: 'number',
    required: true,
    colSpan: 1
  },
  {
    key: 'isMainPage',
    labelKey: 'banner_create_form_fields_def_field_ismainpage',
    label: 'Mostrar en Home',
    type: 'boolean',
    controlType: 'checkbox',
    colSpan: 1
  },
  {
    key: 'isNewsletter',
    labelKey: 'banner_create_form_fields_def_field_isnewsletter',
    label: 'Mostrar en Newsletter',
    type: 'boolean',
    controlType: 'checkbox',
    colSpan: 1
  },
  {
    key: 'isSection',
    labelKey: 'banner_create_form_fields_def_field_issection',
    label: 'Mostrar en Sección',
    type: 'boolean',
    controlType: 'checkbox',
    colSpan: 1
  }
];
