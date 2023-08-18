import { useState } from 'react'
import { useCreateUserMutation } from '../features/users/usersApiSlice'
import { Link } from 'react-router-dom'

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
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailInput}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordInput}
          required
        />
        <button>Sign Up</button>
        {msg && <p>{msg}</p>}
      </form>
      <div>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </main>
  )
}

export default SignUp