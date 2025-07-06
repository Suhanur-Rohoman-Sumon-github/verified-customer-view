import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const balance = 0.73; // This will come from your backend/Supabase
  const user = { name: "Sayeedrock06", avatar: "" }; // This will come from auth

  const handlePaymentClick = () => {
    navigate('/payment');
  };

  return (
    <div className="bg-background border-b border-border p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-primary">SSNBIT Dashboard</h1>
      
      <div className="flex items-center gap-4">
        {/* Balance Display */}
        <Button 
          variant="outline" 
          onClick={handlePaymentClick}
          className="flex items-center gap-2"
        >
          <span className="text-sm">Balance:</span>
          <span className="text-success font-semibold">${balance.toFixed(2)}</span>
        </Button>

        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-background" align="end">
            <DropdownMenuItem className="flex items-center gap-2">
              <User size={16} />
              <span>{user.name}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings size={16} />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-destructive">
              <LogOut size={16} />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}