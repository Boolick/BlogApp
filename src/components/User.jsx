import { useSelector } from "react-redux";
import { Card,   Image } from "react-bootstrap";
import { useGetUsersQuery, useGetUsersPostsQuery } from "../store/api/api";

function User() {
  const userId = useSelector((state) => state.userId);
  const { data: posts } = useGetUsersPostsQuery(userId);
  const { data: users } = useGetUsersQuery();
  const currentUser = users?.find((user) => user.id === userId.userId);
  const address = currentUser.address;

  console.log(useGetUsersPostsQuery);
  console.log(userId);
  console.log(posts);
  console.log(currentUser);

  return (
    <Card>
      <Image class="card-img-top" src=" " alt="Card image"></Image>
      <h2>{currentUser && currentUser.name}</h2>
      <Card.Body>
      {currentUser &&
        Object.entries(currentUser).map(([key, value]) => {
          if (typeof value === "object") {
            return;
          } else {
            return (
              <Card.Text key={key} className="d-flex flex-row justify-content-start mb-2" >
                <Card.Text>{key}:</Card.Text><Card.Text>{value}</Card.Text>
              </Card.Text>
            );
          }
        })}

      <h2>Address</h2>
      {Object.entries(address).map(([key, value]) => {
        if (typeof value === "object") {
          return Object.entries(value).map(([subKey, subValue]) => (
            <h3 key={subKey}>
              {subKey}: {subValue}
            </h3>
          ));
        } else {
          return (
            <h3 key={key}>
              {key}: {value}
            </h3>
          );
        }
      })}
      <h2>Posts</h2>
      {users.map(
        (user) =>
          console.log(user.id) || (
            <div key={user.id}>
              <h3>{user.email}</h3>
              <p>{user.city}</p>
            </div>
          )
      )}
      </Card.Body>
    </Card>
  );
}
export default User;
