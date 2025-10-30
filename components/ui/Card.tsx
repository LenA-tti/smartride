/*
 * REACT NATIVE CARD COMPONENT
 * ===========================
 * Drop-in replacement for Shadcn Card
 * 
 * Usage:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     Content here
 *   </CardContent>
 * </Card>
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string; // Ignored, for web compatibility
}

export function Card({ children, style, className }: CardProps) {
  const { theme, themeColors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme === 'dark' ? themeColors.surface : '#FFFFFF',
          borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children, style, className }: CardProps) {
  return (
    <View style={[styles.cardHeader, style]}>
      {children}
    </View>
  );
}

export function CardTitle({ children, style, className }: CardProps & { style?: TextStyle }) {
  const { themeColors } = useTheme();

  return (
    <Text style={[styles.cardTitle, { color: themeColors.text }, style]}>
      {children}
    </Text>
  );
}

export function CardDescription({ children, style, className }: CardProps & { style?: TextStyle }) {
  const { themeColors } = useTheme();

  return (
    <Text style={[styles.cardDescription, { color: themeColors.textSecondary }, style]}>
      {children}
    </Text>
  );
}

export function CardContent({ children, style, className }: CardProps) {
  return (
    <View style={[styles.cardContent, style]}>
      {children}
    </View>
  );
}

export function CardFooter({ children, style, className }: CardProps) {
  return (
    <View style={[styles.cardFooter, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  cardFooter: {
    padding: 16,
    paddingTop: 0,
    flexDirection: 'row',
    gap: 8,
  },
});
