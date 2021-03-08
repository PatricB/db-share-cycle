import OAuthPopup from './OAuthPopup';
import SessionStorage from './SessionStorage';
import { defaultOptions, providersOptions } from './options';

class Authentication {

    /**
     * @param  {String} provider
     * @param {defaultOptions} extendingOptions
     * @param {Function} fetcher
     * @return {Authentication} Authentication
     */
    constructor (provider, extendingOptions, fetcher) {
        const options = Object.assign(defaultOptions, extendingOptions);

        if (!provider || !Object.prototype.hasOwnProperty.call(providersOptions, provider)) {
            provider = 'github';
        }

        if (!fetcher) {
            fetcher = fetch;
        }

        const storage = new SessionStorage(options.storageNamespace);

        Object.defineProperties(this, {
            options: {
                get () {
                    return options;
                }
            },
            fetcher: {
                value: fetcher
            },
            provider: {
                get () {
                    return provider;
                }
            },
            providerOptions: {
                get () {
                    return providersOptions[provider];
                }
            },
            storage: {
                get () {
                    return storage;
                }
            },
            lastLogin: {
                value: null,
                writable: true
            }
        });
    }

    /**
     * Check if token is valid
     * @return {Boolean}
     */
    tokenIsValid () {
        let token = this.getToken();

        if (token) {  // Token is present

            if (token.split('.').length === 3) {  // Token with a valid JWT format XXX.YYY.ZZZ
                try { // Could be a valid JWT or an access token with the same format
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace('-', '+').replace('_', '/');
                    const exp = JSON.parse(window.atob(base64)).exp;
                    if (typeof exp === 'number') {  // JWT with an optional expiration claims
                        return Math.round(new Date().getTime() / 1000) < exp;
                    }
                } catch (e) {
                    return true;  // Pass: Non-JWT token that looks like JWT
                }
            }

            // other token
            return true;

        }
        return false;
    }

    isAuthenticated() {
        return new Promise(((resolve) => {
            if(!this.tokenIsValid()) {
                return resolve(false)
            }

            if (!this.authenticationExpired()) {
                return resolve(true)
            }

            this.getUser().then(() => resolve(true)).catch(() => resolve(false));
        }))
    }

    /**
     * Try to authenticate user via oauth provider.
     *
     * @return {Promise}
     */
    authenticate () {
        return new Promise((resolve, reject) => {
            const url = [this.providerOptions.authorizationEndpoint, this._stringifyRequestParams()].join('?');

            const popup = new OAuthPopup({
                name: this.providerOptions.name,
                url,
                clientId: this.options.clientId
            });

            popup.open(this.options.redirect_uri, this.providerOptions.popupOptions)
                .then((params) => {
                    return this.requestToken(Object.fromEntries(params)).then(response => {
                        this.setToken(response.data.access_token);

                        this.isAuthenticated().then(isAuthenticated => {
                            if (isAuthenticated) {
                                return resolve(response.data);
                            } else {
                                return reject(new Error('Authentication failed'));
                            }
                        });
                    });
                })
                .catch((reason => {
                    reject(new Error(reason.toString()));
                }));
        });

    }

    forgetLogin () {
        this.removeToken()
        this.removeLastLogin()
    }

    /**
     * Check if last login is expired.
     * @return {Boolean}
     */
    authenticationExpired () {
        if(this.getLastLogin()) {
            const compareDate = new Date();
            const lifeTime = this.options.authenticationLifetimeMinutes ?? 240;
            compareDate.setMinutes(compareDate.getMinutes() - lifeTime)

            return this.getLastLogin().getTime() > compareDate.getTime()
        }

        return true
    }

    /**
     * Request user data from auth provider.
     * @return {Promise<Response>}
     */
    getUser () {
        return this.fetcher(this.providerOptions.userEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.providerOptions.authorizationHeaderPrefix + this.getToken()
            }
        });
    }

    /**
     * Get token
     * @return {String} Authentication token
     */
    getToken () {
        return this.storage.getItem('token');
    }

    /**
     * Set new authentication token
     * @param {String} token
     */
    setToken (token) {
        if (token) {
            this.storage.setItem('token', token);
        }
    }

    /**
     * Remove authentication token
     */
    removeToken () {
        this.storage.removeItem('token');
    }

    /**
     * Get token
     * @return {Date|null} lastlogin date
     */
    getLastLogin () {
        return this.lastLogin;
    }

    /**
     * Set new last login date
     * @param {Date} lastLogin
     */
    setLastLogin (lastLogin) {
        if (lastLogin && Date.parse(lastLogin.toISOString())) {
            this.lastLogin = lastLogin;
        }
    }

    /**
     * remove new authentication token
     */
    removeLastLogin () {
        this.lastLogin = null;
    }

    /**
     * Exchange temporary oauth data for access token
     *
     * @param  {Object} oauth
     * @return {Promise<Response>}
     */
    requestToken (oauth) {
        let payload = {};

        for (let key in this.providerOptions.responseParams) {

            switch (key) {
                case 'code':
                    payload[key] = oauth.code;
                    break;
                case 'client_id':
                    payload[key] = this.providerOptions.client_id;
                    break;
                case 'redirect_uri':
                    payload[key] = this.providerOptions.redirect_uri;
                    break;
                default:
                    payload[key] = oauth[key];
            }
        }

        if (this.options.state) {
            payload.state = this.options.state;
        }

        let exchangeTokenUrl;
        if (this.options.baseUrl) {
            exchangeTokenUrl = this.options.baseUrl + this.providerOptions.url;
        } else {
            exchangeTokenUrl = this.providerOptions.url;
        }

        return this.fetcher(exchangeTokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: new URLSearchParams(payload)
        }).then(response => response.json());
    }

    /**
     * Stringify oauth params
     *
     * @return {String}
     */
    _stringifyRequestParams () {
        const keyValuePairs = [];

        ['requiredUrlParams', 'optionalUrlParams'].forEach((categoryName) => {
            if (!this.providerOptions[categoryName]) { return; }
            if (!Array.isArray(this.providerOptions[categoryName])) { return; }

            this.providerOptions[categoryName].forEach((paramName) => {
                let paramValue = this.providerOptions[paramName];

                if (!paramValue && this.options[paramName]) {
                    paramValue = this.options[paramName];
                }

                if (paramName === 'redirect_uri' && !paramValue) { return; }

                if (paramName === 'scope' && Array.isArray(paramValue)) {
                    paramValue = paramValue.join(this.providerOptions.scopeDelimiter);
                    if (this.providerOptions.scopePrefix) {
                        paramValue = [this.providerOptions.scopePrefix, paramValue].join(this.providerOptions.scopeDelimiter);
                    }
                }

                keyValuePairs.push([paramName, paramValue]);
            });
        });

        return keyValuePairs.map((param) => param.join('=')).join('&');
    }
}

export default Authentication;
