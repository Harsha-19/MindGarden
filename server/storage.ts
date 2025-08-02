import {
  users,
  games,
  type User,
  type UpsertUser,
  type Game,
  type InsertGame,
  type GameWithSeller,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, ilike, and, gte, lte, asc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Game operations
  getAllGames(): Promise<GameWithSeller[]>;
  getGameById(id: number): Promise<GameWithSeller | undefined>;
  getGamesByUserId(userId: string): Promise<GameWithSeller[]>;
  createGame(game: InsertGame & { sellerId: string }): Promise<Game>;
  searchGames(query: string): Promise<GameWithSeller[]>;
  filterGames(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'newest' | 'price-low' | 'price-high' | 'title';
  }): Promise<GameWithSeller[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Game operations
  async getAllGames(): Promise<GameWithSeller[]> {
    return await db
      .select({
        id: games.id,
        title: games.title,
        description: games.description,
        price: games.price,
        category: games.category,
        imageUrl: games.imageUrl,
        sellerId: games.sellerId,
        createdAt: games.createdAt,
        updatedAt: games.updatedAt,
        seller: {
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          profileImageUrl: users.profileImageUrl,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        },
      })
      .from(games)
      .innerJoin(users, eq(games.sellerId, users.id))
      .orderBy(desc(games.createdAt));
  }

  async getGameById(id: number): Promise<GameWithSeller | undefined> {
    const [game] = await db
      .select({
        id: games.id,
        title: games.title,
        description: games.description,
        price: games.price,
        category: games.category,
        imageUrl: games.imageUrl,
        sellerId: games.sellerId,
        createdAt: games.createdAt,
        updatedAt: games.updatedAt,
        seller: {
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          profileImageUrl: users.profileImageUrl,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        },
      })
      .from(games)
      .innerJoin(users, eq(games.sellerId, users.id))
      .where(eq(games.id, id));
    
    return game;
  }

  async getGamesByUserId(userId: string): Promise<GameWithSeller[]> {
    return await db
      .select({
        id: games.id,
        title: games.title,
        description: games.description,
        price: games.price,
        category: games.category,
        imageUrl: games.imageUrl,
        sellerId: games.sellerId,
        createdAt: games.createdAt,
        updatedAt: games.updatedAt,
        seller: {
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          profileImageUrl: users.profileImageUrl,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        },
      })
      .from(games)
      .innerJoin(users, eq(games.sellerId, users.id))
      .where(eq(games.sellerId, userId))
      .orderBy(desc(games.createdAt));
  }

  async createGame(gameData: InsertGame & { sellerId: string }): Promise<Game> {
    const [game] = await db
      .insert(games)
      .values(gameData)
      .returning();
    return game;
  }

  async searchGames(query: string): Promise<GameWithSeller[]> {
    return await db
      .select({
        id: games.id,
        title: games.title,
        description: games.description,
        price: games.price,
        category: games.category,
        imageUrl: games.imageUrl,
        sellerId: games.sellerId,
        createdAt: games.createdAt,
        updatedAt: games.updatedAt,
        seller: {
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          profileImageUrl: users.profileImageUrl,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        },
      })
      .from(games)
      .innerJoin(users, eq(games.sellerId, users.id))
      .where(
        ilike(games.title, `%${query}%`)
      )
      .orderBy(desc(games.createdAt));
  }

  async filterGames(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'newest' | 'price-low' | 'price-high' | 'title';
  }): Promise<GameWithSeller[]> {
    const conditions = [];
    
    if (filters.category) {
      conditions.push(eq(games.category, filters.category));
    }
    
    if (filters.minPrice !== undefined) {
      conditions.push(gte(games.price, filters.minPrice.toString()));
    }
    
    if (filters.maxPrice !== undefined) {
      conditions.push(lte(games.price, filters.maxPrice.toString()));
    }

    let orderBy;
    switch (filters.sortBy) {
      case 'price-low':
        orderBy = asc(games.price);
        break;
      case 'price-high':
        orderBy = desc(games.price);
        break;
      case 'title':
        orderBy = asc(games.title);
        break;
      default:
        orderBy = desc(games.createdAt);
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    return await db
      .select({
        id: games.id,
        title: games.title,
        description: games.description,
        price: games.price,
        category: games.category,
        imageUrl: games.imageUrl,
        sellerId: games.sellerId,
        createdAt: games.createdAt,
        updatedAt: games.updatedAt,
        seller: {
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          profileImageUrl: users.profileImageUrl,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        },
      })
      .from(games)
      .innerJoin(users, eq(games.sellerId, users.id))
      .where(whereClause)
      .orderBy(orderBy);
  }
}

export const storage = new DatabaseStorage();
