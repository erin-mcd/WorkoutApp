export const addName = (db, currentName) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO names (name) values (?)",
      [currentName],
      (txObj, resultSet) => {
        console.log(resultSet.rows._array);
      },
      (txObject, error) => console.log(error)
    );
  });
};

export const addWorkout = (db, jsonObject) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO workoutObjects (jsonObject) values (?)",
      [jsonObject],
      (txObj, resultSet) => {
        console.log(resultSet.rows._array);
      },
      (txObject, error) => console.log(error)
    );
  });
};

export const dropTable = (db) => {
  db.transaction((tx) => {
    tx.executeSql("DROP TABLE names");
  });
};

export const getTable = (db, tableName: string) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM " + tableName,
      null,
      (txObj, resultSet) => console.log(resultSet.rows._array),
      (txObject, error) => console.log(error)
    );
  });
};

export const createExerciseStatTable = (db, tableName: string) => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS " +
        tableName +
        " (id INTEGER PRIMARY KEY AUTOINCREMENT, weight REAL, reps INTEGER)"
    );
  });
};

export const createWorkoutObjectTable = (db) => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS workoutObjects (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, jsonObject TEXT)"
    );
  });
};
