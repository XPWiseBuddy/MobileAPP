import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, CommonActions, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, fontSizes } from '../theme';
import EditProfile from './EditProfile';

export default function ProfileScreen() {
  const navigation = useNavigation();
  interface User {
    name: string;
    email: string;
    avatar?: string;
  }

  const BASE_URL =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:8085'
      : 'http://localhost:8085';


  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [privacyVisible, setPrivacyVisible] = useState(false);



  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        navigation.navigate('Login' as never);
        return;
      }

      const response = await fetch(`${BASE_URL}/wise-buddy/v1/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        console.log('Dados do usuário atualizados:', data);
      } else {
        navigation.navigate('Login' as never);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, navigation]);

  // Carrega os dados sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

  const handleEditProfile = () => {
    navigation.navigate('EditProfile' as never);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar informações do usuário.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: user.avatar || 'https://avatar.iran.liara.run/public/boy' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={handleEditProfile}
          accessible
          accessibilityLabel="Editar perfil"
        >
          <Ionicons name="settings-outline" size={24} color={colors.primary} />
          <Text style={styles.optionText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          accessible
          accessibilityLabel="Privacidade"
          onPress={() => setPrivacyVisible(true)}
        >
          <Ionicons name="lock-closed-outline" size={24} color={colors.primary} />
          <Text style={styles.optionText}>Privacidade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} accessible accessibilityLabel="Notificações">
          <Ionicons name="notifications-outline" size={24} color={colors.primary} />
          <Text style={styles.optionText}>Notificações</Text>
        </TouchableOpacity>
        {/* Botão de sair */}
        <TouchableOpacity
          style={[styles.option, { borderBottomWidth: 0 }]}
          onPress={handleLogout}
          accessible
          accessibilityLabel="Sair da conta"
        >
          <Ionicons name="exit-outline" size={24} color="#E53935" />
          <Text style={[styles.optionText, { color: '#E53935' }]}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={privacyVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPrivacyVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Termos de Privacidade</Text>
            <ScrollView>
              <Text style={styles.modalText}>
                1. Introdução{'\n'}
                Nós, da WiseBuddy, respeitamos sua privacidade e estamos comprometidos em proteger os dados pessoais que você nos fornece. Este Termo de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações.{'\n\n'}

                2. Coleta de Dados{'\n'}
                Coletamos os seguintes tipos de dados:{'\n\n'}

                Dados pessoais fornecidos pelo usuário: nome, e-mail, telefone, CPF, endereço, etc.{'\n'}
                Dados de navegação: endereço IP, localização geográfica, tipo de navegador, tempo de acesso, páginas visitadas, cookies, etc.{'\n\n'}

                Esses dados são coletados quando você:{'\n'}
                - Cria uma conta em nossa plataforma{'\n'}
                - Preenche formulários{'\n'}
                - Navega em nosso site/aplicativo{'\n'}
                - Entra em contato conosco por qualquer canal{'\n\n'}

                3. Uso dos Dados{'\n'}
                Utilizamos seus dados para:{'\n'}
                - Prestar os serviços contratados{'\n'}
                - Personalizar a experiência do usuário{'\n'}
                - Enviar comunicações e atualizações{'\n'}
                - Cumprir obrigações legais e regulatórias{'\n'}
                - Garantir a segurança da informação{'\n\n'}

                4. Compartilhamento de Dados{'\n'}
                Não compartilhamos seus dados com terceiros, exceto:{'\n'}
                - Com parceiros e prestadores de serviço essenciais para o funcionamento da plataforma{'\n'}
                - Quando exigido por lei ou autoridade competente{'\n'}
                - Em casos de fusão, aquisição ou venda da empresa{'\n\n'}
                Todos os terceiros com acesso aos dados estão contratualmente obrigados a respeitar esta política.{'\n\n'}

                5. Armazenamento e Segurança{'\n'}
                Seus dados são armazenados em servidores seguros e protegidos por tecnologias adequadas para prevenir acessos não autorizados, vazamentos ou uso indevido. Adotamos medidas técnicas e organizacionais para garantir a integridade das informações.{'\n\n'}

                6. Direitos do Titular dos Dados{'\n'}
                Você pode, a qualquer momento:{'\n'}
                - Confirmar a existência de tratamento de seus dados{'\n'}
                - Acessar seus dados{'\n'}
                - Corrigir dados incompletos, inexatos ou desatualizados{'\n'}
                - Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários{'\n'}
                - Revogar o consentimento e solicitar a exclusão dos dados{'\n\n'}
                Para exercer seus direitos, entre em contato pelo e-mail: contato@seudominio.com{'\n\n'}

                7. Uso de Cookies{'\n'}
                Utilizamos cookies para melhorar sua experiência, entender seu comportamento de navegação e oferecer conteúdo personalizado. Você pode desativar os cookies nas configurações do seu navegador.{'\n\n'}

                8. Alterações nesta Política{'\n'}
                Podemos atualizar este Termo de Privacidade periodicamente. Notificaremos os usuários sobre mudanças significativas. Recomendamos que você reveja este documento regularmente.{'\n\n'}

                9. Contato{'\n'}
                Se tiver dúvidas sobre esta política ou desejar exercer seus direitos, entre em contato conosco:{'\n\n'}
                Responsável pelo Tratamento dos Dados:{'\n'}
                [Nome do DPO ou responsável]{'\n'}
                E-mail: contato@seudominio.com
              </Text>

            </ScrollView>
            <Pressable style={styles.closeButton} onPress={() => setPrivacyVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: fontSizes.medium,
    color: colors.textLight,
  },
  profileInfo: {
    marginTop: spacing.large,
    alignItems: 'center',
    marginVertical: spacing.large,
  },
  profileImage: {
    marginTop: 50,
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.medium,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  profileName: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.text,
  },
  profileEmail: {
    fontSize: fontSizes.medium,
    color: colors.textLight,
  },
  optionsContainer: {
    marginTop: spacing.medium,
    paddingHorizontal: spacing.large,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  optionText: {
    marginLeft: spacing.medium,
    fontSize: fontSizes.medium,
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    width: '85%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
  },
  modalText: {
    fontSize: fontSizes.medium,
    color: "#333",
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.medium,
  },
});