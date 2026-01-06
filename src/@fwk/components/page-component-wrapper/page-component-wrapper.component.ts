import {
    Component, OnInit, ViewChild, ViewContainerRef,
    Injector, ChangeDetectorRef, OnDestroy, inject, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';

import { PageComponentDef } from '@fwk/model/component-def/page-component-def';
import { ActionDef } from '@fwk/model/component-def/action-def';
import { CustomPageComponent } from '@fwk/model/page-component.interface';
import { TranslatePipe } from '@fwk/pipe/translate.pipe';
import { BackButtonComponent } from '@fwk/components/back-button/backbutton.component';
import { AuthService } from '@fwk/auth/auth.service';
import { I18nService } from '@fwk/services/i18n-service/i18n.service';

@Component({
    selector: 'fwk-page-component-wrapper',
    standalone: true,
    imports: [
        CommonModule, MatButtonModule, MatIconModule,
        MatTooltipModule, MatProgressSpinnerModule,
        TranslatePipe, BackButtonComponent
    ],
    templateUrl: './page-component-wrapper.component.html'
})
export class PageComponentWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('contentContainer', { read: ViewContainerRef })
    contentContainer!: ViewContainerRef;

    definition: PageComponentDef;
    pageTitle: string;
    parentTitle: string | null = null;
    actionLoadingStates = new Map<string, boolean>();

    private destroy$ = new Subject<void>();
    private componentInstance: CustomPageComponent | null = null;

    private route = inject(ActivatedRoute);
    private cdr = inject(ChangeDetectorRef);
    private authService = inject(AuthService);
    private i18nService = inject(I18nService);
    private injector = inject(Injector);

    ngOnInit(): void {
        this.definition = this.route.snapshot.data['definition'];
        if (!this.definition) {
            console.error('[PageComponentWrapper] No se encontró la definición de página en los datos de la ruta.');
            return;
        }

        const i18n = this.i18nService.getDictionary(this.definition.i18n.name);
        this.pageTitle = i18n?.translate?.('page_title') || this.definition.name;

        if (i18n && this.definition.actions) {
            this.definition.actions.forEach(action => {
                if (action.actionNameKey) {
                    action.actionName = i18n.translate?.(action.actionNameKey) ?? action.actionNameKey;
                }
            });
        }

        this.route.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe(params => {
                this.parentTitle = params['parentTitle'] || null;
                this.cdr.markForCheck();
            });
    }

    ngAfterViewInit(): void {
        if (!this.contentContainer) {
            console.error("CRITICAL: contentContainer no se encontró en ngAfterViewInit.");
            return;
        }
        setTimeout(() => this.loadDynamicComponent(), 0);
    }

    private loadDynamicComponent(): void {
        if (!this.definition || !this.definition.component || !this.contentContainer) {
            console.error("No se puede cargar el componente dinámico: falta definición, componente o contenedor.");
            return;
        }

        this.contentContainer.clear();
        const componentRef = this.contentContainer.createComponent(this.definition.component, {
            injector: this.injector
        });

        if (componentRef.instance && typeof componentRef.instance.onAction === 'function') {
            this.componentInstance = componentRef.instance;
        } else {
            console.warn(`El componente ${this.definition.component.name} no parece implementar la interfaz 'CustomPageComponent' con el método 'onAction'. Las acciones del header podrían no funcionar.`);
        }

        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getVisibleActions(): ActionDef[] {
        if (!this.definition.actions) {
            return [];
        }
        return this.definition.actions.filter(action =>
            this.authService.hasPermission(action.actionSecurity)
        );
    }

    executeAction(action: ActionDef): void {
        if (this.componentInstance) {
            this.componentInstance.onAction(action);
        } else {
            console.error("No se puede ejecutar la acción porque la instancia del componente hijo no es válida o no implementa 'onAction'.");
        }
    }
}