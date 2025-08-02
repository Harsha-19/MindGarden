import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Gamepad2 } from "lucide-react";
import type { GameWithSeller } from "@shared/schema";

interface GameCardProps {
  game: GameWithSeller;
}

export default function GameCard({ game }: GameCardProps) {
  const categoryClasses = {
    action: "category-action",
    rpg: "category-rpg", 
    strategy: "category-strategy",
    simulation: "category-simulation",
    indie: "category-indie",
    horror: "category-horror",
    arcade: "category-arcade",
  };

  const categoryClass = categoryClasses[game.category as keyof typeof categoryClasses] || "bg-gray-500";

  return (
    <Card className="gaming-card group">
      <div className="relative h-48 sm:h-52 lg:h-48 overflow-hidden">
        {game.imageUrl ? (
          <img
            src={game.imageUrl}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
            <Gamepad2 className="w-12 h-12 text-muted-foreground opacity-50" />
          </div>
        )}
        
        {/* Gaming overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-3 left-3">
          <Badge className={`${categoryClass} text-white text-xs font-semibold px-2 py-1 shadow-lg`}>
            {game.category.toUpperCase()}
          </Badge>
        </div>
        
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all group/heart">
            <Heart className="h-4 w-4 text-white group-hover/heart:text-red-400 transition-colors" />
          </button>
        </div>
        
        {/* Price overlay on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-white font-bold">
              ${parseFloat(game.price).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 relative">
        <h3 className="font-bold text-lg text-foreground mb-2 truncate group-hover:text-primary transition-colors">
          {game.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={game.seller.profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face"}
              alt="Seller Avatar"
              className="w-6 h-6 rounded-full object-cover ring-2 ring-primary/20"
            />
            <span className="text-xs text-muted-foreground font-medium">
              {game.seller.firstName || "Anonymous"} {game.seller.lastName || "Seller"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-accent drop-shadow-sm">
              ${parseFloat(game.price).toFixed(2)}
            </span>
          </div>
        </div>
        
        <Button className="w-full gaming-button text-white font-semibold py-2.5 shadow-lg">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
