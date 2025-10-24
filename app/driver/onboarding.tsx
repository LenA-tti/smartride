import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function DriverOnboarding() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver registration & KYC (mock)</Text>
      <TextInput placeholder="Phone number" style={styles.input} defaultValue="+2677…" />
      <TextInput placeholder="Vehicle plate" style={styles.input} defaultValue="B 123 ABC" />
      <TextInput placeholder="Capacity" style={styles.input} defaultValue="16" />
      <TextInput placeholder="Assigned route" style={styles.input} defaultValue="Broadhurst Corridor" />
      <Pressable style={styles.cta} onPress={() => router.replace('/driver/availability')}>
        <Text style={styles.ctaText}>Submit for Verification</Text>
      </Pressable>
      <Text style={styles.hint}>Admin verification required before going online (mock).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '800' },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12 },
  cta: { backgroundColor: '#111827', padding: 14, borderRadius: 10, alignItems: 'center' },
  ctaText: { color: 'white', fontWeight: '700' },
  hint: { color: '#6b7280' },
});
