import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const App = () => {
  useEffect(() => {
    // Função para obter a localização e enviar a cada 5 minutos
    const getLocationAndSend = async () => {
      try {
        // Solicita permissão para acessar a localização do dispositivo
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada para acessar a localização');
          return;
        }

        // Obtém a localização atual do dispositivo
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Simula o envio da localização (substitua por sua lógica real de envio)
        console.log(`Enviando localização: Latitude ${latitude}, Longitude ${longitude}`);

      } catch (error) {
        console.error('Erro ao obter a localização:', error);
        Alert.alert('Erro', 'Falha ao obter a localização do dispositivo');
      }
    };

    // Chama a função inicialmente e a cada 5 minutos
    getLocationAndSend();
    const interval = setInterval(getLocationAndSend, 0.5 * 60 * 1000); // 5 minutos em milissegundos

    // Limpa o intervalo ao desmontar o componente (por exemplo, ao sair da tela)
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Enviando localização a cada 5 minutos...</Text>
    </View>
  );
};

export default App;
