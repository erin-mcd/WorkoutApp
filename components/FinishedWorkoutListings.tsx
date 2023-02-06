import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Button,
  Pressable,
} from "react-native";
import { Exercise } from "../models/Exercise";
import { dropWorkoutTable } from "../db-service";
import EditWorkoutHistoryModal from "./EditWorkoutHistoryModal";
import { useDispatch } from "react-redux";
import { setHistoryValues } from "../reduxThings/editHistory";
import { ExerciseSet } from "../models/ExerciseSet";

function FinishedWorkoutListings(workouts: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  function findBestSet(sets: ExerciseSet[]) {
    const maxWeight = Math.max.apply(
      Math,
      sets.map(function (set) {
        return set.weight;
      })
    );

    const setsWithMaxWeight = sets.filter((set) => set.weight === maxWeight);

    const maxReps = Math.max.apply(
      Math,
      setsWithMaxWeight.map(function (set) {
        return set.reps;
      })
    );

    return { weight: maxWeight, reps: maxReps };
  }

  function renderExercise(itemData: any) {
    const exercise: Exercise = itemData.item;
    const bestSet = findBestSet(exercise.sets);

    return (
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseName}>{itemData.item.name}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>{bestSet.weight}</Text>
          <Text style={styles.detailsText}>{bestSet.reps}</Text>
        </View>
      </View>
    );
  }

  function renderWorkoutListing(itemData: any) {
    const workoutObject: Exercise[] = JSON.parse(itemData.item.jsonObject);
    const workoutId = JSON.parse(itemData.item.id);
    return (
      <View style={styles.workoutContainer}>
        <Pressable
          onPress={() => {
            dispatch(
              setHistoryValues({ workoutObject: workoutObject, id: workoutId })
            );
            setModalVisible(true);
          }}
        >
          <Text style={styles.dateText}>{itemData.item.date}</Text>
          <View style={styles.headerContainer}>
            <Text style={styles.exerciseText}>Exercise</Text>
            <Text style={styles.bestSetText}>Best Set</Text>
          </View>
          <FlatList
            data={workoutObject}
            keyExtractor={(item) => JSON.stringify(item.id)}
            renderItem={renderExercise}
          />
        </Pressable>
        <EditWorkoutHistoryModal
          open={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={workouts.workouts}
        keyExtractor={(item) => item.id}
        renderItem={renderWorkoutListing}
      />
      <Button title="clear" onPress={() => dropWorkoutTable()} />
    </View>
  );
}

export default FinishedWorkoutListings;

const styles = StyleSheet.create({
  workoutContainer: {
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 2,
    width: 400,
    borderRadius: 8,
    backgroundColor: "white",
  },
  detailsContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },
  detailsText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  exerciseContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "gray",
    marginVertical: 10,
    marginLeft: 10,
  },
  exerciseName: {
    fontSize: 16,
  },
  exerciseText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bestSetText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 20,
  },
  headerContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
