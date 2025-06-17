import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const questions = [
  {
    text: '1. Qual é o seu principal objetivo ao investir?',
    options: [
      { label: 'A) Preservar meu dinheiro e evitar perdas.', value: 'a' },
      { label: 'B) Ter uma rentabilidade maior que a poupança, mesmo com algum risco.', value: 'b' },
      { label: 'C) Aumentar significativamente meu patrimônio ao longo do tempo.', value: 'c' },
      { label: 'D) Obter lucros rápidos, mesmo que tenha altos riscos.', value: 'd' },
    ],
  },
  {
    text: '2. Como você se sentiria se seu investimento caísse 15% em um mês?',
    options: [
      { label: 'A) Muito preocupado, retiraria o dinheiro imediatamente.', value: 'a' },
      { label: 'B) Incomodado, mas manteria o investimento com cautela.', value: 'b' },
      { label: 'C) Tranquilo, faz parte do mercado e eu esperaria recuperar.', value: 'c' },
      { label: 'D) Animado, poderia ser uma boa oportunidade para investir mais.', value: 'd' },
    ],
  },
  {
    text: '3. Qual é o seu nível de conhecimento sobre investimentos?',
    options: [
      { label: 'A) Nenhum, estou começando agora.', value: 'a' },
      { label: 'B) Básico, conheço poupança e CDB.', value: 'b' },
      { label: 'C) Intermediário, já investi em ações ou fundos.', value: 'c' },
      { label: 'D) Avançado, acompanho o mercado e faço análises.', value: 'd' },
    ],
  },
  {
    text: '4. Qual é o prazo que você pretende manter seus investimentos?',
    options: [
      { label: 'A) Menos de 1 ano.', value: 'a' },
      { label: 'B) Entre 1 e 3 anos.', value: 'b' },
      { label: 'C) Entre 3 e 5 anos.', value: 'c' },
      { label: 'D) Mais de 5 anos.', value: 'd' },
    ],
  },
];

export default function SuitabilityScreen() {
  const [step, setStep] = useState(0); // 0: loading, 1: perguntas, 2: confirmação, 3: sucesso
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    Platform.OS === 'android' ? 'http://10.0.2.2:8085' : 'http://localhost:8085';

  useEffect(() => {
    async function checkHistory() {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          Alert.alert('Erro', 'Usuário não encontrado.');
          setStep(3);
          return;
        }
        const response = await fetch(`${BASE_URL}/wise-buddy/v1/suitabilities/history/${userId}`);
        const data = await response.json();
        if (response.status === 200 && Array.isArray(data) && data.length > 0) {
          Alert.alert(
            'Você já respondeu',
            'Deseja responder as perguntas novamente?',
            [
              {
                text: 'Sim',
                onPress: () => {
                  setStep(1);
                  setLoading(false);
                },
              },
              {
                text: 'Não',
                onPress: () => setStep(3),
                style: 'cancel',
              },
            ],
            { cancelable: false }
          );
        } else {
          setStep(1);
        }
      } catch (e) {
        setStep(1);
      } finally {
        setLoading(false);
      }
    }
    checkHistory();
  }, []);

  const handleSelectOption = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      Alert.alert('Selecione uma opção antes de continuar.');
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep(2);
    }
  };

  const handleConfirmAnswers = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não encontrado.');
        return;
      }
      // Exemplo de cálculo de score e profile
      const score = 85;
      const profile = 'moderado';
      const evaluationDate = new Date().toISOString().split('T')[0];
      const payload = {
        userId: Number(userId),
        score,
        profile,
        evaluationDate,
        json: JSON.stringify({ respostas: answers }),
      };
      
      const response = await fetch(`${BASE_URL}/wise-buddy/v1/suitabilities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      setStep(3);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível preparar os dados.');
    }
  };

  const handleCancel = () => {
    setStep(1);
    setAnswers([]);
    setCurrentQuestion(0);
  };

  if (loading || step === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#F2F2F2" />
      </View>
    );
  }

  if (step === 3) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Perfil atualizado com sucesso ou cancelado!</Text>
        <Button title="Refazer" onPress={handleCancel} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Refaça seu perfil de investidor aqui!</Text>

      {step === 1 && (
        <>
          <Text style={styles.question}>{questions[currentQuestion].text}</Text>
          {questions[currentQuestion].options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                answers[currentQuestion] === option.value && styles.selectedOption,
              ]}
              onPress={() => handleSelectOption(option.value)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
          <Button title={currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'} onPress={handleNext} />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.text}>Confirme suas respostas:</Text>
          <Text style={styles.text}>{answers.map((a, i) => `Q${i + 1}: ${a?.toUpperCase()}`).join(' | ')}</Text>
          <Button title="Confirmar respostas finais" onPress={handleConfirmAnswers} />
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
  question: {
    color: '#F2F2F2',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#222',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    width: 300,
    alignItems: 'flex-start',
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
  },
  optionText: {
    color: '#F2F2F2',
    fontSize: 16,
  },
});