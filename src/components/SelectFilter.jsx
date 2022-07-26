import { useApolloClient } from '@apollo/client'
import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelectOrder } from '../hooks/useSelectOrder'
import theme from '../theme'
import Button from './Button'

const SelectFilter = ({ items }) => {
  const { state: order, dispatch } = useSelectOrder()
  const [selectedValue, setSelectedValue] = React.useState(order.key)

  const handleChange = (itemValue, itemIndex) => {
    dispatch({ type: itemValue })
    setSelectedValue(itemValue)
  }

  return (
    <View>
      <Picker
        onValueChange={handleChange}
        selectedValue={selectedValue}
        prompt={'Select an item ...'}>
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.key} />
        ))}
      </Picker>
    </View>
  )
}

export default SelectFilter
