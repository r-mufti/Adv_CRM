import { Router } from 'express';
import { prisma } from '../../prisma.js';

export const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const q = (req.query.q as string)?.trim();
    if (!q) {
      return res.json({ q: '', results: { people: [], orgs: [], interactions: [], tasks: [] } });
    }
    const people = await prisma.person.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { tags: { has: q } },
          { department: { contains: q, mode: 'insensitive' } },
        ],
      },
    });
    const orgs = await prisma.organization.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { tags: { has: q } },
          { category: { contains: q, mode: 'insensitive' } },
        ],
      },
    });
    const interactions = await prisma.interaction.findMany({
      where: { summary: { contains: q, mode: 'insensitive' } },
    });
    const tasks = await prisma.task.findMany({
      where: { title: { contains: q, mode: 'insensitive' } },
    });

    res.json({ q, results: { people, orgs, interactions, tasks } });
  } catch (err) {
    next(err);
  }
});
