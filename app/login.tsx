import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SmartRide</Text>
      <Text style={styles.subtitle}>Select your role to continue:</Text>

      <Pressable style={[styles.button, styles.passenger]} onPress={() => router.push('/passenger/home' as any)}>
        <Text style={styles.buttonText}>Passenger</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.driver]} onPress={() => router.push('/driver/availability' as any)}>
        <Text style={styles.buttonText}>Driver</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.admin]} onPress={() => router.push('/admin/dashboard' as any)}>
        <Text style={styles.buttonText}>Admin</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EBEBEB', padding: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#132440', marginBottom: 16 },
  subtitle: { fontSize: 16, color: '#84994F', marginBottom: 32 },
  button: { width: '80%', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  passenger: { backgroundColor: '#DD0303' },
  driver: { backgroundColor: '#84994F' },
  admin: { backgroundColor: '#132440' },
  buttonText: { color: '#EBEBEB', fontSize: 18, fontWeight: '600' },
});