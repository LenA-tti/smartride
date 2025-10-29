"use client";

import React from "react";
import { Button, ButtonProps } from "./button";
import { ViewStyle, TextStyle } from "react-native";

// ExtendedButton supports a couple of additional semantic variants used across the codebase
// (ghost, secondary) and maps them to the base Button variants plus small class overrides.

type ExtraVariant = "ghost" | "secondary";

type ExtendedVariant = ButtonProps["variant"] | ExtraVariant;

export interface ExtendedButtonProps extends Omit<ButtonProps, "variant"> {
  variant?: ExtendedVariant;
}

export function ExtendedButton({ variant, style, ...props }: ExtendedButtonProps & { style?: ViewStyle | ViewStyle[]; textStyle?: TextStyle | TextStyle[] }) {
  // Map extra variants to existing Button variants
  let mappedVariant: ButtonProps["variant"] | undefined = undefined;
  let extraStyle: ViewStyle = {};

  switch (variant) {
    case "ghost":
      mappedVariant = "outline";
      extraStyle = { backgroundColor: "transparent" };
      break;
    case "secondary":
      mappedVariant = "default";
      extraStyle = { backgroundColor: "#4B5563" };
      break;
    default:
      // @ts-ignore allow passthrough of the original variant union
      mappedVariant = variant;
  }

  return (
    <Button
      variant={mappedVariant as any}
  style={[extraStyle, style] as any}
      {...(props as ButtonProps)}
    />
  );
}

export default ExtendedButton;
