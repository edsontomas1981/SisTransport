import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity, LogBox } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as BackgroundFetch from 'expo-background-fetch';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import SignatureScreen from './SignatureScreen';
import BarcodeScannerScreen from './BarcodeScannerScreen';
import DrawerDadosMotorista from './Drawer';
import PhotoCaptureScreen from './Comprovantes.js';

const LOCATION_TASK_NAME = 'background-location-task';
const LOG_TASK_NAME = 'background-log-task';

// Ignora avisos irrelevantes para focar nos logs importantes
LogBox.ignoreLogs(['Setting a timer']);

// Define uma função para enviar logs para a API
const sendLogToAPI = async () => {
  try {
    const response = await fetch('https://sua-api-url.com/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Log every 30 seconds at ${new Date().toLocaleTimeString()}`,
      }),
    });
    if (response.ok) {
      console.log('Log sent to API successfully');
      return BackgroundFetch.Result.NewData;
    } else {
      console.error('Failed to send log to API');
      return BackgroundFetch.Result.Failed;
    }
  } catch (error) {
    console.error('Error sending log to API:', error);
    return BackgroundFetch.Result.Failed;
  }
};

// Define a background task for location updates
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error("TaskManager error:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log(`Received new locations at ${new Date().toLocaleTimeString()}:`, locations);
  }
});

// Define a background task for logging
TaskManager.defineTask(LOG_TASK_NAME, async () => {
  return await sendLogToAPI();
});

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const startBackgroundUpdate = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus.status === 'granted') {
          await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.High,
            distanceInterval: 0, // Defina como 0 para obter atualizações com base no intervalo de tempo
            deferredUpdatesInterval: 30000, // Intervalo de tempo em milissegundos (30 segundos)
            showsBackgroundLocationIndicator: true, // Mostra um indicador de localização em background (apenas iOS)
          });
          console.log('Background location tracking started.');
        } else {
          console.error("Background location permission not granted");
        }
      } else {
        console.error("Foreground location permission not granted");
      }
    };

    const startBackgroundLogTask = async () => {
      try {
        const backgroundFetchStatus = await BackgroundFetch.getStatusAsync();
        console.log(`Background fetch status: ${backgroundFetchStatus}`);

        if (
          backgroundFetchStatus === BackgroundFetch.Status.Restricted ||
          backgroundFetchStatus === BackgroundFetch.Status.Denied
        ) {
          console.error("Background fetch is disabled.");
          return;
        }

        await BackgroundFetch.registerTaskAsync(LOG_TASK_NAME, {
          minimumInterval: 30, // 30 seconds
          stopOnTerminate: false,
          startOnBoot: true,
        });
        console.log('Background log task registered.');
      } catch (error) {
        console.error('Error registering background log task:', error);
      }
    };

    startBackgroundUpdate();
    startBackgroundLogTask();
  }, []);

  const renderMenuButton = (navigation) => (
    <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
      <Image
        source={require('./assets/menu_hamburguer.png')}
        style={styles.menuIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation }) => ({
            headerLeft: () => renderMenuButton(navigation),
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={({ navigation }) => ({
            headerLeft: () => renderMenuButton(navigation),
            headerTitle: 'Main Screen',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Signature"
          component={SignatureScreen}
          options={{
            headerTitle: 'Signature',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="BarcodeScanner"
          component={BarcodeScannerScreen}
          options={{
            headerTitle: 'Barcode Scanner',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="PhotoCapture" component={PhotoCaptureScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 16,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
});

export default App;
