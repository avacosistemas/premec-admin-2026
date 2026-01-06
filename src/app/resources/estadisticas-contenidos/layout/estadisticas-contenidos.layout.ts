import { DashboardLayoutDef } from '@fwk/model/component-def/dashboard-def';
import { PREFIX_STATS_API } from 'environments/environment';

export const ESTADISTICAS_CONTENIDOS_INSCRIPCIONES_A_CURSOS_POR_MESANIO_FILTERS = [
    {
        value: 'ALL',
        viewValue: 'Desde siempre'
    },
    {
        value: '1ANIO',
        viewValue: '1 Año'
    },
    {
        value: '6MESES',
        viewValue: '6 Meses'
    },
    {
        value: '2MESES',
        viewValue: '2 Meses'
    },
    {
        value: '1MES',
        viewValue: '1 Mes'
    }
];

export const ESTADISTICAS_CONTENIDOS_CONTENIDOS_POR_MES_ANIO_FILTERS = [
    {
        value: 'ALL',
        viewValue: 'Desde siempre'
    },
    {
        value: '1ANIO',
        viewValue: '1 Año'
    },
    {
        value: '6MESES',
        viewValue: '6 Meses'
    },
    {
        value: '2MESES',
        viewValue: '2 Meses'
    },
    {
        value: '1MES',
        viewValue: '1 Mes'
    }
];

export const ESTADISTICAS_CONTENIDOS_BOLETINES_POR_MES_ANIO_FILTERS = [
    {
        value: 'ALL',
        viewValue: 'Desde siempre'
    },
    {
        value: '1ANIO',
        viewValue: '1 Año'
    },
    {
        value: '6MESES',
        viewValue: '6 Meses'
    },
    {
        value: '2MESES',
        viewValue: '2 Meses'
    },
    {
        value: '1MES',
        viewValue: '1 Mes'
    }
];

export const ESTADISTICAS_CONTENIDOS_LAYOUT_DEF: DashboardLayoutDef = {
    pageIdentifier: 'estadisticas-contenidos',
    sectionTitleKey: 'page_title',
    widgets: [
    {
        type: 'bar',
        size: 'full',
        titleKey: 'estadisticas_contenidos_widget_inscripciones_a_cursos_por_mes/año',
        ws: {
            key: 'INSCRIPCIONES_A_CURSOS_POR_MESANIO_URL',
            url: PREFIX_STATS_API + 'inscriptos-cursos-mesanio'
        },
        filterConfig: {
            show: true,
            options: ESTADISTICAS_CONTENIDOS_INSCRIPCIONES_A_CURSOS_POR_MESANIO_FILTERS,
            defaultOption: 'ALL'
        },
    },
    {
        type: 'bar',
        size: 'full',
        titleKey: 'estadisticas_contenidos_widget_contenidos_por_mes/año',
        ws: {
            key: 'CONTENIDOS_POR_MES_ANIO_URL',
            url: PREFIX_STATS_API + 'cantidad-contenidos-por-mesanio'
        },
        filterConfig: {
            show: true,
            options: ESTADISTICAS_CONTENIDOS_CONTENIDOS_POR_MES_ANIO_FILTERS,
            defaultOption: 'ALL'
        },
    },
    {
        type: 'bar',
        size: 'full',
        titleKey: 'estadisticas_contenidos_widget_boletines_por_mes/año',
        ws: {
            key: 'BOLETINES_POR_MES_ANIO_URL',
            url: PREFIX_STATS_API + 'boletines-mesanio'
        },
        filterConfig: {
            show: true,
            options: ESTADISTICAS_CONTENIDOS_BOLETINES_POR_MES_ANIO_FILTERS,
            defaultOption: 'ALL'
        },
    }
]
};