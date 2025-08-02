import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertGameSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Serve uploaded files
  app.use('/uploads', express.static(uploadDir));

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Game routes
  app.get('/api/games', async (req, res) => {
    try {
      const { search, category, minPrice, maxPrice, sortBy } = req.query;
      
      if (search) {
        const games = await storage.searchGames(search as string);
        res.json(games);
      } else if (category || minPrice || maxPrice || sortBy) {
        const filters = {
          category: category as string,
          minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
          maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
          sortBy: sortBy as 'newest' | 'price-low' | 'price-high' | 'title',
        };
        const games = await storage.filterGames(filters);
        res.json(games);
      } else {
        const games = await storage.getAllGames();
        res.json(games);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
      res.status(500).json({ message: "Failed to fetch games" });
    }
  });

  app.get('/api/games/:id', async (req, res) => {
    try {
      const gameId = parseInt(req.params.id);
      
      if (isNaN(gameId)) {
        return res.status(400).json({ message: "Invalid game ID" });
      }
      
      const game = await storage.getGameById(gameId);
      
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      res.json(game);
    } catch (error) {
      console.error("Error fetching game:", error);
      res.status(500).json({ message: "Failed to fetch game" });
    }
  });

  app.post('/api/games', isAuthenticated, upload.single('image'), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate the request body
      const gameData = insertGameSchema.parse(req.body);
      
      // Handle image upload
      let imageUrl = null;
      if (req.file) {
        const filename = `${Date.now()}-${req.file.originalname}`;
        const newPath = path.join(uploadDir, filename);
        fs.renameSync(req.file.path, newPath);
        imageUrl = `/uploads/${filename}`;
      }
      
      const game = await storage.createGame({
        ...gameData,
        imageUrl,
        sellerId: userId,
      });
      
      res.status(201).json(game);
    } catch (error: any) {
      console.error("Error creating game:", error);
      if (error.name === 'ZodError') {
        res.status(400).json({ message: "Invalid game data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create game" });
      }
    }
  });

  app.get('/api/users/:userId/games', async (req, res) => {
    try {
      const { userId } = req.params;
      const games = await storage.getGamesByUserId(userId);
      res.json(games);
    } catch (error) {
      console.error("Error fetching user games:", error);
      res.status(500).json({ message: "Failed to fetch user games" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
