import { useGetUsersQuery } from "../api/api";

function Users() {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading users</div>;
  }

  console.log(users);
  return (
    <div>
      {users && users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>
            <h2>{user.title}</h2>
            <p>{user.body}</p>
          </div>
        ))
      ) : (
        <p>No user information</p>
      )}
    </div>
  );
}

export default Users;
