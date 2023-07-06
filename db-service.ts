import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.workoutDB')

export const addExerciseTypeToDB = (
  name: string,
  category: string,
  description: string
): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO exerciseTypes (name, category, description) values (?, ?, ?)',
      [name, category, description]
    )
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

export const createExerciseTypesTable = (): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS exerciseTypes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, category TEXT, description TEXT)'
    )
  })
}

export const getStatTableFromDB = async (): Promise<any[]> => {
  return await new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT strftime('%W', date) AS WeekNumber, COUNT(id) as count, date FROM workoutObjects GROUP BY WeekNumber",
        [],
        (txObj, resultSet) => {
          resolve(resultSet.rows._array)
        }
      )
    })
  })
}

export const getWorkoutTableFromDB = async (): Promise<any[]> => {
  return await new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM workoutObjects', [], (txObj, resultSet) => {
        resolve(resultSet.rows._array)
      })
    })
  })
}

export const getExerciseTypesFromDB = async (): Promise<any[]> => {
  return await new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM exerciseTypes', [], (txObj, resultSet) => {
        resolve(resultSet.rows._array)
      })
    })
  })
}

export const deleteExerciseType = (name: string): void => {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM exerciseTypes WHERE name= ?', [name])
  })
}
