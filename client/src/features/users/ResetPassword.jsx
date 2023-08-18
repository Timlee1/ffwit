import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useResetPasswordMutation } from './usersApiSlice'

const ResetPassword = () => {
  const location = useLocation();

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [reset] = useResetPasswordMutation()

  //button is null after first submit?
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        setMsg('Password are not the same');
        setPassword('')
        setConfirmPassword('')
      }
      else {
        const token = location.search.split('=')[1]
        //resp undefined if it status 201? else it is an error
        const { resp } = await reset({ password, token }).unwrap()
        if (resp?.error?.data?.message) {
          setMsg(resp?.error?.data?.message);
        }
        else if (resp?.error) {
          setMsg('Unable to reset password')
        }
        else {
          setMsg('Password was reset')
        }
      }
    } catch (err) {
      console.log(err)
      if (err?.data?.message) {
        setMsg(err.data.message);
      } else {
        setMsg('Unable to reset password');
      }
    }
  }

  const handlePasswordInput = (e) => setPassword(e.target.value)
  const handleConfirmPasswordInput = (e) => setConfirmPassword(e.target.value)


  return (
    <main>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordInput}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordInput}
          required
        />
        <button>Reset Password</button>
        {msg && <p>{msg}</p>}
      </form>
    </main>
  )
}

export default ResetPassword