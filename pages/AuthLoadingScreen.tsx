import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../theme'; // Importa o tema global

// Define the RootStackParamList type
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Main: undefined;
};

const AuthLoadingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem('sessionToken');
      if (token) {
        // Verifica se o token ainda é válido
        const response = await fetch('https://api.example.com/wise-buddy/v1/sessions/user/123', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          navigation.replace('Main'); // Sessão válida
        } else {
          navigation.replace('Login'); // Sessão inválida
        }
      } else {
        navigation.replace('Login'); // Sem token
      }
    };

    checkSession();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});