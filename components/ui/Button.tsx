/*
 * REACT NATIVE BUTTON COMPONENT
 * ==============================
 * Drop-in replacement for Shadcn Button
 * 
 * Usage (same as web version):
 * <Button onPress={handleClick} variant="outline" size="lg">
 *   Click Me
 * </Button>
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  onClick?: () => void; // Alias for web compatibility
  variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  className?: string; // Ignored, for web compatibility
}

export function Button({
  children,
  onPress,
  onClick,
  variant = 'default',
  size = 'md',
  disabled,
  loading,
  style,
  className, // Ignored
}: ButtonProps) {
  const { theme, themeColors } = useTheme();

  const handlePress = onPress || onClick;

  const getButtonStyle = (): ViewStyle => {
    const baseStyle = styles[`size_${size}`] || styles.size_md;
    
    switch (variant) {
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme === 'dark' ? themeColors.accent1 : themeColors.primary,
        };
      case 'destructive':
        return {
          ...baseStyle,
          backgroundColor: '#EF4444',
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      case 'link':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          paddingHorizontal: 0,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: theme === 'dark' ? themeColors.accent1 : themeColors.primary,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    let color = '#FFFFFF';
    
    if (variant === 'outline' || variant === 'ghost') {
      color = theme === 'dark' ? themeColors.text : themeColors.primary;
    } else if (variant === 'link') {
      color = theme === 'dark' ? themeColors.accent1 : themeColors.primary;
    }
    
    return {
      color,
      fontSize: size === 'sm' ? 14 : size === 'lg' ? 18 : 16,
      fontWeight: '600',
    };
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      style={[
        styles.button,
        getButtonStyle(),
        (disabled || loading) && styles.buttonDisabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'ghost' 
            ? (theme === 'dark' ? themeColors.text : themeColors.primary)
            : '#FFFFFF'
          } 
        />
      ) : (
        <Text style={getTextStyle()}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  size_sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  size_md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  size_lg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  size_icon: {
    width: 40,
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
