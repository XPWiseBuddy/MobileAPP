import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function SuitabilityScreen() {
  const [step, setStep] = useState(1); // Controla o passo atual do fluxo
  const [answers, setAnswers] = useState([]); // Armazena as respostas do usuário

  const handleAnswerQuestions = () => {
    // Lógica para responder perguntas
    Alert.alert('Responder perguntas', 'Iniciando o questionário...');
    setStep(2);
  };

  const handleConfirmAnswers = () => {
    // Lógica para confirmar respostas
    Alert.alert('Confirmar respostas', 'Respostas confirmadas!');
    setStep(3);
  };

  const handleUpdateProfile = () => {
    // Lógica para atualizar o perfil
    Alert.alert('Atualizar Perfil', 'Perfil atualizado com sucesso!');
    setStep(1); // Reinicia o fluxo
  };

  const handleCancel = () => {
    // Lógica para cancelar e voltar
    Alert.alert('Cancelar', 'Operação cancelada.');
    setStep(1); // Reinicia o fluxo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Refaça seu perfil de investidor aqui!</Text>

      {step === 1 && (
        <Button title="Responder perguntas" onPress={handleAnswerQuestions} />
      )}

      {step === 2 && (
        <>
          <Button title="Confirmar respostas finais" onPress={handleConfirmAnswers} />
          <Button title="Cancelar e Voltar" onPress={handleCancel} />
        </>
      )}

      {step === 3 && (
        <>
          <Button title="Atualizar Perfil" onPress={handleUpdateProfile} />
          <Button title="Cancelar e Voltar" onPress={handleCancel} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    padding: 20,
  },
  text: {
    color: '#F2F2F2',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});