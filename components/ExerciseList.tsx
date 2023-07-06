import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { getExerciseTypesFromDB } from '../db-service'
import { type ExerciseType } from '../models/ExerciseType'
import ExerciseListItem from './ExerciseListItem'
interface Props {
  removeFunction?: (name: string) => void
  addFunction?: (name: string) => void
  onTap: (exerciseInfo: ExerciseType) => void
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

  function tapHandler(exerciseInfo: ExerciseType): void {
    if (
      removeFunction !== undefined &&
      addFunction !== undefined &&
      exercisesToAdd !== undefined
    ) {
      if (exercisesToAdd.includes(exerciseInfo.name)) {
        removeFunction(exerciseInfo.name)
      } else {
        addFunction(exerciseInfo.name)
      }
    }
    onTap(exerciseInfo)
  }

  function renderExerciseType({ item }: any): JSX.Element {
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
        data={exerciseTypesTable}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseType}
      />
    </View>
  )
}

export default ExerciseList
