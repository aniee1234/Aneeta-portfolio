import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState('');

  useEffect(() => {
    fetch('https://mocki.io/v1/5a4b71f7-0d97-4a84-89df-6f5c5fb9d9a5') // Replace with your API
      .then(response => response.json())
      .then(data => {
        setRestaurants(data);
        setFilteredRestaurants(data);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
      });
  }, []);

  const handleFilter = (text) => {
    setCuisineFilter(text);
    if (text === '') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(item =>
        item.cuisine.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  };

  return (
    <View style={styles.screenContent}>
      <Text style={styles.screenTitle}>Restaurants</Text>
      <TextInput 
        style={styles.searchInput}
        placeholder="Filter by cuisine type..."
        placeholderTextColor="#ff69b4"
        value={cuisineFilter}
        onChangeText={handleFilter}
      />
      <FlatList
        data={filteredRestaurants}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.name}</Text>
            <Text style={styles.cuisineText}>Cuisine: {item.cuisine}</Text>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: 'bold',
  },
  cuisineText: {
    fontSize: 16,
    color: '#ff1493',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 14,
    color: '#db7093',
    marginTop: 2,
  },
});

export default HomeScreen;
