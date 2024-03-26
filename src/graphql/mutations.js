/* eslint-disable */
// this is an auto generated file. This will be overwritten

module.exports.createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
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
module.exports.updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
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
module.exports.deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
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
module.exports.createMessages = /* GraphQL */ `
  mutation CreateMessages(
    $input: CreateMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    createMessages(input: $input, condition: $condition) {
      uid
      message
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
module.exports.updateMessages = /* GraphQL */ `
  mutation UpdateMessages(
    $input: UpdateMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    updateMessages(input: $input, condition: $condition) {
      uid
      message
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
module.exports.deleteMessages = /* GraphQL */ `
  mutation DeleteMessages(
    $input: DeleteMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    deleteMessages(input: $input, condition: $condition) {
      uid
      message
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
