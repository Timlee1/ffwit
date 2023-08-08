import { useGetUsersQuery } from "./usersApiSlice"

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  let content
  if (isLoading) {
    content = <h2>Loading...</h2>
  } else if (isSuccess) {
    content = <div>{users.rows[0].id}</div>
  } else if (isError) {
    content = <div>Error</div>
  }

  return (
    <section>
      <h2>UsersList</h2>
      {content}
    </section>
  )
}


export default UsersList