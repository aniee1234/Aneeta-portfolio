import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, FlatList,
  TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      navigation.navigate('JobList');
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};



const JobListScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  const dummyJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      description: "Work with React and build UIs.",
      requirements: "React, JS, CSS",
      application_link: "https://example.com/apply/frontend"
    },
    {
      id: 2,
      title: "Backend Developer",
      description: "Build REST APIs with Node.js.",
      requirements: "Node.js, Express, MongoDB",
      application_link: "https://example.com/apply/backend"
    },

   
   
  ];
  setJobs(dummyJobs);
  setLoading(false);
}, []);
 

  if (loading) return <ActivityIndicator size="large" color="#ffffff" style={{ flex: 1 }} />;
  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;
  if (jobs.length === 0) return <Text style={styles.infoText}>No job listings available.</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={item => item.id?.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.jobItem}
            onPress={() => navigation.navigate('JobDetails', { job: item })}
          >
            <Text style={styles.jobTitle}>{item.title || `Job Title`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const JobDetailsScreen = ({ route }) => {
  const { job } = route.params || {};

  if (!job || Object.keys(job).length === 0)
    return <Text style={styles.errorText}>No job details available.</Text>;

  return (
    <ScrollView style={styles.detailsContainer} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.jobTitle}>{job.title || "Untitled Job"}</Text>
      <Text style={styles.jobText}>{job.description || "No description provided."}</Text>
      <Text style={styles.jobText}>
        <Text style={styles.boldText}>Requirements:</Text> {job.requirements || "Basic qualifications required."}
      </Text>
      <Text style={styles.jobText}>
        <Text style={styles.boldText}>Apply here:</Text>{' '}
        <Text style={styles.linkText}>{job.application_link || "https://example.com/apply"}</Text>
      </Text>
    </ScrollView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="JobList" component={JobListScreen} />
        <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 10,
    width: '100%',
    borderRadius: 8,
  },
  loginText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: 'white',
  },
  jobItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  jobText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#222',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  boldText: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  infoText: {
    color: '#fff',
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
});
