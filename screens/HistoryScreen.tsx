import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import FinishedWorkoutListings from '../components/FinishedWorkoutListings'
import { getWorkoutTableFromDB } from '../db-service'
const init: any[] = []

function HistoryScreen(): JSX.Element {
  const [workoutTable, setWorkoutTable] = useState(init)

  useEffect(() => {
    async function getStats(): Promise<void> {
      const workoutHistory = await getWorkoutTableFromDB()
      setWorkoutTable(workoutHistory)
    }

    void getStats()
  }, [workoutTable, setWorkoutTable])

  return (
    <>
      {workoutTable !== undefined ? (
        <View style={styles.workoutListings}>
          <FinishedWorkoutListings workouts={workoutTable} />
        </View>
      ) : null}
    </>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  workoutListings: {
    alignItems: 'center',
  },
})
