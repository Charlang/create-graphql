import React from 'react';
import { useQuery, useLazyQuery, gql, QueryHookOptions, QueryResult, OperationVariables } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const REFRESH_TOKEN = gql`
  query($tokenRequest: RefreshTokenRequest!) {
    refreshToken(tokenRequest: $tokenRequest) {
      refreshToken
      token
    }
  }
`;

const TOKEN_REQUEST = {
  tokenRequest: {
    refreshToken: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || ''
  }
};

export interface RefreshToken_refreshToken {
  __typename: "Token";
  token: string | null;
  refreshToken: string | null;
}

export interface RefreshToken {
  refreshToken: RefreshToken_refreshToken;
}
export const Index = () => {
  const { data, loading } = useQuery<RefreshToken>(REFRESH_TOKEN, {
    variables: TOKEN_REQUEST,
    pollInterval: 5000,
  });
  if (!loading && data) {
    const token = data?.refreshToken?.refreshToken || '';
    localStorage.setItem('token', token);
  }
  return <span />;
}

export default Index;