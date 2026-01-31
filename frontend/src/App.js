// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import AdminProjectsSection from './components/AdminProjectsSection';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [formStatus, setFormStatus] = useState(''); // 'sending', 'success', 'error'
  const [formMessage, setFormMessage] = useState('');
  const adminEnabled = true;

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
    const payload = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      message: formData.get('message') || ''
    };
    const apiBase = process.env.REACT_APP_API_BASE || '';

    try {
      const response = await fetch(`${apiBase}/api/contacts`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
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
      <Header darkMode={darkMode} setDarkMode={setDarkMode} adminEnabled={adminEnabled} />
      <HeroSection scrollToSection={scrollToSection} />
      <SkillsSection />
      <AboutSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection
        formMessage={formMessage}
        formStatus={formStatus}
        handleFormSubmit={handleFormSubmit}
      />
      {adminEnabled && <AdminProjectsSection />}
      <FooterSection scrollToSection={scrollToSection} />
    </div>
  );
}

export default App;
