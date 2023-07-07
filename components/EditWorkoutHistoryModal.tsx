import React from 'react'
import { Text, StyleSheet, View, Pressable, Modal } from 'react-native'
import ExerciseForm from './ExerciseForm'
import { type Exercise } from '../models/Exercise'
import PickExerciseModal from './PickExerciseModal'
import {
  addExercisesHistory,
  addSetHistory,
  addToAddListHistory,
  editSetRepsHistory,
  editSetWeightHistory,
  endHistoryEdit,
  removeExerciseHistory,
  removeFromAddListHistory,
  removeSetHistory,
  setIsEditing,
  setPickExerciseHistoryModalVisible,
} from '../redux/editHistory'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../redux/store'

interface Props {
  open: boolean
  onClose: () => void
}

const EditWorkoutHistoryModal = ({ open, onClose }: Props): JSX.Element => {
  const workoutHistory: Exercise[] = useSelector(
    (state: RootState) => state.editHistory.historyExercises
  )
  const pickExerciseModalVisible: boolean = useSelector(
    (state: RootState) => state.editHistory.pickExerciseModalVisible
  )
  const exercisesToAddListActiveHistory: string[] = useSelector(
    (state: RootState) => state.editHistory.exercisesToAdd
  )
  const dispatch = useDispatch()

  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={styles.modelContentsContainer}>
        <View style={styles.innerContainer}>
          <Pressable
            style={styles.finishButton}
            onPress={() => {
              dispatch(endHistoryEdit())
              onClose()
            }}
          >
            <Text style={styles.finishButtonText}>Finish</Text>
          </Pressable>
          <ExerciseForm
            exercises={workoutHistory}
            editSetWeight={({ exerciseId, setId, weight }) =>
              dispatch(
                editSetWeightHistory({
                  exerciseId,
                  setId,
                  weight,
                })
              )
            }
            editSetReps={({ exerciseId, setId, reps }) =>
              dispatch(
                editSetRepsHistory({
                  exerciseId,
                  setId,
                  reps,
                })
              )
            }
            addSet={(exerciseId) => dispatch(addSetHistory(exerciseId))}
            removeSet={({ exerciseId, setId }) =>
              dispatch(removeSetHistory({ exerciseId, setId }))
            }
            removeExercise={(id) => dispatch(removeExerciseHistory({ id }))}
            cancel={() => {
              dispatch(setIsEditing(false))
              onClose()
            }}
            showPickExerciseModal={() =>
              dispatch(setPickExerciseHistoryModalVisible(true))
            }
          />
        </View>
        <PickExerciseModal
          exercisesToAdd={exercisesToAddListActiveHistory}
          add={(name: string) => dispatch(addToAddListHistory(name))}
          remove={(name: string) => dispatch(removeFromAddListHistory(name))}
          open={pickExerciseModalVisible}
          onClose={() => setPickExerciseHistoryModalVisible(false)}
          addExercises={() => dispatch(addExercisesHistory())}
        />
      </View>
    </Modal>
  )
}

export default EditWorkoutHistoryModal

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 50,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
    flex: 1,
  },
  textInput: {
    height: 50,
    width: 200,
    backgroundColor: 'white',
    margin: 8,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  inputsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  buttonsContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    margin: 8,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  cancelButton: {
    backgroundColor: '#f194ff',
    borderRadius: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    margin: 8,
  },
  innerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: '70%',
    marginBottom: 80,
    alignContent: 'center',
    justifyContent: 'center',
  },
  modelContentsContainer: {
    marginTop: 50,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
    flex: 1,
  },
  addExerciseButton: {
    backgroundColor: 'gray',
    padding: 10,
    width: '80%',
    borderRadius: 8,
  },
  addExerciseText: {
    textAlign: 'center',
  },
  finishButton: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  finishButtonText: {
    textAlign: 'right',
    color: 'green',
    fontSize: 20,
  },
})
