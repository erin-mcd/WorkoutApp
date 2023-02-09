import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
interface Props {
  cancelEditFunction: () => void
  showPickExerciseModalFunction: () => void
}

function ButtonsComponent({
  cancelEditFunction,
  showPickExerciseModalFunction,
}: Props): JSX.Element {
  return (
    <View>
      <Pressable
        onPress={() => {
          showPickExerciseModalFunction()
        }}
        style={({ pressed }) => [
          styles.addExerciseButton,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.addExerciseText}>Add an Exercise</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          cancelEditFunction()
        }}
        style={({ pressed }) => [
          styles.cancelWorkoutButton,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.cancelWorkoutText}>Cancel Workout</Text>
      </Pressable>
    </View>
  )
}

export default ButtonsComponent

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.5,
  },

  addExerciseButton: {
    backgroundColor: 'gray',
    padding: 10,
    width: 350,
    borderRadius: 8,
  },
  addExerciseText: {
    textAlign: 'center',
  },
  cancelWorkoutButton: {
    backgroundColor: '#ff7885',
    padding: 10,
    width: 350,
    borderRadius: 8,
    marginTop: 10,
  },
  cancelWorkoutText: {
    textAlign: 'center',
  },
})
