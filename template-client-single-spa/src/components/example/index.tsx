import React from 'react';
import { gql, useQuery } from '@apollo/client';

interface SubMenu {
  code: string;
  title: string;
}

interface Menu {
  code: string;
  title: string;
  subMenu: SubMenu[];
}

const GET_MENU = gql`
  query {
    getMenu {
      code
      title
      subMenu {
        code
        title
      }
    }
  }
`;

export const Index = () => {
  const { loading, error, data } = useQuery<Menu>(GET_MENU);
  return (
    <div>
      <h3>Menu</h3>
      {loading && <p>Loading: {JSON.stringify(loading)}</p>}
      {error && <p>error[need to integrate with your BE api]: {JSON.stringify(error)}</p>}
      {data && <p>data: {JSON.stringify(data)}</p>}
    </div>
  );
};

export default Index;
