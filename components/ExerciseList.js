import React from "react";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addActiveExercise } from "../redux/activeExercises";

function ExerciseList({ onTap, isActiveWorkout = false }) {
  const dispatch = useDispatch();

  function tapHandler(title) {
    if (isActiveWorkout) {
      dispatch(addActiveExercise({ name: title }));
    }
    onTap();
  }

  const exerciseTypesList = useSelector(
    (state) => state.exerciseTypesList.exerciseTypes
  );

  function renderExerciseType(itemData) {
    const exerciseItemProps = {
      title: itemData.item.title,
      id: itemData.item.id,
    };

    return (
      <Pressable
        onPress={() => tapHandler(exerciseItemProps.title)}
        style={styles.exerciseListItem}
      >
        <Text style={styles.exerciseListItemText}>
          {exerciseItemProps.title}
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.exerciseList}>
      <FlatList
        data={exerciseTypesList}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseType}
      />
    </View>
  );
}

export default ExerciseList;

const styles = StyleSheet.create({
  exerciseListItem: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 4,
    width: 300,
  },
});
