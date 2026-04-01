import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma.js';

const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  status: z.enum(['todo', 'in_progress', 'done']).default('todo'),
  assigneeId: z.string().optional(),
  relatedPersonId: z.string().optional(),
  relatedOrgId: z.string().optional(),
  visibility: z.enum(['private', 'team', 'org', 'public']).default('team'),
});

export const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const data = await prisma.task.findMany({ orderBy: { dueDate: 'asc' } });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const parsed = taskSchema.parse(req.body);
    const ownerId = req.user?.id || 'user-demo';
    const task = await prisma.task.create({ data: { ...parsed, ownerId } });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});
