# Overview

This is a QA Portfolio web application built as a static React site showcasing quality assurance expertise, certifications, and projects. The application features a React frontend with shadcn/ui components, designed to demonstrate professional QA engineering capabilities through an interactive portfolio interface. All content is stored in JSON files and deployed to GitHub Pages.

## Recent Updates (November 2025)
- **Converted to Static Site**: Removed all backend (Express.js) dependencies for GitHub Pages deployment
- **Environment Variables**: Added VITE_PROFILE_ID for multi-profile support (set at build time)
- **Base URL**: Changed from `/personal-profile/` to `/` for flexible deployment
- **Contact Method**: Changed from form to mailto link (opens user's email client)
- **Profile Picture**: Static image at `/uploads/profile_picture.jpg`, no upload functionality
- **Blog Editor**: Removed - blogs are now managed by editing JSON files directly
- **GitHub Integration**: Clickable GitHub button on projects page links to repository; "Full Project on Github" link on blog detail pages
- **Navigation**: All pages auto-scroll to top on load; "Back to Projects" button on blog details
- **Featured Projects**: Removed from home page for cleaner layout

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Static Site Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing  
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds
- **Data Storage**: Static JSON files in `client/src/data/` directory
- **Environment Variables**: VITE_PROFILE_ID for profile-based content loading
- **Deployment**: GitHub Pages (or any static hosting) with base path `/`

## Development Environment
- **Development Server**: Vite development server with hot module replacement on port 5000
- **Build Process**: `vite build` generates static files to `dist/public/`
- **Preview**: `vite preview` for testing production build locally
- **Type Safety**: TypeScript with strict type checking
- **Environment Config**: `.env` file for local development (VITE_PROFILE_ID=default)

## UI/UX Design Decisions
- **Design System**: Consistent spacing, typography, and color schemes using CSS custom properties
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Accessibility**: ARIA-compliant components with keyboard navigation support
- **Dark Mode**: Theme switching capability built into the design system

# External Dependencies

## Frontend Libraries
- **Radix UI**: Headless UI components for accessibility and customization
- **TanStack Query**: Client state management (simplified for static site)
- **Wouter**: Lightweight routing library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form validation and management
- **Framer Motion**: Animation library for smooth transitions

## Development Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **PostCSS**: CSS processing and optimization

## Hosting Platforms
- **GitHub Pages**: Static site hosting for production deployment
- **Replit**: Development environment (optional)

# Portfolio Features

## Pages
- **Home** (`/`): Profile, work experience, skills, and offerings with static profile picture
- **Projects** (`/projects`): Project showcases with descriptions, technologies, and GitHub links
- **Certifications** (`/certifications`): Professional certifications and credentials  
- **Project Details** (`/project/details/:filename`): Full blog post with GitHub repository link

## Interactive Features
- **Contact Method**: "Get In Touch" button opens mailto link to raj.sethi05@gmail.com
- **GitHub Integration**: 
  - Clickable GitHub icon on project cards links to repository
  - "Full Project on Github" link at bottom of blog detail pages
- **Navigation**: Smooth scroll-to-top on page load, "Back to Projects" button on blog details
- **Responsive Design**: Mobile-first design with breakpoint-based layouts

## Content Management
- **Data Storage**: All content in static JSON files under `client/src/data/`
  - `workexp.json`: Work experience entries
  - `skills.json`: Technical skills organized by category
  - `offerings.json`: QA services and offerings
  - `projects.json`: Project metadata with links to blog details
  - `blogs/*.json`: Individual blog post content
- **Blog Posts**: Located in `client/src/data/blogs/`
- **Static Assets**: Profile picture at `/uploads/profile_picture.jpg`

## Updating Content
To add or modify content:
1. Edit the appropriate JSON file in `client/src/data/`
2. For new blog posts, create JSON file in `client/src/data/blogs/`
3. Add entry to `projects.json` with `project_url` linking to blog
4. Rebuild and redeploy to GitHub Pages