import React from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import ExerciseList from './ExerciseList'

interface Props {
  open: boolean
  onClose: () => void
  addExerciseFunction: ({ name }: { name: string }) => void
}

function PickExerciseModal({
  open,
  onClose,
  addExerciseFunction,
}: Props): JSX.Element {
  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <View style={styles.contentContainer}>
        <View style={styles.innerContainer}>
          <View>
            <ExerciseList
              isActiveWorkout={true}
              isHistoryEdit={true}
              onTap={() => {
                onClose()
              }}
              addExerciseFunction={addExerciseFunction}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default PickExerciseModal

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 50,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
    flex: 1,
  },
  exerciseListItem: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 4,
    width: 300,
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
    height: '60%',
    marginBottom: 80,
    alignContent: 'center',
    justifyContent: 'center',
  },
})
