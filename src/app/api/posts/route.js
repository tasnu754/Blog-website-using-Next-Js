import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const author = searchParams.get("author");

    if (author) {
      const authorPosts = await Post.find({ author })
        .sort({ createdAt: -1 })
        .lean();

      return new Response(
        JSON.stringify({
          success: true,
          data: authorPosts,
        }),
        {
          status: 200,
        }
      );
    }

    const allPosts = await Post.find({}).sort({ createdAt: -1 }).lean();

    console.log(allPosts);

    return new Response(
      JSON.stringify({
        success: true,
        data: allPosts,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch posts",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

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
