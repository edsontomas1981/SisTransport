import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';

const PhotoCaptureScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null); // Referência para a câmera

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handlePhotoCapture = async () => {
    if (hasPermission === true && cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: true });
        setCapturedImage(photo.uri); // Armazena a URI da imagem

        // Lógica para enviar a imagem para o servidor (já presente no seu código)
        try {
          // ... (seu código para enviar a foto) ...
        } catch (uploadError) {
          console.error('Erro ao enviar a foto:', uploadError);
          Alert.alert('Erro', 'Falha ao enviar a foto. Verifique sua conexão.');
        }
      } catch (error) {
        console.error('Erro ao tirar a foto:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao tirar a foto.');
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para usar a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Exibe a câmera */}
      <Camera style={StyleSheet.absoluteFillObject} ref={cameraRef} />

      {/* Exibe a imagem capturada se capturedImage tiver um valor */}
      {capturedImage && (
        <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
      )}

      {/* Botões para tirar foto e voltar */}
      <View style={styles.buttonContainer}>
        <Button title="Tirar Foto" onPress={handlePhotoCapture} />
        {capturedImage && (
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capturedImage: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row', // Alinha os botões horizontalmente
    justifyContent: 'space-around', // Espaço igual entre os botões
    width: '80%',
    marginTop: 20,
  },
});

export default PhotoCaptureScreen;
