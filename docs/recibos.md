# Consulta de recibos (`/recibos`)

## Carga de datos

La ruta de navegación es `/recibos`. Su definición CRUD configura `PREFIX_DOMAIN_API + 'listarRecibosPorUsuarioDB'` como origen de datos. La API resuelve al usuario autenticado y obtiene el SAP ID asociado; el front no elige el empleado.

Antes de montar el listado, una página contenedora consulta `listarRecibosPendientesFirma`. Si no hay filas, carga `/recibos` normalmente. Si hay recibos sin firmar, abre un diálogo modal bloqueante y mantiene el listado oculto hasta que la consulta posterior a una firma confirme que no quedan pendientes. Si la consulta falla, muestra una opción para reintentar y mantiene bloqueado el ingreso.

El diálogo permite previsualizar cada archivo con `descargarRecibo`, firmar una fila con `firmarRecibo` o firmar todas en secuencia. Al finalizar las firmas vuelve a consultar la lista; solo se cierra cuando no quedan recibos pendientes.

La API obtiene el usuario autenticado y resuelve su SAP ID. Por eso, el front no puede elegir qué empleado consultar desde esta pantalla. El detalle del proceso de servidor está en la documentación de la API, en `docs/recibos.md` de ese repositorio.

## Filtros y paginación

La definición CRUD tiene `filterInMemory: false` y `serverPagination: true`. El framework envía los filtros y los parámetros de paginación al servidor, que consulta SQL Server en vez de invocar SAP:

- Año (`year`).
- Mes (`month`).
- Tipo de recibo (`tipo`).
- Referencia (`attachmentEntry`).

La página inicial es 0 y el tamaño inicial es 10 filas. El endpoint recibe `page`, `pageSize`, `year`, `month`, `tipo` y `attachmentEntry`. El total de filas se devuelve como metadato de paginación.

El endpoint original `listarRecibosPorUsuario` continúa disponible y consulta SAP, pero esta pantalla usa el nuevo `listarRecibosPorUsuarioDB`.

## Archivos de configuración

- `src/app/resources/recibos/navigation/recibos.nav.ts`: ruta `/recibos`.
- `src/app/resources/recibos/recibos.def.ts`: endpoint, filtros del servidor y paginación.
- `src/app/resources/recibos/recibos.crud-def.ts`: definición del CRUD paginado que se monta después del control de pendientes.
- `src/app/resources/recibos/components/recibos-page.component.ts`: consulta de pendientes y bloqueo de acceso al listado.
- `src/app/resources/recibos/components/recibos-pendientes-dialog.component.ts`: grilla modal, vista previa y acciones de firma.
- `src/app/resources/recibos/recibos.service.ts`: llamadas para consultar y firmar recibos.
- `src/app/resources/recibos/form/recibos.filter.fields.ts`: campos y opciones de filtro.
- `src/app/resources/recibos/grid/recibos.grid.ts`: columnas visibles y acciones de descarga/firma.
