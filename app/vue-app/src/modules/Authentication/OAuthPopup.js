import { getFullUrlPath } from './Utils';

export default class OAuthPopup {
    constructor (config) {
        if(!config.url && config.name) {
            return new Error('OAuth popup error occurred')
        }
        Object.defineProperties(this, {
            config: {
                get() {
                    return config
                }
            },
            popup: {
                value: null,
                writable: true
            }
        })
    }

    open(redirectUri, options) {
        return new Promise(((resolve, reject) => {
            try {
                this.popup = window.open(this.config.url, this.config.name, options);
                if (this.popup && this.popup.focus) {
                    this.popup.focus();
                }

                return resolve(this.pooling(redirectUri))
            } catch(e) {
                console.error(e)
                return reject(new Error('OAuth popup error occurred'));
            }
        }))
    }

    pooling(redirectUri) {
        return new Promise((resolve, reject) => {
            const redirectURL = new URL(redirectUri);
            const redirectUriPath = getFullUrlPath(redirectURL);

            let poolingInterval = setInterval(() => {
                if (!this.popup || this.popup.closed || this.popup.closed === undefined) {
                    clearInterval(poolingInterval);
                    poolingInterval = null;
                    reject(new Error('Auth popup window closed'));
                }

                try {
                    const popupWindowPath = getFullUrlPath(this.popup.location);

                    if (popupWindowPath === redirectUriPath) {
                        if (this.popup.location.search || this.popup.location.hash) {
                            const params = new URLSearchParams(this.popup.location.search);

                            if (params.has('error')) {
                                reject(new Error(params.get('error')));
                            } else {
                                resolve(params);
                            }
                        } else {
                            reject(new Error('OAuth redirect has occurred but no query or hash parameters were found.'));
                        }

                        clearInterval(poolingInterval);
                        poolingInterval = null;
                        this.popup.close();
                    }
                } catch (e) {
                    // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
                }
            }, 250);
        });
    }
}
