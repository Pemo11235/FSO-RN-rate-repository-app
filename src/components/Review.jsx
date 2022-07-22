import { StyleSheet, View } from 'react-native'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import theme from '../theme'
import Button from './Button'
import * as yup from 'yup'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'
import useCreateReview from '../hooks/useCreateReview'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.large,
  },
})
const Review = () => {
  const { createReviewWithReview } = useCreateReview()
  const navigate = useNavigate()
  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup
      .number('Rating must be a number')
      .min(0, 'Minimun value is 0')
      .max(100, 'Max value is 100')
      .required('Rating is required'),
  })

  const onSubmit = async (values) => {
    console.log('before submit', values)
    const repositoriesId = await createReviewWithReview(values)
    navigate(`/${repositoriesId}`)
  }
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name='ownerName'
            placeholder='Repository owner name'
          />
          <FormikTextInput
            name='repositoryName'
            placeholder='Repository name'
          />
          <FormikTextInput
            name='rating'
            placeholder='Rating between 0 and 100'
            type='number'
          />
          <FormikTextInput name='text' placeholder='Review' multiline />
          <Button onPress={handleSubmit} label={'Create Review'} />
        </View>
      )}
    </Formik>
  )
}

export default Review
