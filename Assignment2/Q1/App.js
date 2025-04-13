import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';



const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search..." style={styles.searchBar} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};


const products = [
  {
    id: '1',
    name: 'Wireless Headset',
    image: 'https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_UY327_FMwebp_QL65_.jpg',
    description: 'Premium wireless headset with deep bass and noise cancellation.',
    price: '$129.99'
  },
  {
    id: '2',
    name: 'MacBook Pro',
    image: 'https://m.media-amazon.com/images/I/71an9eiBxpL._AC_UY327_FMwebp_QL65_.jpg',
    description: 'Apple MacBook Pro with M2 chip, 16GB RAM, and 512GB SSD.',
    price: '$1,299.99'
  },
  {
    id: '3',
    name: 'Gaming Mouse',
    image: 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_UY327_FMwebp_QL65_.jpg',
    description: 'Ergonomic design with high precision and RGB lighting.',
    price: '$49.99'
  },
  
    {id: '4',
    name: 'Oppo A5',
     image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmspSfy_YtoeQTG5DC-yqTbATwO8m7agwhaA&s',
      description: 'Oppo smartphone with powerful camera and long-lasting battery.',
    price: '$299.99'
  },
  
    {
  id: '5',
  name: 'Apple iPhone 14',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_HXBB5FqrmovRp3pR6iLHhLpLH0b8ZL98GQ&s',
  description: 'Latest Apple iPhone 14 with advanced features and improved battery life.',
  price: '$999.99'
}

  
];

const Stack = createStackNavigator();


const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.imageLarge} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cart', { product })}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const CartScreen = ({ route, navigation }) => {
  const [cart, setCart] = useState(route.params ? [route.params.product] : []);
  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checkout')}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Payment Methods</Text>
      <Text style={styles.description}>Enter your payment and shipping details.</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding:30,
    backgroundColor: '#ADD8E6',
  },
  searchBar: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '30%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  

  imageLarge: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  button: {
    backgroundColor: '#E91E63',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
