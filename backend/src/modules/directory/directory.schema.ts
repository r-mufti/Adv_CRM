import { z } from 'zod';

export const personSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
  department: z.string().optional(),
  location: z.string().optional(),
  tags: z.array(z.string()).default([]),
  visibility: z.enum(['private', 'team', 'org', 'public']).default('org'),
});

export const orgSchema = z.object({
  name: z.string(),
  category: z.string().optional(),
  region: z.string().optional(),
  tags: z.array(z.string()).default([]),
  visibility: z.enum(['private', 'team', 'org', 'public']).default('org'),
});
