import { gql } from 'apollo-server-express';
import { IDataSources } from '../interface';

export const typeDef = gql`
  extend type Query {
    getMenu: [Menu]
    getAllUser: [User]
    refreshToken(tokenRequest: RefreshTokenRequest!): Token!
  }

  type User {
    id: String
    email: String
  }

  type Menu {
    code: String
    title: String
    subMenu: [SubMenu]
  }

  type SubMenu {
    code: String
    title: String
  }

  input RefreshTokenRequest {
    refreshToken: String!
    email: String!
  }

  type Token {
    token: String
    refreshToken: String
  }

`;

export const resolvers = {
  Query: {
    // TODO : replace with your real world BE Restful service
    getMenu: async (_: any, __: any, { dataSources }: {dataSources: IDataSources}) => {
      const token = await dataSources.userApi.getMenu();
      if (token) {
        return token;
      }
    },
    // TODO : replace with your real world BE postgres database
    getAllUser: async (_: any, __: any, { dataSources }: {dataSources: any}) => {
      const users = await dataSources.userPg.getAllUser();
      if (users) {
        return users;
      }
    },
    refreshToken: async (_: any, props: any, { dataSources }: {dataSources: IDataSources}) => {
      const token = await dataSources.userApi.refreshToken(props);
      if (token) {
        return token;
      }
    },
  },
};
