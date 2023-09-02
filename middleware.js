import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({});

export const config = {
  matcher: ['/', '/templates', '/api/resumes?template=true'],
};
