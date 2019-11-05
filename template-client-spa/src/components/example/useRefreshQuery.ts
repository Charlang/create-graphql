import { useState } from 'react';
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

export function useRefreshQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
  const [isRefresh, setRefresh] = useState(false);
  // Step 1: Query start
  const queryResult = useQuery(query, options);
  // Step 2: Prepare for refresh using lazy query
  const [refreshToken, refreshResult] = useLazyQuery(REFRESH_TOKEN, { variables: TOKEN_REQUEST });
  if (queryResult.error && !isRefresh) {
    const {
      message,
      graphQLErrors: [{ message: rpcMsg } = { message: '' }]
    } = queryResult.error as any;
    if (message === 'TOKEN_EXPIRED' || rpcMsg === 'TOKEN_EXPIRED') {
      // Step 3: Trigger refresh when expired
      setRefresh(true);
      refreshToken();
    }
  }
  if (refreshResult.data) {
    // Step 4: Trigger refetch when refresh done
    queryResult.refetch();
  }
  return queryResult;
}
