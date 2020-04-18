import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';

export const link = createHttpLink({
  uri: '/graphql/_SINGLE_SPA_APP_'
});

const authLink = setContext((_: any, { headers }: any) => {
  // get the authentication token from local storage if it exists
  // TODO: Change to whatever your storage for auth token
  const token = localStorage.getItem('token') || '';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // TODO: change to your own format
      authorization: `Bearer ${token}` || '',
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link as any) as any
});

export default client;
