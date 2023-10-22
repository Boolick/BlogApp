import {
  Container,
  Nav,
  Navbar,
  Offcanvas,
  Image,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <div></div>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              style={{ position: "fixed", zIndex: "10" }}
            />
            <Navbar.Brand>BlogApp </Navbar.Brand>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Image
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                  src={`https://robohash.org/Alex.png?bgset=bg1 `}
                  alt="Avatar"
                />
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Alexander Bullo
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Badge bg="secondary"> bulloalexander77@gmail.com</Badge>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Item as="li">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Link to="/about" className="nav-link">
                      About
                    </Link>
                  </Nav.Item>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;
