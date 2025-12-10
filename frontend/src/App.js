// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [formStatus, setFormStatus] = useState(''); // 'sending', 'success', 'error'
  const [formMessage, setFormMessage] = useState('');

  // Smooth scroll function
 const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 80;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Formspree form handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormMessage('');

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        setFormMessage('Thank you for your message! I\'ll get back to you soon.');
        form.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus('');
          setFormMessage('');
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage('Sorry, there was an error sending your message. Please try again or email me directly.');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormStatus('');
        setFormMessage('');
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Prakriti Dhital</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Full-Stack Developer & AI Enthusiast passionate about building intelligent solutions and modern web applications
            </p>
            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
              <div className="space-y-6">
                <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg flex items-center gap-2"
                  >
                    <span>Contact Me</span>
                  </button>

                  <a 
                    href="/Prakriti_Dhital_resume.pdf"
                    download="Prakriti_Dhital_resume.pdf"
                    className="bg-gray-800 dark:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Resume</span>
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 justify-center md:justify-start">
                  <a 
                    href="https://github.com/DhitalPrakriti" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 dark:bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors shadow-lg"
                    title="GitHub Profile"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>

                  <a 
                    href="https://linkedin.com/in/prakriti-dhital" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-700 dark:bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors shadow-lg"
                    title="LinkedIn Profile"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="mailto:prakriti.dhital.tech@gmail.com"
                    className="w-12 h-12 bg-green-600 dark:bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-700 dark:hover:bg-green-600 transition-colors shadow-lg"
                    title="Send Email"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                <img 
                  src="/images/profile.jpeg" 
                  alt="Prakriti Dhital" 
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div 
                  className="hidden w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl font-bold"
                >
                  PD
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 dark:bg-yellow-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-green-400 dark:bg-green-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-sm -mt-10 mx-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Technologies I Work With</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Frontend</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {['React', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'].map(skill => (
                <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-2 rounded-lg font-medium">{skill}</span>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Backend</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Node.js', 'Express.js', 'Python', 'C#', 'ASP.NET'].map(skill => (
                <span key={skill} className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-2 rounded-lg font-medium">{skill}</span>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Data & Tools</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {['MongoDB', 'SQL', 'AI/ML', 'Git', 'REST APIs'].map(skill => (
                <span key={skill} className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-2 rounded-lg font-medium">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">My Journey</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                I'm a passionate developer with a strong interest in artificial intelligence and full-stack development. 
                My journey began with curiosity about how technology can solve real-world problems, which led me to 
                explore everything from building user interfaces to understanding backend logic and AI-based systems.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                When I'm not coding, I love hiking, adventurous activities, and exploring new places. 
                Beyond outdoor adventures, you can find me exploring new technologies, experimenting with ideas, 
                and reading research papers to stay updated on the latest advancements in AI and machine learning. 
                I enjoy pushing myself to grow and take on challenges that expand my skills.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Education</h4>
                <p className="text-gray-600 dark:text-gray-300">Bachelor's Of Science in Information Technology</p>
                <p className="text-gray-700 dark:text-gray-200 font-medium">Fairleigh Dickinson University, Vancouver</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expected Graduation: 2026</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What I Do</h3>
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Technical Focus</h4>
                <div className="flex flex-wrap gap-2">
                  {['Full-Stack Development', 'AI Systems', 'Machine Learning', 'Web Applications', 'API Design', 'Database Management'].map((focus) => (
                    <span key={focus} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full">
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {['Mountain Hiking', 'Tech Literature', 'Open Source', 'UI/UX Design', 'Cloud Technologies', 'Adventures'].map((interest) => (
                    <span key={interest} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">My approach</h4>
                <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                   <li>• Combining technical expertise with creative problem-solving</li>
                   <li>• Staying current with AI advancements and new frameworks</li>
                   <li>• Building scalable, user-focused applications</li>
                   <li>• Embracing challenges that expand my skills</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Featured Projects</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12">A glimpse of my technical work</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Project 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
              <div className="text-center text-white relative z-10">
                <h4 className="font-bold text-2xl mb-3">✈️</h4>
                <h4 className="font-bold text-xl mb-2">Travel Booking System</h4>
                <p className="text-orange-100 text-sm">Full-Stack ASP.NET MVC</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Full-stack ASP.NET MVC application with user authentication, booking management, 
                email notifications, and SQL Server database.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">C#</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">ASP.NET MVC</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">SQL Server</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">Bootstrap</span>
              </div>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/DhitalPrakriti/Travel-Booking-System" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  <span>View Code</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-700 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
              <div className="text-center text-white relative z-10">
                <h4 className="font-bold text-2xl mb-3">🤖</h4>
                <h4 className="font-bold text-xl mb-2">Python Learning Coach</h4>
                <p className="text-purple-100 text-sm">AI Multi-Agent System</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                AI-powered multi-agent system with 5 specialized agents for personalized Python education, 
                featuring skill assessment and adaptive learning paths.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">Python</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">Flask</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">Google Gemini AI</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">Multi-Agent</span>
              </div>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/DhitalPrakriti/python-learning-coach" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  <span>View Code</span>
                  <span>→</span>
                </a>
              </div>
              <div className="mt-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                <p className="text-blue-700 dark:text-blue-300 text-sm">🚀 Deployment in progress to Google Cloud Vertex AI</p>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="h-48 bg-gradient-to-br from-green-600 to-teal-700 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
              <div className="text-center text-white relative z-10">
                <h4 className="font-bold text-2xl mb-3">🌐</h4>
                <h4 className="font-bold text-xl mb-2">Network Packet Analyzer</h4>
                <p className="text-green-100 text-sm">Network Security Tool</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Enterprise-grade network analysis tool with real-time packet capture, protocol parsing, 
                and security threat detection capabilities.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">Python</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">Scapy</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">Network Analysis</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded">Security</span>
              </div>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/DhitalPrakriti/Network-Packet-Analyzer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                >
                  <span>View Code</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://github.com/DhitalPrakriti?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors px-6 py-3 border-2 border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-white transition-all duration-300"
          >
            <span>View All Projects on GitHub</span>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Achievements & Leadership</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Academic Excellence</h3>
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Rotary Club Scholarship Winner</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Awarded for academic excellence and community contributions</p>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Honors List Student</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Consistent academic performance recognition at FDU Vancouver</p>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Dean's List Recognition</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Top-tier academic achievement throughout university studies</p>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Leadership & Global Engagement</h3>
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-gray-800 dark:text-white">National Model United Nations</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Delegate representing FDU Vancouver in international diplomacy</p>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Commencement Ceremony Volunteer</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Supported university graduation events and ceremonies</p>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Student Representative</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Actively involved in FDU Vancouver student community</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">Key Competencies Demonstrated</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm text-gray-700 dark:text-gray-300">Academic Excellence</span>
              <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm text-gray-700 dark:text-gray-300">Global Perspective</span>
              <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm text-gray-700 dark:text-gray-300">Community Service</span>
              <span className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm text-gray-700 dark:text-gray-300">Leadership Skills</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Let's Work Together!</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            I'm currently looking for internship opportunities where I can contribute my skills in full-stack development and AI systems.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Send me a message</h3>
              
              {/* Status Messages */}
              {formMessage && (
                <div className={`mb-6 rounded-lg p-4 ${
                  formStatus === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                    : formStatus === 'error'
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
                    : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700'
                }`}>
                  <p className={`
                    ${formStatus === 'success' ? 'text-green-700 dark:text-green-300' : ''}
                    ${formStatus === 'error' ? 'text-red-700 dark:text-red-300' : ''}
                    ${formStatus === 'sending' ? 'text-blue-700 dark:text-blue-300' : ''}
                  `}>
                    {formStatus === 'sending' ? '⏳ Sending your message...' : ''}
                    {formMessage}
                  </p>
                </div>
              )}

              <form 
                action="https://formspree.io/f/xqavbejj"
                method="POST"
                onSubmit={handleFormSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="_subject" value="New Portfolio Message from Prakriti Dhital's Website" />
                <input type="text" name="_gotcha" style={{display: 'none'}} />
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Enter your full name"
                    disabled={formStatus === 'sending'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Enter your email address"
                    disabled={formStatus === 'sending'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-vertical"
                    placeholder="Tell me about your project or opportunity..."
                    disabled={formStatus === 'sending'}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className={`w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    formStatus === 'sending' 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:scale-105'
                  }`}
                >
                  {formStatus === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Get in touch</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  I'm always open to discussing new opportunities, interesting projects, or potential collaborations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-sm">📧</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">prakriti.dhital.tech@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-sm">🎓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">FDU Vancouver - Expected 2026</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Response Time</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  I typically respond to messages within 24 hours. For urgent inquiries, please mention it in your message.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Current Status</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  🟢 Actively looking for internship opportunities in Full-Stack Development and AI/ML roles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">© 2024 Prakriti Dhital. All rights reserved.</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="https://github.com/DhitalPrakriti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                title="GitHub Profile"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              <a 
                href="https://linkedin.com/in/prakriti-dhital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                title="LinkedIn Profile"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a 
                href="mailto:prakriti.dhital.tech@gmail.com"
                className="w-10 h-10 bg-green-600 hover:bg-green-500 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                title="Send Email"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                </svg>
              </a>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-right">
              <p className="text-gray-300 font-medium mb-2">Quick Links</p>
              <div className="flex gap-4">
                <a 
                  href="#home" 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Home
                </a>
                <a 
                  href="#projects" 
                  onClick={() => scrollToSection('projects')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Projects
                </a>
                <a 
                  href="#contact" 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom border */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              Built with React & Tailwind CSS • Passionately crafted
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;