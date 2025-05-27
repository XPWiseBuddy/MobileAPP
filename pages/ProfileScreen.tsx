import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, fontSizes } from '../theme';

export default function ProfileScreen() {
  const navigation = useNavigation();
  interface User {
    name: string;
    email: string;
    avatar?: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          navigation.replace('Login');
          return;
        }

        const response = await fetch(`http://10.0.2.2:8085/wise-buddy/v1/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    // navigation.navigate('EditProfile');
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
          source={{ uri: user.avatar || 'https://via.placeholder.com/120' }}
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
        <TouchableOpacity style={styles.option} accessible accessibilityLabel="Privacidade">
          <Ionicons name="lock-closed-outline" size={24} color={colors.primary} />
          <Text style={styles.optionText}>Privacidade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} accessible accessibilityLabel="Notificações">
          <Ionicons name="notifications-outline" size={24} color={colors.primary} />
          <Text style={styles.optionText}>Notificações</Text>
        </TouchableOpacity>
      </View>
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
    color: colors.textSecondary,
  },
  profileInfo: {
    marginTop: spacing.large,
    alignItems: 'center',
    marginVertical: spacing.large,
  },
  profileImage: {
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
    color: colors.textPrimary,
  },
  profileEmail: {
    fontSize: fontSizes.medium,
    color: colors.textSecondary,
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
    borderBottomColor: colors.card,
  },
  optionText: {
    marginLeft: spacing.medium,
    fontSize: fontSizes.medium,
    color: colors.textPrimary,
  },
});