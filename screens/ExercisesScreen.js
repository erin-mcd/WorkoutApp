import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { Pressable } from "react-native";
import CreateExerciseTypeModal from "../components/CreateExerciseTypeModal";
import { useState } from "react";
import ExerciseList from "../components/ExerciseList";

function Exercises({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Ionicons name={"add"} size={24} color={"black"} />
            </Pressable>
          </View>
        );
      },
    });
  }, [navigation]);

  return (
    <>
      <ExerciseList onTap={() => console.log("hi")} />
      <CreateExerciseTypeModal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

export default Exercises;
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  exerciseList: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseListItem: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 10,
    margin: 4,
    width: 300,
  },
  exerciseListItemText: {
    color: "white",
  },
});
