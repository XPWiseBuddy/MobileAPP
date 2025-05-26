import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuitabilityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Refaça seu perfil de investidor aqui!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
  text: {
    color: '#F2F2F2',
    fontSize: 18,
  },
});