"use client";

import * as React from "react";
import { View, ViewStyle } from "react-native";

type AspectRatioProps = {
  ratio?: number; // width/height
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
};

function AspectRatio({ ratio = 16 / 9, style, children }: AspectRatioProps) {
  return (
    <View style={[{ aspectRatio: ratio, width: "100%" }, style]}> {children} </View>
  );
}

export { AspectRatio };
