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

  if (isSuccess) {
    return <p>Account Verified!</p>
  }
  if (isError || error) {
    return <p>Account failed to be verified</p>
  }
  return (
    <>
      <div></div>
    </>
  )
}

export default VerifyEmail