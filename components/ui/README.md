# React Native UI Components

Drop-in replacements for Shadcn UI components, specifically designed for your SmartRide React Native app.

## ✨ Features

- ✅ **Same API as Shadcn** - Minimal code changes required
- ✅ **Theme-aware** - Automatically uses your dark mode colors
- ✅ **TypeScript** - Full type safety
- ✅ **Web-compatible props** - `onClick`, `onChange`, `className` all work
- ✅ **Production-ready** - Tested patterns from the conversion guides

## 📦 Installation

### Required Packages

```bash
# Core dependencies
npm install @react-native-community/checkbox
npm install react-native-toast-message
npm install react-native-vector-icons

# Link native modules (React Native CLI only, skip if using Expo)
cd ios && pod install && cd ..
```

## 🚀 Quick Start

### 1. Update Your Imports

**Before (Web):**
```tsx
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
```

**After (React Native):**
```tsx
import { Button, Card, Input } from '../ui-rn';
```

### 2. That's It!

Most components work exactly the same. Check `UI_COMPONENT_MIGRATION.md` for specific details.

## 📚 Available Components

### Core Components
- ✅ `Button` - All variants supported
- ✅ `Input` - Automatic keyboard type mapping
- ✅ `Label` - Simple text labels
- ✅ `Card` with subcomponents (Header, Title, Content, Footer)

### Display Components
- ✅ `Badge` - All variants
- ✅ `Avatar` with Image and Fallback
- ✅ `Progress` - Animated progress bar

### Form Components
- ✅ `Checkbox` - Native checkbox
- ✅ `Switch` - Native switch
- ✅ `RadioGroup` with RadioGroupItem
- ✅ `Select` - Bottom sheet picker

### Overlay Components
- ✅ `Dialog` - Modal dialogs
- ✅ `AlertDialog` - Confirmation dialogs
- ✅ `Tabs` - Tab navigation

## 🎨 Theme Integration

All components automatically use your theme colors from `ThemeProvider`:

```tsx
const { theme, themeColors } = useTheme();

// Components automatically apply:
// - themeColors.background
// - themeColors.text
// - themeColors.primary
// - themeColors.accent1 (dark mode)
// etc.
```

## 📖 Usage Examples

### Button

```tsx
import { Button } from '../ui-rn';

// All variants
<Button onPress={handleClick}>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// All sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon name="x" /></Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
```

### Input

```tsx
import { Input } from '../ui-rn';

// Text input
<Input
  value={name}
  onChangeText={setName}
  placeholder="Enter name"
/>

// Email (auto keyboard)
<Input
  type="email"
  value={email}
  onChangeText={setEmail}
/>

// Password
<Input
  type="password"
  value={password}
  onChangeText={setPassword}
/>

// Number pad
<Input
  type="number"
  value={age}
  onChangeText={setAge}
/>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui-rn';

<Card>
  <CardHeader>
    <CardTitle>Trip Details</CardTitle>
    <CardDescription>View your trip information</CardDescription>
  </CardHeader>
  <CardContent>
    <Text>From: Current Location</Text>
    <Text>To: Main Mall</Text>
  </CardContent>
  <CardFooter>
    <Button>Cancel Trip</Button>
  </CardFooter>
</Card>
```

### Dialog

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui-rn';
import { Button } from '../ui-rn';

const [isOpen, setIsOpen] = useState(false);

<>
  <Button onPress={() => setIsOpen(true)}>
    Open Dialog
  </Button>
  
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Action</DialogTitle>
      </DialogHeader>
      <Text>Are you sure you want to proceed?</Text>
      <Button onPress={() => setIsOpen(false)}>
        Close
      </Button>
    </DialogContent>
  </Dialog>
</>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui-rn';

const [tab, setTab] = useState('completed');

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="completed">Completed</TabsTrigger>
    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
  </TabsList>
  <TabsContent value="completed">
    <CompletedTrips />
  </TabsContent>
  <TabsContent value="cancelled">
    <CancelledTrips />
  </TabsContent>
