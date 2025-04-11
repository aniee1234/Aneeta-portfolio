import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const App = () => {
  const [selectedScreen, setSelectedScreen] = useState('Home');

  // Render the active screen based on the selected tab
  const renderScreen = () => {
    switch (selectedScreen) {
      case 'Home':
        return <HomeScreen />;
      case 'RestaurantDetails':
        return <RestaurantDetailsScreen />;
      case 'Cart':
        return <CartScreen />;
      case 'Checkout':
        return <CheckoutScreen />;
      case 'Tracking':
        return <OrderTrackingScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.appContainer}>
      <ScrollView style={styles.screenContainer}>
        {renderScreen()}
      </ScrollView>
      <View style={styles.navbar}>
        {[
          { label: 'Home', screen: 'Home' },
          { label: 'Details', screen: 'RestaurantDetails' },
          { label: 'Cart', screen: 'Cart' },
          { label: 'Checkout', screen: 'Checkout' },
          { label: 'Tracking', screen: 'Tracking' },
          { label: 'Profile', screen: 'Profile' },
        ].map(({ label, screen }) => (
          <TouchableOpacity key={label} onPress={() => setSelectedScreen(screen)} style={styles.navButton}>
            <Text style={styles.navButtonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Home Screen – Restaurant list and search bar
const HomeScreen = () => {
  const restaurants = [
    { id: '1', name: 'Pink Palace Diner' },
    { id: '2', name: 'The Blushing Spoon' },
    { id: '3', name: 'Rosy Eats' },
  ];

  return (
    <View style={styles.screenContent}>
      <Text style={styles.screenTitle}>Restaurants</Text>
      <TextInput 
        style={styles.searchInput}
        placeholder="Search restaurants..."
        placeholderTextColor="#ff69b4"
      />
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// Restaurant Details Screen – Menu, reviews, ratings
const RestaurantDetailsScreen = () => {
  const menu = [
    { id: '1', dish: 'Strawberry Salad', price: '$8' },
    { id: '2', dish: 'Pink Pasta', price: '$12' },
    { id: '3', dish: 'Rose Latte', price: '$5' },
  ];
  const reviews = [
    { id: '1', text: 'Delicious and pretty ambiance!', rating: 4 },
    { id: '2', text: 'Loved the unique flavors.', rating: 5 },
  ];

  return (
    <View style={styles.screenContent}>
      <Text style={styles.screenTitle}>Restaurant Details</Text>
      <Text style={styles.subHeading}>Menu</Text>
      <FlatList
        data={menu}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>{item.dish} - {item.price}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={[styles.subHeading, { marginTop: 20 }]}>Reviews & Ratings</Text>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.reviewText}>{item.text} ({item.rating} ★)</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// Cart Screen – Selected items, total price, and checkout button
const CartScreen = () => {
  const cartItems = [
    { id: '1', name: 'Pink Pasta', price: '$12' },
    { id: '2', name: 'Rose Latte', price: '$5' },
  ];
  const total = '$17';
  
  return (
    <View style={styles.screenContent}>
      <Text style={styles.screenTitle}>Your Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartText}>{item.name}</Text>
            <Text style={styles.cartText}>{item.price}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.totalText}>Total: {total}</Text>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Checkout & Payment Screen – Payment methods and delivery address
const CheckoutScreen = () => {
  return (
    <View style={styles.screenContent}>
      <Text style={styles.screenTitle}>Checkout & Payment</Text>
      <TextInput 
        style={styles.inputField}
        placeholder="Payment Method (e.g., Credit Card)"
        placeholderTextColor="#ff69b4"
      />
      <TextInput 
        style={styles.inputField}
        placeholder="Delivery Address"
        placeholderTextColor="#ff69b4"
      />
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

// Order Tracking Screen – Live delivery tracking
const OrderTrackingScreen = () => {
  return (
    <View style={styles.screenContent}>
      <Text style={styles.screenTitle}>Order Tracking</Text>
      <View style={styles.trackingBox}>
        <Text style={styles.trackingText}>Live Tracking is coming soon...</Text>
      </View>
    </View>
  );
};

// Profile & Order History Screen – Past & current orders
const ProfileScreen = () => {
  const orders = [
    { id: '1', order: 'Pink Pasta Combo', status: 'Delivered' },
    { id: '2', order: 'Rosy Breakfast', status: 'On the way' },
  ];

  return (
    <View style={styles.screenContent}>
      <Text style={styles.screenTitle}>Profile & Order History</Text>
      <Text style={styles.subHeading}>Past & Current Orders</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderText}>{item.order}</Text>
            <Text style={styles.orderText}>{item.status}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// Styles using pink and white theme
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ff69b4', // Pink
    paddingVertical: 10,
  },
  navButton: {
    padding: 5,
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  screenContent: {
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff69b4',
    marginBottom: 15,
  },
  searchInput: {
    borderColor: '#ff69b4',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#ff69b4',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ff69b4',
    paddingVertical: 10,
  },
  listItemText: {
    fontSize: 18,
    color: '#ff69b4',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff69b4',
    marginVertical: 10,
  },
  menuItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ff69b4',
  },
  menuText: {
    fontSize: 16,
    color: '#ff69b4',
  },
  reviewItem: {
    backgroundColor: '#fff0f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  reviewText: {
    color: '#ff1493',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff0f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cartText: {
    fontSize: 16,
    color: '#ff69b4',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff69b4',
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: '#ff69b4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputField: {
    borderColor: '#ff69b4',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#ff69b4',
  },
  trackingBox: {
    backgroundColor: '#fff0f5',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackingText: {
    fontSize: 18,
    color: '#ff69b4',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff0f5',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  orderText: {
    fontSize: 16,
    color: '#ff69b4',
  },
});

export default App;
