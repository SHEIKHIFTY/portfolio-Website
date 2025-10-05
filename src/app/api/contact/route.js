import dbConnect from "@/lib/mongodb";
import ContactInfo from "@/models/contact";

// ✅ READ contact info
export async function GET() {
  try {
    await dbConnect();
    const result = await ContactInfo.findOne(); // only one document
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error(" GET error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}

// ✅ CREATE contact info
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.address || !body.email || !body.phone) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    const result = await ContactInfo.create(body);
    return new Response(JSON.stringify({ message: "Contact info created", data: result }), { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}

// ✅ UPDATE contact info (only one entry, use id)
export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });
    }

    const result = await ContactInfo.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Contact info updated", data: result }), { status: 200 });
  } catch (err) {
    console.error(" PUT error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}
