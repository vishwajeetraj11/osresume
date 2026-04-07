import { getAuth } from '@clerk/nextjs/server';

const withApiAuth = handler => async (req, res) => {
  const auth = getAuth(req);

  if (!auth?.userId) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  req.auth = auth;
  return handler(req, res);
};

export default withApiAuth;
