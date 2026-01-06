export const PREFIX_DOMAIN_API = 'http://premec.ddns.net:48080/ws-rest/';
export const PREFIX_DOMAIN_WEB = 'http://localhost:4200/';
export const PREFIX_STATS_API = PREFIX_DOMAIN_API + 'estadisticas/'; 
export const PREFIX_SWAGGER_API = 'http://premec.ddns.net:48080/ws-rest-test/v2/api-docs';

export const environment = {
    localAuth: true,
    useMocks: false,
    production: false,
    security: true,
    dummyServices: false,
    hmr: false,

    apiBaseUrl: PREFIX_DOMAIN_API,
    SITE_DOMAIN_WEB: 'http://localhost:4200/',

    auth: {
        signIn: PREFIX_DOMAIN_API + 'authAdmin',
        signOut: PREFIX_DOMAIN_API + 'user/logout',
        refreshToken: PREFIX_DOMAIN_API + 'refresh',
        forgotPassword: PREFIX_DOMAIN_API + 'auth/forgot-password',
        resetPassword: PREFIX_DOMAIN_API + 'password/reset',
        signUp: PREFIX_DOMAIN_API + 'auth/sign-up'
    },

    AUTOCOMPLETE_WAITING_TIME: 700,

    URL_ROOT: '',
    URL_LOGIN: '/',
};