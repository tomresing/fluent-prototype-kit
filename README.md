# Fluent prototype kit

> A rapid prototyping toolkit for Microsoft's Fluent 2 design system using Fluent UI React v9

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)
[![Fluent UI](https://img.shields.io/badge/Fluent_UI-v9-0078d4.svg)](https://react.fluentui.dev/)

## Quick start

```bash
# Clone the repository
git clone https://github.com/tomresing/fluent-prototype-kit.git
cd fluent-prototype-kit

# Install dependencies
npm install

# Start development servers
npm run dev --workspace=packages/starter

# Open http://localhost:3000
```

## What you get

Build interactive prototypes with Fluent UI React v9 components. Session-based data persistence lets you create multi-page flows that work like real applications.

**Current features**
- Fluent UI v9 components with full accessibility
- Multi-page routing with React Router
- Server-side session management
- Multi-step form patterns
- TypeScript and fast HMR with Vite

**Planned**
- Pre-built component patterns (FormField, DataTable)
- CLI tools for scaffolding
- Plugin system

## Project structure

```
fluent-prototype-kit/
├── packages/
│   ├── cli/          # Command-line tools (planned)
│   ├── runtime/      # Express API with session management
│   └── starter/      # React app with Fluent UI v9
├── docs/             # Documentation
└── examples/         # Example prototypes
```

## Documentation

- **[Getting started](./docs/getting-started.md)** - Setup, customization, and examples
- **[Implementation plan](./IMPLEMENTATION_PLAN_REACT.md)** - Roadmap and current status
- **[Contributing](./CONTRIBUTING.md)** - How to contribute

**External resources**
- [Fluent 2 Design System](https://fluent2.microsoft.design/)
- [Fluent UI React v9](https://react.fluentui.dev/)
- [React Router](https://reactrouter.com/)

## Commands

```bash
npm run dev --workspace=packages/starter  # Start development
npm run build                              # Build all packages
npm run lint                               # Lint code
npm run format                             # Format code
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT © Tom Resing

## Acknowledgments

Inspired by [GOV.UK Prototype Kit](https://github.com/alphagov/govuk-prototype-kit), [Fluent UI React](https://react.fluentui.dev/), and [Microsoft Fluent Design System](https://fluent2.microsoft.design/).
