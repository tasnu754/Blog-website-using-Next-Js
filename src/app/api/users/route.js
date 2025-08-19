import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(request) {
  try {
    await dbConnect();
    console.log("Fetching all users");

    const users = await User.find({}).select("-firebaseUid -__v").lean();

    if (!users || users.length === 0) {
      console.log("No users found");
      return Response.json({ error: "No users found" }, { status: 404 });
    }

    console.log("Users found:", users.length);
    return Response.json(users, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
