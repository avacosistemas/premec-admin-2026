import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActionDef } from '@fwk/model/component-def/action-def';
import { FileService } from '@fwk/services/file/file.service';
import { NotificationService } from '@fwk/services/notification/notification.service';
import { PREFIX_DOMAIN_API } from 'environments/environment';
import { concatMap, finalize, from, tap, toArray } from 'rxjs';
import { ReciboPendiente, RecibosService } from '../recibos.service';

@Component({
    selector: 'app-recibos-pendientes-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTableModule
    ],
    template: `
        <div class="flex flex-col max-h-[90vh] min-w-[320px]">
            <header class="flex items-center justify-between gap-4 border-b px-5 py-4">
                <div>
                    <h2 mat-dialog-title class="m-0 text-xl font-semibold">Recibos pendientes de firma</h2>
                    <p class="m-0 mt-1 text-sm text-secondary">Firmá todos los recibos pendientes para continuar a Mis Recibos.</p>
                </div>
                <button mat-icon-button aria-label="Cerrar y volver al inicio" title="Cerrar" (click)="volverAlDashboard()">
                    <mat-icon svgIcon="heroicons_outline:x-mark"></mat-icon>
                </button>
            </header>

            <mat-dialog-content class="!m-0 !max-h-[65vh] overflow-auto p-0">
                <div *ngIf="loading" class="flex justify-center p-8"><mat-spinner diameter="32"></mat-spinner></div>
                <div *ngIf="errorMessage" class="flex flex-col items-center gap-3 p-6 text-center">
                    <p class="m-0">{{ errorMessage }}</p>
                    <button mat-stroked-button color="primary" (click)="cargarPendientes()">Reintentar</button>
                </div>
                <div *ngIf="!loading && !errorMessage" class="overflow-x-auto">
                    <table mat-table [dataSource]="recibos" class="w-full">
                        <ng-container matColumnDef="periodo">
                            <th mat-header-cell *matHeaderCellDef>Período</th>
                            <td mat-cell *matCellDef="let recibo">{{ recibo.monthString }} {{ recibo.year }}</td>
                        </ng-container>
                        <ng-container matColumnDef="tipo">
                            <th mat-header-cell *matHeaderCellDef>Tipo</th>
                            <td mat-cell *matCellDef="let recibo">{{ recibo.tipo }}</td>
                        </ng-container>
                        <ng-container matColumnDef="descripcion">
                            <th mat-header-cell *matHeaderCellDef>Descripción</th>
                            <td mat-cell *matCellDef="let recibo">{{ recibo.descripcion || '—' }}</td>
                        </ng-container>
                        <ng-container matColumnDef="estado">
                            <th mat-header-cell *matHeaderCellDef>Estado</th>
                            <td mat-cell *matCellDef="let recibo" class="whitespace-nowrap">{{ estadoFirma(recibo) }}</td>
                        </ng-container>
                        <ng-container matColumnDef="acciones">
                            <th mat-header-cell *matHeaderCellDef>Acciones</th>
                            <td mat-cell *matCellDef="let recibo" class="whitespace-nowrap">
                                <button mat-icon-button aria-label="Visualizar recibo" title="Visualizar recibo"
                                    [disabled]="busy" (click)="visualizar(recibo)">
                                    <mat-icon svgIcon="heroicons_outline:eye"></mat-icon>
                                </button>
                                <button mat-icon-button aria-label="Firmar recibo" title="Firmar recibo"
                                    [disabled]="busy" (click)="firmar(recibo)">
                                    <mat-spinner *ngIf="signingLine === key(recibo)" diameter="16"></mat-spinner>
                                    <mat-icon *ngIf="signingLine !== key(recibo)" svgIcon="heroicons_outline:pencil"></mat-icon>
                                </button>
                            </td>
                        </ng-container>
                        <tr mat-header-row *matHeaderRowDef="columns"></tr>
                        <tr mat-row *matRowDef="let row; columns: columns"></tr>
                    </table>
                </div>
            </mat-dialog-content>

            <footer class="flex items-center justify-between gap-3 border-t px-5 py-4">
                <span class="text-sm text-secondary">{{ recibos.length }} pendiente(s)</span>
                <button mat-flat-button color="primary" class="min-w-[150px] inline-flex items-center justify-center whitespace-nowrap"
                    [disabled]="busy || loading || !!errorMessage || !recibos.length"
                    (click)="firmarTodos()">
                    <mat-spinner *ngIf="signingAll" diameter="18" class="mr-2 shrink-0"></mat-spinner>
                    <span>{{ signingAll ? 'Firmando...' : 'Firmar todo' }}</span>
                </button>
            </footer>
        </div>
    `
})
export class RecibosPendientesDialogComponent implements OnInit {
    private readonly recibosService = inject(RecibosService);
    private readonly fileService = inject(FileService);
    private readonly notifications = inject(NotificationService);
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly router = inject(Router);

