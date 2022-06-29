import { gql } from "@apollo/client";
export const URL_PRODUCTS = "https://demo.saleor.io/graphql/";
export const BASE_URL = "https://dummyjson.com/users";
export const URL_TOGET10 = "https://dummyjson.com/users?limit=10";
export const GET_PRODUCTS = `
{
  products(
   first: 50, channel: "default-channel"
   sortBy: {field: NAME, direction: DESC}
  ) {
      edges {
          node {
            id
            name
            isAvailable(address: { country: US })
            pricing {
              priceRange {
                start {
                  gross {
                    amount
                    currency
                  }
                }
              }
              discount {
                gross {
                  amount
                  currency
                }
              }
              priceRangeUndiscounted {
                start {
                  gross {
                    amount
                    currency
                  }
                }
              }
            }
            thumbnail {
              url
            } 
          }
        }
      }
    }
`;
export const ACCOUNT_REGISTER = gql`
    mutation ($email: String!, $password: String!) {
        accountRegister(
            input: {
                email: $email
                password: $password
                channel: "default-channel"
            }
        ) {
            accountErrors {
                field
                code
            }
            user {
                email
                firstName
                lastName
                lastLogin
                isActive
            }
        }
    }
`;
