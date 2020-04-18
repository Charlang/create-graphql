import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Skeleton from '@material-ui/lab/Skeleton';

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

export interface GetMenu_getMenu_subMenu {
  __typename: 'SubMenu';
  code: string | null;
  title: string | null;
}

export interface GetMenu_getMenu {
  __typename: 'Menu';
  code: string | null;
  title: string | null;
  subMenu: GetMenu_getMenu_subMenu[] | null;
}

export interface GetMenu {
  getMenu: GetMenu_getMenu[] | null;
}

export const Index = () => {
  const { loading, data } = useQuery<GetMenu>(GET_MENU);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <div>
        <h3>Menu</h3>
        <Skeleton variant="text" />
        <Skeleton variant="rect" width={210} height={40} />
      </div>
    );
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {data?.getMenu?.map(({ code, title, subMenu }: GetMenu_getMenu, index: number) => (
          <Fragment>
            <MenuItem onClick={handleClose} key={code || index}>
              {title}
            </MenuItem>
            {subMenu?.map(({ code: subCode, title: subTitle }: GetMenu_getMenu_subMenu, subIndex: number) => (
              <MenuItem onClick={handleClose} key={subCode || subIndex}>
                {subTitle}
              </MenuItem>
            ))}
          </Fragment>
        ))}
      </Menu>
    </div>
  );
};

export default Index;
