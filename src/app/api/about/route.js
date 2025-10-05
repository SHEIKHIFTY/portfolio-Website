import dbConnect from "@/lib/mongodb";
import About from "@/models/about";

// ✅ READ all about sections
export async function GET() {
  try {
    await dbConnect();
    const result = await About.find();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("❌ GET error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}

// ✅ CREATE about
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.title || !body.description || !body.personality) {
      return new Response(
        JSON.stringify({ message: "Title, description and personality URL are required" }),
        { status: 400 }
      );
    }

    const result = await About.create(body);
    return new Response(JSON.stringify({ message: "About created", data: result }), {
      status: 201,
    });
  } catch (err) {
    console.error("❌ POST error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}

// ✅ UPDATE about by id (?id=...)
export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });
    }

    const result = await About.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "About updated", data: result }), { status: 200 });
  } catch (err) {
    console.error("❌ PUT error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}

// ✅ DELETE about by id (?id=...)
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });
    }

    const result = await About.findByIdAndDelete(id);

    if (!result) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "About deleted", deletedId: id }), { status: 200 });
  } catch (err) {
    console.error("❌ DELETE error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}
