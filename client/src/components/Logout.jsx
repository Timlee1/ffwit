import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const Logout = () => {
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  const [sendLogout] = useSendLogoutMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await sendLogout()
      setMsg("Logged out")
      navigate('/')
    } catch (err) {
      if (err?.data?.message) {
        setMsg(err.data.message);
      } else {
        setMsg('No Server Response');
      }
    }
  }

  return (
    <>
      <button
        onClick={handleSubmit}
      >Logout
      </button>
      {msg && <p>{msg}</p>}
    </>
  )
}

export default Logout