import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';

const PhotoCaptureScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const handlePhotoCapture = async () => {
    if (hasPermission === true && cameraReady && cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: true });
        setCapturedImage(photo.uri);

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
    } else {
      console.log('Permissão negada ou câmera não está pronta.');
      Alert.alert('Erro', 'A câmera não está pronta ou a permissão foi negada.');
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
      <Camera
        style={StyleSheet.absoluteFillObject}
        ref={cameraRef}
        onCameraReady={handleCameraReady}
      />
      {capturedImage && (
        <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
      )}
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
    position: 'absolute',
    top: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    position: 'absolute',
    bottom: 20,
  },
});

export default PhotoCaptureScreen;
