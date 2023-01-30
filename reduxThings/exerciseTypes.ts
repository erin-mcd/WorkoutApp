import { createSlice } from "@reduxjs/toolkit";
import { exerciseTypes } from "../data/exerciseTypesData";

const exerciseTypesSlices = createSlice({
  name: "exerciseTypes",
  initialState: {
    exerciseTypes,
  },
  reducers: {
    addExerciseType: (state, action) => {
      const exerciseType = {
        name: action.payload.name,
        id: action.payload.id,
      };
      state.exerciseTypes.push(exerciseType);
    },
    removeExerciseType: (state, action) => {
      state.exerciseTypes.splice(
        state.exerciseTypes.findIndex((object) => {
          return object.id === action.payload.id;
        }),
        1
      );
    },
    editExerciseType: (state, action) => {
      const exerciseTypeIndex = state.exerciseTypes.findIndex((object) => {
        return object.id === action.payload.id;
      });

      state.exerciseTypes[exerciseTypeIndex].name = action.payload.name;
    },
  },
});

export const addExerciseType = exerciseTypesSlices.actions.addExerciseType;
export const removeExerciseType =
  exerciseTypesSlices.actions.removeExerciseType;
export const editExerciseType = exerciseTypesSlices.actions.editExerciseType;
export default exerciseTypesSlices.reducer;
