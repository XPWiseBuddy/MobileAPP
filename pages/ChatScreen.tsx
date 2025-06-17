import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { colors } from '../theme';

type RootStackParamList = {
  Home: undefined;
  Suitability: undefined;
  ChatScreen: undefined;
};

export default function ChatScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [inputText, setInputText] = useState('');
  const [conversationStarted, setConversationStarted] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);

  const handleStartConversation = () => {
    setConversationStarted(true);
  };

  const handleEndConversation = () => {
    setConversationEnded(true);
  };

  const handleRequestRecommendation = () => {
    navigation.navigate('Suitability');
    setConversationStarted(false);
    setConversationEnded(false);
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
    setConversationStarted(false);
    setConversationEnded(false);
  };

  if (!conversationStarted) {
    return (
      <View style={styles.container}>
        <View style={styles.neumorphCard}>
          <Text style={styles.text}>Bem-vindo ao Assistente!</Text>
          <TouchableOpacity style={styles.button} onPress={handleStartConversation}>
            <Text style={styles.buttonText}>Iniciar Conversa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (conversationEnded) {
    return (
      <View style={styles.container}>
        <View style={styles.neumorphCard}>
          <TouchableOpacity style={styles.button} onPress={handleRequestRecommendation}>
            <Text style={styles.buttonText}>Solicitar Recomendação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleGoHome}>
            <Text style={styles.buttonText}>Voltar à Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botão X no topo esquerdo */}
      <TouchableOpacity style={styles.closeButton} onPress={handleEndConversation}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
      <View style={styles.neumorphChatArea}>
        {/* Aqui você pode adicionar mensagens ou outros elementos da conversa */}
      </View>
      <View style={styles.neumorphInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          placeholderTextColor={colors.textLight}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.microphoneButton} onPress={() => console.log('Ativar microfone')}>
          <Text style={styles.buttonText}>🎤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  neumorphCard: {
    width: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    // Neumorphism effect
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#23272F',
  },
  text: {
    color: colors.text,
    fontSize: 20,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  neumorphChatArea: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    // Neumorphism effect
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#23272F',
  },
  neumorphInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 18,
    padding: 10,
    marginBottom: 10,
    // Neumorphism effect
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#23272F',
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: colors.text,
    backgroundColor: colors.background,
    marginRight: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#23272F',
  },
  microphoneButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 50,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    // Neumorphism effect
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    // Neumorphism effect
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: colors.secondary,
    borderRadius: 18,
    padding: 6,
    // Neumorphism effect
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#23272F',
  },
  closeButtonText: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
});