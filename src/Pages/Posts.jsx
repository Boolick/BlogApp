import { useCallback, useEffect, useState, useContext } from "react";
import {
  Card,
  Alert,
  Spinner,
  Button,
  Collapse,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { PageContext } from "../Context/PageContext";
import SkeletonPost from "../components/Skeleton";
import { useGetPostsQuery } from "../store/api/api";
import Comments from "../components/Comments";
import PaginationComponent from "../components/PaginationComponent";
import { shufflePosts } from "../features/posts/shufflePosts";

function Posts() {
  const navigate = useNavigate();
  const [openPostId, setOpenPostId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const { currentPage, setCurrentPage } = useContext(PageContext); // для пагинации
  const postsPerPage = 5; // Количество постов на страницу
  const [isLoadImg, setIsLoadImg] = useState(false);
  const [shuffledPosts, setShuffledPosts] = useState([]);
  const { data: posts, isLoading, isError } = useGetPostsQuery("posts");

  //перемешиваем посты
  useEffect(() => {
    if (posts) {
      setShuffledPosts(shufflePosts(posts));
    }
  }, [posts]);

  const handleCommentsClick = useCallback(
    (id) => {
      if (id === openPostId) {
        setOpenPostId(null);
        setSelectedPostId(null);
      } else {
        setOpenPostId(id);
        setSelectedPostId(id);
      }
      document
        .getElementById(`card-${id}`)
        .scrollIntoView({ behavior: "smooth" });
    },
    [openPostId]
  );

  const handleUserClick = useCallback(
    (id) => {
      localStorage.setItem("userId", id);
      navigate("/user");
    },
    [navigate]
  );

  if (isError) {
    return (
      <Alert variant="danger" role="alert">
        Error loading posts
      </Alert>
    );
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = shuffledPosts
    ? shuffledPosts.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid style={{ background: " #E7E6E0" }}>
      {isLoading ? (
        Array.from({ length: postsPerPage }, (_, index) => (
          <SkeletonPost key={index} /> // создаём массив скелетонов для загрузки
        ))
      ) : currentPosts && currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <Card key={post.id} className="mb-2" id={`card-${post.id}`}>
            <Card.Body className="d-flex card-body">
              <div>
                {!isLoadImg && <Spinner className="m-5" animation="border" />}
                <Card.Img
                  style={{
                    width: "135px",
                    height: "135px",
                    cursor: "pointer",
                  }}
                  variant="top"
                  src={`https://picsum.photos/id/${post.id}/200`}
                  alt={"photo"}
                  onLoad={() => setIsLoadImg(true)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150/771796";
                  }}
                  onClick={() => {
                    handleUserClick(post.userId);
                  }}
                />
              </div>
              <div style={{ paddingLeft: "20px" }}>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
              </div>
            </Card.Body>

            <Collapse in={openPostId === post.id}>
              <div id={`comments-${post.id}`}>
                {selectedPostId === post.id && <Comments postId={post.id} />}
              </div>
            </Collapse>

            <Card.Footer>
              <Button
                onClick={() => handleCommentsClick(post.id)}
                aria-controls={`comments-${post.id}`}
                aria-expanded={openPostId === post.id}
                variant=" light"
              >
                {openPostId === post.id ? "Close" : "Go to comments"}
              </Button>
            </Card.Footer>
          </Card>
        ))
      ) : (
        <p>No posts to display</p>
      )}

      <PaginationComponent
        postsPerPage={postsPerPage}
        totalPosts={posts ? posts.length : 0}
        paginate={paginate}
        currentPage={currentPage}
      />
    </Container>
  );
}
export default Posts;
