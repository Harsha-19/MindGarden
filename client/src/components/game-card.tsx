import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import type { GameWithSeller } from "@shared/schema";

interface GameCardProps {
  game: GameWithSeller;
}

export default function GameCard({ game }: GameCardProps) {
  const categoryColors = {
    action: "bg-red-500",
    rpg: "bg-blue-500",
    strategy: "bg-indigo-500",
    simulation: "bg-green-500",
    indie: "bg-purple-500",
    horror: "bg-purple-900",
    arcade: "bg-yellow-500",
  };

  const categoryColor = categoryColors[game.category as keyof typeof categoryColors] || "bg-gray-500";

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden">
        {game.imageUrl ? (
          <img
            src={game.imageUrl}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <span className="text-slate-500 text-sm">No Image</span>
          </div>
        )}
        
        <div className="absolute top-3 left-3">
          <Badge className={`${categoryColor} text-white text-xs`}>
            {game.category.toUpperCase()}
          </Badge>
        </div>
        
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
            <Heart className="h-4 w-4 text-slate-600" />
          </button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-primary mb-1 truncate">
          {game.title}
        </h3>
        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <img
              src={game.seller.profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=32&h=32&fit=crop&crop=face"}
              alt="Seller Avatar"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-slate-500">
              {game.seller.firstName || "Anonymous"} {game.seller.lastName || "Seller"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-accent">
              ${parseFloat(game.price).toFixed(2)}
            </span>
          </div>
        </div>
        
        <Button className="w-full bg-accent text-white hover:bg-blue-600">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
