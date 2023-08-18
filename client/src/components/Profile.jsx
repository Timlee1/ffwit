import React from 'react'
import Logout from '../features/users/Logout'
import UpdatePassword from '../features/users/UpdatePassword'

const Profile = () => {
  return (
    <main>
      <UpdatePassword />
      <Logout />
    </main>
  )
}

export default Profile