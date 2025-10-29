declare module '@radix-ui/react-collapsible' {
  import * as React from 'react';

  export interface CollapsibleProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

  export const Root: React.FC<CollapsibleProps>;
  export const CollapsibleTrigger: React.FC<React.HTMLProps<HTMLButtonElement>>;
  export const CollapsibleContent: React.FC<React.HTMLProps<HTMLDivElement>>;
}