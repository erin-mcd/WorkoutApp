import React from 'react'
import {
  Text,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
  TouchableOpacity,
} from 'react-native'
interface Props {
  title: string
  customTextStyle?: TextStyle
  customButtonStyle?: ViewStyle
  onPress: () => void
}

const GeneralButton = ({
  title,
  customTextStyle,
  customButtonStyle,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, customButtonStyle]}
    >
      <Text style={[styles.textStyle, customTextStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default GeneralButton

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 10,
    width: 350,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  textStyle: {
    textAlign: 'center',
  },
  addExerciseButton: {
    backgroundColor: 'gray',
  },
  cancelWorkoutButton: {
    backgroundColor: '#ff7885',
    marginTop: 10,
  },
})
