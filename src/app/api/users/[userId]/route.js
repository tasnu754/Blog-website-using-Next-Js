import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(request, { params }) {
  console.log(request);
  try {
    const { userId } = await params;
    console.log("Fetching user with ID:", userId);

    await dbConnect();

    const user = await User.findOne({ firebaseUid: userId });
    if (!user) {
      console.log("User not found");
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User found:", user);
    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return Response.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const userId = params.userId;
    const { name, email } = await request.json();

    await dbConnect();
    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid: userId },
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(updatedUser);
  } catch (error) {
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}
