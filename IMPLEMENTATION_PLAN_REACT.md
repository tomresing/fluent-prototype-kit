# Fluent Prototype Kit - Implementation Plan
## Fluent UI React v9 Architecture

**Project Goal**: Create a rapid prototyping toolkit for Microsoft Fluent Design System using Fluent UI React v9

**Target**: Fluent UI React v9 (@fluentui/react-components)  
**Framework**: React 18+ with TypeScript  
**Build Tool**: Vite for fast HMR  
**Components**: 50+ production-ready Fluent 2 components  
**Timeline**: 6-9 months to v1.0  

---

## Architecture Overview

### Technology Stack

```
Frontend:
├── React 18.x (UI framework)
├── Fluent UI React v9 (component library)
├── React Router v6 (client-side routing)
├── TypeScript (type safety)
└── Vite (build tool + HMR)

Backend:
├── Express.js (API server)
├── express-session (session management)
└── Node.js 18+ (runtime)

Development:
├── Vite Dev Server (HMR)
├── ESLint + Prettier (code quality)
└── Jest + React Testing Library (testing)
```

### Key Design Decisions

1. **React-First Approach**: Use Fluent UI React v9 components directly
2. **Type Safety**: TypeScript throughout for better DX
3. **Modern Build**: Vite for instant HMR and optimized builds
4. **API-Driven**: Express backend serves React SPA + provides session API
5. **Component Library**: Pre-built wrapper components for common patterns

---

## Phase 1: Foundation & MVP (Weeks 1-12)

### Milestone 1.1: Project Setup (Week 1)

#### Tasks:
- [ ] Create GitHub repository (public, MIT license)
- [ ] Initialize monorepo structure (CLI + Runtime + Starter)
- [ ] Set up TypeScript configuration
- [ ] Configure ESLint + Prettier
- [ ] Set up GitHub Actions CI/CD
- [ ] Create initial documentation structure

#### Project Structure:
```
fluent-prototype-kit/
├── packages/
│   ├── cli/                    # CLI tools
│   ├── runtime/                # Core server + utilities
│   └── starter/                # Starter template
├── docs/
├── examples/
├── package.json
├── tsconfig.json
└── README.md
```

---

### Milestone 1.2: Vite + React Setup (Weeks 2-3)

#### Tasks:
- [ ] Set up Vite configuration for React + TypeScript
- [ ] Configure React Fast Refresh (HMR)
- [ ] Set up Express API server
- [ ] Implement proxy between Vite and Express
- [ ] Configure environment variables
- [ ] Set up development and production builds

#### Vite Configuration:
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      fastRefresh: true
    })
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks')
    }
  },
  
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'fluent-ui': ['@fluentui/react-components'],
          'fluent-icons': ['@fluentui/react-icons'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
});
```

#### Express API Server:
```typescript
// server/index.ts
import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import { createServer as createViteServer } from 'vite';

const FileStoreSession = FileStore(session);

async function createServer(isDevelopment = true) {
  const app = express();
  
  // Session middleware
  app.use(session({
    store: new FileStoreSession({ path: '.sessions' }),
    secret: process.env.SESSION_SECRET || 'fluent-prototype-kit',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: !isDevelopment
    }
  }));
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // API routes
  app.use('/api', await import('./api/routes'));
  
  if (isDevelopment) {
    // Vite dev server with HMR
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve built files
    app.use(express.static('dist'));
  }
  
  return app;
}

export { createServer };
```

---

### Milestone 1.3: Fluent UI React v9 Integration (Weeks 4-5)

#### Tasks:
- [ ] Install @fluentui/react-components and @fluentui/react-icons
- [ ] Set up FluentProvider with theme configuration
- [ ] Create theme customization system
- [ ] Build wrapper components for common patterns
- [ ] Create component documentation
- [ ] Test all components for accessibility

#### Fluent UI Setup:
```typescript
// src/providers/FluentProvider.tsx
import React from 'react';
import {
  FluentProvider as BaseFluentProvider,
  webLightTheme,
  webDarkTheme,
  Theme,
  tokens
} from '@fluentui/react-components';

export interface ThemeConfig {
  mode: 'light' | 'dark';
  customTokens?: Partial<Theme>;
}

interface PrototypeProviderProps {
  children: React.ReactNode;
  themeConfig?: ThemeConfig;
}

