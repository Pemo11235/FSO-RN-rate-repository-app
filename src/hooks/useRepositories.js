import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_REPOSITORIES } from '../graphql/queries'
import { useSelectOrder } from './useSelectOrder'

const useRepositories = (orderBy, orderDirection) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
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
