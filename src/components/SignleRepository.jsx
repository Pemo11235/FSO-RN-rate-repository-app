import { useMutation, useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import { useNavigate, useParams } from 'react-router-native'
import { DELETE_REVIEW } from '../graphql/mutations'
import { GET_REPOSITORY } from '../graphql/queries'
import theme from '../theme'
import Button from './Button'
import RepositoryItem from './RepositoryItem'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: theme.spacing.small,
  },
  rating: {
    width: 50,
    height: 50,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    padding: theme.spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstRow: {
    flexDirection: 'row',
    padding: theme.spacing.medium,
  },
  leftColumn: {
    flexDirection: 'column',
  },
  rightColumn: {
    flexDirection: 'column',
    width: '90%',
    marginHorizontal: theme.spacing.medium,
  },
  username: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.small,
  },
  date: {
    fontSize: theme.fontSizes.h4,
    color: theme.colors.textSecondary,
  },
  text: {
    marginVertical: theme.spacing.small,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    width: '100%',
    paddingRight: theme.spacing.medium,
  },
  ratingNumber: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.h3,
    fontWeight: 'bold',
  },
  separator: {
    height: 10,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  ctaLabel: {
    fontSize: theme.fontSizes.h3,
    padding: theme.spacing.small,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.medium,
  },
})
const SingleRepository = () => {
  const { repositoryId } = useParams()
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId, first: 4 },
  })

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) return

    fetchMore({
      variables: {
        id: repositoryId,
        after: data?.repository.reviews.pageInfo.endCursor,
      },
    })
  }

  const repository = data?.repository
  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : []

  return (
    !loading && (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={() => <ItemSeparator />}
        onEndReachedThreshold={0.5}
        onEndReached={handleFetchMore}
      />
    )
  )
}

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem repository={repository} isSelected />
}

export const ItemSeparator = () => <View style={styles.separator} />
export const ReviewItem = ({ review, privateSection = false, refetch }) => {
  const navigate = useNavigate()
  const [deleteReview] = useMutation(DELETE_REVIEW)

  const {
    id: deleteReviewId,
    repositoryId,
    rating,
    text,
    createdAt: date,
    user: { username },
  } = review

  const handleDelete = () => {
    deleteReview({ variables: { deleteReviewId } })
    Alert.alert('Review deleted', 'Your review has been deleted')
    refetch()
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Delete review',
      'Are you sure you want to delte this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Delete', onPress: handleDelete },
      ]
    )

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={styles.leftColumn}>
          <View style={styles.rating}>
            <Text style={styles.ratingNumber}>{rating}</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          {privateSection && (
            <Text style={styles.username}>
              {repositoryId.replace('.', '/')}
            </Text>
          )}
          {!privateSection && <Text style={styles.username}>{username}</Text>}
          <Text style={styles.date}>
            {format(new Date(date), 'dd.MM.yyyy')}
          </Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
      {privateSection && (
        <View style={styles.secondRow}>
          <Button
            label={'View Repository'}
            labelStyle={styles.ctaLabel}
            onPress={() => navigate(`/${repositoryId}`)}
          />
          <Button
            label={'Delete Review'}
            style={styles.deleteButton}
            labelStyle={styles.ctaLabel}
            onPress={createTwoButtonAlert}
          />
        </View>
      )}
    </View>
  )
}

export default SingleRepository
