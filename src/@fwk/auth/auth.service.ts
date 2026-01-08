import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, switchMap, of, BehaviorSubject, throwError, catchError, tap, finalize, take, filter } from 'rxjs';
import { User } from '@fwk/auth/user.types';
import { UserService } from '@fwk/auth/user.service';
import { environment } from 'environments/environment';
import { AuthUtils } from '@fwk/auth/auth.utils';
import { AbstractAuthService, SignInData } from '@fwk/auth/abstract-auth.service';
import { I18nService } from '@fwk/services/i18n-service/i18n.service';

@Injectable({ providedIn: 'root' })
export class AuthService implements AbstractAuthService {
    private _httpClient = inject(HttpClient);
    private _router = inject(Router);
    private _userService = inject(UserService);
    private _i18nService = inject(I18nService);

    private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _userPermissions: Set<string> = new Set<string>();

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    private readonly TOKEN_KEY = 'accessToken';
    private readonly USER_DATA_KEY = 'currentUser';

    get authenticated$(): Observable<boolean> { return this._authenticated.asObservable(); }

    signIn(credentials: SignInData): Observable<any> {
        return this._httpClient.post(environment.auth.signIn, credentials, { responseType: 'json' }).pipe(
            tap((responseFromApi: any) => {

                const accessToken = responseFromApi.token;
                const refreshTokenValue = responseFromApi.refreshToken;

                if (!accessToken || typeof accessToken !== 'string') {
                    console.error('La respuesta de la API de login no contiene un "token" válido.', responseFromApi);
                    throw new Error('Respuesta de autenticación inválida.');
                }

                const emailNotSpecified = this._i18nService.getDictionary('fwk')?.translate?.('auth_email_not_specified') ?? 'auth_email_not_specified';

                const userForFuse: User = {
                    id: responseFromApi.guid,
                    name: responseFromApi.username,
                    email: responseFromApi.email || emailNotSpecified,
                    avatar: null,
                    status: 'online',
                    permisos: responseFromApi.permisos ? responseFromApi.permisos.split(';') : [],
                    refreshToken: refreshTokenValue || accessToken
                };

                this.setToken(accessToken);
                this.setUser(userForFuse);

                this._authenticated.next(true);
                this._userService.user = userForFuse;
                this._userPermissions = new Set(userForFuse.permisos);
            }),
            catchError((error) => throwError(() => error))
        );
    }

    signOut(): Observable<any> {
        this.clearLocalStorageAndState();
        return of(true);
    }

    check(): Observable<boolean> {
        if (this._authenticated.value) {
            return of(true);
        }

        const token = this.getToken();
        if (!token) {
            return of(false);
        }

        if (AuthUtils.isTokenExpired(token, 60)) {
            return this.refreshToken().pipe(
                switchMap(() => this.checkUserAndPermissions()),
                catchError(() => {
                    this.clearLocalStorageAndState();
                    return of(false);
                })
            );
        }

        return this.checkUserAndPermissions();
    }

    private checkUserAndPermissions(): Observable<boolean> {
        const user = this.getUserFromLocalStorage();
        if (!user || !user.id || !user.name) {
            this.clearLocalStorageAndState();
            return of(false);
        }

        this._authenticated.next(true);
        this._userService.user = user;
        this._userPermissions = new Set(user.permisos || []);
        return of(true);
    }

    refreshToken(): Observable<any> {
        if (this.isRefreshing) {
            return this.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1)
            );
        } else {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            const user = this.getUserFromLocalStorage();
            const refreshToken = user?.refreshToken;

            if (!refreshToken) {
                this.isRefreshing = false;
                return throwError(() => new Error('No refresh token available.'));
            }

            return this._httpClient.post<any>(environment.auth.refreshToken, { token: refreshToken }).pipe(
                tap((response: any) => {
                    const newAccessToken = response.token;
                    if (!newAccessToken || typeof newAccessToken !== 'string') {
                        console.error('La respuesta de la API de refresh token no contiene un "token" válido.', response);
                        throw new Error('Respuesta de refresh token inválida.');
                    }

                    this.setToken(newAccessToken);

                    if (response.refreshToken && user) {
                        user.refreshToken = response.refreshToken;
                        this.setUser(user);
                    }
                    this.refreshTokenSubject.next(newAccessToken);
                }),
                catchError((error) => {
                    this.signOut().subscribe();
                    return throwError(() => error);
                }),
                finalize(() => {
                    this.isRefreshing = false;
                })
            );
        }
    }

    hasPermission(permission?: string): boolean {
        if (!environment.production) {
            return true;
        }
        if (!permission) {
            return true;
        }
        return this._userPermissions.has(permission);
    }

    private clearLocalStorageAndState(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_DATA_KEY);
        this._authenticated.next(false);
        if (this._userService) {
            this._userService.user = null;
        }
        this._userPermissions.clear();
    }

    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post(environment.auth.forgotPassword, { email });
    }

    resetPassword(data: any): Observable<any> {
        return this._httpClient.post(environment.auth.resetPassword, data);
    }

    signUp(data: any): Observable<any> {
        return this._httpClient.post(environment.auth.signUp, data);
    }

    unlockSession(data: { email: string; password: string }): Observable<any> {
        return this.signIn({ username: data.email, password: data.password });
    }

    changePassword(data: any): Observable<any> {
        return this._httpClient.post(environment.auth.changePassword, data);
    }

    getToken(): string | null { return localStorage.getItem(this.TOKEN_KEY); }
    private setToken(token: string): void { localStorage.setItem(this.TOKEN_KEY, token); }
    private setUser(user: User): void { localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user)); }
    getUserFromLocalStorage(): User | null {
        const userData = localStorage.getItem(this.USER_DATA_KEY);
        return userData ? JSON.parse(userData) : null;
    }
}