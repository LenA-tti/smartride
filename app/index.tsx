import { useApp } from '@/context/AppContext';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Entry() {
  const { setRole } = useApp();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartRide Prototype</Text>
      <Text style={styles.subtitle}>Choose a flow to explore mock screens</Text>

      <View style={styles.cardRow}>
        <Link href={"/passenger/home" as unknown as any} asChild>
          <Pressable style={styles.card} onPress={() => setRole('passenger')}>
            <Text style={styles.cardTitle}>Passenger</Text>
            <Text style={styles.cardText}>Map-first search, boarding, and payment</Text>
          </Pressable>
        </Link>
        <Link href={"/driver/availability" as unknown as any} asChild>
          <Pressable style={styles.card} onPress={() => setRole('driver')}>
            <Text style={styles.cardTitle}>Driver</Text>
            <Text style={styles.cardText}>Availability, tokens list, reconciliation</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.cardRow}>
        <Link href={"/admin/dashboard" as unknown as any} asChild>
          <Pressable style={styles.card} onPress={() => setRole('admin')}>
            <Text style={styles.cardTitle}>Owner Admin</Text>
            <Text style={styles.cardText}>Fleet, routes, and payouts overview</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16, backgroundColor: '#f9fafb' },
  title: { fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#6b7280' },
  cardRow: { flexDirection: 'row', gap: 12 },
  card: { flex: 1, borderRadius: 12, backgroundColor: 'white', padding: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  cardText: { color: '#374151' },
});
