import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

export const link = createHttpLink({
  uri: '/graphql/%SINGLE_SPA_APP%'
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

export default client;
