import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

type HistoryItem = {
  json: string;
};

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  const BASE_URL =
    Platform.OS === 'android' ? 'http://10.0.2.2:8085' : 'http://localhost:8085';

  useEffect(() => {
    async function fetchHistory() {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId){
          setError('Usuário não encontrado');
          navigation.navigate('Login' as never);
          return;
        }
        const response = await fetch(`${BASE_URL}/wise-buddy/v1/suitabilities/history/${userId}`);
        const data = await response.json();
        console.log(`Response data: ${JSON.stringify(data)}`);
        if (response.status !== 200) {
          setError(data.message || 'Erro ao buscar histórico');
          return;
        }
        setHistory(data);
        console.log(`History data: ${JSON.stringify(history)}`);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#F2F2F2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Histórico de sessões:</Text>
      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          let respostas = [];
          try {
            const parsed = JSON.parse(item.json);
            respostas = parsed.respostas || [];
          } catch (e) {
            respostas = [];
          }
          return (
            <View style={styles.item}>
              <Text style={{ color: '#F2F2F2', fontWeight: 'bold' }}>Sessão {index + 1}</Text>
              <Text style={{ color: '#F2F2F2' }}>Respostas: {respostas.join(', ')}</Text>
            </View>
          );
        }}
        contentContainerStyle={{ paddingTop: 60, width: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    padding: 16,
  },
  text: {
    top: 50,
    color: '#F2F2F2',
    fontSize: 22,
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#1A1A1A',
    padding: 12,
    marginVertical: 6,
    paddingHorizontal: 50,
    borderRadius: 8,
    width: '100%',
  },
});