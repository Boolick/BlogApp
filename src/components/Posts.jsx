import { Card, Alert, Spinner, Button, Collapse } from "react-bootstrap";
import { useState } from "react";

import { useGetCommentsQuery, useGetPostsQuery } from "../api/api";
import Comments from "./Comments";

function Posts() {
  const [openPostId, setOpenPostId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  /*   console.log(`Fetching comments for post ${selectedPostId}`); */
  const { data: comments } = useGetCommentsQuery(selectedPostId);
  const { data: posts, isLoading, isError } = useGetPostsQuery("posts");
  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return (
      <Alert variant="danger" role="alert">
        Error loading comments
      </Alert>
    );
  }
  const handleClick = (id) => {
    if (id === openPostId) {
      setOpenPostId(null);
      setSelectedPostId(null);
    } else {
      setOpenPostId(id);
      setSelectedPostId(id);
    }
  };

  console.log(comments);
  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id} className="mb-4">
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body className="card-body">
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
              <Button
                onClick={() => handleClick(post.id)}
                aria-controls={`comments-${post.id}`}
                aria-expanded={openPostId === post.id}
                variant="primary"
              >
                {openPostId === post.id ? "Close" : "Go to comments"}
              </Button>
              <Collapse in={openPostId === post.id}>
                <div id={`comments-${post.id}`}>
                  {selectedPostId === post.id && <Comments postId={post.id} />}
                </div>
              </Collapse>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No posts to display</p>
      )}
    </div>
  );
}
export default Posts;
