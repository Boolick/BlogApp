import { Card, Placeholder, Spinner } from "react-bootstrap";

function SkeletonPost() {
  return (
    <Card className="mb-2" style={{ width: "80vw" }}>
      <Card.Body className="d-flex card-body">
        <div>
          <Spinner className="m-5" animation="border" />
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <Placeholder as="h2">
            <Spinner />
            <Placeholder />
            quasi id et eos tenetur aut quo autem quasi id et
          </Placeholder>
          <Placeholder as="p" animation="wave">
            <Placeholder xs={12} />
            <Placeholder xs={12} />
            <Placeholder xs={12} />
          </Placeholder>
        </div>
      </Card.Body>
      <Card.Footer>
        <Placeholder as="div" animation="glow">
          <Placeholder xs={2} />
        </Placeholder>
      </Card.Footer>
    </Card>
  );
}

export default SkeletonPost;
