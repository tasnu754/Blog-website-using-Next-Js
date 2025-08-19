import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function DELETE(request) {
  try {
    const { userIds } = await request.json();
    await dbConnect();

    const result = await User.deleteMany({ _id: { $in: userIds } });

    return Response.json(
      {
        success: true,
        message: `${result.deletedCount} users deleted successfully`,
        deletedCount: result.deletedCount,
        deletedIds: userIds,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
