export type Visibility = 'private' | 'team' | 'org' | 'public';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  visibility: Visibility;
}

export interface Person extends BaseEntity {
  type: 'person';
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  department?: string;
  location?: string;
  tags: string[];
}

export interface Organization extends BaseEntity {
  type: 'organization';
  name: string;
  category?: string;
  region?: string;
  tags: string[];
}

export interface Interaction extends BaseEntity {
  entityId: string; // person or org id
  kind: 'meeting' | 'call' | 'event' | 'note';
  participants: string[]; // person ids
  summary: string;
  followUpDate?: string;
  attachments?: string[];
}

export interface Task extends BaseEntity {
  title: string;
  description?: string;
  dueDate?: string;
  status: 'todo' | 'in_progress' | 'done';
  assigneeId?: string;
  relatedEntityId?: string; // person or org id
}
