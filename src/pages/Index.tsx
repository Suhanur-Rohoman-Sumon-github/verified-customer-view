import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SearchTable } from "@/components/SearchTable";
import { OrdersTable } from "@/components/OrdersTable";
import { Navbar } from "@/components/Navbar";

import Referral from "./Referral.tsx";

import { useNavigate } from "react-router-dom";
import DLSSN from "./DLSSN.tsx";
import DLCoinbase from "./DLCoinbase.tsx";
import { useLoadUserFromCookie } from "@/utils/useLoadUserFromCookie.ts";
import CartTable from "@/components/CartTable.tsx";
import SettingsPage from "@/components/Settings.tsx";
import SupportPage from "@/components/SupportPage.tsx";
import Rules from "@/components/Rules.tsx";
import NewsPage from "@/components/News.tsx";

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");
  const navigate = useNavigate();

  const user = useLoadUserFromCookie();


  useLoadUserFromCookie();

  if (!user || !user._id) {
    navigate("/login");
    return null;
  }

  let referralContent = null;
  if (activeTab === "search") {
    referralContent = <SearchTable />;
  } else if (activeTab === "orders") {
    referralContent = <OrdersTable />;
  } else if (activeTab === "dlssn") {
    referralContent = <DLSSN />;
  } else if (activeTab === "cart") {
    referralContent = <CartTable />;
  } else if (activeTab === "settings") {
    referralContent = <SettingsPage />;
  } else if (activeTab === "support") {
    referralContent = <SupportPage />;
  } else if (activeTab === "recharge") {
    referralContent = (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Redirecting to payment...</h2>
        {(() => {
          setTimeout(() => navigate("/payment"), 0);
          return null;
        })()}
      </div>
    );
  } else if (activeTab === "referrals") {
    referralContent = <Referral />;
  } else if (activeTab === "News") {
    referralContent = <NewsPage />;
  } else if (activeTab === "rules") {
    referralContent = <Rules />;
  }

  return (
    <div className="min-h-screen flex  text-gray-900 mx-auto   pt-[70px]     bg-gray-100">
      {/* Sidebar always visible on left */}
      <div className="z-20 h-screen sticky top-0 overflow-y-auto border-r border-gray-200 ">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      {/* Main content area with navbar and page */}
      <div className="flex-1 flex flex-col min-w-0 ">
        <Navbar />
        <main className="flex-1 p-2 md:p-6 overflow-auto transition-all duration-300   ">
          {referralContent}
        </main>
      </div>
    </div>
  );
};

export default Index;
