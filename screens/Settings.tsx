import React from 'react'
import { Button, View } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { type SQLTransaction } from 'expo-sqlite'

function onDeleteDB(): void {
  const db = SQLite.openDatabase('db.workoutDB')
  db.closeAsync()
  void db.deleteAsync()
}

function printHistory(): void {
  const db = SQLite.openDatabase('db.workoutDB')
  db.transaction((tx: SQLTransaction) => {
    tx.executeSql('SELECT * FROM workoutObjects', [], (txObj, resultSet) => {
      console.log(JSON.stringify(resultSet.rows._array))
    })
  })
}

function SettingsScreen(): JSX.Element {
  return (
    <View>
      <Button
        title="Print History"
        onPress={() => {
          printHistory()
        }}
      />
      <Button
        title="Delete DB"
        onPress={() => {
          onDeleteDB()
        }}
      />
    </View>
  )
}

export default SettingsScreen
