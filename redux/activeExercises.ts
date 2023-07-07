import { createSlice } from '@reduxjs/toolkit'
import { type Exercise } from '../models/Exercise'
import {
  addSetToExerciseStatTable,
  addWorkout,
  createExerciseStatTable,
} from '../db-service'

const init: Exercise[] = []
const toAddInit: string[] = []

const updateStatsByExercise = (finishedExercises: Exercise[]): void => {
  finishedExercises.forEach((exercise) => {
    createExerciseStatTable(exercise.name)
    exercise.sets.forEach((set) => {
      if (set.weight !== null && set.reps !== null) {
        addSetToExerciseStatTable(exercise.name, set.weight, set.reps)
      }
    })
  })
}

const activeExercisesSlices = createSlice({
  name: 'activeExercises',
  initialState: {
    activeWorkout: false,
    activeExercises: init,
    pickExerciseModalVisible: false,
    exercisesToAdd: toAddInit,
  },
  reducers: {
    addSet: (state, action) => {
      const index = state.activeExercises.findIndex((object) => {
        return object.id === action.payload
      })

      const newSet = {
        weight: null,
        reps: null,
        id: state.activeExercises[index].sets.length + 1,
      }
      state.activeExercises[index].sets.push(newSet)
    },
    removeSet: (state, action) => {
      const exerciseId = action.payload.exerciseId
      const setId = action.payload.setId
      const index = state.activeExercises.findIndex((object) => {
        return object.id === exerciseId
      })

      state.activeExercises[index].sets.splice(
        state.activeExercises[index].sets.findIndex((object) => {
          return object.id === setId
        }),
        1
      )
    },
    editSetWeight: (state, action) => {
      const exerciseId = action.payload.exerciseId
      const setId = action.payload.setId
      const index = state.activeExercises.findIndex((object) => {
        return object.id === exerciseId
      })
      const setIndex = state.activeExercises[index].sets.findIndex((object) => {
        return object.id === setId
      })

      state.activeExercises[index].sets[setIndex].weight = action.payload.weight
    },
    editSetReps: (state, action) => {
      const exerciseId = action.payload.exerciseId
      const setId = action.payload.setId
      const index = state.activeExercises.findIndex((object) => {
        return object.id === exerciseId
      })

      const setIndex = state.activeExercises[index].sets.findIndex((object) => {
        return object.id === setId
      })

      state.activeExercises[index].sets[setIndex].reps = action.payload.reps
    },
    addActiveExercises: (state) => {
      state.exercisesToAdd.forEach((name) => {
        const newExercise = {
          id: Math.random(),
          name,
          sets: [
            {
              weight: null,
              reps: null,
              id: 1,
            },
          ],
        }
        state.activeExercises.push(newExercise)
      })

      state.exercisesToAdd = []
      state.pickExerciseModalVisible = false
    },
    removeActiveExercise: (state, action) => {
      state.activeExercises.splice(
        state.activeExercises.findIndex((object) => {
          return object.id === action.payload.id
        }),
        1
      )
    },
    reset: (state) => {
      state.activeExercises = []
    },
    startWorkout: (state) => {
      state.activeWorkout = true
    },
    endWorkout: (state) => {
      const jsonObject = JSON.stringify(state.activeExercises)
      addWorkout(jsonObject)
      updateStatsByExercise(state.activeExercises)
      state.activeWorkout = false
      state.activeExercises = []
    },
    cancelWorkout: (state) => {
      state.activeExercises = []
      state.activeWorkout = false
    },
    setPickExerciseModalVisible: (state, action) => {
      state.pickExerciseModalVisible = action.payload
    },
    addToAddList: (state, action) => {
      const newExercises = [...state.exercisesToAdd, action.payload]
      state.exercisesToAdd = newExercises
    },
    removeFromAddList: (state, action) => {
      const newExercises = state.exercisesToAdd.filter(
        (exercise) => exercise !== action.payload
      )
      state.exercisesToAdd = newExercises
    },
  },
})

export const addSet = activeExercisesSlices.actions.addSet
export const addActiveExercises =
  activeExercisesSlices.actions.addActiveExercises
export const removeSet = activeExercisesSlices.actions.removeSet
export const removeActiveExercise =
  activeExercisesSlices.actions.removeActiveExercise
export const editSetWeight = activeExercisesSlices.actions.editSetWeight
export const editSetReps = activeExercisesSlices.actions.editSetReps
export const reset = activeExercisesSlices.actions.reset
export const startWorkout = activeExercisesSlices.actions.startWorkout
export const endWorkout = activeExercisesSlices.actions.endWorkout
export const cancelWorkout = activeExercisesSlices.actions.cancelWorkout
export const setPickExerciseModalVisible =
  activeExercisesSlices.actions.setPickExerciseModalVisible
export const addToAddList = activeExercisesSlices.actions.addToAddList
export const removeFromAddList = activeExercisesSlices.actions.removeFromAddList
export default activeExercisesSlices.reducer
