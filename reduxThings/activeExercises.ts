import { createSlice } from "@reduxjs/toolkit";
import { Exercise } from "../models/Exercise";
import * as SQLite from "expo-sqlite";
import { addWorkout } from "../db-service";

const init: Exercise[] = [];

const db = SQLite.openDatabase("db.testDb");

const activeExercisesSlices = createSlice({
  name: "activeExercises",
  initialState: {
    activeWorkout: false,
    activeExercises: init,
  },
  reducers: {
    addSet: (state, action) => {
      const index = state.activeExercises.findIndex((object) => {
        return object.id === action.payload;
      });

      const newSet = {
        weight: 0,
        reps: 0,
        id: Math.random(),
      };
      state.activeExercises[index].sets.push(newSet);
    },
    removeSet: (state, action) => {
      const exerciseId = action.payload.exerciseId;
      const setId = action.payload.setId;
      const index = state.activeExercises.findIndex((object) => {
        return object.id === exerciseId;
      });

      state.activeExercises[index].sets.splice(
        state.activeExercises[index].sets.findIndex((object) => {
          return object.id === setId;
        }),
        1
      );
    },
    editSetWeight: (state, action) => {
      const exerciseId = action.payload.exerciseId;
      const setId = action.payload.setId;
      const index = state.activeExercises.findIndex((object) => {
        return object.id === exerciseId;
      });
      const setIndex = state.activeExercises[index].sets.findIndex((object) => {
        return object.id === setId;
      });

      state.activeExercises[index].sets[setIndex].weight =
        action.payload.weight;
    },
    editSetReps: (state, action) => {
      const exerciseId = action.payload.exerciseId;
      const setId = action.payload.setId;
      const index = state.activeExercises.findIndex((object) => {
        return object.id === exerciseId;
      });

      const setIndex = state.activeExercises[index].sets.findIndex((object) => {
        return object.id === setId;
      });

      state.activeExercises[index].sets[setIndex].reps = action.payload.reps;
    },
    addActiveExercise: (state, action) => {
      const newExercise = {
        id: Math.random(),
        name: action.payload.name,
        sets: [
          {
            weight: 0,
            reps: 0,
            id: 0,
          },
        ],
      };
      state.activeExercises.push(newExercise);
    },
    removeActiveExercise: (state, action) => {
      state.activeExercises.splice(
        state.activeExercises.findIndex((object) => {
          return object.id === action.payload.id;
        }),
        1
      );
    },
    reset: (state) => {
      state.activeExercises = [];
    },
    startWorkout: (state) => {
      state.activeWorkout = true;
    },
    endWorkout: (state) => {
      const jsonObject = JSON.stringify(state.activeExercises);
      addWorkout(db, jsonObject);

      state.activeWorkout = false;
    },
  },
});

export const addSet = activeExercisesSlices.actions.addSet;
export const addActiveExercise =
  activeExercisesSlices.actions.addActiveExercise;
export const removeSet = activeExercisesSlices.actions.removeSet;
export const removeActiveExercise =
  activeExercisesSlices.actions.removeActiveExercise;
export const editSetWeight = activeExercisesSlices.actions.editSetWeight;
export const editSetReps = activeExercisesSlices.actions.editSetReps;
export const reset = activeExercisesSlices.actions.reset;
export const startWorkout = activeExercisesSlices.actions.startWorkout;
export const endWorkout = activeExercisesSlices.actions.endWorkout;
export default activeExercisesSlices.reducer;
