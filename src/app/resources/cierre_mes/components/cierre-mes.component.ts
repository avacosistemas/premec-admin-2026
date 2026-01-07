import { Component, OnInit, ViewChild, inject, ChangeDetectorRef, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { map, Observable } from 'rxjs';

import { NotificationService } from '@fwk/services/notification/notification.service';
import { TranslatePipe } from '@fwk/pipe/translate.pipe';
import { CustomPageComponent } from '@fwk/model/page-component.interface';
import { ActionDef } from '@fwk/model/component-def/action-def';
import { I18nService } from '@fwk/services/i18n-service/i18n.service';

import { CierreMesService } from '../cierre-mes.service';

@Component({
    selector: 'app-cierre-mes',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        TranslatePipe
    ],
    templateUrl: './cierre-mes.component.html',
    styleUrls: ['./cierre-mes.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class CierreMesComponent implements OnInit, CustomPageComponent {
    @Output() actionStateChange = new EventEmitter<{ key: string, changes: Partial<ActionDef> }>();

    private _fb = inject(FormBuilder);
    private _notificationService = inject(NotificationService);
    private _cierreMesService = inject(CierreMesService);
    private _i18nService = inject(I18nService);
    private _cdr = inject(ChangeDetectorRef);
    private _fuseMediaWatcherService = inject(FuseMediaWatcherService);

    cierreForm: FormGroup;
    meses: { value: number, viewValue: string }[];
    currentYear = new Date().getFullYear();
    loading = false;
    saving = false;

    i18nName = 'CIERRE_MES_I18N_DEF';

    dataSource = new MatTableDataSource<any>();
    columnsToDisplay = ['legajo', 'usuarioSap', 'nombre', 'facturablesHora', 'ociosasHora', 'fichadoHora', 'efectividad', 'cumplimientoObjetivo'];
    columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
    expandedElement: any | null;

    isMobile: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit(): void {
        const currentDate = new Date();
        this.cierreForm = this._fb.group({
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

        this._fuseMediaWatcherService.onMediaChange$
            .subscribe(({ matchingAliases }) => {
                this.isMobile = !matchingAliases.includes('md');
            });
    }

    onAction(action: ActionDef): void {
        if (action.actionType === 'custom_save_cierres') {
            this.guardarCierres();
        }
    }

    private translate(key: string, params?: any): string {
        const dict = this._i18nService.getDictionary(this.i18nName);
        let value = dict?.translate?.(key) || key;
        if (params) {
            Object.keys(params).forEach(k => {
                value = value.replace(`{{${k}}}`, params[k]);
            });
        }
        return value;
    }

    vistaPrevia(): void {
        if (this.cierreForm.invalid) return;

        this.toggleSaveButton(false);
        this.loading = true;
        this.dataSource.data = [];
        const { anio, mes } = this.cierreForm.value;

        this._cierreMesService.getPreview(anio, mes).subscribe({
            next: (response) => {
                const dataArray = Array.isArray(response) ? response : (response.data || []);

                if (dataArray.length === 0) {
                    this._notificationService.notify(this.translate('cierre_mes_no_hay_resultados'));
                    this.toggleSaveButton(false);
                    this.loading = false;
                    this._cdr.markForCheck();
                    return;
                }

                const processedData = dataArray.map(item => ({
                    ...item,
                    viaticos: item.viaticos || 0,
                    adelanto: item.adelanto || 0,
                    prestamo: item.prestamo || 0,
                    premioAsistencia: item.premioAsistencia || false,
                    gratificacionesAumentos: item.gratificacionesAumentos || ''
                }));

                this.dataSource.data = processedData;
                setTimeout(() => this.dataSource.paginator = this.paginator);

                this.toggleSaveButton(true);
                this.loading = false;
                this._cdr.markForCheck();
            },
            error: (error) => {
                console.error(error);
                this._notificationService.notifyError(this.translate('cierre_mes_error_vista_previa'));
                this.toggleSaveButton(false);
                this.loading = false;
                this._cdr.markForCheck();
            }
        });
    }

    guardarCierres(): void {
        if (!this.dataSource.data || this.dataSource.data.length === 0) {
            this._notificationService.notify('No hay datos para guardar. Genere una vista previa primero.');
            return;
        }

        if (this.saving) return;

        this.saving = true;
        this._cdr.markForCheck();

        const { anio, mes } = this.cierreForm.value;

        this.actionStateChange.emit({
            key: 'cierre_mes_guardar',
            changes: { disabled: true }
        });

        this._cierreMesService.saveCierres(this.dataSource.data, anio, mes).subscribe({
            next: () => {
                this._notificationService.notifySuccess(this.translate('cierre_mes_exito_guardado'));
                this.saving = false;
                this.toggleSaveButton(false);
                this._cdr.markForCheck();
            },
            error: (error) => {
                console.error(error);
                this._notificationService.notifyError(this.translate('cierre_mes_error_guardado'));
                this.saving = false;
                this.actionStateChange.emit({
                    key: 'cierre_mes_guardar',
                    changes: { disabled: false }
                });
                this._cdr.markForCheck();
            }
        });
    }

    private toggleSaveButton(show: boolean): void {
        this.actionStateChange.emit({
            key: 'cierre_mes_guardar',
            changes: {
                hidden: !show,
                disabled: false
            }
        });
    }
}