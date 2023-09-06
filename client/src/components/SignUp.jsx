import { useState } from 'react'
import { useCreateUserMutation } from '../features/users/usersApiSlice'
import { Link } from 'react-router-dom'
import './SignUp.css'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signUp] = useCreateUserMutation()
  const [msg, setMsg] = useState('')

  const handleEmailInput = (e) => setEmail(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signUp({ email, password }).unwrap()
      setEmail('')
      setPassword('')
      setMsg('Verifcation link sent to email')
    } catch (err) {
      if (err?.data?.message) {
        setMsg(err.data.message);
      } else {
        setMsg('No Server Response');
      }
    }
  }

  return (
    <main>
      <div className="sign-up">
        <h1 className="sign-up-header">Sign Up</h1>
        <div className="sign-up-form">
          <form className="sign-up-form-form" onSubmit={handleSubmit}>
            <div className="email-sign-up">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                className="email"
                value={email}
                placeholder="Your Email"
                onChange={handleEmailInput}
                required
              />
            </div>
            <div className="password-sign-up">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="password"
                placeholder="Your Password"
                value={password}
                onChange={handlePasswordInput}
                required
              />
            </div>
            <button>Sign Up</button>
            {msg && <p>{msg}</p>}
          </form>
        </div>
        <div className="sign-up-to-login">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </main>
  )
}

export default SignUp