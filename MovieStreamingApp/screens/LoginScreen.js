import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert("Error", "Invalid credentials!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Streaming App</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  input: { width: '80%', padding: 10, margin: 10, borderWidth: 1, borderRadius: 5 },
  button: { backgroundColor: '#3498db', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 16 }
});

export default LoginScreen;
