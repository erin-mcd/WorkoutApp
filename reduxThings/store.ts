import { configureStore } from '@reduxjs/toolkit'
import activeExercisesReducer from './activeExercises'
import editHistoryReducer from './editHistory'

export const store = configureStore({
  reducer: {
    activeExercises: activeExercisesReducer,
    editHistory: editHistoryReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
