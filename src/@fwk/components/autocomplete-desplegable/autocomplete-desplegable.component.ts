import { Component, OnInit, Input, forwardRef, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, FormControl, AbstractControl, ValidationErrors, NG_VALIDATORS, ReactiveFormsModule, FormGroupDirective, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOptionModule, ErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, startWith, filter } from "rxjs/operators";
import { ApiAutocompleteConfiguration, AutocompleteSearchTerm } from '../autocomplete/autocomplete.interface';
import { environment } from '../../../environments/environment';
import { TranslatePipe } from '../../pipe/translate.pipe';
import { AutocompleteOptions } from '@fwk/model/dynamic-form/dynamic-field-options.interface';

@Component({
     selector: 'fwk-autocomplete-desplegable',
    templateUrl: './autocomplete-desplegable.component.html',
    styleUrls: ['./autocomplete-desplegable.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        TranslatePipe,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutocompleteDesplegableComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => AutocompleteDesplegableComponent),
            multi: true
        }
    ]
})
export class AutocompleteDesplegableComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

    @Input() config!: ApiAutocompleteConfiguration;
    @Input() searchTermInterface!: AutocompleteSearchTerm;
    @Input() errorMessage: string | null = null;
    
    @ViewChild('autoCompleteInput', { read: MatAutocompleteTrigger }) autoCompleteTrigger!: MatAutocompleteTrigger;

    autocompleteControl = new FormControl<string | object | null>(null);
    filteredOptions$: Observable<any[]> = of([]);

    matcher = new class implements ErrorStateMatcher {
        constructor(private component: AutocompleteDesplegableComponent) { }
        isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
            return !!(this.component.errorMessage || (control?.invalid && (control?.dirty || control?.touched)));
        }
    }(this);

    private destroy$ = new Subject<void>();
    private isOptionSelected: boolean = false;

    onChange: (value: any) => void = () => { };
    onTouched: () => void = () => { };

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        if (!this.searchTermInterface) {
            console.error('[FWK] AutocompleteDesplegableComponent requiere un [searchTermInterface].');
            return;
        }

        this.setupFiltering();

        this.autocompleteControl.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
                if (typeof value !== 'string') {
                    this.onChange(value);
                }
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private setupFiltering(): void {
        const options = this.config?.options as AutocompleteOptions;
        const searchOnFocus = options?.searchOnFocus !== false;

        this.filteredOptions$ = of(null).pipe(
            switchMap(() => this.autocompleteControl.valueChanges.pipe(
                startWith(searchOnFocus ? '' : null),
            )),
            takeUntil(this.destroy$),
            filter(value => value !== null),
            debounceTime(environment.AUTOCOMPLETE_WAITING_TIME ?? 300),
            distinctUntilChanged(),
            switchMap(value => {
                if (this.isOptionSelected) {
                    this.isOptionSelected = false;
                    return of([]);
                }

                const searchTerm = typeof value === 'string' ? value : '';

                if (searchTerm === '' && !searchOnFocus) {
                    return of([]);
                }

                return this.searchTermInterface.search(searchTerm);
            })
        );
    }

    writeValue(value: any): void {
        this.autocompleteControl.setValue(value, { emitEvent: false });
        this.cdr.markForCheck();
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.autocompleteControl.disable() : this.autocompleteControl.enable();
        this.cdr.markForCheck();
    }

    validate(control: AbstractControl): ValidationErrors | null {
        const value = this.autocompleteControl.value;
        const isRequired = this.config?.required;

        if (isRequired && (value === null || value === undefined)) {
            return { required: true };
        }

        if (typeof value === 'string' && value.trim() !== '') {
            return { selectOrCleanField: true };
        }

        return null;
    }

    displayWith = (value: any): string => {
        if (!value || typeof value !== 'object') {
            return typeof value === 'string' ? value : '';
        }

        const labelKey = this.config?.options?.elementLabel;

        if (labelKey && value[labelKey]) {
            return value[labelKey];
        }

        return '';
    }

    onOptionSelected(): void {
        this.isOptionSelected = true;
        this.onTouched();
    }

    openDropdown(): void {
        if (this.autoCompleteTrigger) {
            this.autoCompleteTrigger.openPanel();
        }
    }
}