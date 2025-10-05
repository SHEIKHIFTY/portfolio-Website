import Projects from '../../../components/projects';
import ServicesandStats from '../../../components/ServicesandStats';
import Skills from '../../../components/Skills';


export default async function AllProjectPage() {
  // ✅ Fetch the data from your API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/home-page`, { cache: 'no-cache' });
  const data = await res.json();

  return (
    <main>
      {/* Pass the fetched props */}
      <Projects />
      <ServicesandStats data={data?.services || []} />
      <Skills data={data?.skills || []} />
    </main>
  );
}