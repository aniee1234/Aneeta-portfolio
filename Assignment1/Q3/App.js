// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';

// Home Screen (List of available events, movies, flights)
const HomeScreen = ({ navigation }) => {
  const categories = ['Movies', 'Events', 'Flights'];

  return (
    <View style={{ padding: 20 }}>
      <Text>Home Screen</Text>
      <Text>Select a category:</Text>
      {categories.map((category, index) => (
        <Button key={index} title={category} onPress={() => navigation.navigate('SearchFilter', { category })} />
      ))}
    </View>
  );
};

// Search & Filter Screen (Find specific events or locations)
const SearchFilterScreen = ({ route, navigation }) => {
  const { category } = route.params;
  return (
    <View style={{ padding: 20 }}>
      <Text>{category} Search & Filter Screen</Text>
      <TextInput placeholder="Search..." style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }} />
      <Button title="Search" onPress={() => navigation.navigate('BookingDetails')} />
    </View>
  );
};

// Booking Details Screen (Select seats, showtime, pricing)
const BookingDetailsScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 20 }}>
      <Text>Booking Details Screen</Text>
      <Text>Select Seats</Text>
      <Text>Select Showtime</Text>
      <Text>Price: $20</Text>
      <Button title="Proceed to Payment" onPress={() => navigation.navigate('Payment')} />
    </View>
  );
};

// Payment Screen (Choose payment method, apply discounts)
const PaymentScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 20 }}>
      <Text>Payment Screen</Text>
      <TextInput placeholder="Enter discount code" style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }} />
      <Button title="Pay Now" onPress={() => navigation.navigate('MyBookings')} />
    </View>
  );
};

// My Bookings Screen (Upcoming & past bookings)
const MyBookingsScreen = () => {
  const bookings = [
    { id: '1', title: 'Movie A', date: '2025-03-10', status: 'Upcoming' },
    { id: '2', title: 'Event B', date: '2025-03-12', status: 'Upcoming' },
    { id: '3', title: 'Flight C', date: '2025-03-15', status: 'Past' },
  ];

  return (
    <View style={{ padding: 20 }}>
      <Text>My Bookings Screen</Text>
      <FlatList
        data={bookings}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>{item.title}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// Profile & Settings Screen (User details, payment history)
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
    <View style={{ padding: 20 }}>
      <Text>Profile & Settings Screen</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Payment History:</Text>
      <FlatList
        data={user.paymentHistory}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>Amount: {item.amount}</Text>
            <Text>Date: {item.date}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <Button title="Edit Profile" onPress={() => {}} />
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
