import { ApolloClient, InMemoryCache } from '@apollo/client'
export const client = new ApolloClient({
	uri: 'http://10.0.0.249:8005/graphql',
	cache: new InMemoryCache(),
})
