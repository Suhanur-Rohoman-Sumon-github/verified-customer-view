import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SearchTable } from "@/components/SearchTable";
import { OrdersTable } from "@/components/OrdersTable";

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");

  const renderContent = () => {
    switch (activeTab) {
      case "search":
        return <SearchTable />;
      case "orders":
        return <OrdersTable />;
      case "news":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">News</h2>
            <p className="text-muted-foreground">No news updates available at this time.</p>
          </div>
        );
      case "referrals":
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Referrals</h2>
            <p className="text-muted-foreground">Referral program coming soon.</p>
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
    <div className="min-h-screen flex bg-background">
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
