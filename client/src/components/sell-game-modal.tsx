import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertGameSchema } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CloudUpload } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { z } from "zod";

interface SellGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = z.infer<typeof insertGameSchema>;

const categories = [
  { value: "action", label: "Action" },
  { value: "rpg", label: "RPG" },
  { value: "strategy", label: "Strategy" },
  { value: "simulation", label: "Simulation" },
  { value: "indie", label: "Indie" },
  { value: "horror", label: "Horror" },
  { value: "arcade", label: "Arcade" },
];

export default function SellGameModal({ isOpen, onClose }: SellGameModalProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<FormData>({
    resolver: zodResolver(insertGameSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
    },
  });

  const category = watch("category");

  const createGameMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await fetch("/api/games", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status}: ${errorText}`);
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Game Listed Successfully",
        description: "Your game has been added to the marketplace.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/games"] });
      handleClose();
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
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
      
      toast({
        title: "Error",
        description: "Failed to create game listing. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedImage(null);
    setImagePreview(null);
    onClose();
  };

  const onSubmit = (data: FormData) => {
    createGameMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">List Your Game</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Game Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-slate-700">
              Game Title *
            </Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter your game title"
              className="mt-1"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Game Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-slate-700">
              Description *
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              rows={4}
              placeholder="Describe your game..."
              className="mt-1"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-sm font-medium text-slate-700">
                Price (USD) *
              </Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("price")}
                  placeholder="0.00"
                  className="pl-8"
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="category" className="text-sm font-medium text-slate-700">
                Category *
              </Label>
              <Select value={category} onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Game Screenshot/Cover
            </Label>
            <div className="mt-1">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setImagePreview(null);
                      setSelectedImage(null);
                    }}
                    className="absolute top-2 right-2"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-accent transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <CloudUpload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600">Click to upload game image</p>
                    <p className="text-sm text-slate-500">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createGameMutation.isPending}
              className="flex-1 bg-accent text-white hover:bg-blue-600"
            >
              {createGameMutation.isPending ? "Creating..." : "List Game"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
