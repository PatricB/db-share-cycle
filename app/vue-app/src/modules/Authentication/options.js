export const providersOptions = {
    github: {
        name: 'github',
        url: '/auth/github',
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        authorizationHeaderPrefix: 'token ',
        userEndpoint: 'https://api.github.com/user',
        requiredUrlParams: ['client_id', 'redirect_uri'],
        optionalUrlParams: ['scope'],
        scope: ['user:email'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: 'width=1020,height=618',
        responseType: 'code',
        responseParams: {
            code: 'code',
            client_id: 'client_id',
            redirect_uri: 'redirect_uri'
        }
    }
};

export const defaultOptions = {
    client_id: null,
    redirect_uri: `${window.location.origin}/auth/callback`,
    storageNamespace: 'vue-auth',
    authenticationLifetimeMinutes: 240 // 4h
};
