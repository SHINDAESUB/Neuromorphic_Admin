import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import VueApollo from 'vue-apollo'

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'


//멑티 클라이언트 구성
//https://apollo.vuejs.org/guide/multiple-clients.html

Vue.use(VueApollo)

//뮤테이션 , 퀴리의 경우 HTTP
const httpLink = createHttpLink({
    uri: 'https://www.nemopai.com/graphql',
})

//서브스크립션의 경우는 Websocket
const wsLink = new WebSocketLink({
    uri: 'wss://www.nemopai.com/graphql',
    options:{reconnect: true}
})

//split을 사용해 들어온 작업이 서브스크립션이면 wsLink 아니면 httpLink  
const link = split(
    ({ query }) =>{
        const { kind , operation } = getMainDefinition(query) //getMainDefinition 함수를 사용해 query AST를 확인 한다. 
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
) 

const apolloClient = new ApolloClient({
    // Tells Apollo to use the link chain with the http link we set up.
    link,
    // Handles caching of results and mutations.
    cache: new InMemoryCache({ freezeResults: false }),
    // Useful if you have the Apollo DevTools installed in your browser.
    connectToDevTools: true
});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
});

export default apolloProvider;
