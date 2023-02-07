import React from "react";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
interface Props {
  onTap: () => void;
  isActiveWorkout: boolean;
  isHistoryEdit: boolean;
  addActiveExerciseFunction?: ({ name }: { name: string }) => void;
}

function ExerciseList({
  onTap,
  isActiveWorkout = false,
  isHistoryEdit = false,
  addActiveExerciseFunction,
}: Props) {
  function tapHandler(name: string) {
    if (
      (isActiveWorkout || isHistoryEdit) &&
      addActiveExerciseFunction !== undefined
    ) {
      addActiveExerciseFunction({ name: name });
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
