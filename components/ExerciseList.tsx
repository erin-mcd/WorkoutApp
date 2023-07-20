import React from 'react'
import { View, FlatList } from 'react-native'
import { type ExerciseType } from '../models/ExerciseType'
import ExerciseListItem from './ExerciseListItem'
interface Props {
  exerciseTypes?: any
  remove?: (name: string) => void
  add?: (name: string) => void
  onTap: (exerciseInfo: ExerciseType) => void
  exercisesToAdd?: string[]
}

const ExerciseList = ({
  exerciseTypes,
  exercisesToAdd,
  onTap,
  remove,
  add,
}: Props): JSX.Element => {
  const tapHandler = (exerciseInfo: ExerciseType): void => {
    if (
      remove !== undefined &&
      add !== undefined &&
      exercisesToAdd !== undefined
    ) {
      if (exercisesToAdd.includes(exerciseInfo.name)) {
        remove(exerciseInfo.name)
      } else {
        add(exerciseInfo.name)
      }
    }
    onTap(exerciseInfo)
  }

  const renderExerciseType = ({ item }: any): JSX.Element => {
    return (
      <ExerciseListItem
        onTap={tapHandler}
        exerciseInfo={item}
        isSelected={
          exercisesToAdd !== undefined
            ? exercisesToAdd.includes(item.name)
            : false
        }
      />
    )
  }

  return (
    <View>
      <FlatList
        data={exerciseTypes}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseType}
      />
    </View>
  )
}

export default ExerciseList
