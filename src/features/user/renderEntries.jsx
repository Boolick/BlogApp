import { Card } from "react-bootstrap";
// функция для рендера вложенных объектов
function renderEntries(entries) {
  return Object.entries(entries).map(([key, value]) => {
    if (typeof value === "object") {
      return Object.entries(value).map(([subKey, subValue]) => {
        <Card.Text key={subKey}>
          <strong>{subKey}:</strong> {subValue}
        </Card.Text>;
      });
    } else {
      return (
        <Card.Text key={key}>
          <strong>{key}:</strong> {value}
        </Card.Text>
      );
    }
  });
}

export default renderEntries;
