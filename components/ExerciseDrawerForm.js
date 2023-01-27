import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editSetWeight } from "../redux/activeExercises";
import {
  removeActiveExercise,
  addSet,
  removeSet,
} from "../redux/activeExercises";
import { reset } from "../redux/activeExercises";

function ExerciseDrawerForm() {
  const activeExercises = useSelector(
    (state) => state.activeExercises.activeExercises
  );
  const dispatch = useDispatch();

  function renderSet({ itemData, exerciseId }) {
    const set = itemData.item;

    return (
      <View style={styles.inputContainer}>
        <View style={[styles.detailsContainer, { flex: 1 }]}>
          <Text>1</Text>
        </View>
        <View style={[styles.detailsContainer, { flex: 2 }]}>
          <Text>{set.weight + "x" + set.reps}</Text>
        </View>
        <TextInput
          keyboardType="number-pad"
          onChangeText={(text) =>
            dispatch(
              editSetWeight({
                exerciseId,
                setId: itemData.item.id,
                weight: text ?? 0,
              })
            )
          }
          style={[styles.detailsContainer, { flex: 1 }]}
        >
          {set.weight}
        </TextInput>
        <TextInput
          keyboardType="number-pad"
          style={[styles.detailsContainer, { flex: 1 }]}
        >
          {set.reps}
        </TextInput>
        <Button
          onPress={() =>
            dispatch(removeSet({ exerciseId, setId: itemData.item.id }))
          }
          title="Delete Set"
        />
      </View>
    );
  }

  function renderExercises(itemData) {
    const exerciseId = itemData.item.id;
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.exerciseTitle}>{itemData.item.name}</Text>
          <Button
            onPress={() => dispatch(removeActiveExercise({ id }))}
            title="Delete Exercise"
          />
        </View>
        <View style={styles.columnHeadersContainer}>
          <Text style={[styles.headerText, { flex: 1 }]}>Set</Text>
          <Text style={[styles.headerText, { flex: 2 }]}>Previous</Text>
          <Text style={[styles.headerText, { flex: 1 }]}>lbs</Text>
          <Text style={[styles.headerText, { flex: 1 }]}>Rep</Text>
          <Button title="Delete Set" />
        </View>
        <FlatList
          data={itemData.item.sets}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) =>
            renderSet({ itemData, exerciseId: exerciseId })
          }
        />
        <Button
          title="Add Set"
          onPress={() => dispatch(addSet(itemData.item.id))}
        />
      </View>
    );
  }

  return (
    <View style={{ height: 400 }}>
      <View>
        <FlatList
          data={activeExercises}
          keyExtractor={(item) => item.id}
          renderItem={renderExercises}
        />
        <Button title="reset" onPress={() => dispatch(reset())} />
      </View>
    </View>
  );
}

export default ExerciseDrawerForm;

const styles = StyleSheet.create({
  exerciseTitle: {
    fontWeight: "bold",
  },
  columnHeadersContainer: {
    flexDirection: "row",

    width: 350,
  },
  headerText: {
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    height: 70,
    borderRadius: 8,
    width: 350,
  },
  detailsContainer: {
    backgroundColor: "#e0e0e0",
    margin: 4,
    borderRadius: 8,
  },
});