export function PrototypeProvider({ 
  children, 
  themeConfig = { mode: 'light' } 
}: PrototypeProviderProps) {
  const theme = themeConfig.mode === 'light' ? webLightTheme : webDarkTheme;
  
  // Merge custom tokens if provided
  const customizedTheme = themeConfig.customTokens 
    ? { ...theme, ...themeConfig.customTokens }
    : theme;
  
  return (
    <BaseFluentProvider theme={customizedTheme}>
      {children}
    </BaseFluentProvider>
  );
}
```

#### Component Library Export:
```typescript
// src/components/index.ts
export {
  Button,
  Input,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Dropdown,
  Option,
  Combobox,
  Slider,
  SpinButton,
  Field,
  Label,
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Drawer,
  DrawerHeader,
  DrawerBody,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tab,
  TabList,
  Avatar,
  Badge,
  Divider,
  Spinner,
  Toast,
  Toaster,
  useToastController,
  Tooltip,
  Link,
  Image,
  Text,
  Title1,
  Title2,
  Title3,
  Body1,
  Body2,
  Caption1,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  Tree,
  TreeItem,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel
} from '@fluentui/react-components';

// Re-export commonly used icons
export {
  Add20Regular,
  Dismiss20Regular,
  Save20Regular,
  Delete20Regular,
  Edit20Regular,
  Search20Regular,
  Filter20Regular,
  ChevronDown20Regular,
  ChevronUp20Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
  Home20Regular,
  Settings20Regular
} from '@fluentui/react-icons';
```

---

### Milestone 1.4: Pre-Built Component Patterns (Week 6)

#### Tasks:
- [ ] Create FormField wrapper component
- [ ] Build DataTable with sorting/filtering
- [ ] Create PageHeader component
- [ ] Build Navigation component
- [ ] Create Modal dialog patterns
- [ ] Build form validation helpers

#### FormField Component:
```typescript
// src/components/patterns/FormField.tsx
import React from 'react';
import { Field, Input, InputProps, FieldProps } from '@fluentui/react-components';

export interface FormFieldProps extends Omit<InputProps, 'size'> {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  size?: FieldProps['size'];
}

export function FormField({
  label,
  hint,
  error,
  required,
  size = 'medium',
  ...inputProps
}: FormFieldProps) {
  return (
    <Field
      label={label}
      required={required}
      hint={hint}
      validationMessage={error}
      validationState={error ? 'error' : undefined}
      size={size}
    >
      <Input {...inputProps} />
    </Field>
  );
}
```

#### DataTable Component:
```typescript
// src/components/patterns/DataTable.tsx
import React, { useState } from 'react';
import {
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn
} from '@fluentui/react-components';

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumnDefinition<T>[];
  selectable?: boolean;
  sortable?: boolean;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  selectable = false,
  sortable = false,
  onRowClick
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<{
    column: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const sortedData = sortable && sortState
    ? [...data].sort((a, b) => {
        const column = columns.find(c => c.columnId === sortState.column);
        if (!column) return 0;
        
        const valueA = column.renderCell(a);
        const valueB = column.renderCell(b);
        
        if (valueA < valueB) return sortState.direction === 'ascending' ? -1 : 1;
        if (valueA > valueB) return sortState.direction === 'ascending' ? 1 : -1;
        return 0;
      })
    : data;

  return (
    <DataGrid
      items={sortedData}
      columns={columns}
      selectionMode={selectable ? 'multiselect' : undefined}
      sortable={sortable}
    >
      <DataGridHeader>
        <DataGridRow>
          {columns.map((column) => (
            <DataGridHeaderCell key={column.columnId}>
              {column.renderHeaderCell?.()}
            </DataGridHeaderCell>
          ))}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody>
        {sortedData.map((item, index) => (
          <DataGridRow key={index} onClick={() => onRowClick?.(item)}>
            {columns.map((column) => (
              <DataGridCell key={column.columnId}>
                <TableCellLayout>
                  {column.renderCell(item)}
                </TableCellLayout>
              </DataGridCell>
            ))}
          </DataGridRow>
        ))}
      </DataGridBody>
    </DataGrid>
  );
}
```

---

### Milestone 1.5: Session Management & Data Persistence (Week 7)

#### Tasks:
- [ ] Create session API endpoints
- [ ] Build React context for session data
- [ ] Create usePrototypeData hook
- [ ] Implement automatic form data persistence
- [ ] Add data export/import functionality
- [ ] Create data debugging tools

#### Session API:
```typescript
// server/api/session.ts
import { Router } from 'express';

