import React from "react";
import { Button, StyleSheet } from "react-native";
import CurrentWorkoutDrawer from "../components/CurrentWorkoutDrawer";
import { startWorkout } from "../redux/currentWorkout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function StartWorkoutScreen(props) {
  const dispatch = useDispatch();
  const currentWorkoutState = useSelector(
    (state) => state.activeWorkout.activeWorkout
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
