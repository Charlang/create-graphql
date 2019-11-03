import { gql } from 'apollo-server-express';
import { IDataSources } from '../interface';

export const typeDef = gql`
  extend type Query {
    getMenu: [Menu]
    getAllUser: [User]
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
  },
};
