# Waiter's App

A modern web application built with Next.js 15, React 19, and TypeScript.

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **UI**: TailwindCSS 4 + shadcn/ui
- **ORM**: Prisma + PostgreSQL
- **Auth**: BetterAuth with Google OAuth
- **Testing**: Vitest (unit) + Playwright (e2e)
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0
- [Docker](https://www.docker.com/) (for local PostgreSQL)
- [Node.js](https://nodejs.org/) >= 20 (optional, for some tooling)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/waiters-app.git
cd waiters-app
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration values.

4. Start the database:

```bash
docker compose up -d
```

5. Generate Prisma client and push schema:

```bash
bun run db:generate
bun run db:push
```

6. Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `bun run dev`           | Start development server       |
| `bun run build`         | Build for production           |
| `bun run start`         | Start production server        |
| `bun run lint`          | Run ESLint                     |
| `bun run lint:fix`      | Fix ESLint errors              |
| `bun run format`        | Format code with Prettier      |
| `bun run typecheck`     | Run TypeScript type checking   |
| `bun run test`          | Run unit tests in watch mode   |
| `bun run test:run`      | Run unit tests once            |
| `bun run test:coverage` | Run tests with coverage report |
| `bun run e2e`           | Run Playwright e2e tests       |
| `bun run e2e:ui`        | Run Playwright with UI         |
| `bun run db:generate`   | Generate Prisma client         |
| `bun run db:push`       | Push schema to database        |
| `bun run db:studio`     | Open Prisma Studio             |
| `bun run db:migrate`    | Run database migrations        |

## Environment Variables

| Variable               | Description                  | Required |
| ---------------------- | ---------------------------- | -------- |
| `DATABASE_URL`         | PostgreSQL connection string | Yes      |
| `BETTER_AUTH_SECRET`   | Secret for auth encryption   | Yes      |
| `BETTER_AUTH_URL`      | Base URL for auth            | Yes      |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID       | Yes      |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret   | Yes      |
| `NEXT_PUBLIC_APP_URL`  | Public app URL               | Yes      |

## Project Structure

```
.
├── .github/              # GitHub Actions workflows
│   ├── workflows/
│   │   ├── ci.yml        # CI pipeline
│   │   └── release.yml   # Release automation
│   └── renovate.json     # Dependency updates
├── .husky/               # Git hooks
├── e2e/                  # Playwright e2e tests
├── prisma/               # Database schema
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   │   └── ui/           # shadcn/ui components
│   └── lib/              # Utilities and configurations
├── tests/                # Unit tests
└── ...config files
```

## CI/CD Pipeline

### Continuous Integration

On every PR and push to `main`, `staging`, or `dev`:

- **Lint**: ESLint + Prettier checks
- **Type Check**: TypeScript compilation
- **Unit Tests**: Vitest with 80% coverage threshold
- **E2E Tests**: Playwright (Chromium)
- **Build**: Next.js production build
- **Code Quality**: SonarQube analysis

### Release

On push to `main`:

- Semantic versioning based on commit messages
- Automatic changelog generation
- GitHub release creation
- Coolify deployment trigger

## Git Workflow

- `main` - Production branch
- `staging` - Pre-production testing
- `dev` - Development integration

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style (formatting)
- `refactor:` Code refactoring
- `test:` Tests
- `chore:` Maintenance

## Linear Integration

This project uses Linear for issue tracking with the `WAI` prefix (e.g., `WAI-123`).

### Setup

1. Go to [Linear Settings > Integrations > GitHub](https://linear.app/lyotorg/settings/integrations)
2. Connect your GitHub repository
3. Enable auto-link for commits mentioning `WAI-XXX`
4. Enable PR status sync to update Linear issues

### Usage

Reference issues in commits:

```bash
git commit -m "feat: add user dashboard WAI-42"
```

## External Services Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Configure OAuth consent screen
5. Create OAuth 2.0 credentials
6. Add authorized redirect URI: `{YOUR_URL}/api/auth/callback/google`

### SonarQube

1. Create a project in your SonarQube instance
2. Generate an access token
3. Add `SONAR_TOKEN` and `SONAR_HOST_URL` to GitHub secrets

### Codecov

1. Connect your repository at [Codecov](https://codecov.io/)
2. Add `CODECOV_TOKEN` to GitHub secrets

### Coolify

1. Create a new application in Coolify
2. Connect to your GitHub repository
3. Configure environment variables
4. Copy the webhook URL to `COOLIFY_WEBHOOK_URL` secret

## License

Private - All rights reserved.
