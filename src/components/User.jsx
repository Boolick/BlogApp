import {
  //useGetPhotosQuery,

  useGetUsersQuery,
} from "../api/api";

// eslint-disable-next-line react/prop-types, no-unused-vars
function User({ userId }) {
  const { data: users, isLoading, isError } = useGetUsersQuery(userId);
  /*  const {
    data: userPosts,
    isLoading,
    isError,
    
  } = useGetUsersPostsQuery(userId); */
  //  const { data: photos } = useGetPhotosQuery(selectedUserId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error is error</div>;

  return (
    <>
      <div>
        {users && users.length > 0 ? (
          users.map((user) => <div key={user.id}>{user.username}</div>)
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </>
  );
}
export default User;

/*   return (
    <div>
      {users.map((user) => {
        <Card key={user.id}>
          <Img variant="top" />
        </Card>;
      })}
    </div>
  );
} */
