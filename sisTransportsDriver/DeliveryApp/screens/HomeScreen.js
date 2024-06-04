import React from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'react-native';

export default function HomeScreen({ navigation }) {
  const deliveries = [
    { "idDtc": 451851, "razao_social": "Poh sei lá Coorp SEM", "endereco": "Rua Teste", "bairro": "Bairro Teste", "cidade": "Cidade Teste", "uf": "SP", "latitude": -23.5505, "longitude": -46.6333 },
    { "idDtc": 451852, "razao_social": "Beta Technologies", "endereco": "Avenida Central", "bairro": "Centro", "cidade": "São Paulo", "uf": "SP", "latitude": -23.5507, "longitude": -46.6233 },
    { "idDtc": 451853, "razao_social": "Gamma Solutions", "endereco": "Rua da Alegria", "bairro": "Vila Nova", "cidade": "Rio de Janeiro", "uf": "RJ", "latitude": -22.9068, "longitude": -43.1729 },
    { "idDtc": 451854, "razao_social": "Delta Enterprises", "endereco": "Avenida Paulista", "bairro": "Bela Vista", "cidade": "São Paulo", "uf": "SP", "latitude": -23.5674, "longitude": -46.6486 },
    { "idDtc": 451855, "razao_social": "Epsilon Systems", "endereco": "Rua das Flores", "bairro": "Jardim das Flores", "cidade": "Belo Horizonte", "uf": "MG", "latitude": -19.9167, "longitude": -43.9345 },
    { "idDtc": 451856, "razao_social": "Zeta Holdings", "endereco": "Rua do Mercado", "bairro": "Centro", "cidade": "Porto Alegre", "uf": "RS", "latitude": -30.0346, "longitude": -51.2177 },
    { "idDtc": 451857, "razao_social": "Eta Industries", "endereco": "Avenida Atlântica", "bairro": "Copacabana", "cidade": "Rio de Janeiro", "uf": "RJ", "latitude": -22.9671, "longitude": -43.1771 },
    { "idDtc": 451858, "razao_social": "Theta Corp", "endereco": "Rua dos Pinheiros", "bairro": "Pinheiros", "cidade": "São Paulo", "uf": "SP", "latitude": -23.5665, "longitude": -46.6726 },
    { "idDtc": 451859, "razao_social": "Iota Ventures", "endereco": "Avenida Brasil", "bairro": "Vila Brasil", "cidade": "Brasília", "uf": "DF", "latitude": -15.7939, "longitude": -47.8828 },
    { "idDtc": 451860, "razao_social": "Kappa Solutions", "endereco": "Rua da Esperança", "bairro": "Esperança", "cidade": "Recife", "uf": "PE", "latitude": -8.0476, "longitude": -34.877 },
    { "idDtc": 451861, "razao_social": "Lambda Enterprises", "endereco": "Avenida das Américas", "bairro": "Barra da Tijuca", "cidade": "Rio de Janeiro", "uf": "RJ", "latitude": -22.9707, "longitude": -43.1822 }
  ]

  const openMap = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('Error opening map:', err));
  };

  return (
    <ScrollView style={styles.container}>
      {deliveries.map((delivery) => (
        <View key={delivery.idDtc} style={styles.card}>
          <Text>{delivery.razao_social}</Text>
          <Text>{delivery.endereco}</Text>
          <Text>{delivery.bairro}</Text>
          <Text>{delivery.cidade} - {delivery.uf}</Text>
          <View style={styles.viewMiniBtns}>
            <TouchableOpacity style={styles.miniBtns} onPress={() => navigation.navigate('Coleta de assinatura', { delivery })}>
              <Icon name="edit" size={35} color="#302b2d" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.miniBtnsMeio} onPress={() => navigation.navigate('Comprovantes de entrega', { delivery })} >
              <Icon name="camera" size={35} color="#302b2d" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.miniBtnsMeio} onPress={() => openMap(delivery.latitude, delivery.longitude)}>
              <Icon name="map" size={35} color="#302b2d" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.miniBtnsMeio} onPress={() => {/* Enviar localização para API */}} >
              <Icon name="map-marker" size={35} color="#302b2d" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.miniBtnsMeio} onPress={() => navigation.navigate('Barcode', { delivery })}>
              <Icon name="barcode" size={35} color="#302b2d" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#15546c'
  },
  card: {
    backgroundColor: '#addd4f',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  miniBtns: {
    padding: 10,
    backgroundColor: '#d9dadc',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
  },
  miniBtnsMeio: {
    padding: 10,
    backgroundColor: '#d9dadc',
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent:'center',
  },
  viewMiniBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#6a636d',
    padding: 10,
    borderRadius: 15,

    // Sombra
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.25, // Opacidade da sombra
    shadowRadius: 3.84, // Raio da sombra
    elevation: 5, // Elevação (apenas para Android)
  },
});
