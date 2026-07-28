import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { TranslatePipe } from '@fwk/pipe/translate.pipe';
import { I18nService } from '@fwk/services/i18n-service/i18n.service';
import { EstadisticasClienteService } from '../services/estadisticas-cliente.service';

export interface MonthColumnDef {
    key: string;
    label: string;
    month: number;
}

@Component({
    selector: 'estadisticas-cliente',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        MatFormFieldModule, MatInputModule,
        MatSelectModule, MatButtonModule,
        MatCardModule, MatIconModule,
        MatExpansionModule, MatTooltipModule,
        MatTableModule,
        TranslatePipe,
    ],
    templateUrl: './estadisticas-cliente.component.html',
    styleUrls: ['./estadisticas-cliente.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstadisticasClienteComponent implements OnInit, OnDestroy {
    private estadisticasClienteService = inject(EstadisticasClienteService);
    private i18nService = inject(I18nService);
    private cdr = inject(ChangeDetectorRef);
    private destroy$ = new Subject<void>();

    currentYear = new Date().getFullYear();

    clientes: any[] = [];
    selectedClientes: string[] = [];

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

    dataSource = new MatTableDataSource<any>([]);
    displayedColumns: string[] = [];
    monthColumns: MonthColumnDef[] = [];

    errors: { cliente?: string; year?: string; months?: string } = {};

    ngOnInit(): void {
        this.loadClientes();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getClienteId(c: any): string {
        if (!c) return '';
        if (typeof c === 'string') {
            const trimmed = c.trim();
            return trimmed.toUpperCase().startsWith('C') ? trimmed.toUpperCase() : ('C' + trimmed);
        }
        const rawId = c.customerCode || c.cardCode || c.code || c.username || c.cuit || c.cuitCuil || c.codigo || c.id || '';
        if (!rawId) return '';
        const strId = String(rawId).trim();
        return strId.toUpperCase().startsWith('C') ? strId.toUpperCase() : ('C' + strId);
    }

    getClienteLabel(c: any): string {
        if (!c) return '';
        if (typeof c === 'string') return c;
        return c.nombre || c.razonSocial || c.username || c.cuit || '';
    }

    selectAllClientes(event: MouseEvent): void {
        event.stopPropagation();
        this.selectedClientes = this.clientes.map(c => this.getClienteId(c));
        this.cdr.markForCheck();
    }

    deselectAllClientes(event: MouseEvent): void {
        event.stopPropagation();
        this.selectedClientes = [];
        this.cdr.markForCheck();
    }

    limpiarClientes(): void {
        this.selectedClientes = [];
        this.errors.cliente = '';
        this.cdr.markForCheck();
    }

    private loadClientes(): void {
        this.estadisticasClienteService.getClientes().pipe(
            catchError(() => of([])),
            takeUntil(this.destroy$),
        ).subscribe(resp => {
            const list = resp?.data || resp;
            this.clientes = Array.isArray(list) ? list : [];
            this.cdr.markForCheck();
        });
    }

    verResultados(): void {
        if (!this.validar()) return;

        this.searchPanelExpanded = false;
        this.loading = true;
        this.results = null;
        this.cdr.markForCheck();

        const periodos = this.selectedMonths.map(m => ({
            anio: this.year,
            mes: m
        }));

        this.estadisticasClienteService.getStats(this.selectedClientes, periodos)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (resp) => {
                    const rawData = resp?.data || resp;
                    const nombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

                    const sortedMonths = [...this.selectedMonths].sort((a, b) => a - b);
                    this.monthColumns = sortedMonths.map(m => ({
                        key: 'mes_' + m,
                        label: nombres[m - 1] || `Mes ${m}`,
                        month: m
                    }));

                    this.displayedColumns = ['cliente', ...this.monthColumns.map(mc => mc.key), 'total'];

                    const rows: any[] = [];

                    if (rawData && typeof rawData === 'object' && !Array.isArray(rawData)) {
                        for (const clientName of Object.keys(rawData)) {
                            const cData = rawData[clientName];
                            if (cData && typeof cData === 'object') {
                                const row: any = {
                                    cliente: clientName,
                                    total: cData.total ?? 0
                                };

                                const clientPeriodos: any[] = Array.isArray(cData.periodos) ? cData.periodos : [];

                                this.monthColumns.forEach(mc => {
                                    const match = clientPeriodos.find(p => p.mes === mc.month);
                                    row[mc.key] = match ? (match.cantidad ?? 0) : 0;
                                });

                                rows.push(row);
                            }
                        }
                    }

                    this.dataSource.data = rows;
                    this.results = { rows };
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
        this.selectedClientes = [];
        this.year = this.currentYear;
        this.selectedMonths = [];
        this.results = null;
        this.loading = false;
        this.errors = {};
        this.searchPanelExpanded = true;
        this.cdr.markForCheck();
    }

    private validar(): boolean {
        this.errors = {};

        if (!this.selectedClientes || this.selectedClientes.length === 0) {
            this.errors.cliente = 'es_error_cliente_required';
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

    t(key: string, fallback?: string): string {
        const translated = this.i18nService.getDictionary('ESTADISTICAS_CLIENTE')?.translate?.(key);
        if (translated && translated !== key) {
            return translated;
        }
        const fallbacks: Record<string, string> = {
            es_cliente: 'Clientes',
            es_total: 'Total',
            es_error_cliente_required: 'Debe seleccionar al menos un cliente',
            es_error_anio_required: 'Debe ingresar un año',
            es_error_anio_min: 'El año debe ser 2026 o posterior',
            es_error_anio_max: 'El año no puede ser superior al actual',
            es_error_meses_required: 'Debe seleccionar al menos un mes',
        };
        return fallbacks[key] || fallback || key;
    }
}