</Tabs>
```

### Select

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui-rn';

const [vehicle, setVehicle] = useState('');

<Select value={vehicle} onValueChange={setVehicle}>
  <SelectTrigger>
    <SelectValue placeholder="Select vehicle type" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="sedan">Sedan</SelectItem>
    <SelectItem value="suv">SUV</SelectItem>
    <SelectItem value="van">Van</SelectItem>
  </SelectContent>
</Select>
```

### Badge

```tsx
import { Badge } from '../ui-rn';

<Badge>Default</Badge>
<Badge variant="secondary">Beta</Badge>
<Badge variant="destructive">Cancelled</Badge>
<Badge variant="outline">Pending</Badge>
```

### Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '../ui-rn';

<Avatar>
  <AvatarImage source={{ uri: userPhoto }} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Progress

```tsx
import { Progress } from '../ui-rn';

<Progress value={75} />
```

### Switch & Checkbox

```tsx
import { Switch, Checkbox } from '../ui-rn';

<Switch checked={enabled} onCheckedChange={setEnabled} />
<Checkbox checked={agreed} onCheckedChange={setAgreed} />
```

### RadioGroup

```tsx
import { RadioGroup, RadioGroupItem } from '../ui-rn';

const [payment, setPayment] = useState('card');

<RadioGroup value={payment} onValueChange={setPayment}>
  <RadioGroupItem value="card" label="Credit Card" />
  <RadioGroupItem value="cash" label="Cash" />
  <RadioGroupItem value="wallet" label="E-Wallet" />
</RadioGroup>
```

## 🎨 Custom Styling

All components accept a `style` prop for custom styling:

```tsx
<Button style={{ marginTop: 20, width: '100%' }}>
  Custom Styled Button
</Button>

<Card style={{ backgroundColor: '#f0f0f0' }}>
  Custom Card
</Card>
```

## 🌓 Dark Mode

Components automatically adapt to your theme:

```tsx
const { theme, themeColors } = useTheme();

// Light mode: Uses #2563EB (blue)
// Dark mode: Uses #9B3922 (red-brown from your custom palette)
<Button>Themed Button</Button>
```

Your custom dark mode colors are automatically applied:
- Primary: `#211832`
- Surface: `#181C14`
- Accent1: `#9B3922`
- Accent2: `#1B1A55`
- Accent3: `#C62300`

## 🔄 Migration from Web

See `UI_COMPONENT_MIGRATION.md` for complete migration guide.

**TL;DR:**
1. Change imports from `../ui/*` to `../ui-rn`
2. Replace `onClick` with `onPress` (Button)
3. Replace `onChange` with `onChangeText` (Input)
4. Remove `DialogTrigger` components
5. Done! 🎉

## 📝 Notes

- **className prop**: Ignored in RN, but won't cause errors
- **htmlFor prop**: Ignored in RN, but won't cause errors
- **onClick vs onPress**: Both work for Button!
- **onChange vs onChangeText**: Both work for Input!

## 🐛 Troubleshooting

### Issue: "Cannot find module '@react-native-community/checkbox'"

**Solution:**
```bash
npm install @react-native-community/checkbox
cd ios && pod install && cd ..
```

### Issue: "themeColors is undefined"

**Solution:** Make sure your ThemeProvider exports themeColors:

```tsx
const themeColors = theme === 'light' ? lightColors : darkColors;

return (
  <ThemeContext.Provider value={{ theme, themeColors, toggleTheme }}>
    {children}
  </ThemeContext.Provider>
);
```

### Issue: Icons not showing

**Solution:**
```bash
npm install react-native-vector-icons
cd ios && pod install && cd ..
# Rebuild app
```

For Android, add to `android/app/build.gradle`:
```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

## 📚 Additional Resources

- See `RN_CONVERSION_GUIDE.md` for general RN conversion
- See `UI_COMPONENT_MIGRATION.md` for detailed migration steps
- See `COPILOT_PROMPTS.md` for AI-assisted conversion

## 🤝 Contributing

These components are specifically designed for SmartRide. Feel free to customize them for your specific needs.

---

**Built with ❤️ for SmartRide React Native conversion**
