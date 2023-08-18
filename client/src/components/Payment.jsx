import { useState } from 'react'
import { useCreateCheckoutSessionMutation } from '../features/payment/paymentApiSlice'

const Payment = () => {
  const [msg, setMsg] = useState('')
  const [createCheckoutSession] = useCreateCheckoutSessionMutation()

  const checkout = (priceId) => async (e) => {
    e.preventDefault()
    try {
      const { url } = await createCheckoutSession({ priceId }).unwrap()
      location.href = url;
    } catch (err) {
      if (err?.data?.message) {
        setMsg(err.data.message);
      } else {
        setMsg('No server response');
      }
    }
  }

  return (
    <>
      <button onClick={checkout('price_1NgCh2BUPgZpckEJZ8KLvfDo')}>Basic Checkout</button>
      <button onClick={checkout('price_1NgCfgBUPgZpckEJDHw7lxOk')}>Premium Checkout</button>
    </>
  )
}

export default Payment