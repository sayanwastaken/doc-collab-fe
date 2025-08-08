# DocCollab Frontend

A real-time document collaboration application built with Next.js and Material-UI.

## Features

- **User Authentication**: Complete signup and login flow
- **Token Management**: Secure storage of access and refresh tokens
- **Protected Routes**: Middleware-based route protection
- **Responsive Design**: Modern UI with Material-UI components
- **State Management**: React Context for authentication state

## Authentication Flow

### Signup Process

1. User fills out the signup form with name, email, and password
2. Form validation ensures all fields are properly filled
3. API call to `/users/signup` endpoint
4. On success, tokens are stored in localStorage and cookies
5. User is redirected to login page

### Login Process

1. User enters email and password
2. Form validation ensures proper email format and required fields
3. API call to `/users/signin` endpoint
4. On success, tokens are stored and user is redirected to dashboard
5. Authentication context is updated with user information

### Token Storage

- **localStorage**: For client-side access
- **Cookies**: For middleware authentication checks
- **Access Token**: 24-hour expiration
- **Refresh Token**: 7-day expiration

### Protected Routes

- Dashboard is protected and requires authentication
- Unauthenticated users are redirected to login
- Authenticated users are redirected to dashboard when accessing auth pages

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Protected dashboard page
│   ├── signup/           # Signup page
│   └── layout.tsx        # Root layout with providers
├── components/           # Reusable components
│   ├── login/           # Login component
│   └── signup/          # Signup component
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── services/            # API services
│   └── api.ts          # Authentication API functions
└── middleware.ts        # Next.js middleware for route protection
```

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` file with:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Make sure the backend server is running on the specified port

## API Endpoints

The frontend communicates with the following backend endpoints:

- `POST /users/signup` - User registration
- `POST /users/signin` - User authentication

## Technologies Used

- **Next.js 15** - React framework
- **Material-UI** - UI component library
- **TypeScript** - Type safety
- **React Context** - State management
- **Next.js Middleware** - Route protection

## Security Features

- Form validation on both client and server
- Secure token storage
- Protected routes with middleware
- CSRF protection with SameSite cookies
- Input sanitization and validation
