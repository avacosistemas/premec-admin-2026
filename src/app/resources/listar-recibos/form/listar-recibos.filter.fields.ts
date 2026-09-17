import { DynamicField } from "@fwk/model/dynamic-form/dynamic-field";
import { PREFIX_DOMAIN_API } from "environments/environment";
export const LISTAR_RECIBOS_FILTER_FORM_FIELDS_DEF: DynamicField<any>[] = [
    {
        key: 'empleado',
        labelKey: 'LISTAR_RECIBOS_FILTER_FORM_FIELDS_DEF_FIELD_empleado',
        controlType: 'simple-pick-list',
        options: {
            fromWs: {
                key: 'GRUPO_EMPLEADO_USUARIOS_URL',
                url: PREFIX_DOMAIN_API + 'grupoEmpleado/usuarios'
            },
            elementLabel: 'usuario',
            elementValue: 'id'
        }
    },
    {
        key: 'month',
        labelKey: 'LISTAR_RECIBOS_FILTER_FORM_FIELDS_DEF_FIELD_month',
        controlType: 'number'
    },
    {
        key: 'year',
        labelKey: 'LISTAR_RECIBOS_FILTER_FORM_FIELDS_DEF_FIELD_year',
        controlType: 'number'
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