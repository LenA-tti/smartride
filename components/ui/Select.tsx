/*
 * REACT NATIVE SELECT COMPONENT
 * ==============================
 * Drop-in replacement for Shadcn Select
 * Uses React Native Picker
 * 
 * Usage:
 * <Select value={value} onValueChange={setValue}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select option" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="option1">Option 1</SelectItem>
 *     <SelectItem value="option2">Option 2</SelectItem>
 *   </SelectContent>
 * </Select>
 */

import React, { createContext, useContext, useState } from 'react';
import { View, TouchableOpacity, Text, Modal, FlatList, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';

interface SelectContextValue {
  value: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  placeholder?: string;
  items: Array<{ value: string; label: string }>;
  setItems: (items: Array<{ value: string; label: string }>) => void;
}

const SelectContext = createContext<SelectContextValue | undefined>(undefined);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within Select');
  }
  return context;
}

interface SelectProps {
  children: React.ReactNode;
  value: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  style?: ViewStyle;
}

export function Select({ children, value, onValueChange, defaultValue, style }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Array<{ value: string; label: string }>>([]);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, items, setItems }}>
      <View style={style}>
        {children}
      </View>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, style, className }: { children: React.ReactNode; style?: ViewStyle; className?: string }) {
  const { setOpen } = useSelectContext();
  const { theme, themeColors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => setOpen(true)}
      style={[
        styles.trigger,
        {
          borderColor: theme === 'dark' ? '#374151' : '#D1D5DB',
          backgroundColor: theme === 'dark' ? themeColors.surface : '#FFFFFF',
        },
        style,
      ]}
    >
      {children}
      <Icon name="chevron-down" size={16} color={themeColors.textSecondary} />
    </TouchableOpacity>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value, items } = useSelectContext();
  const { themeColors } = useTheme();

  const selectedItem = items.find((item) => item.value === value);

  return (
    <Text style={[styles.valueText, { color: selectedItem ? themeColors.text : themeColors.textSecondary }]}>
      {selectedItem ? selectedItem.label : placeholder}
    </Text>
  );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const { open, setOpen, value, onValueChange, setItems } = useSelectContext();
  const { theme, themeColors } = useTheme();

  // Extract items from children
  React.useEffect(() => {
    const extractedItems: Array<{ value: string; label: string }> = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.value) {
        extractedItems.push({
          value: child.props.value,
          label: child.props.children || child.props.value,
        });
      }
    });
    setItems(extractedItems);
  }, [children, setItems]);

  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setOpen(false)}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: theme === 'dark' ? themeColors.surface : '#FFFFFF',
            },
          ]}
        >
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export function SelectItem({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { value: selectedValue, onValueChange, setOpen } = useSelectContext();
  const { theme, themeColors } = useTheme();
  const isSelected = selectedValue === value;

  return (
    <TouchableOpacity
      onPress={() => {
        onValueChange?.(value);
        setOpen(false);
      }}
      style={[
        styles.item,
        isSelected && {
          backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
        },
      ]}
    >
      <Text
        style={[
          styles.itemText,
          {
            color: isSelected
              ? (theme === 'dark' ? themeColors.accent1 : themeColors.primary)
              : themeColors.text,
            fontWeight: isSelected ? '600' : '400',
          },
        ]}
      >
        {children}
      </Text>
      {isSelected && <Icon name="check" size={16} color={theme === 'dark' ? themeColors.accent1 : themeColors.primary} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  valueText: {
    fontSize: 16,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '50%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  itemText: {
    fontSize: 16,
  },
});
