import { useAuth } from "@/hooks/useAuth";
import { User, Gamepad2, ShoppingCart, Heart, Settings, LogOut } from "lucide-react";

interface UserMenuProps {
  onClose: () => void;
}

export default function UserMenu({ onClose }: UserMenuProps) {
  const { user } = useAuth();

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const menuItems = [
    { icon: User, label: "My Profile", action: () => {} },
    { icon: Gamepad2, label: "My Listings", action: () => {} },
    { icon: ShoppingCart, label: "My Purchases", action: () => {} },
    { icon: Heart, label: "Wishlist", action: () => {} },
    { icon: Settings, label: "Settings", action: () => {} },
  ];

  return (
    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-slate-200 w-64 z-50">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <img
            src={(user as any)?.profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=48&h=48&fit=crop&crop=face"}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-primary">
              {(user as any)?.firstName || "Anonymous"} {(user as any)?.lastName || "User"}
            </p>
            <p className="text-sm text-slate-500">{(user as any)?.email}</p>
          </div>
        </div>
      </div>
      
      <nav className="py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.action();
              onClose();
            }}
            className="flex items-center w-full px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <item.icon className="h-4 w-4 mr-3 text-slate-400" />
            {item.label}
          </button>
        ))}
        
        <div className="border-t border-slate-200 mt-2 pt-2">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
}
