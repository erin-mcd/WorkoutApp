import { type SQLResultSet, type SQLTransaction } from 'expo-sqlite'
import React, { useState } from 'react'
import { Text } from 'react-native'
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.workoutDB')

const init: any[] = []

function StatsScreen(): JSX.Element {
  const [statTable, setStatTable] = useState(init)

  function setStatCallback(txObj: any, resultSet: SQLResultSet): void {
    setStatTable(resultSet.rows._array)
  }

  const setStatTableFromDB = (exerciseName: string): void => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql('SELECT * FROM ' + exerciseName, [], (txObj, resultSet) => {
        setStatCallback(txObj, resultSet)
      })
    })
  }

  setStatTableFromDB('Squat')

  return <Text>{JSON.stringify(statTable)}</Text>
}

export default StatsScreen