    readonly columns = ['acciones', 'periodo', 'tipo', 'descripcion', 'estado'];
    readonly previewAction: ActionDef = {
        actionType: 'file_preview',
        ws: {
            key: 'PREVIEW_RECIBO_WS',
            url: PREFIX_DOMAIN_API + 'descargarRecibo',
            method: 'GET',
            querystring: {
                attachmentEntry: 'attachmentEntry',
                year: 'year',
                month: 'month',
                monthString: 'monthString',
                tipo: 'tipo',
                descripcion: 'descripcion',
                filePath: 'filePath'
            }
        }
    };

    recibos: ReciboPendiente[] = [];
    loading = true;
    busy = false;
    signingAll = false;
    signingLine = '';
    errorMessage = '';
    private readonly estadosFirma: Record<string, string> = {};

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { pendientes: ReciboPendiente[] },
        private readonly dialogRef: MatDialogRef<RecibosPendientesDialogComponent>
    ) {}

    volverAlDashboard(): void {
        this.dialogRef.close('dashboard');
        this.router.navigateByUrl('/welcome');
    }

    ngOnInit(): void {
        this.recibos = this.data.pendientes || [];
        this.loading = false;
        if (this.recibos.length === 0) this.dialogRef.close(true);
    }

    cargarPendientes(): void {
        this.loading = true;
        this.errorMessage = '';
        this.recibosService.listarPendientesFirma().pipe(
            finalize(() => {
                this.loading = false;
                this.cdr.markForCheck();
            })
        ).subscribe({
            next: recibos => {
                this.recibos = recibos;
                if (recibos.length === 0) this.dialogRef.close(true);
            },
            error: () => {
                this.errorMessage = 'No se pudo consultar el estado de las firmas. Reintentá para continuar.';
            }
        });
    }

    visualizar(recibo: ReciboPendiente): void {
        this.fileService.previewFileByAction(this.previewAction, recibo).subscribe({
            error: () => this.notifications.notifyError('No se pudo abrir la vista previa del recibo.')
        });
    }

    key(recibo: ReciboPendiente): string {
        return `${recibo.attachmentEntry}-${recibo.lineNum}`;
    }

    estadoFirma(recibo: ReciboPendiente): string {
        return this.estadosFirma[this.key(recibo)] || 'Pendiente';
    }

    private marcarEstado(recibo: ReciboPendiente, estado: string): void {
        this.estadosFirma[this.key(recibo)] = estado;
        this.cdr.markForCheck();
    }

    private cerrarSiTodasFirmadas(): void {
        if (this.recibos.length > 0 && this.recibos.every(recibo => this.estadoFirma(recibo) === 'Firmado')) {
            this.dialogRef.close(true);
        }
    }

    firmar(recibo: ReciboPendiente): void {
        this.busy = true;
        this.signingLine = this.key(recibo);
        this.marcarEstado(recibo, 'Firmando...');
        this.recibosService.firmar(recibo).pipe(
            finalize(() => {
                this.busy = false;
                this.signingLine = '';
                this.cdr.markForCheck();
            })
        ).subscribe({
            next: () => {
                this.marcarEstado(recibo, 'Firmado');
                this.cerrarSiTodasFirmadas();
            },
            error: () => {
                this.marcarEstado(recibo, 'Error');
                this.notifications.notifyError('No se pudo firmar el recibo.');
            }
        });
    }

    firmarTodos(): void {
        if (!this.recibos.length || this.busy) return;
        const pendientes = this.recibos.filter(recibo => this.estadoFirma(recibo) !== 'Firmado');
        if (!pendientes.length) {
            this.cerrarSiTodasFirmadas();
            return;
        }
        this.busy = true;
        this.signingAll = true;
        from(pendientes).pipe(
            concatMap(recibo => {
                this.marcarEstado(recibo, 'Firmando...');
                return this.recibosService.firmar(recibo).pipe(
                    tap(() => this.marcarEstado(recibo, 'Firmado'))
                );
            }),
            toArray(),
            finalize(() => {
                this.busy = false;
                this.signingAll = false;
                this.cdr.markForCheck();
            })
        ).subscribe({
            next: () => this.dialogRef.close(true),
            error: () => {
                const fallido = pendientes.find(recibo => this.estadoFirma(recibo) === 'Firmando...');
                if (fallido) this.marcarEstado(fallido, 'Error');
                this.notifications.notifyError('No se pudieron firmar todos los recibos. Podés reintentar con los pendientes restantes.');
            }
        });
    }
}
