/* eslint-disable */
// this is an auto generated file. This will be overwritten

module.exports.getUsers = /* GraphQL */ `
  query GetUsers($email: String!) {
    getUsers(email: $email) {
      email
      name
      id
      lastname
      password
      createdAt
      updatedAt
      __typename
    }
  }
`;
module.exports.listUsers = /* GraphQL */ `
  query ListUsers(
    $email: String
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        email
        name
        id
        lastname
        password
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
module.exports.getMessages = /* GraphQL */ `
  query GetMessages($id: ID!) {
    getMessages(id: $id) {
      uid
      message
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
module.exports.listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        uid
        message
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
