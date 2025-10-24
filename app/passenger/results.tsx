import { matchVehicles } from '@/lib/matching';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Results() {
  const router = useRouter();
  const origin = useMemo<[number, number]>(() => [-24.616, 25.930], []);
  const destCoords = useMemo<[number, number]>(() => [-24.6295, 25.944], []);
  const candidates = matchVehicles({ origin, destination: destCoords, radius_m: 200, include_taxis: true });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Options to destination</Text>
      <FlatList
        data={candidates}
        keyExtractor={(item) => item.vehicle.id}
        renderItem={({ item }) => (
          <View style={[styles.card, item.is_over_capacity && styles.cardDisabled]}>
            <View style={styles.rowBetween}>
              <Text style={styles.routeName}>{item.route?.name ?? 'Mobile Taxi'}</Text>
              <Text>{item.fare_estimate} Pula</Text>
            </View>
            <Text style={styles.small}>ETA pickup {item.eta_to_pickup_min}m • ETA destination {item.eta_to_destination_min}m</Text>
            <Text style={styles.small}>Occupancy {item.occupancy_pct}%</Text>
            <View style={styles.rowBetween}>
              <Text style={[styles.badge, item.will_pass_near_destination ? styles.badgeOk : styles.badgeWarn]}>
                {item.will_pass_near_destination ? 'Passes near destination' : 'Direct (taxi)'}
              </Text>
              <Pressable
                style={[styles.cta, item.is_over_capacity && styles.ctaDisabled]}
                disabled={item.is_over_capacity}
                onPress={() => router.push({ pathname: '/passenger/confirm-boarding', params: { vid: item.vehicle.id } })}
              >
                <Text style={styles.ctaText}>{item.route ? 'Board This Combi' : 'Select Taxi'}</Text>
              </Pressable>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 8 },
  card: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, backgroundColor: 'white' },
  cardDisabled: { opacity: 0.5 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  routeName: { fontWeight: '700' },
  small: { color: '#6b7280', marginTop: 4 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, fontSize: 12, overflow: 'hidden' },
  badgeOk: { backgroundColor: '#dcfce7', color: '#166534' },
  badgeWarn: { backgroundColor: '#fee2e2', color: '#991b1b' },
  cta: { backgroundColor: '#111827', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
  ctaDisabled: { backgroundColor: '#9ca3af' },
  ctaText: { color: 'white', fontWeight: '700' },
});
