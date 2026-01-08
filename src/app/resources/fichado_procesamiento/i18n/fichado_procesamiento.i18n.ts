import { I18n } from "@fwk/model/i18n";

export const FICHADO_PROCESAMIENTO_I18N_DEF: I18n = {
    name: 'FICHADO_PROCESAMIENTO_I18N_DEF',
    lang: 'es',
    words: {
        page_title: 'Procesamiento de Fichados',
        fichado_procesamiento_nav_def: 'Procesar Fichados',
        
        FICHADO_PROCESAMIENTO_TITULO: 'Procesamiento de Fichados',
        FICHADO_PROCESAMIENTO_ENVIANDO: 'Enviando a SAP...',
        FICHADO_PROCESAMIENTO_PROCESANDO: 'Procesando archivo...',
        
        FICHADO_PROCESAMIENTO_CARGA_SECTION_SELECT_EXCEL: 'Seleccionar archivo Excel (.xlsx, .xls)',
        FICHADO_PROCESAMIENTO_CARGA_SECTION_PROCESS_BUTTON: 'Procesar Archivo',
        
        FICHADO_PROCESAMIENTO_RESULTADOS_SECTION_SEND_BUTTON: 'Enviar a SAP',
        
        FICHADO_PROCESAMIENTO_TABLE_EMPLEADO_LEGAJO: 'Legajo',
        FICHADO_PROCESAMIENTO_TABLE_EMPLEADO_NOMBRE_COMPLETO: 'Nombre Completo',
        
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_DIA: 'Día',
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_FECHA: 'Fecha',
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_ENTRADA1: 'Entrada 1',
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_SALIDA1: 'Salida 1',
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_ENTRADA2: 'Entrada 2',
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_SALIDA2: 'Salida 2',
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_TOTAL_DIA: 'Total',
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_DESCANSO: 'Descanso',
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_NORMAL: 'Normal',
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_EXTRA50: 'Extra 50%',
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_EXTRA100: 'Extra 100%',
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_TARDE: 'Tarde',
        FICHADO_PROCESAMIENTO_TABLE_DETALLE_COMENTARIOS: 'Comentarios',
        
        FICHADO_PROCESAMIENTO_MSG_SELECT_FILE: 'Por favor, seleccione un archivo de Excel.',
        FICHADO_PROCESAMIENTO_MSG_SUCCESS_PROCESS: 'Excel procesado correctamente.',
        FICHADO_PROCESAMIENTO_MSG_ERROR_PROCESS: 'Error al procesar el archivo Excel.',
        FICHADO_PROCESAMIENTO_MSG_ERROR_BASE64: 'Error al leer el archivo.',
        FICHADO_PROCESAMIENTO_MSG_NO_DATA: 'No hay datos procesados para enviar.',
        FICHADO_PROCESAMIENTO_MSG_SUCCESS_SEND: 'Datos enviados a SAP correctamente.',
        FICHADO_PROCESAMIENTO_MSG_ERROR_SEND: 'Error al enviar los datos a SAP.',
    }
};