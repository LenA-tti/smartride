import QRMock from '@/components/common/QRMock';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PaymentReceipt() {
  const router = useRouter();
  const { walletBalance, setWalletBalance, lastBoardingToken } = useApp();
  const fare = 8;

  const onPay = () => {
    setWalletBalance(walletBalance - fare);
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment & receipt</Text>
      <Text style={styles.rowText}>Fare: {fare} Pula</Text>
      <Text style={styles.rowText}>Wallet balance: {walletBalance} Pula</Text>
      <Text style={styles.rowText}>Boarding token: {lastBoardingToken ?? '—'}</Text>
      <Pressable style={styles.cta} onPress={onPay}>
        <Text style={styles.ctaText}>Charge Wallet</Text>
      </Pressable>
      <Text style={styles.divider}>— or if boarding wasn’t confirmed —</Text>
      <QRMock value="QR-DRV-1234" />
      <Text style={styles.hint}>Refunds and disputes available in history (mock).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '800' },
  rowText: { fontSize: 16 },
  cta: { backgroundColor: '#111827', padding: 14, borderRadius: 10, alignItems: 'center' },
  ctaText: { color: 'white', fontWeight: '700' },
  divider: { textAlign: 'center', color: '#6b7280', marginVertical: 8 },
  hint: { color: '#6b7280' },
});
