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

  return (
    <>
      <div></div>
    </>
  )
}

export default VerifyEmail