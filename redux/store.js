import { configureStore } from "@reduxjs/toolkit";
import activeWorkoutReducer from "./currentWorkout";
import exerciseTypesReducer from "./exerciseTypes";

export const store = configureStore({
  reducer: {
    activeWorkout: activeWorkoutReducer,
    exerciseTypesList: exerciseTypesReducer,
  },
});
