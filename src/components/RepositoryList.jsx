import React from 'react'
import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import useRepositories from '../hooks/useRepositories'
import { useSelectOrder } from '../hooks/useSelectOrder'
import { ORDER_BY, ORDER_DIRECTION } from '../utils/orderRepository'
import RepositoryItem from './RepositoryItem'
import SelectFilter from './SelectFilter'
import Text from './Text'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

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

export const RepositoryListContainer = ({
  repositories,
  refetchRepositories,
}) => {
  const navigate = useNavigate()
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigate(`/${item.id}`)}>
        <RepositoryItem repository={item} />
      </Pressable>
    )
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      ListHeaderComponent={() => (
        <SelectFilter
          items={selectItems}
          refetchrepositories={refetchRepositories}
        />
      )}
    />
  )
}

const RepositoryList = () => {
  const { state: order } = useSelectOrder()
  const { repositories, loading, refetchRepositories } = useRepositories(
    order.variables.orderBy,
    order.variables.orderDirection
  )

  React.useEffect(() => {
    refetchRepositories(order.variables)
  }, [order])

  return (
    <>
      {loading && (
        <Text style={{ textAlign: 'center' }} fontSize={'subheading'}>
          Loading...
        </Text>
      )}
      {!loading && (
        <RepositoryListContainer
          repositories={repositories}
          refetchRepositories={refetchRepositories}
        />
      )}
    </>
  )
}

export default RepositoryList
