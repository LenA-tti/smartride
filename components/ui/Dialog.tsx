/*
 * REACT NATIVE DIALOG COMPONENT
 * ==============================
 * Drop-in replacement for Shadcn Dialog
 * 
 * Usage:
 * <Dialog open={isOpen} onOpenChange={setIsOpen}>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Title</DialogTitle>
 *     </DialogHeader>
 *     Content here
 *   </DialogContent>
 * </Dialog>
 */

import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DialogContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string; // Ignored
}

interface DialogHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string; // Ignored
}

interface DialogTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
  className?: string; // Ignored
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
  className?: string; // Ignored
}

export function Dialog({ children, open, onOpenChange }: DialogProps) {
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

export function DialogContent({ children, style, className }: DialogContentProps) {
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

export function DialogHeader({ children, style, className }: DialogHeaderProps) {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
}

export function DialogTitle({ children, style, className }: DialogTitleProps) {
  const { themeColors } = useTheme();

  return (
    <Text style={[styles.title, { color: themeColors.text }, style]}>
      {children}
    </Text>
  );
}

export function DialogDescription({ children, style, className }: DialogDescriptionProps) {
  const { themeColors } = useTheme();

  return (
    <Text style={[styles.description, { color: themeColors.textSecondary }, style]}>
      {children}
    </Text>
  );
}

export function DialogFooter({ children, style, className }: DialogHeaderProps) {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
}

// DialogTrigger is not needed in RN - just control open state directly

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
    maxWidth: 500,
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
