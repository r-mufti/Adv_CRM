import { Router } from 'express';
import { randomUUID } from 'crypto';
import { people, orgs } from '../../data/mock-data.js';
import { personSchema, orgSchema } from './directory.schema.js';
import { Person, Organization } from '../../types.js';

export const router = Router();

router.get('/', (_req, res) => {
  res.json({ people, orgs });
});

router.post('/people', (req, res, next) => {
  try {
    const parsed = personSchema.parse(req.body);
    const now = new Date().toISOString();
    const person: Person = {
      id: randomUUID(),
      type: 'person',
      ownerId: 'user-1',
      createdAt: now,
      updatedAt: now,
      ...parsed,
    };
    people.push(person);
    res.status(201).json(person);
  } catch (err) {
    next(err);
  }
});

router.post('/orgs', (req, res, next) => {
  try {
    const parsed = orgSchema.parse(req.body);
    const now = new Date().toISOString();
    const org: Organization = {
      id: randomUUID(),
      type: 'organization',
      ownerId: 'user-1',
      createdAt: now,
      updatedAt: now,
      ...parsed,
    };
    orgs.push(org);
    res.status(201).json(org);
  } catch (err) {
    next(err);
  }
});
