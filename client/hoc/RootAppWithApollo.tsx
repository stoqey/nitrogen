import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split, from as fromLinks } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities'
import fetch from 'node-fetch';
import { SERVER_URI, isClient } from '../../shared/config';
import { getWebsocketLink } from '../../client/utils/window';
import withAmplitude from './withAmplitude';


function getApolloClient(): ApolloClient<any> {

	const wsLink = (
		(
			() => {
				if (isClient) {
					const wsLink = getWebsocketLink();
					return new WebSocketLink({ // if you instantiate in the server, the error will be thrown
						uri: wsLink,
						options: {
							reconnect: true
						},
					});
				}

				return null;
			})()
	)

	const httplink = new HttpLink({
		uri: SERVER_URI,
		credentials: 'same-origin',
		fetch: fetch as any,
	});

	const link = isClient ? split( //only create the split in the browser
		// split based on operation type
		({ query }) => {
			// @ts-ignore
			const { kind, operation } = getMainDefinition(query);
			return kind === 'OperationDefinition' && operation === 'subscription';
		},
		// @ts-ignore
		wsLink,
		httplink,
	) : httplink;

	// @ts-ignore
	const cache = isClient ? new InMemoryCache().restore(window && window.__APOLLO_STATE__) : new InMemoryCache();

	const client = new ApolloClient({
		cache,
		link,
		ssrMode: true,
	});

	return client;

}


export const RootAppWithApollo = (MyRootComponent: React.FunctionComponent) => {
	return function withApollo() {

		const client = getApolloClient();

		// instrument entire app with Amplitude
		const RootApp = withAmplitude(MyRootComponent);

		return (
			<ApolloProvider client={client}>
				<RootApp />
			</ApolloProvider>
		)
	}
}
