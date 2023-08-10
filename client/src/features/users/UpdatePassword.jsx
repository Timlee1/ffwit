import { useState } from 'react'
import { useUpdatePasswordMutation } from './usersApiSlice'

const UpdatePassword = () => {
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [updateUserPassword] = useUpdatePasswordMutation()

  const setDefaultInputs = () => {
    setEmail('')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (newPassword !== confirmPassword) {
        setMsg('Current and confirm emails are not the same');
      } else {
        const resp = await updateUserPassword({ email, currentPassword, newPassword })
        console.log(resp)
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
      if (err?.data?.message) {
        setMsg(err.data.message);
      } else {
        setMsg('No Server Response');

      }

    }
    setDefaultInputs()
  }

  const handleEmailInput = (e) => setEmail(e.target.value)
  const handleCurrentPasswordInput = (e) => setCurrentPassword(e.target.value)
  const handleNewPasswordInput = (e) => setNewPassword(e.target.value)
  const handleConfirmPasswordInput = (e) => setConfirmPassword(e.target.value)

  return (
    <section>
      <h1>Update Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailInput}
          required
        />
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={handleCurrentPasswordInput}
          required
        />
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={handleNewPasswordInput}
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
        <button>Update</button>
        {msg && <p>{msg}</p>}
      </form>
    </section>
  )
}

export default UpdatePassword