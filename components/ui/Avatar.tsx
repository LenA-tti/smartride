/*
 * REACT NATIVE AVATAR COMPONENT
 * ==============================
 * Drop-in replacement for Shadcn Avatar
 * 
 * Usage:
 * <Avatar>
 *   <AvatarImage source={{ uri: 'https://...' }} />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 */

import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface AvatarProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string; // Ignored
}

interface AvatarImageProps {
  src?: string; // Web compatibility
  source?: ImageSourcePropType;
  alt?: string; // Ignored
  style?: ViewStyle;
  className?: string; // Ignored
}

interface AvatarFallbackProps {
  children: React.ReactNode;
  style?: TextStyle;
  className?: string; // Ignored
}

export function Avatar({ children, style, className }: AvatarProps) {
  return (
    <View style={[styles.avatar, style]}>
      {children}
    </View>
  );
}

export function AvatarImage({ src, source, alt, style, className }: AvatarImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;

  const imageSource = source || (src ? { uri: src } : undefined);

  if (!imageSource) return null;

  return (
    <Image
      source={imageSource}
      style={[styles.avatarImage, style]}
      onError={() => setHasError(true)}
    />
  );
}

export function AvatarFallback({ children, style, className }: AvatarFallbackProps) {
  const { theme, themeColors } = useTheme();

  return (
    <View 
      style={[
        styles.avatarFallback, 
        { backgroundColor: theme === 'dark' ? themeColors.surface : '#E5E7EB' }
      ]}
    >
      <Text 
        style={[
          styles.avatarFallbackText, 
          { color: themeColors.text },
          style
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallbackText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
