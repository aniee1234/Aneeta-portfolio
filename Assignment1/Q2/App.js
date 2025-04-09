import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const posts = [
  {
    id: '1',
    user: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    caption: 'Beautiful sunset at the beach!',
  },
  {
    id: '2',
    user: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
    caption: 'Morning vibes with coffee ☕',
  },
];

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Feed')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const FeedScreen = ({ navigation }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.userContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.user}>{item.user}</Text>
          </View>
          <Image source={{ uri: item.image }} style={styles.postImage} />
          <Text style={styles.caption}>{item.caption}</Text>
        </View>
      )}
    />
  );
};

const CreatePostScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.postImage} />}
      <TextInput placeholder="Write a caption..." style={styles.input} value={caption} onChangeText={setCaption} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>User Profile</Text>
      <Text style={styles.description}>This is the user's bio and details.</Text>
    </View>
  );
};

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Chat</Text>
      <Text style={styles.description}>Direct messaging UI coming soon!</Text>
    </View>
  );
};

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Notifications</Text>
      <Text style={styles.description}>Recent activities and friend requests.</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  user: {
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  caption: {
    marginTop: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default App;
