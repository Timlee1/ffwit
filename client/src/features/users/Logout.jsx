import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import { FiLogOut } from 'react-icons/fi';

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
      ><FiLogOut /> Logout
      </button>
      {msg && <p>{msg}</p>}
    </>
  )
}

export default Logout