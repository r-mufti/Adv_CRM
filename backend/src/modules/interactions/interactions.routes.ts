import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma.js';

const interactionSchema = z.object({
  personId: z.string().optional(),
  organizationId: z.string().optional(),
  kind: z.enum(['meeting', 'call', 'event', 'note']),
  participants: z.array(z.string()).default([]),
  summary: z.string(),
  followUpDate: z.string().datetime().optional(),
  attachments: z.array(z.string()).optional(),
  visibility: z.enum(['private', 'team', 'org', 'public']).default('team'),
});

export const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const data = await prisma.interaction.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const parsed = interactionSchema.parse(req.body);
    const ownerId = req.user?.id || 'user-demo';
    const record = await prisma.interaction.create({ data: { ...parsed, ownerId } });
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
});
