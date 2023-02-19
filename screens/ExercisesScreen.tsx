import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import CreateExerciseTypeModal from '../components/CreateExerciseTypeModal'
import ExerciseList from '../components/ExerciseList'

function Exercises({ navigation }: any): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false)

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
          onTap={() => {
            console.log('hi')
          }}
        />
      </View>
      <CreateExerciseTypeModal
        open={modalVisible}
        onClose={() => {
          setModalVisible(false)
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
