import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { Observable } from 'rxjs';

export interface AusentismoDetalle {
    fecha: string;
    tipoAusentismo: string;
    justificado: boolean;
    horasAusentes: string;
}

export interface AusentismoAgrupado {
    idEmpleado: number;
    empleado: string;
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
        const params = new HttpParams()
            .set('page', filtros.page.toString())
            .set('pageSize', filtros.pageSize.toString());
        const payload = {
            fechaDesde: filtros.fechaDesde,
            fechaHasta: filtros.fechaHasta,
            empleadosIds: filtros.empleadosIds,
            tipoAusentismo: filtros.tipoAusentismo,
            justificacion: filtros.justificacion
        };

        return this.http.post<any>(`${this.api}ausentismo`, payload, { params });
    }

    getEmpleados(): Observable<any> {
        return this.http.get<any>(`${this.api}grupoEmpleado/usuarios`);
    }

    getTiposAusentismo(): Observable<any> {
        return this.http.get<any>(`${this.api}tipoausentismo`);
    }
}
