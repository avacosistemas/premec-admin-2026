import { CrudDef } from "@fwk/model/component-def/crud-def";

export interface CrudModuleDefinition {
    path: string;
    loader: () => Promise<any>;
}

export const CRUD_MODULES: CrudModuleDefinition[] = [
    {
        path: 'abmroles',
        loader: () => import('app/resources/abm_roles/abm_roles.def')
    },
    {
        path: 'actividad',
        loader: () => import('app/resources/actividad/actividad.def')
    },
    {
        path: 'banner',
        loader: () => import('app/resources/banner/banner.def')
    },
    {
        path: 'estadisticasContenidos',
        loader: () => import('app/resources/estadisticas-contenidos/estadisticas-contenidos.def')
    },
    {
        path: 'upload-files',
        loader: () => import('app/resources/upload_files/upload_files.def')
    },
];

export async function loadAllCrudDefs(): Promise<CrudDef[]> {
    const loaderPromises = [
        import('app/resources/abm_roles/abm_roles.def'),
        import('app/resources/actividad/actividad.def'),
        import('app/resources/banner/banner.def'),
        import('app/resources/estadisticas-contenidos/estadisticas-contenidos.def'),
        import('app/resources/upload_files/upload_files.def'),
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
