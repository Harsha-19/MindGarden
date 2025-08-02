import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import FilterBar from "@/components/filter-bar";
import GameCard from "@/components/game-card";
import SellGameModal from "@/components/sell-game-modal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { GameWithSeller } from "@shared/schema";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [showSellModal, setShowSellModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest",
  });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: games = [], isLoading: gamesLoading, error } = useQuery<GameWithSeller[]>({
    queryKey: ["/api/games", searchQuery, filters],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (error && isUnauthorizedError(error as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [error, toast]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        onSearch={handleSearch}
        onSellGame={() => setShowSellModal(true)}
      />
      <FilterBar onFilter={handleFilter} />
      
      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-r from-purple-900 to-blue-900 mb-8">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 h-full flex items-center">
            <div className="ml-8 max-w-lg">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Discover Amazing Games
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                Buy and sell digital games from indie developers to AAA studios
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">Latest Games</h2>
          <p className="text-slate-600">Discover new and exciting games from our community</p>
        </div>

        {gamesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}

        {!gamesLoading && games.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No games found. Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-accent rounded mr-2"></div>
                <span className="text-lg font-bold text-primary">GameHub</span>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                The premier marketplace for digital games. Connect developers with players worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-4">For Buyers</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-600 hover:text-accent transition-colors">Browse Games</a></li>
                <li><a href="#" className="text-slate-600 hover:text-accent transition-colors">New Releases</a></li>
                <li><a href="#" className="text-slate-600 hover:text-accent transition-colors">Top Rated</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-4">For Sellers</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-600 hover:text-accent transition-colors">Start Selling</a></li>
                <li><a href="#" className="text-slate-600 hover:text-accent transition-colors">Seller Guidelines</a></li>
                <li><a href="#" className="text-slate-600 hover:text-accent transition-colors">Marketing Tools</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-600 hover:text-accent transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-600 hover:text-accent transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-slate-600 hover:text-accent transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-8 pt-8 text-center">
            <p className="text-sm text-slate-500">
              © 2024 GameHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <SellGameModal 
        isOpen={showSellModal}
        onClose={() => setShowSellModal(false)}
      />
    </div>
  );
}
