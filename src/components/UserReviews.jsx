import { useQuery } from '@apollo/client'
import { FlatList, View } from 'react-native'
import { AUTHETICATED } from '../graphql/queries'
import { ItemSeparator, ReviewItem } from './SignleRepository'

const UserReviews = () => {
  const { data, refetch } = useQuery(AUTHETICATED, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

  const reviews = data?.me ? data.me.reviews.edges.map((edge) => edge.node) : []

  return (
    <View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem review={item} privateSection refetch={refetch} />
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </View>
  )
}

export default UserReviews
