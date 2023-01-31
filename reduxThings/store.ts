import { configureStore } from "@reduxjs/toolkit";
import exerciseTypesReducer from "./exerciseTypes";
import activeExercisesReducer from "./activeExercises";

export const store = configureStore({
  reducer: {
    exerciseTypesList: exerciseTypesReducer,
    activeExercises: activeExercisesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
