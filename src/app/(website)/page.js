import Hero from '../../components/Hero';
import ServicesAndStats from '../../components/ServicesandStats'; // Import the new component
import Skills from '../../components/Skills';
import Education from '../../components/Education';
import Projects from '../../components/Projects-section';
import Experience from '@/components/Experience';
import Appointment from '@/components/GetInTouch';


export default async function HomePage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/home-page`, { cache: 'no-cache' }).then((res) => res.json());
  console.log(response);
  return (
    <main>
      <Hero data={response?.banner[0]} />
      <ServicesAndStats data={response?.services} /> {/* Render the new section here */}
       <Skills data={response?.skills} /> 
       <Education data={response?.education} /> 
       <Experience data={response?.experience} />
       <Projects data={response?.projects} /> 
       <Appointment data={response?.appointment} />
                 
    </main>
  );
}

