import MapMock from '@/components/common/MapMock';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TripView() {
  const router = useRouter();
  const { lastBoardingToken } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>On-trip view</Text>
      <Text>Boarding token: {lastBoardingToken ?? '—'}</Text>
      <MapMock title="Live trip (mock)" pins={[{ id: 'v', label: 'Vehicle' }, { id: 'p', label: 'You', color: '#059669' }, { id: 's', label: 'Next stop' }]} height={260} />
      <View style={styles.row}>
        <Pressable style={[styles.button, styles.buttonAlt]} onPress={() => {}}>
          <Text style={[styles.btnText, styles.btnTextAlt]}>Share ETA</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.buttonWarn]} onPress={() => {}}>
          <Text style={styles.btnText}>Request Stop</Text>
        </Pressable>
      </View>
      <Pressable style={styles.cta} onPress={() => router.push('/passenger/payment')}>
        <Text style={styles.ctaText}>I Have Arrived</Text>
      </Pressable>
      <Text style={styles.hint}>If you forget to end, the system will prompt based on geofence (mock).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '800' },
  row: { flexDirection: 'row', gap: 10 },
  button: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center' },
  buttonAlt: { backgroundColor: '#e5e7eb' },
  buttonWarn: { backgroundColor: '#ef4444' },
  btnText: { color: 'white', fontWeight: '700' },
  btnTextAlt: { color: '#111827' },
  cta: { backgroundColor: '#111827', padding: 14, borderRadius: 10, alignItems: 'center' },
  ctaText: { color: 'white', fontWeight: '700' },
  hint: { color: '#6b7280' },
});
