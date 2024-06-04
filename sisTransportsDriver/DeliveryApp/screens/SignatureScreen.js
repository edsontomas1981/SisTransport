import React, { useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import Icon from 'react-native-vector-icons/FontAwesome';


const Signature = ({ route, navigation }) => {
  const { delivery } = route.params;
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
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{delivery.razao_social}</Text>
        <Text style={styles.cardDescription}>{delivery.endereco}</Text>
        <Text style={styles.cardDescription}>{delivery.bairro}</Text>
        <Text style={styles.cardDescription}>{delivery.cidade} - {delivery.uf}</Text>
      </View>

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
        <TouchableOpacity style={styles.btnEntrar} onPress={handleClear}>
          <Icon name="eraser" size={35} color="#999" />
          <Text style={styles.btnEntrarText}> Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnEntrar} onPress={handleConfirm} >
          <Icon name="paper-plane" size={35} color="#999" />
          <Text style={styles.btnEntrarText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnEntrar} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={35} color="#999" />
          <Text style={styles.btnEntrarText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#15546c',
    padding: 16,
  },
  signature: `.m-signature-pad--footer {display: none; margin: 0px;}`,
  buttons: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 15,
  },
  btnEntrar:{
    flexDirection:'row',
    color:'white',
    fontSize:24,
    alignItems:'center',
    padding:10,
    marginRight:15,
    borderRadius:10,
    backgroundColor: '#6a636d',
  },
  btnEntrarText:{
    flexDirection:'row',
    color:'white',
    fontSize:14,
    alignItems:'center',
    padding:5,
    borderRadius:10,
    justifyContent:'center',
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
