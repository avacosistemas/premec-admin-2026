import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { Observable } from 'rxjs';
import { NovedadesContadorApiResponse, NovedadesContadorData } from './novedades-contador.models';

@Injectable({
    providedIn: 'root'
})
export class NovedadesContadorService {
    private _http = inject(HttpClient);
    private urlPreview = `${PREFIX_DOMAIN_API}novedadescontadorpreview`;
    private urlSave = `${PREFIX_DOMAIN_API}enviarnovedadescontador`;

    getPreview(anio: number, mes: number): Observable<NovedadesContadorApiResponse> {
        const params = new HttpParams()
            .set('anio', anio.toString())
            .set('mes', mes.toString());

        return this._http.get<NovedadesContadorApiResponse>(this.urlPreview, { params });
    }

    saveNovedades(data: NovedadesContadorData): Observable<any> {
        return this._http.post(this.urlSave, data);
    }
}