import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { UploadService } from './upload.service';
import { NotificationService } from '@fwk/services/notification/notification.service';
import { ActionDef } from '@fwk/model/component-def/action-def';
import { CustomPageComponent } from '@fwk/model/page-component.interface';

export interface FilePreview {
    file: File;
    name: string;
    size: number;
    type: string;
    extension: string;
    previewUrl?: SafeUrl;
    dimensions?: string;
    progress: number;
    isImage: boolean;
    isLoading?: boolean;
    error?: string;
}

@Component({
    selector: 'app-upload-files',
    templateUrl: './upload-files.component.html',
    styleUrls: ['./upload-files.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule
    ]
})
export class UploadFilesComponent implements CustomPageComponent {

    filePreviews: FilePreview[] = [];
    isDragging = false;

    private readonly MAX_PREVIEW_SIZE = 1500;
    private readonly THUMBNAIL_SIZE = 300;

    constructor(
        private uploadService: UploadService,
        private notificationService: NotificationService,
        private sanitizer: DomSanitizer
    ) { }

    onAction(action: ActionDef): void {
        if (action.actionNameKey === 'UPLOAD_FILES_ACTION_SUBIR') {
            this.uploadFiles();
        } else {
            console.warn(`Acción '${action.actionNameKey}' no manejada.`);
        }
    }

    onFileSelected(event: any): void {
        if (event.target.files && event.target.files.length) {
            this.handleFiles(event.target.files);
            event.target.value = '';
        }
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            this.handleFiles(files);
        }
    }

    private async handleFiles(files: FileList): Promise<void> {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const isImage = file.type.startsWith('image/');
            const extension = file.name.split('.').pop()?.toUpperCase() || 'FILE';

            const filePreview: FilePreview = {
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                isImage,
                extension: extension.length > 4 ? 'FILE' : extension,
                progress: 0,
                isLoading: isImage
            };

            this.filePreviews.push(filePreview);

            if (isImage) {
                this.generateThumbnail(file).then((result) => {
                    filePreview.previewUrl = result.previewUrl;
                    filePreview.dimensions = result.dimensions;
                    filePreview.isLoading = false;
                }).catch(err => {
                    console.error('Error generando preview', err);
                    filePreview.error = 'Error img';
                    filePreview.isLoading = false;
                });
            }
        }
    }

    private generateThumbnail(file: File): Promise<{ previewUrl: SafeUrl, dimensions: string }> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                const img = new Image();

                img.onload = () => {
                    const width = img.naturalWidth;
                    const height = img.naturalHeight;
                    const dimensions = `${width} x ${height}px`;

                    if (width < this.MAX_PREVIEW_SIZE && height < this.MAX_PREVIEW_SIZE) {
                        resolve({
                            previewUrl: this.sanitizer.bypassSecurityTrustUrl(e.target.result),
                            dimensions
                        });
                    } else {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        const scaleFactor = Math.min(this.THUMBNAIL_SIZE / width, this.THUMBNAIL_SIZE / height);
                        const newWidth = width * scaleFactor;
                        const newHeight = height * scaleFactor;

                        canvas.width = newWidth;
                        canvas.height = newHeight;

                        if (ctx) {
                            ctx.drawImage(img, 0, 0, newWidth, newHeight);

                            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                            resolve({
                                previewUrl: this.sanitizer.bypassSecurityTrustUrl(dataUrl),
                                dimensions
                            });
                        } else {
                            reject('Canvas context error');
                        }
                    }
                };

                img.onerror = reject;
                img.src = e.target.result;
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    removeFile(index: number): void {
        this.filePreviews.splice(index, 1);
    }

    clearAllFiles(): void {
        this.filePreviews = [];
    }

    uploadFiles(): void {
        if (!this.filePreviews || this.filePreviews.length === 0) {
            this.notificationService.notifyError('Por favor, selecciona al menos un archivo para subir.');
            return;
        }

        this.filePreviews.forEach((filePreview, index) => {
            if (filePreview.progress < 100) {
                this.upload(index, filePreview);
            }
        });
    }

    private upload(idx: number, filePreview: FilePreview): void {
        filePreview.progress = 0;

        this.uploadService.upload(filePreview.file).subscribe({
            next: (event: any) => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.filePreviews[idx].progress = Math.round(100 * (event.loaded / (event.total || 1)));
                } else if (event instanceof HttpResponse) {
                    this.filePreviews[idx].progress = 100;
                }
            },
            error: (err: any) => {
                this.filePreviews[idx].progress = 0;
                this.filePreviews[idx].error = 'Error al subir';
            }
        });
    }

    formatBytes(bytes: number, decimals = 2): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}