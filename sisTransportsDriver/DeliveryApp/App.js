import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignatureScreen from './screens/SignatureScreen';
import PhotoScreen from './screens/PhotoScreen';
import BarcodeScreen from './screens/BarcodeScreen';
import { startLocationUpdates } from './background-location';
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Coleta de assinatura" component={SignatureScreen} />
      <Stack.Screen name="Comprovantes de entrega" component={PhotoScreen} />
      <Stack.Screen name="Barcode" component={BarcodeScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    startLocationUpdates();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Entrar" style={styles.btnEntrar} component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  btnEntrar:{
    flexDirection:'row',
    color:'white',
    fontSize:24,
    alignItems:'center',
    justifyContent:'center'
  },
});
