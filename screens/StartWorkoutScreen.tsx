import React from 'react'
import { Button } from 'react-native'
import CurrentWorkoutDrawer from '../components/CurrentWorkoutDrawer'
import { startWorkout } from '../redux/activeExercises'
import { useDispatch, useSelector } from 'react-redux'

import { type RootState } from '../redux/store'

const StartWorkoutScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const currentWorkoutState = useSelector(
    (state: RootState) => state.activeExercises.activeWorkout
  )

  const startWorkoutHandler = (): void => {
    dispatch(startWorkout())
  }

  return (
    <>
      <Button
        title="Start Workout"
        onPress={() => {
          startWorkoutHandler()
        }}
      />
      {currentWorkoutState ? <CurrentWorkoutDrawer /> : null}
    </>
  )
}

export default StartWorkoutScreen
