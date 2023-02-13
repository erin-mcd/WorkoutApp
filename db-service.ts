import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.workoutDB')

export const addName = (currentName: string): void => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO names (name) values (?)', [currentName])
  })
}

export const addWorkout = (jsonObject: string): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO workoutObjects (jsonObject, date) values (?, date())',
      [jsonObject]
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
  weight: number,
  reps: number
): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO ' +
        tableName +
        ' (date, weight, reps) values (date(), ?, ?)',
      [weight, reps]
    )
  })
}

export const dropWorkoutTable = (): void => {
  db.transaction((tx) => {
    tx.executeSql('DROP TABLE workoutObjects')
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
