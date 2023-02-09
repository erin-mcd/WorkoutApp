import React from 'react'
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

import { type Exercise } from '../models/Exercise'
import { type ExerciseSet } from '../models/ExerciseSet'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import ButtonsComponent from './ButtonsComponent'
interface Props {
  itemData: any
  exerciseId: number
}

interface formProps {
  exercises: Exercise[]
  removeExerciseFunction: ({ id }: { id: number }) => void
  editSetRepsFunction: ({
    exerciseId,
    setId,
    reps,
  }: {
    exerciseId: number
    setId: number
    reps: number
  }) => void
  removeSetFunction: ({
    exerciseId,
    setId,
  }: {
    exerciseId: number
    setId: number
  }) => void
  editSetWeightFunction: ({
    exerciseId,
    setId,
    weight,
  }: {
    exerciseId: number
    setId: number
    weight: number
  }) => void
  addSetFunction: (id: number) => void
  cancelFunction: () => void
  showPickExerciseModalFunction: () => void
}

function ExerciseDrawerForm({
  exercises,
  removeExerciseFunction,
  editSetRepsFunction,
  removeSetFunction,
  editSetWeightFunction,
  addSetFunction,
  cancelFunction,
  showPickExerciseModalFunction,
}: formProps): JSX.Element {
  function renderSet({ itemData, exerciseId }: Props): JSX.Element {
    const set: ExerciseSet = itemData.item
    const rightAction = (
      progressAnimatedValue: any,
      dragX: {
        interpolate: (arg0: {
          inputRange: number[]
          outputRange: number[]
        }) => any
      }
    ): JSX.Element => {
      const translateX = dragX.interpolate({
        inputRange: [-150, 0.5],
        outputRange: [50, 300],
      })

      const swipeStyle = {
        transform: [
          {
            translateX,
          },
        ],
      }

      return (
        <View style={styles.deleteContainer}>
          <Animated.Text style={[swipeStyle, styles.deleteText]}>
            Delete
          </Animated.Text>
        </View>
      )
    }

    return (
      <Swipeable
        onSwipeableWillOpen={() => {
          removeSetFunction({ exerciseId, setId: itemData.item.id })
        }}
        renderRightActions={rightAction}
        rightThreshold={200}
      >
        <View style={styles.inputContainer}>
          <View style={[styles.detailsContainer, { flex: 1 }]}>
            <Text style={styles.detailsText}>{set.id}</Text>
          </View>
          <View style={[styles.detailsContainer, { flex: 2 }]}>
            {set.weight !== null && set.reps !== null ? (
              <Text style={styles.detailsText}>
                {set.weight.toString() + 'x' + set.reps.toString()}
              </Text>
            ) : (
              <Text style={styles.detailsText}>-------</Text>
            )}
          </View>
          <TextInput
            keyboardType="number-pad"
            onChangeText={(text) => {
              editSetWeightFunction({
                exerciseId,
                setId: itemData.item.id,
                weight: Number(text) ?? 0,
              })
            }}
            style={[styles.detailsContainer, { flex: 1 }]}
          >
            {set.weight}
          </TextInput>
          <TextInput
            keyboardType="number-pad"
            style={[styles.detailsContainer, { flex: 1 }]}
            onChangeText={(text) => {
              editSetRepsFunction({
                exerciseId,
                setId: itemData.item.id,
                reps: Number(text) ?? 0,
              })
            }}
          >
            {set.reps}
          </TextInput>
        </View>
      </Swipeable>
    )
  }

  function renderExercises(itemData: any): JSX.Element {
    const exerciseId = itemData.item.id

    return (
      <View>
        <View style={styles.exerciseNameContainer}>
          <Text style={styles.exerciseName}>{itemData.item.name}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.deleteExerciseButton,
              pressed ? styles.buttonPressed : null,
            ]}
            onPress={() => {
              removeExerciseFunction({ id: exerciseId })
            }}
          >
            <Text style={styles.deleteExerciseText}>Delete Exercise</Text>
          </Pressable>
        </View>
        <View style={styles.columnHeadersContainer}>
          <Text style={[styles.headerText, { flex: 1 }]}>Set</Text>
          <Text style={[styles.headerText, { flex: 2 }]}>Previous</Text>
          <Text style={[styles.headerText, { flex: 1 }]}>lbs</Text>
          <Text style={[styles.headerText, { flex: 1 }]}>Rep</Text>
        </View>
        <FlatList
          data={itemData.item.sets}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => renderSet({ itemData, exerciseId })}
        />
        <Pressable
          style={({ pressed }) => [
            styles.addSetButton,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={() => {
            addSetFunction(itemData.item.id)
          }}
        >
          <Text style={styles.addSetButtonText}>Add Set</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => JSON.stringify(item.id)}
        renderItem={renderExercises}
        ListFooterComponent={
          <ButtonsComponent
            cancelEditFunction={cancelFunction}
            showPickExerciseModalFunction={showPickExerciseModalFunction}
          />
        }
      />
    </View>
  )
}

export default ExerciseDrawerForm

const styles = StyleSheet.create({
  exerciseName: {
    fontWeight: 'bold',
  },
  columnHeadersContainer: {
    flexDirection: 'row',

    width: 350,
  },
  headerText: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    height: 30,
    width: 350,
    backgroundColor: 'white',
  },
  detailsContainer: {
    backgroundColor: '#e0e0e0',
    margin: 4,
    borderRadius: 8,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  detailsText: {
    textAlign: 'center',
  },
  addSetButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    height: 30,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  addSetButtonText: {
    textAlign: 'center',
  },
  deleteContainer: {
    backgroundColor: '#ff7885',
    flex: 1,
  },
  deleteText: {
    color: 'white',
    alignSelf: 'flex-end',
    fontSize: 18,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  deleteExerciseButton: {},
  exerciseNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  deleteExerciseText: {
    color: 'red',
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
  contentContainer: {
    height: 400,
    alignItems: 'center',
  },
})
