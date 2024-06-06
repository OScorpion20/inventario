import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Product} from '../model/Product';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../App';
import LocalDB from '../persistance/localdb';
import WebServiceParams from '../WebServiceParams';

type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRoute = RouteProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenProps;
  route: HomeScreenRoute;
};

function Home({navigation}: HomeProps): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const productItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.push('ProductDetails', {product: item})}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', flexGrow: 9}}>
          <Text style={styles.itemTitle}>{item.nombre}</Text>
          <Text style={styles.itemDetails}>
            Precio: $ {item.precio.toFixed(2)}
          </Text>
        </View>
        <Text
          style={[
            styles.itemBadge,
            item.currentStock < item.minStock ? styles.itemBadgeError : null,
          ]}>
          {item.currentStock}
        </Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    LocalDB.init();
    navigation.addListener('focus', async () => {
      try {
        const response = await fetch(
          `http://${WebServiceParams.host}:${WebServiceParams.port}/productos`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'text/plain',
            },
          },
        );
        setProducts(await response.json());
      } catch (error) {
        console.error(error);
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={productItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  productItem: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  itemDetails: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  itemBadge: {
    fontSize: 20,
    color: '#005DFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    backgroundColor: '#e6f0ff',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
  },
  itemBadgeError: {
    color: 'red',
    backgroundColor: '#ffe6e6',
  },
});

export default Home;
