import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const Logout = () => {
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await sendLogout()
      navigate('/')
    } catch (err) {
      setErrMsg(err.data?.message)
    }
  }

  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  const logoutButton = (
    <button
      onClick={handleSubmit}
    >Logout
    </button>
  )

  const content = (
    <>
      {logoutButton}
      <p>{errMsg}</p>
      <Link to="/">Back to Home</Link>
    </>
  )
  return content
}

export default Logout