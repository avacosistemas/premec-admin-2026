import { Component, OnInit, inject, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from '@fwk/services/notification/notification.service';
import { TranslatePipe } from '@fwk/pipe/translate.pipe';
import { I18nService } from '@fwk/services/i18n-service/i18n.service';
import { CustomPageComponent } from '@fwk/model/page-component.interface';
import { ActionDef } from '@fwk/model/component-def/action-def';

import { IndicadoresMensualesService } from '../indicadores-mensuales.service';

@Component({
    selector: 'app-indicadores-mensuales',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatTooltipModule,
        MatCardModule,
        MatDividerModule,
        MatTableModule,
        MatPaginatorModule,
        TranslatePipe
    ],
    templateUrl: './indicadores-mensuales.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class IndicadoresMensualesComponent implements OnInit, CustomPageComponent {
    
    private _fb = inject(FormBuilder);
    private _service = inject(IndicadoresMensualesService);
    private _notificationService = inject(NotificationService);
    private _i18nService = inject(I18nService);
    private _cdr = inject(ChangeDetectorRef);

    filterForm!: FormGroup;
    meses: { value: number, viewValue: string }[] = [];
    currentYear = new Date().getFullYear();
    loading = false;
    panelOpenState = true;
    
    i18nName = 'INDICADORES_MENSUALES_I18N_DEF';
    
    data: any | null = null;

    dataSourceObservaciones = new MatTableDataSource<any>([]);
    displayedColumnsObservaciones: string[] = ['fecha', 'actividad', 'empleado', 'cliente', 'detalle', 'valoracion'];
    @ViewChild('obsPaginator') paginatorObservaciones!: MatPaginator;

    ngOnInit(): void {
        const currentDate = new Date();
        this.filterForm = this._fb.group({
            mes: [currentDate.getMonth() + 1, Validators.required],
            anio: [currentDate.getFullYear(), [Validators.required, Validators.min(2001), Validators.max(this.currentYear)]]
        });

        this.meses = [
            { value: 1, viewValue: 'Enero' }, { value: 2, viewValue: 'Febrero' },
            { value: 3, viewValue: 'Marzo' }, { value: 4, viewValue: 'Abril' },
            { value: 5, viewValue: 'Mayo' }, { value: 6, viewValue: 'Junio' },
            { value: 7, viewValue: 'Julio' }, { value: 8, viewValue: 'Agosto' },
            { value: 9, viewValue: 'Septiembre' }, { value: 10, viewValue: 'Octubre' },
            { value: 11, viewValue: 'Noviembre' }, { value: 12, viewValue: 'Diciembre' }
        ];
    }

    onAction(action: ActionDef): void {
        //
    }

    limpiar(): void {
        const currentDate = new Date();
        this.filterForm.patchValue({
            mes: currentDate.getMonth() + 1,
            anio: currentDate.getFullYear()
        });
        this.data = null;
        this.dataSourceObservaciones.data = [];
        this.panelOpenState = true;
    }

    buscar(): void {
        if (this.filterForm.invalid) return;

        this.loading = true;
        this.data = null;
        this.dataSourceObservaciones.data = [];
        const { anio, mes } = this.filterForm.value;

        forkJoin({
            indicadores: this._service.getIndicadores(anio, mes).pipe(catchError(() => of(null))),
            valoraciones: this._service.getValoracionesNegativas(anio, mes).pipe(catchError(() => of(null)))
        }).subscribe({
            next: (res: any) => {
                const indicadores = res?.indicadores;
                const valoraciones = res?.valoraciones;
                if (indicadores && indicadores.status === 'OK' && indicadores.data) {
                    this.data = indicadores.data;
                    this.panelOpenState = false;
                } else {
                    this.data = null;
                    this._notificationService.notify('No se encontraron datos para el período seleccionado.');
                }

                if (valoraciones && valoraciones.status === 'OK' && valoraciones.data) {
                    this.dataSourceObservaciones.data = Array.isArray(valoraciones.data) ? valoraciones.data : [];
                    setTimeout(() => {
                        if (this.paginatorObservaciones) {
                            this.dataSourceObservaciones.paginator = this.paginatorObservaciones;
                        }
                    });
                } else {
                    this.dataSourceObservaciones.data = [];
                }

                this.loading = false;
                this._cdr.markForCheck();
            },
            error: (err) => {
                console.error(err);
                this._notificationService.notifyError(this._i18nService.getDictionary(this.i18nName)?.translate?.('indicadores_error') || 'Error');
                this.loading = false;
                this._cdr.markForCheck();
            }
        });
    }
}