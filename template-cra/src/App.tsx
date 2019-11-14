import React from 'react';
import { ApolloProvider } from '@apollo/client';
import GqlExample from "./components/graphql";
import client from './components/utils/apolloClient';
import creatStore, { history } from './components/redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

const App: React.FC = () => {
  const store = creatStore();
  return (
    <Provider store={store}>
        <ApolloProvider client={client}>
          <ConnectedRouter history={history}>
            <GqlExample />
          </ConnectedRouter>
        </ApolloProvider>
    </Provider>
  );
};

export default App;
