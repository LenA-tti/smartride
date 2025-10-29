import * as React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  ViewStyle,
  TextStyle,
} from "react-native";

type Variant = "default" | "destructive" | "outline";
type Size = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  variant?: Variant;
  size?: Size;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  className?: string; // noop, kept for compatibility with previous web API
  children?: React.ReactNode;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (
    { variant = "default", size = "default", style, textStyle, disabled, children, ...props },
    ref,
  ) => {
    const variantStyle =
      variant === "destructive"
        ? styles.variantDestructive
        : variant === "outline"
          ? styles.variantOutline
          : styles.variantDefault;

    const sizeStyle =
      size === "sm"
        ? styles.sizeSm
        : size === "lg"
          ? styles.sizeLg
          : size === "icon"
            ? styles.sizeIcon
            : styles.sizeDefault;

    return (
      <Pressable
        ref={ref}
        accessibilityRole="button"
        disabled={disabled}
        style={[styles.base, variantStyle, sizeStyle, disabled && styles.disabled, style]}
        {...props}
      >
        {typeof children === "string" ? (
          <Text style={[styles.text, variant === "outline" ? styles.textOutline : styles.textDefault, textStyle]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  },
);

Button.displayName = "Button";

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  variantDefault: {
    backgroundColor: "#111827",
  },
  textDefault: {
    color: "#FFFFFF",
  },
  variantDestructive: {
    backgroundColor: "#EF4444",
  },
  variantOutline: {
    backgroundColor: "transparent",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#D1D5DB",
  },
  textOutline: {
    color: "#111827",
  },
  sizeDefault: {
    height: 40,
    paddingHorizontal: 16,
  },
  sizeSm: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  sizeLg: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  sizeIcon: {
    height: 32,
    width: 32,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Button };
