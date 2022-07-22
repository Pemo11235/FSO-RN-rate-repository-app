import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'
import { GET_REPOSITORIES } from '../graphql/queries'

const useCreateReview = () => {
  const [createReview, { loading, error }] = useMutation(CREATE_REVIEW, {
    refetchQueries: [{ query: GET_REPOSITORIES }],
  })

  const createReviewWithReview = async ({
    ownerName,
    repositoryName,
    rating,
    text,
  }) => {
    const review = {
      ownerName,
      repositoryName,
      rating: parseInt(rating, 10),
      text,
    }
    try {
      const { data } = await createReview({
        variables: { review },
      })
      return data.createReview.repositoryId
    } catch (errorMessage) {
      console.log(errorMessage)
    }
  }

  return { createReviewWithReview, loading, error }
}

export default useCreateReview
