import { useState } from 'react'
import { useCreateUserMutation } from '../features/users/usersApiSlice'

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
    <section>
      <header>
        <h1>Sign Up</h1>
      </header>
      <main>
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
        </form>
        {msg && <p>{msg}</p>}
      </main>
    </section>
  )
}

export default SignUp