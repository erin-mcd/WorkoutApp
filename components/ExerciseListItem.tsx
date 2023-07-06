import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { type ExerciseType } from '../models/ExerciseType'

interface Props {
  exerciseInfo: ExerciseType
  isSelected?: boolean
  onTap: (exerciseInfo: ExerciseType) => void
}

function ExerciseListItem({
  exerciseInfo,
  isSelected = false,
  onTap,
}: Props): JSX.Element {
  return (
    <Pressable
      onPress={() => {
        onTap(exerciseInfo)
      }}
      style={isSelected ? styles.selectedContainer : styles.unselectedContainer}
    >
      <Text>{exerciseInfo.name}</Text>
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
