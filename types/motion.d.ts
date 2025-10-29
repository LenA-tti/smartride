declare module 'motion' {
  import { ReactNode } from 'react';

  export interface AnimatePresenceProps {
    children?: ReactNode;
    initial?: boolean;
    onExitComplete?: () => void;
  }

  export const AnimatePresence: React.FC<AnimatePresenceProps>;

  export const motion: {
    div: React.FC<any>;
    button: React.FC<any>;
    // Add other motion elements as needed
  };
}