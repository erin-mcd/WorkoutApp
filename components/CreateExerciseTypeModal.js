import React from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Modal,
} from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addExerciseType } from "../redux/exerciseTypes";

function CreateExerciseTypeModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  function titleInputHandler(enteredTitle) {
    setTitle(enteredTitle);
  }
  function getId() {
    const id = Math.random(0, 1000);
    return id;
  }

  function validateInputs(title) {
    const validationErrors = [];

    const titleIsValid = title.length > 0 && title.length < 20;

    if (!titleIsValid) {
      validationErrors.push("Title is Invalid");
    }

    return validationErrors;
  }

  function confirmHandler() {
    const errors = validateInputs(title);
    if (errors.length > 0) {
      alert(JSON.stringify(errors));
    } else {
      dispatch(addExerciseType({ title, id: getId() }));
    }

    onClose();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <View style={styles.contentContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="ExerciseType Title"
              onChangeText={titleInputHandler}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Pressable onPress={() => onClose()} style={styles.cancelButton}>
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
  );
}

export default CreateExerciseTypeModal;

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 50,
    padding: 20,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#00000080",
    flex: 1,
  },
  textInput: {
    height: 50,
    width: 200,
    backgroundColor: "white",
    margin: 8,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
  inputsContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 50,
  },
  buttonsContainer: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  cancelButton: {
    backgroundColor: "#f194ff",
    borderRadius: 10,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  innerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    height: "60%",
    marginBottom: 80,
    alignContent: "center",
    justifyContent: "center",
  },
});
