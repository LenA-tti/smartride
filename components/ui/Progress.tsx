/*
 * REACT NATIVE PROGRESS COMPONENT
 * ================================
 * Drop-in replacement for Shadcn Progress
 * 
 * Usage:
 * <Progress value={60} />
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface ProgressProps {
  value?: number; // 0-100
  style?: ViewStyle;
  className?: string; // Ignored
}

export function Progress({ value = 0, style, className }: ProgressProps) {
  const { theme, themeColors } = useTheme();

  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <View
      style={[
        styles.progressContainer,
        {
          backgroundColor: theme === 'dark' ? '#374151' : '#E5E7EB',
        },
        style,
      ]}
    >
      <View
        style={[
          styles.progressBar,
          {
            width: `${clampedValue}%`,
            backgroundColor: theme === 'dark' ? themeColors.accent1 : themeColors.primary,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
});
