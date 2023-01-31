import React from "react";
import { Text, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";
import { useState } from "react";
import FinishedWorkoutListings from "../components/FinishedWorkoutListings";
const db = SQLite.openDatabase("db.testDb");

function HistoryScreen(props) {
  const [workoutTable, setWorkoutTable] = useState();
  const setWorkoutTableFromDB = (db) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM workoutObjects",
        null,
        (txObj, resultSet) => {
          setWorkoutTable(resultSet.rows._array);
        },
        (txObject, error) => console.log(error)
      );
    });
  };

  setWorkoutTableFromDB(db);

  return <FinishedWorkoutListings workouts={workoutTable} />;
}

export default HistoryScreen;

const styles = StyleSheet.create({});
