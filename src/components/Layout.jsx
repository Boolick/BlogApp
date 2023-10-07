import { Row, Container } from "react-bootstrap";

import NavBar from "./NavBar";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div>
      <Container style={{ width: "100vw" }}>
        <Row>
          <NavBar />
        </Row>
      </Container>

      <Container className="d-flex justify-content-center">
        <Row
          className="d-flex flex-column min-vh-100 justify-content-between"
          style={{ columnGap: "20px" }}
        >
          {children}
        </Row>
      </Container>
    </div>
  );
}

export default Layout;
