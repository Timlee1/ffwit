import { useState } from 'react'
import { useCreateCustomerPortalSessionMutation } from './paymentApiSlice'


const ManageBilling = () => {
  const [msg, setMsg] = useState('')
  const [createCustomerPortalSession] = useCreateCustomerPortalSessionMutation()

  const manageBilling = async (e) => {
    e.preventDefault()
    try {
      const { url } = await createCustomerPortalSession().unwrap()
      console.log("here")
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
    <button onClick={manageBilling}>Manage Billing</button>
  )
}

export default ManageBilling