import React from 'react'

const AuthStorageContext = React.createContext()

const AuthStorageProvider = ({ children, value }) => {
  return (
    <AuthStorageContext.Provider value={value}>
      {children}
    </AuthStorageContext.Provider>
  )
}

export { AuthStorageContext, AuthStorageProvider }
