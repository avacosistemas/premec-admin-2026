import { Component, Input, forwardRef, ElementRef, ViewChild, ChangeDetectorRef, Optional, Host, SkipSelf, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS, FormsModule, ControlContainer, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslatePipe } from '../../../pipe/translate.pipe';

@Component({
     selector: 'fwk-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatProgressBarModule,
        TranslatePipe
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => FileComponent),
            multi: true
        }
    ],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new Optional(), new SkipSelf(), ControlContainer]]
        }
    ]
})
export class FileComponent implements ControlValueAccessor, Validator {

    @Input() field!: any;
    @Input() errorMessage: string | null = null; 
    
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    fileName: string | null = null;
    fileSize: string | null = null;
    
    isDisabled: boolean = false;
    isDragging: boolean = false;
    isLoading: boolean = false;
    hasError: boolean = false;

    onChange: (value: any) => void = () => {};
    onTouch: () => void = () => {};
    onValidatorChange: () => void = () => {};

    constructor(
        private cdr: ChangeDetectorRef,
        @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
    ) {}

    @HostListener('dragover', ['$event']) onDragOver(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        if (!this.isDisabled) this.isDragging = true;
    }

    @HostListener('dragleave', ['$event']) onDragLeave(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        this.isDragging = false;
    }

    @HostListener('drop', ['$event']) onDrop(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
        this.isDragging = false;
        if (this.isDisabled) return;

        const files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    writeValue(value: any): void {
        if (!value) {
            this.clearState();
        } else {
            this.fileName = "Archivo actual en memoria";
            this.fileSize = null;
        }
        this.cdr.markForCheck();
    }

    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouch = fn; }
    
    setDisabledState(isDisabled: boolean): void { 
        this.isDisabled = isDisabled;
        this.cdr.markForCheck();
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.field?.required && !control.value) { 
            return { required: true }; 
        }
        if (this.hasError) {
            return { invalidFile: true };
        }
        return null;
    }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.processFile(input.files[0]);
        }
    }

    processFile(file: File): void {
        if (this.acceptTypes && !this.checkFileType(file)) {
            this.handleError('Tipo de archivo no permitido. Solo ' + this.acceptTypes);
            return;
        }

        this.isLoading = true;
        this.hasError = false;
        this.fileName = file.name;
        this.fileSize = this.formatBytes(file.size);
        
        const reader = new FileReader();
        
        reader.onload = () => {
            const base64Result = reader.result as string;
            
            const rawBase64 = base64Result.split(',')[1];

            const byteArray = this.base64ToByteArray(rawBase64);
            this.onChange(byteArray); 

            this.updatePreview(rawBase64);
            
            this.isLoading = false;
            this.cdr.markForCheck();
        };

        reader.onerror = () => {
            this.isLoading = false;
            this.handleError('Error al leer el archivo');
        };

        reader.readAsDataURL(file);
        this.onTouch();
    }

    private base64ToByteArray(base64: string): number[] {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

    private updatePreview(value: string | null): void {
        const previewFieldName = this.field?.options?.['previewField'];
        
        if (previewFieldName && this.controlContainer && this.controlContainer.control) {
            const formGroup = this.controlContainer.control as FormGroup;
            const previewControl = formGroup.get(previewFieldName);
            
            if (previewControl) {
                previewControl.setValue(value);
                previewControl.markAsDirty();
            }
        }
    }

    private checkFileType(file: File): boolean {
        if (!this.acceptTypes) return true;
        const accepted = this.acceptTypes.split(',').map(t => t.trim().toLowerCase());
        const ext = '.' + file.name.split('.').pop()?.toLowerCase();
        const type = file.type.toLowerCase();
        return accepted.some(acc => acc === ext || type.match(new RegExp(acc.replace('*', '.*'))));
    }

    removeFile(event: Event): void {
        event.stopPropagation();
        this.clearState();
        this.onChange(null);
        this.updatePreview(null);
        this.onTouch();
        if (this.fileInput) this.fileInput.nativeElement.value = '';
    }

    private clearState(): void {
        this.fileName = null;
        this.fileSize = null;
        this.hasError = false;
        this.isLoading = false;
        this.cdr.markForCheck();
    }

    private handleError(msg: string): void {
        this.hasError = true;
        this.fileName = msg;
        this.fileSize = null;
        this.onChange(null);
        this.cdr.markForCheck();
    }

    triggerFileInput(): void {
        if (!this.isDisabled) {
            this.fileInput.nativeElement.click();
        }
    }

    private formatBytes(bytes: number, decimals = 2): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    get acceptTypes(): string {
        return this.field?.options?.acceptTypes ?? '';
    }
}