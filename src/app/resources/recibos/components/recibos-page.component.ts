import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CrudComponent } from '@fwk/components/crud/crud.component';
import { BaseCrudService } from '@fwk/services/base-crud-service/base.crud.service';
import { GenericHttpService } from '@fwk/services/generic-http-service/generic-http.service';
import { ActionDef } from '@fwk/model/component-def/action-def';
import { CustomPageComponent } from '@fwk/model/page-component.interface';
import { RECIBOS_CRUD_DEF } from '../recibos.crud-def';
import { ReciboPendiente, RecibosService } from '../recibos.service';
import { RecibosPendientesDialogComponent } from './recibos-pendientes-dialog.component';

@Component({
    selector: 'app-recibos-page',
    standalone: true,
    imports: [CommonModule, CrudComponent, MatButtonModule, MatDialogModule, MatProgressSpinnerModule],
    providers: [BaseCrudService, GenericHttpService],
    template: `
        <ng-container *ngIf="showCrud; else checking">
            <fwk-crud [componentName]="'RECIBOS'" [crudDefinition]="crudDefinition"></fwk-crud>
        </ng-container>
        <ng-template #checking>
            <div class="flex min-h-64 flex-col items-center justify-center gap-4 p-8 text-center">
                <mat-spinner *ngIf="loading" diameter="40"></mat-spinner>
                <p *ngIf="loading" class="m-0 text-secondary">Verificando recibos pendientes de firma...</p>
                <p *ngIf="errorMessage" class="m-0 text-warn">{{ errorMessage }}</p>
                <button *ngIf="errorMessage" mat-flat-button color="primary" (click)="verificarPendientes()">Reintentar</button>
            </div>
        </ng-template>
    `
})
export class RecibosPageComponent implements OnInit, CustomPageComponent {
    private readonly recibosService = inject(RecibosService);
    private readonly dialog = inject(MatDialog);
    private readonly cdr = inject(ChangeDetectorRef);

    readonly crudDefinition = RECIBOS_CRUD_DEF;
    showCrud = false;
    loading = true;
    errorMessage = '';

    ngOnInit(): void {
        this.verificarPendientes();
    }

    onAction(_action: ActionDef): void {}

    verificarPendientes(): void {
        this.loading = true;
        this.errorMessage = '';
        this.recibosService.listarPendientesFirma().subscribe({
            next: pendientes => {
                this.loading = false;
                if (pendientes.length === 0) {
                    this.showCrud = true;
                    this.cdr.markForCheck();
                    return;
                }
                this.abrirDialogoPendientes(pendientes);
            },
            error: () => {
                this.loading = false;
                this.errorMessage = 'No se pudo verificar si tenés recibos pendientes. Reintentá para ingresar a Mis Recibos.';
                this.cdr.markForCheck();
            }
        });
    }

    private abrirDialogoPendientes(pendientes: ReciboPendiente[]): void {
        const ref = this.dialog.open(RecibosPendientesDialogComponent, {
            width: '900px',
            maxWidth: '96vw',
            maxHeight: '92vh',
            disableClose: true,
            closeOnNavigation: false,
            autoFocus: false,
            restoreFocus: true,
            panelClass: 'control-mat-dialog',
            data: { pendientes }
        });
        ref.afterClosed().subscribe(result => {
            if (result === 'dashboard') return;
            this.showCrud = true;
            this.cdr.markForCheck();
        });
    }
}
