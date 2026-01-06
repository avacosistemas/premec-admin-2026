import { Component, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '@fwk/auth/user.types';
import { UserService } from '@fwk/auth/user.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WELCOME_DATA } from './welcome.data';

@Component({
    selector: 'welcome',
    standalone: true,
    imports: [CommonModule, RouterLink, MatIconModule],
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
    user$: Observable<User>;
    sections = WELCOME_DATA;
    private _userService = inject(UserService);

    constructor() {
        this.user$ = this._userService.user$;
    }
}