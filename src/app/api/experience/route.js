import dbConnect from "@/lib/mongodb";
import Experience from "@/models/experience";

// 📌 GET all experiences
export async function GET() {
  try {
    await dbConnect();
    const result = await Experience.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("GET error:", err);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: err.message }),
      { status: 500 }
    );
  }
}

// 📌 CREATE new experience
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, company, year, description,  } = body;

    if (!title || !company || !year || !description ) {
      return new Response(
        JSON.stringify({ message: "All fields are required: title, company, year, description" }),
        { status: 400 }
      );
    }

    const result = await Experience.create({ title, company, year, description});

    return new Response(JSON.stringify({ message: "Experience created", data: result }), { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: err.message }),
      { status: 500 }
    );
  }
}

// 📌 UPDATE experience by id (?id=...)
export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id) return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });

    const result = await Experience.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!result) return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });

    return new Response(JSON.stringify({ message: "Experience updated", data: result }), { status: 200 });
  } catch (err) {
    console.error("PUT error:", err);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: err.message }),
      { status: 500 }
    );
  }
}

// 📌 DELETE experience by id (?id=...)
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });

    const result = await Experience.findByIdAndDelete(id);
    if (!result) return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });

    return new Response(JSON.stringify({ message: "Experience deleted", deletedId: id }), { status: 200 });
  } catch (err) {
    console.error("DELETE error:", err);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: err.message }),
      { status: 500 }
    );
  }
}
