import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HistoryScreen from './screens/HistoryScreen'
import StatsScreen from './screens/StatsScreen'
import StartWorkoutScreen from './screens/StartWorkoutScreen'
import ExercisesScreen from './screens/ExercisesScreen'
import {
  createExerciseTypesTable,
  createWorkoutObjectTable,
} from './db-service'
import SettingsScreen from './screens/Settings'

createWorkoutObjectTable()
createExerciseTypesTable()
const BottomTabs = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const BottomTab = (): JSX.Element => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Stats" component={StatsScreen} />
      <BottomTabs.Screen name="History" component={HistoryScreen} />
      <BottomTabs.Screen name="StartWorkout" component={StartWorkoutScreen} />
      <BottomTabs.Screen name="Exercises" component={ExercisesScreen} />
      <BottomTabs.Screen name="Settings" component={SettingsScreen} />
    </BottomTabs.Navigator>
  )
}

export default function App(): JSX.Element {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTabs" component={BottomTab} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  )
}
