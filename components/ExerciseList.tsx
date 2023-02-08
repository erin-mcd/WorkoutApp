import React from "react";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
interface Props {
  onTap: () => void;
  isActiveWorkout: boolean;
  isHistoryEdit: boolean;
  addExerciseFunction?: ({ name }: { name: string }) => void;
}

function ExerciseList({
  onTap,
  isActiveWorkout = false,
  isHistoryEdit = false,
  addExerciseFunction,
}: Props) {
  function tapHandler(name: string) {
    if (
      (isActiveWorkout || isHistoryEdit) &&
      addExerciseFunction !== undefined
    ) {
      addExerciseFunction({ name: name });
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
    padding: 10,
    margin: 4,
  },
});
