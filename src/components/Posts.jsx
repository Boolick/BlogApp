import { Card, Alert, Spinner, Button, Collapse } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetPostsQuery } from "../api/api";
import Comments from "./Comments";

import PaginationComponent from "../features/posts/PaginationComponent";

function Posts() {
  const [openPostId, setOpenPostId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); //   для пагинации
  const postsPerPage = 2;

  const { data: posts, isLoading, isError } = useGetPostsQuery("posts");
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = posts
    ? posts.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const navigate = useNavigate();

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

  console.log(selectedUserId);
  return (
    <>
      {posts && currentPosts && currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <Card style={{ gap: "20px" }} key={post.id}>
            <Card.Body className="card-body">
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
              <Collapse in={openPostId === post.id}>
                <div id={`comments-${post.id}`}>
                  {selectedPostId === post.id && <Comments postId={post.id} />}
                </div>
              </Collapse>
            </Card.Body>
            <Button
              onClick={() => handleClick(post.id)}
              aria-controls={`comments-${post.id}`}
              aria-expanded={openPostId === post.id}
              variant="primary"
            >
              {openPostId === post.id ? "Close" : "Go to comments"}
            </Button>

            <Button
              variant="primary"
              onClick={() => {
                setSelectedUserId(post.userId);
                navigate("/user");
              }}
            >
              Launch vertically centered modal
            </Button>
          </Card>
        ))
      ) : (
        <p>No posts to display</p>
      )}

      <PaginationComponent
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
}
export default Posts;
