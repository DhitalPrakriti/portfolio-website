const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || '';
const ADMIN_USER = process.env.ADMIN_USER || '';
const ADMIN_PASS = process.env.ADMIN_PASS || '';

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

const requireAdminKey = (req, res, next) => {
  if (!ADMIN_API_KEY) {
    return res.status(500).json({ error: 'admin key not configured' });
  }
  const key = req.get('x-admin-key');
  if (!key || key !== ADMIN_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
};

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!ADMIN_USER || !ADMIN_PASS || !ADMIN_API_KEY) {
    return res.status(500).json({ error: 'admin not configured' });
  }

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  res.json({ token: ADMIN_API_KEY });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    emoji: { type: String, trim: true },
    gradientFrom: { type: String, trim: true },
    gradientTo: { type: String, trim: true },
    tech: [{ type: String, trim: true }],
    repoUrl: { type: String, trim: true },
    liveUrl: { type: String, trim: true },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/contacts', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'invalid email address' });
  }

  try {
    const created = await Contact.create({ name, email, message });
    res.status(201).json({ id: created._id });
  } catch (error) {
    res.status(500).json({ error: 'failed to save contact' });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100).lean();
    res.json({ items: contacts });
  } catch (error) {
    res.status(500).json({ error: 'failed to fetch contacts' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    res.json({ items: projects });
  } catch (error) {
    res.status(500).json({ error: 'failed to fetch projects' });
  }
});

app.post('/api/projects', requireAdminKey, async (req, res) => {
  const { title, summary, tech } = req.body || {};

  if (!title || !summary) {
    return res.status(400).json({ error: 'title and summary are required' });
  }

  if (tech && !Array.isArray(tech)) {
    return res.status(400).json({ error: 'tech must be an array of strings' });
  }

  try {
    const created = await Project.create(req.body);
    res.status(201).json({ id: created._id });
  } catch (error) {
    res.status(500).json({ error: 'failed to save project' });
  }
});

app.put('/api/projects/:id', requireAdminKey, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'project not found' });
    }
    res.json({ id: updated._id });
  } catch (error) {
    res.status(500).json({ error: 'failed to update project' });
  }
});

app.delete('/api/projects/:id', requireAdminKey, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'project not found' });
    }
    res.json({ id: deleted._id });
  } catch (error) {
    res.status(500).json({ error: 'failed to delete project' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
