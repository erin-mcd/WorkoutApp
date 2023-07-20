import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import CreateExerciseTypeModal from '../components/CreateExerciseTypeModal'
import ExerciseList from '../components/ExerciseList'
import ExerciseInfoModal from '../components/ExerciseInfoModal'
import { getExerciseTypesFromDB } from '../db-service'

const Exercises = ({ navigation }: any): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false)
  const [infoModalVisible, setInfoModalModalVisible] = useState(false)
  const [exercise, setExercise] = useState({
    name: '',
    description: '',
    category: '',
    id: 0,
  })
  const init: any[] = []

  const [exerciseTypes, setExerciseTypes] = useState(init)

  useEffect(() => {
    async function getExercises(): Promise<void> {
      const exerciseTypes = await getExerciseTypesFromDB()
      setExerciseTypes(exerciseTypes)
    }

    void getExercises()
  }, [exerciseTypes, setExerciseTypes])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View>
            <Pressable
              onPress={() => {
                setModalVisible(true)
              }}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Ionicons name={'add'} size={24} color={'black'} />
            </Pressable>
          </View>
        )
      },
    })
  }, [navigation])

  return (
    <>
      <View style={styles.exerciseList}>
        <ExerciseList
          exerciseTypes={exerciseTypes}
          onTap={(exerciseInfo) => {
            setExercise(exerciseInfo)
            setInfoModalModalVisible(true)
          }}
        />
      </View>
      <CreateExerciseTypeModal
        exerciseTypes={exerciseTypes}
        open={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
      />
      <ExerciseInfoModal
        exerciseType={exercise}
        open={infoModalVisible}
        onClose={() => {
          setInfoModalModalVisible(false)
        }}
      />
    </>
  )
}

export default Exercises
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  exerciseList: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
})
