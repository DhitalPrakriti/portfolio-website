import React, { useEffect, useState } from 'react';

const defaultProjects = [
  {
    title: 'Travel Booking System',
    summary: 'Full-stack ASP.NET MVC application with user authentication, booking management, email notifications, and SQL Server database.',
    category: 'Full-Stack ASP.NET MVC',
    emoji: 'âœˆï¸',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-red-600',
    tech: ['C#', 'ASP.NET MVC', 'SQL Server', 'Bootstrap'],
    repoUrl: 'https://github.com/DhitalPrakriti/Travel-Booking-System',
    order: 1
  },
  {
    title: 'Python Learning Coach',
    summary: 'AI-powered multi-agent system with 5 specialized agents for personalized Python education, featuring skill assessment and adaptive learning paths.',
    category: 'AI Multi-Agent System',
    emoji: 'ðŸ¤–',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-blue-700',
    tech: ['Python', 'Flask', 'Google Gemini AI', 'Multi-Agent'],
    repoUrl: 'https://github.com/DhitalPrakriti/python-learning-coach',
    order: 2
  },
  {
    title: 'Network Packet Analyzer',
    summary: 'Enterprise-grade network analysis tool with real-time packet capture, protocol parsing, and security threat detection capabilities.',
    category: 'Network Security Tool',
    emoji: 'ðŸŒ',
    gradientFrom: 'from-green-600',
    gradientTo: 'to-teal-700',
    tech: ['Python', 'Scapy', 'Network Analysis', 'Security'],
    repoUrl: 'https://github.com/DhitalPrakriti/Network-Packet-Analyzer',
    order: 3
  }
];

function ProjectsSection() {
  const [projects, setProjects] = useState(defaultProjects);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const apiBase = process.env.REACT_APP_API_BASE || '';

    const loadProjects = async () => {
      try {
        const response = await fetch(`${apiBase}/api/projects`);
        if (!response.ok) {
          throw new Error('Failed to load projects');
        }
        const data = await response.json();
        if (Array.isArray(data.items) && data.items.length > 0) {
          const sorted = [...data.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setProjects(sorted);
        }
      } catch (error) {
        setLoadError('Unable to load projects right now.');
      }
    };

    loadProjects();
  }, []);

  return (
    <section id="projects" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Featured Projects</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-12">A glimpse of my technical work</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div
            key={project._id || project.title}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div className={`h-48 bg-gradient-to-br ${project.gradientFrom || 'from-gray-500'} ${project.gradientTo || 'to-gray-700'} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
              <div className="text-center text-white relative z-10">
                {project.emoji && <h4 className="font-bold text-2xl mb-3">{project.emoji}</h4>}
                <h4 className="font-bold text-xl mb-2">{project.title}</h4>
                {project.category && <p className="text-white/80 text-sm">{project.category}</p>}
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {project.summary}
              </p>
              {Array.isArray(project.tech) && project.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tag) => (
                    <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-4">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    <span>View Code</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    <span>Live Demo</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {loadError && (
        <p className="text-center text-sm text-red-600 dark:text-red-400 mt-6">{loadError}</p>
      )}

      <div className="text-center mt-12">
        <a
          href="https://github.com/DhitalPrakriti?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors px-6 py-3 border-2 border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-white transition-all duration-300"
        >
          <span>View All Projects on GitHub</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}

export default ProjectsSection;
