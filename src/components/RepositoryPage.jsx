import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-native'
import { GET_REPOSITORY } from '../graphql/queries'
import RepositoryItem from './RepositoryItem'

const RepositoryPage = () => {
  const { repositoryId } = useParams()
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId },
  })
  const repository = data?.repository

  return !loading && <RepositoryItem repository={repository} isSelected />
}

export default RepositoryPage
