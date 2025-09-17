# Order Management UI

A modern React-based frontend for the Order Management System, built with Vite,
TypeScript, and Clerk for authentication.

## Prerequisites

- Node.js (v22 or later)
- npm (v10 or later) or bun
- Backend API (see
  [backend setup](https://github.com/grizeus/order-management-api))

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/grizeus/order-managemant-ui.git
cd order-managemant-ui
```

### 2. Install dependencies

```bash
npm install
# or
bun install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### 4. Start the Development Server

```bash
npm run dev
# or
bun dev
```

The application will be available at
[http://localhost:5173](http://localhost:5173)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Project Structure

```
src/
├── api/                # API service layer
├── components/         # Reusable UI components
├── pages/             # Application pages
│   ├── Dashboard.tsx  # Main dashboard
│   ├── SignInPage.tsx # Sign in page
│   └── SignUpPage.tsx # Sign up page
├── routes/            # Application routes
└── App.tsx            # Main application component
```

## Environment Variables

| Variable                     | Description                              | Required | Default |
| ---------------------------- | ---------------------------------------- | -------- | ------- |
| `VITE_API_URL`               | Backend API URL                          | Yes      | -       |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key for authentication | Yes      | -       |

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## Deployment

### Building for Production

```bash
npm run build
```

This will create a `dist` directory with the production build. You can then
deploy the contents of this directory to any static hosting service like Vercel,
Netlify, or GitHub Pages.

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Clerk (Authentication)
- React Router
- React Hook Form
- Zod (Schema validation)
