import { createSlice } from "@reduxjs/toolkit";

const activeWorkoutSlices = createSlice({
  name: "workout",
  initialState: {
    activeWorkout: false,
  },
  reducers: {
    startWorkout: (state, action) => {
      state.activeWorkout = true;
    },
    endWorkout: (state, action) => {
      state.activeWorkout = false;
    },
  },
});

export const startWorkout = activeWorkoutSlices.actions.startWorkout;
export const endWorkout = activeWorkoutSlices.actions.endWorkout;
export default activeWorkoutSlices.reducer;
