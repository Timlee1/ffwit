import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCreateUserMutation } from '../features/users/usersApiSlice'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signUp, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCreateUserMutation()
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const handleEmailInput = (e) => setEmail(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signUp({ email, password }).unwrap()
      setEmail('')
      setPassword('')
      navigate('/login')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (err.status === 409) {
        setErrMsg('Email already used');
      } else {
        setErrMsg(err.data?.message);
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
            autoComplete="off"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordInput}
            value={password}
            required
          />
          <button>Sign Up</button>
        </form>
      </main>
    </section>
  )
}

export default SignUp