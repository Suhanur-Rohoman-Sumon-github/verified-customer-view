import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  ShoppingCart,
  Newspaper,
  Users,
  Shield,
  Menu,
  X,
  Plus,
  Coins,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { t } = useTranslation();

  const menuItems = [
    { id: "search", title: t("sidebar.search"), icon: Search },
    { id: "dlssn", title: "DL+SSN", icon: Shield },
    { id: "dlcoinbase", title: "DL for Coinbase", icon: Coins },
    { id: "orders", title: t("sidebar.orders"), icon: ShoppingCart },
    { id: "recharge", title: t("sidebar.recharge"), icon: Plus },
    { id: "news", title: t("sidebar.news"), icon: Newspaper },
    { id: "referrals", title: t("sidebar.referrals"), icon: Users },
    { id: "rules", title: t("sidebar.rules"), icon: Shield },
  ];

  return (
    <>
      {/* ✅ Mobile Toggle Button */}
      <button
        className="md:hidden fixed  left-4 z-30 text-[#006bff]  "
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* ✅ Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40  transition-opacity duration-300 md:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={cn(
          "fixed top-0 left-0 h-screen border w-64 z-50 flex flex-col transition-transform duration-300 bg-gray-100 border-r border-[#006bff] shadow-lg text-[#006bff] md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-bold text-lg text-[#006bff]">Menu</h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 hover:bg-gray-200 rounded-md transition-colors text-[#006bff]"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-md transition-all duration-200",
                    activeTab === item.id
                      ? "bg-[#006bff]/10 text-[#006bff] shadow-lg"
                      : "hover:bg-[#e6f0ff] text-gray-500"
                  )}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ✅ Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex h-screen transition-all duration-300 flex-col bg-gray-100 text-[#006bff]",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-md transition-all duration-200",
                    activeTab === item.id
                      ? "bg-[#006bff]/10 text-[#006bff] shadow-lg"
                      : "hover:bg-[#e6f0ff] text-gray-500"
                  )}
                >
                  <item.icon size={20} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
