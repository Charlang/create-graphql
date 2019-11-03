import gql from 'graphql-tag';
import logger from './logger';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { execute, toPromise } from 'apollo-link';
export const ACCESS = {
  view: 'VIEW',
};
const { GRAPHQL_SERVER_API_A = 'http://0.0.0.0:4002' } = process.env;

const link = new HttpLink({
  uri: `${GRAPHQL_SERVER_API_A}/graphql`,
  fetch: fetch as any,
});

const verifyQuery = gql`
  query($token: String!) {
    verifyToken(token: $token) {
      roles {
        id
        code
        name
      }
      email
    }
  }
`;

// Exact Access
const hasExactAccess = ({ roleCodes, access }: any) => roleCodes.includes(access);

const hasAccess = ({ roles, accesses }: any) =>
  accesses.some((access: string) => {
    const roleCodes = roles.map((role: any) => role.code);
    const params = {
      roleCodes,
      access,
    };

    return hasExactAccess(params);
  });

export const verifyAccess = async (accesses: any, authorization = '') => {
  // For testing
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  const jwtToken = authorization.split(' ')[1] || '';
  try {
    if (!jwtToken) {
      throw Error('UNAUTHORIZED');
    }
    // @ts-ignore
    const userInfo: any = await toPromise(execute(link, { query: verifyQuery, variables: { token: jwtToken } }));
    const { data } = userInfo;
    if (!data) {
      throw Error('UNAUTHORIZED');
    }
    const {
      verifyToken: { roles = [], email = '' },
    } = data;
    if (!Array.isArray(accesses)) {
      accesses = [accesses];
    }
    if (hasAccess({ roles, accesses })) {
      return;
    }
    logger.log('error', `User ${email} Unauthorized`);
    throw Error('UNAUTHORIZED');
  } catch (error) {
    logger.log('error', error.toString ? error.toString() : error.message);
    if (error.name === 'TokenExpiredError') {
      throw Error('TOKEN_EXPIRED');
    } else if (error.message && error.message.indexOf('UNAUTHORIZED') !== -1) {
      throw error;
    } else {
      throw Error('BAD_REQUEST');
    }
  }
};

export default verifyAccess;
