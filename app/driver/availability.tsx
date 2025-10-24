import MapMock from '@/components/common/MapMock';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

export default function Availability() {
  const [online, setOnline] = useState(false);
  const [status, setStatus] = useState<'online' | 'on_break' | 'maintenance'>('online');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver availability</Text>
      <View style={styles.rowBetween}>
        <Text>Go Online</Text>
        <Switch value={online} onValueChange={setOnline} />
      </View>
      <View style={styles.rowBetween}>
        <Text>Status</Text>
        <View style={styles.statusRow}>
          {(['online', 'on_break', 'maintenance'] as const).map((s) => (
            <Pressable key={s} onPress={() => setStatus(s)} style={[styles.pill, status === s && styles.pillActive]}>
              <Text style={[styles.pillText, status === s && styles.pillTextActive]}>{s.replace('_', ' ')}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <MapMock title="Assigned route & passengers (mock)" pins={[{ id: 'r', label: 'Route r1' }, { id: 'p1', label: 'Token 42' }, { id: 'p2', label: 'Token 19' }]} />
      <View style={styles.rowBetween}>
        <Link href="/driver/passenger-list" asChild>
          <Pressable style={styles.cta}><Text style={styles.ctaText}>Passenger Tokens</Text></Pressable>
        </Link>
        <Link href="/driver/reconciliation" asChild>
          <Pressable style={styles.ctaAlt}><Text style={styles.ctaAltText}>Reconcile Trip</Text></Pressable>
        </Link>
      </View>
      <Text style={styles.hint}>Offline-first: telemetry queued and synced later (mock).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '800' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusRow: { flexDirection: 'row', gap: 8 },
  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, borderWidth: 1, borderColor: '#d1d5db', marginLeft: 6 },
  pillActive: { backgroundColor: '#111827', borderColor: '#111827' },
  pillText: { color: '#111827' },
  pillTextActive: { color: 'white' },
  cta: { backgroundColor: '#111827', padding: 12, borderRadius: 10 },
  ctaText: { color: 'white', fontWeight: '700' },
  ctaAlt: { backgroundColor: '#e5e7eb', padding: 12, borderRadius: 10 },
  ctaAltText: { color: '#111827', fontWeight: '700' },
  hint: { color: '#6b7280' },
});
