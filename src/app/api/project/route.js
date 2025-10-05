import dbConnect from "@/lib/mongodb";
import Project from "@/models/project";

// 📌 GET all projects
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}

// 📌 CREATE new project
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const project = await Project.create(body);
    return new Response(JSON.stringify(project), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}

// 📌 UPDATE project
export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return new Response(JSON.stringify({ message: "Project ID is required" }), { status: 400 });

    const body = await req.json();
    const project = await Project.findByIdAndUpdate(id, body, { new: true });

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}

// 📌 DELETE project
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return new Response(JSON.stringify({ message: "Project ID is required" }), { status: 400 });

    await Project.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Project deleted" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
