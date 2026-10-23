import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomDatePickerComponent } from '@fwk/components/dynamic-form/custom-datepicker/custom-datepicker.component';
import { DATEPICKER, DynamicField } from '@fwk/model/dynamic-form/dynamic-field';
import { ActionDef } from '@fwk/model/component-def/action-def';
import { CustomPageComponent } from '@fwk/model/page-component.interface';
import { NotificationService } from '@fwk/services/notification/notification.service';
import { TranslatePipe } from '@fwk/pipe/translate.pipe';
import { AusentismoAgrupado, AusentismosService } from '../ausentismos.service';

@Component({
    selector: 'app-ausentismos',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatTableModule,
        CustomDatePickerComponent,
        TranslatePipe
    ],
    templateUrl: './ausentismos.component.html',
    styleUrls: ['./ausentismos.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ]
})
export class AusentismosComponent implements OnInit, CustomPageComponent {
    readonly todosTiposValue = '__TODOS_TIPOS_AUSENTISMO__';
    readonly fechaDesdeField = new DynamicField({
        key: 'fechaDesde',
        label: 'Fecha desde',
        controlType: DATEPICKER
    });
    readonly fechaHastaField = new DynamicField({
        key: 'fechaHasta',
        label: 'Fecha hasta',
        controlType: DATEPICKER
    });
    private readonly fb = inject(FormBuilder);
    private readonly service = inject(AusentismosService);
    private readonly notifications = inject(NotificationService);
    private readonly cdr = inject(ChangeDetectorRef);

    readonly i18nName = 'AUSENTISMOS_I18N_DEF';
    readonly columnsToDisplay = [
        'empleado',
        'horasTotales',
        'horasAusentes',
        'horasJustificadas',
        'horasInjustificadas',
        'porcentajeAusentismo',
        'porcentajeJustificado',
        'porcentajeInjustificado',
        'llegadasTarde'
    ];
    readonly columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    readonly detalleColumns = ['fecha', 'tipoAusentismo', 'justificado', 'horasAusentes'];
    readonly pageSizeOptions = [10, 25, 50, 100];

    filterForm!: FormGroup;
    empleados: any[] = [];
    tiposAusentismo: any[] = [];
    dataSource = new MatTableDataSource<AusentismoAgrupado>([]);
    expandedElement: AusentismoAgrupado | null = null;
    loading = false;
    searched = false;
    pageIndex = 0;
    pageSize = 10;
    totalRegistros = 0;

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            fechaDesde: [''],
            fechaHasta: [''],
            empleadosIds: [[]],
            tiposAusentismo: [[]],
            justificacion: ['']
        });
        this.cargarOpciones();
    }

    onAction(_action: ActionDef): void { }

    private cargarOpciones(): void {
        forkJoin({
            empleados: this.service.getEmpleados().pipe(catchError(() => of(null))),
            tipos: this.service.getTiposAusentismo().pipe(catchError(() => of(null)))
        }).subscribe(({ empleados, tipos }) => {
            this.empleados = this.extractArray(empleados);
            this.tiposAusentismo = this.extractArray(tipos);
            this.cdr.markForCheck();
        });
    }

    buscar(page = 0, pageSize = this.pageSize): void {
        if (this.filterForm.invalid) return;

        const value = this.filterForm.getRawValue();
        this.loading = true;
        this.searched = true;

        this.service.buscar({
            fechaDesde: this.toApiDate(value.fechaDesde) || null,
            fechaHasta: this.toApiDate(value.fechaHasta) || null,
            empleadosIds: Array.isArray(value.empleadosIds) ? value.empleadosIds : [],
            tipoAusentismo: Array.isArray(value.tiposAusentismo) && value.tiposAusentismo.length
                ? value.tiposAusentismo.filter((codigo: string) => codigo !== this.todosTiposValue).join(',') || null
                : null,
            justificacion: value.justificacion || null,
            page,
            pageSize
        }).subscribe({
            next: response => {
                this.dataSource.data = this.extractArray(response?.data).map(grupo => ({
                    ...grupo,
                    detalle: this.ordenarDetallePorFecha(grupo.detalle)
                }));
                this.expandedElement = null;
                this.pageIndex = page;
                this.pageSize = pageSize;
                this.totalRegistros = Number(response?.page?.totalReg ?? response?.data?.totalRegistros ?? this.dataSource.data.length);
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: error => {
                console.error(error);
                this.dataSource.data = [];
                this.totalRegistros = 0;
                this.loading = false;
                this.notifications.notifyError('Ocurrió un error al consultar los ausentismos.');
                this.cdr.markForCheck();
            }
        });
    }

    limpiar(): void {
        this.filterForm.reset({
            fechaDesde: '', fechaHasta: '', empleadosIds: [], tiposAusentismo: [], justificacion: ''
        });
        this.dataSource.data = [];
        this.expandedElement = null;
        this.totalRegistros = 0;
        this.pageIndex = 0;
        this.searched = false;
    }

    onPageChange(event: PageEvent): void {
        this.buscar(event.pageIndex, event.pageSize);
    }

    onTiposAusentismoChange(values: string[]): void {
        if (!values?.includes(this.todosTiposValue)) return;

        const todosLosTipos = this.tiposAusentismo
            .map(tipo => tipo.codigo)
            .filter((codigo): codigo is string => codigo != null);
        this.filterForm.get('tiposAusentismo')?.setValue(todosLosTipos);
    }

    esJustificado(value: boolean | null | undefined): string {
        if (value === true) return 'Sí';
        if (value === false) return 'No';
        return '-';
    }

    private extractArray(response: any): any[] {
        if (Array.isArray(response)) return response;
        if (Array.isArray(response?.data)) return response.data;
        if (Array.isArray(response?.content)) return response.content;
        if (Array.isArray(response?.items)) return response.items;
        if (Array.isArray(response?.data?.content)) return response.data.content;
        if (response && Array.isArray(response?.detalle)) return [response];
        return [];
    }

    private toApiDate(value: string | null | undefined): string | undefined {
        if (!value) return undefined;
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
        return match ? `${match[3]}/${match[2]}/${match[1]}` : value;
    }

    private ordenarDetallePorFecha(detalle: any[] | null | undefined): any[] {
        return [...(detalle || [])].sort((a, b) => this.fechaComoNumero(a?.fecha) - this.fechaComoNumero(b?.fecha));
    }

    private fechaComoNumero(fecha: string | null | undefined): number {
        if (!fecha) return 0;

        const local = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(fecha);
        if (local) return Date.UTC(Number(local[3]), Number(local[2]) - 1, Number(local[1]));

        const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(fecha);
        if (iso) return Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));

        const parsed = Date.parse(fecha);
        return Number.isNaN(parsed) ? 0 : parsed;
    }
}
