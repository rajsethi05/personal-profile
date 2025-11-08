# Project Details Page - Design Guidelines

## Design Approach
**Reference-Based**: Drawing from Linear (clean typography), GitHub (technical clarity), and Notion (content presentation). Portfolio sites demand visual distinction while maintaining professional credibility.

## Typography System
- **Headings**: Inter or DM Sans (700) - Project titles at 2.5rem, section headers at 1.75rem
- **Body**: Inter or system-ui (400) - 1.125rem with 1.75 line-height for markdown content
- **Code/Technical**: JetBrains Mono - for tech stack displays
- **Spacing Scale**: Use Tailwind units of 3, 6, 8, 12, 16 for consistent rhythm

## Layout Architecture

### Hero Banner Section
Full-width container with project showcase image (aspect-16/9, max-h-screen/2):
- Overlay gradient (purple tint) for brand consistency
- Breadcrumb navigation (top-left): Home > Projects > [Project Name]
- Project title centered over image (text-4xl to text-6xl)
- Subtitle/role beneath title
- Blurred-background CTA buttons centered below: "View Demo" + "GitHub Repository"

### Project Meta Section
Contained width (max-w-5xl), grid layout (md:grid-cols-3 gap-6):
- **Column 1**: Project duration, team size, role
- **Column 2**: Status badge, deployment info
- **Column 3**: Quick stats (tests written, coverage %, bugs found)
Each card with subtle border, padding-6

### Technologies Stack
Full-width colored background section (purple-50 equivalent):
- Centered heading "Technologies & Tools"
- Flex wrap of technology pills/badges (rounded-full, purple accent borders)
- Include icons from Font Awesome for each tech
- Categorize: Testing Frameworks | Automation Tools | Languages | CI/CD

### Main Content Area
Two-column layout (lg:grid-cols-[2fr_1fr] gap-12):

**Left Column - Markdown Content**:
- max-w-prose for optimal reading
- Styled markdown: headings with purple accent borders, code blocks with syntax highlighting
- Image support within content (rounded corners, shadow)
- Lists with custom purple bullet points
- Blockquotes with left purple accent bar

**Right Sidebar - Sticky**:
- Table of Contents (auto-generated from markdown headers)
- Project Links card (GitHub, Live Demo, Documentation)
- Key Metrics visualization
- Related Projects suggestions (3 cards)

### Gallery Section (if applicable)
Masonry grid (md:grid-cols-2 lg:grid-cols-3):
- Screenshots, test reports, architecture diagrams
- Lightbox functionality on click
- Captions below each image

### Impact/Results Section
Full-width with contained inner (max-w-6xl):
- Split layout: Image/chart on left, metrics/achievements on right
- Highlight: Performance improvements, bugs caught, automation coverage
- Visual data representations (consider chart libraries)

## Component Specifications

**Navigation**: Sticky header with back arrow, project title, and action buttons (GitHub/Demo)

**Footer**: Minimal - Next/Previous project navigation with thumbnails

**Spacing**: Sections separated by py-16 to py-24, inner content uses py-8 to py-12

## Images Required

1. **Hero Banner**: High-quality project screenshot or application mockup (1920x1080 recommended)
2. **Technology Icons**: Use Font Awesome CDN for standardized tech logos
3. **Gallery Images**: 4-6 screenshots showing different features/test scenarios
4. **Impact Visual**: Chart or dashboard screenshot demonstrating results

**Hero Image Treatment**: Apply subtle purple overlay (bg-purple-900/20) with backdrop-blur-sm on button containers

## Interaction Patterns
- Smooth scroll to sections from TOC
- Expand/collapse for long code blocks
- Copy-to-clipboard for code snippets
- Hover states for technology badges (slight scale-105 transform)

**Critical**: No floating elements - content flows naturally with generous whitespace between sections. Purple theme expressed through accents (borders, badges, links) not overwhelming backgrounds.