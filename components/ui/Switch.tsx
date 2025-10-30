/*
 * REACT NATIVE SWITCH COMPONENT
 * ==============================
 * Drop-in replacement for Shadcn Switch
 * 
 * Usage:
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 */

import React from 'react';
import { Switch as RNSwitch } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string; // Ignored
}

export function Switch({ checked, onCheckedChange, disabled, className }: SwitchProps) {
  const { theme, themeColors } = useTheme();

  return (
    <RNSwitch
      value={checked}
      onValueChange={onCheckedChange}
      disabled={disabled}
      trackColor={{
        false: theme === 'dark' ? '#374151' : '#D1D5DB',
        true: theme === 'dark' ? themeColors.accent1 : themeColors.primary,
      }}
      thumbColor={checked ? '#FFFFFF' : '#F3F4F6'}
      ios_backgroundColor={theme === 'dark' ? '#374151' : '#D1D5DB'}
    />
  );
}
