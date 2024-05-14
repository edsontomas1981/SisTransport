import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import SignatureScreen from './SignatureScreen';
import BarcodeScannerScreen from './BarcodeScannerScreen'; // Importe a nova tela

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Tela de Login' }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Tela Principal' }} />
        <Stack.Screen name="Signature" component={SignatureScreen} options={{ title: 'Assinatura' }} />
        <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} options={{ title: 'Leitor de Código de Barras' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
