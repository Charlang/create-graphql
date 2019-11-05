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
        <Route path="/*/%SINGLE_SPA_APP%" render={() => <Panel />} />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Index;
