import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Modal,
} from 'react-native'

import { addExerciseTypeToDB } from '../db-service'

interface Props {
  open: boolean
  onClose: () => void
}

const CreateExerciseTypeModal = ({ open, onClose }: Props): JSX.Element => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const confirmHandler = (): void => {
    addExerciseTypeToDB(name, category, description)
    onClose()
  }

  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={styles.contentContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Exercise Name"
              onChangeText={(enteredName: string): void => {
                setName(enteredName)
              }}
              maxLength={20}
              placeholderTextColor={'gray'}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Category"
              onChangeText={(enteredName: string): void => {
                setCategory(enteredName)
              }}
              maxLength={20}
              placeholderTextColor={'gray'}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Description"
              onChangeText={(enteredName: string): void => {
                setDescription(enteredName)
              }}
              maxLength={100}
              placeholderTextColor={'gray'}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Pressable
              onPress={() => {
                onClose()
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={confirmHandler}
              style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default CreateExerciseTypeModal

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
    height: '60%',
    marginBottom: 80,
    alignContent: 'center',
    justifyContent: 'center',
  },
})
