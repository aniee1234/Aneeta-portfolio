import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet
} from 'react-native';

// Reusable styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'black',
    flex: 1,
  },
  heading: {
    color: '#b8860b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    color: '#b8860b',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: 'black',
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#b8860b',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

// Home Screen
const HomeScreen = ({ navigation }) => {
  const categories = ['Movies', 'Events', 'Flights'];
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home Screen</Text>
      <Text style={styles.text}>Select a category:</Text>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate('SearchFilter', { category })}
        >
          <Text style={styles.buttonText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Search & Filter Screen
const SearchFilterScreen = ({ route, navigation }) => {
  const { category } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{category} Search & Filter</Text>
      <TextInput placeholder="Search..." placeholderTextColor="gray" style={styles.input} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BookingDetails')}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

// Booking Details Screen
const BookingDetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Booking Details Screen</Text>
      <Text style={styles.text}>Select Seats</Text>
      <Text style={styles.text}>Select Showtime</Text>
      <Text style={styles.text}>Price: $20</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Payment')}
      >
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

// Payment Screen
const PaymentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment Screen</Text>
      <TextInput placeholder="Enter discount code" placeholderTextColor="gray" style={styles.input} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyBookings')}
      >
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

// My Bookings Screen
const MyBookingsScreen = () => {
  const bookings = [
    { id: '1', title: 'Movie A', date: '2025-03-10', status: 'Upcoming' },
    { id: '2', title: 'Event B', date: '2025-03-12', status: 'Upcoming' },
    { id: '3', title: 'Flight C', date: '2025-03-15', status: 'Past' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Bookings</Text>
      <FlatList
        data={bookings}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>Date: {item.date}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// Profile & Settings Screen
const ProfileSettingsScreen = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    paymentHistory: [
      { id: '1', amount: '$20', date: '2025-03-01' },
      { id: '2', amount: '$50', date: '2025-02-25' },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile & Settings</Text>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Payment History:</Text>
      <FlatList
        data={user.paymentHistory}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.text}>Amount: {item.amount}</Text>
            <Text style={styles.text}>Date: {item.date}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

// Navigation Setup
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SearchFilter" component={SearchFilterScreen} />
        <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
