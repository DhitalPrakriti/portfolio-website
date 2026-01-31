const mongoose = require('mongoose');
const { connectToDatabase } = require('../_db');
const { getJsonBody, requireAdminKey } = require('../_helpers');

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
  const { id } = req.query || {};

  if (req.method === 'PUT') {
    if (!requireAdminKey(req, res)) return;
    try {
      const updated = await Project.findByIdAndUpdate(id, getJsonBody(req), { new: true });
      if (!updated) {
        return res.status(404).json({ error: 'project not found' });
      }
      return res.json({ id: updated._id });
    } catch (error) {
      return res.status(500).json({ error: 'failed to update project' });
    }
  }

  if (req.method === 'DELETE') {
    if (!requireAdminKey(req, res)) return;
    try {
      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'project not found' });
      }
      return res.json({ id: deleted._id });
    } catch (error) {
      return res.status(500).json({ error: 'failed to delete project' });
    }
  }

  return res.status(405).json({ error: 'method not allowed' });
};
