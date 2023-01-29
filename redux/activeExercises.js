import { createSlice } from "@reduxjs/toolkit";

const activeExercisesSlices = createSlice({
  name: "activeExercises",
  initialState: {
    activeExercises: [],
  },
  reducers: {
    addSet: (state, action) => {
      const index = state.activeExercises.findIndex((object) => {
        return object.id === action.payload;
      });

      const newSet = {
        weight: 0,
        reps: 0,
        id: Math.random(0, 1000),
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

      state.activeExercises[index].sets[setId].weight = action.payload.weight;
    },
    addActiveExercise: (state, action) => {
      const newExercise = {
        id: Math.random(0, 1000),
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
    reset: (state, action) => {
      state.activeExercises = [];
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
export const reset = activeExercisesSlices.actions.reset;
export default activeExercisesSlices.reducer;
