import dbConnect from "@/lib/mongodb";
import Service from "@/models/service";

// 📌 READ all services
export async function GET() {
  try {
    console.log("➡️ GET /api/service-section called");
    await dbConnect();
    console.log("✅ DB connected");

    const result = await Service.find();
    console.log(`✅ Found ${result.length} services`);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("❌ GET error:", err);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: err.message }),
      { status: 500 }
    );
  }
}

// 📌 CREATE new service
export async function POST(req) {
  try {
    console.log("➡️ POST /api/service-section called");

    await dbConnect();
    console.log("✅ DB connected");

    const body = await req.json();
    console.log("📦 Request body:", body);

    if (!body.name || !body.icon || body.projects === undefined) {
      console.log("❌ Missing required fields");
      return new Response(
        JSON.stringify({ message: "Name, Icon, and Projects are required" }),
        { status: 400 }
      );
    }

    const result = await Service.create({
      name: body.name,
      icon: body.icon,
      projects: Number(body.projects) || 0, // ✅ always a number
    });

    console.log("✅ Service created:", result);

    return new Response(
      JSON.stringify({ message: "Service created", data: result }),
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ POST error:", err);
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
        error: err.message,
        stack: err.stack,
      }),
      { status: 500 }
    );
  }
}

// 📌 UPDATE service by id (?id=...)
export async function PUT(req) {
  try {
    console.log("➡️ PUT /api/service-section called");

    await dbConnect();
    console.log("✅ DB connected");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    console.log("🆔 Updating service with id:", id);
    console.log("📦 Update data:", body);

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), {
        status: 400,
      });
    }

    // ✅ Only update provided fields
    const updateData = {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.icon !== undefined && { icon: body.icon }),
      ...(body.projects !== undefined && { projects: Number(body.projects) }),
    };

    const result = await Service.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return new Response(JSON.stringify({ message: "Not found" }), {
        status: 404,
      });
    }

    console.log("✅ Service updated:", result);

    return new Response(
      JSON.stringify({ message: "Service updated", data: result }),
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

// 📌 DELETE service by id (?id=...)
export async function DELETE(req) {
  try {
    console.log("➡️ DELETE /api/service-section called");

    await dbConnect();
    console.log("✅ DB connected");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    console.log("🗑 Deleting service with id:", id);

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), {
        status: 400,
      });
    }

    const result = await Service.findByIdAndDelete(id);

    if (!result) {
      return new Response(JSON.stringify({ message: "Not found" }), {
        status: 404,
      });
    }

    console.log("✅ Service deleted:", result);

    return new Response(
      JSON.stringify({ message: "Service deleted", deletedId: id }),
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
