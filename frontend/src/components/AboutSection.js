import React from 'react';

function AboutSection() {
  return (
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
  );
}

export default AboutSection;
