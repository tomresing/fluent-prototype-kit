import { startServer } from './index.js';

// Start development server
startServer({
  port: 3001,
  sessionSecret: 'dev-secret-change-in-production',
  corsOrigin: 'http://localhost:3000',
});
