import { useState } from "react";
import { 
  Search, 
  ShoppingCart, 
  Newspaper, 
  Users, 
  Shield,
  Menu,
  X
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "search", title: "Search", icon: Search },
    { id: "orders", title: "Orders", icon: ShoppingCart },
    { id: "news", title: "News", icon: Newspaper },
    { id: "referrals", title: "Referrals", icon: Users },
    { id: "rules", title: "Rules", icon: Shield },
  ];

  return (
    <div className={cn(
      "bg-slate-900 text-white h-screen transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-2xl font-bold italic text-primary">SSNBIT</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-slate-800 rounded-md transition-colors"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-md transition-all duration-200",
                  "hover:bg-slate-800",
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-slate-300"
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

      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700">
          <div className="text-sm text-slate-400">
            <p>Balance: <span className="text-success font-semibold">$0.73</span></p>
            <p className="text-xs mt-1">User: Sayeedrock06</p>
          </div>
        </div>
      )}
    </div>
  );
}