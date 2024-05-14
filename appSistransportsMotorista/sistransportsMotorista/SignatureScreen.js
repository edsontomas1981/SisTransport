import React, { useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

const Signature = ({ route, navigation }) => {
  const { cardData } = route.params;
  const ref = useRef();

  const handleOK = (signature) => {
    console.log(signature);
    Alert.alert('Assinatura capturada!');
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    ref.current.readSignature();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>{cardData.razao_social}</Text>
      <Text style={styles.cardDescription}>Endereço: {cardData.endereco}</Text>
      <Text style={styles.cardDescription}>Bairro: {cardData.bairro}</Text>
      <Text style={styles.cardDescription}>Cidade: {cardData.cidade}</Text>
      <Text style={styles.cardDescription}>UF: {cardData.uf}</Text>
      <SignatureScreen
        ref={ref}
        onOK={handleOK}
        onEmpty={() => Alert.alert('Por favor, forneça uma assinatura.')}
        descriptionText="Assine aqui"
        clearText="Limpar"
        confirmText="Salvar"
        webStyle={styles.signature}
      />
      <View style={styles.buttons}>
        <Button title="Limpar" onPress={handleClear} />
        <Button title="Salvar" onPress={handleConfirm} />
      </View>
      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  signature: `.m-signature-pad--footer {display: none; margin: 0px;}`,
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 20,
  },
});

export default Signature;
