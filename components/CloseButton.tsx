import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props {
  onPress: () => void
}

const CloseButton = ({ onPress }: Props): JSX.Element => (
  <TouchableOpacity onPress={onPress} style={styles.closeButton}>
    <Text style={styles.closeButtonText}>Close</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  closeButton: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    textAlign: 'right',
    color: 'blue',
    fontSize: 16,
  },
})

export default CloseButton
