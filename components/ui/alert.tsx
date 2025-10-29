import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type AlertVariant = "default" | "destructive";

type AlertProps = {
  variant?: AlertVariant;
  style?: ViewStyle | ViewStyle[];
  className?: string; // ignored, for compatibility
  children?: React.ReactNode;
};

function Alert({ variant = "default", style, children }: AlertProps) {
  return (
    <View
      accessibilityRole="alert"
      style={[styles.base, variant === "destructive" ? styles.destructive : styles.default, style]}
    >
      {children}
    </View>
  );
}

function AlertTitle({ children, style, className }: { children?: React.ReactNode; style?: TextStyle | TextStyle[]; className?: string }) {
  return typeof children === "string" ? (
    <Text style={[styles.title, style]}>{children}</Text>
  ) : (
    <>{children}</>
  );
}

function AlertDescription({ children, style, className }: { children?: React.ReactNode; style?: TextStyle | TextStyle[]; className?: string }) {
  return typeof children === "string" ? (
    <Text style={[styles.description, style]}>{children}</Text>
  ) : (
    <>{children}</>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6 as any,
  },
  default: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
  },
  destructive: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#374151",
  },
});

export { Alert, AlertDescription, AlertTitle };

