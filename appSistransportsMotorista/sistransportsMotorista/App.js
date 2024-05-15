import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Image, StyleSheet } from 'react-native';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import SignatureScreen from './SignatureScreen';
import BarcodeScannerScreen from './BarcodeScannerScreen'; // Importe a nova tela

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Image
                  source={require('./assets/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleAlign: 'left',
          }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Image
                  source={require('./assets/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleAlign: 'left',
          }}
        />
        <Stack.Screen
          name="Signature"
          component={SignatureScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Image
                  source={require('./assets/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleAlign: 'left',
          }}
        />
        <Stack.Screen
          name="BarcodeScanner"
          component={BarcodeScannerScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Image
                  source={require('./assets/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            ),
            headerTitleAlign: 'left',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'left',
  },
  logo: {
    width: 400,  // Ajuste a largura conforme necessário
    height: 200,  // Ajuste a altura conforme necessário
  },
});

export default App;
