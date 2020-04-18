/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMenu
// ====================================================

export interface getMenu_getMenu_subMenu {
  __typename: "SubMenu";
  code: string | null;
  title: string | null;
}

export interface getMenu_getMenu {
  __typename: "Menu";
  code: string | null;
  title: string | null;
  subMenu: (getMenu_getMenu_subMenu | null)[] | null;
}

export interface getMenu {
  getMenu: (getMenu_getMenu | null)[] | null;
}
