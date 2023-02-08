import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
interface Props {
  cancelEditFunction: () => void;
  showPickExerciseModalFunction: () => void;
}
function ButtonsComponent({
  cancelEditFunction,
  showPickExerciseModalFunction,
}: Props) {
  return (
    <View>
      <Pressable
        onPress={() => showPickExerciseModalFunction()}
        style={({ pressed }) => [
          styles.addExerciseButton,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.addExerciseText}>Add an Exercise</Text>
      </Pressable>
      <Pressable
        onPress={() => cancelEditFunction()}
        style={({ pressed }) => [
          styles.cancelWorkoutButton,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.cancelWorkoutText}>Cancel Workout</Text>
      </Pressable>
    </View>
  );
}

export default ButtonsComponent;

const styles = StyleSheet.create({
  exerciseName: {
    fontWeight: "bold",
  },
  columnHeadersContainer: {
    flexDirection: "row",

    width: 350,
  },
  headerText: {
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    height: 30,
    width: 350,
    backgroundColor: "white",
  },
  detailsContainer: {
    backgroundColor: "#e0e0e0",
    margin: 4,
    borderRadius: 8,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  detailsText: {
    textAlign: "center",
  },
  addSetButton: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    height: 30,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
  },
  addSetButtonText: {
    textAlign: "center",
  },
  deleteContainer: {
    backgroundColor: "#ff7885",
    flex: 1,
  },
  deleteText: {
    color: "white",
    alignSelf: "flex-end",
    fontSize: 18,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  deleteExerciseButton: {},
  exerciseNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  deleteExerciseText: {
    color: "red",
  },
  addExerciseButton: {
    backgroundColor: "gray",
    padding: 10,
    width: 350,
    borderRadius: 8,
  },
  addExerciseText: {
    textAlign: "center",
  },
  cancelWorkoutButton: {
    backgroundColor: "#ff7885",
    padding: 10,
    width: 350,
    borderRadius: 8,
    marginTop: 10,
  },
  cancelWorkoutText: {
    textAlign: "center",
  },
  contentContainer: {
    height: 400,
    alignItems: "center",
  },
});
