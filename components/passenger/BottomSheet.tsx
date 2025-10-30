
import { useApp } from '@/context/AppContext';
import { matchVehicles } from '@/lib/matching';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TextInput, Pressable, Switch } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';


const BottomSheet = () => {
    const router = useRouter();
    const { setSelectedCandidate } = useApp();
    const [destination, setDestination] = useState<string>('ABSA Broadhurst');
    const [radius, setRadius] = useState<number>(200);
    const [includeTaxis, setIncludeTaxis] = useState<boolean>(false);

    const origin: [number, number] = useMemo(() => [-24.616, 25.930], []); // Tsholofelo mock
    const destCoords: [number, number] = useMemo(() => [-24.6295, 25.944], []); // ABSA mock

    const onSearch = () => {
        const candidates = matchVehicles({ origin, destination: destCoords, radius_m: radius, include_taxis: includeTaxis });
        setSelectedCandidate(candidates[0]);
        router.push('/passenger/trip-planning/results');
    };


    const { height } = useWindowDimensions()
    const translateY = useSharedValue(0)
    const context = useSharedValue({ y: 0})
    const gesture = Gesture.Pan().onStart(() => {
        context.value = { y: translateY.value }
    }).onUpdate((event) => {
        translateY.value = event.translationY + context.value.y
        translateY.value = Math.max(translateY.value, -height / 1.2)
    })

    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translateY.value}]
        }
    })

  return (
    <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rBottomSheetStyle]}>
            <View style={styles.handle} />
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

            <Pressable style={styles.cta} onPress={onSearch}>
                <Text style={styles.ctaText}>Show Options</Text>
            </Pressable>
        </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -350,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    gap: 12,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  radiusButtons: { flexDirection: 'row', gap: 8 },
  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, borderWidth: 1, borderColor: '#d1d5db' },
  pillActive: { backgroundColor: '#111827', borderColor: '#111827' },
  pillText: { color: '#111827' },
  pillTextActive: { color: 'white' },
  cta: { marginTop: 8, backgroundColor: '#111827', borderRadius: 10, padding: 14, alignItems: 'center' },
  ctaText: { color: 'white', fontWeight: '700' },
});

export default BottomSheet;
