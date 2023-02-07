import React from "react";
import { Text, StyleSheet, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useState } from "react";
import FinishedWorkoutListings from "../components/FinishedWorkoutListings";
import { SQLError, SQLResultSet, SQLTransaction } from "expo-sqlite";
const db = SQLite.openDatabase("db.workoutDB");

const init: any[] = [];

function HistoryScreen() {
  const [workoutTable, setWorkoutTable] = useState(init);
  function setWorkoutCallback(txObj: any, resultSet: SQLResultSet) {
    setWorkoutTable(resultSet.rows._array);
  }

  const setWorkoutTableFromDB = (db: SQLite.WebSQLDatabase) => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql("SELECT * FROM workoutObjects", [], (txObj, resultSet) =>
        setWorkoutCallback(txObj, resultSet)
      );
    });
  };

  setWorkoutTableFromDB(db);

  return (
    <>
      {workoutTable !== undefined ? (
        <View style={styles.workoutListings}>
          <FinishedWorkoutListings workouts={workoutTable} />
        </View>
      ) : null}
    </>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
  workoutListings: {
    alignItems: "center",
  },
});
