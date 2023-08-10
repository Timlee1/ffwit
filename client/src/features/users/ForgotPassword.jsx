import { useState } from 'react'
import { useForgotPasswordMutation } from './usersApiSlice'

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
    <section>
      <header>
        <h1>Forgot Password</h1>
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
          <button>Send Reset Password Email</button>
        </form>
        {msg && <p>{msg}</p>}
      </main>
    </section>
  )
}

export default ForgotPassword