import { Component, OnInit, ViewChild, inject, ChangeDetectorRef, EventEmitter, Output, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';

import { FileUploaderComponent } from '@fwk/components/file-uploader/file-uploader.component';
import { RecibosProcesamientoService } from '../recibos-procesamiento.service';
import { ReciboTabla, ReciboAprobarRechazarRequest } from '../recibos-procesamiento.models';
import { NotificationService } from '@fwk/services/notification/notification.service';
import { I18nService } from '@fwk/services/i18n-service/i18n.service';
import { TranslatePipe } from '@fwk/pipe/translate.pipe';
import { CustomPageComponent } from '@fwk/model/page-component.interface';
import { ActionDef } from '@fwk/model/component-def/action-def';
@Component({
    selector: 'app-recibos-procesamiento',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatTooltipModule,
        TranslatePipe,
        FileUploaderComponent
    ],
    templateUrl: './recibos-procesamiento.component.html',
    styleUrls: ['./recibos-procesamiento.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RecibosProcesamientoComponent implements OnInit, CustomPageComponent, OnDestroy {
    @Output() actionStateChange = new EventEmitter<{ key: string, changes: Partial<ActionDef> }>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    private _fb = inject(FormBuilder);
    private _recibosService = inject(RecibosProcesamientoService);
    private _notificationService = inject(NotificationService);
    private _i18nService = inject(I18nService);
    private _cdr = inject(ChangeDetectorRef);
    private _unsubscribeAll = new Subject<void>();

    i18nName = 'RECIBOS_PROCESAMIENTO_I18N_DEF';
    processingForm: FormGroup;

    receiptTypes: string[] = [
        'Sueldo Jornal', 'Sueldo Mensual', 'SAC',
        'Vacaciones Jornal', 'Vacaciones Mensual',
        'Ajustes Retroactivos', 'Adelanto', 'Préstamo'
    ];

    isLoadingProcess = false;

    fileName: string = '';

    dataSource = new MatTableDataSource<ReciboTabla>([]);
    displayedColumns = ['legajo', 'nombreCompleto', 'periodo', 'neto', 'tipo', 'aprobado', 'observaciones', 'descripcion'];

    ngOnInit(): void {
        this.processingForm = this._fb.group({
            receiptType: ['', Validators.required],
            pdfFile: [null, Validators.required]
        });

        this.processingForm.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(100),
                tap((values) => this.syncLocalVariables(values.pdfFile))
            )
            .subscribe(() => {
                this.triggerAutoProcess();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    private syncLocalVariables(fileValue: any): void {
        if (fileValue) {
            const file = Array.isArray(fileValue) ? fileValue[0] : fileValue;
            if (this.fileName !== file.name) {
                this.fileName = file.name;
                this._cdr.markForCheck();
            }
        } else {
            if (this.fileName !== '') {
                this.fileName = '';
                this._cdr.markForCheck();
            }
        }
    }

    private triggerAutoProcess(): void {
        if (this.processingForm.valid) {
            this.processRecibos();
        }
    }

    onAction(action: ActionDef): void {
        if (action.actionNameKey === 'recibos_proc_enviar_action') {
            this.sendRecibos();
        }
    }

    onFileSelected(file: File | File[] | null): void {
        if (!file) {
            this.resetTable();
        } else {
            if (this.processingForm.valid) {
                this.isLoadingProcess = true;
                this.toggleSendButton(false);
                this._cdr.markForCheck();
            }
        }
    }

    resetFile(): void {
        this.processingForm.get('pdfFile').setValue(null);
        this.resetTable();
    }

    resetTable(): void {
        this.dataSource.data = [];
        this.toggleSendButton(false);
    }

    async processRecibos(): Promise<void> {
        this.isLoadingProcess = true;
        this.toggleSendButton(false);
        this.dataSource.data = [];
        this._cdr.markForCheck();

        try {
            const fileInput = this.processingForm.get('pdfFile').value;
            const file = Array.isArray(fileInput) ? fileInput[0] : fileInput;

            if (!file) {
                this.isLoadingProcess = false;
                this._cdr.markForCheck();
                return;
            }

            const base64File = await this.fileToBase64(file);
            const request = {
                archivo: base64File,
                tipo: this.processingForm.get('receiptType').value
            };

            this._recibosService.processRecibos(request).subscribe({
                next: (response) => {
                    const tableData = response.data.map(recibo => ({
                        ...recibo,
                        aprobado: true,
                        observaciones: ''
                    }));
                    this.dataSource.data = tableData;

                    setTimeout(() => {
                        if (this.paginator) this.dataSource.paginator = this.paginator;
                        if (this.sort) this.dataSource.sort = this.sort;

                        this.checkSendValidity();
                    });

                    this.isLoadingProcess = false;
                    this._cdr.markForCheck();
                },
                error: (error) => {
                    console.error(error);
                    this._notificationService.notifyError(this._i18nService.translate('recibos_proc_error_procesar', this.i18nName));
                    this.isLoadingProcess = false;
                    this._cdr.markForCheck();
                }
            });
        } catch (error) {
            console.error(error);
            this.isLoadingProcess = false;
            this._notificationService.notifyError('Error al leer el archivo local.');
            this._cdr.markForCheck();
        }
    }


    onApprovalChange(row: ReciboTabla, event: any): void {
        row.aprobado = event.checked;
        if (row.aprobado) {
            row.observaciones = '';
        }
        this.checkSendValidity();
    }

    onObservationsChange(): void {
        this.checkSendValidity();
    }

    checkSendValidity(): void {
        const hasData = this.dataSource.data && this.dataSource.data.length > 0;

        const isValid = hasData && this.dataSource.data.every(row =>
            row.aprobado || (!row.aprobado && row.observaciones && row.observaciones.trim() !== '')
        );

        this.toggleSendButton(hasData, !isValid);
    }

    sendRecibos(): void {
        this.actionStateChange.emit({ key: 'recibos_proc_enviar_action', changes: { disabled: true } });

        const requestData: ReciboAprobarRechazarRequest[] = this.dataSource.data.map(row => ({
            legajo: row.legajo,
            neto: row.neto,
            nombreCompleto: row.nombreCompleto,
            periodo: row.periodo,
            tipo: row.tipo,
            aprobado: row.aprobado,
            observaciones: row.observaciones,
            descripcion: row.descripcion,
            timeInMilis: row.timeInMilis,
        }));

        this._recibosService.approveRejectRecibos(requestData).subscribe({
            next: () => {
                this._notificationService.notifySuccess(this._i18nService.translate('recibos_proc_exito_envio', this.i18nName));
                this.resetFormFull();
            },
            error: (error) => {
                console.error(error);
                this._notificationService.notifyError(this._i18nService.translate('recibos_proc_error_envio', this.i18nName));
                this.actionStateChange.emit({ key: 'recibos_proc_enviar_action', changes: { disabled: false } });
                this._cdr.markForCheck();
            }
        });
    }

    resetFormFull(): void {
        this.processingForm.reset();
        this.resetTable();
        this.toggleSendButton(false);
        this._cdr.markForCheck();
    }

    private toggleSendButton(show: boolean, disabled: boolean = false): void {
        this.actionStateChange.emit({
            key: 'recibos_proc_enviar_action',
            changes: {
                hidden: !show,
                disabled: disabled
            }
        });
    }

    private fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve((reader.result as string).split(',')[1]);
            reader.onerror = error => reject(error);
        });
    }
}