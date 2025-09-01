
import React from 'react';

// Import the contact section component you created earlier
import ContactSection from '../../components/contactsection'; 
// Make sure the path is correct based on your file structure
import ServicesAndStats  from '../../components/ServicesandStats';
import Skills from '../../components/Skills';
import Education from '../../components/Education';

export default function AllContactsPage() {
  return (
    // You can wrap the component in a main tag or a div
    // for semantic HTML, and apply any overall page styling.
    <main className="min-h-screen bg-neutral-900 text-white">
      <ContactSection />
      <ServicesAndStats />
      <Skills />
      <Education />
    </main>
  );
}