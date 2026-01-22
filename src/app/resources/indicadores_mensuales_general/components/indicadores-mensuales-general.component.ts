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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { NotificationService } from '@fwk/services/notification/notification.service';
import { TranslatePipe } from '@fwk/pipe/translate.pipe';
import { I18nService } from '@fwk/services/i18n-service/i18n.service';
import { CustomPageComponent } from '@fwk/model/page-component.interface';
import { ActionDef } from '@fwk/model/component-def/action-def';

import { IndicadoresMensualesGeneralService } from '../indicadores-mensuales-general.service';

@Component({
    selector: 'app-indicadores-mensuales-general',
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
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        TranslatePipe
    ],
    templateUrl: './indicadores-mensuales-general.component.html',
    styleUrls: ['./indicadores-mensuales-general.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class IndicadoresMensualesGeneralComponent implements OnInit, CustomPageComponent {

    private _fb = inject(FormBuilder);
    private _service = inject(IndicadoresMensualesGeneralService);
    private _notificationService = inject(NotificationService);
    private _i18nService = inject(I18nService);
    private _cdr = inject(ChangeDetectorRef);

    filterForm: FormGroup;
    meses: { value: number, viewValue: string }[];
    currentYear = new Date().getFullYear();
    loading = false;
    panelOpenState = true;

    listaGrupos: any[] = [];
    listaEmpleados: any[] = [];

    i18nName = 'INDICADORES_MENSUALES_GENERAL_I18N_DEF';

    dashboardData: any | null = null;

    showGrid = false;
    dataSource = new MatTableDataSource<any>();
    expandedElement: any | null;

    columnsToDisplay = ['nombre', 'fichadoHora', 'facturablesHora', 'ociosasHora', 'efectividad'];
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit(): void {
        const currentDate = new Date();

        this.filterForm = this._fb.group({
            mes: [currentDate.getMonth() + 1, Validators.required],
            anio: [currentDate.getFullYear(), [Validators.required, Validators.min(2001), Validators.max(this.currentYear)]],
            tipoReporte: ['TODOS', Validators.required],
            idGrupo: [null],
            idsEmpleados: [[]],
            agrupado: [true]
        });

        this.meses = [
            { value: 1, viewValue: 'Enero' }, { value: 2, viewValue: 'Febrero' },
            { value: 3, viewValue: 'Marzo' }, { value: 4, viewValue: 'Abril' },
            { value: 5, viewValue: 'Mayo' }, { value: 6, viewValue: 'Junio' },
            { value: 7, viewValue: 'Julio' }, { value: 8, viewValue: 'Agosto' },
            { value: 9, viewValue: 'Septiembre' }, { value: 10, viewValue: 'Octubre' },
            { value: 11, viewValue: 'Noviembre' }, { value: 12, viewValue: 'Diciembre' }
        ];

        this.filterForm.get('tipoReporte')?.valueChanges.subscribe(val => {
            this.handleTypeChange(val);
        });

        this.loadListas();
        this.handleTypeChange('TODOS');
    }

    onAction(action: ActionDef): void { }

    private loadListas(): void {
        this._service.getGruposEmpleados().subscribe({
            next: (res) => { this.listaGrupos = res || []; },
            error: (err) => console.error('Error cargando grupos', err)
        });

        this._service.getEmpleados().subscribe({
            next: (res) => { this.listaEmpleados = res || []; },
            error: (err) => console.error('Error cargando empleados', err)
        });
    }

    private handleTypeChange(type: string): void {
        const grupoCtrl = this.filterForm.get('idGrupo');
        const empCtrl = this.filterForm.get('idsEmpleados');
        const agrupadoCtrl = this.filterForm.get('agrupado');

        grupoCtrl?.setValue(null);
        empCtrl?.setValue([]);
        grupoCtrl?.clearValidators();
        empCtrl?.clearValidators();

        if (type === 'TODOS') {
            grupoCtrl?.disable();
            empCtrl?.disable();
            agrupadoCtrl?.disable();
            agrupadoCtrl?.setValue(true);
        } else if (type === 'GRUPO') {
            grupoCtrl?.enable();
            grupoCtrl?.setValidators(Validators.required);
            empCtrl?.disable();
            agrupadoCtrl?.enable();
        } else if (type === 'EMPLEADOS') {
            grupoCtrl?.disable();
            empCtrl?.enable();
            empCtrl?.setValidators(Validators.required);
            agrupadoCtrl?.enable();
        }

        grupoCtrl?.updateValueAndValidity();
        empCtrl?.updateValueAndValidity();
    }

    limpiar(): void {
        const currentDate = new Date();
        this.filterForm.reset({
            mes: currentDate.getMonth() + 1,
            anio: currentDate.getFullYear(),
            tipoReporte: 'TODOS',
            agrupado: true,
            idsEmpleados: []
        });
        this.dashboardData = null;
        this.dataSource.data = [];
        this.showGrid = false;
        this.panelOpenState = true;
    }

    buscar(): void {
        if (this.filterForm.invalid) return;

        this.loading = true;
        this.dashboardData = null;
        this.dataSource.data = [];

        const formVal = this.filterForm.value;
        const tipo = formVal.tipoReporte;

        this.showGrid = (tipo !== 'TODOS' && formVal.agrupado === false);

        let request$;

        if (tipo === 'TODOS') {
            request$ = this._service.getIndicadores(formVal.anio, formVal.mes);
        } else if (tipo === 'GRUPO') {
            request$ = this._service.getIndicadoresGrupo(formVal.anio, formVal.mes, formVal.idGrupo, formVal.agrupado);
        } else if (tipo === 'EMPLEADOS') {
            request$ = this._service.getIndicadoresEmpleados(formVal.anio, formVal.mes, formVal.idsEmpleados, formVal.agrupado);
        }

        request$?.subscribe({
            next: (response) => {
                if (response && response.status === 'OK' && response.data) {
                    const data = response.data;

                    if (this.showGrid) {
                        const dataArray = Array.isArray(data) ? data : [data];
                        this.dataSource.data = dataArray;

                        setTimeout(() => {
                            if (this.paginator) {
                                this.dataSource.paginator = this.paginator;
                            }
                        });
                    } else {
                        this.dashboardData = Array.isArray(data) ? data[0] : data;
                    }
                    this.panelOpenState = false;
                } else {
                    this._notificationService.notify('No se encontraron datos para los filtros seleccionados.');
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

    getColumnLabel(col: string): string {
        const map: { [key: string]: string } = {
            'nombre': 'lbl_nombre_empleado',
            'fichadoHora': 'lbl_fichado_hora',
            'facturablesHora': 'lbl_facturables_hora',
            'ociosasHora': 'lbl_ociosas_hora',
            'efectividad': 'lbl_efectividad'
        };
        return map[col] || col;
    }
}