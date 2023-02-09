import React from 'react'
import { Button } from 'react-native'
import CurrentWorkoutDrawer from '../components/CurrentWorkoutDrawer'
import { startWorkout } from '../reduxThings/activeExercises'
import { useDispatch, useSelector } from 'react-redux'

import { type RootState } from '../reduxThings/store'

function StartWorkoutScreen(): JSX.Element {
  const dispatch = useDispatch()
  const currentWorkoutState = useSelector(
    (state: RootState) => state.activeExercises.activeWorkout
  )

  function startWorkoutHandler(): void {
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
