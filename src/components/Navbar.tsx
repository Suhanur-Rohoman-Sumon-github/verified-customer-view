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
import { useGetMyBalanceQuery } from "@/redux/fetures/auth/auth.api";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/hook";
import { logOut } from "@/redux/fetures/auth/auth.slice";
import Marquee from "react-fast-marquee";
import { useLoadUserFromCookie } from "@/utils/useLoadUserFromCookie";
export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useLoadUserFromCookie();
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
    <div className="fixed top-0 left-0 z-50 w-full bg-gray-100 border-b px-4  flex items-center justify-between gap-4">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            src="https://i.ibb.co.com/zHGk75Sv/Chat-GPT-Image-Oct-20-2025-10-47-08-AM.png"
            alt="Logo"
            className="h-24 w-[100px] cursor-pointer"
          />
        </Link>
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
            <Button variant="ghost" className="p-0 cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={
                    balanceData?.data?.profilePicture ||
                    "https://static.vecteezy.com/system/resources/previews/025/463/773/non_2x/hacker-logo-design-a-mysterious-and-dangerous-hacker-illustration-vector.jpg"
                  }
                  alt={user?.username}
                />
                <AvatarFallback>
                  {user?.username?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-gray-100 border border-[#006bff] cursor-pointer"
            align="end"
            style={{ color: "#006bff" }}
          >
            <Link className="cursor-pointer" to="/profile">
              {" "}
              <DropdownMenuItem className="flex items-center gap-2 text-destructive hover:bg-[#e6f0ff] cursor-pointer">
                <User size={16} color="#006bff" />
                {user?.username}
              </DropdownMenuItem>
            </Link>
            <Link className="cursor-pointer" to="/settings">
              {" "}
              <DropdownMenuItem className="flex items-center gap-2 text-destructive hover:bg-[#e6f0ff] cursor-pointer">
                <Settings size={16} color="#006bff" />
                {"settings"}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="flex items-center gap-2 text-destructive hover:bg-[#e6f0ff] cursor-pointer">
              <LogOut size={16} color="#006bff" />
              <span onClick={handleLogout}>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
