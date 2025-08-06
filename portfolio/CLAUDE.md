# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern Next.js 15 portfolio website for Nguyen Quoc Huy (Leo), an AI Research Engineer and entrepreneur. The website features a cyberpunk-themed design with multilingual support (English/Vietnamese), dark/light theme switching, and showcases projects, research, experience, and certifications.

## Development Commands

### Essential Commands
```bash
# Development server with Turbopack (faster builds)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code with ESLint
npm run lint

# Optimize images
npm run optimize-images
```

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:3000
```

## Architecture & Code Structure

### Tech Stack
- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.0 with custom cyberpunk theme
- **UI**: React 19.0.0 with custom components
- **Theme**: next-themes for dark/light mode
- **Build**: Turbopack for fast development

### Key Architectural Patterns

#### Component Architecture
All components are located in `src/components/` and follow a section-based structure:
- **Section Components**: `HeroSection`, `AboutSection`, `SkillsSection`, etc. - each represents a full-screen section of the portfolio
- **Utility Components**: `Navbar`, `ThemeSwitcher`, `LanguageSwitcher` - reusable UI components
- **Layout Components**: `Starfield`, `ScrollToTopButton` - visual enhancement components

#### Internationalization System
- **Context-based**: Uses React Context (`LanguageContext`) for state management
- **Translation Keys**: Hierarchical naming convention like `section.subsection.key`
- **Persistent Storage**: Language preference saved to localStorage
- **Custom Events**: Dispatches `languageChanged` events for component updates

#### Theme System
- **Global CSS Variables**: Cyberpunk color palette defined in `globals.css`
- **Tailwind Integration**: Custom classes for neon effects, animations
- **Theme Provider**: Uses next-themes for system/manual theme switching
- **Cyberpunk Aesthetics**: Neon glows, terminal styling, matrix-style animations

#### Data Management
- **Static Data**: Certificates data in `src/data/certificates.ts`
- **Static Assets**: Images in `public/` with optimization
- **Type Safety**: Full TypeScript coverage with strict configuration

### File Organization Principles
- **App Router**: Next.js 15 app directory structure
- **Component Co-location**: Related components in single directory
- **Asset Optimization**: Separate `scripts/` for build tools
- **Clean Separation**: Clear boundaries between data, components, contexts, and hooks

### Styling Architecture
- **Utility-First**: Tailwind CSS with custom extensions
- **CSS Variables**: Custom properties for theming
- **Component-Scoped**: Global styles only for theme and animations
- **Responsive Design**: Mobile-first with Tailwind breakpoints
- **Performance**: Tailwind purging removes unused styles

### Unique Features to Maintain
- **Cyberpunk Theme**: Neon colors, glowing effects, terminal aesthetics
- **Animated Starfield**: Three.js-like particle background
- **Typing Animations**: Terminal-style text animations in hero section
- **Scroll Animations**: Custom hook for reveal animations
- **Image Optimization**: Custom OptimizedImage component with Sharp

## Development Guidelines

### Component Development
- Follow the existing section-based pattern for new portfolio sections
- Use the `useLanguage()` hook for all user-facing text
- Implement responsive design with Tailwind's mobile-first approach
- Maintain the cyberpunk aesthetic with existing color variables

### Internationalization
- Add new translation keys to both `vi` and `en` objects in `LanguageContext`
- Use hierarchical key naming: `section.subsection.key`
- Test language switching functionality
- Ensure all user-facing text is translatable

### Performance Considerations
- Use Next.js Image component for image optimization
- Leverage the existing OptimizedImage component for consistent behavior
- Keep animations performant with CSS transforms
- Use Turbopack for faster development builds

### Code Style
- Follow existing TypeScript patterns with strict type checking
- Use Tailwind classes instead of custom CSS when possible
- Maintain consistent component structure and naming
- Follow the established file organization patterns

## Known Issues & Improvement Areas

The user mentioned the portfolio is "ugly and has some incorrect info" - areas to investigate:
- Visual design and UX improvements
- Content accuracy and updates
- Performance optimizations
- Code quality and maintainability
- Responsive design enhancements