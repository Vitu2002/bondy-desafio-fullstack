import gql from 'graphql-tag'

export default gql`
  type Mutation {
    mutationTest(test: Boolean): Boolean
    mutationLogin(email: String!, password: String!): LoginResponse
  }

  type LoginResponse {
    message: String
    success: Boolean
    user: User
  }

  type User {
    email: String!
    name: String!
    company: String!
  }
`
