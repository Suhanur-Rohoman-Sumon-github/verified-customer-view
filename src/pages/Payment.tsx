import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const coinRates: Record<string, number> = {
  "USDT Tron (TRC-20)": 1,
  "Tron TRX": 0.085,
  "Bitcoin BTC": 0.000027,
  "Litecoin LTC": 0.0042,
  "Ethereum ETH": 0.00038,
  Dogecoin: 2.5,
};

export default function Payment() {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [activeTab, setActiveTab] = useState("deposit");
  const [step, setStep] = useState<"select" | "pay" | "success">("select");
  const [transactionId, setTransactionId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const paymentOptions = Object.keys(coinRates);
  const cryptoAmount =
    selectedMethod && amount
      ? (+amount * coinRates[selectedMethod]).toFixed(6)
      : "0";

  const handleProceedToPayment = () => {
    if (!amount || !selectedMethod) {
      alert("Please enter amount and select a payment method");
      return;
    }
    setStep("pay");
    setCountdown(60);
    setProcessing(false);
  };

  // Countdown logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (processing && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    if (processing && countdown === 0) {
      setStep("success");
      setProcessing(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, processing]);

  const handleCompletePayment = () => {
    if (!transactionId) {
      alert("Please enter wallet address and transaction ID");
      return;
    }
    setProcessing(true);
    setCountdown(60);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-3xl font-bold text-[#006bff]">Wallet</h1>
        </div>

        <Card className="rounded-xl shadow-none border border-[#e5e7eb] bg-white">
          <CardContent className="p-6">
            {/* Tab Buttons */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
              <div>
                <div className="text-3xl font-bold text-[#006bff] bg-[#e6f0ff] px-6 py-2 rounded-lg inline-block mb-2">
                  $7.18
                </div>
                <div className="text-[#006bff] font-medium">
                  Current balance
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <Button
                  variant={activeTab === "deposit" ? "default" : "outline"}
                  className="rounded-md"
                  onClick={() => {
                    setActiveTab("deposit");
                    setStep("select");
                  }}
                >
                  Deposit money
                </Button>
                <Button
                  variant={activeTab === "transfer" ? "default" : "outline"}
                  className="rounded-md"
                  onClick={() => setActiveTab("transfer")}
                >
                  Transfer
                </Button>
                <Button
                  variant={activeTab === "redeem" ? "default" : "outline"}
                  className="rounded-md"
                  onClick={() => setActiveTab("redeem")}
                >
                  Redeem promocode
                </Button>
              </div>
            </div>

            {/* Deposit Tab */}
            {activeTab === "deposit" && step === "select" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="font-semibold mb-2">
                    Add money to your wallet
                  </div>
                  <Label htmlFor="amount" className="mb-1 block">
                    Amount, USD
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mb-4"
                    min="1"
                  />
                  <div className="font-semibold mb-2">Payment method:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {paymentOptions.map((option) => (
                      <Button
                        key={option}
                        variant={
                          selectedMethod === option ? "default" : "outline"
                        }
                        className={`justify-start h-auto py-3 px-2 rounded-md text-left ${
                          selectedMethod === option ? "border-green-500" : ""
                        }`}
                        onClick={() => setSelectedMethod(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="font-semibold mb-2">Summary</div>
                    <div className="bg-[#f3f4f6] rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Amount (USD):</span>
                        <span className="font-semibold">
                          ${amount || "0.00"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span className="font-semibold">
                          {selectedMethod || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount in crypto:</span>
                        <span className="font-semibold">
                          {cryptoAmount} {selectedMethod}
                        </span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-[#006bff]">
                          ${amount || "0.00"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-6 bg-[#006bff] hover:bg-[#0056cc] text-white rounded-md"
                    size="lg"
                    onClick={handleProceedToPayment}
                  >
                    PROCEED TO PAYMENT
                  </Button>
                </div>
              </div>
            )}

            {/* Payment Verification Step */}
            {activeTab === "deposit" && step === "pay" && (
              // inside your JSX
              <div className="flex flex-col items-center">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Pay {cryptoAmount} {selectedMethod}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    Send payment to the following wallet address:
                  </p>
                </div>

                {/* Wallet Address with Copy */}
                <div className="relative w-full max-w-md mb-4">
                  <Input
                    value={walletAddress || "YourWalletAddress12345"} // default/fake address
                    readOnly
                    className="pr-10"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        walletAddress || "YourWalletAddress12345"
                      );
                      alert("Wallet address copied!");
                    }}
                  >
                    <Copy size={18} />
                  </Button>
                </div>

                {/* Transaction ID input */}
                <Input
                  placeholder="Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="mb-4 w-full max-w-md"
                />

                <Button
                  className="w-full max-w-md bg-[#006bff] hover:bg-[#0056cc] text-white rounded-md mb-2"
                  size="lg"
                  onClick={handleCompletePayment}
                >
                  {processing
                    ? `Completing Payment: ${countdown}s`
                    : "Complete Payment"}
                </Button>
              </div>
            )}

            {/* Success Step */}
            {activeTab === "deposit" && step === "success" && (
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  Success!
                </h2>
                <p className="mb-4">
                  Your balance has been added. Please go back to home and check.
                </p>
                <Button
                  className="bg-[#006bff] hover:bg-[#0056cc] text-white rounded-md"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
              </div>
            )}

            {/* Transfer Tab */}
            {activeTab === "transfer" && (
              <div className="flex flex-col items-center justify-center">
                <div className="w-full max-w-xl mx-auto bg-gray-100 rounded-xl p-8 border border-[#e5e7eb]">
                  <div className="font-semibold text-lg mb-4">
                    Transfer money to a different account
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 mb-4">
                    <Input
                      type="email"
                      placeholder="user@host.com"
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Amount, USD"
                      min="1"
                      className="flex-1"
                    />
                  </div>
                  <Button className="w-full bg-[#006bff] hover:bg-[#0056cc] text-white rounded-md text-base font-semibold py-3">
                    Transfer Money
                  </Button>
                  <div className="text-right mt-2">
                    <button className="text-sm text-gray-500 underline hover:text-gray-700">
                      Disable transfers
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Redeem Tab */}
            {activeTab === "redeem" && (
              <div className="flex flex-col items-center justify-center">
                <div className="w-full max-w-xl mx-auto bg-gray-100 rounded-xl p-8 border border-[#e5e7eb] text-center">
                  <div className="font-semibold text-lg mb-4">
                    Redeem promocode
                  </div>
                  <Input placeholder="Enter promocode" className="mb-4" />
                  <Button className="w-full bg-[#006bff] hover:bg-[#0056cc] text-white rounded-md">
                    Redeem
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
