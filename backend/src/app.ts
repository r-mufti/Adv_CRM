import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router as directoryRouter } from './modules/directory/directory.routes.js';
import { router as interactionsRouter } from './modules/interactions/interactions.routes.js';
import { router as tasksRouter } from './modules/tasks/tasks.routes.js';
import { router as searchRouter } from './modules/search/search.routes.js';
import { errorHandler } from './middleware/error-handler.js';
import { withUser } from './middleware/auth.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(withUser);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

app.use('/directory', directoryRouter);
app.use('/interactions', interactionsRouter);
app.use('/tasks', tasksRouter);
app.use('/search', searchRouter);

app.use(errorHandler);

export default app;