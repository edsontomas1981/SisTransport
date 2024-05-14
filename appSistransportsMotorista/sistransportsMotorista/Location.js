import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationButton = () => {
  const handleLocationPress = async () => {
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

      // Exibe a latitude e longitude em um alerta
      Alert.alert(
        'Localização Atual',
        `Latitude: ${latitude.toFixed(6)}\nLongitude: ${longitude.toFixed(6)}`
      );
    } catch (error) {
      console.error('Erro ao obter a localização:', error);
      Alert.alert('Erro', 'Falha ao obter a localização do dispositivo');
    }
  };

  return (
    <View style={{ margin: 20 }}>
      <Button title="Obter Localização" onPress={handleLocationPress} />
    </View>
  );
};

export default LocationButton;
