import { Badge } from '@/components/ui/badge';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    ArrowLeft,
    Check,
    CreditCard,
    MoreVertical,
    Plus,
    Smartphone,
    Trash2
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface PaymentScreenProps {
  onBack: () => void;
  onOpenSidebar: () => void;
}

interface PaymentMethod {
  id: string;
  type: 'mobile-money' | 'card';
  provider: string;
  number: string;
  isDefault: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'mobile-money',
    provider: 'Orange Money',
    number: '•••• 4567',
    isDefault: true
  },
  {
    id: '2',
    type: 'mobile-money',
    provider: 'Mascom MyZaka',
    number: '•••• 8901',
    isDefault: false
  },
  {
    id: '3',
    type: 'card',
    provider: 'Visa',
    number: '•••• 3456',
    isDefault: false
  }
];

export function PaymentScreen({ onBack }: PaymentScreenProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<'mobile-money' | 'card'>('mobile-money');

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    toast.success('Default payment method updated');
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    toast.success('Payment method removed');
  };

  const handleAddPayment = () => {
    // Mock adding payment method
    toast.success('Payment method added');
    setShowAddDialog(false);
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
            <h2>Payment Methods</h2>
          </div>
          <Button 
            size="icon"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Wallet Balance */}
      <div className="px-6 py-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <p className="text-primary-foreground/80 mb-2">SmartRide Wallet</p>
        <h1 className="text-primary-foreground mb-4">P 125.00</h1>
        <div className="flex gap-2">
          <Button variant="default" size="sm" className="bg-gray-600 text-white hover:bg-gray-700">
            Add Money
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent text-primary-foreground border-primary-foreground/30">
            Transfer
          </Button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <h4 className="mb-4">Your Payment Methods</h4>
        
        {paymentMethods.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No payment methods added</p>
            <Button onClick={() => setShowAddDialog(true)} className="mt-4">
              Add Payment Method
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {paymentMethods.map(method => (
              <Card key={method.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    method.type === 'mobile-money' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    {method.type === 'mobile-money' ? (
                      <Smartphone className="w-6 h-6" />
                    ) : (
                      <CreditCard className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{method.provider}</h4>
                      {method.isDefault && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{method.number}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="flex-shrink-0 bg-transparent hover:bg-muted">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!method.isDefault && (
                        <DropdownMenuItem onClick={() => handleSetDefault(method.id)}>
                          <Check className="w-4 h-4 mr-2" />
                          Set as Default
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleDelete(method.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Transaction History Preview */}
        <div className="mt-8">
          <h4 className="mb-4">Recent Transactions</h4>
          <div className="space-y-3">
            <TransactionItem
              description="Trip to Mogoditshane"
              date="Today, 2:30 PM"
              amount="-P 25"
              type="debit"
            />
            <TransactionItem
              description="Wallet Top-up"
              date="Yesterday"
              amount="+P 100"
              type="credit"
            />
            <TransactionItem
              description="Trip to Main Mall"
              date="Oct 23"
              amount="-P 18"
              type="debit"
            />
          </div>
        </div>
      </div>

      {/* Add Payment Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <RadioGroup value={selectedType} onValueChange={(value: 'mobile-money' | 'card') => setSelectedType(value)}>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="mobile-money" id="mobile-money" />
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p>Mobile Money</p>
                    <p className="text-muted-foreground">Orange, Mascom, BTC</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <p>Debit/Credit Card</p>
                    <p className="text-muted-foreground">Visa, Mastercard</p>
                  </div>
                </label>
              </div>
            </RadioGroup>

            {selectedType === 'mobile-money' ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="provider">Provider</Label>
                  <select 
                    id="provider"
                    className="w-full h-10 px-3 rounded-md border bg-background"
                  >
                    <option>Orange Money</option>
                    <option>Mascom MyZaka</option>
                    <option>BTC Smega</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+267 123 4567"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAddDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handleAddPayment} className="flex-1">
                Add Method
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TransactionItem({ 
  description, 
  date, 
  amount, 
  type 
}: { 
  description: string; 
  date: string; 
  amount: string;
  type: 'credit' | 'debit';
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1">{description}</p>
          <p className="text-muted-foreground">{date}</p>
        </div>
        <p className={type === 'credit' ? 'text-green-600' : 'text-foreground'}>
          {amount}
        </p>
      </div>
    </Card>
  );
}
