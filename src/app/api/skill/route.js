import dbConnect from "@/lib/mongodb";
import Skill from "@/models/skill";

// 📌 READ all skills
export async function GET() {
  try {
    await dbConnect();
    const result = await Skill.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("❌ GET error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}

// 📌 CREATE new skill
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { skill, name, percentage, category } = body;

    if (!skill || !name || percentage === undefined) {
      return new Response(
        JSON.stringify({ message: "Skill, Name, and Percentage are required" }),
        { status: 400 }
      );
    }

    const result = await Skill.create({ skill, name, percentage, category });
    return new Response(JSON.stringify({ message: "Skill created", data: result }), {
      status: 201,
    });
  } catch (err) {
    console.error("❌ POST error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}

// 📌 UPDATE skill by id (?id=...)
export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });
    }

    const result = await Skill.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return new Response(JSON.stringify({ message: "Skill not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Skill updated", data: result }), {
      status: 200,
    });
  } catch (err) {
    console.error("❌ PUT error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}

// 📌 DELETE skill by id (?id=...)
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });
    }

    const result = await Skill.findByIdAndDelete(id);

    if (!result) {
      return new Response(JSON.stringify({ message: "Skill not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Skill deleted", deletedId: id }), {
      status: 200,
    });
  } catch (err) {
    console.error("❌ DELETE error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}

