import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

type BadgeProps = {
  variant?: BadgeVariant;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  children?: React.ReactNode;
};

function Badge({ variant = "default", style, textStyle, children }: BadgeProps) {
  const variantStyle =
    variant === "secondary"
      ? styles.secondary
      : variant === "destructive"
        ? styles.destructive
        : variant === "outline"
          ? styles.outline
          : styles.default;

  return (
    <View style={[styles.base, variantStyle, style]}>
      {typeof children === "string" ? (
        <Text style={[styles.text, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: StyleSheet.hairlineWidth,
    width: undefined,
    alignSelf: "flex-start",
    gap: 4 as any,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },
  default: {
    backgroundColor: "#1D4ED8",
    borderColor: "transparent",
  },
  secondary: {
    backgroundColor: "#E5E7EB",
    borderColor: "transparent",
  },
  destructive: {
    backgroundColor: "#EF4444",
    borderColor: "transparent",
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "#D1D5DB",
  },
});

export { Badge };
