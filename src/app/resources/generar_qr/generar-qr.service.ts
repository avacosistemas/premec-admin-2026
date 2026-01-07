import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PREFIX_DOMAIN_API } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenerarQrService {
  private _http = inject(HttpClient);
  private apiUrl = PREFIX_DOMAIN_API;

  getServiceCallId(serviceCallId: string): Observable<string> {
    return this._http.get<{ status: string, data: string }>(
        `${this.apiUrl}encodearServiceCall?serviceCallId=${serviceCallId}`
    ).pipe(
      map(response => response.data)
    );
  }
}