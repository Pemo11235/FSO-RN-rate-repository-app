import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { FlatList, StyleSheet, View } from 'react-native'
import { useParams } from 'react-router-native'
import { GET_REPOSITORY } from '../graphql/queries'
import theme from '../theme'
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
})
const SingleRepository = () => {
  const { repositoryId } = useParams()
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId },
  })

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
      />
    )
  )
}

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem repository={repository} isSelected />
}

const ItemSeparator = () => <View style={styles.separator} />
const ReviewItem = ({ review }) => {
  const {
    rating,
    text,
    createdAt: date,
    user: { username },
  } = review
  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={styles.leftColumn}>
          <View style={styles.rating}>
            <Text style={styles.ratingNumber}>{rating}</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.date}>
            {format(new Date(date), 'dd.MM.yyyy')}
          </Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </View>
  )
}

export default SingleRepository
