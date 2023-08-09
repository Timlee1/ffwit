import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useResetPasswordMutation } from './usersApiSlice'

const ResetPassword = () => {
  const location = useLocation();
  const token = location.search.split('=')[1]
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')
  const [msg, setMsg] = useState('')
  const [reset] = useResetPasswordMutation()

  //button is null after first submit?
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password !== passwordVerify) {
        setMsg('Password are not the same');
        setPassword('')
        setPasswordVerify('')
      }
      else {
        await reset({ password, token })
        setMsg('Password was reset')
      }
    } catch (err) {
      if (err?.data?.message) {
        setMsg(err.data.message);
      } else {
        setMsg('No server response');
      }
    }
  }

  const handlePasswordInput = (e) => setPassword(e.target.value)
  const handlePasswordVerifyInput = (e) => setPasswordVerify(e.target.value)


  return (
    <section>
      <header>
        <h1>Reset Password</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordInput}
            required
          />
          <label htmlFor="passwordVerify">Repeat New Password:</label>
          <input
            type="password"
            id="passwordVerify"
            value={passwordVerify}
            onChange={handlePasswordVerifyInput}
            required
          />
          <button>Reset Password</button>
        </form>
        {msg && <p>{msg}</p>}
      </main>
    </section>
  )
}

export default ResetPassword