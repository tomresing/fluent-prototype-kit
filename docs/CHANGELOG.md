# Changelog

## Phase 1.6 - November 2025

### Page templates complete

**Multi-step form**
- One question per step with intro page
- Email → Account type → Name → Confirmation
- RadioGroup for account type selection
- Keyboard shortcuts and auto-focus
- Data preserved when navigating back
- Microsoft Writing Style throughout

**Components added**
- `FormDisclaimer` - Info banner for prototype pages
- `Navigation` - Tab-based navigation with icons
- `PageLayout` - Consistent page wrapper
- `SessionDemo` - Interactive session testing

**Pages added**
- `HomePage` - Links to documentation
- `FormIntroPage` - Multi-step form introduction
- `FormPage` - Step 1: Email
- `FormStep2Page` - Step 2: Account type
- `FormStep3Page` - Step 3: Name
- `ConfirmationPage` - Form completion summary
- `SessionDemoPage` - Session data testing

---

## Phase 1.5 - November 2025

### React Router complete

- React Router v6 installed
- Client-side routing configured
- Navigation component with tabs
- Multi-page flow working

---

## Phase 1.4 - November 2025

### Session management complete

- express-session with file store
- RESTful API endpoints (GET/POST/DELETE by key)
- `usePrototypeData` hook for React
- Type-safe session data handling

---

## Phase 1.3 - November 2025

### Fluent UI integration complete

- FluentProvider with webLightTheme
- @fluentui/react-components v9.54.0
- @fluentui/react-icons v2.0.258

---

## Phase 1.2 - November 2025

### Vite and React complete

- Vite 5.4.3 with React plugin
- React 18.3.1 with TypeScript
- Express API server on port 3001
- Vite dev server on port 3000
- API proxy configured

---

## Phase 1.1 - November 2025

### Project setup complete

- GitHub repository (public, MIT license)
- Monorepo structure (cli, runtime, starter)
- TypeScript 5.5.4
- ESLint 9 + Prettier 3.3.3
- GitHub Actions CI/CD

---

See [Implementation plan](./IMPLEMENTATION_PLAN.md) for roadmap and next steps.
