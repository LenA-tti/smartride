"use client";

import * as React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

type AlertDialogContextValue = {
  open: boolean;
  setOpen: (next: boolean) => void;
};

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(
  null,
);

type AlertDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
};

function AlertDialog({ open: openProp, defaultOpen, onOpenChange, children }: AlertDialogProps) {
  const isControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>(
    !!defaultOpen,
  );
  const open = isControlled ? !!openProp : uncontrolledOpen;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (isControlled) onOpenChange?.(next);
      else setUncontrolledOpen(next);
    },
    [isControlled, onOpenChange],
  );

  const ctx = React.useMemo(() => ({ open, setOpen }), [open, setOpen]);

  return (
    <AlertDialogContext.Provider value={ctx}>{children}</AlertDialogContext.Provider>
  );
}

type TriggerProps = {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

function AlertDialogTrigger({ children, style }: TriggerProps) {
  const ctx = React.useContext(AlertDialogContext);
  if (!ctx) return null;
  return (
    <Pressable accessibilityRole="button" onPress={() => ctx.setOpen(true)} style={style}>
      {typeof children === "string" ? <Text>{children}</Text> : children}
    </Pressable>
  );
}

function AlertDialogPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

function AlertDialogOverlay({ style }: { style?: ViewStyle | ViewStyle[] }) {
  return <View style={[StyleSheet.absoluteFill, styles.overlay, style]} />;
}

type ContentProps = {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

function AlertDialogContent({ children, style }: ContentProps) {
  const ctx = React.useContext(AlertDialogContext);
  if (!ctx) return null;
  return (
    <Modal
      transparent
      visible={ctx.open}
      animationType="fade"
      onRequestClose={() => ctx.setOpen(false)}
    >
      <View style={styles.centered}>
        <View style={[styles.content, style]}>{children}</View>
      </View>
    </Modal>
  );
}

function AlertDialogHeader({ children, style }: { children?: React.ReactNode; style?: ViewStyle | ViewStyle[] }) {
  return <View style={[styles.header, style]}>{children}</View>;
}

function AlertDialogFooter({ children, style }: { children?: React.ReactNode; style?: ViewStyle | ViewStyle[] }) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

function AlertDialogTitle({ children, style }: { children?: React.ReactNode; style?: TextStyle | TextStyle[] }) {
  return typeof children === "string" ? (
    <Text style={[styles.title, style]}>{children}</Text>
  ) : (
    <>{children}</>
  );
}

function AlertDialogDescription({ children, style }: { children?: React.ReactNode; style?: TextStyle | TextStyle[] }) {
  return typeof children === "string" ? (
    <Text style={[styles.description, style]}>{children}</Text>
  ) : (
    <>{children}</>
  );
}

function AlertDialogAction({ children, onPress, style, textStyle }: { children?: React.ReactNode; onPress?: () => void; style?: ViewStyle | ViewStyle[]; textStyle?: TextStyle | TextStyle[] }) {
  const ctx = React.useContext(AlertDialogContext);
  if (!ctx) return null;
  const handlePress = () => {
    onPress?.();
    ctx.setOpen(false);
  };
  return (
    <Pressable style={[styles.action, style]} onPress={handlePress}>
      {typeof children === "string" ? <Text style={[styles.actionText, textStyle]}>{children}</Text> : children}
    </Pressable>
  );
}

function AlertDialogCancel({ children, onPress, style, textStyle }: { children?: React.ReactNode; onPress?: () => void; style?: ViewStyle | ViewStyle[]; textStyle?: TextStyle | TextStyle[] }) {
  const ctx = React.useContext(AlertDialogContext);
  if (!ctx) return null;
  const handlePress = () => {
    onPress?.();
    ctx.setOpen(false);
  };
  return (
    <Pressable style={[styles.cancel, style]} onPress={handlePress}>
      {typeof children === "string" ? <Text style={[styles.cancelText, textStyle]}>{children}</Text> : children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  content: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
  },
  header: {
    marginBottom: 8,
  },
  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8 as any,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
  },
  action: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#111827",
    borderRadius: 8,
  },
  actionText: {
    color: "#FFFFFF",
  },
  cancel: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    marginRight: 8,
  },
  cancelText: {
    color: "#111827",
  },
});

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};

