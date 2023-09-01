import { useState } from 'react'
import { useForgotPasswordMutation } from './usersApiSlice'
import './ForgotPassword.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [reset] = useForgotPasswordMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { message } = await reset({ email }).unwrap()
      setMsg(message)
    } catch (err) {
      if (err?.data?.message) {
        setMsg(err.data.message);
      } else {
        setMsg('No server response');
      }
    }
  }

  const handleEmailInput = (e) => setEmail(e.target.value)

  return (
    <main>
      <div className="forgot-password">
        <h1 className="forgot-password-header">Forgot Password</h1>
        <div className="forgot-password-form">
          <form className="forgot-password-form-form" onSubmit={handleSubmit}>
            <div className="email-forgot-password">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                className="email"
                placeholder="Your Email"
                value={email}
                onChange={handleEmailInput}
                required
              />
            </div>
            <button>Send Reset Password Email</button>
            {msg && <p>{msg}</p>}
          </form>
        </div>
      </div>
    </main>
  )
}

export default ForgotPassword