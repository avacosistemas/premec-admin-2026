import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from '@fwk/auth/auth.service';
import { I18nService } from '@fwk/services/i18n-service/i18n.service';
import { TranslatePipe } from '@fwk/pipe/translate.pipe';
import { finalize } from 'rxjs';
import { LogoComponent } from '@fwk/components/logo/logo.component';

interface ForgotPasswordForm {
    email: FormControl<string>;
}

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, RouterLink, TranslatePipe, LogoComponent],
})
export class AuthForgotPasswordComponent implements OnInit {
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    forgotPasswordForm: FormGroup<ForgotPasswordForm>;
    showAlert: boolean = false;
    private _i18nService = inject(I18nService);

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    sendResetLink(): void {
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        this.forgotPasswordForm.disable();
        this.showAlert = false;

        this._authService.forgotPassword(this.forgotPasswordForm.get('email').value)
            .pipe(
                finalize(() => {
                    this.forgotPasswordForm.enable();
                    this.forgotPasswordNgForm.resetForm();
                    this.showAlert = true;
                }),
            )
            .subscribe(
                (response) => {
                    this.alert = {
                        type: 'success',
                        message: this._i18nService.translate('forgot_password_success_message'),
                    };
                },
                (response) => {
                    this.alert = {
                        type: 'error',
                        message: this._i18nService.translate('forgot_password_error_message'),
                    };
                },
            );
    }
}