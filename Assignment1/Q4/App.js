import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  const renderTab = () => {
    switch (selectedTab) {
      case 'Dashboard':
        return <DashboardScreen />;
      case 'AddExpense':
        return <AddExpenseScreen />;
      case 'Transactions':
        return <TransactionsScreen />;
      case 'Reports':
        return <ReportsScreen />;
      case 'Budget':
        return <BudgetScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>{renderTab()}</ScrollView>
      <View style={styles.navbar}>
        {['Dashboard', 'AddExpense', 'Transactions', 'Reports', 'Budget', 'Profile'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
            <Text style={styles.navText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Dashboard Screen
const DashboardScreen = () => (
  <View style={styles.card}>
    <Text style={styles.title}>Dashboard Overview</Text>
    <View style={styles.infoBox}>
      <Text style={styles.infoText}>💰 Income: $5000</Text>
      <Text style={styles.infoText}>🧾 Expenses: $3000</Text>
      <Text style={styles.infoText}>💼 Balance: $2000</Text>
    </View>
  </View>
);

// Add Expense Screen
const AddExpenseScreen = () => (
  <View style={styles.section}>
    <Text style={styles.title}>Add New Expense</Text>
    <TextInput placeholder="Amount" style={styles.input} />
    <TextInput placeholder="Category" style={styles.input} />
    <TextInput placeholder="Date (YYYY-MM-DD)" style={styles.input} />
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Add Expense</Text>
    </TouchableOpacity>
  </View>
);

// Transactions Screen
const TransactionsScreen = () => {
  const data = [
    { id: '1', type: 'Expense', category: 'Food', amount: '$25' },
    { id: '2', type: 'Income', category: 'Salary', amount: '$2000' },
  ];
  return (
    <View>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.type}: {item.category}</Text>
            <Text>{item.amount}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

// Reports Screen
const ReportsScreen = () => (
  <View>
    <Text style={styles.title}>Reports & Analytics</Text>
    <View style={styles.reportBox}>
      <Text style={styles.graph}>📊</Text>
      <Text>Graphs and Spending Trends will be here.</Text>
    </View>
  </View>
);

// Budget Screen
const BudgetScreen = () => (
  <View style={styles.section}>
    <Text style={styles.title}>Budget Settings</Text>
    <TextInput placeholder="Monthly Budget ($)" style={styles.input} />
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Save Budget</Text>
    </TouchableOpacity>
  </View>
);

// Profile Screen
const ProfileScreen = () => (
  <View style={styles.profileCard}>
    <Text style={styles.title}>User Profile</Text>
    <Text>Name: Jane Doe</Text>
    <Text>Email: jane@example.com</Text>
    <Text>Theme: Sky Blue</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#87ceeb',
    paddingVertical: 10,
  },
  navText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4682b4',
    marginBottom: 15,
  },
  input: {
    borderColor: '#87ceeb',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#87ceeb',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listItem: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 6,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    backgroundColor: '#f5faff',
    padding: 15,
    borderRadius: 10,
  },
  card: {
    backgroundColor: '#e6f7ff',
    padding: 20,
    borderRadius: 10,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  reportBox: {
    backgroundColor: '#f0f8ff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  graph: {
    fontSize: 40,
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: '#f0ffff',
    padding: 20,
    borderRadius: 10,
  },
});

export default App;
