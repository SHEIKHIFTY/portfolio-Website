import Hero from '../components/Hero';
import ServicesAndStats from '../components/ServicesandStats'; // Import the new component
import Skills from '../components/Skills';
import Education from '../components/Education';
import Projects from '../components/Projects-section';


export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesAndStats /> {/* Render the new section here */}
       <Skills /> 
       <Education /> 
       <Projects /> 
                 
    </main>
  );
}

