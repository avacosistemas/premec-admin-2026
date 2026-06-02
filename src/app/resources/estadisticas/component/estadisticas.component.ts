import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TranslatePipe } from '@fwk/pipe/translate.pipe';
import { I18nService } from '@fwk/services/i18n-service/i18n.service';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { EstadisticasService } from '../services/estadisticas.service';

@Component({
    selector: 'estadisticas',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        MatFormFieldModule, MatInputModule,
        MatSelectModule, MatAutocompleteModule,
        MatButtonModule, MatIconModule,
        MatExpansionModule, MatTooltipModule,
        TranslatePipe,
    ],
    templateUrl: './estadisticas.component.html',
    styleUrls: ['./estadisticas.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstadisticasComponent implements OnInit, OnDestroy {
    private estadisticasService = inject(EstadisticasService);
    private http = inject(HttpClient);
    private i18nService = inject(I18nService);
    private cdr = inject(ChangeDetectorRef);
    private destroy$ = new Subject<void>();

    currentYear = new Date().getFullYear();

    clientes: any[] = [];
    clienteSelected: any = null;

    maquinas: any[] = [];
    maquinaQuery = '';
    maquinaSelected: any = null;

    year: number = this.currentYear;

    months = [
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' },
    ];
    selectedMonths: number[] = [];

    results: any = null;
    loading = false;
    searchPanelExpanded = true;

    errors: { cliente?: string; maquina?: string; year?: string; months?: string } = {};

    ngOnInit(): void {
        this.loadClientes();
        this.loadMaquinas();
        // this.cargarMockData();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    get filteredMaquinas(): any[] {
        const query = typeof this.maquinaQuery === 'string' ? this.maquinaQuery.toLowerCase() : '';
        if (!query) return this.maquinas;
        return this.maquinas.filter(m =>
            (m.label || '').toLowerCase().includes(query) ||
            (m.internalSerialNum || '').toLowerCase().includes(query) ||
            (m.InternalSerialNum || '').toLowerCase().includes(query)
        );
    }

    displayFn(maq: any): string {
        return maq?.label || maq?.internalSerialNum || maq?.InternalSerialNum || '';
    }

    selectMaquinaByLabel(label: string): void {
        this.maquinaSelected = this.maquinas.find(m => this.displayFn(m) === label) || null;
        this.maquinaQuery = label;
        this.errors.maquina = '';
    }

    onMaquinaInput(value: any): void {
        this.maquinaQuery = typeof value === 'string' ? value : this.displayFn(value) || '';
        if (!this.maquinaSelected || this.displayFn(this.maquinaSelected) !== this.maquinaQuery) {
            this.maquinaSelected = null;
        }
        this.errors.maquina = '';
    }

    limpiarMaquina(): void {
        this.maquinaQuery = '';
        this.maquinaSelected = null;
        this.errors.maquina = '';
        this.cdr.markForCheck();
    }

    onClienteSelectedChange(cliente: any): void {
        this.clienteSelected = cliente;
        this.limpiarMaquina();
        if (cliente) {
            this.loadMaquinas(cliente.id);
        } else {
            this.loadMaquinas();
        }
    }

    limpiarCliente(event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.clienteSelected = null;
        if (this.errors) {
            this.errors.cliente = '';
        }
        this.limpiarMaquina();
        this.loadMaquinas();
        this.cdr.markForCheck();
    }

    private loadClientes(): void {
        this.http.get<any>(PREFIX_DOMAIN_API + 'cliente').pipe(
            catchError(() => of([])),
            takeUntil(this.destroy$),
        ).subscribe(resp => {
            const list = resp?.data || resp;
            this.clientes = Array.isArray(list) ? list : [];
            this.cdr.markForCheck();
        });
    }

    private loadMaquinas(clienteId?: string | number): void {
        // let url = PREFIX_DOMAIN_API + 'customer/equipment';
        let url = '/assets/test-equipment.json'; // Endpoint de prueba
        if (clienteId) {
            url += `?cliente=${clienteId}`;
        }
        this.http.get<any>(url).pipe(
            catchError(() => of([])),
            takeUntil(this.destroy$),
        ).subscribe(resp => {
            const list = resp?.customer_equipment || resp?.data || resp;
            this.maquinas = Array.isArray(list) ? list : [];
            this.cdr.markForCheck();
        });
    }

    verResultados(): void {
        if (!this.validar()) return;

        const idMaquina = this.maquinaSelected?.internalSerialNum
            || this.maquinaSelected?.InternalSerialNum
            || this.maquinaQuery;

        this.searchPanelExpanded = false;
        this.loading = true;
        this.results = null;
        this.cdr.markForCheck();

        const periodos = this.selectedMonths.map(m => ({
            anio: this.year,
            mes: m
        }));

        this.estadisticasService.getStats(idMaquina, periodos)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (resp) => {
                    const nombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                    
                    const mappedMonths = (resp?.periodos || []).map((p: any) => ({
                        mes: p.mes,
                        anio: p.anio,
                        nombre: nombres[p.mes - 1] || `Mes ${p.mes}`,
                        detenida: p.diasParadaTotal ?? 0,
                        reclamos: p.cantidadReclamos ?? 0
                    }));

                    this.results = {
                        maquina: idMaquina,
                        diasDetenida: resp?.diasParadaTotalTotal ?? 0,
                        reclamosAsociados: resp?.cantidadReclamosTotal ?? 0,
                        meses: mappedMonths
                    };
                    this.loading = false;
                    this.cdr.markForCheck();
                },
                error: () => {
                    this.loading = false;
                    this.results = null;
                    this.cdr.markForCheck();
                }
            });
    }

    selectAllMonths(event: MouseEvent): void {
        event.stopPropagation();
        this.selectedMonths = this.months.map(m => m.value);
        this.cdr.markForCheck();
    }

    deselectAllMonths(event: MouseEvent): void {
        event.stopPropagation();
        this.selectedMonths = [];
        this.cdr.markForCheck();
    }

    limpiar(): void {
        this.clienteSelected = null;
        this.maquinaQuery = '';
        this.maquinaSelected = null;
        this.year = this.currentYear;
        this.selectedMonths = [];
        this.results = null;
        this.loading = false;
        this.errors = {};
        this.searchPanelExpanded = true;
        this.loadMaquinas();
        this.cdr.markForCheck();
    }

    private validar(): boolean {
        this.errors = {};

        if (!this.maquinaSelected && !this.maquinaQuery.trim()) {
            this.errors.maquina = 'es_error_maquina_required';
        }

        if (!this.year || isNaN(this.year)) {
            this.errors.year = 'es_error_anio_required';
        } else if (this.year < 2026) {
            this.errors.year = 'es_error_anio_min';
        } else if (this.year > this.currentYear) {
            this.errors.year = 'es_error_anio_max';
        }

        if (!this.selectedMonths || this.selectedMonths.length === 0) {
            this.errors.months = 'es_error_meses_required';
        }

        this.cdr.markForCheck();
        return Object.keys(this.errors).length === 0;
    }

    t(key: string): string {
        return this.i18nService.getDictionary('ESTADISTICAS')?.translate?.(key) || key;
    }
}
