# Portfolyo Web

Portfolyo is a platform that connects developers with their community. Explore amazing portfolios, share your work, and discover what talented developers are building. This is the web companion to the [Portfolyo mobile app](https://play.google.com/store/apps/details?id=com.luiscabantac.portfolyo).

![image](https://portfolyo.luiscabantac.com/og.jpg)

## Features

- **Explore Portfolios**: Browse and discover portfolios from developers around the world
- **Filter by Expertise**: Filter portfolios by professional titles (Front End, Back End, Full Stack, etc.)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Convex
- **Styling**: Tailwind CSS v4 with shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Icons**: Material Icons
- **Localization**: next-i18next

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables by creating a `.env.local` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_convex_deployment
```

3. Start the Convex backend:

```bash
npx convex dev
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/                 # App pages and layouts (Next.js App Router)
│   ├── (auth)/         # Authentication routes
│   ├── (main)/         # Public pages (home, privacy, terms)
│   └── (user)/         # Authenticated routes (explore)
├── components/         # Reusable React components
│   └── ui/            # shadcn/ui components
├── lib/                # Utility functions and services
│   ├── icons/         # Icon assets
│   ├── services/      # API and data services
│   └── utils.ts       # Helper utilities
├── i18n/              # Internationalization
│   └── locales/       # Translation files
└── providers/         # Context providers (Clerk, Convex, Theme, Query)
```

## Key Routes

- `/` - Landing page
- `/explore` - Browse portfolios
- `/sign-in` - Authentication
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/license` - License information
- `/close-account` - Account deletion

## Related Repositories

- [Portfolyo API](https://github.com/LuisCabantac/go-portfolyo-api) - API layer

## License

This project is licensed under the MIT License - see the LICENSE file for details.
