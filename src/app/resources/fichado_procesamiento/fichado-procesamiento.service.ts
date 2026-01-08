import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { FichadoApiResponse, FichadoSendPayload } from './fichado-procesamiento.models';

@Injectable({
    providedIn: 'root'
})
export class FichadoProcesamientoService {
    private _http = inject(HttpClient);
    private readonly API_URL_PROCESS = `${PREFIX_DOMAIN_API}procesarExcel`;
    private readonly API_URL_SEND_SAP = `${PREFIX_DOMAIN_API}enviarFichados`;

    processExcel(base64File: string): Observable<FichadoApiResponse> {
        const requestBody = {
            file: base64File
        };
        return this._http.post<FichadoApiResponse>(this.API_URL_PROCESS, requestBody);
    }

    enviarFichados(data: FichadoSendPayload): Observable<any> {
        return this._http.post(this.API_URL_SEND_SAP, data);
    }
}