# Overview

This is a QA Portfolio web application built as a modern full-stack project showcasing quality assurance expertise, certifications, and projects. The application features a React frontend with shadcn/ui components and an Express.js backend, designed to demonstrate professional QA engineering capabilities through an interactive portfolio interface.

## Recent Updates (October 2025)
- **Contact Form**: Added contact form popup with From Email (mandatory) and To Email (pre-filled) fields. Currently logs to console; can be integrated with email service.
- **Hidden Blog Editor**: Created at `/project_blog` route with rich text editor, supporting full formatting (bold, italic, colors, images, code blocks, etc.). Includes Publish and Save Draft functionality with JSON file storage.
- **Profile Picture Upload**: Users can upload and change profile picture, stored in /uploads folder.

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
- **React Quill**: Rich text editor with full formatting support for blog creation

## Development Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for backend builds
- **PostCSS**: CSS processing and optimization

## Hosting Platform
- **Replit**: Development environment with integrated deployment and runtime error monitoring

# Portfolio Features

## Main Pages
- **Home** (`/`): Profile, work experience, skills, and featured projects
- **Projects** (`/projects`): Detailed project showcases with descriptions and technologies
- **Certifications** (`/certifications`): Professional certifications and credentials

## Hidden/Admin Pages
- **Blog Editor** (`/project_blog`): Rich text blog editor with publish/draft functionality
  - Fields: Title, Category, Technologies, Cover Image (upload), Project Summary
  - Cover Image: Upload button saves images to `/uploads` folder with preview
  - Project Summary: Brief description used for projects page
  - Rich text editor with formatting: bold, italic, colors, headers, lists, images, code blocks, etc.
  - **Publish**: Opens dialog for filename input, saves blog to `client/src/data/blogs/` AND adds project to `client/src/data/projects.json`
  - **Save Draft**: Auto-generates filename, saves to `client/src/data/draft/`
  - Blog JSON: `{ title, category, technologies, coverImage, description }`
  - Project JSON: `{ title, category, technologies, image, description (from projectSummary) }`

## Interactive Features
- **Contact Form**: Popup with From Email (required), To Email (pre-filled: raj.sethi05@gmail.com), and Message
  - Email validation included
  - Backend endpoint: `/api/send-contact-email` (currently logs to console)
  - Ready for email service integration (Resend/SendGrid/Gmail)
- **Profile Picture Upload**: Click profile image to upload custom photo
  - Saves to `/uploads` folder
  - Persists selection in localStorage
  - 5MB max file size, supports JPG/PNG/WebP

## Data Storage
- Work experience, skills, offerings, and projects stored in JSON files under `client/src/data/`
- Blog posts: `client/src/data/blogs/` (published) and `client/src/data/draft/` (drafts)
- Profile images: `/uploads` folder