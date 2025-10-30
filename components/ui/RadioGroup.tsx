/*
 * REACT NATIVE RADIO GROUP COMPONENT
 * ===================================
 * Drop-in replacement for Shadcn RadioGroup
 * 
 * Usage:
 * <RadioGroup value={selected} onValueChange={setSelected}>
 *   <RadioGroupItem value="option1" label="Option 1" />
 *   <RadioGroupItem value="option2" label="Option 2" />
 * </RadioGroup>
 */

import React, { createContext, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface RadioGroupContextValue {
  value: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroupItem must be used within RadioGroup');
  }
  return context;
}

interface RadioGroupProps {
  children: React.ReactNode;
  value: string;
  onValueChange?: (value: string) => void;
  style?: ViewStyle;
  className?: string; // Ignored
}

export function RadioGroup({ children, value, onValueChange, style, className }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <View style={[styles.radioGroup, style]}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps {
  value: string;
  label?: string;
  id?: string; // Ignored
  style?: ViewStyle;
  className?: string; // Ignored
}

export function RadioGroupItem({ value, label, id, style, className }: RadioGroupItemProps) {
  const { value: selectedValue, onValueChange } = useRadioGroupContext();
  const { theme, themeColors } = useTheme();
  const isSelected = selectedValue === value;

  return (
    <TouchableOpacity
      onPress={() => onValueChange?.(value)}
      style={[styles.radioItem, style]}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.radioCircle,
          {
            borderColor: isSelected
              ? (theme === 'dark' ? themeColors.accent1 : themeColors.primary)
              : (theme === 'dark' ? '#6B7280' : '#D1D5DB'),
          },
        ]}
      >
        {isSelected && (
          <View
            style={[
              styles.radioCircleInner,
              {
                backgroundColor: theme === 'dark' ? themeColors.accent1 : themeColors.primary,
              },
            ]}
          />
        )}
      </View>
      {label && (
        <Text style={[styles.radioLabel, { color: themeColors.text }]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  radioGroup: {
    gap: 12,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioLabel: {
    fontSize: 14,
  },
});
