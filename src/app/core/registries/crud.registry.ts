import { CrudDef } from "@fwk/model/component-def/crud-def";

export interface CrudModuleDefinition {
    path: string;
    loader: () => Promise<any>;
}

export const CRUD_MODULES: CrudModuleDefinition[] = [
    {
        path: 'cierre-mes',
        loader: () => import('app/resources/cierre_mes/cierre_mes.def')
    },
    {
        path: 'fichado-procesamiento',
        loader: () => import('app/resources/fichado_procesamiento/fichado_procesamiento.def')
    },
    {
        path: 'generar-qr',
        loader: () => import('app/resources/generar_qr/generar_qr.def')
    },
    {
        path: 'gruposTipoActividad',
        loader: () => import('app/resources/grupos_tipo_actividad/grupos_tipo_actividad.def')
    },
    {
        path: 'itemChecklistGrupo',
        loader: () => import('app/resources/item_checklist_grupo/item_checklist_grupo.def')
    },
    {
        path: 'novedades-contador',
        loader: () => import('app/resources/novedades_contador/novedades_contador.def')
    },
    {
        path: 'permiso',
        loader: () => import('app/resources/permiso/permiso.def')
    },
    {
        path: 'recibos',
        loader: () => import('app/resources/recibos/recibos.def')
    },
    {
        path: 'recibos-procesamiento',
        loader: () => import('app/resources/recibos_procesamiento/recibos_procesamiento.def')
    },
    {
        path: 'reporteHorasMaquina',
        loader: () => import('app/resources/reporte_horas_maquina/reporte_horas_maquina.def')
    },
    {
        path: 'seguridadgrupo',
        loader: () => import('app/resources/seguridad_grupo/seguridad_grupo.def')
    },
    {
        path: 'seguridadgrupopermiso',
        loader: () => import('app/resources/seguridad_grupo_permiso/seguridad_grupo_permiso.def')
    },
    {
        path: 'seguridadgrupousuario',
        loader: () => import('app/resources/seguridad_grupo_usuario/seguridad_grupo_usuario.def')
    },
    {
        path: 'users',
        loader: () => import('app/resources/usuarios/usuarios.def')
    },
];

export async function loadAllCrudDefs(): Promise<CrudDef[]> {
    const loaderPromises = [
        import('app/resources/cierre_mes/cierre_mes.def'),
        import('app/resources/fichado_procesamiento/fichado_procesamiento.def'),
        import('app/resources/generar_qr/generar_qr.def'),
        import('app/resources/grupos_tipo_actividad/grupos_tipo_actividad.def'),
        import('app/resources/item_checklist_grupo/item_checklist_grupo.def'),
        import('app/resources/novedades_contador/novedades_contador.def'),
        import('app/resources/permiso/permiso.def'),
        import('app/resources/recibos/recibos.def'),
        import('app/resources/recibos_procesamiento/recibos_procesamiento.def'),
        import('app/resources/reporte_horas_maquina/reporte_horas_maquina.def'),
        import('app/resources/seguridad_grupo/seguridad_grupo.def'),
        import('app/resources/seguridad_grupo_permiso/seguridad_grupo_permiso.def'),
        import('app/resources/seguridad_grupo_usuario/seguridad_grupo_usuario.def'),
        import('app/resources/usuarios/usuarios.def'),
    ];
    
    const loadedModules = await Promise.all(loaderPromises);

    return loadedModules.map(module => {
        const defKey = Object.keys(module).find(key => key.endsWith('_DEF'));
        return defKey ? module[defKey] : null;
    }).filter(Boolean) as CrudDef[];
}

export async function loadCrudDefByPath(path: string): Promise<CrudDef | null> {
    const moduleDefinition = CRUD_MODULES.find(m => m.path === path);
    if (!moduleDefinition) {
        return null;
    }
    const loadedModule = await moduleDefinition.loader();
    const defKey = Object.keys(loadedModule).find(key => key.endsWith('_DEF'));
    return defKey ? loadedModule[defKey] : null;
}
