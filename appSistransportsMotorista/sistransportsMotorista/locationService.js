// locationService.js
import * as Location from 'expo-location';
import { Alert } from 'react-native';

// Função para obter a localização e enviar
export const getLocationAndSend = async () => {
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
