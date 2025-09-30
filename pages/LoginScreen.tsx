import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, fontSizes } from '../theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const BASE_URL =
    Platform.OS === 'android' ? 'http://10.0.2.2:8085' : 'http://localhost:8085';


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/wise-buddy/v1/users/login`, {
        email,
        password,
      });


      if (response.status === 200) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        const userName = response.data.name || '';
        const userEmail = response.data.email || '';
        const userId = response.data.id?.toString() || response.data.userId?.toString();
        console.log({
          'User Name:': userName,
          'User Email:': userEmail,
          'User ID:': userId,
        });
        
        // Verificar se os valores não são null/undefined antes de salvar no AsyncStorage
        if (userName) {
          await AsyncStorage.setItem('userName', userName);
        }
        if (userEmail) {
          await AsyncStorage.setItem('userEmail', userEmail);
        }
        if (userId) {
          await AsyncStorage.setItem('userId', userId);
        }
        // Armazena sessão do usuário no banco pela API (apenas se userName for válido)
        if (userName) {
          await axios.post(`${BASE_URL}/wise-buddy/v1/sessions`, {
            userName: userName,
            sessionCompiled: "User logged in",
            sessionDate: new Date().toISOString(),
            recommendationId: null
          });
        }
        navigation.navigate('Main');
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos');
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      Alert.alert('Erro', 'Falha ao realizar login. Verifique os dados e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.textLight}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor={colors.textLight}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin} color={colors.primary} />
      
      <View style={{ marginTop: spacing.medium }}>
        <Button
          title="Registrar"
          onPress={() => navigation.navigate('Register')}
          color={colors.secondary}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.large,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSizes.large,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.large,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
    marginBottom: spacing.medium,
    height: 40,
    color: colors.textLight,
  },
});
