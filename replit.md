# Overview

This is a QA Portfolio web application built as a modern full-stack project showcasing quality assurance expertise, certifications, and projects. The application features a React frontend with shadcn/ui components and an Express.js backend, designed to demonstrate professional QA engineering capabilities through an interactive portfolio interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: TanStack Query for server state management and data fetching
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Hot module replacement and development middleware integration

## Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Schema**: User entity with username/password fields and UUID primary keys
- **Migrations**: Drizzle Kit for database schema versioning and deployment
- **Connection**: Neon Database serverless PostgreSQL integration ready

## Development Environment
- **Monorepo Structure**: Shared schema and utilities between client and server
- **Build Pipeline**: Separate build processes for frontend (Vite) and backend (esbuild)
- **Development Server**: Integrated Vite dev server with Express API proxy
- **Type Safety**: Shared TypeScript configuration across all packages

## UI/UX Design Decisions
- **Design System**: Consistent spacing, typography, and color schemes using CSS custom properties
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Accessibility**: ARIA-compliant components with keyboard navigation support
- **Dark Mode**: Theme switching capability built into the design system

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Drizzle ORM**: Type-safe database operations and schema management

## Frontend Libraries
- **Radix UI**: Headless UI components for accessibility and customization
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for backend builds
- **PostCSS**: CSS processing and optimization

## Hosting Platform
- **Replit**: Development environment with integrated deployment and runtime error monitoring