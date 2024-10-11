import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import colors from '../constants/colors';

export default function ResultDisplay({ result }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>{result}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
});