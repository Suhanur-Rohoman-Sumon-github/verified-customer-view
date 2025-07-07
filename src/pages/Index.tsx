import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SearchTable } from "@/components/SearchTable";
import { OrdersTable } from "@/components/OrdersTable";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "search":
        return <SearchTable />;
      case "orders":
        return <OrdersTable />;
      case "recharge":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Redirecting to payment...</h2>
            {(() => {
              setTimeout(() => navigate('/payment'), 0);
              return null;
            })()}
          </div>
        );
      case "news":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">News</h2>
            <p className="text-muted-foreground">No news updates available at this time.</p>
          </div>
        );
      case "referrals":
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Referral Program</h2>
            <div className="grid gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Earn $2 per Referral!</h3>
                <p className="text-muted-foreground mb-4">
                  Share your referral link and earn $2 for every successful referral that signs up and makes their first purchase.
                </p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <label className="text-sm font-medium mb-2 block">Your Referral Link:</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value="https://ssnbit.com/ref/sayeedrock06" 
                      readOnly 
                      className="flex-1 px-3 py-2 bg-background border rounded-md"
                    />
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">Referral Stats</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-md">
                    <div className="text-2xl font-bold text-primary">0</div>
                    <div className="text-sm text-muted-foreground">Total Referrals</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-md">
                    <div className="text-2xl font-bold text-success">$0.00</div>
                    <div className="text-sm text-muted-foreground">Earnings</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-md">
                    <div className="text-2xl font-bold text-accent">0</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "rules":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Rules & Guidelines</h2>
            <p className="text-muted-foreground">Platform rules and guidelines will be displayed here.</p>
          </div>
        );
      default:
        return <SearchTable />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 relative">
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-10">
          <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <main className="flex-1 ml-64 p-6 h-[calc(100vh-4rem)] overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
