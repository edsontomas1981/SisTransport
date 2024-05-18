import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Card, Button, ActivityIndicator, Title } from 'react-native-paper';
import { fetchData } from './apiService';
import { getLocationAndSend } from './locationService';

const MainScreen = ({ navigation }) => {
  const [infoArray, setInfoArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = 'http://192.168.15.42:8000/operacional/api/get_documentos/';
    fetchData(url, handleData, setLoading);
  }, []);

  const handleData = (data) => {
    if (data && Array.isArray(data.dados)) {
      const transformedData = data.dados.map((item) => ({
        idDtc: item.idDtc,
        razao_social: item.razao_social,
        endereco: item.endereco,
        bairro: item.bairro,
        cidade: item.cidade,
        uf: item.uf,
      }));
      setInfoArray(transformedData);
      setLoading(false);
    } else {
      console.error('Dados inválidos recebidos da API');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {infoArray.map((item) => (
        <Card key={item.idDtc} style={styles.card} onPress={() => navigation.navigate('Signature', { cardData: item })}>
          <Card.Content>
            <Title>{item.razao_social}</Title>
            <Text>Endereço: {item.endereco}</Text>
            <Text>Bairro: {item.bairro}</Text>
            <Text>Cidade: {item.cidade}</Text>
            <Text>UF: {item.uf}</Text>
          </Card.Content>
          <Card.Actions>
            <Button
              icon="barcode"
              mode="contained"
              onPress={() => navigation.navigate('BarcodeScanner')}
              contentStyle={{ flexDirection: 'row-reverse' }}
              labelStyle={{ width: 0 }}
            />
            <Button
              icon="pen"
              mode="contained"
              onPress={() => navigation.navigate('Signature', { cardData: item })}
              contentStyle={{ flexDirection: 'row-reverse' }}
              labelStyle={{ width: 0 }}
            />
            <Button
              icon="map"
              mode="contained"
              onPress={getLocationAndSend}
              contentStyle={{ flexDirection: 'row-reverse' }}
              labelStyle={{ width: 0 }}
            />
            <Button
              icon="map-marker"
              mode="contained"
              onPress={() => navigation.navigate('BarcodeScanner')}
              contentStyle={{ flexDirection: 'row-reverse' }}
              labelStyle={{ width: 0 }}
            />
            <Button
              icon="camera"
              mode="contained"
              onPress={() => navigation.navigate('PhotoCapture')}
              contentStyle={{ flexDirection: 'row-reverse' }}
              labelStyle={{ width: 0 }}
            />
          </Card.Actions>
        </Card>
      ))}
      <Button mode="contained" onPress={() => navigation.replace('Login')} style={styles.logoutButton}>
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginVertical: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'red',
    marginBottom: 30,
  },
});

export default MainScreen;