const router = Router();

// Get session data
router.get('/session', (req, res) => {
  res.json({
    success: true,
    data: req.session.data || {}
  });
});

// Update session data
router.post('/session', (req, res) => {
  if (!req.session.data) {
    req.session.data = {};
  }
  
  // Merge new data
  Object.assign(req.session.data, req.body);
  
  res.json({
    success: true,
    data: req.session.data
  });
});

// Clear session
router.delete('/session', (req, res) => {
  req.session.data = {};
  res.json({ success: true });
});

// Export session data
router.get('/session/export', (req, res) => {
  res.json({
    success: true,
    data: req.session.data || {},
    timestamp: new Date().toISOString()
  });
});

// Import session data
router.post('/session/import', (req, res) => {
  req.session.data = req.body.data || {};
  res.json({ success: true });
});

export default router;
```

#### React Session Hook:
```typescript
// src/hooks/usePrototypeData.ts
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PrototypeData {
  [key: string]: any;
}

interface PrototypeDataContextType {
  data: PrototypeData;
  updateData: (newData: Partial<PrototypeData>) => Promise<void>;
  clearData: () => Promise<void>;
  loading: boolean;
}

const PrototypeDataContext = createContext<PrototypeDataContextType | null>(null);

export function PrototypeDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PrototypeData>({});
  const [loading, setLoading] = useState(true);

  // Load session data on mount
  useEffect(() => {
    fetch('/api/session')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateData = async (newData: Partial<PrototypeData>) => {
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });
    
    const result = await response.json();
    if (result.success) {
      setData(result.data);
    }
  };

  const clearData = async () => {
    await fetch('/api/session', { method: 'DELETE' });
    setData({});
  };

  return (
    <PrototypeDataContext.Provider value={{ data, updateData, clearData, loading }}>
      {children}
    </PrototypeDataContext.Provider>
  );
}

export function usePrototypeData() {
  const context = useContext(PrototypeDataContext);
  if (!context) {
    throw new Error('usePrototypeData must be used within PrototypeDataProvider');
  }
  return context;
}
```

---

### Milestone 1.6: React Router & Navigation (Week 8)

#### Tasks:
- [ ] Set up React Router v6
- [ ] Create route configuration system
- [ ] Build navigation helpers
- [ ] Implement conditional routing
- [ ] Create breadcrumb component
- [ ] Add back button functionality

#### Router Setup:
```typescript
// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrototypeProvider } from './providers/FluentProvider';
import { PrototypeDataProvider } from './hooks/usePrototypeData';
import { MainLayout } from './layouts/MainLayout';
import { routes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <PrototypeProvider>
        <PrototypeDataProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>
          </Routes>
        </PrototypeDataProvider>
      </PrototypeProvider>
    </BrowserRouter>
  );
}
```

#### Conditional Navigation Hook:
```typescript
// src/hooks/useConditionalNavigation.ts
import { useNavigate } from 'react-router-dom';
import { usePrototypeData } from './usePrototypeData';

export function useConditionalNavigation() {
  const navigate = useNavigate();
  const { data } = usePrototypeData();

  const navigateIf = (conditions: Array<{ condition: boolean; path: string }>) => {
    for (const { condition, path } of conditions) {
      if (condition) {
        navigate(path);
        return;
      }
    }
  };

  const navigateBasedOnData = (key: string, routes: Record<string, string>) => {
    const value = data[key];
    const path = routes[value] || routes['default'];
    if (path) {
      navigate(path);
    }
  };

  return { navigateIf, navigateBasedOnData };
}
```

---

### Milestone 1.7: Page Templates (Weeks 9-10)

#### Tasks:
- [ ] Create HomePage template
- [ ] Build FormPage template
- [ ] Create ListPage template with DataGrid
- [ ] Build DetailPage template
- [ ] Create ConfirmationPage template
- [ ] Build ErrorPage templates (404, 500)
- [ ] Add template documentation

#### Form Page Template:
```typescript
// src/pages/templates/FormPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Body1, Title2 } from '@fluentui/react-components';
import { FormField } from '@components/patterns/FormField';
import { usePrototypeData } from '@hooks/usePrototypeData';
import styles from './FormPage.module.css';

