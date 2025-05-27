import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ChatScreen() {
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
    console.log('Solicitar recomendação');
  };

  const handleGoHome = () => {
    console.log('Voltar à Home');
  };

  if (!conversationStarted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Bem-vindo ao Assistente!</Text>
        <TouchableOpacity style={styles.button} onPress={handleStartConversation}>
          <Text style={styles.buttonText}>Iniciar Conversa</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatArea}>
        {/* Aqui você pode adicionar mensagens ou outros elementos da conversa */}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#A6A6A6"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.microphoneButton} onPress={() => console.log('Ativar microfone')}>
          <Text style={styles.buttonText}>🎤</Text>
        </TouchableOpacity>
      </View>
      {!conversationEnded ? (
        <TouchableOpacity style={styles.button} onPress={handleEndConversation}>
          <Text style={styles.buttonText}>Encerrar Conversa</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleRequestRecommendation}>
            <Text style={styles.buttonText}>Solicitar Recomendação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleGoHome}>
            <Text style={styles.buttonText}>Voltar à Home</Text>
          </TouchableOpacity>
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
  },
  chatArea: {
    width: '100%',
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#0D0D0D',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#F2F2F2',
    marginRight: 10,
  },
  microphoneButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#F2F2F2',
    fontSize: 16,
  },
});