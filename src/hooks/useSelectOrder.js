import * as React from 'react'
import { ORDER_BY, ORDER_DIRECTION } from '../utils/orderRepository'

const SelectOrderContext = React.createContext()

function selectOrderReudcer(state, action) {
  switch (action.type) {
    case 'LATEST_REPOSITORIES': {
      return {
        key: 'LATEST_REPOSITORIES',
        label: 'Latest repositories',
        variables: {
          orderBy: ORDER_BY.CREATED_AT,
          orderDirection: ORDER_DIRECTION.DESC,
        },
      }
    }
    case 'HIGHEST_RATED_REPOSITORIES': {
      return {
        key: 'HIGHEST_RATED_REPOSITORIES',
        label: 'Highest rated repositories',
        variables: {
          orderBy: ORDER_BY.RATING_AVERAGE,
          orderDirection: ORDER_DIRECTION.DESC,
        },
      }
    }
    case 'LOWEST_RATED_REPOSITORIES': {
      return {
        key: 'LOWEST_RATED_REPOSITORIES',
        label: 'Lowest rated repositories',
        variables: {
          orderBy: ORDER_BY.RATING_AVERAGE,
          orderDirection: ORDER_DIRECTION.ASC,
        },
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function SelectOrderProvider({ children }) {
  const [state, dispatch] = React.useReducer(selectOrderReudcer, {
    label: 'Latest repositories',
    variables: {
      orderBy: ORDER_BY.CREATED_AT,
      orderDirection: ORDER_DIRECTION.DESC,
    },
  })

  const value = { state, dispatch }
  return (
    <SelectOrderContext.Provider value={value}>
      {children}
    </SelectOrderContext.Provider>
  )
}

function useSelectOrder() {
  const context = React.useContext(SelectOrderContext)
  if (context === undefined) {
    throw new Error('useSelectOrder must be used within a SelectOrderProvider')
  }
  return context
}

export { SelectOrderProvider, useSelectOrder }
