import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CierreMesService {
    private _http = inject(HttpClient);
    private url = `${PREFIX_DOMAIN_API}cierremespreview`;

    getPreview(anio: number, mes: number): Observable<any> {
        const params = new HttpParams()
            .set('anio', anio.toString())
            .set('mes', mes.toString());

        return this._http.get<any>(this.url, { params });
    }

    saveCierres(data: any[], anio: number, mes: number): Observable<any> {
        const params = new HttpParams()
            .set('anio', anio.toString())
            .set('mes', mes.toString());
        return this._http.post(this.url, data, { params });
    }
}