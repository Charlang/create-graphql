import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { execute, toPromise } from 'apollo-link';
import express from 'express';
import dotenv from 'dotenv';
import logger from '../util/logger';

export { toPromise };

import { context as defaultContext, schema, UserApi, ApolloServer, server } from '../app';

import winston from 'winston';

export const getIntegrationServer = (context = defaultContext) => {
  const userApi = new UserApi();
  const server = new ApolloServer({
    schema,
    dataSources: () => ({ userApi }),
    context,
  });
  winston.remove(winston.transports.Console);
  return { server, userApi };
};

/**
 * e2e Testing Utils, as POC put it here, it's likely we are going to do e2e with separate repo
 */

const link = new HttpLink({
  uri: `http://localhost:4000/graphql`,
  fetch: fetch as any,
});

export const graphql = ({ query, variables = {} }: { query: any; variables?: any }) =>
  execute(link, { query, variables });

let testServer: any = null;

export const getE2eServer = async (id: any) => {
  if (testServer) {
    return testServer;
  } else {
    const envFileName = `./config/${process.env.NODE_ENV || 'dev'}.env`;
    console.info(`Using ${envFileName} file to supply config environment variables`);
    dotenv.config({ path: envFileName });

    try {
      const app = express();
      server.applyMiddleware({ app });
      const httpServer = await app.listen(4000);
      testServer = {
        stop: () => {
          httpServer.close();
          logger.close();
        },
      };
    } catch (err) {
      console.error(err);
    }
    return testServer;
  }
};
