# Fluent Prototype Kit

> A rapid prototyping toolkit for Microsoft Fluent Design System using Fluent UI React v9

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)
[![Fluent UI](https://img.shields.io/badge/Fluent_UI-v9-0078d4.svg)](https://react.fluentui.dev/)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/tomresing/fluent-prototype-kit.git
cd fluent-prototype-kit

# Install dependencies
npm install

# Start both development servers (API + Vite)
npm run dev --workspace=packages/starter

# Visit http://localhost:3000
```

### Current Demo Features

- **Multi-step registration form** with intro page and 3 steps
- **Session management** demo showing data persistence
- **Keyboard accessibility** with auto-focus and shortcuts
- **Microsoft Writing Style** throughout (sentence case, no placeholders)
- **Disclaimer component** for data transparency

## 📖 What is Fluent Prototype Kit?

Fluent Prototype Kit is a rapid prototyping framework inspired by GOV.UK Prototype Kit, designed specifically for Microsoft Fluent Design System. It enables designers and developers to quickly build interactive, multi-page prototypes using Fluent UI React v9 components.

### Key Features (Current)

- **🎨 Fluent UI v9 Components** - Using production-ready React components
- **🔄 Multi-page Routing** - React Router integration with navigation
- **💾 Session Management** - Server-side data persistence across pages
- **⌨️ Keyboard Accessible** - Auto-focus and Enter key submission
- **✍️ Microsoft Writing Style** - Sentence case, clean UI without placeholders
- **🎯 TypeScript First** - Full type safety throughout
- **⚡ Fast HMR** - Instant updates with Vite
- **📝 Form Patterns** - Multi-step form with validation and choice components

### Planned Features

- **📦 Code Export** - Generate production-ready React code
- **🔌 Plugin System** - Extend functionality with plugins
- **🎨 Visual Builder** (Optional) - No-code interface for designers
- **📚 Component Library** - Pre-built wrapper components
- **🛠️ CLI Tools** - Scaffolding and project generation

## 🏗️ Project Structure

```
fluent-prototype-kit/
├── packages/
│   ├── cli/          # Command-line tools
│   ├── runtime/      # Core framework and components
│   └── starter/      # Starter template
├── docs/             # Documentation
└── examples/         # Example prototypes
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start both servers (API on :3001, Vite on :3000)
npm run dev --workspace=packages/starter

# Or start both with one command
npm run dev:all --workspace=packages/starter

# Build all packages
npm run build

# Lint and format code
npm run lint
npm run format
```

## 🗺️ Roadmap

### ✅ Phase 1.7 Complete (Current)
- Multi-step forms with session persistence
- Keyboard accessibility and auto-focus
- Microsoft Writing Style implementation
- RadioGroup and choice components
- Disclaimer and data transparency

### 🔄 Phase 1.4: Pre-Built Component Patterns (Next)
- FormField wrapper component
- DataTable with sorting/filtering
- PageHeader component
- Modal dialog patterns
- Form validation helpers

### 📋 Phase 1.8: CLI Tool
- npm create initializer
- Project scaffolding
- Template selection
- Component generator

## 📚 Documentation

- **[Setup Complete - Current Status](./SETUP_COMPLETE.md)** ⭐ **START HERE**
- [Implementation Plan](./IMPLEMENTATION_PLAN_REACT.md)
- [Getting Started](./docs/getting-started.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

### External Resources
- [Fluent 2 Design System](https://fluent2.microsoft.design/)
- [Fluent UI React v9 Documentation](https://react.fluentui.dev/)
- [React Router Documentation](https://reactrouter.com/)

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

MIT © [Tom Resing]

## 🙏 Acknowledgments

Inspired by:
- [GOV.UK Prototype Kit](https://github.com/alphagov/govuk-prototype-kit)
- [Fluent UI React](https://react.fluentui.dev/)
- [Microsoft Fluent Design System](https://fluent2.microsoft.design/)

---

**Status**: 🚀 Phase 1.7 Complete - Enhanced multi-step forms with Microsoft Writing Style!

**What's Working Now:**
- Multi-step registration form with intro page (Email → Account type → Name)
- Session-based data persistence across pages and refreshes
- Keyboard accessible with auto-focus and Enter key shortcuts
- RadioGroup for choice selection (Individual/Organization)
- Microsoft Writing Style (sentence case, no placeholders)
- Disclaimer component on all form pages
- Links to Fluent 2 and v9 documentation

**Next Up:**
- Pre-built component patterns (FormField, DataTable, etc.)
- CLI tool for project scaffolding
- Component generator and templates

See [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) for full details and instructions.
