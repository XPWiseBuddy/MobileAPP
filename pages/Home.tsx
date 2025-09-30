import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../theme'; // Supondo que você tenha um objeto colors no theme.ts

export default function HomeScreen({ navigation }: any) {
  const [userName, setUserName] = useState<string>('');

  // Carregar nome do usuário do AsyncStorage
  const loadUserName = useCallback(async () => {
    try {
      const storedUserName = await AsyncStorage.getItem('userName');
      if (storedUserName) {
        setUserName(storedUserName);
      } else {
        setUserName('Usuário'); // Fallback caso não tenha nome
      }
    } catch (error) {
      console.error('Erro ao carregar nome do usuário:', error);
      setUserName('Usuário'); // Fallback em caso de erro
    }
  }, []);

  // Carrega o nome sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      loadUserName();
    }, [loadUserName])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à WiseBuddy!</Text>
      <Text style={styles.text}>{userName}</Text>
      <Text style={styles.subtitle}>Perfil do investidor: Moderado</Text>
      <Text style={[styles.subtitle, { color: colors.textLight, marginBottom: 30 }]}>
        Utilize as opções abaixo para navegar pelo app.
      </Text>

      {/* Painel de opções */}
      <View style={styles.panel}>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Chat')}
        >
          <View style={styles.iconWrapper}>
            <Icon name="chat" size={40} color={colors.primary} />
          </View>
          <Text style={styles.cardText}>Conversar com o Assistente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Suitability')}
        >
          <View style={styles.iconWrapper}>
            <Icon name="assignment" size={40} color={colors.primary} />
          </View>
          <Text style={styles.cardText}>Refazer Suitability</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('History')}
        >
          <View style={styles.iconWrapper}>
            <Icon name="insights" size={40} color={colors.primary} />
          </View>
          <Text style={styles.cardText}>Ver Última Recomendação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 48,
    marginBottom: 10,
    color: colors.text,
    letterSpacing: 1,
    textShadowColor: '#00000033',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.secondary,
    textAlign: 'center',
  },
  panel: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '45%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
    borderRadius: 24,
    backgroundColor: colors.secondary,
    // Neumorphism effect
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    // Light shadow
    borderWidth: 1,
    borderColor: '#2E323A',
  },
  iconWrapper: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    // Neumorphism inner shadow
    shadowColor: '#ffffff30',
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 2,
  },
  cardText: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 4,
  },
});
