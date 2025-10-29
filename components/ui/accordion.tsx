"use client";

import * as React from "react";
import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";

// A lightweight React Native accordion that mirrors the previous API
// Components: Accordion, AccordionItem, AccordionTrigger, AccordionContent
// - type: "single" | "multiple" (default: single)
// - value tracking is done by string `value` per item

type AccordionType = "single" | "multiple";

type AccordionContextValue = {
  type: AccordionType;
  openValues: Set<string>;
  toggle: (value: string) => void;
  isOpen: (value: string) => boolean;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null,
);

type AccordionProps = {
  type?: AccordionType;
  defaultValue?: string | string[];
  style?: ViewStyle | ViewStyle[];
  className?: string; // ignored, for compatibility
  children?: React.ReactNode;
};

function Accordion({ type = "single", defaultValue, style, children }: AccordionProps) {
  const initial = React.useMemo(() => {
    if (type === "multiple") {
      return new Set(Array.isArray(defaultValue) ? defaultValue : []);
    }
    return new Set(typeof defaultValue === "string" ? [defaultValue] : []);
  }, [type, defaultValue]);

  const [openValues, setOpenValues] = React.useState<Set<string>>(initial);

  const toggle = React.useCallback(
    (value: string) => {
      setOpenValues((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
        } else {
          if (type === "single") {
            return new Set([value]);
          }
          next.add(value);
        }
        return next;
      });
    },
    [type],
  );

  const isOpen = React.useCallback((value: string) => openValues.has(value), [openValues]);

  const ctx: AccordionContextValue = React.useMemo(
    () => ({ type, openValues, toggle, isOpen }),
    [type, openValues, toggle, isOpen],
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <View style={style}>{children}</View>
    </AccordionContext.Provider>
  );
}

type ItemContextValue = { value: string };
const ItemContext = React.createContext<ItemContextValue | null>(null);

type AccordionItemProps = {
  value: string;
  style?: ViewStyle | ViewStyle[];
  className?: string; // ignored
  children?: React.ReactNode;
};

function AccordionItem({ value, style, children }: AccordionItemProps) {
  return (
    <ItemContext.Provider value={{ value }}>
      <View style={[styles.item, style]}>{children}</View>
    </ItemContext.Provider>
  );
}

type AccordionTriggerProps = {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  className?: string; // ignored
};

function AccordionTrigger({ children, style }: AccordionTriggerProps) {
  const accordion = React.useContext(AccordionContext);
  const item = React.useContext(ItemContext);
  if (!accordion || !item) return null;

  const open = accordion.isOpen(item.value);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => accordion.toggle(item.value)}
      style={[styles.trigger, open && styles.triggerOpen, style]}
    >
      {typeof children === "string" ? (
        <Text style={styles.triggerText}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

type AccordionContentProps = {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  className?: string; // ignored
};

function AccordionContent({ children, style }: AccordionContentProps) {
  const accordion = React.useContext(AccordionContext);
  const item = React.useContext(ItemContext);
  if (!accordion || !item) return null;
  const open = accordion.isOpen(item.value);

  if (!open) return null;
  return <View style={[styles.content, style]}>{typeof children === "string" ? <Text style={styles.contentText}>{children}</Text> : children}</View>;
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  trigger: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
  },
  triggerOpen: {
    backgroundColor: "#F9FAFB",
  },
  triggerText: {
    fontSize: 14,
    color: "#111827",
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  contentText: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

