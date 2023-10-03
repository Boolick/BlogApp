import { useGetPostsQuery } from "../api/api";

function Posts() {
  const { data: posts, isLoading, isError } = useGetPostsQuery("posts");

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading posts</div>;
  }

  console.log(posts);
  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))
      ) : (
        <p>No posts to display</p>
      )}
    </div>
  );
}

export default Posts;
