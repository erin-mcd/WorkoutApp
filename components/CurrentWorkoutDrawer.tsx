import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
// @ts-expect-error not available for component
import BottomDrawer from 'react-native-bottom-drawer-view'
import {
  addActiveExercises,
  endWorkout,
  setPickExerciseModalVisible,
  removeActiveExercise,
  addSet,
  removeSet,
  editSetReps,
  editSetWeight,
  cancelWorkout,
  addToAddList,
  removeFromAddList,
} from '../redux/activeExercises'
import { useDispatch, useSelector } from 'react-redux'
import PickExerciseModal from './PickExerciseModal'
import ExerciseForm from './ExerciseForm'
import { type Exercise } from '../models/Exercise'
import { type RootState } from '../redux/store'

const CurrentWorkoutDrawer = (): JSX.Element => {
  const dispatch = useDispatch()
  const activeExercises: Exercise[] = useSelector(
    (state: RootState) => state.activeExercises.activeExercises
  )
  const pickExerciseModalVisible: boolean = useSelector(
    (state: RootState) => state.activeExercises.pickExerciseModalVisible
  )
  const exercisesToAddListActive: string[] = useSelector(
    (state: RootState) => state.activeExercises.exercisesToAdd
  )

  return (
    <>
      <BottomDrawer containerHeight={800} downDisplay={500}>
        <View style={styles.drawer}>
          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => dispatch(endWorkout())}
          >
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
          <ExerciseForm
            exercises={activeExercises}
            removeExercise={({ id }) => dispatch(removeActiveExercise({ id }))}
            removeSet={({ exerciseId, setId }) =>
              dispatch(removeSet({ exerciseId, setId }))
            }
            addSet={(exerciseId) => dispatch(addSet(exerciseId))}
            editSetReps={({ exerciseId, setId, reps }) =>
              dispatch(
                editSetReps({
                  exerciseId,
                  setId,
                  reps,
                })
              )
            }
            editSetWeight={({ exerciseId, setId, weight }) =>
              dispatch(
                editSetWeight({
                  exerciseId,
                  setId,
                  weight,
                })
              )
            }
            cancel={() => {
              dispatch(cancelWorkout())
            }}
            showPickExerciseModal={() =>
              dispatch(setPickExerciseModalVisible(true))
            }
          />
        </View>
      </BottomDrawer>
      <PickExerciseModal
        exercisesToAdd={exercisesToAddListActive}
        add={(name: string) => dispatch(addToAddList(name))}
        remove={(name: string) => dispatch(removeFromAddList(name))}
        open={pickExerciseModalVisible}
        onClose={() => setPickExerciseModalVisible(false)}
        addExercises={() => dispatch(addActiveExercises())}
      />
    </>
  )
}

export default CurrentWorkoutDrawer

const styles = StyleSheet.create({
  finishButton: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  finishButtonText: {
    textAlign: 'right',
    color: 'green',
    fontSize: 20,
  },

  drawer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.5,
  },
})
