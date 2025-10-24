import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface QRMockProps {
  value: string;
  label?: string;
}

export const QRMock: React.FC<QRMockProps> = ({ value, label = 'Driver QR (mock)' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.qrBox}>
        <Text style={styles.qrText}>{value}</Text>
      </View>
      <Text style={styles.hint}>Scanning this in the prototype simulates fallback payment + boarding.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12, backgroundColor: 'white' },
  label: { fontWeight: '600', marginBottom: 8 },
  qrBox: { height: 160, borderWidth: 2, borderStyle: 'dashed', borderColor: '#9ca3af', alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
  qrText: { fontSize: 24, fontWeight: '700', color: '#111827' },
  hint: { fontSize: 12, color: '#6b7280', marginTop: 8 },
});

export default QRMock;
