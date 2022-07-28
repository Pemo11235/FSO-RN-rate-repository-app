import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: 'cache-and-network',
  })
  const refetchRepositories = React.useCallback(
    (variables) => {
      refetch(variables)
    },
    [refetch]
  )

  return {
    repositories: data?.repositories,
    loading,
    error,
    refetchRepositories,
  }
}

export default useRepositories
