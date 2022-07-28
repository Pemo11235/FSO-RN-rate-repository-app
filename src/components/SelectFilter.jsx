import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { View } from 'react-native'
import { useSelectOrder } from '../hooks/useSelectOrder'

const SelectFilter = ({ items }) => {
  const { state: order, dispatch } = useSelectOrder()
  const [selectedValue, setSelectedValue] = React.useState(order.key)

  const handleChange = (itemValue) => {
    dispatch({ type: itemValue, payload: order.variables.searchKeyword })
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
