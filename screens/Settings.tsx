import React from 'react'
import { Button, View } from 'react-native'
import * as SQLite from 'expo-sqlite'

function onDeleteDB(): void {
  const db = SQLite.openDatabase('db.workoutDB')
  db.closeAsync()
  void db.deleteAsync()
}

function SettingsScreen(): JSX.Element {
  return (
    <View>
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
