import { createSlice } from "@reduxjs/toolkit";
import { Exercise } from "../models/Exercise";
import {
  addSetToExerciseStatTable,
  addWorkout,
  editWorkoutHistory,
} from "../db-service";
import { createExerciseStatTable } from "../db-service";

const init: Exercise[] = [];
const initId: number = -1;

const editHistorySlices = createSlice({
  name: "editHistory",
  initialState: {
    historyExercises: init,
    id: initId,
  },
  reducers: {
    setHistoryValues: (state, action) => {
      state.historyExercises = action.payload.workoutObject;
      state.id = action.payload.id;
    },
    addSetHistory: (state, action) => {
      const index = state.historyExercises.findIndex((object) => {
        return object.id === action.payload;
      });

      const newSet = {
        weight: 0,
        reps: 0,
        id: Math.random(),
      };
      state.historyExercises[index].sets.push(newSet);
    },
    removeSetHistory: (state, action) => {
      const exerciseId = action.payload.exerciseId;
      const setId = action.payload.setId;
      const index = state.historyExercises.findIndex((object) => {
        return object.id === exerciseId;
      });

      state.historyExercises[index].sets.splice(
        state.historyExercises[index].sets.findIndex((object) => {
          return object.id === setId;
        }),
        1
      );
    },
    editSetWeightHistory: (state, action) => {
      const exerciseId = action.payload.exerciseId;
      const setId = action.payload.setId;
      const index = state.historyExercises.findIndex((object) => {
        return object.id === exerciseId;
      });
      const setIndex = state.historyExercises[index].sets.findIndex(
        (object) => {
          return object.id === setId;
        }
      );

      state.historyExercises[index].sets[setIndex].weight =
        action.payload.weight;
    },
    editSetRepsHistory: (state, action) => {
      const exerciseId = action.payload.exerciseId;
      const setId = action.payload.setId;
      const index = state.historyExercises.findIndex((object) => {
        return object.id === exerciseId;
      });

      const setIndex = state.historyExercises[index].sets.findIndex(
        (object) => {
          return object.id === setId;
        }
      );

      state.historyExercises[index].sets[setIndex].reps = action.payload.reps;
    },
    addExerciseHistory: (state, action) => {
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
      state.historyExercises.push(newExercise);
    },
    removeExerciseHistory: (state, action) => {
      state.historyExercises.splice(
        state.historyExercises.findIndex((object) => {
          return object.id === action.payload.id;
        }),
        1
      );
    },
    resetHistory: (state) => {
      state.historyExercises = [];
    },

    endHistoryEdit: (state) => {
      const newJsonObject = JSON.stringify(state.historyExercises);
      editWorkoutHistory(newJsonObject, state.id);
    },
  },
});

export const addSetHistory = editHistorySlices.actions.addSetHistory;
export const addExerciseHistory = editHistorySlices.actions.addExerciseHistory;
export const removeSetHistory = editHistorySlices.actions.removeSetHistory;
export const removeExerciseHistory =
  editHistorySlices.actions.removeExerciseHistory;
export const editSetWeightHistory =
  editHistorySlices.actions.editSetWeightHistory;
export const editSetRepsHistory = editHistorySlices.actions.editSetRepsHistory;
export const resetHistory = editHistorySlices.actions.resetHistory;
export const endHistoryEdit = editHistorySlices.actions.endHistoryEdit;
export const setHistoryValues = editHistorySlices.actions.setHistoryValues;
export default editHistorySlices.reducer;
