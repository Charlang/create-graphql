import { gql } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import path from 'path';
import { IDataSources } from '../interface';

const clients = importSchema(path.join(__dirname, 'clients.graphql'));

export const typeDef = gql`
  # TODO : Add or remove schemas below
  # -----------------------------------
  # Schema Start
  ${clients}
  # Schema End
  # -----------------------------------
  extend type Query {
    getClientInfo(clientId: ID!): ClientInfo
  }
  # extend type Mutation {}
`;

export const resolvers = {
  Query: {
    // TODO : Add or remove resolvers below
    getClientInfo: async (_: any, props: any, { dataSources }: { dataSources: IDataSources }) => {
      return dataSources.accountApi.findById(props && props.clientId);
    }
  },
  // Mutation: {},
};
