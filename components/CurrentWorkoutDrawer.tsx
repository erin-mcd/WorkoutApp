import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
// @ts-expect-error not available for component
import BottomDrawer from 'react-native-bottom-drawer-view'
import {
  addActiveExercise,
  endWorkout,
  setPickExerciseModalVisible,
  removeActiveExercise,
  addSet,
  removeSet,
  editSetReps,
  editSetWeight,
  cancelWorkout,
} from '../reduxThings/activeExercises'
import { useDispatch, useSelector } from 'react-redux'
import PickExerciseModal from './PickExerciseModal'
import ExerciseDrawerForm from './ExerciseDrawerForm'
import { type Exercise } from '../models/Exercise'
import { type RootState } from '../reduxThings/store'

function CurrentWorkoutDrawer(): JSX.Element {
  const dispatch = useDispatch()
  const activeExercises: Exercise[] = useSelector(
    (state: RootState) => state.activeExercises.activeExercises
  )
  const pickExerciseModalVisible: boolean = useSelector(
    (state: RootState) => state.activeExercises.pickExerciseModalVisible
  )

  return (
    <>
      <BottomDrawer containerHeight={800} downDisplay={500}>
        <View style={styles.drawer}>
          <Pressable
            style={styles.finishButton}
            onPress={() => dispatch(endWorkout())}
          >
            <Text style={styles.finishButtonText}>Finish</Text>
          </Pressable>
          <ExerciseDrawerForm
            exercises={activeExercises}
            removeExerciseFunction={({ id }) =>
              dispatch(removeActiveExercise({ id }))
            }
            removeSetFunction={({ exerciseId, setId }) =>
              dispatch(removeSet({ exerciseId, setId }))
            }
            addSetFunction={(exerciseId) => dispatch(addSet(exerciseId))}
            editSetRepsFunction={({ exerciseId, setId, reps }) =>
              dispatch(
                editSetReps({
                  exerciseId,
                  setId,
                  reps,
                })
              )
            }
            editSetWeightFunction={({ exerciseId, setId, weight }) =>
              dispatch(
                editSetWeight({
                  exerciseId,
                  setId,
                  weight,
                })
              )
            }
            cancelFunction={() => dispatch(cancelWorkout())}
            showPickExerciseModalFunction={() =>
              dispatch(setPickExerciseModalVisible(true))
            }
          />
        </View>
      </BottomDrawer>
      <PickExerciseModal
        open={pickExerciseModalVisible}
        onClose={() => setPickExerciseModalVisible(false)}
        addExerciseFunction={({ name }) =>
          dispatch(addActiveExercise({ name }))
        }
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
