import MapMock from '@/components/common/MapMock';
import { useApp } from '@/context/AppContext';
import { matchVehicles } from '@/lib/matching';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

export default function PassengerHome() {
  const router = useRouter();
  const { setSelectedCandidate } = useApp();
  const [destination, setDestination] = useState<string>('ABSA Broadhurst');
  const [radius, setRadius] = useState<number>(200);
  const [includeTaxis, setIncludeTaxis] = useState<boolean>(false);

  const origin: [number, number] = useMemo(() => [-24.616, 25.930], []); // Tsholofelo mock
  const destCoords: [number, number] = useMemo(() => [-24.6295, 25.944], []); // ABSA mock

  const onSearch = () => {
    const candidates = matchVehicles({ origin, destination: destCoords, radius_m: radius, include_taxis: includeTaxis });
    // Save the top candidate for quick demo; the list screen will read from matching again
    setSelectedCandidate(candidates[0]);
    router.push('/passenger/results');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Where to?</Text>
      <TextInput value={destination} onChangeText={setDestination} placeholder="Enter destination" style={styles.input} />
      <View style={styles.rowBetween}>
        <Text>Search radius: {radius}m</Text>
        <View style={styles.radiusButtons}>
          {[100, 200, 350].map((r) => (
            <Pressable key={r} style={[styles.pill, radius === r && styles.pillActive]} onPress={() => setRadius(r)}>
              <Text style={[styles.pillText, radius === r && styles.pillTextActive]}>{r}m</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.rowBetween}>
        <Text>Include mobile taxis</Text>
        <Switch value={includeTaxis} onValueChange={setIncludeTaxis} />
      </View>

      <MapMock title="Nearby combis and taxis" pins={[{ id: 'you', label: 'You', color: '#059669' }, { id: 'v1', label: 'r1: 3 min' }, { id: 'v2', label: 'r2: 6 min' }]} />

      <Pressable style={styles.cta} onPress={onSearch}>
        <Text style={styles.ctaText}>Show Options</Text>
      </Pressable>
      <Text style={styles.hint}>If geocoding fails, you will be able to drop a pin manually (mock).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '800' },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  radiusButtons: { flexDirection: 'row', gap: 8 },
  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, borderWidth: 1, borderColor: '#d1d5db' },
  pillActive: { backgroundColor: '#111827', borderColor: '#111827' },
  pillText: { color: '#111827' },
  pillTextActive: { color: 'white' },
  cta: { marginTop: 8, backgroundColor: '#111827', borderRadius: 10, padding: 14, alignItems: 'center' },
  ctaText: { color: 'white', fontWeight: '700' },
  hint: { color: '#6b7280' },
});
