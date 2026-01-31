import React, { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  summary: '',
  category: '',
  emoji: '',
  gradientFrom: '',
  gradientTo: '',
  tech: '',
  repoUrl: '',
  liveUrl: '',
  featured: true,
  order: 0
};

function AdminProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState('');
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem('adminToken') || '');
  const [login, setLogin] = useState({ username: '', password: '' });
  const [unlocked, setUnlocked] = useState(!!adminToken);

  const apiBase = process.env.REACT_APP_API_BASE || '';

  const loadProjects = async () => {
    try {
      setError('');
      const response = await fetch(`${apiBase}/api/projects`);
      if (!response.ok) {
        throw new Error('Failed to load projects');
      }
      const data = await response.json();
      const items = Array.isArray(data.items) ? data.items : [];
      items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setProjects(items);
    } catch (err) {
      setError('Unable to load projects.');
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title || '',
      summary: project.summary || '',
      category: project.category || '',
      emoji: project.emoji || '',
      gradientFrom: project.gradientFrom || '',
      gradientTo: project.gradientTo || '',
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
      repoUrl: project.repoUrl || '',
      liveUrl: project.liveUrl || '',
      featured: project.featured ?? true,
      order: project.order ?? 0
    });
    setEditingId(project._id);
    setStatus('Editing project.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');

    if (!adminToken) {
      setError('Admin login required.');
      return;
    }

    const payload = {
      ...form,
      tech: form.tech
        ? form.tech.split(',').map((item) => item.trim()).filter(Boolean)
        : []
    };

    if (!editingId) {
      const maxOrder = projects.reduce((max, item) => Math.max(max, item.order ?? 0), 0);
      payload.order = Number.isFinite(Number(form.order)) ? Number(form.order) : maxOrder + 1;
      if (!payload.order) {
        payload.order = maxOrder + 1;
      }
    } else {
      payload.order = Number.isFinite(Number(form.order)) ? Number(form.order) : 0;
    }

    try {
      const response = await fetch(`${apiBase}/api/projects${editingId ? `/${editingId}` : ''}`, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'x-admin-key': adminToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        throw new Error('Failed to save project');
      }

      setStatus(editingId ? 'Project updated.' : 'Project saved.');
      setForm(emptyForm);
      setEditingId('');
      loadProjects();
    } catch (err) {
      setError(err.message === 'Unauthorized' ? 'Unauthorized. Please login again.' : 'Unable to save project.');
    }
  };

  const moveProject = async (id, direction) => {
    if (!adminToken) {
      setError('Admin login required.');
      return;
    }

    const list = [...projects];
    const index = list.findIndex((item) => item._id === id);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const current = list[index];
    const target = list[targetIndex];

    const currentOrder = current.order ?? index;
    const targetOrder = target.order ?? targetIndex;

    try {
      await Promise.all([
        fetch(`${apiBase}/api/projects/${current._id}`, {
          method: 'PUT',
          headers: {
            'x-admin-key': adminToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ order: targetOrder })
        }),
        fetch(`${apiBase}/api/projects/${target._id}`, {
          method: 'PUT',
          headers: {
            'x-admin-key': adminToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ order: currentOrder })
        })
      ]);

      loadProjects();
    } catch (err) {
      setError('Unable to reorder project.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiBase}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': adminToken
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        throw new Error('Failed to delete');
      }
      loadProjects();
    } catch (err) {
      setError(err.message === 'Unauthorized' ? 'Unauthorized. Please login again.' : 'Unable to delete project.');
    }
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');

    try {
      const response = await fetch(`${apiBase}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(login)
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      if (!data.token) {
        throw new Error('Invalid response');
      }

      sessionStorage.setItem('adminToken', data.token);
      setAdminToken(data.token);
      setUnlocked(true);
      setLogin({ username: '', password: '' });
      setStatus('Logged in.');
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem('adminToken');
    setAdminToken('');
    setUnlocked(false);
  };

  if (!unlocked) {
    return (
      <section id="admin" className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Admin Access</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">Login to manage projects.</p>
          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="text"
              value={login.username}
              onChange={(e) => setLogin((prev) => ({ ...prev, username: e.target.value }))}
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <input
              type="password"
              value={login.password}
              onChange={(e) => setLogin((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
            {status && <p className="text-green-600 dark:text-green-400 text-sm">{status}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Admin: Manage Projects</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-12">Add, review, or remove projects stored in MongoDB.</p>

      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Summary *</label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emoji</label>
              <input
                name="emoji"
                value={form.emoji}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gradient From</label>
              <input
                name="gradientFrom"
                value={form.gradientFrom}
                onChange={handleChange}
                placeholder="from-blue-600"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gradient To</label>
              <input
                name="gradientTo"
                value={form.gradientTo}
                onChange={handleChange}
                placeholder="to-indigo-700"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tech (comma separated)</label>
            <input
              name="tech"
              value={form.tech}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order</label>
            <input
              name="order"
              value={form.order}
              onChange={handleChange}
              type="number"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lower numbers show first.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Repo URL</label>
              <input
                name="repoUrl"
                value={form.repoUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Live URL</label>
              <input
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Featured
          </label>

          {status && <p className="text-green-600 dark:text-green-400 text-sm">{status}</p>}
          {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            {editingId ? 'Update Project' : 'Save Project'}
          </button>
          <button
            type="button"
            onClick={handleLock}
            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Logout
          </button>
        </form>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Existing Projects</h3>
          <div className="space-y-4">
            {projects.length === 0 && (
              <p className="text-gray-600 dark:text-gray-300 text-sm">No projects yet.</p>
            )}
            {projects.map((project) => (
              <div key={project._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-gray-800 dark:text-white font-medium">{project.title}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{project.summary}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Order: {project.order ?? 0}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(project)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => moveProject(project._id, 'up')}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
                    >
                      Move Up
                    </button>
                    <button
                      type="button"
                      onClick={() => moveProject(project._id, 'down')}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
                    >
                      Move Down
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(project._id)}
                      className="text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminProjectsSection;
