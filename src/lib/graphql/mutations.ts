import { gql } from '@apollo/client';

export const UPSERT_ITEM = gql`
  mutation UpsertItem($input: ItemInput!) {
    upsertItem(input: $input) {
      id
      name
      content
      metadata
      createdAt
      updatedAt
    }
  }
`;