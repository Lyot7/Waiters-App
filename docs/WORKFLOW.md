# Workflow de Contribution

Ce guide explique le workflow de contribution pour le projet Waiters App, incluant les conventions de commits, branches et la gestion des issues Linear.

## Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Format des commits](#format-des-commits)
- [Workflow Linear + GitHub](#workflow-linear--github)
- [Branches](#branches)
- [Pull Requests](#pull-requests)
- [Releases automatiques](#releases-automatiques)
- [Outils intégrés](#outils-intégrés)

## Vue d'ensemble

Le projet utilise un workflow intégré qui combine :

- **Conventional Commits** → Releases automatiques via semantic-release
- **Linear** → Gestion des issues et suivi de projet
- **GitHub Actions** → CI/CD automatisé

## Format des commits

### Structure

```
<type>(<scope>): <description>

[body]

[footer]
```

### Types de commits

| Type       | Description                              | Release       |
| ---------- | ---------------------------------------- | ------------- |
| `feat`     | Nouvelle fonctionnalité                  | Minor (1.X.0) |
| `fix`      | Correction de bug                        | Patch (1.0.X) |
| `docs`     | Documentation uniquement                 | Aucune        |
| `style`    | Formatage, pas de changement de code     | Aucune        |
| `refactor` | Refactoring sans nouvelle fonctionnalité | Aucune        |
| `perf`     | Amélioration des performances            | Patch         |
| `test`     | Ajout ou modification de tests           | Aucune        |
| `chore`    | Maintenance, dépendances                 | Aucune        |
| `ci`       | Configuration CI/CD                      | Aucune        |

### Breaking Changes

Pour une release majeure (X.0.0), ajouter `!` après le type ou `BREAKING CHANGE:` dans le footer :

```bash
feat!: remove deprecated API endpoint

# ou

feat: change authentication flow

BREAKING CHANGE: JWT tokens are now required for all API calls
```

### Format combiné avec Linear

Le format recommandé intègre la référence Linear dans le scope :

```bash
feat(WAI-123): add user authentication

- Add login form component
- Add JWT token handling
- Add protected routes

Closes WAI-123
```

### Exemples

```bash
# Feature avec Linear
feat(WAI-42): add dashboard charts
Closes WAI-42

# Bug fix avec Linear
fix(WAI-56): resolve login redirect loop
Fixes WAI-56

# Refactoring sans issue
refactor: simplify database queries

# Documentation
docs: update API documentation

# Dépendances (auto par Renovate)
chore(deps): update dependencies
```

## Workflow Linear + GitHub

### 1. Créer une issue dans Linear

Dans Linear, créer une issue qui recevra un identifiant automatique : `WAI-123`

### 2. Créer une branche

Utiliser le format : `<type>/WAI-<id>-<description>`

```bash
# Feature
git checkout -b feat/WAI-123-user-authentication

# Bug fix
git checkout -b fix/WAI-456-login-error

# Refactoring
git checkout -b refactor/WAI-789-simplify-api
```

### 3. Développer et committer

```bash
# Commits intermédiaires (format libre)
git commit -m "wip: add login form"
git commit -m "wip: add validation"

# Commit final (format conventionnel)
git commit -m "feat(WAI-123): add user authentication

- Add login/register forms
- Add JWT handling
- Add protected routes

Closes WAI-123"
```

### 4. Créer une Pull Request

La PR sera automatiquement liée à l'issue Linear grâce à :

- Le nom de la branche (`WAI-123`)
- Le commit message (`Closes WAI-123`)

### 5. Review et Merge

Après approbation :

1. Squash merge avec le message conventionnel
2. L'issue Linear se ferme automatiquement
3. Une release est créée si le commit est `feat:` ou `fix:`

## Branches

### Branches principales

| Branche   | Description                 |
| --------- | --------------------------- |
| `main`    | Production, protégée        |
| `develop` | Développement (si utilisée) |

### Branches de travail

| Pattern                        | Usage                     |
| ------------------------------ | ------------------------- |
| `feat/WAI-XXX-description`     | Nouvelles fonctionnalités |
| `fix/WAI-XXX-description`      | Corrections de bugs       |
| `refactor/WAI-XXX-description` | Refactoring               |
| `docs/description`             | Documentation             |
| `chore/description`            | Maintenance               |

## Pull Requests

### Checklist avant PR

- [ ] Tests passent localement (`bun run test`)
- [ ] Lint passe (`bun run lint`)
- [ ] TypeScript compile (`bun run typecheck`)
- [ ] Build fonctionne (`bun run build`)

### Template PR

Le template inclut automatiquement :

- Section pour la référence Linear
- Type de changement
- Plan de test
- Checklist de qualité

## Releases automatiques

### Fonctionnement

Semantic-release analyse les commits sur `main` et :

1. Détermine le type de version (major/minor/patch)
2. Génère le CHANGELOG
3. Crée un tag Git
4. Publie une GitHub Release
5. Déclenche le déploiement Coolify

### Déclenchement

| Commit                             | Version        |
| ---------------------------------- | -------------- |
| `fix: ...`                         | Patch (1.0.X)  |
| `feat: ...`                        | Minor (1.X.0)  |
| `feat!: ...` ou `BREAKING CHANGE:` | Major (X.0.0)  |
| `chore: ...`, `docs: ...`, etc.    | Aucune release |

### Exemple de cycle

```
v1.0.0 (initial)
    ↓
fix(WAI-10): resolve bug → v1.0.1
    ↓
feat(WAI-20): add feature → v1.1.0
    ↓
fix(WAI-30): another fix → v1.1.1
    ↓
feat!(WAI-40): breaking change → v2.0.0
```

## Outils intégrés

### CI/CD

| Outil            | Rôle                    |
| ---------------- | ----------------------- |
| GitHub Actions   | CI (tests, lint, build) |
| Semantic-release | Releases automatiques   |
| Coolify          | Déploiement             |

### Qualité

| Outil      | Rôle                |
| ---------- | ------------------- |
| SonarCloud | Analyse de code     |
| Codecov    | Couverture de tests |
| ESLint     | Linting             |
| Prettier   | Formatage           |

### Gestion de projet

| Outil    | Rôle                     |
| -------- | ------------------------ |
| Linear   | Issues et roadmap        |
| Renovate | Mises à jour dépendances |

## Commandes utiles

```bash
# Développement
bun run dev          # Serveur de dev
bun run build        # Build production

# Qualité
bun run lint         # ESLint
bun run typecheck    # TypeScript
bun run test         # Tests unitaires
bun run test:e2e     # Tests E2E

# Base de données
bun run db:generate  # Générer Prisma client
bun run db:push      # Appliquer le schema
bun run db:studio    # Interface Prisma Studio
```

## FAQ

### Comment créer une release sans nouvelle fonctionnalité ?

Les commits `chore:`, `docs:`, `refactor:` ne créent pas de release. Pour forcer une release, utilisez `fix:` ou `feat:` avec une description appropriée.

### Comment annuler une release ?

Les releases sont automatiques. Pour corriger, créer un nouveau commit `fix:` ou `revert:`.

### L'issue Linear ne se ferme pas automatiquement ?

Vérifier que :

1. L'intégration GitHub est configurée dans Linear
2. Le commit contient `Closes WAI-XXX` ou `Fixes WAI-XXX`
3. La branche contient `WAI-XXX`
