import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, Menu, X, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/utils/getCurrentUser";
import { useGetMyBalanceQuery } from "@/redux/fetures/auth/auth.api";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/hook";
import { logOut } from "@/redux/fetures/auth/auth.slice";
import Marquee from "react-fast-marquee";
export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const dispatch = useAppDispatch();

  const { data: balanceData, refetch } = useGetMyBalanceQuery(
    user?._id as string,
    {
      skip: !user?._id,
    }
  );

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    dispatch(logOut());
    navigate("/login");
  };

  const { t, i18n } = useTranslation();
  const balance = balanceData?.data?.balance;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handlePaymentClick = () => {
    navigate("/payment");
  };

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-gray-100 border-b px-4 py-2 flex items-center justify-between gap-4">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <img
          src="https://i.ibb.co.com/dJbS5Qy3/Generated-Image-October-19-2025-12-46-AM.png"
          alt="Logo"
          className="h-14 w-auto"
        />
        <div className="text-lg font-semibold text-[]">
          <Marquee gradient={false} speed={30}>
            <span>Join our Telegram channel</span>
            <span className="ml-4 font-semibold">
              Telegram:{" "}
              <a
                href="https://t.me/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#006bff] hover:underline"
              >
                @YourTelegram
              </a>
            </span>
          </Marquee>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Shopping Cart */}

        {/* Balance */}
        <Button
          className="rounded-full px-3 py-1 text-sm md:px-5 md:py-2 md:text-base hover:opacity-90 transition shadow-none"
          onClick={handlePaymentClick}
        >
          <span className="opacity-80">Balance:</span>
          <span className="ml-1 font-bold">${balance?.toFixed(2) || 0}</span>
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0">
              <Avatar>
                <AvatarImage
                  src="https://static.vecteezy.com/system/resources/previews/025/463/773/non_2x/hacker-logo-design-a-mysterious-and-dangerous-hacker-illustration-vector.jpg"
                  alt={user.username}
                />
                <AvatarFallback>
                  {user?.username?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-gray-100 border border-[#006bff]"
            align="end"
            style={{ color: "#006bff" }}
          >
            <DropdownMenuItem className="flex items-center gap-2 text-destructive hover:bg-[#e6f0ff]">
              <User size={16} color="#006bff" />
              {user?.username}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-destructive hover:bg-[#e6f0ff]">
              <Settings size={16} color="#006bff" />
              <Link to="/settings">{"settings"}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-destructive hover:bg-[#e6f0ff]">
              <LogOut size={16} color="#006bff" />
              <span onClick={handleLogout}>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
