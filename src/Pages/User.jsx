import {
  Alert,
  Button,
  Card,
  Spinner,
  Container,
  Row,
  Col,
  Collapse,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import renderEntries from "../features/user/renderEntries";
import UserAvatar from "../components/UserAvatar";
import { useGetUsersQuery, useGetUsersPostsQuery } from "../store/api/api";

function User() {
  const [showPosts, setShowPosts] = useState(false);
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));
  const {
    data: userPosts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useGetUsersPostsQuery(userId);
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorgUsers,
  } = useGetUsersQuery();

  if (isLoadingPosts || isLoadingUsers) {
    return (
      <Spinner className="mt-5" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (isErrorgUsers) {
    return (
      <Alert variant="danger" role="alert">
        Error loading
      </Alert>
    );
  }

  const currentUser = users?.find((user) => user.id === userId);
  const address = currentUser.address;
  const company = currentUser.company;

  return (
    <>
      <Container fluid>
        <Card className="d-flex align-items-center  mb-3">
          <Card.Title>{currentUser && currentUser.name}</Card.Title>
        </Card>
        <Row>
          <Col>
            <Card
              className="avatar  d-flex align-items-center card mb-3"
              style={{
                minWidth: "300px",
                border: "none",
                background: "#E7E6E0",
              }}
            >
              <div>
                <UserAvatar
                  src={`https://robohash.org/${currentUser.name}.png?bgset=bg1`}
                />
              </div>
            </Card>
          </Col>

          <Col>
            <Card className="mb-3">
              <Card.Body>{currentUser && renderEntries(currentUser)}</Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="card mb-3" style={{ minWidth: "250px" }}>
              <Card.Body>
                <h2>Address</h2>
                {currentUser && renderEntries(address)}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mb-3" style={{ minWidth: "250px" }}>
              <Card.Body>
                <h2>Company</h2>
                {currentUser && renderEntries(company)}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button
          className="m-1"
          onClick={() => setShowPosts(!showPosts)}
          variant="outline-dark"
        >
          {showPosts ? "Close" : "User's comments"}
        </Button>
        <Button
          className="m-1"
          variant="outline-success"
          onClick={() => navigate("/")}
        >
          Back to main
        </Button>
        <Card className="mb-3" style={{ maxWidth: "670px" }}>
          <Collapse in={showPosts} timeout={2000}>
            <Card.Body>
              <div>
                {isErrorPosts ? (
                  <Alert variant="danger" role="alert">
                    Error loading posts
                  </Alert>
                ) : (
                  showPosts &&
                  userPosts &&
                  userPosts.map((userPost) => (
                    <Card.Text key={userPost.id}>
                      <strong>{userPost.title}</strong>
                      <p>{userPost.body}</p>
                    </Card.Text>
                  ))
                )}
              </div>
            </Card.Body>
          </Collapse>
        </Card>
      </Container>
    </>
  );
}
export default User;
