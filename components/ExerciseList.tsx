import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { getExerciseTypesFromDB } from '../db-service'
import ExerciseListItem from './ExerciseListItem'
interface Props {
  removeFunction?: (name: string) => void
  addFunction?: (name: string) => void
  onTap: () => void
  exercisesToAdd?: string[]
}

const init: any[] = []

function ExerciseList({
  exercisesToAdd,
  onTap,
  removeFunction,
  addFunction,
}: Props): JSX.Element {
  const [exerciseTypesTable, setExerciseTypesTable] = useState(init)

  useEffect(() => {
    async function getExercises(): Promise<void> {
      const exerciseTypes = await getExerciseTypesFromDB()
      setExerciseTypesTable(exerciseTypes)
    }

    void getExercises()
  }, [exerciseTypesTable, setExerciseTypesTable])

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
        data={exerciseTypesTable}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseType}
      />
    </View>
  )
}

export default ExerciseList
