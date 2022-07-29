import { useQuery } from '@apollo/client'
import { FlatList, View } from 'react-native'
import { AUTHETICATED } from '../graphql/queries'
import { ItemSeparator, ReviewItem } from './SignleRepository'

const UserReviews = () => {
  const { data } = useQuery(AUTHETICATED, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

  const reviews = data?.me ? data.me.reviews.edges.map((edge) => edge.node) : []

  console.log(reviews)

  return (
    <View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </View>
  )
}

export default UserReviews
