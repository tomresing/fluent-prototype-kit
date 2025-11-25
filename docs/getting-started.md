# Getting started

## Quick start

```bash
# Clone repository
git clone https://github.com/tomresing/fluent-prototype-kit.git
cd fluent-prototype-kit

# Install dependencies
npm install

# Start development servers
npm run dev --workspace=packages/starter
```

**API server:** http://localhost:3001  
**App:** http://localhost:3000

## What's included

**Multi-step form** (`/form`)
- Intro page with step overview
- Email, account type, and name collection
- Session-based data persistence
- Keyboard accessible (Enter to submit, auto-focus)

**Session demo** (`/session-demo`)
- Save and retrieve data
- Persists across page refreshes
- Clear session data

## Project structure

```
packages/
├── runtime/              # Express API with session management
│   └── src/server/       # API endpoints
└── starter/              # React app with Fluent UI v9
    └── src/
        ├── components/   # FormDisclaimer, Navigation, PageLayout
        ├── hooks/        # usePrototypeData
        └── pages/        # All page components
```

## Add a new page

1. Create page component:

```tsx
// packages/starter/src/pages/MyPage.tsx
import { Title1, Text } from '@fluentui/react-components';

export function MyPage() {
  return (
    <div>
      <Title1>My page</Title1>
      <Text>Page content here</Text>
    </div>
  );
}
```

2. Add route in `App.tsx`:

```tsx
// packages/starter/src/App.tsx
import { MyPage } from './pages/MyPage';

// Inside Routes:
<Route path="/my-page" element={<MyPage />} />
```

3. Optionally add to navigation in `Navigation.tsx`

## Use session data

The `usePrototypeData` hook persists data to the Express server session:

```tsx
import { usePrototypeData } from '../hooks/usePrototypeData';

function MyComponent() {
  const { data, setData, loading, clearData } = usePrototypeData('my-key');
  
  const saveData = async () => {
    await setData({ name: 'Alice', role: 'Designer' });
  };
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <p>Name: {data?.name}</p>
      <button onClick={saveData}>Save</button>
      <button onClick={clearData}>Clear</button>
    </div>
  );
}
```

Each key creates a separate data store. Data persists across page refreshes and navigation.

## Customize theme

```tsx
// packages/starter/src/main.tsx
import { webDarkTheme } from '@fluentui/react-components';

<FluentProvider theme={webDarkTheme}>
  <App />
</FluentProvider>
```

Available themes: `webLightTheme`, `webDarkTheme`, `teamsLightTheme`, `teamsDarkTheme`

## Dependencies

| Package | Version |
|---------|---------|
| React | 18.3.1 |
| Fluent UI React Components | 9.54.0 |
| Fluent UI React Icons | 2.0.258 |
| React Router DOM | 6.26.2 |
| Vite | 5.4.3 |
| Express | 4.19.2 |
| TypeScript | 5.5.4 |

## Next steps

- Review the [implementation plan](../IMPLEMENTATION_PLAN_REACT.md) for roadmap
- Explore [Fluent UI React v9 components](https://react.fluentui.dev/)
- Check [Fluent 2 design guidelines](https://fluent2.microsoft.design/)
