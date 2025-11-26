// src/App.js
import React from 'react';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section with Side-by-Side Layout */}
      <section id="home" className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Hi, I'm <span className="text-blue-600">Prakriti Dhital</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Full-Stack Developer & AI Enthusiast passionate about building intelligent solutions and modern web applications
            </p>
            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                View My Projects
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Contact Me
              </button>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Circular Profile Picture Container */}
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img 
                  src="/images/profile.jpeg" 
                  alt="Prakriti Dhital" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              {/* Optional Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-3xl shadow-sm -mt-10 mx-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Technologies I Work With</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {['React', 'Node.js', 'Python', 'MongoDB', 'Tailwind CSS', 'AI/ML', 'Express.js', 'JavaScript'].map((skill) => (
            <div key={skill} className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <span className="font-medium text-gray-700">{skill}</span>
            </div>
          ))}
        </div>
      </section>

    
{/* About Section */}
<section id="about" className="container mx-auto px-4 py-16">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">About Me</h2>
    
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Personal Story */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Journey</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          I'm a passionate developer with a strong interest in artificial intelligence and full-stack development. 
          My journey began with curiosity about how technology can solve real-world problems, which led me to 
          explore everything from network systems to intelligent agents.
        </p>
        <p className="text-gray-600 mb-6 leading-relaxed">
          When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
          or diving into research papers about the latest advancements in AI and machine learning.
        </p>
        
        {/* Education */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-800 mb-2">Education</h4>
          <p className="text-gray-600">Bachelor's Of Science in Information Technology</p>
          <p className="text-gray-700 font-medium">Fairleigh Dickinson University, Vancouver</p>
          <p className="text-sm text-gray-500">Expected Graduation: 2025</p>
        </div>
      </div>

      {/* Skills & Interests */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">What I Do</h3>
        
        {/* Technical Focus */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Technical Focus</h4>
          <div className="flex flex-wrap gap-2">
            {['Full-Stack Development', 'AI Systems', 'Machine Learning', 'Web Applications', 'API Design', 'Database Management'].map((focus) => (
              <span key={focus} className="bg-white border border-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                {focus}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {['Mountain Hiking', 'Adventures', 'Technology Books', 'Open Source', 'Continuous Learning', 'UI/UX Design'].map((interest) => (
              <span key={interest} className="bg-white border border-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6">
          <h4 className="font-semibold text-gray-800 mb-2">Fun Facts</h4>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>• Built my first AI project in 2023</li>
            <li>• Love solving complex problems</li>
            <li>• Always learning new frameworks</li>
            <li>• Enjoy technical documentation</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Featured Projects Preview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Featured Projects</h2>
        <p className="text-gray-600 text-center mb-12">A glimpse of my recent work</p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Project 1 - AI System */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Multi-Agent AI System</h3>
              <p className="text-gray-600 mb-4">Intelligent agents collaborating to solve complex problems</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">Python</span>
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">TensorFlow</span>
                <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">AI/ML</span>
              </div>
            </div>
          </div>

          {/* Project 2 - Network Analyzer */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-green-500 to-blue-500"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Network Packet Analyzer</h3>
              <p className="text-gray-600 mb-4">Real-time network traffic analysis and visualization</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Python</span>
                <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">React</span>
                <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">Node.js</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            View All Projects →
          </button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Let's Work Together!</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          I'm currently looking for internship opportunities where I can contribute my skills in full-stack development and AI systems.
        </p>
        <button className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
          Get In Touch
        </button>
      </section>
    </div>
  );
}

export default App;