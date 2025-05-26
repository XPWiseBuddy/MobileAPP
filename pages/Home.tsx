import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à tela Início!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D', // Fundo escuro
  },
  text: {
    color: '#F2F2F2',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F2F2F2', // Branco
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#353B3B', // Cinza escuro
  },
  panel: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '45%',
    aspectRatio: 1, // Faz o card ser quadrado
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: '#353B3B', // Fundo do card
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#F2F2F2', // Branco
    textAlign: 'center',
    fontWeight: '600',
  },
});
