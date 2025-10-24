import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Reconciliation() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip closing & reconciliation (mock)</Text>
      <View style={styles.card}>
        <Text>Total passengers: 12</Text>
        <Text>Total fare collected: 96 Pula</Text>
        <Text>Occupancy peak: 88%</Text>
      </View>
      <Pressable style={styles.cta} onPress={() => {}}>
        <Text style={styles.ctaText}>End Trip</Text>
      </Pressable>
      <Text style={styles.hint}>Dispute button available to both driver and passenger (mock).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '800' },
  card: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, backgroundColor: 'white' },
  cta: { backgroundColor: '#111827', padding: 14, borderRadius: 10, alignItems: 'center' },
  ctaText: { color: 'white', fontWeight: '700' },
  hint: { color: '#6b7280' },
});
