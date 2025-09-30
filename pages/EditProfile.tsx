import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { colors, spacing, fontSizes } from '../theme';

export default function EditProfile({ navigation }: { navigation: any }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [income, setIncome] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);

    const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8085' : 'http://localhost:8085';

    // Carregar dados completos do usuário (AsyncStorage + API)
    const loadUserData = useCallback(async () => {
        setLoading(true);
        try {
            // Primeiro, carrega dados básicos do AsyncStorage
            const storedUserId = await AsyncStorage.getItem('userId');
            const storedUserName = await AsyncStorage.getItem('userName');
            const storedUserEmail = await AsyncStorage.getItem('userEmail');
            
            if (storedUserId) {
                setUserId(storedUserId);
                
                // Então busca dados completos da API
                try {
                    const response = await axios.get(`${BASE_URL}/wise-buddy/v1/users/${storedUserId}`);
                    
                    if (response.status === 200 && response.data) {
                        const userData = response.data;
                        console.log('Dados completos do usuário da API:', userData);
                        
                        // Preenche todos os campos com os dados da API
                        if (userData.name) setName(userData.name);
                        if (userData.surname) setSurname(userData.surname);
                        if (userData.email) setEmail(userData.email);
                        if (userData.phone) setPhone(userData.phone);
                        if (userData.income) setIncome(userData.income.toString());
                        
                        // Atualiza AsyncStorage com dados mais recentes
                        if (userData.name) await AsyncStorage.setItem('userName', userData.name);
                        if (userData.email) await AsyncStorage.setItem('userEmail', userData.email);
                    } else {
                        // Se a API falhar, usa dados do AsyncStorage como fallback
                        if (storedUserName) setName(storedUserName);
                        if (storedUserEmail) setEmail(storedUserEmail);
                        console.log('Usando dados do AsyncStorage como fallback');
                    }
                } catch (apiError) {
                    console.error('Erro ao buscar dados da API, usando AsyncStorage:', apiError);
            
                    if (storedUserName) setName(storedUserName);
                    if (storedUserEmail) setEmail(storedUserEmail);
                }
            } else {
                Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
                navigation.navigate('Login');
            }
            
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
            Alert.alert('Erro', 'Erro ao carregar dados do usuário');
        } finally {
            setLoading(false);
        }
    }, [BASE_URL, navigation]);

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [loadUserData])
    );

    const handleSave = async () => {
        if (!userId) {
            Alert.alert('Erro', 'ID do usuário não encontrado');
            return;
        }

        if (!name || !email) {
            Alert.alert('Erro', 'Nome e email são obrigatórios');
            return;
        }

        if (password && password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        setLoading(true);
        try {
            const updateData: any = {
                name: name,
                email: email,
            };

            if (surname) updateData.surname = surname;
            if (phone) updateData.phone = phone;
            if (password) updateData.password = password;
            if (income) updateData.income = parseFloat(income.replace(/[^\d.,]/g, '').replace(',', '.'));

            console.log('Enviando dados para API:', updateData);
            
            const response = await axios.put(`${BASE_URL}/wise-buddy/v1/users/${userId}`, updateData);
            
            if (response.status === 200 || response.status === 204) {
                // Atualizar AsyncStorage com os novos dados
                if (name) await AsyncStorage.setItem('userName', name);
                if (email) await AsyncStorage.setItem('userEmail', email);
                
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert('Erro', 'Erro ao atualizar perfil');
            }
        } catch (error: any) {
            console.error('Erro ao atualizar perfil:', error);
            Alert.alert('Erro', error.response?.data?.message || 'Erro ao atualizar perfil. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (navigation && navigation.goBack) navigation.goBack();
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Ionicons name="arrow-back" size={28} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.title}>Editar Perfil</Text>
            
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Carregando dados...</Text>
                </View>
            )}
            
            <Image
                source={{ uri: 'https://avatar.iran.liara.run/public/boy' }}
                style={styles.avatar}
            />
            <View style={styles.inputShadow}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor={colors.textLight}
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputShadow}>
                <TextInput
                    style={styles.input}
                    placeholder="Sobrenome"
                    placeholderTextColor={colors.textLight}
                    value={surname}
                    onChangeText={setSurname}
                />
            </View>
            <View style={styles.inputShadow}>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor={colors.textLight}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputShadow}>
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    placeholderTextColor={colors.textLight}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </View>
            <View style={styles.inputShadow}>
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor={colors.textLight}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.inputShadow}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar Senha"
                    placeholderTextColor={colors.textLight}
                    value={confirmPassword}
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                />
            </View>
            <View style={styles.inputShadow}>
                <TextInput
                    style={styles.input}
                    placeholder="Renda mensal (R$)"
                    placeholderTextColor={colors.textLight}
                    value={income}
                    onChangeText={setIncome}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.buttonShadow, styles.saveButton, loading && { opacity: 0.6 }]} 
                    onPress={handleSave}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Salvar'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonShadow, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.large,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: spacing.large,
        zIndex: 10,
        padding: 2,
    },
    title: {
        color: colors.text,
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        marginBottom: spacing.large,
        textAlign: 'center',
        marginTop: spacing.large + 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: spacing.large,
        backgroundColor: colors.secondary,
    },
    inputShadow: {
        marginBottom: spacing.medium,
        borderRadius: 10,
        backgroundColor: colors.secondary,
        shadowColor: '#232323',
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        elevation: 6,
    },
    input: {
        backgroundColor: colors.secondary,
        color: colors.text,
        borderRadius: 10,
        padding: spacing.medium,
        fontSize: fontSizes.medium,
        borderWidth: 1,
        borderColor: colors.background,
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.medium,
    },
    buttonShadow: {
        flex: 1,
        borderRadius: 10,
        marginHorizontal: 4,
        shadowColor: '#232323',
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
        elevation: 6,
    },
    saveButton: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        alignItems: 'center',
        marginRight: 6,
    },
    cancelButton: {
        backgroundColor: '#FF6347',
        padding: spacing.medium,
        alignItems: 'center',
        marginLeft: 6,
    },
    buttonText: {
        color: colors.background,
        fontSize: fontSizes.medium,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    loadingContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        alignItems: 'center',
        zIndex: 100,
    },
    loadingText: {
        color: colors.text,
        marginTop: spacing.small,
        fontSize: fontSizes.medium,
    },
});