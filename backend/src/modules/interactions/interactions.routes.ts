import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { interactions } from '../../data/mock-data.js';
import { Interaction } from '../../types.js';

const interactionSchema = z.object({
  entityId: z.string(),
  kind: z.enum(['meeting', 'call', 'event', 'note']),
  participants: z.array(z.string()).default([]),
  summary: z.string(),
  followUpDate: z.string().datetime().optional(),
  attachments: z.array(z.string()).optional(),
  visibility: z.enum(['private', 'team', 'org', 'public']).default('team'),
});

export const router = Router();

router.get('/', (_req, res) => {
  res.json(interactions);
});

router.post('/', (req, res, next) => {
  try {
    const parsed = interactionSchema.parse(req.body);
    const now = new Date().toISOString();
    const record: Interaction = {
      id: randomUUID(),
      ownerId: 'user-1',
      createdAt: now,
      updatedAt: now,
      ...parsed,
    };
    interactions.push(record);
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
});
