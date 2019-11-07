import express from 'express';
import axios from 'axios';
import morgan from 'morgan';
import helmet from 'helmet';
import logger from './util/logger';
import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
const {
  PORT = 4000,
  HOST = '0.0.0.0',
  GRAPHQL_SERVER_API_A = 'http://0.0.0.0:4002',
} = process.env;
let count = 0;
let timer: any = null;
let userSuccess = false;

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }: { request: any; context: any }) {
    request.http.headers.set('authorization', context.authorization);
  }
}

function startGatewayServer() {
  const gateway = new ApolloGateway({
    serviceList: [
      { name: 'user', url: `${GRAPHQL_SERVER_API_A}/graphql` },
    ],
    buildService() {
      return new AuthenticatedDataSource();
    },
  });

  (async () => {
    const { schema, executor } = await gateway.load();
    const option: morgan.Options = {
      skip: (req: any) => /health-shallow/.test(req.url),
      stream: logger.stream as any,
    };

    const server = new ApolloServer({
      schema,
      executor,
      context: ({ req }: any) => {
        const authorization = req.headers.authorization || '';
        return { authorization };
      },
    });

    const app = express();
    app.use(helmet());
    app.use(morgan('combined', option));

    app.use('/health-shallow', (_: any, res: any) => {
      res.set('Content-Type', 'text/plain');
      res.status(200).send('ok');
    });
    server.applyMiddleware({ app });

    app.listen(
      {
        host: HOST,
        port: PORT,
      },
      () => {
        logger.log('error', `> ✅ 🎉 🚀 🍻 Server ready at http://${HOST}:${PORT}${server.graphqlPath}`);
      },
    );
  })();
}

async function getStatus() {
  try {
    const results = await Promise.all([
      axios.get(`${GRAPHQL_SERVER_API_A}/health-shallow`),
    ]);
    const [{ data }] = results[0].data;
    userSuccess = data === 'ok';
  } catch (err) {
    if (count < 10) {
      if (err.config.url.indexOf(GRAPHQL_SERVER_API_A) >= 0) {
        logger.log('error', `> 🔥🔥🔥 ${GRAPHQL_SERVER_API_A} not ready, trying again`);
      }
    } else {
      logger.log('error', err);
    }
  } finally {
    if (userSuccess) {
      clearInterval(timer);
      startGatewayServer();
    } else if (count >= 10) {
      clearInterval(timer);
    } else {
      count++;
    }
  }
}

timer = setInterval(getStatus, 500);
