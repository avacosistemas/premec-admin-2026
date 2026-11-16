import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { Observable, map } from 'rxjs';

export interface ReciboPendiente {
    attachmentEntry: number;
    absEntry: number;
    year: number;
    month: number;
    monthString: string;
    tipo: string;
    descripcion: string;
    filePath: string;
    lineNum: number;
    firmado: boolean;
}

@Injectable({ providedIn: 'root' })
export class RecibosService {
    private readonly http = inject(HttpClient);
    private readonly api = PREFIX_DOMAIN_API;

    listarPendientesFirma(): Observable<ReciboPendiente[]> {
        return this.http.get<any>(`${this.api}listarRecibosPendientesFirma`).pipe(
            map(response => {
                if (response?.status === 'ERROR' || response?.ok === false) {
                    throw response;
                }
                return Array.isArray(response?.data) ? response.data : [];
            })
        );
    }

    firmar(recibo: ReciboPendiente): Observable<any> {
        const params = new HttpParams()
            .set('attachmentEntry', String(recibo.attachmentEntry))
            .set('filePath', recibo.filePath || '')
            .set('lineNum', String(recibo.lineNum))
            .set('year', String(recibo.year))
            .set('month', String(recibo.month));

        return this.http.get<any>(`${this.api}firmarRecibo`, { params }).pipe(
            map(response => {
                if (response?.status === 'ERROR' || response?.ok === false) {
                    throw response;
                }
                return response;
            })
        );
    }
}
