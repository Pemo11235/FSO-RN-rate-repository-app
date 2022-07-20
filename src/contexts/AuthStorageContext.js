import React from 'react'
import AuthStorage from '../utils/authStorage'

const AuthStorageContext = React.createContext()
const authStorage = new AuthStorage()

const AuthStorageProvider = ({ children, value }) => {
  return (
    <AuthStorageContext.Provider value={value}>
      {children}
    </AuthStorageContext.Provider>
  )
}

export { AuthStorageContext, AuthStorageProvider }
