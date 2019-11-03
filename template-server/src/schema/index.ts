import { buildFederatedSchema } from '@apollo/federation';

// TODO : import schema and resolvers below
import { typeDef as clientsDef, resolvers as clientsResolver } from './clientsExample';
import {
  typeDef as user,
  resolvers as userResolver,
} from './userExample/user';

const schema = buildFederatedSchema([
  {
    typeDefs: clientsDef,
    resolvers: clientsResolver,
  },
  {
    typeDefs: user,
    resolvers: userResolver,
  }
]);

export default schema;
