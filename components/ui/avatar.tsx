"use client";

import * as React from "react";
import { Image, View, Text, StyleSheet, ImageProps, ViewStyle, TextStyle } from "react-native";

type AvatarProps = {
  size?: number;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
};

function Avatar({ size = 40, style, children }: AvatarProps) {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }, style]}>
      {children}
    </View>
  );
}

type AvatarImageProps = ImageProps & { size?: number };
function AvatarImage({ size = 40, style, ...props }: AvatarImageProps) {
  return (
    <Image
      style={[{ width: size, height: size, borderRadius: size / 2 }, style as any]}
      {...props}
    />
  );
}

function AvatarFallback({ children, size = 40, style, textStyle }: { children?: React.ReactNode; size?: number; style?: ViewStyle | ViewStyle[]; textStyle?: TextStyle | TextStyle[] }) {
  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }, style]}>
      {typeof children === "string" ? <Text style={[styles.fallbackText, textStyle]}>{children}</Text> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  fallback: {
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackText: {
    color: "#374151",
    fontWeight: "600",
  },
});

export { Avatar, AvatarFallback, AvatarImage };
