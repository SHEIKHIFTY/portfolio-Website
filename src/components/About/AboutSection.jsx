import React from 'react';
import ServicesandStats from '../ServicesandStats';
import Skills from '../Skills';
import Education from '../Education';


const About = () => {
  return (
    <div className="about px-6 py-12 max-w-7xl mx-auto">
      {/* Title + Breadcrumb */}
      <div className="text-center mb-6 mt-12">
        <h1 className="text-4xl font-bold text-white">About Me</h1>
        <p className="text-gray-400 mt-2">
          <span className="text-white">Home</span> &gt; <span className="text-red-500">About</span>
        </p>
      </div>

      {/* Services and Stats Section */}
      <ServicesandStats />

      {/* Skills Section */}
      <Skills />

      {/* Education Section */}
      <Education />

    
    </div>
  );
};

export default About;
