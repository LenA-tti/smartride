import { Colors } from '@/constants/theme';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> {/* Apply theme background */}
      <Text style={[styles.title, { color: theme.text }]}>SmartRide</Text>
      <Text style={[styles.subtitle, { color: theme.icon }]}>Choose a flow to explore:</Text>

      <View style={styles.cardRow}>
        <Link href="/passenger/home" asChild>
          <Pressable style={[styles.card, { backgroundColor: theme.tint }]}>
            <Text style={[styles.cardTitle, { color: theme.background }]}>Passenger</Text>
            <Text style={[styles.cardText, { color: theme.background }]}>Map-first search, boarding, and payment</Text>
          </Pressable>
        </Link>
        <Link href="/driver/availability" asChild>
          <Pressable style={[styles.card, { backgroundColor: theme.tint }]}>
            <Text style={[styles.cardTitle, { color: theme.background }]}>Driver</Text>
            <Text style={[styles.cardText, { color: theme.background }]}>Availability, tokens list, reconciliation</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.cardRow}>
        <Link href="/admin/dashboard" asChild>
          <Pressable style={[styles.card, { backgroundColor: theme.tint }]}>
            <Text style={[styles.cardTitle, { color: theme.background }]}>Owner Admin</Text>
            <Text style={[styles.cardText, { color: theme.background }]}>Fleet, routes, and payouts overview</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#132440' },
  subtitle: { color: '#84994F', marginBottom: 16 },
  cardRow: { flexDirection: 'row', gap: 12 },
  card: { flex: 1, borderRadius: 12, backgroundColor: '#DD0303', padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#EBEBEB' },
  cardText: { color: '#EBEBEB' },
});
