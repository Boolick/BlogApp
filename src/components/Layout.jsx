import { Row, Container } from "react-bootstrap";

import NavBar from "./NavBar";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div style={{ background: "#E7E6E0" }}>
      <Container fluid>
        <Row>
          <NavBar />
        </Row>
      </Container>

      <Container fluid className="container d-flex justify-content-center">
        <Row
          className="d-flex flex-column min-vh-100 justify-content-between "
          style={{ columnGap: "20px" }}
        >
          {children}
        </Row>
      </Container>
    </div>
  );
}

export default Layout;
