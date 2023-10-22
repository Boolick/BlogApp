import { Spinner, Card, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

import { useGetCommentsQuery } from "../store/api/api";

// eslint-disable-next-line react/prop-types
function Comments({ postId }) {
  const { data: comments, isLoading, isError } = useGetCommentsQuery(postId);
  const [delayLoading, setDelayLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setDelayLoading(true);
      setTimeout(() => {
        setDelayLoading(false);
      }, 1500); // Задержка в 1.5 секунды
    }
  }, [isLoading]);

  if (isError) {
    return (
      <Alert variant="danger" role="alert">
        Error loading comments
      </Alert>
    );
  }

  return (
    <Card>
      {delayLoading ? (
        <Spinner className="m-5" animation="border" role="status" />
      ) : comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <Card.Body>
              <Card.Subtitle>{comment.email}</Card.Subtitle>
              <Card.Text>{comment.body}</Card.Text>
            </Card.Body>
          </div>
        ))
      ) : (
        <Alert variant="info" role="info">
          There is not comments yet!
        </Alert>
      )}
    </Card>
  );
}

export default Comments;
