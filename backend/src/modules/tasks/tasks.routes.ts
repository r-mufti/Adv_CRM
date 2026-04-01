import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { tasks } from '../../data/mock-data.js';
import { Task } from '../../types.js';

const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  status: z.enum(['todo', 'in_progress', 'done']).default('todo'),
  assigneeId: z.string().optional(),
  relatedEntityId: z.string().optional(),
  visibility: z.enum(['private', 'team', 'org', 'public']).default('team'),
});

export const router = Router();

router.get('/', (_req, res) => {
  res.json(tasks);
});

router.post('/', (req, res, next) => {
  try {
    const parsed = taskSchema.parse(req.body);
    const now = new Date().toISOString();
    const task: Task = {
      id: randomUUID(),
      ownerId: 'user-1',
      createdAt: now,
      updatedAt: now,
      ...parsed,
    };
    tasks.push(task);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});
