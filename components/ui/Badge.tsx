/*
 * REACT NATIVE BADGE COMPONENT
 * ============================
 * Drop-in replacement for Shadcn Badge
 * 
 * Usage:
 * <Badge variant="destructive">New</Badge>
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  style?: ViewStyle;
  className?: string; // Ignored
}

export function Badge({ children, variant = 'default', style, className }: BadgeProps) {
  const { theme, themeColors } = useTheme();

  const getBadgeStyle = (): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
          borderWidth: 0,
        };
      case 'destructive':
        return {
          backgroundColor: '#EF4444',
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme === 'dark' ? themeColors.accent1 : themeColors.primary,
        };
      default:
        return {
          backgroundColor: theme === 'dark' ? themeColors.accent1 : themeColors.primary,
          borderWidth: 0,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    if (variant === 'secondary') {
      return { color: themeColors.text };
    }
    if (variant === 'outline') {
      return { color: theme === 'dark' ? themeColors.accent1 : themeColors.primary };
    }
    return { color: '#FFFFFF' };
  };

  return (
    <View style={[styles.badge, getBadgeStyle(), style]}>
      <Text style={[styles.badgeText, getTextStyle()]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
