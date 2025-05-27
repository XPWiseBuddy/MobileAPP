import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function EditProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSave = () => {
        console.log('Perfil salvo:', { name, email, phone });
        // Aqui adiciono a lógica para salvar os dados do perfil
    };

    const handleCancel = () => {
        console.log('Edição cancelada');
        // Aqui adiciono a lógica para voltar à tela anterior
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>
            <Image
                source={{ uri: 'https://avatar.iran.liara.run/public/boy?username=Mitchell' }}
                style={styles.avatar}
            />
            <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#A6A6A6"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#A6A6A6"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                placeholderTextColor="#A6A6A6"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        color: '#F2F2F2',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#1E1E1E',
        color: '#F2F2F2',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F2F2F2',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#F2F2F2',
        fontSize: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
});