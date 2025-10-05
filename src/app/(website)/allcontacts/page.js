import React from 'react';

// Import the contact section component you created earlier
import ContactSection from '../../../components/contactsection'; 
import ServicesAndStats from '../../../components/ServicesandStats';
import Skills from '../../../components/Skills';
import Education from '../../../components/Education';

export default async function AllContactsPage() {
  // ✅ Fetch data from your backend
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/home-page`, { cache: 'no-cache' });
  const data = await res.json();

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <ContactSection />
      {/* Pass props here */}
      <ServicesAndStats data={data?.services || []} />
      <Skills data={data?.skills || []} />
      <Education data={data?.education || []} />
    </main>
  );
}
