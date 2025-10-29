import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Button from '@/components/ui/button-extended';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  ArrowLeft,
  ChevronRight,
  Edit,
  FileText,
  HelpCircle,
  LogOut,
  Mail,
  Phone,
  Shield,
  User
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onOpenSidebar: () => void;
}

export function ProfileScreen({ onBack, onLogout }: ProfileScreenProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [notifications, setNotifications] = useState({
    tripUpdates: true,
    promotions: false,
    news: true
  });

  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+267 123 4567'
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
    setShowEditDialog(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="bg-transparent hover:bg-muted"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2>Profile</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Profile Header */}
        <div className="px-6 py-8 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="mb-1">{userData.name}</h3>
              <p className="text-muted-foreground mb-2">{userData.email}</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowEditDialog(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="px-6 py-6">
          <h4 className="mb-4">Account Settings</h4>
          <Card className="divide-y">
            <SettingItem
              icon={<User className="w-5 h-5" />}
              label="Personal Information"
              value={userData.name}
              onClick={() => setShowEditDialog(true)}
            />
            <SettingItem
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              value={userData.email}
              onClick={() => setShowEditDialog(true)}
            />
            <SettingItem
              icon={<Phone className="w-5 h-5" />}
              label="Phone Number"
              value={userData.phone}
              onClick={() => setShowEditDialog(true)}
            />
          </Card>
        </div>

        {/* Notifications */}
        <div className="px-6 py-6">
          <h4 className="mb-4">Notifications</h4>
          <Card className="divide-y">
            <NotificationToggle
              label="Trip Updates"
              description="Get notified about your trips"
              checked={notifications.tripUpdates}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, tripUpdates: checked })
              }
            />
            <NotificationToggle
              label="Promotions & Offers"
              description="Receive special offers and discounts"
              checked={notifications.promotions}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, promotions: checked })
              }
            />
            <NotificationToggle
              label="News & Updates"
              description="Stay updated with SmartRide news"
              checked={notifications.news}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, news: checked })
              }
            />
          </Card>
        </div>

        {/* Other Options */}
        <div className="px-6 py-6">
          <h4 className="mb-4">More</h4>
          <Card className="divide-y">
            <SettingItem
              icon={<Shield className="w-5 h-5" />}
              label="Privacy & Security"
              onClick={() => toast.info('Opening privacy settings...')}
            />
            <SettingItem
              icon={<HelpCircle className="w-5 h-5" />}
              label="Help & Support"
              onClick={() => toast.info('Opening help center...')}
            />
            <SettingItem
              icon={<FileText className="w-5 h-5" />}
              label="Terms & Conditions"
              onClick={() => toast.info('Opening terms...')}
            />
          </Card>
        </div>

        {/* Logout */}
        <div className="px-6 py-6">
          <Button 
            variant="destructive" 
            className="w-full gap-2"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>

        {/* App Info */}
        <div className="px-6 pb-8 text-center text-muted-foreground">
          <p>SmartRide v1.0.0</p>
          <p>© 2025 SmartRide Botswana</p>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowEditDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} className="flex-1">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? You'll need to login again to use SmartRide.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onLogout}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SettingItem({ 
  icon, 
  label, 
  value, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 flex items-center gap-3 hover:bg-accent transition-colors"
    >
      <div className="text-muted-foreground">{icon}</div>
      <div className="flex-1 text-left">
        <p>{label}</p>
        {value && <p className="text-muted-foreground">{value}</p>}
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}

function NotificationToggle({ 
  label, 
  description, 
  checked, 
  onCheckedChange 
}: { 
  label: string; 
  description: string; 
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="p-4 flex items-center gap-3">
      <div className="flex-1">
        <p className="mb-1">{label}</p>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
