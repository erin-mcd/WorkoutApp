import React from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { Exercise } from "../models/Exercise";
import { ExerciseSet } from "../models/ExerciseSet";
import { reset } from "../reduxThings/activeExercises";

interface Props {
  itemData: any;
  exerciseId: number;
}

interface formProps {
  exercises: Exercise[];
  removeExerciseFunction: ({ id }: { id: number }) => void;
  editSetRepsFunction: ({
    exerciseId,
    setId,
    reps,
  }: {
    exerciseId: number;
    setId: number;
    reps: number;
  }) => void;
  removeSetFunction: ({
    exerciseId,
    setId,
  }: {
    exerciseId: number;
    setId: number;
  }) => void;
  editSetWeightFunction: ({
    exerciseId,
    setId,
    weight,
  }: {
    exerciseId: number;
    setId: number;
    weight: number;
  }) => void;
  addSetFunction: (id: number) => void;
}

function ExerciseDrawerForm({
  exercises,
  removeExerciseFunction,
  editSetRepsFunction,
  removeSetFunction,
  editSetWeightFunction,
  addSetFunction,
}: formProps) {
  const dispatch = useDispatch();

  function renderSet({ itemData, exerciseId }: Props) {
    const set: ExerciseSet = itemData.item;

    return (
      <View style={styles.inputContainer}>
        <View style={[styles.detailsContainer, { flex: 1 }]}>
          <Text style={styles.detailsText}>{set.id}</Text>
        </View>
        <View style={[styles.detailsContainer, { flex: 2 }]}>
          {set.weight !== null && set.reps !== null ? (
            <Text style={styles.detailsText}>
              {set.weight + "x" + set.reps}
            </Text>
          ) : (
            <Text style={styles.detailsText}>-------</Text>
          )}
        </View>
        <TextInput
          keyboardType="number-pad"
          onChangeText={(text) =>
            editSetWeightFunction({
              exerciseId,
              setId: itemData.item.id,
              weight: Number(text) ?? 0,
            })
          }
          style={[styles.detailsContainer, { flex: 1 }]}
        >
          {set.weight}
        </TextInput>
        <TextInput
          keyboardType="number-pad"
          style={[styles.detailsContainer, { flex: 1 }]}
          onChangeText={(text) =>
            editSetRepsFunction({
              exerciseId,
              setId: itemData.item.id,
              reps: Number(text) ?? 0,
            })
          }
        >
          {set.reps}
        </TextInput>
        <Button
          onPress={() =>
            removeSetFunction({ exerciseId, setId: itemData.item.id })
          }
          title="Delete Set"
        />
      </View>
    );
  }

  function renderExercises(itemData: any) {
    const exerciseId = itemData.item.id;
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.exerciseName}>{itemData.item.name}</Text>
          <Button
            onPress={() => removeExerciseFunction({ id: exerciseId })}
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
        <Pressable
          style={styles.addSetButton}
          onPress={() => addSetFunction(itemData.item.id)}
        >
          <Text style={styles.addSetButtonText}>Add Set</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ height: 400 }}>
      <View>
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.name}
          renderItem={renderExercises}
        />
        <Button title="reset" onPress={() => dispatch(reset())} />
      </View>
    </View>
  );
}

export default ExerciseDrawerForm;

const styles = StyleSheet.create({
  exerciseName: {
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
    height: 30,
    borderRadius: 8,
    width: 350,
  },
  detailsContainer: {
    backgroundColor: "#e0e0e0",
    margin: 4,
    borderRadius: 8,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  detailsText: {
    textAlign: "center",
  },
  addSetButton: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    height: 30,
    marginTop: 10,
    justifyContent: "center",
  },
  addSetButtonText: {
    textAlign: "center",
  },
});
