import React, { useEffect, useState } from 'react'
import { BarChart } from 'react-native-chart-kit'
import { getStatTableFromDB } from '../../db-service'

const getSunday = (workoutDate: string): string => {
  const date = new Date(workoutDate)
  const dayOfWeek = date.getDay() + 1
  if (dayOfWeek === 7) {
    return (
      JSON.stringify(date.getUTCMonth()) +
      '/' +
      JSON.stringify(date.getUTCDate())
    )
  }
  const sunday = new Date(date.getTime())
  sunday.setDate(date.getDate() - dayOfWeek)

  const sundayString =
    JSON.stringify(sunday.getUTCMonth() + 1) +
    '/' +
    JSON.stringify(sunday.getUTCDate())

  return sundayString
}
const init: any[] = []

const ExerciseCountByWeekBarChart = (): JSX.Element => {
  const [statTable, setStatTable] = useState(init)

  useEffect(() => {
    async function getStats(): Promise<void> {
      const stats = await getStatTableFromDB()
      setStatTable(stats)
    }

    void getStats()
  }, [statTable, setStatTable])

  const formatTableData = (): {
    labels: string[]
    datasets: any[]
  } => {
    const labels: string[] = []
    const countData: number[] = []
    const sets: any[] = []
    if (statTable !== undefined) {
      statTable.forEach(({ count, date }: { count: number; date: string }) => {
        labels.push(getSunday(date))
        countData.push(count)
      })
    }

    sets.push({ data: countData })

    const graphData = {
      labels,
      datasets: sets,
    }

    return graphData
  }

  return (
    <BarChart
      width={300}
      height={220}
      yAxisLabel=""
      chartConfig={{
        backgroundColor: '#816be3',
        backgroundGradientFrom: '#816be3',
        backgroundGradientTo: '#816be3',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      verticalLabelRotation={0}
      data={formatTableData()}
      yAxisSuffix={''}
    />
  )
}

export default ExerciseCountByWeekBarChart
