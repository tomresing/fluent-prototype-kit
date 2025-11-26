import express, { Request, Response } from 'express';
import session from 'express-session';
import createFileStore from 'session-file-store';
import cors from 'cors';
import path from 'path';

const FileStore = createFileStore(session);

// Extend session type
declare module 'express-session' {
  interface SessionData {
    prototypeData: Record<string, unknown>;
  }
}

export interface PrototypeServerOptions {
  port?: number;
  sessionSecret?: string;
  sessionPath?: string;
  corsOrigin?: string;
}

export function createPrototypeServer(options: PrototypeServerOptions = {}) {
  const {
    port = 3001,
    sessionSecret = 'fluent-prototype-kit-secret-change-in-production',
    sessionPath = '.sessions',
    corsOrigin = 'http://localhost:3000',
  } = options;

  const app = express();

  // Middleware
  app.use(cors({ origin: corsOrigin, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Session configuration
  app.use(
    session({
      store: new FileStore({
        path: path.join(process.cwd(), sessionPath),
        ttl: 86400, // 24 hours
        retries: 0,
      }),
      secret: sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
      },
    })
  );

  // API Routes

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Get all prototype data
  app.get('/api/prototype-data', (req: Request, res: Response) => {
    const data = req.session.prototypeData || {};
    res.json({ data });
  });

  // Get specific prototype data by key
  app.get('/api/prototype-data/:key', (req: Request, res: Response) => {
    const { key } = req.params;
    const data = req.session.prototypeData?.[key];
    res.json({ data: data || null });
  });

  // Set prototype data by key
  app.post('/api/prototype-data/:key', (req: Request, res: Response) => {
    const { key } = req.params;
    const { data } = req.body;

    if (!req.session.prototypeData) {
      req.session.prototypeData = {};
    }

    req.session.prototypeData[key] = data;

    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Failed to save data' });
      }
      res.json({ success: true, data });
    });
  });

  // Delete prototype data by key
  app.delete('/api/prototype-data/:key', (req: Request, res: Response) => {
    const { key } = req.params;

    if (req.session.prototypeData) {
      delete req.session.prototypeData[key];
    }

    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Failed to delete data' });
      }
      res.json({ success: true });
    });
  });

  // Clear all prototype data
  app.delete('/api/prototype-data', (req: Request, res: Response) => {
    req.session.prototypeData = {};

    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Failed to clear data' });
      }
      res.json({ success: true });
    });
  });

  // Clear session and start fresh
  app.post('/api/session/clear', (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
        return res.status(500).json({ error: 'Failed to clear session' });
      }
      res.json({ success: true });
    });
  });

  return { app, port };
}

export function startServer(options?: PrototypeServerOptions) {
  const { app, port } = createPrototypeServer(options);

  app.listen(port, () => {
    console.log(`🚀 Fluent Prototype Kit API server running on http://localhost:${port}`);
    console.log(`   Health check: http://localhost:${port}/api/health`);
  });
}
