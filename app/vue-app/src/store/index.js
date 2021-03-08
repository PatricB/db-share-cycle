import Vue from 'vue'
import Vuex from 'vuex'
import Authentication from '../modules/Authentication';

const auth = new Authentication('github', {
    client_id: 'b7aa842f7c33d704d556',
    baseUrl: 'http://localhost'
}, window.fetch.bind(window));

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        pendingAuthenticationRequest: [],
        isAuthenticated: false
    },
    getters: {
      authenticationPending (state) {
          return state.pendingAuthenticationRequest.length > 0
      }
    },
    mutations: {
        setIsAuthenticated (state, value) {
            state.isAuthenticated = value;
        },
        addPendingAuthenticationRequest (state, requestKey) {
            state.pendingAuthenticationRequest.push(requestKey);
        },
        removePendingAuthenticationRequest (state, requestKey) {
            const index = state.pendingAuthenticationRequest.indexOf(requestKey);
            if (index > -1) { state.pendingAuthenticationRequest.splice(index, 1) }
        }
    },
    actions: {
        authenticate ({ dispatch, commit }) {
            const requestKey = 'authenticate-' + (new Date()).getTime();
            commit('addPendingAuthenticationRequest', requestKey);

            auth.authenticate().then(() => {
                return dispatch('checkIfAuthenticated')
            }).finally(() => commit('removePendingAuthenticationRequest', requestKey));
        },
        checkIfAuthenticated ({ commit }) {
            const requestKey = 'authenticate-' + (new Date()).getTime();
            commit('addPendingAuthenticationRequest', requestKey);

            return auth.isAuthenticated().then(value => {
                commit('setIsAuthenticated', value);

                return value
            }).finally(() => commit('removePendingAuthenticationRequest', requestKey))
        },
        forgetLogin ({ commit }) {
            auth.forgetLogin();
            commit('setIsAuthenticated', false);
        }
    },
    strict: debug
})
