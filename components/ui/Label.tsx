/*
 * REACT NATIVE LABEL COMPONENT
 * =============================
 * Drop-in replacement for Shadcn Label
 */

import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string; // Ignored, for web compatibility
  style?: TextStyle;
  className?: string; // Ignored
}

export function Label({ children, htmlFor, style, className }: LabelProps) {
  const { themeColors } = useTheme();

  return (
    <Text style={[styles.label, { color: themeColors.text }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
});
