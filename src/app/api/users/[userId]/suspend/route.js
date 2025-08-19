// pages/api/users/[userId]/suspend/route.js
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function PUT(request, { params }) {
  try {
    const { userId } = params;
    const { suspended } = await request.json();
    console.log(`Setting suspended=${suspended} for user:`, userId);

    await dbConnect();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { suspended },
      { new: true }
    ).select("-firebaseUid -__v");

    if (!updatedUser) {
      console.log("User not found");
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User updated:", updatedUser);
    return Response.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return Response.json(
      { error: "Failed to update user status" },
      { status: 500 }
    );
  }
}
