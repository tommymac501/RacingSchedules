# Racing Hub - Your Ultimate Racing Schedule Tracker

## Overview
Racing Hub is a web application designed to provide racing enthusiasts with a comprehensive, user-friendly platform to track racing schedules across multiple series including NASCAR, IndyCar, Formula 1, and World of Outlaws. The application enables users to view race schedules by series, see upcoming races for the current week, and get information about race details including location, time, broadcast channel, and weather forecasts.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
Racing Hub is built using a modern full-stack JavaScript architecture:

1. **Frontend**: React-based single-page application with a client-side router
2. **Backend**: Express.js server providing a REST API
3. **Database**: PostgreSQL database accessed through Drizzle ORM
4. **Styling**: Tailwind CSS with the shadcn UI component library
5. **Data Fetching**: TanStack React Query for client-side data fetching
6. **Build Tool**: Vite for frontend bundling and ESBuild for server compilation

The application follows a monorepo structure with clear separation between client, server, and shared code. The shared directory contains database schemas that are used by both the frontend and backend, ensuring type safety across the entire application.

## Key Components

### Frontend
- **Client Router**: Uses Wouter for lightweight client-side routing
- **Components**: Organized into UI components (from shadcn), feature components, and page components
- **Data Fetching**: React Query handles API calls, caching, and state management
- **Styling**: Utilizes Tailwind CSS with a custom theme including race series-specific colors
- **Layout**: Consists of Header, main content area, and Footer components

### Backend
- **Express Server**: Handles API requests and serves the static frontend files in production
- **API Routes**: RESTful endpoints for accessing race data
- **Data Services**: Services for fetching race information and external data like weather
- **Storage Interface**: Abstract storage interface with in-memory implementation

### Data Layer
- **Schema**: Defined using Drizzle ORM with tables for users, racing series, and races
- **Models**: Type definitions shared between frontend and backend
- **Data Access**: Repository pattern implemented through the storage interface

## Data Flow

1. **Initial Load**:
   - User visits the application
   - Frontend loads and renders the homepage with racing series
   - React Query fetches initial data from backend API

2. **Series Navigation**:
   - User selects a racing series
   - Client router navigates to the series schedule page
   - Frontend requests race data from `/api/races/:seriesId` endpoint
   - Backend fetches races for the series and enhances with weather data
   - Frontend renders the race schedule

3. **This Week's Races**:
   - User navigates to "This Week" page
   - Frontend requests data from `/api/races/this-week` endpoint
   - Backend filters races happening in the next 7 days across all series
   - Frontend displays the upcoming races

## External Dependencies

### Frontend Libraries
- **React**: Core UI library
- **Wouter**: Client-side routing
- **TanStack React Query**: Data fetching and state management
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI primitives
- **Lucide**: Icon library
- **Luxon**: Date/time formatting and manipulation

### Backend Libraries
- **Express**: Web server framework
- **Drizzle ORM**: Database ORM
- **Drizzle Zod**: Schema validation integration
- **Axios**: HTTP client for external API calls

## Deployment Strategy

The application is configured for deployment on Replit:

1. **Development Mode**:
   - `npm run dev` starts both the frontend dev server and backend
   - Vite provides hot module replacement for React components
   - Backend uses `tsx` for TypeScript execution without compilation

2. **Production Build**:
   - `npm run build` compiles the frontend with Vite and the backend with ESBuild
   - Frontend assets are built to `dist/public`
   - Backend is compiled to `dist/index.js`

3. **Production Runtime**:
   - `npm run start` runs the compiled backend which serves the static frontend files
   - Express handles both API requests and serves the SPA
   - Environment variables control database connections and external API access

## Database Schema

The application uses three main data models:

1. **Users**:
   - Primary user account data
   - Contains username and password fields
   
2. **Racing Series**:
   - Metadata about racing series (NASCAR, F1, etc.)
   - Includes display information like colors, badges, and images
   
3. **Races**:
   - Individual race events
   - Contains details like location, date, time, broadcast info
   - Links to a specific series via seriesId

The database is accessed through Drizzle ORM with schema definitions in `shared/schema.ts`.

## Development Workflow

1. Add or modify API endpoints in `server/routes.ts`
2. Update database models in `shared/schema.ts` when needed
3. Implement UI changes in the relevant components in `client/src/components`
4. Create or update pages in `client/src/pages`
5. Add shared utilities or types in `shared` directory
6. Test API endpoints and UI interactions

## Common Tasks

- **Adding a new page**: Create a new component in `client/src/pages` and add a route in `App.tsx`
- **Adding a new API endpoint**: Add a new route handler in `server/routes.ts`
- **Adding a new component**: Create a new file in `client/src/components` and import where needed
- **Modifying the database schema**: Update `shared/schema.ts` and run `npm run db:push`
- **Styling**: Modify Tailwind classes directly or update theme in `tailwind.config.ts`