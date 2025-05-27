import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '../theme';

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      <Text style={styles.subtitle}>Veja o histórico de suas interações e recomendações.</Text>
      {/* Adicione aqui a lógica para exibir o histórico */}
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.large,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSizes.large,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.medium,
  },
  subtitle: {
    fontSize: fontSizes.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.large,
  },
});