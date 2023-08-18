import React from 'react'
import Logout from '../features/users/Logout'
import UpdatePassword from '../features/users/UpdatePassword'
import ManageBilling from '../features/payment/ManageBilling'

const Profile = () => {
  return (
    <main>
      <UpdatePassword />
      <ManageBilling />
      <Logout />
    </main>
  )
}

export default Profile