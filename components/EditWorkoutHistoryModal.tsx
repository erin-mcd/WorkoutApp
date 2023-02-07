import React from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Modal,
  Alert,
  Button,
} from "react-native";
import ExerciseDrawerForm from "./ExerciseDrawerForm";
import { Exercise } from "../models/Exercise";
import { useState } from "react";
import PickExerciseModal from "./PickExerciseModal";
import {
  addExerciseHistory,
  addSetHistory,
  editSetRepsHistory,
  editSetWeightHistory,
  endHistoryEdit,
  removeExerciseHistory,
  removeSetHistory,
  setHistoryValues,
} from "../reduxThings/editHistory";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxThings/store";

interface Props {
  open: boolean;
  onClose: () => void;
}

const init: Exercise[] = [];

function EditWorkoutHistoryModal({ open, onClose }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const workoutHistory: Exercise[] = useSelector(
    (state: RootState) => state.editHistory.historyExercises
  );
  const dispatch = useDispatch();

  function confirmHandler() {
    onClose();
  }
  function editSetWeightExerciseHistory({
    exerciseId,
    setId,
    weight,
  }: {
    exerciseId: number;
    setId: number;
    weight: number;
  }) {
    dispatch(
      editSetWeightHistory({
        exerciseId,
        setId,
        weight,
      })
    );
  }

  function editSetRepsExerciseHistory({
    exerciseId,
    setId,
    reps,
  }: {
    exerciseId: number;
    setId: number;
    reps: number;
  }) {
    dispatch(
      editSetRepsHistory({
        exerciseId,
        setId,
        reps,
      })
    );
  }
  function addSetHistoryExercise(exerciseId: number) {
    dispatch(addSetHistory(exerciseId));
  }
  function removeHistorySet({
    exerciseId,
    setId,
  }: {
    exerciseId: number;
    setId: number;
  }) {
    dispatch(removeSetHistory({ exerciseId, setId }));
  }

  function removeHistoryExerciseFunction({ id }: { id: number }) {
    dispatch(removeExerciseHistory({ id: id }));
  }

  function addHistoryExerciseFunction({ name }: { name: string }) {
    dispatch(addExerciseHistory({ name: name }));
  }

  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={styles.modelContentsContainer}>
        <View style={styles.innerContainer}>
          <Button title="close" onPress={() => confirmHandler()} />
          <Pressable
            style={styles.finishButton}
            onPress={() => {
              dispatch(endHistoryEdit());
              onClose();
            }}
          >
            <Text style={styles.finishButtonText}>Finish</Text>
          </Pressable>
          <Button
            title="print"
            onPress={() => console.log(JSON.stringify(workoutHistory))}
          />
          <ExerciseDrawerForm
            exercises={workoutHistory}
            editSetWeightFunction={editSetWeightExerciseHistory}
            editSetRepsFunction={editSetRepsExerciseHistory}
            addSetFunction={addSetHistoryExercise}
            removeSetFunction={removeHistorySet}
            removeExerciseFunction={removeHistoryExerciseFunction}
          />
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.addExerciseButton}
          >
            <Text style={styles.addExerciseText}>Add an Exercise</Text>
          </Pressable>
        </View>
        <PickExerciseModal
          open={modalVisible}
          onClose={() => setModalVisible(false)}
          addActiveExerciseFunction={addHistoryExerciseFunction}
        />
      </View>
    </Modal>
  );
}

export default EditWorkoutHistoryModal;

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
  modelContentsContainer: {
    marginTop: 50,
    padding: 20,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#00000080",
    flex: 1,
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
  finishButton: {
    padding: 10,
    alignSelf: "flex-end",
  },
  finishButtonText: {
    textAlign: "right",
    color: "green",
    fontSize: 20,
  },
});
