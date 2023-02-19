import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface Props {
  name: string
  isSelected?: boolean
  onTap: (name: string) => void
}

function ExerciseListItem({
  name,
  isSelected = false,
  onTap,
}: Props): JSX.Element {
  return (
    <Pressable
      onPress={() => {
        onTap(name)
      }}
      style={isSelected ? styles.selectedContainer : styles.unselectedContainer}
    >
      <Text>{name}</Text>
    </Pressable>
  )
}
export default ExerciseListItem
const styles = StyleSheet.create({
  selectedContainer: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    padding: 10,
    margin: 4,
    backgroundColor: '#c7f0ca',
  },
  unselectedContainer: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    padding: 10,
    margin: 4,
    backgroundColor: 'white',
  },
})
