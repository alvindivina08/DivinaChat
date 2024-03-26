/* eslint-disable */
// this is an auto generated file. This will be overwritten

module.exports.onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
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
module.exports.onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onUpdateUsers(filter: $filter) {
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
module.exports.onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
    onDeleteUsers(filter: $filter) {
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
module.exports.onCreateMessages = /* GraphQL */ `
  subscription OnCreateMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onCreateMessages(filter: $filter) {
      uid
      message
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
module.exports.onUpdateMessages = /* GraphQL */ `
  subscription OnUpdateMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onUpdateMessages(filter: $filter) {
      uid
      message
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
module.exports.onDeleteMessages = /* GraphQL */ `
  subscription OnDeleteMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onDeleteMessages(filter: $filter) {
      uid
      message
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
