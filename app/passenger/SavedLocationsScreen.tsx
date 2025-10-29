import Button from '@/components/ui/button-extended';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  Briefcase,
  Edit,
  Home,
  MapPin,
  MoreVertical,
  Plus,
  Trash2
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface SavedLocationsScreenProps {
  onBack: () => void;
  onOpenSidebar: () => void;
}

interface SavedLocation {
  id: string;
  label: string;
  address: string;
  icon: 'home' | 'work' | 'pin';
}

const mockLocations: SavedLocation[] = [
  {
    id: '1',
    label: 'Home',
    address: 'Block 8, Plot 1234, Gaborone',
    icon: 'home'
  },
  {
    id: '2',
    label: 'Work',
    address: 'Main Mall, CBD, Gaborone',
    icon: 'work'
  },
  {
    id: '3',
    label: "Mom's House",
    address: 'Mogoditshane, Extension 14',
    icon: 'pin'
  }
];

export function SavedLocationsScreen({ onBack }: SavedLocationsScreenProps) {
  const [locations, setLocations] = useState<SavedLocation[]>(mockLocations);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingLocation, setEditingLocation] = useState<SavedLocation | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    address: '',
    icon: 'pin' as 'home' | 'work' | 'pin'
  });

  const handleSave = () => {
    if (!formData.label || !formData.address) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editingLocation) {
      // Edit existing
      setLocations(locations.map(loc => 
        loc.id === editingLocation.id 
          ? { ...loc, ...formData }
          : loc
      ));
      toast.success('Location updated');
    } else {
      // Add new
      const newLocation: SavedLocation = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData
      };
      setLocations([...locations, newLocation]);
      toast.success('Location added');
    }

    setShowAddDialog(false);
    setEditingLocation(null);
    setFormData({ label: '', address: '', icon: 'pin' });
  };

  const handleEdit = (location: SavedLocation) => {
    setEditingLocation(location);
    setFormData({
      label: location.label,
      address: location.address,
      icon: location.icon
    });
    setShowAddDialog(true);
  };

  const handleDelete = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
    toast.success('Location deleted');
  };

  const getIcon = (iconType: 'home' | 'work' | 'pin') => {
    switch (iconType) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'work':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent hover:bg-muted"
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2>Saved Locations</h2>
          </div>
          <Button 
            size="icon"
            onClick={() => {
              setEditingLocation(null);
              setFormData({ label: '', address: '', icon: 'pin' });
              setShowAddDialog(true);
            }}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="px-6 py-4 bg-accent/50 border-b">
        <p className="text-muted-foreground">
          Save your frequently visited places for quick access
        </p>
      </div>

      {/* Locations List */}
      <div className="flex-1 overflow-auto px-6 py-6">
        {locations.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No saved locations yet</p>
            <Button 
              onClick={() => setShowAddDialog(true)} 
              className="mt-4"
            >
              Add Your First Location
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {locations.map(location => (
              <Card key={location.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {getIcon(location.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="mb-1">{location.label}</h4>
                    <p className="text-muted-foreground truncate">{location.address}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="flex-shrink-0 bg-transparent hover:bg-muted">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(location)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(location.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingLocation ? 'Edit Location' : 'Add Location'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                placeholder="e.g., Home, Work, Gym"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter the full address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <div className="grid grid-cols-3 gap-2">
                <IconOption
                  icon={<Home className="w-5 h-5" />}
                  label="Home"
                  selected={formData.icon === 'home'}
                  onClick={() => setFormData({ ...formData, icon: 'home' })}
                />
                <IconOption
                  icon={<Briefcase className="w-5 h-5" />}
                  label="Work"
                  selected={formData.icon === 'work'}
                  onClick={() => setFormData({ ...formData, icon: 'work' })}
                />
                <IconOption
                  icon={<MapPin className="w-5 h-5" />}
                  label="Other"
                  selected={formData.icon === 'pin'}
                  onClick={() => setFormData({ ...formData, icon: 'pin' })}
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddDialog(false);
                  setEditingLocation(null);
                  setFormData({ label: '', address: '', icon: 'pin' });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1">
                {editingLocation ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function IconOption({ 
  icon, 
  label, 
  selected, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg border-2 transition-colors ${
        selected 
          ? 'border-primary bg-primary/10' 
          : 'border-border hover:border-primary/50'
      }`}
    >
      <div className={`flex flex-col items-center gap-1 ${
        selected ? 'text-primary' : 'text-muted-foreground'
      }`}>
        {icon}
        <span className="text-xs">{label}</span>
      </div>
    </button>
  );
}
