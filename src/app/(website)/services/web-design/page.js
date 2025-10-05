import Services from '../../../../components/web-design/WebDesign';
import States from '../../../../components/ServicesandStats';
import Skills from '../../../../components/Skills';

export default async function WebDesignPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/home-page`, { cache: 'no-cache' });
  const data = await res.json();

  return (
    <main>
      <Services />
      <States data={data?.services || []} />
      <Skills data={data?.skills || []} />
    </main>
  );
}
