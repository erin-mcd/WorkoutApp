import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as SQLite from 'expo-sqlite'

import FinishedWorkoutListings from '../components/FinishedWorkoutListings'
import { type SQLResultSet, type SQLTransaction } from 'expo-sqlite'
const db = SQLite.openDatabase('db.workoutDB')

const init: any[] = []

function HistoryScreen(): JSX.Element {
  const [workoutTable, setWorkoutTable] = useState(init)

  function setWorkoutCallback(txObj: any, resultSet: SQLResultSet): void {
    setWorkoutTable(resultSet.rows._array)
  }

  const setWorkoutTableFromDB = (db: SQLite.WebSQLDatabase): void => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql('SELECT * FROM workoutObjects', [], (txObj, resultSet) => {
        setWorkoutCallback(txObj, resultSet)
      })
    })
  }

  setWorkoutTableFromDB(db)

  return (
    <>
      {workoutTable !== undefined ? (
        <View style={styles.workoutListings}>
          <FinishedWorkoutListings workouts={workoutTable} />
        </View>
      ) : null}
    </>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  workoutListings: {
    alignItems: 'center',
  },
})