export function FormPageTemplate() {
  const navigate = useNavigate();
  const { data, updateData } = usePrototypeData();
  
  const [formData, setFormData] = useState({
    fullName: data.fullName || '',
    email: data.email || '',
    phone: data.phone || ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Please enter your full name';
    }
    
    if (!formData.email) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      await updateData(formData);
      navigate('/check-answers');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Title2>Your details</Title2>
        <Body1>We need some information to continue</Body1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormField
            label="Full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={errors.fullName}
            required
          />

          <FormField
            label="Email address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            required
          />

          <FormField
            label="Phone number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            hint="Include country code if outside UK"
          />

          <div className={styles.actions}>
            <Button appearance="primary" type="submit">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

---

### Milestone 1.8: CLI Tool (Week 11)

#### Tasks:
- [ ] Create npm create initializer
- [ ] Build project scaffolding
- [ ] Implement template selection
- [ ] Create dev/build commands
- [ ] Add component generator
- [ ] Write CLI documentation

#### CLI Implementation:
```typescript
// packages/cli/src/index.ts
#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

const program = new Command();

program
  .name('create-fluent-prototype')
  .description('Create a new Fluent UI prototype')
  .version('1.0.0');

program
  .command('create [directory]')
  .description('Create a new prototype')
  .option('--typescript', 'Use TypeScript (recommended)', true)
  .option('--template <name>', 'Starter template', 'default')
  .action(async (directory, options) => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'directory',
        message: 'Project directory:',
        default: directory || 'my-fluent-prototype',
        when: !directory
      },
      {
        type: 'list',
        name: 'template',
        message: 'Choose a starter template:',
        choices: [
          { name: 'Default (recommended)', value: 'default' },
          { name: 'Form wizard', value: 'form-wizard' },
          { name: 'Data dashboard', value: 'dashboard' },
          { name: 'Empty', value: 'empty' }
        ],
        when: !options.template
      }
    ]);

    const targetDir = answers.directory || directory;
    const template = answers.template || options.template;

    console.log(`\n✨ Creating Fluent prototype in ${targetDir}...\n`);

    // Copy template files
    const templateDir = path.join(__dirname, '../templates', template);
    await fs.copy(templateDir, targetDir);

    // Update package.json
    const pkgPath = path.join(targetDir, 'package.json');
    const pkg = await fs.readJson(pkgPath);
    pkg.name = path.basename(targetDir);
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });

    // Install dependencies
    console.log('📦 Installing dependencies...\n');
    execSync('npm install', { cwd: targetDir, stdio: 'inherit' });

    console.log('\n✅ Prototype created successfully!\n');
    console.log('To get started:\n');
    console.log(`  cd ${targetDir}`);
    console.log('  npm run dev\n');
  });

program
  .command('generate <type> <name>')
  .description('Generate a new component or page')
  .action((type, name) => {
    // Component/page generator
    console.log(`Generating ${type}: ${name}`);
  });

program.parse();
```

---

### Milestone 1.9: Documentation (Week 12)

#### Tasks:
- [ ] Write getting started guide
- [ ] Document all Fluent components
- [ ] Create example prototypes
- [ ] Write best practices guide
- [ ] Create video tutorials
- [ ] Build documentation website

---

## Phase 2: Plugin System (Weeks 13-20)

*Similar to original plan but adapted for React components*

---

## Phase 3: Enhanced Features (Weeks 21-28)

*Authentication, testing, deployment guides*

---

## Phase 4: Community & Launch (Weeks 29-36)

*Beta testing, public launch, community building*

---

## Key Dependencies

```json
{
  "dependencies": {
    "@fluentui/react-components": "^9.46.0",
    "@fluentui/react-icons": "^2.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "express": "^4.18.0",
    "express-session": "^1.17.0",
    "session-file-store": "^1.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/express": "^4.17.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  }
}
```

---

## Success Metrics

### Technical
- ✅ Full TypeScript support
- ✅ <3s page load time
- ✅ <1s HMR updates
- ✅ 90+ Lighthouse score
- ✅ WCAG 2.1 AA compliance
- ✅ 80%+ test coverage

### Adoption (Year 1)
- ✅ 1,000+ GitHub stars
- ✅ 500+ monthly npm downloads
- ✅ 25+ community plugins
- ✅ 10+ enterprise users

---

## Next Steps

**Week 1 Actions:**
1. Create GitHub repository
2. Set up monorepo with pnpm workspaces
3. Initialize Vite + React + TypeScript
4. Install Fluent UI React v9
5. Create basic server structure

**Start Date**: November 25, 2025  
**Target v1.0**: June 2026 (26 weeks)
