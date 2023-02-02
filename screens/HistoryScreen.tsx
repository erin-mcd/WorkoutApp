import React from "react";
import { Text, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";
import { useState } from "react";
import FinishedWorkoutListings from "../components/FinishedWorkoutListings";
import { SQLError, SQLResultSet, SQLTransaction } from "expo-sqlite";
const db = SQLite.openDatabase("db.testDb");

function HistoryScreen() {
  const [workoutTable, setWorkoutTable] = useState();
  function setWorkoutCallback(txObj: any, resultSet: SQLResultSet) {
    setWorkoutTable(resultSet.rows._array);
  }

  const setWorkoutTableFromDB = (db) => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        "SELECT * FROM workoutObjects",
        [],
        (txObj, resultSet) => setWorkoutCallback(txObj, resultSet),
        (error: SQLError) => console.log(error)
      );
    });
  };

  setWorkoutTableFromDB(db);

  return (
    <>
      {workoutTable !== undefined ? (
        <FinishedWorkoutListings workouts={workoutTable} />
      ) : null}
    </>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({});
