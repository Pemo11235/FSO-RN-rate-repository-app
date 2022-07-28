import React from 'react'
import { View } from 'react-native'
import { useDebouncedCallback } from 'use-debounce'
import { useSelectOrder } from '../hooks/useSelectOrder'
import { ORDER_BY, ORDER_DIRECTION } from '../utils/orderRepository'
import SelectFilter from './SelectFilter'
import TextInput from './TextInput'

const selectItems = [
  {
    key: 'LATEST_REPOSITORIES',
    label: 'Latest repositories',
    variables: {
      orderBy: ORDER_BY.CREATED_AT,
      orderDirection: ORDER_DIRECTION.DESC,
    },
  },
  {
    key: 'HIGHEST_RATED_REPOSITORIES',
    label: 'Highest rated repositories',
    variables: {
      orderBy: ORDER_BY.RATING_AVERAGE,
      orderDirection: ORDER_DIRECTION.DESC,
    },
  },
  {
    key: 'LOWEST_RATED_REPOSITORIES',
    label: 'Lowest rated repositories',
    variables: {
      orderBy: ORDER_BY.RATING_AVERAGE,
      orderDirection: ORDER_DIRECTION.ASC,
    },
  },
]
const RepositoryListHeader = () => {
  const { state, dispatch } = useSelectOrder()
  const [search, setSearch] = React.useState(state?.variables.searchKeyword)
  // const [searchQuery] = useDebounce(search, 500)

  const handleSearchChange = (search) => {
    setSearch(search)
    refetchRepositories(search)
  }

  const refetchRepositories = useDebouncedCallback((search) => {
    dispatch({ type: 'SET_SEARCH_KEYWORD', payload: search })
  }, 500)

  return (
    <View>
      <TextInput value={search} onChangeText={handleSearchChange} />
      <SelectFilter items={selectItems} />
    </View>
  )
}

export default RepositoryListHeader
