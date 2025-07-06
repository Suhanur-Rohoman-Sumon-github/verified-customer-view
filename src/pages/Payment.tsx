import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const navigate = useNavigate();

  const cryptoOptions = [
    { name: "Bitcoin", symbol: "BTC", icon: "₿" },
    { name: "Ethereum", symbol: "ETH", icon: "Ξ" },
    { name: "Litecoin", symbol: "LTC", icon: "Ł" },
    { name: "Dogecoin", symbol: "DOGE", icon: "Ð" },
  ];

  const handlePayment = () => {
    if (!amount || !selectedMethod) {
      alert("Please select amount and payment method");
      return;
    }
    
    // TODO: Implement actual payment processing
    alert(`Processing payment of $${amount} via ${selectedMethod}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-3xl font-bold">Recharge Balance</h1>
        </div>

        <div className="grid gap-6">
          {/* Amount Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard size={20} />
                Select Amount
              </CardTitle>
              <CardDescription>
                Choose how much you want to add to your balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[10, 25, 50, 100, 250, 500].map((preset) => (
                    <Button
                      key={preset}
                      variant={amount === preset.toString() ? "default" : "outline"}
                      onClick={() => setAmount(preset.toString())}
                    >
                      ${preset}
                    </Button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-amount">Custom Amount</Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter custom amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins size={20} />
                Payment Methods
              </CardTitle>
              <CardDescription>
                Choose your preferred cryptocurrency payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {cryptoOptions.map((crypto) => (
                  <Button
                    key={crypto.symbol}
                    variant={selectedMethod === crypto.name ? "default" : "outline"}
                    className="justify-start h-auto p-4"
                    onClick={() => setSelectedMethod(crypto.name)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{crypto.icon}</span>
                      <div className="text-left">
                        <div className="font-semibold">{crypto.name}</div>
                        <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                      </div>
                      <Badge variant="secondary" className="ml-auto">
                        Crypto
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          {amount && selectedMethod && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-semibold">${amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-semibold">{selectedMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">${amount}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={handlePayment}
                >
                  Proceed with Payment
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}