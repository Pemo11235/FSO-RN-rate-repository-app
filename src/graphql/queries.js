import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`
export const GET_REPOSITORY = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      url
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`
export const AUTHETICATED = gql`
  query {
    me {
      username
    }
  }
`
