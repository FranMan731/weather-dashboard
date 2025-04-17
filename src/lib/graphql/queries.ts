import { gql } from '@apollo/client';

export const LIST_ITEMS = gql`
  query ListItems {
    listItems {
      id
      name
      content
      metadata
      createdAt
      updatedAt
    }
  }
`;

export const GET_ITEM = gql`
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
      content
      metadata
      createdAt
      updatedAt
    }
  }
`;