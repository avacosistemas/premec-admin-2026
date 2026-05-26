import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
import { PREFIX_DOMAIN_API } from "environments/environment";
export const RECLAMO_FILTER_FORM_FIELDS_DEF: DynamicField<any>[] = [
    {
        key: 'serviceCallID',
        labelKey: 'RECLAMO_FILTER_FORM_FIELDS_DEF_FIELD_servicecallid',
        controlType: 'number'
    },
    {
        key: 'cliente',
        labelKey: 'Cliente',
        controlType: 'autocomplete',
        options: {
          transferIdToField: 'customerCode',
          elementLabel: 'nombre',
          elementValue: 'codigo',
          useNativeFilter: false,
          selectElementOrCleanField: 'Debe seleccionar un elemento o limpiar el campo'
        },
        apiOptions: {
          queryString: {
            nombre: 'cliente'
          },
          defaultShow: 20,
          url: PREFIX_DOMAIN_API + 'cliente/combo'
        }
    },
    {
        key: 'customerCode',
        controlType: 'hidden'
    },
    {
        key: 'estado',
        labelKey: 'RECLAMO_FILTER_FORM_FIELDS_DEF_FIELD_estadoreclamo',
        label: 'Estado',
        controlType: 'select',
        value: '',
        options: {
        handlerSourceData: false,
        elementLabel: 'label',
        elementValue: 'value',
        fromData: [ 
            {value: '', label: 'Todos' },
            {value: 'Abierto', label: 'Abierto' },
            {value: 'En Curso', label: 'En Curso' },
            {value: 'Cerrado', label: 'Cerrado' },
            {value: 'Rechazado', label: 'Rechazado' }
        ]
        }
    }
];