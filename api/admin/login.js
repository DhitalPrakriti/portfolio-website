const { getJsonBody } = require('../_helpers');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }

  const { username, password } = getJsonBody(req);

  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASS || !process.env.ADMIN_API_KEY) {
    return res.status(500).json({ error: 'admin not configured' });
  }

  if (username !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASS) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  return res.json({ token: process.env.ADMIN_API_KEY });
};
