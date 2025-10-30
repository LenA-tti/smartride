/*
 * REACT NATIVE CHECKBOX COMPONENT
 * ================================
 * Drop-in replacement for Shadcn Checkbox
 * 
 * Usage:
 * <Checkbox
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 * />
 */

import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import { useTheme } from '../ThemeProvider';

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string; // Ignored
  className?: string; // Ignored
}

export function Checkbox({ checked, onCheckedChange, disabled, id, className }: CheckboxProps) {
  const { theme, themeColors } = useTheme();

  return (
    <CheckBox
      value={checked}
      onValueChange={onCheckedChange}
      disabled={disabled}
      tintColors={{
        true: theme === 'dark' ? themeColors.accent1 : themeColors.primary,
        false: theme === 'dark' ? '#6B7280' : '#D1D5DB',
      }}
    />
  );
}
