import { useState } from 'react'
import { useUpdatePasswordMutation } from './usersApiSlice'
import './UpdatePassword.css'

const UpdatePassword = ({ initialEmail }) => {
  const [email, setEmail] = useState(initialEmail)
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
    <main>
      <div className="update-password">
        <h2 className="update-password-header">Update Password</h2>
        <div className="update-password-form">
          <form className="update-password-form-form" onSubmit={handleSubmit}>
            <div className="email-update-password">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                className="email"
                value={email}
                onChange={handleEmailInput}
                required
              />
            </div>
            <div className="password-update-password">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                id="currentPassword"
                className="password"
                value={currentPassword}
                onChange={handleCurrentPasswordInput}
                required
              />
            </div>
            <div className="password-update-password">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                className="password"
                value={newPassword}
                onChange={handleNewPasswordInput}
                required
              />
            </div>
            <div className="password-update-password">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                className="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordInput}
                required
              />
            </div>
            <button>Update</button>
            {msg && <p>{msg}</p>}
          </form>
        </div>
      </div>
    </main>
  )
}

export default UpdatePassword