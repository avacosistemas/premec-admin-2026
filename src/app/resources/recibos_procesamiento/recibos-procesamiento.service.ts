import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { ReciboAprobarRechazarRequest, ReciboProcesarRequest, RecibosProcesarApiResponse } from './recibos-procesamiento.models';

@Injectable({
  providedIn: 'root'
})
export class RecibosProcesamientoService {
  private _http = inject(HttpClient);
  
  private readonly API_URL_PROCESS = `${PREFIX_DOMAIN_API}procesarRecibos`;
  private readonly API_URL_APPROVE_REJECT = `${PREFIX_DOMAIN_API}aprobarRechazarRecibos`;

  processRecibos(request: ReciboProcesarRequest): Observable<RecibosProcesarApiResponse> {
    return this._http.post<RecibosProcesarApiResponse>(this.API_URL_PROCESS, request);
  }

  approveRejectRecibos(request: ReciboAprobarRechazarRequest[]): Observable<any> {
    return this._http.post(this.API_URL_APPROVE_REJECT, request);
  }
}