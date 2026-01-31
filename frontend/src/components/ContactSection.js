import React from 'react';

function ContactSection({ formMessage, formStatus, handleFormSubmit }) {
  return (
    <section id="contact" className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Let's Work Together!</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          I'm currently looking for internship opportunities where I can contribute my skills in full-stack development and AI systems.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Send me a message</h3>

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
                  {formStatus === 'sending' ? 'â³ Sending your message...' : ''}
                  {formMessage}
                </p>
              </div>
            )}

            <form
              method="POST"
              onSubmit={handleFormSubmit}
              className="space-y-6"
            >
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

          <div className="space-y-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Get in touch</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I'm always open to discussing new opportunities, interesting projects, or potential collaborations.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm">🎓</span>
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
  );
}

export default ContactSection;
