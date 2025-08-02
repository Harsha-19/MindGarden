# GameHub - Digital Game Marketplace

## Overview

GameHub is a full-stack digital game marketplace that allows users to buy and sell video games. The application features user authentication, game listings with image uploads, search and filtering capabilities, and a modern responsive UI. Users can browse games by category, price range, and other filters, while authenticated users can list their own games for sale.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives with Tailwind CSS
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod schema validation for type-safe form management
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **File Uploads**: Multer middleware for handling image uploads with file validation
- **API Design**: RESTful API endpoints with JSON responses and proper error handling
- **Development**: Hot reload support with Vite integration for seamless development

### Authentication System
- **Provider**: Replit Authentication using OpenID Connect (OIDC)
- **Session Management**: Express sessions with PostgreSQL session store using connect-pg-simple
- **Security**: HTTP-only cookies, CSRF protection, and secure session configuration
- **User Management**: Automatic user creation and profile management with upsert operations

### Database Architecture
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Design**: 
  - Users table with profile information and Replit integration
  - Games table with seller relationships and marketplace data
  - Sessions table for authentication state persistence
- **Relationships**: Foreign key constraints with cascade deletion for data integrity

### File Storage
- **Upload Handling**: Local file system storage in uploads directory
- **File Validation**: Image-only uploads with 10MB size limit
- **Static Serving**: Express static middleware for serving uploaded images
- **File Organization**: Automatic directory creation and file management

### Key Features
- **Game Marketplace**: Create, browse, and search game listings with detailed information
- **Image Management**: Upload and display game images with fallback handling
- **Advanced Filtering**: Category-based filtering, price ranges, and sorting options
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Real-time Updates**: Optimistic updates and automatic data synchronization
- **Error Handling**: Comprehensive error boundaries and user feedback systems

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle Kit**: Database migrations and schema management tools

### Authentication Services
- **Replit Authentication**: OIDC-based authentication with automatic user provisioning
- **OpenID Client**: Standards-compliant authentication flow implementation

### Development Tools
- **Vite**: Fast build tool with Hot Module Replacement and development server
- **TypeScript**: Static type checking across the entire application stack
- **ESBuild**: Fast JavaScript bundling for production builds

### UI and Styling
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework with design system integration
- **Lucide React**: Consistent icon library with tree-shaking support

### Utility Libraries
- **Zod**: Runtime type validation and schema definition
- **Class Variance Authority**: Type-safe utility for conditional CSS classes
- **Date-fns**: Date manipulation and formatting utilities
- **Nanoid**: Secure unique ID generation for various application needs