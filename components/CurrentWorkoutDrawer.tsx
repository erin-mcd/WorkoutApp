import React from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
// @ts-ignore
import BottomDrawer from "react-native-bottom-drawer-view";
import { addActiveExercise, endWorkout } from "../reduxThings/activeExercises";
import { useDispatch, useSelector } from "react-redux";
import PickExerciseModal from "./PickExerciseModal";
import { useState } from "react";
import ExerciseDrawerForm from "./ExerciseDrawerForm";
import { getTable } from "../db-service";
import { Exercise } from "../models/Exercise";
import { RootState } from "../reduxThings/store";
import {
  removeActiveExercise,
  addSet,
  removeSet,
  editSetReps,
  editSetWeight,
} from "../reduxThings/activeExercises";

function CurrentWorkoutDrawer() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const activeExercises: Exercise[] = useSelector(
    (state: RootState) => state.activeExercises.activeExercises
  );

  function editSetWeightActiveExercise({ exerciseId, setId, weight }) {
    dispatch(
      editSetWeight({
        exerciseId,
        setId,
        weight,
      })
    );
  }

  function editSetRepsActiveExercise({ exerciseId, setId, reps }) {
    dispatch(
      editSetReps({
        exerciseId,
        setId,
        reps,
      })
    );
  }
  function addSetActiveExercise(exerciseId) {
    dispatch(addSet(exerciseId));
  }
  function removeActiveSet({ exerciseId, setId }) {
    dispatch(removeSet({ exerciseId, setId }));
  }

  function removeActiveExerciseFunction(exerciseId) {
    dispatch(removeActiveExercise({ id: exerciseId }));
  }

  function addActiveExerciseFunction({ name }) {
    dispatch(addActiveExercise({ name: name }));
  }

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
            removeExerciseFunction={removeActiveExerciseFunction}
            removeSetFunction={removeActiveSet}
            addSetFunction={addSetActiveExercise}
            editSetRepsFunction={editSetRepsActiveExercise}
            editSetWeightFunction={editSetWeightActiveExercise}
          />
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.addExerciseButton}
          >
            <Text style={styles.addExerciseText}>Add an Exercise</Text>
          </Pressable>
          <Button
            title={"print table"}
            onPress={() => getTable("workoutObjects")}
          />
        </View>
      </BottomDrawer>
      <PickExerciseModal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        addActiveExerciseFunction={addActiveExerciseFunction}
      />
    </>
  );
}

export default CurrentWorkoutDrawer;

const styles = StyleSheet.create({
  finishButton: {
    padding: 10,
    alignSelf: "flex-end",
  },
  finishButtonText: {
    textAlign: "right",
    color: "green",
    fontSize: 20,
  },
  addExerciseButton: {
    backgroundColor: "gray",
    padding: 10,
    width: "80%",
    borderRadius: 8,
  },
  addExerciseText: {
    textAlign: "center",
  },
  drawer: {
    flex: 1,
    alignItems: "center",
  },
});
