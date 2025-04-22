import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 


const JobListScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobsFromAPI = async () => {
    try {
      const response = await fetch('http://<YOUR-IP>:5000/api/jobs'); // replace with your server IP
      const data = await response.json();
      setJobs(data);
      await AsyncStorage.setItem('jobData', JSON.stringify(data));
    } catch (error) {
      console.error('API Fetch Failed:', error);
      Alert.alert('Offline Mode', 'Could not connect. Showing saved data.');
      const storedJobs = await AsyncStorage.getItem('jobData');
      if (storedJobs) setJobs(JSON.parse(storedJobs));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobsFromAPI();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#ffffff" style={{ flex: 1 }} />;

  if (!jobs.length) return <Text style={styles.emptyText}>No jobs available</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={item => item.id?.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.jobCard}
            onPress={() => navigation.navigate('JobDetails', { job: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.company}>{item.company || "Unknown Company"}</Text>
            <Text style={styles.location}>{item.location || "Location not provided"}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  jobCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 16,
    color: '#555',
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
  emptyText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#fff',
  },
});


export default JobListScreen;
