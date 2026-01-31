import React from 'react';

function AchievementsSection() {
  return (
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
  );
}

export default AchievementsSection;
