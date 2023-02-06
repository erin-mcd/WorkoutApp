import React, { useState } from "react";
import { Text, StyleSheet, Button, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { SQLTransaction } from "expo-sqlite";

function onDeleteDB() {
  const db = SQLite.openDatabase("db.workoutDB");
  db.closeAsync();
  db.deleteAsync();
}

function printHistory() {
  const db = SQLite.openDatabase("db.workoutDB");
  db.transaction((tx: SQLTransaction) => {
    tx.executeSql("SELECT * FROM workoutObjects", [], (txObj, resultSet) =>
      console.log(JSON.stringify(resultSet.rows._array))
    );
  });
}

function SettingsScreen() {
  return (
    <View>
      <Button title="Print History" onPress={() => printHistory()} />
      <Button title="Delete DB" onPress={() => onDeleteDB()} />
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({});
