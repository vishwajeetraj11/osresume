import { requireSession } from '@clerk/clerk-sdk-node';

export default requireSession((req, res) => {
  res.statusCode = 200;
  res.json({ id: req.session.userId });
});
