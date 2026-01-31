import React from 'react';

function SkillsSection() {
  return (
    <section className="container mx-auto px-4 py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-sm -mt-10 mx-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Technologies I Work With</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Frontend</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {['React', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'].map((skill) => (
              <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-2 rounded-lg font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Backend</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Node.js', 'Express.js', 'Python', 'C#', 'ASP.NET'].map((skill) => (
              <span key={skill} className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-2 rounded-lg font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Data & Tools</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {['MongoDB', 'SQL', 'AI/ML', 'Git', 'REST APIs'].map((skill) => (
              <span key={skill} className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-2 rounded-lg font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
