/*
 * REACT NATIVE INPUT COMPONENT
 * =============================
 * Drop-in replacement for Shadcn Input
 * 
 * Usage:
 * <Input
 *   value={email}
 *   onChangeText={setEmail}
 *   placeholder="Email"
 *   type="email"  // Maps to keyboardType
 * />
 */

import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface InputProps extends Omit<TextInputProps, 'onChange'> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  onChange?: (e: any) => void; // For web compatibility
  onChangeText?: (text: string) => void;
  className?: string; // Ignored, for web compatibility
  style?: ViewStyle;
}

export function Input({
  type = 'text',
  onChange,
  onChangeText,
  className, // Ignored
  style,
  ...props
}: InputProps) {
  const { theme, themeColors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  // Map type to React Native keyboardType
  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      case 'tel':
        return 'phone-pad';
      default:
        return 'default';
    }
  };

  // Handle web onChange format
  const handleChange = (text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
    if (onChange) {
      // Simulate web event object
      onChange({ target: { value: text } } as any);
    }
  };

  return (
    <TextInput
      {...props}
      onChangeText={handleChange}
      keyboardType={getKeyboardType()}
      autoCapitalize={type === 'email' ? 'none' : props.autoCapitalize}
      secureTextEntry={type === 'password'}
      onFocus={(e) => {
        setIsFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        props.onBlur?.(e);
      }}
      style={[
        styles.input,
        {
          borderColor: isFocused 
            ? (theme === 'dark' ? themeColors.accent1 : themeColors.primary)
            : (theme === 'dark' ? '#374151' : '#D1D5DB'),
          backgroundColor: theme === 'dark' ? themeColors.surface : '#FFFFFF',
          color: themeColors.text,
        },
        style,
      ]}
      placeholderTextColor={theme === 'dark' ? '#6B7280' : '#9CA3AF'}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
