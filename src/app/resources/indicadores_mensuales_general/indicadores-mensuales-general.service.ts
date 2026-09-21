import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class IndicadoresMensualesGeneralService {
    private _http = inject(HttpClient);
    private urlBase = `${PREFIX_DOMAIN_API}`;

    getIndicadores(anio: number, mes: number): Observable<any> {
        const params = new HttpParams()
            .set('anio', anio.toString())
            .set('mes', mes.toString());

        return this._http.get<any>(`${this.urlBase}indicadorMensualGeneral`, { params });
    }

    getIndicadoresGrupo(anio: number, mes: number, idGrupo: number, agrupado: boolean): Observable<any> {
        const params = new HttpParams()
            .set('anio', anio.toString())
            .set('mes', mes.toString())
            .set('idGrupoEmpleado', idGrupo.toString())
            .set('agrupado', agrupado.toString());

        return this._http.get<any>(`${this.urlBase}indicadorMensualGrupoEmpleado`, { params });
    }

    getIndicadoresEmpleados(anio: number, mes: number, idsEmpleados: number[], agrupado: boolean): Observable<any> {
        const idsStr = idsEmpleados.join(',');

        const params = new HttpParams()
            .set('anio', anio.toString())
            .set('mes', mes.toString())
            .set('idsEmpleados', idsStr)
            .set('agrupado', agrupado.toString());

        return this._http.get<any>(`${this.urlBase}indicadorMensualEmpleados`, { params });
    }

    getValoracionesNegativas(anio: number, mes: number): Observable<any> {
        const params = new HttpParams()
            .set('anio', anio.toString())
            .set('mes', mes.toString());

        return this._http.get<any>(`${this.urlBase}indicadorMensualGeneral/valoracionesNegativas`, { params });
    }

    getValoracionesNegativasGrupo(anio: number, mes: number, idGrupo: number): Observable<any> {
        const params = new HttpParams()
            .set('anio', anio.toString())
            .set('mes', mes.toString())
            .set('idGrupoEmpleado', idGrupo.toString());

        return this._http.get<any>(`${this.urlBase}indicadorMensualGrupoEmpleado/valoracionesNegativas`, { params });
    }

    getValoracionesNegativasEmpleados(anio: number, mes: number, idsEmpleados: number[]): Observable<any> {
        const idsStr = idsEmpleados.join(',');

        const params = new HttpParams()
            .set('anio', anio.toString())
            .set('mes', mes.toString())
            .set('idsEmpleados', idsStr);

        return this._http.get<any>(`${this.urlBase}indicadorMensualEmpleados/valoracionesNegativas`, { params });
    }

    getGruposEmpleados(): Observable<any[]> {
        return this._http.get<any>(`${this.urlBase}grupoEmpleado`).pipe(
            map(response => {
                return response.data || response;
            })
        );
    }

    getEmpleados(): Observable<any[]> {
        return this._http.get<any>(`${this.urlBase}grupoEmpleado/usuarios`).pipe(
            map(response => {
                return response.data || [];
            })
        );
    }
}