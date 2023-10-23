import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../components/UserAvatar";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import renderEntries from "../features/user/renderEntries";

function About() {
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    // Загрузка данных из локального JSON файла
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (!data) {
    return (
      <Spinner className="mt-5" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const address = data.address;
  const company = data.company;

  return (
    <>
      <Container fluid>
        <Card className="d-flex align-items-center  mb-3">
          <Card.Title>{data.name}</Card.Title>
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
                <UserAvatar src={`https://robohash.org/Alex.png?bgset=bg1 `} />
              </div>
            </Card>
          </Col>

          <Col>
            <Card className="mb-3">
              <Card.Body>{data && renderEntries(data)}</Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="card mb-3" style={{ minWidth: "250px" }}>
              <Card.Body>
                <h2>Address</h2>
                {renderEntries(address)}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mb-3" style={{ minWidth: "250px" }}>
              <Card.Body>
                <h2>Company</h2>
                {renderEntries(company)}
              </Card.Body>
            </Card>
            <Button
              className="mb-3"
              variant="outline-success"
              onClick={() => navigate("/")}
            >
              Back to main
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default About;
