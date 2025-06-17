import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Platform } from 'react-native';
import { colors, spacing, fontSizes } from '../theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const navigation = useNavigation<any>();

  const BASE_URL =
    Platform.OS === 'android' ? 'http://10.0.2.2:8085' : 'http://localhost:8085';

  const handleRegister = async () => {
    if (!name || !surname || !email || !password || !incomeRange) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/wise-buddy/v1/users/register`, {
        name,
        surname,
        email,
        password,
        incomeRange,
      });

      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      navigation.navigate('Login');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao registrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor={colors.textLight}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Sobrenome"
        placeholderTextColor={colors.textLight}
        value={surname}
        onChangeText={setSurname}
        style={styles.input}
      />

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

      <TextInput
        placeholder="Faixa de Renda"
        placeholderTextColor={colors.textLight}
        value={incomeRange}
        onChangeText={setIncomeRange}
        style={styles.input}
      />

      <Button title="Registrar" onPress={handleRegister} color={colors.primary} />
      <View style={{ marginTop: spacing.medium }}>
        <Button
          title="Voltar para Login"
          onPress={() => navigation.navigate('Login')}
          color={colors.secondary}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.large,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSizes.large,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: spacing.large,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.textLight,
    marginBottom: spacing.medium,
    height: 40,
    color: colors.textLight,
  },
});
