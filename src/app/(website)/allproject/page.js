import Projects from "@/components/projects";
import ServicesandStats from "@/components/ServicesandStats";
import Skills from "@/components/Skills";

export default async function AllProjectPage() {
  try {
    // ✅ Fetch data from your API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/home-page`, {
      cache: "no-store", // always fetch fresh
    });

    if (!res.ok) {
      throw new Error("Failed to fetch home-page data");
    }

    const data = await res.json();

    return (
      <main className="p-6 space-y-12">
        {/* ✅ Pass real projects */}
        <Projects data={data?.projects || []} />

        {/* ✅ Pass real services */}
        <ServicesandStats data={data?.services || []} />

        {/* ✅ Pass real skills */}
        <Skills data={data?.skills || []} />
      </main>
    );
  } catch (error) {
    console.error("AllProjectPage error:", error);

    return (
      <main className="p-6">
        <h1 className="text-xl font-bold text-red-600">
          Failed to load projects.
        </h1>
      </main>
    );
  }
}
