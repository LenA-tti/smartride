
import BottomSheet from '@/components/passenger/BottomSheet';
import Map from '@/components/passenger/MapView';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function PassengerHome() {

  return (
    <View style={styles.container}>
      <Map />
      <BottomSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
});
