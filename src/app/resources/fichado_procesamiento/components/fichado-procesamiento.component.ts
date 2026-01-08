import { Component, OnInit, inject, ChangeDetectorRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { FileUploaderComponent } from '@fwk/components/file-uploader/file-uploader.component';
import { FichadoProcesamientoService } from '../fichado-procesamiento.service';
import { FichadoEmpleado, FichadoDetalle, Empleado, FichadoApiResponse } from '../fichado-procesamiento.models';
import { NotificationService } from '@fwk/services/notification/notification.service';
import { TranslatePipe } from '@fwk/pipe/translate.pipe';
import { CustomPageComponent } from '@fwk/model/page-component.interface';
import { ActionDef } from '@fwk/model/component-def/action-def';
import { I18nService } from '@fwk/services/i18n-service/i18n.service';

@Component({
    selector: 'app-fichado-procesamiento',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatProgressSpinnerModule,
        TranslatePipe,
        FileUploaderComponent
    ],
    templateUrl: './fichado-procesamiento.component.html',
    styleUrls: ['./fichado-procesamiento.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class FichadoProcesamientoComponent implements OnInit, CustomPageComponent {
    @Output() actionStateChange = new EventEmitter<{ key: string, changes: Partial<ActionDef> }>();

    private _fichadoService = inject(FichadoProcesamientoService);
    private _notificationService = inject(NotificationService);
    private _i18nService = inject(I18nService);
    private _dialog = inject(MatDialog);
    private _cdr = inject(ChangeDetectorRef);

    i18nName = 'FICHADO_PROCESAMIENTO_I18N_DEF';
    readonly ACTION_SEND_KEY = 'FICHADO_PROCESAMIENTO_RESULTADOS_SECTION_SEND_BUTTON';

    jsonData: FichadoEmpleado[] = [];
    selectedFile: File | null = null;
    fileName: string = '';
    isProcessed: boolean = false;
    isProcessingExcel: boolean = false;
    isSendingToSap: boolean = false;

    dataSource = new MatTableDataSource<Empleado>([]);
    expandedElement: Empleado | null;
    columnsToDisplay = ['legajo', 'nombreCompleto'];
    columnsToDisplayWithExpand = [ 'expand', ...this.columnsToDisplay ];

    fichadosDisplayedColumns: string[] = [
        'dia', 'fecha', 'entrada1', 'salida1', 'entrada2', 'salida2',
        'totalDia', 'descanso', 'normal', 'extra50', 'extra100',
        'tarde', 'comentarios'
    ];

    ngOnInit(): void {
        this.toggleSendButton(false);
    }

    onAction(action: ActionDef): void {
        if (action.actionType === 'custom_send_sap') {
            this.sendToSap();
        }
    }

    private translate(key: string): string {
        return this._i18nService.getDictionary(this.i18nName)?.translate?.(key) || key;
    }

    private toggleSendButton(show: boolean, disabled: boolean = false): void {
        this.actionStateChange.emit({
            key: this.ACTION_SEND_KEY,
            changes: {
                hidden: !show,
                disabled: disabled
            }
        });
    }

    onFileSelected(fileOrFiles: File | File[] | null): void {
        if (fileOrFiles && !Array.isArray(fileOrFiles)) {
            this.selectedFile = fileOrFiles;
            this.fileName = this.selectedFile.name;
            
            this.isProcessed = false;
            this.jsonData = [];
            this.dataSource.data = [];
            this.toggleSendButton(false); 

            this.processExcel();
        } else {
            this.selectedFile = null;
            this.fileName = '';
            this.dataSource.data = [];
            this.isProcessed = false;
            this.toggleSendButton(false);
        }
    }

    private fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = (reader.result as string).split(',')[1];
                resolve(base64String);
            };
            reader.onerror = error => reject(error);
        });
    }

     async processExcel(): Promise<void> {
        if (!this.selectedFile) {
            return;
        }

        this.isProcessingExcel = true;
        this.toggleSendButton(false);
        this._cdr.markForCheck();

        try {
            const base64FileWithMime = await this.fileToBase64(this.selectedFile);

            this._fichadoService.processExcel(base64FileWithMime).subscribe({
                next: (response: FichadoApiResponse) => {
                    const datosFichados = response.data;
                    this.jsonData = datosFichados;

                    const employeeData: Empleado[] = datosFichados.map(item => ({
                        ...item.empleado,
                        nombreCompleto: `${item.empleado.nombre} ${item.empleado.apellido}`,
                        fichados: new MatTableDataSource<FichadoDetalle>(item.fichados)
                    }));

                    this.dataSource.data = employeeData;
                    this.isProcessed = true;
                    this.isProcessingExcel = false;
                    
                    this.toggleSendButton(true);
                    this._notificationService.notifySuccess(this.translate('FICHADO_PROCESAMIENTO_MSG_SUCCESS_PROCESS'));
                    this._cdr.markForCheck();
                },
                error: (err) => {
                    this.isProcessingExcel = false;
                    this.fileName = '';
                    this.selectedFile = null;
                    this._notificationService.notifyError(this.translate('FICHADO_PROCESAMIENTO_MSG_ERROR_PROCESS'));
                    console.error(err);
                    this._cdr.markForCheck();
                }
            });
        } catch (error) {
            this.isProcessingExcel = false;
            this.fileName = '';
            this.selectedFile = null;
            this._notificationService.notifyError(this.translate('FICHADO_PROCESAMIENTO_MSG_ERROR_BASE64'));
            console.error(error);
            this._cdr.markForCheck();
        }
    }


    sendToSap(): void {
        if (!this.jsonData || this.jsonData.length === 0) {
            this._notificationService.notifyError(this.translate('FICHADO_PROCESAMIENTO_MSG_NO_DATA'));
            return;
        }

        this.isSendingToSap = true;
        
        this.toggleSendButton(true, true); 
        this._cdr.markForCheck();

        const payload = {
            fichados: this.jsonData
        };

        this._fichadoService.enviarFichados(payload).subscribe({
            next: (response) => {
                this.isSendingToSap = false;
                this._notificationService.notifySuccess(this.translate('FICHADO_PROCESAMIENTO_MSG_SUCCESS_SEND'));

                this.isProcessed = false;
                this.jsonData = [];
                this.dataSource.data = [];
                this.selectedFile = null;
                this.fileName = '';
                
                this.toggleSendButton(false);
                this._cdr.markForCheck();
            },
            error: (err) => {
                this.isSendingToSap = false;
                this._notificationService.notifyError(this.translate('FICHADO_PROCESAMIENTO_MSG_ERROR_SEND'));
                
                this.toggleSendButton(true, false);
                
                console.error(err);
                this._cdr.markForCheck();
            }
        });
    }

    expandRow(element: Empleado): void {
        this.expandedElement = this.expandedElement === element ? null : element;
    }
}