import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: 'User Name',
    email: 'example@email.com',
  });

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Funcionalidade ainda não implementada.');
    // navigation.navigate('EditProfile');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PERFIL</Text>
        <TouchableOpacity onPress={handleEditProfile} accessible accessibilityLabel="Editar perfil">
          <Ionicons name="pencil" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Image
          source={{ uri: 'https://avatar.iran.liara.run/public/boy?username=Ash' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
      </View>

      {/* Functionalities */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={handleEditProfile}
          accessible
          accessibilityLabel="Editar perfil"
        >
          <Ionicons name="settings-outline" size={24} color="#1E90FF" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} accessible accessibilityLabel="Privacidade">
          <Ionicons name="lock-closed-outline" size={24} color="#1E90FF" />
          <Text style={styles.optionText}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} accessible accessibilityLabel="Notificações">
          <Ionicons name="notifications-outline" size={24} color="#1E90FF" />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2B705',
    padding: 20,
    color: '#0d0d0d',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});