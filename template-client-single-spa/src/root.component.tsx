import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import Tabs from './components/tabs';
import Panel from './components/panel';
import client from './components/utils/apolloClient';

export const Index = () => {
  return (
    <ApolloProvider client={client}>
      <Tabs />
      <BrowserRouter>
        <Route path="/*/_SINGLE_SPA_APP_" render={() => <Panel />} />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Index;
