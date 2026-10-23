import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { Observable } from 'rxjs';

export interface AusentismoDetalle {
    fecha: string;
    tipoAusentismo: string;
    justificado: boolean | null;
    horasAusentes: string;
}

export interface AusentismoAgrupado {
    idEmpleado: number;
    empleado: string;
    llegadasTarde: string | number;
    horasTotales: string;
    horasAusentes: string;
    horasJustificadas: string;
    horasInjustificadas: string;
    porcentajeAusentismo: number;
    porcentajeJustificado: number;
    porcentajeInjustificado: number;
    totalRegistros: number;
    detalle: AusentismoDetalle[];
}

export interface AusentismoFiltros {
    fechaDesde: string | null;
    fechaHasta: string | null;
    empleadosIds: number[];
    tipoAusentismo: string | null;
    justificacion: string | null;
    page: number;
    pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class AusentismosService {
    private readonly http = inject(HttpClient);
    private readonly api = PREFIX_DOMAIN_API;

    buscar(filtros: AusentismoFiltros): Observable<any> {
        const payload = {
            fechaDesde: filtros.fechaDesde,
            fechaHasta: filtros.fechaHasta,
            empleadosIds: filtros.empleadosIds,
            tipoAusentismo: filtros.tipoAusentismo,
            justificacion: filtros.justificacion,
            page: filtros.page,
            pageSize: filtros.pageSize
        };

        return this.http.post<any>(`${this.api}ausentismo`, payload);
    }

    buscarMiAusentismo(fechaDesde: string, fechaHasta: string, page = 0, pageSize = 100): Observable<any> {
        const payload = {
            fechaDesde,
            fechaHasta,
            page,
            pageSize,
            tipoAusentismo: null,
            justificacion: null
        };

        return this.http.post<any>(`${this.api}miausentismo`, payload);
    }

    getEmpleados(): Observable<any> {
        return this.http.get<any>(`${this.api}grupoEmpleado/usuarios`);
    }

    getTiposAusentismo(): Observable<any> {
        return this.http.get<any>(`${this.api}tipoausentismo`);
    }
}
