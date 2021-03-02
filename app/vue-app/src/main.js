import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Vue from 'vue';
import VueApollo from 'vue-apollo'
import App from './App';

// HTTP connection to the API
const httpLink = createHttpLink({
    uri: 'http://localhost/pimcore-graphql-webservices/db-sc-app?apikey=82ab2eabcc70e6cacacbc085476a7318',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

// Create the apollo provider with the client as default
const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

Vue.use(VueApollo)

new Vue({
    render: h => h(App),
    apolloProvider
}).$mount("#app");
