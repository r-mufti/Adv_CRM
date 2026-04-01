import { NextFunction, Request, Response } from 'express';
import { Role } from '@prisma/client';

export interface AuthUser {
  id: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

// Very light placeholder auth: reads headers for demo. Replace with real JWT/SSO.
export function withUser(req: Request, _res: Response, next: NextFunction) {
  const id = (req.header('x-user-id') || 'user-demo').toString();
  const roleHeader = (req.header('x-user-role') || 'viewer') as Role;
  const role: Role = Object.values(Role).includes(roleHeader) ? roleHeader : Role.viewer;
  req.user = { id, role };
  next();
}

export function requireRole(allowed: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowed.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return next();
  };
}