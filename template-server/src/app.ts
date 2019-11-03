import dotenv from 'dotenv';
import morgan from 'morgan';
import logger from './util/logger';
import express from 'express';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import { RequestOptions } from 'apollo-datasource-rest';
import schema from './schema';
import { UserPg } from './pgDatasources';
import { UserApi } from './restDatasources';
import { ClientApi } from './rpcDatasources';

const { PORT = 4001, HOST = '0.0.0.0' } = process.env;

export const context = async ({ req }: { req: RequestOptions }) => {
  // simple auth check on every request
  // @ts-ignore
  const authorization = (req.headers && req.headers.authorization) || '';
  return { authorization };
};

export const dataSources = () => ({
  // Rest Data Sources
  userApi: new UserApi(),

  // JSON RPC Data Sources
  accountApi: new ClientApi(),

  // DB Data Sources
  userPg: new UserPg(),
});

export const server = new ApolloServer({
  schema,
  dataSources,
  context,
  // TODO: remove below two config when testing success on production
  introspection: true,
  playground: true,
});

if (process.env.NODE_ENV !== 'test') {
  (async () => {
    const envFileName = `./config/${process.env.NODE_ENV || 'dev'}.env`;
    logger.info(`Using ${envFileName} file to supply config environment variables`);
    dotenv.config({ path: envFileName });

    const option: morgan.Options = {
      skip: (req: any) => /health-shallow/.test(req.url),
      stream: logger.stream as any,
    };

    const app = express();
    app.use(helmet());
    app.use(morgan('combined', option));

    app.use('/health-shallow', (_: any, res: any) => {
      res.set('Content-Type', 'text/plain');
      res.status(200).send('ok');
    });

    server.applyMiddleware({ app });

    await app.listen({ host: HOST, port: PORT });
    logger.log('error', `> ✅ 🎉 🚀 🍻 Server ready at http://${HOST}:${PORT}${server.graphqlPath}`);
  })();
}

// Exports for testing
export { schema, ApolloServer, UserApi };
