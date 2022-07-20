import { useApolloClient } from '@apollo/client'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-native'
import useAuthStorage from '../hooks/useAuthStorage'
const SignOut = () => {
  const navigate = useNavigate()
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const logOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  useEffect(async () => {
    await logOut()
    navigate('/signin')
  }, [])

  return <></>
}
export default SignOut
