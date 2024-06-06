import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: '#f7fade',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '90%',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#00C8F8',
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#005DFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#323844',
    fontWeight: 'bold',
  },
});

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};
type LoginProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

function Login({navigation}: LoginProps): React.JSX.Element {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const btnIngresarOnPress = async function () {
    if (usuario && contrasena) {
      navigation.navigate('Home');
      return;
    }
    Alert.alert('Fallido', 'Datos incorrectos');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Usuario"
          placeholderTextColor="#828894"
          onChangeText={u => setUsuario(u)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Contraseña"
          placeholderTextColor="#828894"
          secureTextEntry={true}
          onChangeText={p => setContrasena(p)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={btnIngresarOnPress}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
