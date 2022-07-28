import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import useRepositories from '../hooks/useRepositories'
import { useSelectOrder } from '../hooks/useSelectOrder'
import RepositoryItem from './RepositoryItem'
import RepositoryListHeader from './RepositoryListHeader'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export class RepositoryListContainer extends React.Component {
  renderHeader = () => <RepositoryListHeader />
  render() {
    const { repositories, handleEndReached } = this.props

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : []

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        ListHeaderComponent={this.renderHeader()}
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReached}
      />
    )
  }
}

const renderItem = ({ item }) => <RepositoryItem repository={item} />

const RepositoryList = () => {
  const { state: order } = useSelectOrder()
  const { repositories, refetchRepositories, fetchMore } = useRepositories(
    order.variables.orderBy,
    order.variables.orderDirection,
    order.variables.searchKeyword
  )

  const handleEndReached = () => {
    fetchMore()
  }

  React.useEffect(() => {
    refetchRepositories(order.variables)
  }, [order])

  return (
    <RepositoryListContainer
      repositories={repositories}
      refetchRepositories={refetchRepositories}
      handleEndReached={handleEndReached}
    />
  )
}

export default RepositoryList
