import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
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


const BASE_URL =
    Platform.OS === 'android' ? 'http://10.0.2.2:8085' : 'http://localhost:8085';

const AuthLoadingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkSession = async () => {
        const userId = await AsyncStorage.getItem('userId');
        const response = await fetch(`${BASE_URL}/wise-buddy/v1/sessions/user/${userId}`);
        if (response.ok) {
          navigation.replace('Main');
        } else {
          navigation.replace('Login');
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