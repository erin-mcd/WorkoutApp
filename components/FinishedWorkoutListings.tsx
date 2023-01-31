import React from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import { Exercise } from "../models/Exercise";
import { dropWorkoutTable } from "../db-service";

function FinishedWorkoutListings(workouts: any) {
  function renderExercise(itemData: any) {
    const exercise: Exercise = itemData.item;
    return (
      <View style={styles.exerciseContainer}>
        <Text>{itemData.item.name}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>{itemData.item.sets[0].weight}</Text>
          <Text style={styles.detailsText}>{itemData.item.sets[0].reps}</Text>
        </View>
      </View>
    );
  }

  function renderWorkoutListing(itemData: any) {
    const workoutObject: Exercise[] = JSON.parse(itemData.item.jsonObject);
    return (
      <View style={styles.workoutContainer}>
        <Text>{itemData.item.date}</Text>
        <FlatList
          data={workoutObject}
          keyExtractor={(item) => JSON.stringify(item.id)}
          renderItem={renderExercise}
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
  },
  detailsContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
  },
  detailsText: {
    marginHorizontal: 10,
  },
  exerciseContainer: { flexDirection: "row" },
});
