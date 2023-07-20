import React from 'react'
import { Modal, Text, View, StyleSheet } from 'react-native'
import { deleteExerciseType } from '../db-service'
import { type ExerciseType } from '../models/ExerciseType'
import CloseButton from './CloseButton'
import GeneralButton from './GeneralButton'

interface Props {
  exerciseType: ExerciseType
  open: boolean
  onClose: () => void
}

const ExerciseInfoModal = ({
  exerciseType,
  open,
  onClose,
}: Props): JSX.Element => {
  return (
    <Modal transparent={true} visible={open}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <CloseButton onPress={onClose} />
          <Text style={styles.exerciseNameText}>{exerciseType.name}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.subHeaderText}>Category</Text>
            <Text style={styles.contentText}>{exerciseType.category}</Text>
            <Text style={styles.subHeaderText}>Description</Text>
            <Text style={styles.contentText}>{exerciseType.description}</Text>
          </View>
          <GeneralButton
            title="Delete"
            onPress={() => {
              deleteExerciseType(exerciseType.name)
              onClose()
            }}
          />
        </View>
      </View>
    </Modal>
  )
}

export default ExerciseInfoModal

const styles = StyleSheet.create({
  exerciseNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  contentText: {
    marginBottom: 10,
  },
  descriptionContainer: {
    height: 200,
    marginVertical: 10,
  },
  innerContainer: {
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  outerContainer: {
    marginTop: 50,
    padding: 12,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
    flex: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
})
