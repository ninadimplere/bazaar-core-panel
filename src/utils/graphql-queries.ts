import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories($offset: Int, $limit: Int, $showActive: Boolean) {
    categories(offset: $offset, limit: $limit, showActive: $showActive) {
      success
      data {
        id
        name
        slug
        isActive
        parentId
        parent {
          id
          name
          slug
          isActive
          parentId
        }
        children {
          id
          name
          slug
          isActive
          parentId
        }
      }
    }
  }
`;

export const GET_CATEGORIES_FOR_DROPDOWN = gql`
  query GetCategories($offset: Int, $limit: Int, $showActive: Boolean) {
    categories(offset: $offset, limit: $limit, showActive: $showActive) {
      success
      data {
        id
        name
      }
    }
  }
`;

export const GET_CATEGORY_COUNT = gql`
  query GetCategoryCount($showActive: Boolean) {
    totalCategories(showActive: $showActive)
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: Int!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      success
      message
      data {
        id
        name
        slug
        isActive
        parentId
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      success
      message
      data {
        id
        name
        slug
        isActive
        parentId
      }
    }
  }
`;
