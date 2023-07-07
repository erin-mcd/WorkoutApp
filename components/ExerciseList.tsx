import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { getExerciseTypesFromDB } from '../db-service'
import { type ExerciseType } from '../models/ExerciseType'
import ExerciseListItem from './ExerciseListItem'
interface Props {
  remove?: (name: string) => void
  add?: (name: string) => void
  onTap: (exerciseInfo: ExerciseType) => void
  exercisesToAdd?: string[]
}

const init: any[] = []

const ExerciseList = ({
  exercisesToAdd,
  onTap,
  remove,
  add,
}: Props): JSX.Element => {
  const [exerciseTypesTable, setExerciseTypesTable] = useState(init)

  useEffect(() => {
    async function getExercises(): Promise<void> {
      const exerciseTypes = await getExerciseTypesFromDB()
      setExerciseTypesTable(exerciseTypes)
    }

    void getExercises()
  }, [exerciseTypesTable, setExerciseTypesTable])

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
        data={exerciseTypesTable}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseType}
      />
    </View>
  )
}

export default ExerciseList
