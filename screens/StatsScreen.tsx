import React from 'react'
import { View, StyleSheet } from 'react-native'
import ExerciseCountByWeekBarChart from '../components/charts/ExerciseCountByWeekBarChart'

const StatsScreen = (): JSX.Element => {
  return (
    <View style={styles.graphsContainer}>
      <ExerciseCountByWeekBarChart />
    </View>
  )
}

export default StatsScreen

const styles = StyleSheet.create({
  graphsContainer: {
    alignItems: 'center',
  },
})
