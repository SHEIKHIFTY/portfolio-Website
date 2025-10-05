import dbConnect from "@/lib/mongodb";   // your dbConnect helper
import Banner from "@/models/banner";    // your Banner mongoose model
import { ObjectId } from "mongodb";

// ✅ READ all banners
export async function GET() {
  try {
    await dbConnect();
    const result = await Banner.find();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("❌ GET error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}

// ✅ DELETE a banner by id (?id=...)
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), {
        status: 400,
      });
    }

    const result = await Banner.findByIdAndDelete(id);

    if (!result) {
      return new Response(JSON.stringify({ message: "Not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Deleted", deletedId: id }),
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ DELETE error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}

// ✅ CREATE new banner
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const result = await Banner.create(body);
    return new Response(
      JSON.stringify({ message: "Item created", data: result }),
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ POST error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}

// ✅ UPDATE a banner (?id=...)
export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), {
        status: 400,
      });
    }

    const result = await Banner.findByIdAndUpdate(id, body, { new: true });

    if (!result) {
      return new Response(JSON.stringify({ message: "Not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Item updated", data: result }),
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ PUT error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
