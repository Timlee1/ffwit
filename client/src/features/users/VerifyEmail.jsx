import { useLocation } from 'react-router-dom'
import { useVerifyUserQuery } from "./usersApiSlice"

const VerifyEmail = () => {
  const location = useLocation();
  const token = location.search.split('=')[1]
  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useVerifyUserQuery(token)

  let content = undefined
  if (isSuccess) {
    content = <p>Account Verified!</p>
  }
  //never gets to this condition always goes to PageNotFound
  if (isError || error) {
    console.log("here")
    content = <p>Account failed to be verified</p>
  }
  if (isLoading) {
    content = <p>Loading</p>
  }

  return (
    <main>
      {content}
    </main>
  )
}

export default VerifyEmail