"use client";

import * as React from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from "react-native";

// Minimal RN calendar placeholder to replace react-day-picker (web-only)
// API: expose onPrev/onNext callbacks and title rendering via props for now.

type CalendarProps = {
  monthLabel?: string;
  onPrev?: () => void;
  onNext?: () => void;
  style?: ViewStyle | ViewStyle[];
  headerStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  children?: React.ReactNode; // optional grid content if you want to inject
};

function Calendar({ monthLabel, onPrev, onNext, style, headerStyle, titleStyle, children }: CalendarProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.header, headerStyle]}>
        <Pressable onPress={onPrev} style={styles.navBtn} accessibilityLabel="Previous month">
          <Text style={styles.navText}>{"<"}</Text>
        </Pressable>
        <Text style={[styles.title, titleStyle]}>{monthLabel ?? "Calendar"}</Text>
        <Pressable onPress={onNext} style={styles.navBtn} accessibilityLabel="Next month">
          <Text style={styles.navText}>{">"}</Text>
        </Pressable>
      </View>
      <View style={styles.body}>{children ?? <Text style={styles.placeholder}>Calendar grid not implemented yet</Text>}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  navBtn: {
    height: 28,
    width: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#D1D5DB",
  },
  navText: {
    fontSize: 14,
    color: "#111827",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  body: {
    minHeight: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    color: "#6B7280",
    fontSize: 12,
  },
});

export { Calendar };
