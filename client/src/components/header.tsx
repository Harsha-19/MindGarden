import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gamepad2, Search, Plus, ChevronDown } from "lucide-react";
import UserMenu from "./user-menu";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  onSearch: (query: string) => void;
  onSellGame: () => void;
}

export default function Header({ onSearch, onSellGame }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Gamepad2 className="text-accent text-2xl mr-2" />
              <span className="text-xl font-bold text-primary">GameHub</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 bg-slate-50 focus:bg-white transition-colors"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button onClick={onSellGame} className="bg-accent text-white hover:bg-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Sell Game
            </Button>
            
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <img
                  src={(user as any)?.profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=40&h=40&fit=crop&crop=face"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown className="h-3 w-3" />
              </button>
              
              {showUserMenu && (
                <UserMenu onClose={() => setShowUserMenu(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
