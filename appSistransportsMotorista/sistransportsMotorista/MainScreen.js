import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Importe o componente FontAwesome5 da biblioteca react-native-vector-icons
import { fetchData } from './apiService'; // Importe a função de serviço
import { getLocationAndSend } from './locationService'

const MainScreen = ({ navigation }) => {
  const [infoArray, setInfoArray] = useState([]); // Inicializa como um array vazio
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = 'http://192.168.15.42:8000/operacional/api/get_documentos/';
    fetchData(url, handleData, setLoading);
  }, []);

  const handleData = (data) => {
    try {
      if (data && Array.isArray(data.dados)) {
        // Mapeia os dados recebidos para o formato esperado nos cards
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
        throw new Error('Dados inválidos recebidos da API');
      }
    } catch (error) {
      console.error('Erro ao processar os dados:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Exibindo a imagem antes do título */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Placa: AAA-1A11</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Motorista: Edson Tomas da Silva</Text>
      </View>
      {infoArray.map((item) => (
        <TouchableOpacity
          key={item.idDtc}
          style={styles.card}
          onPress={() => navigation.navigate('Signature', { cardData: item })}
        >
          <Text style={styles.cardTitle}>{item.razao_social}</Text>
          <Text style={styles.cardDescription}>Endereço: {item.endereco}</Text>
          <Text style={styles.cardDescription}>Bairro: {item.bairro}</Text>
          <Text style={styles.cardDescription}>Cidade: {item.cidade}</Text>
          <Text style={styles.cardDescription}>UF: {item.uf}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonBarcode}
              onPress={() => navigation.navigate('BarcodeScanner')}
            >
              <FontAwesome5 name="barcode" size={20} color="#ffffff" />
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonAssinatura}
              onPress={() => navigation.navigate('Signature', { cardData: item })}
            >
              <FontAwesome5 name="pen" size={20} color="#ffffff" />
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonMapa}
              onPress={ getLocationAndSend }
            >
              <FontAwesome5 name="map" size={20} color="#ffffff" />
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonMapa}
              onPress={() => navigation.navigate('BarcodeScanner')}
            >
              <FontAwesome5 name="pin" size={20} color="#ffffff" />
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  logo: {
    width: 400,
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonMapa: {
    flexDirection: 'row',
    backgroundColor: '#46c35f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonAssinatura: {
    flexDirection: 'row',
    backgroundColor: '#4B49AC',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonBarcode: {
    flexDirection: 'row',
    backgroundColor: '#248AFD',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    marginLeft: 5,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    marginBottom: 30,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default MainScreen;