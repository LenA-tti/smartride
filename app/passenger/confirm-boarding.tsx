import MapMock from '@/components/common/MapMock';
import { useApp } from '@/context/AppContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function genToken() {
  const n = Math.floor(Math.random() * 90) + 10;
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  return `${n}${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}`;
}

export default function ConfirmBoarding() {
  const router = useRouter();
  const params = useLocalSearchParams<{ vid?: string }>();
  const [countdown, setCountdown] = useState(30);
  const { lastBoardingToken, setLastBoardingToken } = useApp();
  const token = useMemo(() => lastBoardingToken ?? genToken(), []);

  React.useEffect(() => {
    const id = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 30)), 1000);
    return () => clearInterval(id);
  }, []);

  const onConfirm = () => {
    setLastBoardingToken(token);
    router.push('/passenger/trip');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm intent to board</Text>
      <Text>Vehicle ID: {params.vid ?? 'unknown'}</Text>
      <MapMock title="Meet point and vehicle" pins={[{ id: 'p', label: 'You', color: '#059669' }, { id: 'v', label: 'Combi r1' }]} />
      <View style={styles.tokenBox}>
        <Text style={styles.token}>{token}</Text>
        <Text style={styles.tokenHint}>Show or say this token to the driver. Refreshes in {countdown}s.</Text>
      </View>
      <Pressable style={styles.cta} onPress={onConfirm}>
        <Text style={styles.ctaText}>Confirm Boarding</Text>
      </Pressable>
      <Pressable style={styles.cancel} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '800' },
  tokenBox: { borderWidth: 1, borderColor: '#e5e7eb', padding: 12, borderRadius: 12 },
  token: { fontSize: 32, fontWeight: '900' },
  tokenHint: { color: '#6b7280' },
  cta: { backgroundColor: '#111827', padding: 14, borderRadius: 10, alignItems: 'center' },
  ctaText: { color: 'white', fontWeight: '700' },
  cancel: { padding: 12, alignItems: 'center' },
  cancelText: { color: '#6b7280' },
});
