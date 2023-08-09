import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useLoginMutation } from '../features/auth/authApiSlice'
import usePersist from '../hooks/usePersist'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login] = useLoginMutation()
  const [persist, setPersist] = usePersist()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      //unwrap payload to get access token
      const { accessToken } = await login({ email, password }).unwrap()
      //set credentials using access token
      dispatch(setCredentials({ accessToken }))
      setMsg('Logged in')
      setEmail('')
      setPassword('')
      navigate('/')
    } catch (err) {
      if (err?.data?.message) {
        setMsg(err.data.message);
      } else {
        setMsg('No Server Response');
      }
    }
  }

  const handleUserInput = (e) => setEmail(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist(prev => !prev)

  return (
    <section>
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleUserInput}
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
          <button>Sign In</button>
          <label htmlFor="persist">
            <input
              type="checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label>
        </form>
        {msg && <p>{msg}</p>}
      </main>
    </section>
  )
}

export default Login