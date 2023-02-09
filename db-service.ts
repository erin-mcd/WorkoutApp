import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.workoutDB')

export const addName = (currentName: string): void => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO names (name) values (?)', [currentName])
  })
}

export const addWorkout = (jsonObject: string, startDate: string): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO workoutObjects (jsonObject, date) values (?, ?)',
      [jsonObject, startDate]
    )
  })
}

export const editWorkoutHistory = (
  newJsonObject: string,
  workoutId: number
): void => {
  db.transaction((tx) => {
    tx.executeSql('UPDATE workoutObjects SET jsonObject = ? WHERE id= ?', [
      newJsonObject,
      workoutId,
    ])
  })
}

export const addSetToExerciseStatTable = (
  tableName: string,
  date: string,
  weight: number,
  reps: number
): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO ' + tableName + ' (date, weight, reps) values (?, ?, ?)',
      [date, weight, reps]
    )
  })
}

export const dropWorkoutTable = (): void => {
  db.transaction((tx) => {
    tx.executeSql('DROP TABLE workoutObjects')
  })
}

export const getTable = (tableName: string): void => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM ' + tableName)
  })
}

export const createExerciseStatTable = (tableName: string): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        tableName +
        ' (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, weight REAL, reps INTEGER)'
    )
  })
}

export const createWorkoutObjectTable = (): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS workoutObjects (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, jsonObject TEXT)'
    )
  })
}
