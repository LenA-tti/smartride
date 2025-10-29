import * as React from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from "react-native";

function Breadcrumb({ style, children }: { style?: ViewStyle | ViewStyle[]; children?: React.ReactNode }) {
  return (
    <View accessibilityLabel="breadcrumb" style={style}>
      {children}
    </View>
  );
}

function BreadcrumbList({ style, children }: { style?: ViewStyle | ViewStyle[]; children?: React.ReactNode }) {
  return <View style={[styles.list, style]}>{children}</View>;
}

function BreadcrumbItem({ style, children }: { style?: ViewStyle | ViewStyle[]; children?: React.ReactNode }) {
  return <View style={[styles.item, style]}>{children}</View>;
}

function BreadcrumbLink({ onPress, children, style, textStyle }: { onPress?: () => void; children?: React.ReactNode; style?: ViewStyle | ViewStyle[]; textStyle?: TextStyle | TextStyle[] }) {
  return (
    <Pressable onPress={onPress} style={style} accessibilityRole="link">
      {typeof children === "string" ? <Text style={[styles.link, textStyle]}>{children}</Text> : children}
    </Pressable>
  );
}

function BreadcrumbPage({ children, style, textStyle }: { children?: React.ReactNode; style?: ViewStyle | ViewStyle[]; textStyle?: TextStyle | TextStyle[] }) {
  return (
    <View style={style} accessibilityRole="link" accessibilityState={{ disabled: true }}>
      {typeof children === "string" ? <Text style={[styles.page, textStyle]}>{children}</Text> : children}
    </View>
  );
}

function BreadcrumbSeparator({ children, style, textStyle }: { children?: React.ReactNode; style?: ViewStyle | ViewStyle[]; textStyle?: TextStyle | TextStyle[] }) {
  return (
    <View style={[styles.separator, style]} accessibilityElementsHidden>
      {typeof children === "string" ? <Text style={textStyle}>{children}</Text> : <Text style={textStyle}>{children ?? ">"}</Text>}
    </View>
  );
}

function BreadcrumbEllipsis({ style, textStyle }: { style?: ViewStyle | ViewStyle[]; textStyle?: TextStyle | TextStyle[] }) {
  return (
    <View style={[styles.ellipsis, style]} accessibilityElementsHidden>
      <Text style={textStyle}>…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8 as any,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6 as any,
  },
  link: {
    color: "#111827",
  },
  page: {
    color: "#111827",
    fontWeight: "400",
  },
  separator: {
    paddingHorizontal: 4,
  },
  ellipsis: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};

