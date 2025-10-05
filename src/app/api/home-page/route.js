import  { dbConnect } from "@/lib/mongodb";
import Banner from "@/models/banner";
import Education from "@/models/education";
import Experience from "@/models/experience";
import  Service  from '@/models/service';
import  Skill  from '@/models/skill';
import  Project  from '@/models/project';

// ✅ READ all items
export async function GET() {
  try {
   await dbConnect();
    const banner = await Banner.find();
    const services = await Service.find();
    const experience = await Experience.find();
    const skills = await Skill.find();
    const education = await Education.find();
    const projects = await Project.find();
    return new Response(JSON.stringify( {banner, services, experience, skills, education, projects}), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}

