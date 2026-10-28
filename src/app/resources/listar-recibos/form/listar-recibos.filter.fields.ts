import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
import { PREFIX_DOMAIN_API } from "environments/environment";
export const LISTAR_RECIBOS_FILTER_FORM_FIELDS_DEF: DynamicField<any>[] = [
    {
        key: 'empleadosIds',
        labelKey: 'LISTAR_RECIBOS_FILTER_FORM_FIELDS_DEF_FIELD_empleado',
        controlType: 'select',
        options: {
            fromWs: {
                key: 'GRUPO_EMPLEADO_USUARIOS_URL',
                url: PREFIX_DOMAIN_API + 'grupoEmpleado/usuarios'
            },
            elementLabel: 'usuario',
            elementValue: 'idSap',
            multiple: true
        }
    },
    {
        key: 'year',
        labelKey: 'LISTAR_RECIBOS_FILTER_FORM_FIELDS_DEF_FIELD_year',
        controlType: 'number'
    },
    {
        key: 'meses',
        labelKey: 'LISTAR_RECIBOS_FILTER_FORM_FIELDS_DEF_FIELD_month',
        controlType: 'select',
        options: {
            handlerSourceData: false,
            elementLabel: 'label',
            elementValue: 'value',
            multiple: true,
            fromData: [
                { value: 1, label: 'Enero' },
                { value: 2, label: 'Febrero' },
                { value: 3, label: 'Marzo' },
                { value: 4, label: 'Abril' },
                { value: 5, label: 'Mayo' },
                { value: 6, label: 'Junio' },
                { value: 7, label: 'Julio' },
                { value: 8, label: 'Agosto' },
                { value: 9, label: 'Septiembre' },
                { value: 10, label: 'Octubre' },
                { value: 11, label: 'Noviembre' },
                { value: 12, label: 'Diciembre' },
            ]
        }
    },
    {
        key: 'tipoRecibo',
        labelKey: 'LISTAR_RECIBOS_FILTER_FORM_FIELDS_DEF_FIELD_tipo',
        label: 'Tipo de Recibo',
        controlType: 'select',
        options: {
            handlerSourceData: false,
            elementLabel: 'label',
            elementValue: 'value',
            fromData: [
                { value: '', label: 'Todos' },
                { value: 'Sueldo Jornal', label: 'Sueldo Jornal' },
                { value: 'Sueldo Mensual', label: 'Sueldo Mensual' },
                { value: 'SAC', label: 'SAC' },
                { value: 'Vacaciones Jornal', label: 'Vacaciones Jornal' },
                { value: 'Vacaciones Mensual', label: 'Vacaciones Mensual' },
                { value: 'Ajustes Retroactivos', label: 'Ajustes Retroactivos' },
                { value: 'Adelanto', label: 'Adelanto' },
                { value: 'Préstamo', label: 'Préstamo' }
            ]
        }
    },
    {
        key: 'firmado',
        labelKey: 'LISTAR_RECIBOS_FILTER_FORM_FIELDS_DEF_FIELD_firmado',
        controlType: 'select',
        options: {
            handlerSourceData: false,
            elementLabel: 'label',
            elementValue: 'value',
            fromData: [
                { value: null, label: 'Todos' },
                { value: true, label: 'Si' },
                { value: false, label: 'No' }
            ]
        }
    }
  
];
