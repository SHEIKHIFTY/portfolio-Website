import dbConnect from "@/lib/mongodb";
import Education from "@/models/education";

// ✅ READ all education entries
export async function GET() {
  try {
    await dbConnect();
    const result = await Education.find();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("❌ GET error:", err);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: err.message }),
      { status: 500 }
    );
  }
}

// ✅ CREATE new education entry
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.name || !body.session) {
      return new Response(
        JSON.stringify({ message: "Name and Session are required" }),
        { status: 400 }
      );
    }

    const result = await Education.create(body);
    return new Response(
      JSON.stringify({ message: "Education created", data: result }),
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ POST error:", err);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: err.message }),
      { status: 500 }
    );
  }
}

// ✅ UPDATE education by id (?id=...)
export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });
    }

    const result = await Education.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: "Education updated", data: result }),
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ PUT error:", err);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: err.message }),
      { status: 500 }
    );
  }
}

// ✅ DELETE education by id (?id=...)
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });
    }

    const result = await Education.findByIdAndDelete(id);

    if (!result) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: "Education deleted", deletedId: id }),
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ DELETE error:", err);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: err.message }),
      { status: 500 }
    );
  }
}
