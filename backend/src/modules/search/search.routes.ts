import { Router } from 'express';
import { people, orgs, interactions, tasks } from '../../data/mock-data.js';

export const router = Router();

router.get('/', (req, res) => {
  const q = (req.query.q as string)?.toLowerCase() || '';
  const results = {
    people: people.filter((p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))),
    orgs: orgs.filter((o) => o.name.toLowerCase().includes(q) || o.tags.some((t) => t.toLowerCase().includes(q))),
    interactions: interactions.filter((i) => i.summary.toLowerCase().includes(q)),
    tasks: tasks.filter((t) => t.title.toLowerCase().includes(q)),
  };
  res.json({ q, results });
});
