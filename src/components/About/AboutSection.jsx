// app/about/page.jsx (or wherever your About page lives)

import ServicesandStats from '@/components/ServicesandStats';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Experience from '@/components/Experience';

export default async function AboutPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/home-page`, { cache: 'no-cache' })
    .then((res) => res.json());

  return (
    <div className="about px-6 py-12 max-w-7xl mx-auto">
      {/* Title + Breadcrumb */}
      <div className="text-center mb-6 mt-12">
        <h1 className="text-4xl font-bold text-white">About Me</h1>
        <p className="text-gray-400 mt-2">
          <span className="text-white">Home</span> &gt; <span className="text-red-500">About</span>
        </p>
      </div>

      {/* Pass props just like HomePage */}
      <ServicesandStats data={response?.services} />
      <Skills data={response?.skills} />
      <Education data={response?.education} />
      <Experience data={response?.experience} />
    </div>
  );
}
