const mongoose = require('mongoose');
const { connectToDatabase } = require('./_db');
const { getJsonBody, requireAdminKey } = require('./_helpers');

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
    featured: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

module.exports = async (req, res) => {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const projects = await Project.find().sort({ createdAt: -1 }).lean();
      return res.json({ items: projects });
    } catch (error) {
      return res.status(500).json({ error: 'failed to fetch projects' });
    }
  }

  if (req.method === 'POST') {
    if (!requireAdminKey(req, res)) return;

    const { title, summary, tech } = getJsonBody(req);

    if (!title || !summary) {
      return res.status(400).json({ error: 'title and summary are required' });
    }
    if (tech && !Array.isArray(tech)) {
      return res.status(400).json({ error: 'tech must be an array of strings' });
    }

    try {
      const created = await Project.create(getJsonBody(req));
      return res.status(201).json({ id: created._id });
    } catch (error) {
      return res.status(500).json({ error: 'failed to save project' });
    }
  }

  return res.status(405).json({ error: 'method not allowed' });
};
