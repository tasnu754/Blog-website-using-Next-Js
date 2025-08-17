import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export async function POST(request) {
  try {
    await dbConnect();

    const postData = await request.json();

    if (!postData.title || !postData.content || !postData.category) {
      return Response.json(
        { message: "Title, content, and category are required" },
        { status: 400 }
      );
    }

    const newPost = new Post(postData);
    await newPost.save();

    return Response.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Post creation error:", error);
    return Response.json(
      { message: "Failed to create post", error: error.message },
      { status: 500 }
    );
  }
}
