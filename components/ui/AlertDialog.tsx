/*
 * REACT NATIVE ALERT DIALOG COMPONENT
 * ====================================
 * Drop-in replacement for Shadcn AlertDialog
 * Similar to Dialog but styled for alerts/confirmations
 */

import React from 'react';
import { Modal, View, Text, TouchableWithoutFeedback, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface AlertDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AlertDialog({ children, open, onOpenChange }: AlertDialogProps) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange?.(false)}
    >
      <TouchableWithoutFeedback onPress={() => onOpenChange?.(false)}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            {children}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export function AlertDialogContent({ children, style, className }: { children: React.ReactNode; style?: ViewStyle; className?: string }) {
  const { theme, themeColors } = useTheme();

  return (
    <View
      style={[
        styles.content,
        {
          backgroundColor: theme === 'dark' ? themeColors.surface : '#FFFFFF',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function AlertDialogHeader({ children, style, className }: { children: React.ReactNode; style?: ViewStyle; className?: string }) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function AlertDialogTitle({ children, style, className }: { children: React.ReactNode; style?: TextStyle; className?: string }) {
  const { themeColors } = useTheme();
  return <Text style={[styles.title, { color: themeColors.text }, style]}>{children}</Text>;
}

export function AlertDialogDescription({ children, style, className }: { children: React.ReactNode; style?: TextStyle; className?: string }) {
  const { themeColors } = useTheme();
  return <Text style={[styles.description, { color: themeColors.textSecondary }, style]}>{children}</Text>;
}

export function AlertDialogFooter({ children, style, className }: { children: React.ReactNode; style?: ViewStyle; className?: string }) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

export function AlertDialogAction({ children, onPress, style, className }: { children: React.ReactNode; onPress?: () => void; style?: ViewStyle; className?: string }) {
  // Just a passthrough - use Button component
  return <>{children}</>;
}

export function AlertDialogCancel({ children, onPress, style, className }: { children: React.ReactNode; onPress?: () => void; style?: ViewStyle; className?: string }) {
  // Just a passthrough - use Button component
  return <>{children}</>;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});
