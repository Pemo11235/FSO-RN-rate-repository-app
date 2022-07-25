import { Image, View, StyleSheet, Linking } from 'react-native'
import Text from './Text'
import theme from '../theme'
import Button from './Button'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: theme.spacing.medium,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.small,
    margin: theme.spacing.medium,
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
    marginRight: theme.spacing.medium,
  },
  title: {
    fontSize: theme.fontSizes.h1,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    margin: theme.spacing.small,
  },
  description: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textSecondary,
    margin: theme.spacing.small,
  },
  tagContainer: {
    margin: theme.spacing.small,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.small,
    borderRadius: theme.radius.small,
    flexDirection: 'row',
  },
  language: {
    color: 'white',
    fontSize: theme.fontSizes.subheading,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.medium,
  },
  secondRowDataContainer: {
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'center',
  },
  secondRowValue: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
  },
  secondRowLabel: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
})

const RepositoryItem = ({ repository, isSelected = false }) => {
  const {
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    url,
  } = repository

  return (
    <View testID='repository-item' key={id} style={styles.container}>
      <View style={styles.firstRow}>
        <View style={styles.leftColumn}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.image} />
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.title}>{fullName}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text>
            <View style={styles.tagContainer}>
              <Text style={styles.language}>{language}</Text>
            </View>
          </Text>
        </View>
      </View>
      <View style={styles.secondRow}>
        <RepositorySecondRowData label='Stars' value={stargazersCount} />
        <RepositorySecondRowData label='Forks' value={forksCount} />
        <RepositorySecondRowData label='Reviews' value={reviewCount} />
        <RepositorySecondRowData label='Rating' value={ratingAverage} />
      </View>
      {isSelected && (
        <Button label={'Open on GitHub'} onPress={() => Linking.openURL(url)} />
      )}
    </View>
  )
}

const RepositorySecondRowData = ({ label, value }) => {
  return (
    <View style={styles.secondRowDataContainer}>
      <Text style={styles.secondRowValue}>{convertThousandToK(value)}</Text>
      <Text style={styles.secondRowLabel}>{label}</Text>
    </View>
  )
}

const convertThousandToK = (value) => {
  if (value < 1000) return value
  const fixedValue = (value / 1000).toFixed(1)
  const valueString = fixedValue.toString()[fixedValue.length - 1]
  const removedZero = valueString === '0' ? fixedValue.slice(0, -2) : fixedValue
  return `${removedZero}k`
}

export default RepositoryItem
