import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./reduxThings/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HistoryScreen from "./screens/HistoryScreen";
import StatsScreen from "./screens/StatsScreen";
import StartWorkoutScreen from "./screens/StartWorkoutScreen";
import ExercisesScreen from "./screens/ExercisesScreen";
import { createWorkoutObjectTable } from "./db-service";
createWorkoutObjectTable();
const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTab() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Stats" component={StatsScreen} />
      <BottomTabs.Screen name="History" component={HistoryScreen} />
      <BottomTabs.Screen name="StartWorkout" component={StartWorkoutScreen} />
      <BottomTabs.Screen name="Exercises" component={ExercisesScreen} />
    </BottomTabs.Navigator>
  );
}

export default function App() {
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
