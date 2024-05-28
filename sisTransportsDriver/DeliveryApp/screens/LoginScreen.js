import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ImageBackground,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function LoginScreen({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Adicione a lógica de autenticação aqui
    navigation.navigate('HomeStack');
  };

  return (
    <ImageBackground source={require('../assets/images/background.png')} style={styles.background}>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#999" // Cor do texto do placeholder
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999" // Cor do texto do placeholder
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.btnEntrar} onPress={handleLogin}>
        <Icon name="sign-in" size={35} color="#999" />
        <Text style={styles.btnEntrarText}> ENTRAR</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  background: {
  flex: 1,
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  backgroundColor: '#cac7bf',
  },
  btnEntrar:{
    flexDirection:'row',
    color:'white',
    fontSize:24,
    alignItems:'center',
    justifyContent:'center'
  },
  btnEntrarText:{
    flexDirection:'row',
    color:"#999",
    fontSize:24
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius:15,
    color:'white'
  },
});
