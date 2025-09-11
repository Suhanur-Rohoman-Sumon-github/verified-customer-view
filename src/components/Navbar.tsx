import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const balance = 500.0; // will come from backend
  const user = { name: "Sayeedrock06", avatar: "" }; // from auth
  const [mobileOpen, setMobileOpen] = useState(false);

  const handlePaymentClick = () => {
    navigate("/payment");
  };

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className="fixed top-0 left-0 z-50 w-full bg-gray-100 border-b 
                 px-3 py-2 flex items-center justify-between gap-2"
      style={{ color: "#006bff" }}
    >
      {/* Left section: Logo + Language + Balance */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold italic text-[#006bff]">
          SSNMAX
        </h1>
        <div></div>
        {/* Language */}
      </div>

      {/* Right section: User + Mobile Menu */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="text-[#006bff] hover:bg-[#006bff]/10 border border-transparent text-sm md:text-base"
            >
              {t("navbar.language")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleChangeLanguage("en")}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangeLanguage("ru")}>
              Русский
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Balance */}
        <Button
          style={{
            background: "#006bff",
            color: "white",
            border: "none",
            fontWeight: 700,
            letterSpacing: "0.03em",
          }}
          className="rounded-full px-3 py-1 text-sm md:px-5 md:py-2 md:text-base hover:opacity-90 transition shadow-none"
          onClick={handlePaymentClick}
        >
          <span className="opacity-80">Balance:</span>
          <span className="ml-1 font-bold">${balance.toFixed(2)}</span>
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 md:h-11 md:w-11 rounded-full border border-[#006bff] hover:opacity-90 transition bg-gray-100 shadow-none"
              style={{ color: "#006bff" }}
            >
              <Avatar className="h-full w-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-[#006bff] text-white/90">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-gray-100 border border-[#006bff]"
            align="end"
            style={{ color: "#006bff" }}
          >
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#e6f0ff]">
              <User size={16} color="#006bff" />
              <span>{user.name}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#e6f0ff]">
              <Settings size={16} color="#006bff" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-destructive hover:bg-[#e6f0ff]">
              <LogOut size={16} color="#006bff" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
