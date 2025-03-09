
# Mosque Finder App - Development Prompt

## Overview
Create a mosque finder web application that helps users discover nearby mosques, view prayer times, announcements, and facilities. The app will have two main sections: a public-facing user interface and an admin panel for mosque administrators.

## Technical Stack
- React with TypeScript for frontend
- Supabase for backend services (authentication, database, storage)
- Tailwind CSS and shadcn/ui for UI components
- React Router for navigation
- Tanstack Query for data fetching

## Database Schema

### Mosque Table
- Basic info: name, address, city, state, country, coordinates
- Details: school of thought, facilities, contact info, website
- Admin: approval status, creator

### Prayer Times Table
- Daily prayer times (fajr, dhuhr, asr, maghrib, isha)
- Jummah times
- Relations to mosque

### Announcements Table
- Title, content, dates, type
- Relation to mosque

### User/Admin Table
- Authentication info
- Profile details
- Mosque relation for admins

## Core Features

### 1. Public User Interface
- **Mosque Discovery**
  - Search by location, name, or filters
  - Map view and list view toggle
  - Geolocation to find nearby mosques
  - Filtering by facilities/school of thought

- **Mosque Details Page**
  - Tabs in order: Prayer Times → Announcements → Info
  - Prayer times display with highlighting for next prayer
  - Announcements section with categories
  - Detailed info about facilities and services

- **User Features**
  - Save favorite mosques
  - Get directions to mosque
  - Share mosque details

### 2. Admin Interface
- **Authentication**
  - Login/register functionality
  - Email verification (with proper redirect URLs)
  - Password reset

- **Mosque Registration Process**
  - 3-step process:
    1. Basic mosque info (name, location)
    2. Detailed info (school, facilities)
    3. Admin account creation
  - Image upload with 1.5MB size limit
  - Custom field for "Other" school of thought

- **Mosque Management**
  - Prayer times management
    - Set recurring times
    - Special schedules for Ramadan/holidays
  - Announcements management
    - Create/edit/delete announcements
    - Set expiry dates and types
  - Update mosque details and images

## UI/UX Requirements
- Mobile-responsive design
- Accessible UI components
- Modern, clean aesthetic with mosque-themed accent colors
- Easy navigation between sections

## Technical Requirements

### Supabase Setup
- Configure Row Level Security (RLS) policies:
  - Allow authenticated users to register mosques
  - Allow admin users to update/delete their own mosque data
  - Public read access for approved mosques
  - File storage with 1.5MB size limit

### Authentication Flow
- Proper email verification setup
- Redirect URLs configured for both development and production
- Admin approval process for new mosque registrations

### Error Handling
- Client-side validation for all forms
- Proper error messages for API failures
- Loading states for async operations

### Performance Considerations
- Optimized image loading
- Efficient data fetching with caching
- Code splitting for admin functionality

## Implementation Guidelines

### Phase 1: Public Interface
- Setup project structure and routing
- Implement mosque discovery interface
- Build mosque details page with tabs

### Phase 2: Authentication & Admin
- Implement authentication flow
- Create mosque registration process
- Build admin dashboard

### Phase 3: Advanced Features
- Implement map integration
- Add favoriting functionality
- Enhance search and filtering

## Potential Challenges and Solutions
- **Email Verification**: Ensure Supabase Auth redirect URLs are correctly set
- **RLS Policies**: Implement proper security rules for mosque data
- **Image Uploads**: Enforce 1.5MB size limit and proper error handling
- **Mobile Responsiveness**: Use Tailwind's responsive classes consistently

## Testing Guidelines
- Test authentication flow thoroughly
- Verify RLS policies are working as expected
- Ensure responsive design works on various devices
- Test prayer time calculations and displays
