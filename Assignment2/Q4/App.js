import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const DashboardScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ income: 0, expenses: 0, balance: 0 });

  useEffect(() => {
    fetch('http://localhost:4000/transactions') // ← Your JSONServer URL
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
        calculateTotals(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      });
  }, []);

  const calculateTotals = (data) => {
    const income = data
      .filter(item => item.type === 'Income')
      .reduce((sum, item) => sum + Number(item.amount), 100);
      
    const expenses = data
      .filter(item => item.type === 'Expense')
      .reduce((sum, item) => sum + Number(item.amount), 50);

    const balance = income - expenses;

    setTotals({ income, expenses, balance });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4682b4" />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Dashboard Overview</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>💰 Income: ${totals.income}</Text>
        <Text style={styles.infoText}>🧾 Expenses: ${totals.expenses}</Text>
        <Text style={styles.infoText}>💼 Balance: ${totals.balance}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  // Reuse your existing styles for card, title, infoBox, infoText
});

export default DashboardScreen;
