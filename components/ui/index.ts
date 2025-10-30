/*
 * REACT NATIVE UI COMPONENTS - INDEX
 * ===================================
 * Export all RN UI components
 * 
 * To migrate from web to RN:
 * Change: import { Button } from '../ui/button';
 * To: import { Button } from '../ui-rn';
 */

export { Button } from './Button';
export { Input } from './Input';
export { Label } from './Label';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
export { Badge } from './Badge';
export { Avatar, AvatarImage, AvatarFallback } from './Avatar';
export { Switch } from './Switch';
export { Progress } from './Progress';
export { Checkbox } from './Checkbox';
export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './Dialog';
export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from './AlertDialog';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
export { RadioGroup, RadioGroupItem } from './RadioGroup';
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './Select';

/*
 * Components NOT included (advanced/web-specific):
 * - DropdownMenu (use Select or custom TouchableOpacity menu)
 * - Tooltip (use long press or info icons)
 * - HoverCard (no hover on mobile)
 * - Popover (use Dialog or Modal)
 * - Command (use custom search)
 * - ContextMenu (use long press with ActionSheet)
 * - Menubar (use navigation)
 * - NavigationMenu (use React Navigation)
 * - Accordion (custom implementation)
 * - Collapsible (custom implementation)
 * - Carousel (use react-native-snap-carousel)
 * - Calendar (use react-native-calendars)
 * - Drawer (use React Navigation Drawer)
 * - Sidebar (use React Navigation Drawer)
 * - Sonner (use react-native-toast-message)
 * 
 * For these, see RN_UI_COMPONENTS_GUIDE.md for alternatives
 */
