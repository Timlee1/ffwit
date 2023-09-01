import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useLoginMutation } from '../features/auth/authApiSlice'
import usePersist from '../hooks/usePersist'
import './Login.css'

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
      const { accessToken } = await login({ email, password, persist }).unwrap()
      //console.log(accessToken)
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
    <main>
      <div className="login">
        <h1 class="login-header">Log In To Your Account</h1>
        <div className="login-form">
          <form className="login-form-form" onSubmit={handleSubmit}>
            <div className="email-login">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className="email"
                value={email}
                onChange={handleUserInput}
                placeholder='Your Email'
                required
              />
            </div>
            <div className="password-login">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordInput}
                placeholder='Your Password'
                required
              />
            </div>
            <button>Sign In</button>
            {msg && <p>{msg}</p>}
          </form>
          <div className="persist-login">
            <label htmlFor="persist">
              <input
                type="checkbox"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              Trust This Device
            </label>
          </div>
          <div className="forget-password-login">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>

        <div className="login-to-sign-up">
          Don't have an account?<Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </main>
  )
}

export default Login