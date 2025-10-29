declare module 'class-variance-authority' {
  export function cva(
    base: string,
    options?: {
      variants?: Record<string, Record<string, string>>;
      defaultVariants?: Record<string, string>;
    }
  ): string;

  export type VariantProps<T> = T extends (...args: any) => infer R ? R : never;
}