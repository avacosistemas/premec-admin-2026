//export const PREFIX_DOMAIN_API = 'http://localhost:8080/ws-rest/';
export const PREFIX_DOMAIN_API = 'http://premec.ddns.net:48080/ws-rest/';
export const PREFIX_DOMAIN_WEB = 'http://premec.ddns.net:48080/';
export const PREFIX_STATS_API = PREFIX_DOMAIN_API + 'estadisticas/'; // Reservado prefijo y endpoint para dashboards
export const PREFIX_SWAGGER_API = 'http://localhost:8080/ws-rest/v2/api-docs';

export const environment = {
    appId: 'premecApp',
    localAuth: true,
    useMocks: false,
    production: true,
    security: true,
    dummyServices: false,
    hmr: false,

    apiBaseUrl: PREFIX_DOMAIN_API,
    SITE_DOMAIN_WEB: PREFIX_DOMAIN_WEB,

    auth: {
        signIn: PREFIX_DOMAIN_API + 'auth',
        signOut: PREFIX_DOMAIN_API + 'user/logout',
        refreshToken: PREFIX_DOMAIN_API + 'refresh',
        forgotPassword: PREFIX_DOMAIN_API + 'password/reset',
        changePassword: PREFIX_DOMAIN_API + 'password/update/',
        resetPassword: PREFIX_DOMAIN_API + 'password/reset',
        signUp: PREFIX_DOMAIN_API + 'auth/sign-up'
    },

    AUTOCOMPLETE_WAITING_TIME: 700,

    appConfig: {
        appName: 'PREMEC',
        appLogo: 'assets/images/logo/logo_premec.png',
        appLogoSmall: 'assets/images/logo/logo_premec.png',
        welcomeTitleLine1: 'Administrador de',
        welcomeTitleLine2: 'Contenidos',
        signInWelcomeSubtitle: 'Bienvenido al panel. Desde aquí podrás gestionar tu sistema.',
        urlToRedirectOnLogout: '/sign-in',
        showWelcome: true,
        urlToRedirect: '/reclamos',
        showSearchButton: true,
        showCollapseSidebarIcon: true,
        sidebarOpened: true,
        logoConfig: {
            showName: true,
            containerClass: 'w-16',
            imgClass: 'w-10 h-10',
            nameClass: 'text-xl font-bold'
        }
    },

    customRoutes: [
        { path: 'welcome', loadChildren: () => import('app/modules/welcome/welcome.routes') }
    ]
};