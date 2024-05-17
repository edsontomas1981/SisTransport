import React from 'react';
import { Drawer, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const DrawerDadosMotorista = () => {
  const [active, setActive] = React.useState('');
  const navigation = useNavigation();

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <Drawer.Section title="Some title">
      {/* Botão do menu no cabeçalho */}
      <IconButton
        icon="menu"
        size={24}
        onPress={handleMenuPress}
        style={{ marginLeft: 10 }}
      />

      {/* Itens do drawer */}
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
  );
};

export default DrawerDadosMotorista;
