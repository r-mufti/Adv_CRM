import { Router } from 'express';
import { personSchema, orgSchema } from './directory.schema.js';
import { prisma } from '../../prisma.js';

export const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const [people, orgs] = await Promise.all([
      prisma.person.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.organization.findMany({ orderBy: { createdAt: 'desc' } }),
    ]);
    res.json({ people, orgs });
  } catch (err) {
    next(err);
  }
});

router.post('/people', async (req, res, next) => {
  try {
    const parsed = personSchema.parse(req.body);
    const ownerId = req.user?.id || 'user-demo';
    const person = await prisma.person.create({ data: { ...parsed, ownerId } });
    res.status(201).json(person);
  } catch (err) {
    next(err);
  }
});

router.post('/orgs', async (req, res, next) => {
  try {
    const parsed = orgSchema.parse(req.body);
    const ownerId = req.user?.id || 'user-demo';
    const org = await prisma.organization.create({ data: { ...parsed, ownerId } });
    res.status(201).json(org);
  } catch (err) {
    next(err);
  }
});
