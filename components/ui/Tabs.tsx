/*
 * REACT NATIVE TABS COMPONENT
 * ============================
 * Drop-in replacement for Shadcn Tabs
 * 
 * Usage:
 * <Tabs value={activeTab} onValueChange={setActiveTab}>
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 */

import React, { createContext, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface TabsContextValue {
  value: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within Tabs');
  }
  return context;
}

interface TabsProps {
  children: React.ReactNode;
  value: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string; // Ignored, use value prop
  style?: ViewStyle;
  className?: string; // Ignored
}

export function Tabs({ children, value, onValueChange, defaultValue, style, className }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <View style={style}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string; // Ignored
}

export function TabsList({ children, style, className }: TabsListProps) {
  const { theme, themeColors } = useTheme();

  return (
    <View
      style={[
        styles.tabsList,
        {
          borderBottomColor: theme === 'dark' ? '#374151' : '#E5E7EB',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  style?: ViewStyle;
  className?: string; // Ignored
}

export function TabsTrigger({ children, value, style, className }: TabsTriggerProps) {
  const { value: activeValue, onValueChange } = useTabsContext();
  const { theme, themeColors } = useTheme();
  const isActive = activeValue === value;

  return (
    <TouchableOpacity
      onPress={() => onValueChange?.(value)}
      style={[
        styles.tab,
        isActive && {
          borderBottomColor: theme === 'dark' ? themeColors.accent1 : themeColors.primary,
          borderBottomWidth: 2,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.tabText,
          {
            color: isActive
              ? (theme === 'dark' ? themeColors.accent1 : themeColors.primary)
              : themeColors.textSecondary,
            fontWeight: isActive ? '600' : '400',
          },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  style?: ViewStyle;
  className?: string; // Ignored
}

export function TabsContent({ children, value, style, className }: TabsContentProps) {
  const { value: activeValue } = useTabsContext();

  if (activeValue !== value) {
    return null;
  }

  return (
    <View style={[styles.tabContent, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tabsList: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
  },
  tabContent: {
    paddingTop: 16,
  },
});
