import { DATEPICKER, DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
export const HORAS_MAQUINA_EXCESO_RESETEO_FILTER_FORM_FIELDS_DEF: DynamicField<any>[] = [
    {
        key: 'fechaDesde',
        labelKey: 'HORAS_MAQUINA_EXCESO_RESETEO_FILTER_FORM_FIELDS_DEF_FIELD_fechaDesde',
        controlType: DATEPICKER
    },
    {
        key: 'fechaHasta',
        labelKey: 'HORAS_MAQUINA_EXCESO_RESETEO_FILTER_FORM_FIELDS_DEF_FIELD_fechaHasta',
        controlType: DATEPICKER
    },
    {
        key: 'internalSerialNum',
        labelKey: 'HORAS_MAQUINA_EXCESO_RESETEO_FILTER_FORM_FIELDS_DEF_FIELD_internalserialnum',
        controlType: 'textbox'
    },
    {
        key: 'serviceCallId',
        labelKey: 'HORAS_MAQUINA_EXCESO_RESETEO_FILTER_FORM_FIELDS_DEF_FIELD_servicecallid',
        controlType: 'number'
    },
    {
        key: 'tipo',
        labelKey: 'HORAS_MAQUINA_EXCESO_RESETEO_FILTER_FORM_FIELDS_DEF_FIELD_tipo',
        controlType: 'select',
        options: {
        handlerSourceData: false,
        elementLabel: 'label',
        elementValue: 'value',
        fromData: [
            { value: '', label: 'Todos' },
            { value: 'EXCESO', label: 'Exceso' },
            { value: 'RESETEO', label: 'Reseteo' }
            ]
        }
    }
];