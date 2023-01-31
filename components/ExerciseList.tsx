import React from "react";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addActiveExercise } from "../reduxThings/activeExercises";
interface Props {
  onTap: () => void;
  isActiveWorkout: boolean;
}

function ExerciseList({ onTap, isActiveWorkout = false }: Props) {
  const dispatch = useDispatch();

  function tapHandler(name: string) {
    if (isActiveWorkout) {
      dispatch(addActiveExercise({ name: name }));
    }
    onTap();
  }

  const exerciseTypesList = useSelector(
    (state: any) => state.exerciseTypesList.exerciseTypes
  );

  function renderExerciseType(itemData: any) {
    const exerciseItemProps = {
      name: itemData.item.name,
      id: itemData.item.id,
    };

    return (
      <Pressable
        onPress={() => tapHandler(exerciseItemProps.name)}
        style={styles.exerciseListItem}
      >
        <Text>{exerciseItemProps.name}</Text>
      </Pressable>
    );
  }

  return (
    <View>
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
