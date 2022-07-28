import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const { data, loading, fetchMore, error, refetch } = useQuery(
    GET_REPOSITORIES,
    {
      variables: {
        orderBy,
        orderDirection,
        searchKeyword,
        first: 6,
      },
      fetchPolicy: 'cache-and-network',
    }
  )
  const refetchRepositories = React.useCallback(
    (variables) => {
      refetch(variables)
    },
    [refetch]
  )

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) return

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy,
        orderDirection,
        searchKeyword,
      },
    })
  }

  return {
    repositories: data?.repositories,
    loading,
    error,
    fetchMore: handleFetchMore,
    refetchRepositories,
  }
}

export default useRepositories
