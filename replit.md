# Summary Goodies - Premium Ecommerce Platform

## Overview

Summary Goodies is a premium ecommerce platform specializing in luxury workspace essentials and professional accessories. The application features a sophisticated dark-themed design inspired by luxury fashion brands, offering products like premium aprons, duffle bags, tech accessories, and office organizers. The platform emphasizes exclusivity and premium positioning through elegant typography, smooth animations, and high-quality product presentations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with a custom design system featuring luxury dark theme colors (midnight blue, electric neon blue accents)
- **UI Components**: Comprehensive component library using Radix UI primitives with shadcn/ui styling
- **Animation**: GSAP (GreenSock) with ScrollTrigger for smooth parallax effects and micro-interactions
- **State Management**: Custom React hooks for cart management and local state
- **Routing**: Wouter for lightweight client-side routing

### Design System
- **Typography**: Playfair Display for elegant headings, Inter for body text
- **Color Palette**: Deep midnight blue backgrounds with electric neon blue accents for premium luxury feel
- **Component Patterns**: Hover effects with glow animations, sophisticated micro-interactions, toast notifications
- **Layout**: Grid-based product layouts with generous whitespace for luxury positioning

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development, ready for database integration
- **API Design**: RESTful endpoints with structured error handling and request logging

### Data Models
- **Products**: Core product information including name, description, price, category, images, and stock levels
- **Cart**: Shopping cart functionality with quantity management
- **Users**: Basic user authentication structure (username/password)
- **Categories**: Product categorization system for filtering and organization

### Development Tools
- **Build System**: Vite for fast development and optimized production builds
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Database Migrations**: Drizzle Kit for schema management and migrations
- **Development Experience**: Hot module replacement, runtime error overlays, and Replit integration

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with React Query for server state management
- **Database**: Neon Database (serverless PostgreSQL) with Drizzle ORM
- **Animation**: GSAP with ScrollTrigger plugin for sophisticated animations
- **UI Components**: Extensive Radix UI component library for accessible primitives

### Development Dependencies
- **Build Tools**: Vite with React plugin, ESBuild for server bundling
- **TypeScript**: Full type safety with strict configuration
- **Styling**: Tailwind CSS with PostCSS, Autoprefixer

### Payment Integration
- **Stripe**: React Stripe.js components for payment processing (configured but not fully implemented)

### Design Assets
- **Fonts**: Google Fonts integration (Playfair Display, Inter, DM Sans, Geist Mono)
- **Images**: Custom generated product images stored in attached assets

### Future Integration Points
- **WhatsApp**: Planned integration for customer communication
- **Session Management**: PostgreSQL session storage configured with connect-pg-simple
- **Form Validation**: Hookform with Zod resolvers for type-safe form handling