import React from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import BottomDrawer from "react-native-bottom-drawer-view";
import { endWorkout } from "../redux/currentWorkout";
import { useDispatch } from "react-redux";
import PickExerciseModal from "./PickExerciseModal";
import { useState } from "react";

function CurrentWorkoutDrawer() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

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
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.addExerciseButton}
          >
            <Text style={styles.addExerciseText}>Add an Exercise</Text>
          </Pressable>
        </View>
      </BottomDrawer>
      <PickExerciseModal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
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
