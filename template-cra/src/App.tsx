import React from 'react';
import { ApolloProvider } from '@apollo/client';
import Menu from './components/menu';
import client from './components/utils/apolloClient';
import creatStore, { history } from './components/redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Refresh from './components/menu/refresh';
import { Container, Paper, Typography } from '@material-ui/core';

const App: React.FC = () => {
  const store = creatStore();
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ConnectedRouter history={history}>
          <Container maxWidth="md" style={{ margin: '16px auto' }}>
            <Menu />
            <Paper>
              <Typography component="div" style={{ padding: 24, margin: 16 }}>
                Welcome to React Apollo Graphql Typescript playground!
              </Typography>
            </Paper>
          </Container>
          <Refresh />
        </ConnectedRouter>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
