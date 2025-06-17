import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSizes } from '../theme';

export default function EditProfile({ navigation }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [income, setIncome] = useState('');

    const handleSave = () => {
        console.log('Perfil salvo:', { name, email, phone });
        // Aqui adiciono a lógica para salvar os dados do perfil
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
                <TouchableOpacity style={[styles.buttonShadow, styles.saveButton]} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
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
});