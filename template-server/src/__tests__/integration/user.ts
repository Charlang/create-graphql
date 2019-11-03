import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { getIntegrationServer } from '../__utils';
import { GraphQLResponse } from 'graphql-extensions';

const GET_MENUS = gql`
  query{
    getMenu {
      title
      subMenu {
        title
      }
    }
  }
`;

import { DocumentNode } from 'graphql';
import { UserApi } from '../../restDatasources';

type StringOrAst = string | DocumentNode;

interface IQuery { query: StringOrAst; mutation?: undefined; }
interface IMutation { mutation: StringOrAst; query?: undefined; }

describe('Queries User', () => {
  const context = async () => ({ authorization: 'Bearer awx' });
  let query: ({ query, mutation, ...args }: IQuery | IMutation) => Promise<GraphQLResponse>;
  let userApi: UserApi;
  beforeEach(async () => {
    const {server, userApi: userApiInstance  } = getIntegrationServer(context);
    userApi = userApiInstance;
    query = createTestClient(server).query;
  });

  it('Get Menus', async () => {
    userApi.getMenu = jest.fn(async () => ([{
      title: 'test dashboard',
      path: null,
      subMenu: [
        {
          title: 'landing page',
        },
      ],
    }]));
    const res = await query({query: GET_MENUS});
    expect(res).toMatchSnapshot();
  });
});
