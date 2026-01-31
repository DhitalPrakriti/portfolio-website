function getJsonBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'object') return req.body;
  try {
    return JSON.parse(req.body);
  } catch (error) {
    return {};
  }
}

function requireAdminKey(req, res) {
  const key = req.headers['x-admin-key'];
  if (!process.env.ADMIN_API_KEY) {
    res.status(500).json({ error: 'admin key not configured' });
    return false;
  }
  if (!key || key !== process.env.ADMIN_API_KEY) {
    res.status(401).json({ error: 'unauthorized' });
    return false;
  }
  return true;
}

module.exports = { getJsonBody, requireAdminKey };
