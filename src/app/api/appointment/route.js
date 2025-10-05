import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/appointment";

// ✅ READ all appointments
export async function GET() {
  try {
    await dbConnect();
    const result = await Appointment.find();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("❌ GET error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}

// ✅ CREATE appointment
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.name || !body.email || !body.phone || !body.subject || !body.message) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    const result = await Appointment.create(body);
    return new Response(JSON.stringify({ message: "Appointment created", data: result }), {
      status: 201,
    });
  } catch (err) {
    console.error("❌ POST error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}

// ✅ UPDATE appointment by id (?id=...)
export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });
    }

    const result = await Appointment.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Appointment updated", data: result }), {
      status: 200,
    });
  } catch (err) {
    console.error("❌ PUT error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}

// ✅ DELETE appointment by id (?id=...)
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });
    }

    const result = await Appointment.findByIdAndDelete(id);

    if (!result) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Appointment deleted", deletedId: id }), {
      status: 200,
    });
  } catch (err) {
    console.error("❌ DELETE error:", err);
    return new Response(JSON.stringify({ message: "Something went wrong", error: err.message }), {
      status: 500,
    });
  }
}
