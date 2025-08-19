import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export async function GET(request, { params }) {
  try {
    const { postId } = await params;
    console.log("Fetching post with ID:", postId);

    await dbConnect();

    const post = await Post.findOne({ _id: postId }).lean();
    if (!post) {
      console.log("Post not found");
      return Response.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    console.log("Post found:", post);
    return Response.json({ success: true, data: post }, { status: 200 });
  } catch (error) {
    console.error("Error in GET API route:", error);
    return Response.json(
      { success: false, error: "Failed to fetch post", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { postId } = params;
    const postData = await request.json();

    if (!postData || Object.keys(postData).length === 0) {
      return Response.json(
        { success: false, error: "No data provided for update" },
        { status: 400 }
      );
    }

    await dbConnect();

    const updatedPost = await Post.findByIdAndUpdate(postId, postData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedPost) {
      return Response.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: updatedPost }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT API route:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to update post",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { postId } = params;

    await dbConnect();

    const deletedPost = await Post.findByIdAndDelete(postId).lean();

    if (!deletedPost) {
      return Response.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, data: { message: "Post deleted successfully" } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE API route:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to delete post",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
