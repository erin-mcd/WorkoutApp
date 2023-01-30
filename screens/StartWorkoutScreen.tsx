import React from "react";
import { Button, StyleSheet } from "react-native";
import CurrentWorkoutDrawer from "../components/CurrentWorkoutDrawer";
import { startWorkout } from "../reduxThings/activeExercises";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../reduxThings/store";

function StartWorkoutScreen(props) {
  const dispatch = useDispatch();
  const currentWorkoutState = useSelector(
    (state: RootState) => state.activeExercises.activeWorkout
  );

  function startWorkoutHandler() {
    dispatch(startWorkout());
  }

  return (
    <>
      <Button title="Start Workout" onPress={() => startWorkoutHandler()} />
      {currentWorkoutState ? <CurrentWorkoutDrawer /> : null}
    </>
  );
}

export default StartWorkoutScreen;

const styles = StyleSheet.create({});
