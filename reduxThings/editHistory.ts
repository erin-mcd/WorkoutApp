import { createSlice } from '@reduxjs/toolkit'
import { type Exercise } from '../models/Exercise'
import { editWorkoutHistory } from '../db-service'

const init: Exercise[] = []
const initId: number = -1

const editHistorySlices = createSlice({
  name: 'editHistory',
  initialState: {
    historyExercises: init,
    id: initId,
    isEditing: false,
    pickExerciseModalVisible: false,
  },
  reducers: {
    setHistoryValues: (state, action) => {
      state.historyExercises = action.payload.workoutObject
      state.id = action.payload.id
    },
    addSetHistory: (state, action) => {
      const index = state.historyExercises.findIndex((object) => {
        return object.id === action.payload
      })

      const newSet = {
        weight: null,
        reps: null,
        id: state.historyExercises[index].sets.length + 1,
      }
      state.historyExercises[index].sets.push(newSet)
    },
    removeSetHistory: (state, action) => {
      const exerciseId = action.payload.exerciseId
      const setId = action.payload.setId
      const index = state.historyExercises.findIndex((object) => {
        return object.id === exerciseId
      })

      state.historyExercises[index].sets.splice(
        state.historyExercises[index].sets.findIndex((object) => {
          return object.id === setId
        }),
        1
      )
    },
    editSetWeightHistory: (state, action) => {
      const exerciseId = action.payload.exerciseId
      const setId = action.payload.setId
      const index = state.historyExercises.findIndex((object) => {
        return object.id === exerciseId
      })
      const setIndex = state.historyExercises[index].sets.findIndex(
        (object) => {
          return object.id === setId
        }
      )

      state.historyExercises[index].sets[setIndex].weight =
        action.payload.weight
    },
    editSetRepsHistory: (state, action) => {
      const exerciseId = action.payload.exerciseId
      const setId = action.payload.setId
      const index = state.historyExercises.findIndex((object) => {
        return object.id === exerciseId
      })

      const setIndex = state.historyExercises[index].sets.findIndex(
        (object) => {
          return object.id === setId
        }
      )

      state.historyExercises[index].sets[setIndex].reps = action.payload.reps
    },
    addExerciseHistory: (state, action) => {
      const newExercise = {
        id: Math.random(),
        name: action.payload.name,
        sets: [
          {
            weight: null,
            reps: null,
            id: 1,
          },
        ],
      }
      state.historyExercises.push(newExercise)
      state.pickExerciseModalVisible = false
    },
    removeExerciseHistory: (state, action) => {
      state.historyExercises.splice(
        state.historyExercises.findIndex((object) => {
          return object.id === action.payload.id
        }),
        1
      )
    },
    resetHistory: (state) => {
      state.historyExercises = []
    },

    endHistoryEdit: (state) => {
      const newJsonObject = JSON.stringify(state.historyExercises)
      editWorkoutHistory(newJsonObject, state.id)
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload
    },
    setPickExerciseHistoryModalVisible: (state, action) => {
      state.pickExerciseModalVisible = action.payload
    },
  },
})

export const addSetHistory = editHistorySlices.actions.addSetHistory
export const addExerciseHistory = editHistorySlices.actions.addExerciseHistory
export const removeSetHistory = editHistorySlices.actions.removeSetHistory
export const removeExerciseHistory =
  editHistorySlices.actions.removeExerciseHistory
export const editSetWeightHistory =
  editHistorySlices.actions.editSetWeightHistory
export const editSetRepsHistory = editHistorySlices.actions.editSetRepsHistory
export const resetHistory = editHistorySlices.actions.resetHistory
export const endHistoryEdit = editHistorySlices.actions.endHistoryEdit
export const setHistoryValues = editHistorySlices.actions.setHistoryValues
export const setIsEditing = editHistorySlices.actions.setIsEditing
export const setPickExerciseHistoryModalVisible =
  editHistorySlices.actions.setPickExerciseHistoryModalVisible
export default editHistorySlices.reducer
