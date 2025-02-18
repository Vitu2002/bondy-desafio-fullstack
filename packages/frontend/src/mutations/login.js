import { gql } from "@apollo/client";

export const MUTATION_LOGIN = gql`
  mutation MutationLogin($email: String!, $password: String!) {
    mutationLogin(email: $email, password: $password) {
      message
      user {
        email
        name
        company
      }
    }
  }
`;
