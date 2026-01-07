import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@fwk/pipe/translate.pipe';
import { environment, PREFIX_DOMAIN_WEB } from 'environments/environment';

import * as QRCode from 'qrcode';

import { GenerarQrService } from '../generar-qr.service';

import { CustomPageComponent } from '@fwk/model/page-component.interface';
import { ActionDef } from '@fwk/model/component-def/action-def';

@Component({
    selector: 'app-generar-qr',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatProgressSpinnerModule,
        TranslatePipe
    ],
    templateUrl: './generar-qr.component.html',
    styles: [`
        .qr-image { max-width: 100%; height: auto; border-radius: 8px; display: block; }
    `]
})
export class GenerarQrComponent implements OnInit, CustomPageComponent {
    id: string = '';
    loading: boolean = false;
    qrCodeData: string | null = null;

    logoUrl: string = 'assets/images/logo/logo_premec.jpg'; 

    public i18nName = 'GENERAR_QR_I18N_DEF';
    private _generarQrService = inject(GenerarQrService);

    private defaultDomain: string = 'http://premec.ddns.net:48080/';

    constructor() {}

    ngOnInit() {
        this.qrCodeData = null;
    }

    onAction(action: ActionDef): void {
        console.log('Acción ejecutada:', action);
    }

    async generateQR(): Promise<void> {
        if (!this.id) return;

        this.loading = true;
        this.qrCodeData = null;

        this._generarQrService.getServiceCallId(this.id).subscribe({
            next: async (newId: string) => {
                const domain = PREFIX_DOMAIN_WEB ? PREFIX_DOMAIN_WEB : this.defaultDomain;
                const url = `${domain}informe-qr/?serviceCallId=${newId}`;

                try {
                    const qrCodeDataUrl = await QRCode.toDataURL(url, { 
                        errorCorrectionLevel: 'M',
                        margin: 2,
                        width: 300
                    });

                    this.qrCodeData = await this.addLogoToQRCode(qrCodeDataUrl, this.logoUrl);
                } catch (error) {
                    console.error('Error al generar QR visual:', error);
                } finally {
                    this.loading = false;
                }
            },
            error: (error) => {
                console.error('Error al obtener el ID codificado:', error);
                this.loading = false;
            }
        });
    }

    async addLogoToQRCode(qrCodeDataUrl: string, logoUrl: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const qrCanvas = document.createElement('canvas');
            const ctx = qrCanvas.getContext('2d');

            if (!ctx) {
                reject('No se pudo obtener el contexto del canvas');
                return;
            }

            const qrImage = new Image();
            qrImage.crossOrigin = 'Anonymous';
            
            qrImage.onload = () => {
                qrCanvas.width = qrImage.width;
                qrCanvas.height = qrImage.height;

                ctx.drawImage(qrImage, 0, 0);

                const logoImage = new Image();
                logoImage.crossOrigin = 'Anonymous';
                
                logoImage.onload = () => {
                    const logoSize = qrCanvas.width * 0.2;
                    const logoX = (qrCanvas.width - logoSize) / 2;
                    const logoY = (qrCanvas.height - logoSize) / 2;

                    ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);

                    resolve(qrCanvas.toDataURL('image/png'));
                };

                logoImage.onerror = (err) => {
                    console.warn('No se pudo cargar el logo, devolviendo QR sin logo.', err);
                    resolve(qrCodeDataUrl);
                };
                logoImage.src = logoUrl;
            };

            qrImage.onerror = (err) => reject(err);
            qrImage.src = qrCodeDataUrl;
        });
    }
}