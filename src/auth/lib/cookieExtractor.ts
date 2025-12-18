import { Request } from 'express';

export interface RequestWithCookies extends Request {
  cookies: {
    access_token?: string;
  };
}

export const cookieExtractor = (req: RequestWithCookies): string | null => {
  return req.cookies?.access_token || null;
};
