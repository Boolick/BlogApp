import { Spinner , NavLink} from "react-bootstrap";
import { useGetCommentsQuery } from "../api/api";

// eslint-disable-next-line react/prop-types
function Comments({ postId }) {
  const { data: comments, isLoading, isError } = useGetCommentsQuery(postId);
  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return <div>Error loading comments</div>;
  }

  return (
    <div>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <NavLink>{comment.email}</NavLink>
            <p>{comment.body}</p>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
}

export default Comments;
