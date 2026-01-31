const mongoose = require('mongoose');
const { connectToDatabase } = require('./_db');
const { getJsonBody } = require('./_helpers');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

module.exports = async (req, res) => {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { name, email, message } = getJsonBody(req);

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'invalid email address' });
    }

    try {
      const created = await Contact.create({ name, email, message });
      return res.status(201).json({ id: created._id });
    } catch (error) {
      return res.status(500).json({ error: 'failed to save contact' });
    }
  }

  if (req.method === 'GET') {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100).lean();
      return res.json({ items: contacts });
    } catch (error) {
      return res.status(500).json({ error: 'failed to fetch contacts' });
    }
  }

  return res.status(405).json({ error: 'method not allowed' });
};
