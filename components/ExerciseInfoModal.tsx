import React from 'react'
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { deleteExerciseType } from '../db-service'
import { type ExerciseType } from '../models/ExerciseType'

interface Props {
  exerciseType: ExerciseType
  open: boolean
  onClose: () => void
}

function ExerciseInfoModal({
  exerciseType,
  open,
  onClose,
}: Props): JSX.Element {
  return (
    <Modal transparent={true} visible={open}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>

          <Text>{exerciseType.name}</Text>
          <View style={styles.descriptionContainer}>
            <Text>{exerciseType.category}</Text>
            <Text>{exerciseType.description}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              deleteExerciseType(exerciseType.name)
              onClose()
            }}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ExerciseInfoModal

const styles = StyleSheet.create({
  descriptionContainer: {
    height: 100,
  },
  innerContainer: {
    borderRadius: 8,
    backgroundColor: 'white',
  },
  outerContainer: {
    marginTop: 50,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
    flex: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
})
