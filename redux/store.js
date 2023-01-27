import { configureStore } from "@reduxjs/toolkit";
import activeWorkoutReducer from "./currentWorkout";
import exerciseTypesReducer from "./exerciseTypes";
import activeExercisesReducer from "./activeExercises";

export const store = configureStore({
  reducer: {
    activeWorkout: activeWorkoutReducer,
    exerciseTypesList: exerciseTypesReducer,
    activeExercises: activeExercisesReducer,
  },
});
