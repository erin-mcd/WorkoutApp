import React from 'react'
import { View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import ExerciseListItem from './ExerciseListItem'
interface Props {
  removeFunction?: (name: string) => void
  addFunction?: (name: string) => void
  onTap: () => void
  exercisesToAdd?: string[]
}

function ExerciseList({
  exercisesToAdd,
  onTap,
  removeFunction,
  addFunction,
}: Props): JSX.Element {
  function tapHandler(name: string): void {
    if (
      removeFunction !== undefined &&
      addFunction !== undefined &&
      exercisesToAdd !== undefined
    ) {
      if (exercisesToAdd.includes(name)) {
        removeFunction(name)
      } else {
        addFunction(name)
      }
    }
    onTap()
  }

  const exerciseTypesList = useSelector(
    (state: any) => state.exerciseTypesList.exerciseTypes
  )

  function renderExerciseType(itemData: any): JSX.Element {
    const exerciseItemProps = {
      name: itemData.item.name,
      id: itemData.item.id,
    }

    return (
      <ExerciseListItem
        onTap={tapHandler}
        name={exerciseItemProps.name}
        isSelected={
          exercisesToAdd !== undefined
            ? exercisesToAdd.includes(exerciseItemProps.name)
            : false
        }
      />
    )
  }

  return (
    <View>
      <FlatList
        data={exerciseTypesList}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseType}
      />
    </View>
  )
}

export default ExerciseList
