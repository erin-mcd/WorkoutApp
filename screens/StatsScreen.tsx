import { SQLError, SQLResultSet, SQLTransaction } from "expo-sqlite";
import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.testDb");

function StatsScreen() {
  const [statTable, setStatTable] = useState();
  function setStatCallback(txObj: any, resultSet: SQLResultSet) {
    setStatTable(resultSet.rows._array);
  }

  const setStatTableFromDB = (exerciseName: string) => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        "SELECT * FROM " + exerciseName,
        [],
        (txObj, resultSet) => setStatCallback(txObj, resultSet),
        (error: SQLError) => console.log(error)
      );
    });
  };

  setStatTableFromDB("Squat");

  return <Text>{JSON.stringify(statTable)}</Text>;
}

export default StatsScreen;

const styles = StyleSheet.create({});
