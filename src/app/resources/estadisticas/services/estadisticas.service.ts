import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@fwk/services/http-service/http.service';
import { PREFIX_DOMAIN_API } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class EstadisticasService extends HttpService {
    constructor(injector: Injector) {
        super(injector, PREFIX_DOMAIN_API + 'reclamo/estadisticas/');
    }

    getStats(machine: string, periodos: { anio: number; mes: number }[]): Observable<any> {
        return this.httpPost(this.baseUrl + 'maquina-parada', {
            machine,
            periodos
        });
    }

    getClientes(): Observable<any> {
        return this.httpGet(PREFIX_DOMAIN_API + 'cliente');
    }

    getMaquinas(cuit: string, maquina?: string): Observable<any> {
        let url = `${PREFIX_DOMAIN_API}customer/equipment/${cuit}`;
        if (maquina) {
            url += `?maquina=${encodeURIComponent(maquina)}`;
        }
        return this.httpGet(url);
    }
}
