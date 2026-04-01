import { Interaction, Organization, Person, Task } from '../types.js';
import { randomUUID } from 'crypto';

const now = () => new Date().toISOString();

export const people: Person[] = [
  {
    id: randomUUID(),
    type: 'person',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'Manager',
    department: 'Operations',
    location: 'New York',
    tags: ['mentor', 'internal'],
    ownerId: 'user-1',
    visibility: 'team',
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: randomUUID(),
    type: 'person',
    name: 'Priya Singh',
    email: 'priya@example.com',
    role: 'Vendor Manager',
    department: 'Procurement',
    location: 'Delhi',
    tags: ['vendor', 'external'],
    ownerId: 'user-2',
    visibility: 'org',
    createdAt: now(),
    updatedAt: now(),
  },
];

export const orgs: Organization[] = [
  {
    id: randomUUID(),
    type: 'organization',
    name: 'Bright Supplies Co.',
    category: 'Supplier',
    region: 'APAC',
    tags: ['preferred'],
    ownerId: 'user-1',
    visibility: 'org',
    createdAt: now(),
    updatedAt: now(),
  },
];

export const interactions: Interaction[] = [
  {
    id: randomUUID(),
    entityId: people[0].id,
    kind: 'meeting',
    participants: [people[0].id],
    summary: 'Quarterly check-in on operations KPIs',
    followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    attachments: [],
    ownerId: 'user-1',
    visibility: 'team',
    createdAt: now(),
    updatedAt: now(),
  },
];

export const tasks: Task[] = [
  {
    id: randomUUID(),
    title: 'Prepare vendor review deck',
    description: 'Include SLA breaches and renewal options',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in_progress',
    assigneeId: people[0].id,
    relatedEntityId: orgs[0].id,
    ownerId: 'user-1',
    visibility: 'team',
    createdAt: now(),
    updatedAt: now(),
  },
];
